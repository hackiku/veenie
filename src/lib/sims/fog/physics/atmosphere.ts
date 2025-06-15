// src/lib/sims/fog/physics/atmosphere.ts

import { VENUS_CONSTANTS, CONVERSIONS } from '../constants';

export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // Pa
	altitude: number;     // meters
	layer: string;        // Layer name
	visibility: number;   // meters (for fog)
}

/**
 * Calculate atmospheric conditions at a given altitude on Venus
 */
export function getAtmosphericConditions(altitude: number): AtmosphericConditions {
	// Clamp altitude to reasonable bounds
	const clampedAlt = Math.max(0, Math.min(VENUS_CONSTANTS.MAX_ALTITUDE, altitude));

	// Calculate temperature using linear interpolation
	const temperature = interpolateTemperature(clampedAlt);

	// Calculate pressure using barometric formula
	const pressure = VENUS_CONSTANTS.SURFACE_DENSITY *
		Math.exp(-clampedAlt / VENUS_CONSTANTS.SCALE_HEIGHT) *
		VENUS_CONSTANTS.GRAVITY * 100; // Convert to Pa

	// Calculate density using ideal gas law approximation
	const gasDensity = pressure / (188.92 * temperature); // Venus CO2 gas constant

	// Get atmospheric layer
	const layer = getAtmosphericLayer(clampedAlt);

	// Calculate visibility based on density and altitude
	const visibility = calculateVisibility(clampedAlt, gasDensity);

	return {
		density: Math.max(0.001, gasDensity),
		temperature,
		pressure: Math.max(1, pressure),
		altitude: clampedAlt,
		layer: layer.name,
		visibility
	};
}

/**
 * Interpolate temperature based on altitude
 */
function interpolateTemperature(altitude: number): number {
	const profile = VENUS_CONSTANTS.TEMPERATURE_PROFILE;

	// Find the two points to interpolate between
	for (let i = 0; i < profile.length - 1; i++) {
		const lower = profile[i];
		const upper = profile[i + 1];

		if (altitude >= lower.altitude && altitude <= upper.altitude) {
			const ratio = (altitude - lower.altitude) / (upper.altitude - lower.altitude);
			return lower.temperature + (upper.temperature - lower.temperature) * ratio;
		}
	}

	// Handle edge cases
	if (altitude < profile[0].altitude) {
		return profile[0].temperature;
	} else {
		return profile[profile.length - 1].temperature;
	}
}

/**
 * Get the atmospheric layer for a given altitude
 */
function getAtmosphericLayer(altitude: number) {
	const layers = VENUS_CONSTANTS.ATMOSPHERE_LAYERS;

	// Find the appropriate layer
	for (let i = layers.length - 1; i >= 0; i--) {
		if (altitude >= layers[i].altitude) {
			return layers[i];
		}
	}

	return layers[0]; // Default to surface layer
}

/**
 * Calculate visibility based on atmospheric density
 */
function calculateVisibility(altitude: number, density: number): number {
	// Base visibility in meters
	let visibility = 50000; // 50km max visibility

	// Reduce visibility based on density
	const densityFactor = Math.min(density / 1.0, 10); // Normalize to reasonable range
	visibility = visibility / (1 + densityFactor * 2);

	// Special cases for Venus atmospheric layers
	if (altitude < 20000) {
		// Very dense lower atmosphere
		visibility = Math.min(visibility, 5000);
	} else if (altitude >= 48000 && altitude <= 65000) {
		// Cloud layer - reduced visibility
		visibility = Math.min(visibility, 15000);
	} else if (altitude > 80000) {
		// Clear upper atmosphere
		visibility = Math.max(visibility, 30000);
	}

	return Math.max(1000, Math.min(100000, visibility));
}

/**
 * Get fog color for a given altitude
 */
export function getFogColor(altitude: number): string {
	const layer = getAtmosphericLayer(altitude);
	return layer.color;
}

/**
 * Get fog density for atmospheric conditions
 */
export function getFogDensity(conditions: AtmosphericConditions): number {
	// Base density from visibility
	const baseDensity = 0.00005;
	const visibilityFactor = 10000 / conditions.visibility;

	return Math.max(0.00001, Math.min(0.001, baseDensity * visibilityFactor));
}