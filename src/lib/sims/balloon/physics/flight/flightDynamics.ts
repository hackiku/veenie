// src/lib/sims/balloon/physics/flight/flightDynamics.ts

import type { Vec3 } from '../engine';
import { venusCoordinates } from '../coordinates/venusCoordinates';
import { getAtmosphericConditions } from '../atmosphere';

export interface FlightConfig {
	mass: number;           // kg
	dragCoefficient: number;
	crossSectionalArea: number; // m²
	gravity: number;        // m/s²
	controlSensitivity: number;
}

export interface FlightControls {
	movement: { x: number; z: number; y?: number }; // -1 to 1
	rotation: { yaw: number; pitch?: number; roll?: number }; // -1 to 1
	throttle?: number;      // 0 to 1 (for powered vehicles)
	sensitivity: {
		movement: number;
		rotation: number;
	};
}

export interface FlightState {
	position: Vec3;
	velocity: Vec3;
	rotation: Vec3;
	angularVelocity: Vec3;
	forces: Vec3;
	torques: Vec3;
}

export interface FlightTelemetry {
	altitude: number;
	position: Vec3;
	velocity: Vec3;
	rotation: Vec3;
	globalPosition: { latitude: number; longitude: number; altitude: number };
	airDensity: number;
	windSpeed: number;
	controlIntensity: {
		movement: number;
		rotation: number;
		throttle: number;
	};
}

/**
 * Base Flight Physics Class
 * Handles common vehicle physics: forces, movement, atmospheric interaction
 */
export abstract class FlightPhysics {
	protected config: FlightConfig;
	protected state: FlightState;
	protected controls: FlightControls;
	protected globalPosition: { latitude: number; longitude: number; altitude: number };
	protected lastUpdateTime: number = Date.now() / 1000;

	constructor(config: FlightConfig, initialPosition: Vec3) {
		this.config = config;
		this.state = {
			position: { ...initialPosition },
			velocity: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			angularVelocity: { x: 0, y: 0, z: 0 },
			forces: { x: 0, y: 0, z: 0 },
			torques: { x: 0, y: 0, z: 0 }
		};

		this.controls = {
			movement: { x: 0, z: 0 },
			rotation: { yaw: 0 },
			sensitivity: { movement: 1.0, rotation: 1.0 }
		};

		this.globalPosition = venusCoordinates.localToSpherical(
			initialPosition.x, initialPosition.y, initialPosition.z
		);
	}

	// ABSTRACT METHODS - Must be implemented by vehicle types
	abstract calculateLiftForce(atmosphere: any): number;
	abstract calculateVehicleSpecificForces(delta: number): Vec3;
	abstract getVehicleSize(): number;
	abstract getVehicleType(): string;

	// COMMON METHODS - Shared by all vehicles

	/**
	 * Update controls (common interface)
	 */
	setControls(controls: Partial<FlightControls>): void {
		this.controls = { ...this.controls, ...controls };
	}

	/**
	 * Calculate atmospheric drag (common to all vehicles)
	 */
	protected calculateDrag(atmosphere: any): Vec3 {
		const dragFactor = 0.5 * atmosphere.density * this.config.dragCoefficient * this.config.crossSectionalArea;

		return {
			x: -this.state.velocity.x * Math.abs(this.state.velocity.x) * dragFactor,
			y: -this.state.velocity.y * Math.abs(this.state.velocity.y) * dragFactor * 0.8,
			z: -this.state.velocity.z * Math.abs(this.state.velocity.z) * dragFactor
		};
	}

	/**
	 * Apply control forces (common logic)
	 */
	protected applyControlForces(): Vec3 {
		const controlSpeed = this.config.controlSensitivity;
		const sensitivity = this.controls.sensitivity.movement;

		return {
			x: this.controls.movement.x * sensitivity * controlSpeed,
			y: (this.controls.movement.y || 0) * sensitivity * controlSpeed,
			z: this.controls.movement.z * sensitivity * controlSpeed
		};
	}

