// src/lib/sims/balloon/constants.ts
export const SIMULATION_CONSTANTS = {
	// Venus parameters
	GRAVITY: 8.87,                // Venus gravity in m/s²
	SURFACE_DENSITY: 65.0,        // Atmospheric density at surface (65x Earth's)
	SCALE_HEIGHT: 15500,          // Scale height in meters

	// Simulation boundaries
	TERRAIN_SIZE: 300000,         // Size of the ground plane in meters
	TERRAIN_HEIGHT: 0,            // Ground level position in meters
	CEILING_HEIGHT: 100000,       // Maximum height in meters

	// Balloon parameters
	BALLOON_MASS: 1000,             // Mass in kg
	BALLOON_INITIAL_HEIGHT: 55000, // Starting height in meters
	BALLOON_INITIAL_SIZE: 3.42,    // Balloon radius in meters (human-scale)
	BALLOON_MIN_SIZE: 0.01,        // Minimum balloon size in meters
	BALLOON_MAX_SIZE: 50.0,        // Maximum balloon size in meters
	GAS_DENSITY_RATIO: 1 / 8,       // Hydrogen/Helium density relative to Venus atmosphere

	// Control parameters
	CONTROL_SENSITIVITY: 100.9,     // Control responsiveness

	// Cloud layer
	CLOUD_LAYER_HEIGHT: 50000,    // Cloud layer height in meters
};