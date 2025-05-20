// src/lib/sims/balloon/physics/wind.ts

// Constants for wind model (can be tuned or moved to SIMULATION_CONSTANTS)
const MAX_ZONAL_WIND_SPEED = 100; // m/s (superrotation peak)
const ZONAL_WIND_PEAK_ALTITUDE_MIN = 60000; // meters
const ZONAL_WIND_PEAK_ALTITUDE_MAX = 70000; // meters
const SURFACE_WIND_SPEED = 1.0; // m/s

const MAX_MERIDIONAL_WIND_SPEED = 10; // m/s (Hadley cell, much weaker)
const HADLEY_CELL_UPPER_ALTITUDE = 70000; // meters
const HADLEY_CELL_LOWER_ALTITUDE = 45000; // meters (approximate return flow altitude)
const HADLEY_CELL_MID_LATITUDE_TURN = 60; // degrees latitude where flow turns down

export interface WindVector {
	x: number; // Eastward wind (m/s)
	y: number; // Vertical wind (m/s) - generally small for large scales
	z: number; // Northward wind (m/s)
}

/**
 * Calculates the 3D wind vector at a given altitude and latitude on Venus.
 * @param altitude - meters above surface
 * @param latitude - degrees North (-90 to 90)
 * @returns WindVector object with x, y, z components in m/s
 */
export function getWindVector(altitude: number, latitude: number): WindVector {
	let zonalWind = 0; // East-West component (positive = Eastward, Venus superrotation is Westward)
	let meridionalWind = 0; // North-South component (positive = Northward)
	let verticalWind = 0; // Up-Down component (positive = Upward)

	// 1. Zonal Wind (Superrotation) - Westward
	if (altitude < ZONAL_WIND_PEAK_ALTITUDE_MIN) {
		// Increase from surface to cloud base
		zonalWind = SURFACE_WIND_SPEED + (MAX_ZONAL_WIND_SPEED - SURFACE_WIND_SPEED) * (altitude / ZONAL_WIND_PEAK_ALTITUDE_MIN);
	} else if (altitude <= ZONAL_WIND_PEAK_ALTITUDE_MAX) {
		// Peak winds in the upper cloud layer
		zonalWind = MAX_ZONAL_WIND_SPEED;
	} else if (altitude <= 100000) { // Winds decrease above the peak
		zonalWind = MAX_ZONAL_WIND_SPEED * (1 - (altitude - ZONAL_WIND_PEAK_ALTITUDE_MAX) / (100000 - ZONAL_WIND_PEAK_ALTITUDE_MAX));
		zonalWind = Math.max(0, zonalWind);
	} else {
		zonalWind = 0; // Very high up, simplify to no wind or model separately
	}
	zonalWind = -zonalWind; // Superrotation is Westward

	// 2. Meridional Wind (Hadley Cell)
	// Simplified: Poleward flow in upper branch, equatorward in lower branch
	// This is a very coarse representation.
	const latRad = latitude * Math.PI / 180;
	if (altitude > HADLEY_CELL_LOWER_ALTITUDE && altitude <= HADLEY_CELL_UPPER_ALTITUDE) {
		// Upper branch: Poleward flow, strongest at equator, diminishing towards poles
		meridionalWind = MAX_MERIDIONAL_WIND_SPEED * Math.cos(latRad); // Strongest at equator
		if (latitude < 0) meridionalWind = -meridionalWind; // Southward in southern hemisphere
	} else if (altitude < HADLEY_CELL_LOWER_ALTITUDE && altitude > 20000) { // Approx lower branch
		// Lower branch: Equatorward flow (return)
		meridionalWind = -MAX_MERIDIONAL_WIND_SPEED * 0.5 * Math.cos(latRad); // Weaker return flow
		if (latitude < 0) meridionalWind = -meridionalWind;
	}

	// Further reduction near poles where Hadley cell breaks down into polar vortex
	if (Math.abs(latitude) > HADLEY_CELL_MID_LATITUDE_TURN) {
		const factor = 1.0 - ((Math.abs(latitude) - HADLEY_CELL_MID_LATITUDE_TURN) / (90 - HADLEY_CELL_MID_LATITUDE_TURN));
		meridionalWind *= Math.max(0, factor);
	}


	// 3. Vertical Wind (Simplified)
	// Rising air at equator, sinking at mid-latitudes/poles (very simplified part of Hadley)
	// Actual vertical winds are very small on planetary scales (cm/s to mm/s).
	if (altitude > HADLEY_CELL_LOWER_ALTITUDE && altitude <= HADLEY_CELL_UPPER_ALTITUDE) {
		if (Math.abs(latitude) < 30) { // Equatorial upwelling
			verticalWind = 0.05 * Math.cos(latitude * Math.PI / 60); // Max 5 cm/s at equator
		} else if (Math.abs(latitude) > HADLEY_CELL_MID_LATITUDE_TURN - 10) { // Polar downwelling
			verticalWind = -0.05 * Math.sin((Math.abs(latitude) - (HADLEY_CELL_MID_LATITUDE_TURN - 10)) * Math.PI / (180 - 2 * (HADLEY_CELL_MID_LATITUDE_TURN - 10))); // Max 5cm/s sinking
		}
	}
	// This is a very rough placeholder. Real vertical winds are complex and driven by many factors.

	return {
		x: zonalWind,    // Westward is negative X in a typical right-handed system if Z is North, Y is up
		y: verticalWind,
		z: meridionalWind
	};
}