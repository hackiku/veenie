// src/lib/sims/venus/data/atmosphericDynamics.ts

import { Color } from 'three';
import { interpolateAtmosphereValue } from './atmosphere';
import { getTemperatureAtAltitude } from './temperature';
import { getPressureAtAltitude } from './pressure';

/**
 * Venus atmospheric dynamics data
 * Captures the complex fluid dynamics of Venus's atmosphere including:
 * - Super-rotation of the atmosphere (60x faster than surface)
 * - Hadley cells and circulation patterns
 * - Polar vortices
 * - Vertical convection patterns
 */

// Wind speed profile by altitude
export const windSpeedProfile = {
	// Altitude (km) and corresponding zonal wind speeds (m/s)
	altitudes: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
	speeds: [0.5, 5, 20, 40, 60, 80, 95, 100, 75, 45, 20, 5, 0.5] // m/s
};

// Atmospheric circulation cells
export interface CirculationCell {
	name: string;
	altitudeBottom: number; // km
	altitudeTop: number;    // km
	latitudeExtent: number; // degrees from equator
	flowDirection: 'prograde' | 'retrograde';
	strength: number;       // relative strength factor, 1.0 = normal
}

// Venus has a complex multi-cell circulation pattern
export const circulationCells: CirculationCell[] = [
	{
		name: 'Equatorial Hadley Cell',
		altitudeBottom: 0,
		altitudeTop: 60,
		latitudeExtent: 45, // Extends to about 45° N/S
		flowDirection: 'retrograde',
		strength: 1.0
	},
	{
		name: 'Mid-latitude Cell',
		altitudeBottom: 0,
		altitudeTop: 60,
		latitudeExtent: 75, // From ~45° to ~75° N/S
		flowDirection: 'retrograde',
		strength: 0.7
	},
	{
		name: 'Polar Cell',
		altitudeBottom: 0,
		altitudeTop: 70,
		latitudeExtent: 90, // From ~75° to poles
		flowDirection: 'retrograde',
		strength: 0.5
	}
];

// Polar vortex characteristics
export interface PolarVortex {
	center: { latitude: number; longitude: number }; // degrees
	radiusExtent: number;  // degrees from center
	rotationPeriod: number; // Earth days (negative for clockwise)
	altitudeBottom: number; // km
	altitudeTop: number;    // km
	speed: number;         // m/s maximum wind speed
}

export const polarVortices: PolarVortex[] = [
	{
		center: { latitude: 90, longitude: 0 }, // North pole
		radiusExtent: 15, // Covers ~15° from pole
		rotationPeriod: -2.5, // 2.5 Earth days, clockwise
		altitudeBottom: 60,
		altitudeTop: 80,
		speed: 40 // m/s
	},
	{
		center: { latitude: -90, longitude: 0 }, // South pole
		radiusExtent: 15, // Covers ~15° from pole
		rotationPeriod: -2.7, // 2.7 Earth days, clockwise
		altitudeBottom: 60,
		altitudeTop: 80,
		speed: 35 // m/s
	}
];

// Cloud structure characteristics
export interface CloudLayer {
	name: string;
	altitudeBottom: number; // km
	altitudeTop: number;    // km
	composition: string;
	particleSize: [number, number]; // μm (min, max)
	opacity: number; // 0-1 scale
	color: Color;
}

export const cloudLayers: CloudLayer[] = [
	{
		name: 'Lower Haze Layer',
		altitudeBottom: 30,
		altitudeTop: 48,
		composition: 'Sulfuric acid droplets, unknown particles',
		particleSize: [1, 3],
		opacity: 0.5,
		color: new Color(0xE0C088)
	},
	{
		name: 'Lower Cloud Deck',
		altitudeBottom: 48,
		altitudeTop: 52,
		composition: 'Sulfuric acid (75%), other sulfur compounds',
		particleSize: [1, 2],
		opacity: 0.8,
		color: new Color(0xD6C69C)
	},
	{
		name: 'Middle Cloud Deck',
		altitudeBottom: 52,
		altitudeTop: 57,
		composition: 'Sulfuric acid (85%)',
		particleSize: [1, 1.5],
		opacity: 0.9,
		color: new Color(0xCCC2A0)
	},
	{
		name: 'Upper Cloud Deck',
		altitudeBottom: 57,
		altitudeTop: 68,
		composition: 'Sulfuric acid (95%)',
		particleSize: [0.2, 1],
		opacity: 0.7,
		color: new Color(0xC2BEA4)
	},
	{
		name: 'Upper Haze',
		altitudeBottom: 68,
		altitudeTop: 90,
		composition: 'Sulfuric acid aerosols, unknown UV absorber',
		particleSize: [0.1, 0.2],
		opacity: 0.4,
		color: new Color(0xB8BAA8)
	}
];

