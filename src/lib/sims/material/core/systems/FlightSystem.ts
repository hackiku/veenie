// src/lib/sims/material/core/systems/FlightSystem.ts

import { getEntityRegistry } from '../entities/registry';
import type { BalloonState } from '../entities/Balloon';
import {
	updateBalloonPosition,
	updateBalloonVelocity,
	updateBalloonAcceleration,
	updateBalloonAtmosphere,
	recordScientificData
} from '../entities/Balloon';
import { calculateAtmosphericConditions } from '../physics/atmosphere';
import { calculateAllForces } from '../physics/forces';
import type { TimeSystem } from './TimeSystem';

/**
 * Interface for flight system options
 */
export interface FlightSystemOptions {
	/**
	 * Time system to use for updates
	 */
	timeSystem: TimeSystem;

	/**
	 * Data recording rate in sim seconds
	 */
	dataRecordingRate?: number;
}

/**
 * Class for managing balloon flight dynamics
 */
export class FlightSystem {
	/**
	 * Entity registry for accessing entities
	 */
	private registry = getEntityRegistry();

	/**
	 * Time system for time-based updates
	 */
	private timeSystem: TimeSystem;

	/**
	 * Data recording rate in sim seconds
	 */
	private dataRecordingRate: number;

	/**
	 * Last data recording time
	 */
	private lastDataRecording: number = 0;

	/**
	 * Construct a new FlightSystem
	 * 
	 * @param options - Options for the flight system
	 */
	constructor(options: FlightSystemOptions) {
		this.timeSystem = options.timeSystem;
		this.dataRecordingRate = options.dataRecordingRate ?? 10; // Default to 10 seconds
	}

	/**
	 * Update all flight entities based on physics
	 * 
	 * @param delta - Time delta in seconds
	 * @param atmosphereData - Atmospheric data from database
	 * @param windEnabled - Whether wind effects are enabled
	 * @param windIntensity - Wind intensity multiplier
	 */
	update(
		delta: number,
		atmosphereData: any[],
		windEnabled: boolean = true,
		windIntensity: number = 1.0
	): void {
		// Skip if no time passes
		if (delta <= 0) {
			return;
		}

		// Track current time for data recording
		const currentTime = this.timeSystem.getTime();

		// Get all balloons
		const balloons = this.registry.getAll<BalloonState>();

		// Update each balloon
		for (const balloon of balloons) {
			// Skip if balloon is not deployed
			if (!balloon.deployed) {
				continue;
			}

			// Calculate atmospheric conditions at current altitude
			const conditions = calculateAtmosphericConditions(
				atmosphereData,
				balloon.position[1],
				windEnabled,
				windIntensity,
				performance.now()
			);

			// Update balloon's atmospheric conditions
			let updatedBalloon = updateBalloonAtmosphere(balloon, conditions);

			// Calculate forces acting on the balloon
			const forces = calculateAllForces(
				updatedBalloon.properties.mass,
				// Adjust buoyancy based on control setting
				updatedBalloon.properties.buoyancy * (1 + updatedBalloon.buoyancyControl * 0.2),
				updatedBalloon.properties.dragCoefficient,
				{
					x: updatedBalloon.velocity[0],
					y: updatedBalloon.velocity[1],
					z: updatedBalloon.velocity[2]
				},
				conditions,
				windEnabled,
				windIntensity
			);

			// Update balloon's acceleration based on forces
			updatedBalloon = updateBalloonAcceleration(updatedBalloon, forces);

			// Update balloon's velocity based on acceleration
			updatedBalloon = updateBalloonVelocity(updatedBalloon, delta);

			// Update balloon's position based on velocity
			updatedBalloon = updateBalloonPosition(updatedBalloon, delta);

			// Record scientific data if it's time
			if (currentTime - this.lastDataRecording >= this.dataRecordingRate) {
				// Record more data at lower altitudes (more interesting for Venus exploration)
				const altitudeFactor = Math.max(0.1, Math.min(1, updatedBalloon.position[1] / 80000));
				const dataAmount = (1 - altitudeFactor) * delta * 10;

				updatedBalloon = recordScientificData(updatedBalloon, dataAmount);
				this.lastDataRecording = currentTime;
			}

			// Update balloon in registry
			this.registry.update(updatedBalloon.id, () => updatedBalloon);
		}
	}

	/**
	 * Get a balloon by ID
	 * 
	 * @param id - Balloon ID
	 * @returns The balloon or undefined if not found
	 */
	getBalloon(id: string): BalloonState | undefined {
		return this.registry.get<BalloonState>(id);
	}

	/**
	 * Get all balloons
	 * 
	 * @returns Array of all balloons
	 */
	getAllBalloons(): BalloonState[] {
		return this.registry.getAll<BalloonState>();
	}

	/**
	 * Set balloon buoyancy control
	 * 
	 * @param id - Balloon ID
	 * @param control - Buoyancy control value (-1 to 1)
	 * @returns The updated balloon or undefined if not found
	 */
	setBalloonBuoyancyControl(id: string, control: number): BalloonState | undefined {
		return this.registry.update<BalloonState>(id, balloon => {
			// Clamp control value between -1 and 1
			const clampedControl = Math.max(-1, Math.min(1, control));

			return {
				...balloon,
				buoyancyControl: clampedControl
			};
		});
	}

	/**
	 * Deploy or stow balloon instruments
	 * 
	 * @param id - Balloon ID
	 * @param instrumentIndex - Index of the instrument
	 * @param deploy - Whether to deploy or stow the instrument
	 * @returns The updated balloon or undefined if not found
	 */
	setInstrumentDeployed(
		id: string,
		instrumentIndex: number,
		deploy: boolean
	): BalloonState | undefined {
		return this.registry.update<BalloonState>(id, balloon => {
			if (instrumentIndex < 0 || instrumentIndex >= balloon.instrumentsActive.length) {
				return balloon; // Invalid instrument index
			}

			const newInstrumentsActive = [...balloon.instrumentsActive];
			newInstrumentsActive[instrumentIndex] = deploy;

			return {
				...balloon,
				instrumentsActive: newInstrumentsActive
			};
		});
	}
}

/**
 * A singleton instance of the FlightSystem
 */
let flightSystemInstance: FlightSystem | null = null;

/**
 * Get the singleton FlightSystem instance
 * 
 * @param options - Options for creating the flight system (only used if not already created)
 * @returns The FlightSystem instance
 */
export function getFlightSystem(options: FlightSystemOptions): FlightSystem {
	if (!flightSystemInstance) {
		flightSystemInstance = new FlightSystem(options);
	}

	return flightSystemInstance;
}

/**
 * Reset the FlightSystem instance (for testing or simulation reset)
 * 
 * @param options - Options for the new flight system
 */
export function resetFlightSystem(options: FlightSystemOptions): void {
	flightSystemInstance = new FlightSystem(options);
}