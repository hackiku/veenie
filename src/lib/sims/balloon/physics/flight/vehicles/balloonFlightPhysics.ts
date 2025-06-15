// src/lib/sims/balloon/physics/vehicles/BalloonFlightPhysics.ts

import { FlightPhysics, type FlightConfig } from '../old/flightDynamics';
import { getAtmosphericConditions } from '../../atmosphere';
import type { Vec3 } from '../../engine';


export interface BalloonConfig extends FlightConfig {
	initialSize: number;
	minSize: number;
	maxSize: number;
	gasDensityRatio: number;
}

export interface BalloonControls {
	inflate: number;    // 0-1 intensity
	deflate: number;    // 0-1 intensity
}

/**
 * Balloon-specific flight physics
 */
export class BalloonFlightPhysics extends FlightPhysics {
	private balloonSize: number;
	private balloonConfig: BalloonConfig;
	private balloonControls: BalloonControls = { inflate: 0, deflate: 0 };

	constructor(config: BalloonConfig, initialPosition: Vec3) {
		super(config, initialPosition);
		this.balloonConfig = config;
		this.balloonSize = config.initialSize;
	}

	// IMPLEMENT ABSTRACT METHODS

	calculateLiftForce(atmosphere: any): number {
		// Buoyancy calculation for balloons
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);
		const gasDensity = this.balloonConfig.gasDensityRatio * atmosphere.density;

		const structuralMassRatio = 0.15;
		const displacedAirMass = volume * atmosphere.density;
		const structuralMass = displacedAirMass * structuralMassRatio;
		const gasInsideMass = volume * gasDensity;
		const totalMass = structuralMass + this.config.mass + gasInsideMass;

		return (displacedAirMass - totalMass) * this.config.gravity;
	}

	calculateVehicleSpecificForces(delta: number): Vec3 {
		// Update balloon size based on inflate/deflate controls
		this.updateBalloonSize(delta);

		// Get current atmospheric conditions
		const atmosphere = getAtmosphericConditions(this.state.position.y);

		// Calculate buoyancy force
		const buoyancy = this.calculateLiftForce(atmosphere);

		return { x: 0, y: buoyancy, z: 0 };
	}

	getVehicleSize(): number {
		return this.balloonSize;
	}

	getVehicleType(): string {
		return 'balloon';
	}

	// BALLOON-SPECIFIC METHODS

	setBalloonControls(controls: Partial<BalloonControls>): void {
		this.balloonControls = { ...this.balloonControls, ...controls };
	}

	private updateBalloonSize(delta: number): void {
		const sizeChangeRate = 1.1; // Size change per second
		let sizeChange = 0;

		const sensitivity = this.controls.sensitivity.movement; // Reuse movement sensitivity
		const effectiveInflate = this.balloonControls.inflate * sensitivity;
		const effectiveDeflate = this.balloonControls.deflate * sensitivity;

		if (effectiveInflate > 0) {
			sizeChange = sizeChangeRate * effectiveInflate;
		} else if (effectiveDeflate > 0) {
			sizeChange = -sizeChangeRate * effectiveDeflate;
		}

		if (Math.abs(sizeChange) > 0.01) {
			const newSize = Math.max(
				this.balloonConfig.minSize,
				Math.min(
					this.balloonSize + (sizeChange * delta),
					this.balloonConfig.maxSize
				)
			);

			this.balloonSize = newSize;

			// Update cross-sectional area for drag calculation
			this.config.crossSectionalArea = Math.PI * this.balloonSize * this.balloonSize;
		}
	}

	getBalloonSize(): number {
		return this.balloonSize;
	}

	// Override reset to include balloon-specific state
	reset(position?: Vec3): void {
		super.reset(position);
		this.balloonSize = this.balloonConfig.initialSize;
		this.balloonControls = { inflate: 0, deflate: 0 };
		this.config.crossSectionalArea = Math.PI * this.balloonSize * this.balloonSize;
	}
}

