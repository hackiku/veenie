// src/lib/sims/balloon/physics/balloon.ts
import type { RigidBody } from '@threlte/rapier';
import { getAtmosphericConditions } from './atmosphere';
import { SIMULATION_CONSTANTS } from '../constants';

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
	// Rigid body reference
	private rigidBody: RigidBody | null = null;

	// Balloon state
	private balloonSize: number;
	private config: BalloonConfig;

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
		console.log("BalloonPhysics initialized with size:", this.balloonSize);
	}

	/**
	 * Set the Rapier rigid body for the balloon
	 */
	setRigidBody(body: RigidBody): void {
		this.rigidBody = body;
		console.log("Rigid body set in balloon physics");

		// Initialize rigid body properties for better physics
		if (this.rigidBody) {
			// Explicitly set initial position
			this.rigidBody.setTranslation(
				{
					x: 0,
					y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
					z: 0
				},
				true
			);

			// Reset velocities
			this.rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
			this.rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);

			// Set lower mass for better buoyancy effects
			// this.rigidBody.setMass(0.5);

			// Lock rotations to prevent tumbling
			this.rigidBody.lockRotations(true);
		}
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
	 * Get balloon telemetry
	 */
	getTelemetry(): BalloonTelemetry {
		if (this.rigidBody) {
			const position = this.rigidBody.translation();
			const velocity = this.rigidBody.linvel();

			return {
				...this.telemetry,
				position: {
					x: position.x,
					y: position.y,
					z: position.z
				},
				velocity: {
					x: velocity.x,
					y: velocity.y,
					z: velocity.z
				}
			};
		}

		return { ...this.telemetry };
	}

	/**
	 * Reset balloon state
	 */
	reset(position?: { x: number, y: number, z: number }): void {
		if (!this.rigidBody) return;

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

		// Explicitly reset the rigid body state
		this.rigidBody.setTranslation(resetPos, true);
		this.rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
		this.rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);

		// Re-lock rotations
		this.rigidBody.lockRotations(true);

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
	 * Physics update - improved with atmospheric effects
	 */
	update(delta: number): void {
		this.frameCount++;

		if (!this.rigidBody) {
			return;
		}

		// 1. Update balloon size based on controls - more responsive
		const sizeChangeRate = 0.8; // Faster size change
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

		// 2. Get current position
		const position = this.rigidBody.translation();
		const altitude = position.y;

		// 3. Get atmosphere data from the atmospheric model
		const atmosphere = getAtmosphericConditions(altitude);
		const airDensity = atmosphere.density;

		// 4. Calculate buoyancy
		// Volume of a sphere = (4/3) * π * r³
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);

		// Gas density (hydrogen is much lighter than Venus atmosphere)
		const gasDensity = this.config.gasDensityRatio * airDensity;

		// Calculate net buoyancy
		// Buoyancy = (fluid density - gas density) * volume * gravity
		const buoyancyForce = (airDensity - gasDensity) * volume * this.config.gravity;

		// Apply buoyancy force with scaling for better gameplay
		const buoyancyScaling = 3.0; // Strong enough to see movement
		const buoyancyVector = {
			x: 0,
			y: buoyancyForce * buoyancyScaling,
			z: 0
		};

		// 5. Apply horizontal control forces
		const controlSpeed = this.config.controlSensitivity * 20.0; // Stronger controls
		const controlVector = {
			x: this.controls.moveZ * controlSpeed,  // Z is forward/back (W/S)
			y: 0,
			z: -this.controls.moveX * controlSpeed  // X is left/right (A/D)
		};

		// 6. Apply combined forces
		this.rigidBody.addForce(buoyancyVector, true);
		this.rigidBody.addForce(controlVector, true);

		// 7. Add some air resistance
		const velocity = this.rigidBody.linvel();
		const dragCoefficient = 1.0 * this.balloonSize; // Larger balloon = more drag

		// Calculate drag force (proportional to velocity squared)
		const dragForce = {
			x: -velocity.x * Math.abs(velocity.x) * dragCoefficient * airDensity * 0.01,
			y: -velocity.y * Math.abs(velocity.y) * dragCoefficient * airDensity * 0.005, // Less vertical drag
			z: -velocity.z * Math.abs(velocity.z) * dragCoefficient * airDensity * 0.01
		};

		// Apply drag
		this.rigidBody.addForce(dragForce, true);

		// 8. Update telemetry
		this.telemetry = {
			altitude,
			balloonSize: this.balloonSize,
			airDensity,
			buoyancy: buoyancyForce
		};

		// 9. Log status periodically
		const shouldLog =
			this.frameCount % 60 === 0 || // Regular updates
			(this.frameCount - this.lastSizeChange) < 5; // More frequent updates when size changes

		if (shouldLog) {
			console.log(`Balloon status: pos=(${position.x.toFixed(1)},${position.y.toFixed(1)},${position.z.toFixed(1)}), size=${this.balloonSize.toFixed(1)}, air=${airDensity.toFixed(1)}, force_y=${buoyancyVector.y.toFixed(1)}`);
		}
	}
}