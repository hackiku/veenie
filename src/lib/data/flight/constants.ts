// src/lib/data/flight/constants.ts
// Universal constants and baseline data for Venus Flight Simulator

/**
 * Physics constants
 */
export const PHYSICS = {
	// Venus gravity (m/s²)
	GRAVITY: -8.87,

	// Light speed (m/s) - used for relativistic effects if needed
	LIGHT_SPEED: 299792458,

	// Solar constant at Venus (W/m²)
	SOLAR_CONSTANT_VENUS: 2636,

	// Venus day length (Earth days)
	DAY_LENGTH: 243,

	// Venus orbital period (Earth days)
	ORBITAL_PERIOD: 224.7,
}

/**
 * Altitude reference points for Venus (in km)
 */
export const ALTITUDE = {
	// Surface level
	SURFACE: 0,

	// Main atmospheric layers
	LOWER_HAZE: 20,       // Lower haze layer begins
	LOWER_CLOUD: 45,      // Lower cloud layer begins
	CLOUD_LAYER: 50,      // Main cloud layer - where flying is ideal
	UPPER_CLOUD: 65,      // Upper cloud layer begins
	UPPER_HAZE: 70,       // Upper haze layer begins
	TOP_OF_ATMOSPHERE: 90 // Effective top of significant atmosphere
}

/**
 * Controls and input settings
 */
export const CONTROLS = {
	// Force multipliers
	HORIZONTAL_FORCE: 50,   // Base force for horizontal movement
	VERTICAL_FORCE: 30,     // Base force for vertical movement

	// Buoyancy limits and steps
	DEFAULT_BUOYANCY: 31.09,  // Just above gravity to be slightly buoyant
	MAX_BUOYANCY: 50.3,     // Maximum buoyancy (1.5x gravity)
	MIN_BUOYANCY: -50,      // Minimum buoyancy (0.5x gravity)
	BUOYANCY_STEP: 0.5,     // Incremental change in buoyancy
}

/**
 * Visual settings
 */
export const VISUAL = {
	// Default colors
	PLAYER_COLOR: "#4080ff",
	SURFACE_COLOR: "#FF8C00",

	// Transparency settings
	SURFACE_OPACITY: 0.3,

	// Sizes
	PLAYER_RADIUS: 1,
}

/**
 * Atmospheric composition at cloud layer altitude
 */
export const ATMOSPHERE_COMPOSITION = {
	CO2: 96.5,    // Carbon dioxide percentage
	N2: 3.5,      // Nitrogen percentage
	SO2: 0.015,   // Sulfur dioxide percentage
	H2O: 0.002,   // Water vapor percentage
	CO: 0.001,    // Carbon monoxide percentage
}

// Create a single combined export for compatibility with existing code
export const venusData = {
	physics: PHYSICS,
	altitude: ALTITUDE,
	controls: CONTROLS,
	visual: VISUAL,
	atmosphere: {
		composition: ATMOSPHERE_COMPOSITION
	}
};