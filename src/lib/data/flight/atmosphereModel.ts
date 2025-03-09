// src/lib/data/flight/atmosphereModel.ts
// Detailed atmospheric model for Venus

import { ALTITUDE } from './constants';

/**
 * Atmosphere model parameters
 */
export const ATMOSPHERE = {
	// Density model parameters
	DENSITY: {
		SURFACE: 65,            // kg/m³ at surface
		CLOUD_LAYER: 1.5,       // kg/m³ at flight altitude
		TOP_OF_ATMOSPHERE: 0.01, // kg/m³ at top of atmosphere

		// Density factors for simplified physics
		MAX_DENSITY_FACTOR: 1.2, // Higher density factor near surface
		MIN_DENSITY_FACTOR: 0.8, // Lower density factor at high altitudes
		LOWER_DENSE_LAYER: 40,   // Below this altitude, atmosphere is very dense
		UPPER_DENSE_LAYER: 60,   // Above this altitude, atmosphere is less dense
	},

	// Temperature model parameters
	TEMPERATURE: {
		SURFACE: 735,           // K (~462°C) at surface
		CLOUD_LAYER: 330,       // K (~57°C) at flight altitude
		TOP_OF_ATMOSPHERE: 175, // K (~-98°C) at top of atmosphere
	},

	// Pressure model parameters
	PRESSURE: {
		SURFACE: 93,              // bars (93x Earth surface pressure)
		CLOUD_LAYER: 1,           // bar (Earth-like at cloud layer altitude)
		TOP_OF_ATMOSPHERE: 0.001, // bars (near vacuum at top of atmosphere)
		SCALE_FACTOR: 0.086,      // Controls exponential pressure decay with altitude
	},

	// Wind model parameters
	WIND: {
		// Wind speeds at different altitudes in m/s
		SURFACE_SPEED: 0.5,        // Very slow near surface
		CLOUD_LAYER_SPEED: 100,    // ~360 km/h at cloud layer (super-rotation)
		TOP_LAYER_SPEED: 150,      // ~540 km/h at top of clouds

		// Direction parameters 
		DIRECTION_CHANGE_RATE: 0.1, // Rate of wind direction change
		VERTICAL_COMPONENT: 0.05,   // Vertical wind component (as fraction of horizontal)

		// Turbulence parameters
		TURBULENCE_SCALE: 0.2,      // Scale of turbulence
		TURBULENCE_FREQUENCY: 0.05,  // Frequency of turbulence changes
	},

	// Cloud and haze layers visual parameters
	VISUAL: {
		// Colors
		ATMOSPHERE_COLOR: "#ffebaa", // Yellowish atmosphere
		SURFACE_HAZE_COLOR: "#ffb366", // Orange-yellow surface haze  
		LOWER_HAZE_COLOR: "#fff5cc", // Light yellow lower haze
		CLOUD_COLOR: "#fffaf0", // Whitish clouds
		UPPER_HAZE_COLOR: "#e6f7ff", // Light blue upper haze

		// Opacities
		SURFACE_HAZE_OPACITY: 0.3,
		LOWER_HAZE_OPACITY: 0.2,
		CLOUD_OPACITY: 0.3,
		UPPER_HAZE_OPACITY: 0.15,
		ATMOSPHERE_OPACITY: 0.1,

		// Sizes (radii in arbitrary units for visualization)
		SURFACE_HAZE_RADIUS: 800,
		LOWER_HAZE_RADIUS: 600,
		CLOUD_LAYER_RADIUS: 400,
		UPPER_HAZE_RADIUS: 300,
		ATMOSPHERE_RADIUS: 1200,
	}
};

/**
 * Calculate temperature at a given altitude (in Kelvin)
 * @param altitude Altitude in km
 * @returns Temperature in Kelvin
 */
export function getTemperatureAtAltitude(altitude: number): number {
	// Handle edge cases
	if (altitude < 0) return ATMOSPHERE.TEMPERATURE.SURFACE;
	if (altitude > ALTITUDE.TOP_OF_ATMOSPHERE) return ATMOSPHERE.TEMPERATURE.TOP_OF_ATMOSPHERE;

	// Simplified altitude bands with linear interpolation
	if (altitude < 30) {
		// Surface to 30km: 735K to 511K
		return ATMOSPHERE.TEMPERATURE.SURFACE - (altitude / 30) * (ATMOSPHERE.TEMPERATURE.SURFACE - 511);
	} else if (altitude < 60) {
		// 30km to 60km: 511K to 270K (habitable zone ~50km)
		return 511 - ((altitude - 30) / 30) * (511 - 270);
	} else {
		// 60km to 90km: 270K to top of atmosphere
		return 270 - ((altitude - 60) / 30) * (270 - ATMOSPHERE.TEMPERATURE.TOP_OF_ATMOSPHERE);
	}
}

/**
 * Calculate pressure at a given altitude (in bars)
 * @param altitude Altitude in km
 * @returns Pressure in bars
 */
export function getPressureAtAltitude(altitude: number): number {
	if (altitude < 0) return ATMOSPHERE.PRESSURE.SURFACE;
	if (altitude > ALTITUDE.TOP_OF_ATMOSPHERE) return ATMOSPHERE.PRESSURE.TOP_OF_ATMOSPHERE;

	// Exponential decay - at 50km pressure is ~1 bar (Earth-like)
	return ATMOSPHERE.PRESSURE.SURFACE * Math.exp(-ATMOSPHERE.PRESSURE.SCALE_FACTOR * altitude);
}

