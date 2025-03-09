// src/lib/data/flight/venusAtmosphere.ts
// Enhanced atmospheric model for Venus based on real data

import { ALTITUDE } from './constants';
import { VENUS_ATMOSPHERIC_LAYERS, getLayerAtAltitude } from './atmosphericLayers';

/**
 * Calculate temperature at a given altitude (in Celsius)
 * @param altitude Altitude in km
 * @returns Temperature in Celsius
 */
export function getTemperatureAtAltitude(altitude: number): number {
	const layer = getLayerAtAltitude(altitude);

	// Linear interpolation within the layer
	const t = (altitude - layer.startAltitude) / (layer.endAltitude - layer.startAltitude);
	return layer.temperature.max - t * (layer.temperature.max - layer.temperature.min);
}

/**
 * Calculate pressure at a given altitude (in bars)
 * @param altitude Altitude in km
 * @returns Pressure in bars
 */
export function getPressureAtAltitude(altitude: number): number {
	const layer = getLayerAtAltitude(altitude);

	// For pressure, we use logarithmic interpolation since pressure decreases exponentially with altitude
	const t = (altitude - layer.startAltitude) / (layer.endAltitude - layer.startAltitude);
	const logMin = Math.log(layer.pressure.min);
	const logMax = Math.log(layer.pressure.max);

	return Math.exp(logMax - t * (logMax - logMin));
}

/**
 * Get color for visualization at a given altitude
 * @param altitude Altitude in km
 * @returns Hex color string
 */
export function getColorAtAltitude(altitude: number): string {
	// Find the containing layer
	const layer = getLayerAtAltitude(altitude);

	// If we're near a boundary, interpolate between layers
	const BLEND_RANGE = 2; // km range for blending between layers

	// If we're near the upper boundary, blend with the next layer up
	if (altitude > layer.endAltitude - BLEND_RANGE && layer.endAltitude < 100) {
		const nextLayerIndex = VENUS_ATMOSPHERIC_LAYERS.findIndex(l => l.name === layer.name) + 1;
		if (nextLayerIndex < VENUS_ATMOSPHERIC_LAYERS.length) {
			const nextLayer = VENUS_ATMOSPHERIC_LAYERS[nextLayerIndex];
			const t = (altitude - (layer.endAltitude - BLEND_RANGE)) / BLEND_RANGE;

			return blendColors(layer.color, nextLayer.color, t);
		}
	}

	// If we're near the lower boundary, blend with the previous layer
	if (altitude < layer.startAltitude + BLEND_RANGE && layer.startAltitude > 0) {
		const prevLayerIndex = VENUS_ATMOSPHERIC_LAYERS.findIndex(l => l.name === layer.name) - 1;
		if (prevLayerIndex >= 0) {
			const prevLayer = VENUS_ATMOSPHERIC_LAYERS[prevLayerIndex];
			const t = 1 - (altitude - layer.startAltitude) / BLEND_RANGE;

			return blendColors(layer.color, prevLayer.color, t);
		}
	}

	// Return the layer's base color
	return layer.color;
}

/**
 * Helper function to blend two colors
 * @param color1 First color as hex string
 * @param color2 Second color as hex string
 * @param ratio Blend ratio (0 = all color1, 1 = all color2)
 * @returns Blended color as hex string
 */
function blendColors(color1: string, color2: string, ratio: number): string {
	// Convert hex to RGB
	const r1 = parseInt(color1.substring(1, 3), 16);
	const g1 = parseInt(color1.substring(3, 5), 16);
	const b1 = parseInt(color1.substring(5, 7), 16);

	const r2 = parseInt(color2.substring(1, 3), 16);
	const g2 = parseInt(color2.substring(3, 5), 16);
	const b2 = parseInt(color2.substring(5, 7), 16);

	// Blend colors
	const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
	const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
	const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

	// Convert back to hex
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Get a descriptive status message for the current altitude
 * @param altitude Altitude in km
 * @returns Status message about current conditions
 */
export function getStatusForAltitude(altitude: number): string {
	const layer = getLayerAtAltitude(altitude);
	const temp = getTemperatureAtAltitude(altitude);
	const pressure = getPressureAtAltitude(altitude);

	// Create appropriate messages
	if (altitude >= 48 && altitude <= 55) {
		return "Optimal flying zone - Earth-like conditions";
	} else if (altitude < 20) {
		return "Warning: Extreme heat and pressure!";
	} else if (altitude > 70) {
		return "Warning: Low pressure, cold temperatures";
	} else {
		return `Current layer: ${layer.name}`;
	}
}

/**
 * Check if current altitude is in the habitable zone
 * @param altitude Altitude in km  
 * @returns Whether altitude is in Venus's habitable zone
 */
export function isInHabitableZone(altitude: number): boolean {
	return altitude >= 48 && altitude <= 55;
}

/**
 * Convert temperature from Celsius to Kelvin
 * @param celsius Temperature in Celsius
 * @returns Temperature in Kelvin
 */
export function celsiusToKelvin(celsius: number): number {
	return celsius + 273.15;
}

/**
 * Convert temperature from Kelvin to Celsius
 * @param kelvin Temperature in Kelvin
 * @returns Temperature in Celsius
 */
export function kelvinToCelsius(kelvin: number): number {
	return kelvin - 273.15;
}

/**
 * Get temperature at a given altitude in Kelvin (for compatibility with existing code)
 * @param altitude Altitude in km
 * @returns Temperature in Kelvin
 */
export function getTemperatureAtAltitudeK(altitude: number): number {
	return celsiusToKelvin(getTemperatureAtAltitude(altitude));
}

// Re-export what we need
export { VENUS_ATMOSPHERIC_LAYERS, getLayerAtAltitude };