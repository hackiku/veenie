// src/lib/sims/flight/physics/data.ts

export const venusData = {
	// Physical constants
	physics: {
		gravity: -8.87, // m/s² (Venus gravity)
		dragCoefficient: 0.3, // Base drag coefficient
		mass: 10, // Default player mass
	},

	// Altitude constants
	altitude: {
		surface: 0,
		cloudLayer: 54, // km - main flight zone
		maxAltitude: 100, // km - upper simulation boundary
	},

	// Atmosphere model
	atmosphere: {
		lowerDenseLayer: 40, // km - below this altitude, atmosphere is very dense
		upperDenseLayer: 60, // km - above this altitude, atmosphere is less dense
		maxDensityFactor: 1.2, // Higher density factor near surface
		minDensityFactor: 0.8, // Lower density factor at high altitudes

		// Temperature model 
		surfaceTemp: 735, // K (~462°C)
		cloudLayerTemp: 330, // K (~57°C)
		upperAtmoTemp: 175, // K (~-98°C)

		// Pressure model (in bars)
		surfacePressure: 93, // 93 times Earth's pressure
		pressureScaleFactor: 0.086, // Controls exponential pressure decay with altitude
	},

	// Control settings
	controls: {
		horizontalForce: 50, // Base force for horizontal movement
		verticalForce: 30,   // Base force for vertical movement
		defaultBuoyancy: 30.0, // Just above gravity to be slightly buoyant
		maxBuoyancy: 30.3,   // Maximum buoyancy (1.5x gravity)
		minBuoyancy: -30,    // Minimum buoyancy (0.5x gravity)
		buoyancyStep: 0.2,   // Incremental change in buoyancy
	},

	// Visual settings
	visual: {
		playerColor: "#4080ff",
		playerRadius: 1,
		surfaceColor: "#FF8C00",
		surfaceOpacity: 0.3,
	}
};

/**
 * Temperature at a given altitude (in Kelvin)
 */
export function getTemperatureAtAltitude(altitude: number): number {
	// Handle edge cases
	if (altitude < 0) return venusData.atmosphere.surfaceTemp;
	if (altitude > venusData.altitude.maxAltitude) return venusData.atmosphere.upperAtmoTemp;

	// Simplified altitude bands
	if (altitude < 30) {
		// Surface to 30km: 735K to 511K
		return venusData.atmosphere.surfaceTemp - (altitude / 30) * (venusData.atmosphere.surfaceTemp - 511);
	} else if (altitude < 60) {
		// 30km to 60km: 511K to 270K (habitable zone ~50km)
		return 511 - ((altitude - 30) / 30) * (511 - 270);
	} else {
		// 60km to 100km: 270K to upperAtmoTemp
		return 270 - ((altitude - 60) / 40) * (270 - venusData.atmosphere.upperAtmoTemp);
	}
}

/**
 * Pressure at a given altitude (in bars)
 */
export function getPressureAtAltitude(altitude: number): number {
	if (altitude < 0) return venusData.atmosphere.surfacePressure;
	if (altitude > venusData.altitude.maxAltitude) return 0.000001; // Near vacuum

	// Exponential decay - at 50km pressure is ~1 bar (Earth-like)
	return venusData.atmosphere.surfacePressure * Math.exp(-venusData.atmosphere.pressureScaleFactor * altitude);
}