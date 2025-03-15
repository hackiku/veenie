// src/lib/data/chemistry/atmosphericComposition.ts

// Define Venus atmospheric layer structure
export interface AtmosphericLayer {
	name: string;
	altitude: {
		min: number;
		max: number;
	};
	description: string;
	mainComponents: string[];
}

// Venus atmospheric layers from surface to upper atmosphere
export const ATMOSPHERIC_LAYERS: AtmosphericLayer[] = [
	{
		name: "Surface Layer",
		altitude: {
			min: 0,
			max: 10
		},
		description: "Extremely hot, high pressure lower atmosphere close to surface",
		mainComponents: ["CO2", "N2", "SO2"]
	},
	{
		name: "Lower Haze",
		altitude: {
			min: 10,
			max: 30
		},
		description: "Dense haze layer with high concentrations of sulfur compounds",
		mainComponents: ["CO2", "N2", "SO2", "H2SO4"]
	},
	{
		name: "Lower Cloud",
		altitude: {
			min: 30,
			max: 48
		},
		description: "Lower cloud deck with concentrated sulfuric acid droplets",
		mainComponents: ["CO2", "N2", "SO2", "H2SO4"]
	},
	{
		name: "Middle Cloud",
		altitude: {
			min: 48,
			max: 55
		},
		description: "Principal cloud deck with Earth-like temperatures and pressures",
		mainComponents: ["CO2", "N2", "H2SO4", "H2O"]
	},
	{
		name: "Upper Cloud",
		altitude: {
			min: 55,
			max: 65
		},
		description: "Upper cloud region with decreasing pressure",
		mainComponents: ["CO2", "N2", "H2SO4", "SO2"]
	},
	{
		name: "Upper Haze",
		altitude: {
			min: 65,
			max: 80
		},
		description: "Diffuse upper haze above main cloud layers",
		mainComponents: ["CO2", "N2", "SO2"]
	},
	{
		name: "Mesosphere",
		altitude: {
			min: 80,
			max: 100
		},
		description: "Upper atmospheric layer with trace gases",
		mainComponents: ["CO2", "N2", "O"]
	}
];

/**
 * Get atmospheric composition at a specific altitude
 * Values are molar fraction (0.0 to 1.0)
 * @param altitude Altitude in km
 * @returns Object with gas composition fractions
 */
export function getCompositionAtAltitude(altitude: number): Record<string, number> {
	// Base composition (approximate Venus atmosphere)
	const composition: Record<string, number> = {
		"CO2": 0.965,
		"N2": 0.035,
		"SO2": 0.0,
		"H2O": 0.0,
		"H2SO4": 0.0,
		"HCl": 0.0,
		"HF": 0.0,
		"CO": 0.0,
		"OCS": 0.0,
		"S2": 0.0,
		"Ar": 0.0,
		"He": 0.0,
		"Ne": 0.0
	};

	// Adjust trace gases based on altitude
	if (altitude < 30) {
		// Near-surface: Higher SO2
		composition["SO2"] = 0.00015;
		composition["HCl"] = 0.0001;
		composition["HF"] = 0.00001;
		composition["CO"] = 0.00002;
		composition["H2O"] = 0.00003;
		composition["Ar"] = 0.00007;
	}
	else if (altitude >= 30 && altitude < 48) {
		// Lower cloud: Significant H2SO4, some H2O
		composition["SO2"] = 0.00013;
		composition["H2SO4"] = 0.00015;
		composition["H2O"] = 0.00005;
		composition["HCl"] = 0.00004;
		composition["CO"] = 0.00002;
		composition["OCS"] = 0.00001;
		composition["Ar"] = 0.00007;
	}
	else if (altitude >= 48 && altitude < 55) {
		// Middle cloud: Peak for H2O, H2SO4
		composition["SO2"] = 0.00012;
		composition["H2SO4"] = 0.0002;
		composition["H2O"] = 0.0003;
		composition["HCl"] = 0.00003;
		composition["CO"] = 0.00003;
		composition["Ar"] = 0.00007;
	}
	else if (altitude >= 55 && altitude < 65) {
		// Upper cloud: Less H2SO4, still some H2O
		composition["SO2"] = 0.0001;
		composition["H2SO4"] = 0.00015;
		composition["H2O"] = 0.00015;
		composition["CO"] = 0.00004;
		composition["Ar"] = 0.00007;
	}
	else if (altitude >= 65 && altitude < 80) {
		// Upper haze: Decreasing sulfuric compounds
		composition["SO2"] = 0.00007;
		composition["H2SO4"] = 0.00005;
		composition["H2O"] = 0.00001;
		composition["CO"] = 0.00005;
		composition["He"] = 0.00001;
		composition["Ar"] = 0.00007;
	}
	else {
		// Mesosphere: Trace gases only
		composition["SO2"] = 0.00001;
		composition["CO"] = 0.00008;
		composition["He"] = 0.00002;
		composition["Ne"] = 0.00001;
		composition["Ar"] = 0.00007;
	}

	return composition;
}
/**
 * Get temperature at a specific altitude (in Kelvin)
 * Based on Venus atmospheric profile
 * @param altitude Altitude in km
 * @returns Temperature in K
 */
export function getTemperatureAtAltitude(altitude: number): number {
	// Surface temperature is extremely hot (~735K)
	if (altitude < 1) {
		return 735;
	}

	// Temperature decreases with altitude (roughly -8K per km near surface)
	// Then more gradually in upper atmosphere
	if (altitude < 15) {
		return 735 - (altitude * 8);
	}
	else if (altitude < 50) {
		return 615 - ((altitude - 15) * 5);
	}
	else if (altitude < 60) {
		// Temperature actually increases slightly in this region (temperature inversion)
		return 240 + ((altitude - 50) * 1);
	}
	else if (altitude < 70) {
		return 250 - ((altitude - 60) * 4);
	}
	else if (altitude < 100) {
		return 210 - ((altitude - 70) * 1.5);
	}
	else {
		// Upper mesosphere
		return 165;
	}
}

/**
 * Get pressure at a specific altitude (in bars)
 * Based on Venus atmospheric profile
 * @param altitude Altitude in km
 * @returns Pressure in bars
 */
export function getPressureAtAltitude(altitude: number): number {
	// Surface pressure is extremely high (92 bars)
	if (altitude < 1) {
		return 92;
	}

	// Pressure decreases exponentially with altitude
	// Habitable region (~1 bar) is around 50-55km

	if (altitude < 15) {
		return 92 * Math.exp(-altitude * 0.14);
	}
	else if (altitude < 35) {
		return 20 * Math.exp(-(altitude - 15) * 0.1);
	}
	else if (altitude < 50) {
		return 7 * Math.exp(-(altitude - 35) * 0.11);
	}
	else if (altitude < 65) {
		return 1 * Math.exp(-(altitude - 50) * 0.16);
	}
	else if (altitude < 80) {
		return 0.23 * Math.exp(-(altitude - 65) * 0.18);
	}
	else {
		return 0.03 * Math.exp(-(altitude - 80) * 0.22);
	}
}
