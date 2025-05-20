// src/lib/sims/balloon/physics/atmosphere.ts

// Simple Venus atmospheric model
export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // kPa
	altitude: number;     // m
}

export interface AtmosphereConfig {
	surfaceDensity: number;   // kg/m³ at surface
	scaleHeight: number;      // km
	surfaceTemperature: number; // K
	lapseRate: number;        // K/m
	simulationHeight: number; // m - used to scale altitudes
}

// Default Venus atmospheric model
export const DEFAULT_ATMOSPHERE: AtmosphereConfig = {
	surfaceDensity: 65.0,      // Venus has ~65x Earth's density
	scaleHeight: 15.5,         // Scale height in km
	surfaceTemperature: 735,   // Surface temp in K
	lapseRate: 0.008,          // Temperature decrease with altitude (K/m)
	simulationHeight: 100.0,   // Maximum simulation height
};

/**
 * Calculate atmospheric conditions at a given altitude
 */
export function getAtmosphericConditions(
	altitude: number,
	config: AtmosphereConfig = DEFAULT_ATMOSPHERE
): AtmosphericConditions {
	// Convert simulation units to kilometers for the density equation
	const altitudeKm = altitude / (config.simulationHeight / 100);

	// Calculate density using exponential model
	const density = config.surfaceDensity * Math.exp(-altitudeKm / config.scaleHeight);

	// Calculate temperature using linear lapse rate
	const temperature = config.surfaceTemperature - (altitude * config.lapseRate);

	// Estimate pressure (simplified, using ideal gas law approximation)
	const pressure = density * 0.08 * temperature;

	return {
		density,
		temperature,
		pressure,
		altitude
	};
}