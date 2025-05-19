// src/lib/sims/custom-engine/physics/balloon.ts
import { getAtmosphericConditions } from './atmosphere';
import { SIMULATION_CONSTANTS } from '../constants';
import type { Vec3 } from './engine';

export interface BalloonConfig {
	initialSize: number;
	minSize: number;
	maxSize: number;
	gasDensityRatio: number;
	controlSensitivity: number;
	gravity: number;
}

export interface BalloonControls {
	inflate: boolean;
	deflate: boolean;
	moveX: number;
	moveZ: number;
}

export interface BalloonTelemetry {
	altitude: number;
	balloonSize: number;
	airDensity: number;
	buoyancy: number;
	position?: { x: number, y: number, z: number };
	velocity?: { x: number, y: number, z: number };
}

export class BalloonPhysics {
	// Balloon state
	private position: Vec3;
	private velocity: Vec3;
	private rotation: Vec3;
	private angularVelocity: Vec3;
	private balloonSize: number;
	private config: BalloonConfig;
	private mass: number = 0.8; // kg

	// Controls state
	private controls: BalloonControls = {
		inflate: false,
		deflate: false,
		moveX: 0,
		moveZ: 0
	};

	// Telemetry data
	private telemetry: BalloonTelemetry = {
		altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
		balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
		airDensity: 0,
		buoyancy: 0
	};

	// Frame counter for throttling logs
	private frameCount: number = 0;
	private lastSizeChange: number = 0;

	constructor(config: BalloonConfig) {
		this.config = config;
		this.balloonSize = config.initialSize;
		this.position = {
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		};
		this.velocity = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 0, y: 0, z: 0 };
		this.angularVelocity = { x: 0, y: 0, z: 0 };

