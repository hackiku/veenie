// src/lib/sims/custom-engine/physics/atmosphere.ts
import { SIMULATION_CONSTANTS } from '../constants';

// Simple Venus atmospheric model
export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // kPa
	altitude: number;     // m
}

/**
 * Calculate atmospheric conditions at a given altitude
 */
export function getAtmosphericConditions(altitude: number): AtmosphericConditions {
	const { SURFACE_DENSITY, SCALE_HEIGHT, CEILING_HEIGHT } = SIMULATION_CONSTANTS;

	// Convert simulation units to kilometers
	const altitudeKm = altitude / (CEILING_HEIGHT / 100);

	// Calculate density using exponential model
	const density = SURFACE_DENSITY * Math.exp(-altitudeKm / SCALE_HEIGHT);

	// Calculate temperature - linear approximation
	// Venus surface temp is about 735K, dropping to ~300K at 55km
	const surfaceTemp = 735;
	const tempGradient = (735 - 300) / 55; // K/km
	const temperature = Math.max(300, surfaceTemp - (altitudeKm * tempGradient));

	// Calculate pressure using a simplified model
	// Venus surface pressure is about 9.2 MPa (92 bars), using similar exponential drop
	const surfacePressure = 9200; // kPa
	const pressure = surfacePressure * Math.exp(-altitudeKm / SCALE_HEIGHT);

	return {
		density,
		temperature,
		pressure,
		altitude
	};
}