/**
 * Calculate atmosphere density factor based on altitude for physics calculations
 * @param altitude Altitude in km
 * @returns Density factor (multiplier) for physics calculations
 */
export function getAtmosphereDensityFactor(altitude: number): number {
	// Simplified model with transition zones
	if (altitude < ATMOSPHERE.DENSITY.LOWER_DENSE_LAYER) {
		return ATMOSPHERE.DENSITY.MAX_DENSITY_FACTOR;
	}

	if (altitude > ATMOSPHERE.DENSITY.UPPER_DENSE_LAYER) {
		return ATMOSPHERE.DENSITY.MIN_DENSITY_FACTOR;
	}

	// Linear interpolation in the transition zone
	return ATMOSPHERE.DENSITY.MAX_DENSITY_FACTOR -
		((altitude - ATMOSPHERE.DENSITY.LOWER_DENSE_LAYER) /
			(ATMOSPHERE.DENSITY.UPPER_DENSE_LAYER - ATMOSPHERE.DENSITY.LOWER_DENSE_LAYER)) *
		(ATMOSPHERE.DENSITY.MAX_DENSITY_FACTOR - ATMOSPHERE.DENSITY.MIN_DENSITY_FACTOR);
}

/**
 * Calculate actual density of atmosphere at given altitude (kg/m³)
 * @param altitude Altitude in km
 * @returns Density in kg/m³
 */
export function getAtmosphereDensity(altitude: number): number {
	if (altitude < 0) return ATMOSPHERE.DENSITY.SURFACE;
	if (altitude > ALTITUDE.TOP_OF_ATMOSPHERE) return ATMOSPHERE.DENSITY.TOP_OF_ATMOSPHERE;

	// Exponential interpolation for a more accurate model
	if (altitude < ALTITUDE.CLOUD_LAYER) {
		const t = altitude / ALTITUDE.CLOUD_LAYER;
		return ATMOSPHERE.DENSITY.SURFACE * Math.exp(-6 * t); // Sharp decrease from surface to cloud layer
	} else {
		const t = (altitude - ALTITUDE.CLOUD_LAYER) / (ALTITUDE.TOP_OF_ATMOSPHERE - ALTITUDE.CLOUD_LAYER);
		return ATMOSPHERE.DENSITY.CLOUD_LAYER * Math.exp(-5 * t); // Slower decrease above cloud layer
	}
}

/**
 * Get wind vector at a given altitude
 * @param altitude Altitude in km
 * @param time Current simulation time in seconds (for time-varying winds)
 * @returns Wind vector [x, y, z] in m/s
 */
export function getWindVector(altitude: number, time: number): [number, number, number] {
	// Base wind speed calculation
	let windSpeed: number;

	if (altitude < ALTITUDE.LOWER_HAZE) {
		// Linear increase from surface to lower haze
		const t = altitude / ALTITUDE.LOWER_HAZE;
		windSpeed = ATMOSPHERE.WIND.SURFACE_SPEED +
			t * (ATMOSPHERE.WIND.CLOUD_LAYER_SPEED * 0.5 - ATMOSPHERE.WIND.SURFACE_SPEED);
	} else if (altitude < ALTITUDE.CLOUD_LAYER) {
		// Increase to max at cloud layer
		const t = (altitude - ALTITUDE.LOWER_HAZE) / (ALTITUDE.CLOUD_LAYER - ALTITUDE.LOWER_HAZE);
		windSpeed = ATMOSPHERE.WIND.CLOUD_LAYER_SPEED * 0.5 +
			t * (ATMOSPHERE.WIND.CLOUD_LAYER_SPEED - ATMOSPHERE.WIND.CLOUD_LAYER_SPEED * 0.5);
	} else if (altitude < ALTITUDE.TOP_OF_ATMOSPHERE) {
		// Increase then decrease above cloud layer
		const t = (altitude - ALTITUDE.CLOUD_LAYER) / (ALTITUDE.TOP_OF_ATMOSPHERE - ALTITUDE.CLOUD_LAYER);
		windSpeed = ATMOSPHERE.WIND.CLOUD_LAYER_SPEED +
			t * (ATMOSPHERE.WIND.TOP_LAYER_SPEED - ATMOSPHERE.WIND.CLOUD_LAYER_SPEED) *
			(1 - t); // Parabolic profile peaking mid-way
	} else {
		// Above atmosphere, minimal wind
		windSpeed = 5;
	}

	// Add time-varying component for dynamic winds
	// Use sin waves with different phases to create complex patterns
	const timeVaryingFactor =
		Math.sin(time * ATMOSPHERE.WIND.DIRECTION_CHANGE_RATE) *
		Math.sin(time * ATMOSPHERE.WIND.DIRECTION_CHANGE_RATE * 0.5 + 0.5) *
		ATMOSPHERE.WIND.TURBULENCE_SCALE;

	// Base directions - winds generally flow east-west (z-axis)
	const xComponent = windSpeed * timeVaryingFactor;
	const yComponent = windSpeed * ATMOSPHERE.WIND.VERTICAL_COMPONENT * Math.sin(time * ATMOSPHERE.WIND.TURBULENCE_FREQUENCY);
	const zComponent = windSpeed * (1 + 0.2 * Math.sin(time * ATMOSPHERE.WIND.TURBULENCE_FREQUENCY * 2 + 1.3));

	return [xComponent, yComponent, zComponent];
}