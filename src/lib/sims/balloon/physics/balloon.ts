// src/lib/sims/balloon/physics/balloon.ts - ULTRA SIMPLIFIED VERSION
import type { RigidBody } from '@threlte/rapier';
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

	// Frame counter for logging
	private frameCount: number = 0;

	constructor(config: BalloonConfig) {
		this.config = config;
		this.balloonSize = config.initialSize;
		console.log("BalloonPhysics initialized");
	}

	/**
	 * Set the Rapier rigid body for the balloon
	 */
	setRigidBody(body: RigidBody): void {
		this.rigidBody = body;
		console.log("Rigid body set in balloon physics");

		// Initialize position and velocities
		if (this.rigidBody) {
			this.rigidBody.setTranslation(
				{
					x: 0,
					y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
					z: 0
				},
				true
			);

			this.rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
			this.rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
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

			return {
				...this.telemetry,
				position: {
					x: position.x,
					y: position.y,
					z: position.z
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

		// Reset position
		const resetPos = position || {
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		};

		console.log("Resetting balloon position to:", resetPos);

		// Fix: Use setNextKinematicTranslation for kinematic, but setTranslation for dynamic
		this.rigidBody.setTranslation(resetPos, true);
		this.rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
		this.rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);

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
	 * ULTRA SIMPLE physics update - just direct forces
	 */
	update(delta: number): void {
		this.frameCount++;

		if (!this.rigidBody) return;

		// 1. Update size based on controls
		if (this.controls.inflate) {
			this.balloonSize = Math.min(this.balloonSize + 0.05, this.config.maxSize);
		} else if (this.controls.deflate) {
			this.balloonSize = Math.max(this.balloonSize - 0.05, this.config.minSize);
		}

		// 2. Get current position 
		const position = this.rigidBody.translation();
		const altitude = position.y;

		// 3. FIXED buoyancy force based on size
		const baseForce = 500; // Super strong for immediate effect
		const sizeRatio = (this.balloonSize - this.config.minSize) /
			(this.config.maxSize - this.config.minSize);

		// Simple buoyancy: negative when small (sink), positive when large (rise)
		const buoyancyForce = baseForce * (sizeRatio * 2 - 0.5);

		// 4. Apply vertical force
		this.rigidBody.addForce(
			{ x: 0, y: buoyancyForce, z: 0 },
			true
		);

		// 5. Apply horizontal movement
		const moveForce = 200;
		this.rigidBody.addForce(
			{
				x: this.controls.moveZ * moveForce,  // Z = forward/back (W/S)
				y: 0,
				z: -this.controls.moveX * moveForce  // X = left/right (A/D)
			},
			true
		);

		// 6. Update telemetry
		this.telemetry = {
			altitude,
			balloonSize: this.balloonSize,
			airDensity: 0,  // Simplified
			buoyancy: buoyancyForce
		};

		// 7. Log status occasionally
		if (this.frameCount % 60 === 0) {
			console.log(`Balloon status: pos=(${position.x.toFixed(2)},${position.y.toFixed(2)},${position.z.toFixed(2)}), force_y=${buoyancyForce.toFixed(1)}`);
		}
	}
}