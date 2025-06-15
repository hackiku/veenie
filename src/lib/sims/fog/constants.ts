// src/lib/sims/fog/constants.ts

export const VENUS_CONSTANTS = {
	// Venus physical parameters
	GRAVITY: 8.87,                  // m/s²
	SURFACE_DENSITY: 65.0,          // kg/m³ (65x Earth's)
	SCALE_HEIGHT: 15500,            // meters

	// Simulation scale
	TERRAIN_SIZE: 300000,           // 300km terrain
	TERRAIN_HEIGHT: 0,              // Ground level
	MAX_ALTITUDE: 200000,           // 200km ceiling

	// Camera parameters
	DEFAULT_ALTITUDE: 55000,        // Start at 55km (cloud layer)
	MIN_ALTITUDE: 100,              // Don't go below 100m
	CAMERA_SPEED: 500,              // m/s base speed

	// Atmospheric layers (for fog and visuals)
	ATMOSPHERE_LAYERS: [
		{ name: 'Surface', altitude: 0, color: '#F6A309', density: 65.0 },
		{ name: 'Lower Atmosphere', altitude: 15000, color: '#FDBD4B', density: 12.0 },
		{ name: 'Lower Haze', altitude: 30000, color: '#FFEDBF', density: 5.0 },
		{ name: 'Lower Clouds', altitude: 48000, color: '#E1DCBB', density: 2.0 },
		{ name: 'Cloud Layer', altitude: 55000, color: '#BFBD97', density: 1.0 },
		{ name: 'Upper Clouds', altitude: 65000, color: '#A2BEC6', density: 0.5 },
		{ name: 'Upper Atmosphere', altitude: 80000, color: '#85C9FE', density: 0.2 },
		{ name: 'High Atmosphere', altitude: 100000, color: '#4D7899', density: 0.05 }
	],

	// Temperature profile (Kelvin)
	TEMPERATURE_PROFILE: [
		{ altitude: 0, temperature: 737 },       // Surface: 464°C
		{ altitude: 25000, temperature: 400 },   // Mid-lower: 127°C
		{ altitude: 50000, temperature: 320 },   // Cloud base: 47°C
		{ altitude: 65000, temperature: 235 },   // Cloud top: -38°C
		{ altitude: 100000, temperature: 200 },  // High atmo: -73°C
		{ altitude: 200000, temperature: 180 }   // Very high: -93°C
	]
};

// Helpful conversions
export const CONVERSIONS = {
	KELVIN_TO_CELSIUS: (k: number) => k - 273.15,
	CELSIUS_TO_KELVIN: (c: number) => c + 273.15,
	METERS_TO_KM: (m: number) => m / 1000,
	KM_TO_METERS: (km: number) => km * 1000
};