// Weather features
export interface WeatherFeature {
	name: string;
	type: 'wave' | 'streak' | 'cell' | 'bow' | 'vortex';
	altitudeRange: [number, number]; // km
	latitudeRange: [number, number];  // degrees
	duration: number; // Earth days (typical lifespan)
	description: string;
}

export const weatherFeatures: WeatherFeature[] = [
	{
		name: 'Y-Feature',
		type: 'wave',
		altitudeRange: [60, 70],
		latitudeRange: [-10, 10],
		duration: 10,
		description: 'Global Y-shaped cloud structure visible in UV, possibly a planetary wave'
	},
	{
		name: 'Bow-shaped Waves',
		type: 'bow',
		altitudeRange: [55, 65],
		latitudeRange: [-30, 30],
		duration: 3,
		description: 'Curved cloud features resembling bow waves, possibly from mountain interactions'
	},
	{
		name: 'Cloud Cells',
		type: 'cell',
		altitudeRange: [50, 60],
		latitudeRange: [-45, 45],
		duration: 2,
		description: 'Convective cells similar to terrestrial thunderstorms'
	},
	{
		name: 'Streaks',
		type: 'streak',
		altitudeRange: [60, 70],
		latitudeRange: [-60, 60],
		duration: 5,
		description: 'Linear cloud features stretching for thousands of kilometers'
	}
];

/**
 * Get the wind speed at a specific altitude and latitude
 * @param altitude Altitude in km
 * @param latitude Latitude in degrees (-90 to 90)
 * @returns Wind speed in m/s
 */
export function getWindSpeedAt(altitude: number, latitude: number): number {
	// Get base wind speed at this altitude
	const baseSpeed = interpolateAtmosphereValue(
		altitude,
		windSpeedProfile.altitudes,
		windSpeedProfile.speeds
	);

	// Apply latitudinal variation
	// Wind speed is maximum at equator and decreases toward poles
	const latitudeFactor = Math.cos(Math.abs(latitude) * Math.PI / 180);

	// Wind speed is affected by polar vortices near the poles
	let polarFactor = 1.0;
	if (Math.abs(latitude) > 70) {
		// Check for polar vortex influence
		for (const vortex of polarVortices) {
			const latitudeDiff = Math.abs(Math.abs(latitude) - Math.abs(vortex.center.latitude));
			if (latitudeDiff < vortex.radiusExtent &&
				altitude >= vortex.altitudeBottom &&
				altitude <= vortex.altitudeTop) {
				// Inside vortex influence - enhance wind speed
				const vortexInfluence = 1 - (latitudeDiff / vortex.radiusExtent);
				polarFactor = 1 + vortexInfluence;
				break;
			}
		}
	}

	return baseSpeed * latitudeFactor * polarFactor;
}

/**
 * Get the wind direction at a specific altitude and latitude
 * @param altitude Altitude in km
 * @param latitude Latitude in degrees (-90 to 90)
 * @returns Wind direction in degrees (0 = eastward, 90 = northward, etc.)
 */
export function getWindDirectionAt(altitude: number, latitude: number): number {
	// On Venus, the primary wind direction is zonal (eastward or retrograde)
	let direction = 90; // Base direction (eastward)

	// Add meridional component from Hadley circulation
	for (const cell of circulationCells) {
		if (Math.abs(latitude) <= cell.latitudeExtent &&
			altitude >= cell.altitudeBottom &&
			altitude <= cell.altitudeTop) {
			// Inside this circulation cell
			if (Math.abs(latitude) < 45) {
				// In the lower latitudes of Hadley cell
				// Air moves from equator to poles at high altitudes
				if (altitude > (cell.altitudeTop - cell.altitudeBottom) / 2 + cell.altitudeBottom) {
					direction += Math.sign(latitude) * 5; // Slight poleward component
				} else {
					direction -= Math.sign(latitude) * 5; // Slight equatorward component
				}
			}
			break;
		}
	}

	// Add influence from polar vortices
	for (const vortex of polarVortices) {
		const latitudeDiff = Math.abs(Math.abs(latitude) - Math.abs(vortex.center.latitude));
		if (latitudeDiff < vortex.radiusExtent &&
			altitude >= vortex.altitudeBottom &&
			altitude <= vortex.altitudeTop) {
			// Inside vortex - add rotational component
			const vortexInfluence = 1 - (latitudeDiff / vortex.radiusExtent);
			direction += 45 * vortexInfluence * Math.sign(latitude);
			break;
		}
	}

	// Normalize direction to 0-360 range
	return ((direction % 360) + 360) % 360;
}