	/**
	 * Apply rotational controls (common logic)
	 */
	protected applyRotationalForces(delta: number): void {
		const rotationSensitivity = this.controls.sensitivity.rotation;

		// Yaw control
		const yawTorque = this.controls.rotation.yaw * rotationSensitivity * 50.0;
		this.state.angularVelocity.y += yawTorque * delta;

		// Apply damping
		this.state.angularVelocity.y *= 0.95;

		// Update rotation
		this.state.rotation.y += this.state.angularVelocity.y * delta;
		this.state.rotation.y = ((this.state.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
	}

	/**
	 * Main physics update (template method pattern)
	 */
	update(delta: number): void {
		const currentTime = Date.now() / 1000;
		const elapsed = currentTime - this.lastUpdateTime;
		this.lastUpdateTime = currentTime;

		// 1. Get atmospheric conditions
		const atmosphere = getAtmosphericConditions(this.state.position.y);

		// 2. Calculate forces
		this.state.forces = { x: 0, y: 0, z: 0 };

		// Gravity
		this.state.forces.y -= this.config.mass * this.config.gravity;

		// Vehicle-specific forces (lift, buoyancy, thrust, etc.)
		const vehicleForces = this.calculateVehicleSpecificForces(delta);
		this.state.forces.x += vehicleForces.x;
		this.state.forces.y += vehicleForces.y;
		this.state.forces.z += vehicleForces.z;

		// Drag
		const drag = this.calculateDrag(atmosphere);
		this.state.forces.x += drag.x;
		this.state.forces.y += drag.y;
		this.state.forces.z += drag.z;

		// Control forces
		const controlForces = this.applyControlForces();
		this.state.forces.x += controlForces.x;
		this.state.forces.y += controlForces.y;
		this.state.forces.z += controlForces.z;

		// 3. Apply rotational controls
		this.applyRotationalForces(delta);

		// 4. Update velocity and position
		const acceleration = {
			x: this.state.forces.x / this.config.mass,
			y: this.state.forces.y / this.config.mass,
			z: this.state.forces.z / this.config.mass
		};

		this.state.velocity.x += acceleration.x * delta;
		this.state.velocity.y += acceleration.y * delta;
		this.state.velocity.z += acceleration.z * delta;

		this.state.position.x += this.state.velocity.x * delta;
		this.state.position.y += this.state.velocity.y * delta;
		this.state.position.z += this.state.velocity.z * delta;

		// 5. Update coordinate system
		this.updateGlobalPosition(elapsed);
	}

	/**
	 * Update global coordinate system (common logic)
	 */
	private updateGlobalPosition(elapsed: number): void {
		// Wind effects
		const windEffect = venusCoordinates.calculateSuperrotationDisplacement(
			this.state.position.y, elapsed
		);

		// Grid updates
		const updatedLocal = venusCoordinates.updateGridIfNeeded(
			this.state.position.x, this.state.position.z
		);

		if (updatedLocal.x !== this.state.position.x || updatedLocal.z !== this.state.position.z) {
			this.state.position.x = updatedLocal.x;
			this.state.position.z = updatedLocal.z;
		}

		// Global position calculation
		const global = venusCoordinates.localToSpherical(
			this.state.position.x, this.state.position.y, this.state.position.z
		);

		global.longitude += windEffect.longitude;
		global.longitude = ((global.longitude + 180) % 360) - 180;

		this.globalPosition = global;
	}

	// GETTERS (common interface)
	getPosition(): Vec3 { return { ...this.state.position }; }
	getRotation(): Vec3 { return { ...this.state.rotation }; }
	getVelocity(): Vec3 { return { ...this.state.velocity }; }
	getGlobalPosition() { return { ...this.globalPosition }; }

	/**
	 * Generate telemetry (common structure)
	 */
	getTelemetry(): FlightTelemetry {
		return {
			altitude: this.state.position.y,
			position: this.getPosition(),
			velocity: this.getVelocity(),
			rotation: this.getRotation(),
			globalPosition: this.getGlobalPosition(),
			airDensity: getAtmosphericConditions(this.state.position.y).density,
			windSpeed: 0, // Would be calculated from wind system
			controlIntensity: {
				movement: Math.sqrt(this.controls.movement.x ** 2 + this.controls.movement.z ** 2),
				rotation: Math.abs(this.controls.rotation.yaw),
				throttle: this.controls.throttle || 0
			}
		};
	}

	/**
	 * Reset vehicle state
	 */
	reset(position?: Vec3): void {
		const resetPos = position || { x: 0, y: 55000, z: 0 };

		this.state = {
			position: { ...resetPos },
			velocity: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			angularVelocity: { x: 0, y: 0, z: 0 },
			forces: { x: 0, y: 0, z: 0 },
			torques: { x: 0, y: 0, z: 0 }
		};

		this.controls = {
			movement: { x: 0, z: 0 },
			rotation: { yaw: 0 },
			sensitivity: { movement: 1.0, rotation: 1.0 }
		};

		this.globalPosition = venusCoordinates.localToSpherical(
			resetPos.x, resetPos.y, resetPos.z
		);
	}
}