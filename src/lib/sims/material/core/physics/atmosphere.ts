// src/lib/sims/material/core/physics/atmosphere.ts
import { Vector3 } from 'three';

/**
 * Interface for atmospheric conditions at a specific location and time
 */
export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // kPa
	windVector: Vector3;  // m/s
	altitude: number;     // m (for convenience)
}

/**
 * Interface for atmospheric layer data from database
 */
export interface AtmosphereLayer {
	altitude: number;     // km in DB, converted to m in code
	data: {
		density?: number;
		temperature?: number;
		pressure?: number;
		cloudLayers?: Array<{
			altitude: number;
			thickness: number;
			density: number;
			name: string;
			color: string;
		}>;
	}
}

/**
 * Default Venus atmospheric model constants
 */
export const VENUS_ATMOSPHERE = {
	SURFACE_DENSITY: 65,      // kg/m³
	SURFACE_TEMPERATURE: 735, // K
	SURFACE_PRESSURE: 9200,   // kPa
	SCALE_HEIGHT: 15500,      // m - atmosphere density e-folding height
	LAPSE_RATE: 0.0008,       // K/m - temperature decrease with altitude
	CLOUD_LAYERS: [
		{ altitude: 48000, thickness: 5000, density: 0.7, name: 'Lower Clouds', color: '#A08C78' },
		{ altitude: 55000, thickness: 8000, density: 0.9, name: 'Middle Clouds', color: '#D3C0A9' },
		{ altitude: 65000, thickness: 5000, density: 0.3, name: 'Upper Haze', color: '#F0E0C0' }
	]
};

/**
 * Calculate atmospheric conditions at a given altitude
 * 
 * @param atmosphereData - Atmospheric data from database
 * @param altitude - Altitude in meters
 * @param windEnabled - Whether wind should be modeled
 * @param windIntensity - Wind intensity multiplier
 * @param timeOffset - Current time for wind variation (ms)
 * @returns Atmospheric conditions
 */
export function calculateAtmosphericConditions(
	atmosphereData: AtmosphereLayer[],
	altitude: number,
	windEnabled: boolean = true,
	windIntensity: number = 1.0,
	timeOffset: number = performance.now()
): AtmosphericConditions {
	// Default values using Venus model
	const baseDensity = VENUS_ATMOSPHERE.SURFACE_DENSITY;
	const baseTemperature = VENUS_ATMOSPHERE.SURFACE_TEMPERATURE;

	// Find closest matching layer from provided data
	let dbConditions = null;
	if (atmosphereData && atmosphereData.length > 0) {
		// Find closest layer at or below this altitude
		const matchingLayers = atmosphereData
			.filter(layer => (layer.altitude * 1000) <= altitude) // Convert km to m
			.sort((a, b) => b.altitude - a.altitude);

		if (matchingLayers.length > 0) {
			dbConditions = matchingLayers[0].data;
		}
	}

	// Calculate density (use DB value if available, otherwise use exponential model)
	const density = dbConditions?.density ||
		baseDensity * Math.exp(-altitude / VENUS_ATMOSPHERE.SCALE_HEIGHT);

	// Calculate temperature (use DB value if available, otherwise use linear model)
	const temperature = dbConditions?.temperature ||
		baseTemperature - (altitude * VENUS_ATMOSPHERE.LAPSE_RATE);

	// Calculate pressure (use DB value if available, otherwise use ideal gas law)
	const pressure = dbConditions?.pressure ||
		density * 0.08 * temperature;

	// Create wind vector
	let windVector = new Vector3(0, 0, 0);

	if (windEnabled) {
		// Wind model - varies with altitude and time
		// Higher altitude = stronger winds, with periodic variations
		const timeFactor = timeOffset / 5000;

		// Base wind increases with altitude - super-rotation of Venus atmosphere
		const baseWind = 1 + altitude / 20000;

		// Add periodic variations for more realistic wind
		const xVariation = Math.sin(timeFactor) * 0.1;
		const zVariation = Math.cos(timeFactor * 1.3) * 0.05;

		windVector = new Vector3(
			baseWind * (1 + xVariation) * windIntensity,
			0, // Minimal vertical wind
			zVariation * baseWind * windIntensity
		);
	}

	return {
		density,
		temperature,
		pressure,
		windVector,
		altitude
	};
}

/**
 * Get cloud layers information
 * 
 * @param atmosphereData - Atmospheric data from database
 * @returns Array of cloud layer information
 */
export function getCloudLayers(atmosphereData: AtmosphereLayer[]) {
	// Try to find cloud layers in atmosphere data
	if (atmosphereData && atmosphereData.length > 0) {
		const venusLayer = atmosphereData.find(layer =>
			layer.data && layer.data.cloudLayers
		);

		if (venusLayer && venusLayer.data.cloudLayers) {
			return venusLayer.data.cloudLayers.map(layer => ({
				...layer,
				altitude: layer.altitude * 1000, // Convert to meters
				thickness: layer.thickness * 1000 // Convert to meters
			}));
		}
	}

	// Return default Venus cloud layers if not found in data
	return VENUS_ATMOSPHERE.CLOUD_LAYERS;
}