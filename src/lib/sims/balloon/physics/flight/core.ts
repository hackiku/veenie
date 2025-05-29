// src/lib/sims/balloon/physics/flight/core.ts

import type { Vec3 } from '../engine';
import { getAtmosphericConditions } from '../atmosphere';
import { venusCoordinates } from '../coordinates/venusCoordinates';

// Core physics state that all vehicles share
export interface FlightState {
	// Position & velocity
	position: Vec3;
	velocity: Vec3;
	acceleration: Vec3;

	// Rotation & angular motion
	rotation: Vec3;
	angularVelocity: Vec3;
	angularAcceleration: Vec3;

	// Forces & torques
	forces: Vec3;
	torques: Vec3;

	// Mass properties
	mass: number;
	momentOfInertia: Vec3; // Simplified to diagonal components

	// Environmental state
	altitude: number;
	atmosphericData: any;
	globalPosition: { latitude: number; longitude: number; altitude: number };
}

// Configuration for physics integration
export interface PhysicsConfig {
	gravity: number;
	maxDeltaTime: number; // Prevent large time steps
	stabilityThreshold: number; // For NaN detection
	damping: {
		linear: number;
		angular: number;
	};
}

// Force/torque component interface
export interface ForceComponent {
	name: string;
	force: Vec3;
	torque: Vec3;
	isValid: boolean;
	debug?: any;
}

/**
 * Core flight physics engine that handles numerical integration
 * and manages the fundamental physics state for all vehicles
 */
export class FlightPhysicsCore {
	private state: FlightState;
	private config: PhysicsConfig;
	private forces: Map<string, ForceComponent> = new Map();
	private lastUpdateTime: number = Date.now() / 1000;

	constructor(initialState: Partial<FlightState>, config: PhysicsConfig) {
		this.config = config;
		this.state = this.createValidState(initialState);
		this.updateAtmosphericData();
	}

	/**
	 * Create a valid state with no NaN values
	 */
	private createValidState(initial: Partial<FlightState>): FlightState {
		const defaultState: FlightState = {
			position: { x: 0, y: 55000, z: 0 },
			velocity: { x: 0, y: 0, z: 0 },
			acceleration: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			angularVelocity: { x: 0, y: 0, z: 0 },
			angularAcceleration: { x: 0, y: 0, z: 0 },
			forces: { x: 0, y: 0, z: 0 },
			torques: { x: 0, y: 0, z: 0 },
			mass: 100,
			momentOfInertia: { x: 10, y: 10, z: 10 },
			altitude: 55000,
			atmosphericData: null,
			globalPosition: { latitude: 0, longitude: 0, altitude: 55000 }
		};

		// Merge with initial state, ensuring no NaN values
		const state = { ...defaultState, ...initial };
		return this.sanitizeState(state);
	}

	/**
	 * Remove NaN values and clamp to reasonable bounds
	 */
	private sanitizeState(state: FlightState): FlightState {
		const sanitizeVec3 = (v: Vec3, fallback: Vec3 = { x: 0, y: 0, z: 0 }): Vec3 => ({
			x: this.sanitizeNumber(v.x, fallback.x),
			y: this.sanitizeNumber(v.y, fallback.y),
			z: this.sanitizeNumber(v.z, fallback.z)
		});

		return {
			...state,
			position: sanitizeVec3(state.position, { x: 0, y: 55000, z: 0 }),
			velocity: sanitizeVec3(state.velocity),
			acceleration: sanitizeVec3(state.acceleration),
			rotation: sanitizeVec3(state.rotation),
			angularVelocity: sanitizeVec3(state.angularVelocity),
			angularAcceleration: sanitizeVec3(state.angularAcceleration),
			forces: sanitizeVec3(state.forces),
			torques: sanitizeVec3(state.torques),
			mass: this.sanitizeNumber(state.mass, 100, 0.1, 100000),
			momentOfInertia: sanitizeVec3(state.momentOfInertia, { x: 10, y: 10, z: 10 }),
			altitude: this.sanitizeNumber(state.altitude, 55000, 0, 200000)
		};
	}

