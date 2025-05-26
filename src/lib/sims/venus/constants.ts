// src/lib/sims/venus/constants.ts
export const SIMULATION_CONSTANTS = {
	// Venus parameters (updated to match coordinate system)
	GRAVITY: 8.87,                // Venus gravity in m/s²
	SURFACE_DENSITY: 65.0,        // Atmospheric density at surface (65x Earth's)
	SCALE_HEIGHT: 15.5,           // Scale height in km (converted from coordinate system)

	// Simulation boundaries (planetary scale)
	TERRAIN_SIZE: 12103.6,        // Venus diameter in km
	TERRAIN_HEIGHT: 0,            // Ground level position
	CEILING_HEIGHT: 250,          // Atmosphere top in km

	// Atmospheric layers
	CLOUD_DECK_BASE: 48,          // Cloud layer base in km
	CLOUD_DECK_TOP: 70,           // Cloud layer top in km
	TROPOSPHERE_HEIGHT: 100,      // Troposphere height in km

	// Planetary simulation parameters
	GRID_RESOLUTION: {
		LATITUDE: 10,   // degrees per grid cell
		LONGITUDE: 10,  // degrees per grid cell
		ALTITUDE: 5     // km per vertical layer
	},

	// Time scale parameters
	MIN_TIME_SCALE: 1,            // Real time
	MAX_TIME_SCALE: 3600 * 24,    // 1 day per second
	DEFAULT_TIME_SCALE: 3600,     // 1 hour per second

	// Physics update intervals
	ATMOSPHERIC_UPDATE_INTERVAL: 1.0,  // seconds
	THERMAL_UPDATE_INTERVAL: 10.0,     // seconds
	ORBITAL_UPDATE_INTERVAL: 60.0,     // seconds
};