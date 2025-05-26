// src/lib/sims/venus/physics/engine.ts

import { getSunPosition, getVenusRotation, VENUS_ORBITAL } from './orbital';

/**
 * Simple Venus Physics Engine
 * 
 * Coordinates all physics calculations and provides a unified interface
 * for time-stepped simulation data.
 */

export interface VenusEngineState {
	time: {
		simulationTime: number;    // Current simulation time in seconds
		venusDay: number;          // Current Venus day (0-243)
		venusYear: number;         // Current Venus year
		orbitPhase: number;        // Orbital phase (0-1)
	};
	orbital: {
		sunPosition: [number, number, number];  // Sun position in render coordinates
		venusRotation: number;     // Venus rotation angle in degrees
	};
	// Future additions:
	// atmospheric: { ... }
	// thermal: { ... }
	// mission: { ... }
}

export class VenusEngine {
	private state: VenusEngineState;

	constructor() {
		this.state = {
			time: {
				simulationTime: 0,
				venusDay: 0,
				venusYear: 0,
				orbitPhase: 0
			},
			orbital: {
				sunPosition: [30000, 0, 0], // Initial position
				venusRotation: 0
			}
		};
	}

	/**
	 * Update engine state based on simulation time
	 */
	update(simulationTime: number): VenusEngineState {
		this.state.time.simulationTime = simulationTime;

		// Calculate time units
		const daySeconds = 24 * 3600;
		const venusYearSeconds = VENUS_ORBITAL.ORBITAL_PERIOD_DAYS * daySeconds;

		this.state.time.venusDay = simulationTime / (VENUS_ORBITAL.ROTATION_PERIOD_DAYS * daySeconds);
		this.state.time.venusYear = simulationTime / venusYearSeconds;
		this.state.time.orbitPhase = (simulationTime / venusYearSeconds) % 1;

		// Update orbital mechanics
		this.state.orbital.sunPosition = getSunPosition(simulationTime);
		this.state.orbital.venusRotation = getVenusRotation(simulationTime);

		return this.state;
	}

	/**
	 * Get current engine state
	 */
	getState(): VenusEngineState {
		return this.state;
	}

	/**
	 * Reset engine to initial state
	 */
	reset(): void {
		this.state = {
			time: {
				simulationTime: 0,
				venusDay: 0,
				venusYear: 0,
				orbitPhase: 0
			},
			orbital: {
				sunPosition: [30000, 0, 0],
				venusRotation: 0
			}
		};
	}
}

// Export singleton instance for convenience
export const venusEngine = new VenusEngine();