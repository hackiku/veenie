// src/lib/data/flight/atmosphericLayers.ts

// Define the atmospheric layers with properties
export interface AtmosphericLayer {
	name: string;           // Layer name
	startAltitude: number;  // Starting altitude in km
	endAltitude: number;    // Ending altitude in km
	color: string;          // Base color for visualization
	temperature: {          // Temperature range
		min: number;          // Minimum temperature in °C
		max: number;          // Maximum temperature in °C
	};
	pressure: {             // Pressure range
		min: number;          // Minimum pressure in bar
		max: number;          // Maximum pressure in bar
	};
	opacity: number;        // Base opacity for visualization
	description: string;    // Description of this layer
}

// Detailed layer information based on the Wikipedia data
export const VENUS_ATMOSPHERIC_LAYERS: AtmosphericLayer[] = [
	{
		name: "Surface Layer",
		startAltitude: 0,
		endAltitude: 20,
		color: "#F6A309", // Orange-yellow surface haze
		temperature: {
			min: 306,
			max: 462
		},
		pressure: {
			min: 22.52,
			max: 92.10
		},
		opacity: 0.3,
		description: "Extremely hot and dense surface layer with crushing pressure"
	},
	{
		name: "Lower Haze",
		startAltitude: 20,
		endAltitude: 45,
		color: "#fff5cc", // Light yellow lower haze
		temperature: {
			min: 110,
			max: 306
		},
		pressure: {
			min: 1.979,
			max: 22.52
		},
		opacity: 0.2,
		description: "Thick haze layer with high temperature and pressure"
	},
	{
		name: "Cloud Layer",
		startAltitude: 45,
		endAltitude: 60,
		color: "#fffaf0", // Whitish clouds
		temperature: {
			min: -10,
			max: 110
		},
		pressure: {
			min: 0.2357,
			max: 1.979
		},
		opacity: 0.3,
		description: "Main sulfuric acid cloud deck, habitable temperatures at ~50-55km"
	},
	{
		name: "Upper Haze",
		startAltitude: 60,
		endAltitude: 70,
		color: "#e6f7ff", // Light blue upper haze
		temperature: {
			min: -43,
			max: -10
		},
		pressure: {
			min: 0.0369,
			max: 0.2357
		},
		opacity: 0.15,
		description: "Upper cloud layer with cooler temperatures"
	},
	{
		name: "Mesosphere",
		startAltitude: 70,
		endAltitude: 90,
		color: "#c4e3ff", // Pale blue upper atmosphere
		temperature: {
			min: -104,
			max: -43
		},
		pressure: {
			min: 0.000374,
			max: 0.0369
		},
		opacity: 0.1,
		description: "Thin, cold upper atmosphere"
	},
	{
		name: "Thermosphere",
		startAltitude: 90,
		endAltitude: 100,
		color: "#b3d9ff", // Light blue thermosphere
		temperature: {
			min: -112,
			max: -104
		},
		pressure: {
			min: 0.0000266,
			max: 0.000374
		},
		opacity: 0.05,
		description: "Very thin, near-vacuum upper reaches of the atmosphere"
	}
];

/**
 * Get the atmospheric layer at a given altitude
 * @param altitude Altitude in km
 * @returns The atmospheric layer at the given altitude
 */
export function getLayerAtAltitude(altitude: number): AtmosphericLayer {
	// Handle altitude outside the defined range
	if (altitude < 0) {
		return VENUS_ATMOSPHERIC_LAYERS[0]; // Return surface layer
	}

	if (altitude > 100) {
		return VENUS_ATMOSPHERIC_LAYERS[VENUS_ATMOSPHERIC_LAYERS.length - 1]; // Return top layer
	}

	// Find the layer that contains this altitude
	for (const layer of VENUS_ATMOSPHERIC_LAYERS) {
		if (altitude >= layer.startAltitude && altitude < layer.endAltitude) {
			return layer;
		}
	}

	// Fallback to surface layer (should never reach here if layers are defined correctly)
	return VENUS_ATMOSPHERIC_LAYERS[0];
}