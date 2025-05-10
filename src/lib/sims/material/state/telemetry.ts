// src/lib/sims/material/state/telemetry.ts

import { createSignal } from 'svelte';
import type { BalloonState } from '../core/entities/Balloon';

/**
 * Interface for flight telemetry data
 */
export interface FlightTelemetry {
	altitude: number;        // current altitude in meters
	velocity: number;        // vertical velocity in m/s
	horizontalSpeed: number; // horizontal speed in m/s
	temperature: number;     // external temperature in K
	pressure: number;        // external pressure in kPa
	density: number;         // atmospheric density in kg/m³
	buoyancyControl: number; // buoyancy control setting (-1 to 1)
	dataCollected: number;   // scientific data collected
	health: number;          // balloon health (0-1)
	energyRemaining: number; // energy remaining (0-1)
	ballastRemaining: number;// ballast remaining in kg
}

/**
 * Create telemetry data from balloon state
 * 
 * @param balloon - Current balloon state
 * @returns Flight telemetry data
 */
export function createTelemetryFromBalloon(balloon: BalloonState): FlightTelemetry {
	const horizontalSpeed = Math.sqrt(
		Math.pow(balloon.velocity[0], 2) + Math.pow(balloon.velocity[2], 2)
	);

	return {
		altitude: balloon.position[1],
		velocity: balloon.velocity[1],
		horizontalSpeed,
		temperature: balloon.atmosphericConditions?.temperature || 0,
		pressure: balloon.atmosphericConditions?.pressure || 0,
		density: balloon.atmosphericConditions?.density || 0,
		buoyancyControl: balloon.buoyancyControl,
		dataCollected: balloon.dataCollected,
		health: balloon.health,
		energyRemaining: balloon.energyRemaining,
		ballastRemaining: balloon.ballastRemaining
	};
}

/**
 * Create a telemetry store for tracking flight data
 * 
 * @returns Telemetry store API
 */
export function createTelemetryStore() {
	// Current telemetry data
	const [telemetry, setTelemetry] = createSignal<FlightTelemetry | null>(null);

	// History of telemetry data (for graphs)
	const [history, setHistory] = createSignal<FlightTelemetry[]>([]);

	// Maximum history size
	const maxHistorySize = 100;

	// Update telemetry with new balloon state
	function update(balloon: BalloonState) {
		const newTelemetry = createTelemetryFromBalloon(balloon);
		setTelemetry(newTelemetry);

		// Add to history and limit size
		setHistory(prev => {
			const newHistory = [...prev, newTelemetry];
			if (newHistory.length > maxHistorySize) {
				return newHistory.slice(newHistory.length - maxHistorySize);
			}
			return newHistory;
		});
	}

	// Clear history
	function clear() {
		setTelemetry(null);
		setHistory([]);
	}

	return {
		get: () => telemetry(),
		getHistory: () => history(),
		update,
		clear
	};
}