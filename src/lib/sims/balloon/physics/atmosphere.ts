// src/lib/sims/balloon/physics/atmosphere.ts
import { SIMULATION_CONSTANTS } from '../constants';

// Pure metric Venus atmospheric model
export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // kPa
	altitude: number;     // meters
}

/**
 * Calculate atmospheric conditions at a given altitude in meters
 */
export function getAtmosphericConditions(altitude: number): AtmosphericConditions {
	const { SURFACE_DENSITY, SCALE_HEIGHT } = SIMULATION_CONSTANTS;

	// Calculate density using exponential model (pure metric)
	const density = SURFACE_DENSITY * Math.exp(-altitude / SCALE_HEIGHT);

	// Calculate temperature - linear approximation
	// Venus surface temp is about 735K, dropping to ~300K at 55km
	const surfaceTemp = 735;
	const tempGradient = (735 - 300) / 55000; // K/m
	const temperature = Math.max(300, surfaceTemp - (altitude * tempGradient));

	// Calculate pressure using a simplified model (pure metric)
	// Venus surface pressure is about 9.2 MPa (92 bars)
	const surfacePressure = 9200; // kPa
	const pressure = surfacePressure * Math.exp(-altitude / SCALE_HEIGHT);

	return {
		density,
		temperature,
		pressure,
		altitude
	};
}