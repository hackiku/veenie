// constants.ts - Updated version
export const SIMULATION_CONSTANTS = {
	// Venus parameters
	GRAVITY: 8.87,               // Venus gravity in m/s²
	SURFACE_DENSITY: 65.0,       // Atmospheric density at surface (65x Earth's)
	SCALE_HEIGHT: 15.5,          // Scale height for Venus atmosphere in km

	// Simulation boundaries
	TERRAIN_SIZE: 500.0,         // Size of the ground plane
	CEILING_HEIGHT: 100.0,       // Maximum height of the simulation

	// Balloon parameters
	BALLOON_INITIAL_HEIGHT: 20.0, // Starting height
	BALLOON_INITIAL_SIZE: 1.5,    // Initial balloon radius
	BALLOON_MIN_SIZE: 0.8,        // Minimum balloon size
	BALLOON_MAX_SIZE: 2.5,        // Maximum balloon size
	GAS_DENSITY_RATIO: 1 / 8,     // Hydrogen/Helium density relative to Venus atmosphere

	// Control parameters
	CONTROL_SENSITIVITY: 0.2,    // Control responsiveness

	// Cloud layer
	CLOUD_LAYER_HEIGHT: 55.0,    // Height of the main cloud layer
};

// Venus atmospheric model
export function getAirDensity(altitude: number): number {
	const { SURFACE_DENSITY, SCALE_HEIGHT, CEILING_HEIGHT } = SIMULATION_CONSTANTS;

	// Convert simulation units to kilometers for the equation
	const altitudeKm = altitude / (CEILING_HEIGHT / 100);

	// Exponential atmospheric model
	return SURFACE_DENSITY * Math.exp(-altitudeKm / SCALE_HEIGHT);
}

// Calculate buoyancy based on Archimedes principle
export function calculateBuoyancy(volume: number, objectDensity: number, fluidDensity: number, gravity: number): number {
	// Buoyancy = (fluid density - object density) * volume * gravity
	return (fluidDensity - objectDensity) * volume * gravity;
}