// src/lib/sims/material/state/telemetry.ts
import type { AtmosphericConditions } from '../core/atmosphere';
import type { VehicleProperties } from '../core/vehicleProperties';

/**
 * Telemetry data for the Venus Balloon simulation
 */
export interface Telemetry {
	// Position and movement
	position: [number, number, number];
	velocity: [number, number, number];
	altitude: number;

	// Atmospheric conditions
	atmospheric: {
		density: number;
		temperature: number;
		pressure: number;
		windVector: {
			x: number;
			y: number;
			z: number;
		} | null;
	};

	// Vehicle data
	vehicle: {
		name: string;
		type: string;
		mass: number;
		buoyancy: number;
		dragCoefficient: number;
	};

	// Forces
	forces: {
		buoyancy: { x: number; y: number; z: number };
		drag: { x: number; y: number; z: number };
		wind: { x: number; y: number; z: number } | null;
		gravity: { x: number; y: number; z: number };
		total: { x: number; y: number; z: number };
	};

	// Simulation state
	simulation: {
		isPaused: boolean;
		isDebug: boolean;
		timeScale: number;
		elapsedTime: number;
		windEnabled: boolean;
		windIntensity: number;
		sessionId: string | null;
	};
}

/**
 * Create default telemetry data
 */
export function createDefaultTelemetry(): Telemetry {
	return {
		// Position and movement
		position: [0, 51000, 0],
		velocity: [0, 0, 0],
		altitude: 51000,

		// Atmospheric conditions
		atmospheric: {
			density: 0,
			temperature: 0,
			pressure: 0,
			windVector: null
		},

		// Vehicle data
		vehicle: {
			name: "Research Balloon",
			type: "balloon",
			mass: 1.2,
			buoyancy: 0.35,
			dragCoefficient: 0.05
		},

		// Forces (initially zero)
		forces: {
			buoyancy: { x: 0, y: 0, z: 0 },
			drag: { x: 0, y: 0, z: 0 },
			wind: null,
			gravity: { x: 0, y: -8.87, z: 0 },
			total: { x: 0, y: 0, z: 0 }
		},

		// Simulation state
		simulation: {
			isPaused: false,
			isDebug: false,
			timeScale: 1.0,
			elapsedTime: 0,
			windEnabled: true,
			windIntensity: 1.0,
			sessionId: null
		}
	};
}

/**
 * Update telemetry with atmospheric conditions
 */
export function updateAtmosphericTelemetry(
	telemetry: Telemetry,
	conditions: AtmosphericConditions
): Telemetry {
	return {
		...telemetry,
		atmospheric: {
			density: conditions.density,
			temperature: conditions.temperature,
			pressure: conditions.pressure,
			windVector: conditions.windVector ? {
				x: conditions.windVector.x,
				y: conditions.windVector.y,
				z: conditions.windVector.z
			} : null
		}
	};
}

/**
 * Update telemetry with vehicle properties
 */
export function updateVehicleTelemetry(
	telemetry: Telemetry,
	vehicle: VehicleProperties
): Telemetry {
	return {
		...telemetry,
		vehicle: {
			name: vehicle.name,
			type: vehicle.type,
			mass: vehicle.mass || 1.2,
			buoyancy: vehicle.buoyancy || 0.35,
			dragCoefficient: vehicle.dragCoefficient || 0.05
		}
	};
}

/**
 * Update forces in telemetry
 */
export function updateForcesTelemetry(
	telemetry: Telemetry,
	forces: Telemetry['forces']
): Telemetry {
	return {
		...telemetry,
		forces
	};
}