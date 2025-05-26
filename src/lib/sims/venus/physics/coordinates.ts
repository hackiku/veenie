// src/lib/sims/venus/physics/coordinates.ts

import * as THREE from 'three';

/**
 * Venus Coordinate System and Physics Constants
 * 
 * This system handles all coordinate transformations and physics constants
 * for the Venus planetary simulation, supporting time scales from minutes to years.
 */

// =============================================================================
// VENUS PHYSICAL CONSTANTS
// =============================================================================

export const VENUS_CONSTANTS = {
	// Planetary Parameters
	RADIUS: 6051.8,              // Mean radius in km
	MASS: 4.8675e24,             // Mass in kg
	GRAVITY: 8.87,               // Surface gravity in m/s²

	// Rotational Parameters (Venus rotates backwards!)
	SIDEREAL_DAY: 243.0,         // Earth days (retrograde)
	SOLAR_DAY: 116.75,           // Earth days
	AXIAL_TILT: 177.36,          // degrees (almost upside down)

	// Orbital Parameters
	ORBITAL_DISTANCE: 108200000, // km from Sun (semi-major axis)
	ORBITAL_PERIOD: 224.7,       // Earth days
	ORBITAL_ECCENTRICITY: 0.007, // Nearly circular

	// Atmospheric Parameters
	SURFACE_PRESSURE: 92,        // Earth atmospheres (92 bar)
	SURFACE_TEMPERATURE: 462,    // °C
	SCALE_HEIGHT: 15.5,          // km
	ATMOSPHERE_TOP: 250,         // km (effective)

	// Cloud Layer
	CLOUD_DECK_BASE: 48,         // km
	CLOUD_DECK_TOP: 70,          // km
	CLOUD_DECK_TEMP: 0,          // °C (at ~60km)
} as const;

// =============================================================================
// COORDINATE SYSTEMS
// =============================================================================

/**
 * Planetary Coordinates (Venus-centric)
 */
export interface PlanetaryCoords {
	latitude: number;   // degrees (-90 to +90)
	longitude: number;  // degrees (0 to 360)
	altitude: number;   // km above surface
}

/**
 * Cartesian Coordinates (3D rendering)
 */
export interface CartesianCoords {
	x: number;
	y: number;
	z: number;
}

/**
 * Orbital Coordinates (Sun-centric)
 */
export interface OrbitalCoords {
	distance: number;        // km from Sun
	trueAnomaly: number;     // degrees (position in orbit)
	inclination: number;     // degrees from orbital plane
}

/**
 * Atmospheric Layer Coordinates
 */
export interface AtmosphericCoords {
	planetaryCoords: PlanetaryCoords;
	pressure: number;        // bar
	temperature: number;     // °C
	density: number;         // kg/m³
	windSpeed: number;       // m/s
	windDirection: number;   // degrees
}

// =============================================================================
// COORDINATE CONVERSION FUNCTIONS
// =============================================================================

/**
 * Convert planetary coordinates to Cartesian (for 3D rendering)
 * Uses standard spherical coordinate system with Y-up
 */
export function planetaryToCartesian(coords: PlanetaryCoords): CartesianCoords {
	const { latitude, longitude, altitude } = coords;

	// Convert to radians
	const latRad = (latitude * Math.PI) / 180;
	const lonRad = (longitude * Math.PI) / 180;

	// Distance from center (radius + altitude)
	const r = VENUS_CONSTANTS.RADIUS + altitude;

	// Standard spherical to cartesian conversion (Y-up, Z-forward)
	const x = r * Math.cos(latRad) * Math.sin(lonRad);
	const y = r * Math.sin(latRad);
	const z = r * Math.cos(latRad) * Math.cos(lonRad);

	return { x, y, z };
}

/**
 * Convert Cartesian to planetary coordinates
 */
