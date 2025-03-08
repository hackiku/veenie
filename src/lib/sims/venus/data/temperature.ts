// src/lib/sims/venus/data/temperature.ts

import { Color } from 'three';

/**
 * Venus temperature profile data
 * Temperatures in Kelvin and altitude in km
 */

export interface TemperaturePoint {
	altitude: number;  // km
	temperature: number; // K
	color?: Color;    // For visualization
}

// Venus temperature profile from observation data
export const temperatureProfile: TemperaturePoint[] = [
	{ altitude: 0, temperature: 735, color: new Color(0xFF5500) },
	{ altitude: 5, temperature: 697.15, color: new Color(0xFF6600) },
	{ altitude: 10, temperature: 658.15, color: new Color(0xFF7700) },
	{ altitude: 15, temperature: 621.15, color: new Color(0xFF8800) },
	{ altitude: 20, temperature: 579.15, color: new Color(0xFF9900) },
	{ altitude: 25, temperature: 537.15, color: new Color(0xFFAA00) },
	{ altitude: 30, temperature: 495.15, color: new Color(0xFFBB00) },
	{ altitude: 35, temperature: 453.15, color: new Color(0xFFCC00) },
	{ altitude: 40, temperature: 416.15, color: new Color(0xFFDD00) },
	{ altitude: 45, temperature: 383.15, color: new Color(0xFFEE00) },
	{ altitude: 50, temperature: 348.15, color: new Color(0xFFFF00) },
	{ altitude: 55, temperature: 300.15, color: new Color(0xEEFF00) },
	{ altitude: 60, temperature: 263.15, color: new Color(0xDDFF00) },
	{ altitude: 65, temperature: 243.15, color: new Color(0xCCFF00) },
	{ altitude: 70, temperature: 230.15, color: new Color(0xBBFF00) },
	{ altitude: 80, temperature: 197.15, color: new Color(0x99FF00) },
	{ altitude: 90, temperature: 169.15, color: new Color(0x77FF00) },
	{ altitude: 100, temperature: 161.15, color: new Color(0x55FF00) },
	{ altitude: 110, temperature: 165.15, color: new Color(0x33FF00) }, // Beginning of temperature inversion
	{ altitude: 120, temperature: 190.15, color: new Color(0x11FF00) },
	{ altitude: 130, temperature: 230.15, color: new Color(0x00FF11) },
	{ altitude: 140, temperature: 270.15, color: new Color(0x00FF33) },
	{ altitude: 150, temperature: 300.15, color: new Color(0x00FF55) }, // Thermosphere
	{ altitude: 200, temperature: 350.15, color: new Color(0x00FF77) }
];

// Function to get temperature at a specific altitude
export function getTemperatureAtAltitude(altitude: number): number {
	// Return surface temperature for below-surface queries
	if (altitude < 0) return temperatureProfile[0].temperature;

	// Return highest altitude temperature for queries above our data
	if (altitude > temperatureProfile[temperatureProfile.length - 1].altitude) {
		return temperatureProfile[temperatureProfile.length - 1].temperature;
	}

	// Find the two closest altitude data points
	let lowerIndex = 0;
	for (let i = 0; i < temperatureProfile.length; i++) {
		if (temperatureProfile[i].altitude <= altitude) {
			lowerIndex = i;
		}
	}

	// If exact match, return that temperature
	if (temperatureProfile[lowerIndex].altitude === altitude) {
		return temperatureProfile[lowerIndex].temperature;
	}

	// Linear interpolation between the two closest points
	const upperIndex = lowerIndex + 1;
	const lowerAlt = temperatureProfile[lowerIndex].altitude;
	const upperAlt = temperatureProfile[upperIndex].altitude;
	const lowerTemp = temperatureProfile[lowerIndex].temperature;
	const upperTemp = temperatureProfile[upperIndex].temperature;

	const factor = (altitude - lowerAlt) / (upperAlt - lowerAlt);
	return lowerTemp + factor * (upperTemp - lowerTemp);
}

// Get color for temperature visualization at a specific altitude
export function getTemperatureColor(altitude: number): Color {
	// Same logic as temperature, but for color
	if (altitude < 0) return temperatureProfile[0].color || new Color(0xFF5500);

	if (altitude > temperatureProfile[temperatureProfile.length - 1].altitude) {
		return temperatureProfile[temperatureProfile.length - 1].color || new Color(0x00FF77);
	}

	// Find the two closest altitude data points
	let lowerIndex = 0;
	for (let i = 0; i < temperatureProfile.length; i++) {
		if (temperatureProfile[i].altitude <= altitude) {
			lowerIndex = i;
		}
	}

	// If exact match, return that color
	if (temperatureProfile[lowerIndex].altitude === altitude) {
		return temperatureProfile[lowerIndex].color || new Color(0xFFFFFF);
	}

	// Interpolate colors
	const upperIndex = lowerIndex + 1;
	const lowerAlt = temperatureProfile[lowerIndex].altitude;
	const upperAlt = temperatureProfile[upperIndex].altitude;

	const factor = (altitude - lowerAlt) / (upperAlt - lowerAlt);

	const lowerColor = temperatureProfile[lowerIndex].color || new Color(0xFFFFFF);
	const upperColor = temperatureProfile[upperIndex].color || new Color(0xFFFFFF);

	// Create a new color to avoid modifying the original
	return new Color().copy(lowerColor).lerp(upperColor, factor);
}