	/**
	 * Sanitize a single number value
	 */
	private sanitizeNumber(value: number, fallback: number, min = -1e10, max = 1e10): number {
		if (!isFinite(value) || isNaN(value)) {
			return fallback;
		}
		return Math.max(min, Math.min(max, value));
	}

	/**
	 * Update atmospheric data based on current altitude
	 */
	private updateAtmosphericData(): void {
		try {
			this.state.atmosphericData = getAtmosphericConditions(this.state.altitude);
			this.state.altitude = this.state.position.y;
		} catch (error) {
			console.error('Failed to update atmospheric data:', error);
			// Use fallback atmospheric data
			this.state.atmosphericData = {
				density: 1.0,
				temperature: 300,
				pressure: 1000,
				altitude: this.state.altitude
			};
		}
	}

	/**
	 * Register a force component (like thrust, drag, buoyancy)
	 */
	addForceComponent(component: ForceComponent): void {
		// Validate the force component
		const validComponent: ForceComponent = {
			...component,
			force: {
				x: this.sanitizeNumber(component.force.x, 0),
				y: this.sanitizeNumber(component.force.y, 0),
				z: this.sanitizeNumber(component.force.z, 0)
			},
			torque: {
				x: this.sanitizeNumber(component.torque.x, 0),
				y: this.sanitizeNumber(component.torque.y, 0),
				z: this.sanitizeNumber(component.torque.z, 0)
			},
			isValid: this.isValidForceComponent(component)
		};

		this.forces.set(component.name, validComponent);
	}

	/**
	 * Check if a force component is valid
	 */
	private isValidForceComponent(component: ForceComponent): boolean {
		return isFinite(component.force.x) && isFinite(component.force.y) && isFinite(component.force.z) &&
			isFinite(component.torque.x) && isFinite(component.torque.y) && isFinite(component.torque.z);
	}

	/**
	 * Clear all force components
	 */
	clearForces(): void {
		this.forces.clear();
	}

	/**
	 * Get current state (read-only)
	 */
	getState(): Readonly<FlightState> {
		return { ...this.state };
	}

	/**
	 * Update mass properties
	 */
	updateMass(mass: number, momentOfInertia?: Vec3): void {
		this.state.mass = this.sanitizeNumber(mass, 100, 0.1, 100000);
		if (momentOfInertia) {
			this.state.momentOfInertia = {
				x: this.sanitizeNumber(momentOfInertia.x, 10, 0.1, 10000),
				y: this.sanitizeNumber(momentOfInertia.y, 10, 0.1, 10000),
				z: this.sanitizeNumber(momentOfInertia.z, 10, 0.1, 10000)
			};
		}
	}

	/**
	 * Main physics integration step
	 */
	update(deltaTime: number): void {
		// Sanitize delta time
		const dt = this.sanitizeNumber(deltaTime, 0.016, 0.001, this.config.maxDeltaTime);

		if (dt <= 0) return;

		// Update atmospheric conditions
		this.updateAtmosphericData();

		// Calculate total forces and torques
		this.calculateTotalForces();

		// Apply gravity
		this.state.forces.y -= this.state.mass * this.config.gravity;

		// Calculate accelerations
		this.state.acceleration = {
			x: this.state.forces.x / this.state.mass,
			y: this.state.forces.y / this.state.mass,
			z: this.state.forces.z / this.state.mass
		};

		this.state.angularAcceleration = {
			x: this.state.torques.x / this.state.momentOfInertia.x,
			y: this.state.torques.y / this.state.momentOfInertia.y,
			z: this.state.torques.z / this.state.momentOfInertia.z
		};

		// Integrate velocity
		this.state.velocity.x += this.state.acceleration.x * dt;
		this.state.velocity.y += this.state.acceleration.y * dt;
		this.state.velocity.z += this.state.acceleration.z * dt;

		// Apply linear damping
		const linearDamping = Math.pow(1 - this.config.damping.linear, dt);
		this.state.velocity.x *= linearDamping;
		this.state.velocity.y *= linearDamping;
		this.state.velocity.z *= linearDamping;

		// Integrate angular velocity
		this.state.angularVelocity.x += this.state.angularAcceleration.x * dt;
		this.state.angularVelocity.y += this.state.angularAcceleration.y * dt;
		this.state.angularVelocity.z += this.state.angularAcceleration.z * dt;

		// Apply angular damping
		const angularDamping = Math.pow(1 - this.config.damping.angular, dt);
		this.state.angularVelocity.x *= angularDamping;
		this.state.angularVelocity.y *= angularDamping;
		this.state.angularVelocity.z *= angularDamping;

		// Integrate position
		this.state.position.x += this.state.velocity.x * dt;
		this.state.position.y += this.state.velocity.y * dt;
		this.state.position.z += this.state.velocity.z * dt;

		// Integrate rotation
		this.state.rotation.x += this.state.angularVelocity.x * dt;
		this.state.rotation.y += this.state.angularVelocity.y * dt;
		this.state.rotation.z += this.state.angularVelocity.z * dt;

		// Normalize rotation angles
		this.state.rotation.x = this.normalizeAngle(this.state.rotation.x);
		this.state.rotation.y = this.normalizeAngle(this.state.rotation.y);
		this.state.rotation.z = this.normalizeAngle(this.state.rotation.z);

		// Update global coordinates
		this.updateGlobalCoordinates(dt);

		// Final state sanitization
		this.state = this.sanitizeState(this.state);

		// Clear forces for next frame
		this.clearForces();
	}

