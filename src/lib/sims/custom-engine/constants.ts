// src/lib/sims/custom-engine/constants.ts
export const SIMULATION_CONSTANTS = {
	// Venus parameters
	GRAVITY: 8.87,               // Venus gravity in m/s²
	SURFACE_DENSITY: 65.0,       // Atmospheric density at surface (65x Earth's)
	SCALE_HEIGHT: 15.5,          // Scale height for Venus atmosphere in km

	// Simulation boundaries
	TERRAIN_SIZE: 500.0,         // Size of the ground plane
	TERRAIN_HEIGHT: 0,           // Ground level position in world coordinates
	CEILING_HEIGHT: 100.0,       // Maximum height of the simulation

	// Balloon parameters
	BALLOON_INITIAL_HEIGHT: 55.0, // Starting height - at optimal altitude
	BALLOON_INITIAL_SIZE: 1.5,    // Initial balloon radius
	BALLOON_MIN_SIZE: 0.8,        // Minimum balloon size
	BALLOON_MAX_SIZE: 2.5,        // Maximum balloon size
	GAS_DENSITY_RATIO: 1 / 8,     // Hydrogen/Helium density relative to Venus atmosphere

	// Control parameters
	CONTROL_SENSITIVITY: 0.2,    // Control responsiveness

	// Cloud layer
	CLOUD_LAYER_HEIGHT: 50.0,    // Height of the main cloud layer
};