/**
 * Get the cloud layer at a specific altitude
 * @param altitude Altitude in km
 * @returns The cloud layer at this altitude, or undefined if outside cloud layers
 */
export function getCloudLayerAt(altitude: number): CloudLayer | undefined {
	return cloudLayers.find(layer =>
		altitude >= layer.altitudeBottom && altitude <= layer.altitudeTop
	);
}

/**
 * Get cloud opacity at a specific altitude
 * @param altitude Altitude in km
 * @returns Opacity value from 0-1
 */
export function getCloudOpacityAt(altitude: number): number {
	const layer = getCloudLayerAt(altitude);
	if (!layer) return 0;

	// Smooth transition at layer boundaries
	const distFromBottom = altitude - layer.altitudeBottom;
	const distFromTop = layer.altitudeTop - altitude;
	const thickness = layer.altitudeTop - layer.altitudeBottom;

	// Fade in/out at the boundaries (smoother transition)
	const fadeDistance = Math.min(2, thickness / 4);
	let opacityFactor = 1.0;

	if (distFromBottom < fadeDistance) {
		opacityFactor = distFromBottom / fadeDistance;
	} else if (distFromTop < fadeDistance) {
		opacityFactor = distFromTop / fadeDistance;
	}

	return layer.opacity * opacityFactor;
}

/**
 * Determine if a specific altitude and latitude could have weather features
 * @param altitude Altitude in km
 * @param latitude Latitude in degrees
 * @returns Weather features that could exist at this location
 */
export function getPossibleWeatherAt(altitude: number, latitude: number): WeatherFeature[] {
	return weatherFeatures.filter(feature =>
		altitude >= feature.altitudeRange[0] &&
		altitude <= feature.altitudeRange[1] &&
		latitude >= feature.latitudeRange[0] &&
		latitude <= feature.latitudeRange[1]
	);
}

/**
 * Calculate atmospheric turbulence at a specific altitude and latitude
 * @param altitude Altitude in km
 * @param latitude Latitude in degrees
 * @returns Turbulence factor (0-1 scale, where 0 is calm and 1 is extreme turbulence)
 */
export function getAtmosphericTurbulence(altitude: number, latitude: number): number {
	// Get layers for transition boundaries
	const layer = getCloudLayerAt(altitude);

	// Base turbulence factors:
	// - Higher between layers
	// - Higher at specific altitude ranges with temperature inversions
	// - Higher near certain latitudes (jet streams)

	let turbulence = 0.05; // Baseline turbulence

	// Wind shear increases turbulence
	const windAbove = getWindSpeedAt(altitude + 1, latitude);
	const windBelow = getWindSpeedAt(altitude - 1, latitude);
	const windShear = Math.abs(windAbove - windBelow);
	turbulence += windShear * 0.01;

	// Temperature inversions increase turbulence
	const tempAbove = getTemperatureAtAltitude(altitude + 1);
	const tempBelow = getTemperatureAtAltitude(altitude - 1);
	if (tempAbove > tempBelow) {
		turbulence += 0.1 * (tempAbove - tempBelow) / 10;
	}

	// Layer boundaries have higher turbulence
	if (layer) {
		const distFromBottom = altitude - layer.altitudeBottom;
		const distFromTop = layer.altitudeTop - altitude;
		const boundaryDistance = Math.min(distFromBottom, distFromTop);

		if (boundaryDistance < 2) {
			turbulence += 0.2 * (1 - boundaryDistance / 2);
		}
	}

	// Jet streams at specific latitudes increase turbulence
	if ((Math.abs(latitude) > 40 && Math.abs(latitude) < 50) && altitude > 60 && altitude < 70) {
		turbulence += 0.2;
	}

	// Cap at 1.0
	return Math.min(1.0, turbulence);
}