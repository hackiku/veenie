// src/lib/sims/material/core/atmosphere.ts
import { Vector3 } from 'three';

export interface AtmosphericConditions {
	density: number;     // kg/m³
	temperature: number; // Kelvin
	pressure: number;    // kPa
	windVector: Vector3; // m/s
	altitude: number;    // m (for convenience)
}

export interface AtmosphereLayer {
	altitude: number;
	data: {
		density?: number;
		temperature?: number;
		pressure?: number;
	}
}

/**
 * Calculate atmospheric conditions at a given altitude
 */
export function getAtmosphericConditions(
	atmosphereData: AtmosphereLayer[],
	altitude: number,
	windEnabled: boolean = true,
	windIntensity: number = 1.0,
	timeOffset: number = performance.now()
): AtmosphericConditions {
	// Default values for Venus
	const baseDensity = 43.5;     // kg/m³ (surface)
	const baseTemperature = 735;  // K (surface)

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

	// Calculate density (use DB value if available)
	const density = dbConditions?.density ||
		baseDensity * Math.exp(-altitude / 10000); // Scale height

	// Calculate temperature (use DB value if available)
	const temperature = dbConditions?.temperature ||
		baseTemperature - (altitude / 1000) * 0.5; // Temp decreases with altitude

	// Calculate pressure (use DB value if available)
	const pressure = dbConditions?.pressure ||
		density * 0.08 * temperature;

	// Create wind vector
	let windVector = new Vector3(0, 0, 0);

	if (windEnabled) {
		const timeFactor = timeOffset / 5000;
		const baseWind = 1 + altitude / 20000;
		const xVariation = Math.sin(timeFactor) * 0.1;
		const zVariation = Math.cos(timeFactor * 1.3) * 0.05;

		windVector = new Vector3(
			baseWind * (1 + xVariation) * windIntensity,
			0,
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
 */
export function getCloudLayers(atmosphereData: any[]) {
	// Default Venus cloud layers
	const defaultLayers = [
		{ altitude: 48000, thickness: 5000, density: 0.7, name: 'Lower Clouds', color: '#A08C78' },
		{ altitude: 55000, thickness: 8000, density: 0.9, name: 'Middle Clouds', color: '#D3C0A9' },
		{ altitude: 65000, thickness: 5000, density: 0.3, name: 'Upper Haze', color: '#F0E0C0' }
	];

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

	return defaultLayers;
}