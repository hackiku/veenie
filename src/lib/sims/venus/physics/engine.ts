// src/lib/sims/venus/physics/engine.ts

import { getSunPosition, getVenusRotation, VENUS_PARAMS } from './orbital';

/**
 * Simple Venus Physics Engine
 * 
 * Coordinates all physics calculations and provides a unified interface
 * for time-stepped simulation data.
 */

export interface VenusEngineState {
	time: {
		simulationTime: number;    // Current simulation time in seconds
		venusDay: number;          // Current Venus day (fractional)
		sunOrbitPhase: number;     // Sun orbit phase (0-1)
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
				sunOrbitPhase: 0
			},
			orbital: {
				sunPosition: [25000, 5000, 0], // Initial position
				venusRotation: 0
			}
		};
	}

	/**
	 * Update engine state based on simulation time
	 */
	update(simulationTime: number): VenusEngineState {
		this.state.time.simulationTime = simulationTime;

		// Calculate time units (Venus-centric)
		const venusHourSeconds = VENUS_PARAMS.ROTATION_PERIOD_HOURS * 3600;
		this.state.time.venusDay = simulationTime / venusHourSeconds;
		this.state.time.sunOrbitPhase = (simulationTime / VENUS_PARAMS.SUN_ORBIT_PERIOD) % 1;

		// Update positions
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
				sunOrbitPhase: 0
			},
			orbital: {
				sunPosition: [25000, 5000, 0],
				venusRotation: 0
			}
		};
	}
}

// Export singleton instance for convenience
export const venusEngine = new VenusEngine();