		console.log("BalloonPhysics initialized with size:", this.balloonSize);
	}

	/**
	 * Update balloon controls
	 */
	setControls(controls: Partial<BalloonControls>): void {
		const oldControls = { ...this.controls };
		this.controls = { ...this.controls, ...controls };

		// Log only when controls change
		const hasChanged = JSON.stringify(oldControls) !== JSON.stringify(this.controls);
		if (hasChanged) {
			console.log('Balloon controls updated:', this.controls);
		}
	}

	/**
	 * Get current balloon size
	 */
	getBalloonSize(): number {
		return this.balloonSize;
	}

	/**
	 * Get current balloon position
	 */
	getPosition(): Vec3 {
		return this.position;
	}

	/**
	 * Get current balloon rotation
	 */
	getRotation(): Vec3 {
		return this.rotation;
	}

	/**
	 * Get balloon telemetry
	 */
	getTelemetry(): BalloonTelemetry {
		return {
			...this.telemetry,
			position: { ...this.position },
			velocity: { ...this.velocity }
		};
	}

	/**
	 * Reset balloon state
	 */
	reset(position?: { x: number, y: number, z: number }): void {
		// Reset size
		this.balloonSize = this.config.initialSize;
		this.frameCount = 0;
		this.lastSizeChange = 0;

		// Reset position
		const resetPos = position || {
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		};

		console.log("Resetting balloon position to:", resetPos);

		// Reset physics state
		this.position = { ...resetPos };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 0, y: 0, z: 0 };
		this.angularVelocity = { x: 0, y: 0, z: 0 };

		// Reset controls
		this.controls = {
			inflate: false,
			deflate: false,
			moveX: 0,
			moveZ: 0
		};

		// Reset telemetry
		this.telemetry = {
			altitude: resetPos.y,
			balloonSize: this.balloonSize,
			airDensity: 0,
			buoyancy: 0
		};
	}

	/**
	 * Main physics update
	 */
	update(delta: number): void {
		this.frameCount++;

		// 1. Update balloon size based on controls
		const sizeChangeRate = 0.8; // Size change per second
		let sizeChange = 0;

		if (this.controls.inflate) {
			sizeChange = sizeChangeRate;
		} else if (this.controls.deflate) {
			sizeChange = -sizeChangeRate;
		}

		// Apply size change with delta time scaling
		if (sizeChange !== 0) {
			const newSize = Math.max(
				this.config.minSize,
				Math.min(
					this.balloonSize + (sizeChange * delta),
					this.config.maxSize
				)
			);

			// Check if the size changed significantly
			if (Math.abs(newSize - this.balloonSize) > 0.01) {
				this.lastSizeChange = this.frameCount;
				this.balloonSize = newSize;
				console.log(`Balloon size changed to: ${this.balloonSize.toFixed(2)}`);
			}
		}

		// 2. Get atmosphere data
		const atmosphere = getAtmosphericConditions(this.position.y);
		const airDensity = atmosphere.density;

		// 3. Calculate buoyancy
		// Volume of a sphere = (4/3) * π * r³
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);

		// Gas density (hydrogen/helium is much lighter than Venus atmosphere)
		const gasDensity = this.config.gasDensityRatio * airDensity;

		// Calculate mass of air displaced by balloon + structural mass
		const structuralMassRatio = 0.15; // 15% of displacement is structural mass
		const displacedAirMass = volume * airDensity;
		const structuralMass = displacedAirMass * structuralMassRatio;

		// Total mass = structural mass + basket/payload + gas inside
		const gasInsideMass = volume * gasDensity;
		const payloadMass = this.mass;
		const totalMass = structuralMass + payloadMass + gasInsideMass;

		// Calculate net buoyancy force: (displaced air mass - total mass) * gravity
		const buoyancyForce = (displacedAirMass - totalMass) * this.config.gravity;

		// 4. Calculate and apply forces
		const forces = { x: 0, y: buoyancyForce, z: 0 };

		// Add control forces
		const controlSpeed = this.config.controlSensitivity * 5.0;
		forces.x += this.controls.moveX * controlSpeed;
		forces.z += this.controls.moveZ * controlSpeed;

		// Add gravity (already included in buoyancy calculation)

		// 5. Calculate drag
		// Drag force = 0.5 * density * velocity^2 * drag coefficient * cross-sectional area
		const dragCoefficient = 0.5;
		const crossSectionalArea = Math.PI * this.balloonSize * this.balloonSize;

		const dragFactor = 0.5 * airDensity * dragCoefficient * crossSectionalArea;

		const dragForce = {
			x: -this.velocity.x * Math.abs(this.velocity.x) * dragFactor,
			y: -this.velocity.y * Math.abs(this.velocity.y) * dragFactor * 0.5, // Less vertical drag
			z: -this.velocity.z * Math.abs(this.velocity.z) * dragFactor
		};

		// Add drag to forces
		forces.x += dragForce.x;
		forces.y += dragForce.y;
		forces.z += dragForce.z;

		// 6. Update velocity (F = ma, so a = F/m)
		const acceleration = {
			x: forces.x / totalMass,
			y: forces.y / totalMass,
			z: forces.z / totalMass
		};

		this.velocity.x += acceleration.x * delta;
		this.velocity.y += acceleration.y * delta;
		this.velocity.z += acceleration.z * delta;

		// 7. Update position
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
		this.position.z += this.velocity.z * delta;

		// 8. Simple wind effect
		// Implement wind forces that vary with altitude
		const windFactor = 0.1;
		const windSpeed = Math.sin(this.position.y * 0.01 + this.frameCount * 0.01) * windFactor;
		this.position.x += windSpeed * delta;

		// 9. Update telemetry
		this.telemetry = {
			altitude: this.position.y,
			balloonSize: this.balloonSize,
			airDensity,
			buoyancy: buoyancyForce
		};

		// 10. Log status periodically
		const shouldLog =
			this.frameCount % 60 === 0 || // Regular updates
			(this.frameCount - this.lastSizeChange) < 5; // More frequent updates when size changes

		if (shouldLog) {
			console.log(`Balloon status: pos=(${this.position.x.toFixed(1)},${this.position.y.toFixed(1)},${this.position.z.toFixed(1)}), vel=(${this.velocity.x.toFixed(2)},${this.velocity.y.toFixed(2)},${this.velocity.z.toFixed(2)}), size=${this.balloonSize.toFixed(1)}, air=${airDensity.toFixed(1)}, buoyancy=${buoyancyForce.toFixed(1)}`);
		}
	}
}