export function cartesianToPlanetary(coords: CartesianCoords): PlanetaryCoords {
	const { x, y, z } = coords;

	// Calculate distance from center
	const r = Math.sqrt(x * x + y * y + z * z);

	// Calculate latitude and longitude
	const latitude = (Math.asin(y / r) * 180) / Math.PI;
	const longitude = (Math.atan2(x, z) * 180) / Math.PI;

	// Ensure longitude is 0-360
	const normalizedLongitude = longitude < 0 ? longitude + 360 : longitude;

	// Calculate altitude
	const altitude = r - VENUS_CONSTANTS.RADIUS;

	return {
		latitude,
		longitude: normalizedLongitude,
		altitude
	};
}

/**
 * Get Venus position in its orbit at given time
 */
export function getVenusOrbitalPosition(daysSinceEpoch: number): OrbitalCoords {
	// Mean motion (degrees per day)
	const meanMotion = 360 / VENUS_CONSTANTS.ORBITAL_PERIOD;

	// True anomaly (simplified - ignoring eccentricity for now)
	const trueAnomaly = (meanMotion * daysSinceEpoch) % 360;

	return {
		distance: VENUS_CONSTANTS.ORBITAL_DISTANCE,
		trueAnomaly,
		inclination: 3.39 // Venus orbital inclination to ecliptic
	};
}

/**
 * Get Sun position relative to Venus
 */
export function getSunPosition(daysSinceEpoch: number): CartesianCoords {
	const orbital = getVenusOrbitalPosition(daysSinceEpoch);

	// Convert orbital position to Cartesian (simplified)
	const angleRad = (orbital.trueAnomaly * Math.PI) / 180;

	return {
		x: orbital.distance * Math.cos(angleRad),
		y: 0, // Simplified - ignoring orbital inclination for now
		z: orbital.distance * Math.sin(angleRad)
	};
}

// =============================================================================
// ATMOSPHERIC PHYSICS
// =============================================================================

/**
 * Calculate atmospheric properties at given altitude
 */
export function getAtmosphericProperties(altitude: number): {
	pressure: number;
	temperature: number;
	density: number;
} {
	// Venus atmospheric model (simplified exponential)
	const scaleHeight = VENUS_CONSTANTS.SCALE_HEIGHT * 1000; // Convert to meters
	const altitudeMeters = altitude * 1000;

	// Pressure decreases exponentially with altitude
	const pressure = VENUS_CONSTANTS.SURFACE_PRESSURE * Math.exp(-altitudeMeters / scaleHeight);

	// Temperature model (more complex - piecewise linear approximation)
	let temperature: number;

	if (altitude <= 5) {
		// Surface to 5km - very hot, slight decrease
		temperature = 462 - (altitude * 7.6); // ~462°C to ~424°C
	} else if (altitude <= 50) {
		// 5km to 50km - steep temperature drop
		temperature = 424 - ((altitude - 5) * 8.8); // ~424°C to ~27°C
	} else if (altitude <= 70) {
		// Cloud layer - more gradual decrease
		temperature = 27 - ((altitude - 50) * 1.85); // ~27°C to ~-10°C
	} else {
		// Above clouds - continues to cool
		temperature = -10 - ((altitude - 70) * 1.3); // Below ~-10°C
	}

	// Density from ideal gas law (simplified)
	const tempKelvin = temperature + 273.15;
	const pressurePascals = pressure * 100000; // Convert bar to Pa
	const gasConstant = 192; // J/(kg·K) for CO2-dominated atmosphere
	const density = pressurePascals / (gasConstant * tempKelvin);

	return {
		pressure,
		temperature,
		density
	};
}

/**
 * Calculate wind patterns (simplified Hadley cell model)
 */