	/**
	 * Calculate total forces and torques from all components
	 */
	private calculateTotalForces(): void {
		this.state.forces = { x: 0, y: 0, z: 0 };
		this.state.torques = { x: 0, y: 0, z: 0 };

		for (const [name, component] of this.forces) {
			if (component.isValid) {
				this.state.forces.x += component.force.x;
				this.state.forces.y += component.force.y;
				this.state.forces.z += component.force.z;

				this.state.torques.x += component.torque.x;
				this.state.torques.y += component.torque.y;
				this.state.torques.z += component.torque.z;
			}
		}
	}

	/**
	 * Normalize angle to [-π, π]
	 */
	private normalizeAngle(angle: number): number {
		while (angle > Math.PI) angle -= 2 * Math.PI;
		while (angle < -Math.PI) angle += 2 * Math.PI;
		return angle;
	}

	/**
	 * Update global coordinate system
	 */
	private updateGlobalCoordinates(deltaTime: number): void {
		try {
			// Calculate wind effects
			const windEffect = venusCoordinates.calculateSuperrotationDisplacement(
				this.state.position.y,
				deltaTime
			);

			// Update grid if needed
			const updatedLocal = venusCoordinates.updateGridIfNeeded(
				this.state.position.x,
				this.state.position.z
			);

			if (updatedLocal.x !== this.state.position.x || updatedLocal.z !== this.state.position.z) {
				this.state.position.x = updatedLocal.x;
				this.state.position.z = updatedLocal.z;
			}

			// Calculate global position
			const global = venusCoordinates.localToSpherical(
				this.state.position.x,
				this.state.position.y,
				this.state.position.z
			);

			global.longitude += windEffect.longitude;
			global.longitude = ((global.longitude + 180) % 360) - 180;

			this.state.globalPosition = global;

		} catch (error) {
			console.error('Error updating global coordinates:', error);
			// Keep existing global position as fallback
		}
	}

	/**
	 * Reset to initial state
	 */
	reset(newState?: Partial<FlightState>): void {
		this.state = this.createValidState(newState || {});
		this.clearForces();
	}

	/**
	 * Get debug information
	 */
	getDebugInfo(): any {
		return {
			state: this.state,
			forces: Object.fromEntries(this.forces),
			isValid: this.isStateValid(),
			frameTime: Date.now() / 1000 - this.lastUpdateTime
		};
	}

	/**
	 * Check if current state is valid
	 */
	private isStateValid(): boolean {
		const checkVec3 = (v: Vec3) =>
			isFinite(v.x) && isFinite(v.y) && isFinite(v.z);

		return checkVec3(this.state.position) &&
			checkVec3(this.state.velocity) &&
			checkVec3(this.state.rotation) &&
			isFinite(this.state.mass) &&
			this.state.mass > 0;
	}
}