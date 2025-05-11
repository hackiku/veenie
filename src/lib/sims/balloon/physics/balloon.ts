// src/lib/sims/balloon/physics/balloon.ts
import type { RigidBody } from '@threlte/rapier';
import { getAtmosphericConditions } from './atmosphere';

export interface BalloonConfig {
	initialSize: number;        // Balloon radius in m
	minSize: number;            // Minimum balloon size
	maxSize: number;            // Maximum balloon size
	gasDensityRatio: number;    // Ratio of gas density to atmospheric density
	controlSensitivity: number; // Control responsiveness
	gravity: number;            // Gravity in m/s²
}

export interface BalloonControls {
	inflate: boolean;
	deflate: boolean;
	moveX: number;   // -1 to 1 for left-right
	moveZ: number;   // -1 to 1 for forward-backward
}

export interface BalloonTelemetry {
	altitude: number;
	balloonSize: number;
	airDensity: number;
	buoyancy: number;
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
		altitude: 0,
		balloonSize: 0,
		airDensity: 0,
		buoyancy: 0
	};

	constructor(config: BalloonConfig) {
		this.config = config;
		this.balloonSize = config.initialSize;
	}

	/**
	 * Set the Rapier rigid body for the balloon
	 */
	setRigidBody(body: RigidBody): void {
		this.rigidBody = body;
	}

	/**
	 * Update balloon controls
	 */
	setControls(controls: Partial<BalloonControls>): void {
		this.controls = { ...this.controls, ...controls };
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
		return { ...this.telemetry };
	}

	/**
	 * Reset balloon state
	 */
	reset(position?: { x: number, y: number, z: number }): void {
		if (!this.rigidBody) return;

		// Reset size
		this.balloonSize = this.config.initialSize;

		// Reset position
		if (position) {
			this.rigidBody.setTranslation(position, true);
			this.rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
			this.rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
		}

		// Reset controls
		this.controls = {
			inflate: false,
			deflate: false,
			moveX: 0,
			moveZ: 0
		};
	}

	/**
	 * Update physics for the balloon
	 */
	update(delta: number): void {
		if (!this.rigidBody) return;

		// Update balloon size based on controls
		if (this.controls.inflate) {
			this.balloonSize = Math.min(
				this.balloonSize + 0.01 * delta,
				this.config.maxSize
			);
		}

		if (this.controls.deflate) {
			this.balloonSize = Math.max(
				this.balloonSize - 0.01 * delta,
				this.config.minSize
			);
		}

		// Get current position
		const position = this.rigidBody.translation();
		const altitude = position.y;

		// Get atmosphere conditions
		const atmosphere = getAtmosphericConditions(altitude);

		// Calculate buoyancy (Archimedes principle)
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);
		const gasWeight = volume * this.config.gasDensityRatio * atmosphere.density * this.config.gravity;
		const displacedWeight = volume * atmosphere.density * this.config.gravity;
		const buoyancyForce = displacedWeight - gasWeight;

		// Calculate movement forces based on controls
		const moveSpeed = this.config.controlSensitivity * 10;
		const xForce = this.controls.moveX * moveSpeed;
		const zForce = this.controls.moveZ * moveSpeed;

		// Apply combined forces
		this.rigidBody.addForce(
			{
				x: xForce,
				y: buoyancyForce,
				z: zForce
			},
			true
		);

		// Update telemetry
		this.telemetry = {
			altitude,
			balloonSize: this.balloonSize,
			airDensity: atmosphere.density,
			buoyancy: buoyancyForce
		};
	}
}