export function getWindVector(coords: PlanetaryCoords, time: number): {
	speed: number;
	direction: number;
} {
	const { latitude, altitude } = coords;

	// Super-rotation of Venus atmosphere
	let baseSpeed = 0;

	if (altitude >= 45 && altitude <= 70) {
		// Cloud layer - strong super-rotation
		baseSpeed = 100; // ~100 m/s eastward
	} else if (altitude < 45) {
		// Lower atmosphere - decreases with altitude
		baseSpeed = 100 * (altitude / 45);
	} else {
		// Above clouds - weaker but still present
		baseSpeed = 100 * Math.exp(-(altitude - 70) / 30);
	}

	// Hadley cell circulation (simplified)
	const hadleyStrength = Math.cos((latitude * Math.PI) / 180) * 10;

	// Direction: mostly eastward (retrograde rotation) with some meridional flow
	const direction = 90 + hadleyStrength; // 90° = eastward

	return {
		speed: Math.max(0, baseSpeed + Math.sin(time * 0.001) * 10), // Add some variation
		direction: direction % 360
	};
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Calculate great circle distance between two points on Venus surface
 */
export function greatCircleDistance(
	coord1: PlanetaryCoords,
	coord2: PlanetaryCoords
): number {
	const lat1Rad = (coord1.latitude * Math.PI) / 180;
	const lat2Rad = (coord2.latitude * Math.PI) / 180;
	const deltaLat = lat2Rad - lat1Rad;
	const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

	const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) *
		Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return VENUS_CONSTANTS.RADIUS * c; // Distance in km
}

/**
 * Convert Venus rotation degrees to Three.js rotation
 */
export function venusRotationToThreeJS(venusRotationDegrees: number): [number, number, number] {
	// Venus rotates retrograde (backwards) around Y-axis
	// Convert degrees to radians and reverse direction
	const rotationRad = (-venusRotationDegrees * Math.PI) / 180;

	return [0, rotationRad, 0];
}

/**
 * Get local solar time at given coordinates and global time
 */
export function getLocalSolarTime(
	coords: PlanetaryCoords,
	globalTime: Date
): {
	localTime: Date;
	solarElevation: number;
	solarAzimuth: number;
} {
	// Simplified solar position calculation
	// This would need more complexity for accurate solar tracking

	const dayOfYear = Math.floor((globalTime.getTime() - new Date(globalTime.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
	const hourOfDay = globalTime.getHours() + globalTime.getMinutes() / 60;

	// Solar declination (simplified)
	const declination = 23.45 * Math.sin((360 * (dayOfYear - 81) / 365) * Math.PI / 180);

	// Hour angle
	const hourAngle = 15 * (hourOfDay - 12) + coords.longitude;

	// Solar elevation
	const elevationRad = Math.asin(
		Math.sin(declination * Math.PI / 180) * Math.sin(coords.latitude * Math.PI / 180) +
		Math.cos(declination * Math.PI / 180) * Math.cos(coords.latitude * Math.PI / 180) * Math.cos(hourAngle * Math.PI / 180)
	);

	const solarElevation = elevationRad * 180 / Math.PI;

	// Solar azimuth (simplified)
	const azimuthRad = Math.atan2(
		Math.sin(hourAngle * Math.PI / 180),
		Math.cos(hourAngle * Math.PI / 180) * Math.sin(coords.latitude * Math.PI / 180) - Math.tan(declination * Math.PI / 180) * Math.cos(coords.latitude * Math.PI / 180)
	);

	const solarAzimuth = (azimuthRad * 180 / Math.PI + 360) % 360;

	// Local time calculation (simplified)
	const localTime = new Date(globalTime.getTime() + (coords.longitude / 15) * 60 * 60 * 1000);

	return {
		localTime,
		solarElevation,
		solarAzimuth
	};
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
	VENUS_CONSTANTS,
	planetaryToCartesian,
	cartesianToPlanetary,
	getVenusOrbitalPosition,
	getSunPosition,
	getAtmosphericProperties,
	getWindVector,
	greatCircleDistance,
	venusRotationToThreeJS,
	getLocalSolarTime
};