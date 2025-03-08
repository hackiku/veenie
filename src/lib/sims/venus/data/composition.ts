// src/lib/sims/venus/data/composition.ts

/**
 * Venus atmospheric composition data
 * Values in percentage (%) or parts per million (ppm) as noted
 */

// Main composition types
export interface GasComposition {
	// Major components (percentages)
	carbonDioxide: number; // CO2, %
	nitrogen: number; // N2, %

	// Trace components (parts per million)
	sulfurDioxide?: number; // SO2, ppm
	argon?: number; // Ar, ppm
	waterVapor?: number; // H2O, ppm
	carbonMonoxide?: number; // CO, ppm
	helium?: number; // He, ppm
	neon?: number; // Ne, ppm
	hydrogenChloride?: number; // HCl, ppm
	hydrogenFluoride?: number; // HF, ppm

	// Cloud components
	sulfuricAcid?: number; // H2SO4, %

	// Upper atmosphere components (thermosphere)
	atomicOxygen?: number; // O, %
	atomicHydrogen?: number; // H, %
}

// Layer composition - varies with altitude
export interface LayerComposition {
	altitude: number; // km
	composition: GasComposition;
}

// Base Venus composition (measured at surface)
export const venusBaseComposition: GasComposition = {
	carbonDioxide: 96.5, // %
	nitrogen: 3.5, // %
	sulfurDioxide: 150, // ppm
	argon: 70, // ppm
	waterVapor: 20, // ppm
	carbonMonoxide: 17, // ppm
	helium: 12, // ppm
	neon: 7, // ppm
	hydrogenChloride: 0.1, // ppm
	hydrogenFluoride: 0.001 // ppm
};

// Composition profile by altitude
export const compositionProfile: LayerComposition[] = [
	{
		altitude: 0,
		composition: { ...venusBaseComposition }
	},
	{
		altitude: 30,
		composition: {
			...venusBaseComposition,
			sulfurDioxide: 180, // Higher SO2 in lower haze layer
			waterVapor: 15 // Less water vapor
		}
	},
	{
		altitude: 50,
		composition: {
			...venusBaseComposition,
			sulfurDioxide: 120,
			sulfuricAcid: 75, // Sulfuric acid droplets in cloud layer
			waterVapor: 10
		}
	},
	{
		altitude: 65,
		composition: {
			...venusBaseComposition,
			sulfurDioxide: 100,
			sulfuricAcid: 90, // More sulfuric acid in upper clouds
			waterVapor: 5
		}
	},
	{
		altitude: 90,
		composition: {
			carbonDioxide: 99, // Higher CO2 percentage
			nitrogen: 1,
			sulfurDioxide: 50,
			waterVapor: 1
		}
	},
	{
		altitude: 120,
		composition: {
			carbonDioxide: 80, // CO2 starts breaking down
			nitrogen: 10,
			atomicOxygen: 5, // Atomic oxygen from CO2 dissociation
			atomicHydrogen: 3,
			helium: 2
		}
	},
	{
		altitude: 150,
		composition: {
			carbonDioxide: 60,
			atomicOxygen: 20, // More atomic oxygen
			atomicHydrogen: 10,
			helium: 8,
			nitrogen: 2
		}
	}
];

/**
 * Get the atmospheric composition at a specific altitude
 * Uses interpolation between known data points
 */
export function getCompositionAtAltitude(altitude: number): GasComposition {
	// Return surface composition for below-surface queries
	if (altitude < 0) return compositionProfile[0].composition;

	// Return highest altitude composition for queries above our data
	if (altitude > compositionProfile[compositionProfile.length - 1].altitude) {
		return compositionProfile[compositionProfile.length - 1].composition;
	}

	// Find the two closest altitude data points
	let lowerIndex = 0;
	for (let i = 0; i < compositionProfile.length; i++) {
		if (compositionProfile[i].altitude <= altitude) {
			lowerIndex = i;
		}
	}

	// If exact match, return that composition
	if (compositionProfile[lowerIndex].altitude === altitude) {
		return compositionProfile[lowerIndex].composition;
	}

	// Linear interpolation between the two closest points for each gas component
	const upperIndex = lowerIndex + 1;
	const lowerAlt = compositionProfile[lowerIndex].altitude;
	const upperAlt = compositionProfile[upperIndex].altitude;

	const factor = (altitude - lowerAlt) / (upperAlt - lowerAlt);
	const lowerComp = compositionProfile[lowerIndex].composition;
	const upperComp = compositionProfile[upperIndex].composition;

	// Start with a copy of the lower composition
	const resultComp: GasComposition = { ...lowerComp };

	// Interpolate each value that exists in both compositions
	for (const key in upperComp) {
		if (key in lowerComp && key in upperComp) {
			// Type assertion to access properties dynamically
			const lowerVal = lowerComp[key as keyof GasComposition];
			const upperVal = upperComp[key as keyof GasComposition];

			// Only interpolate if both values are numbers
			if (typeof lowerVal === 'number' && typeof upperVal === 'number') {
				(resultComp[key as keyof GasComposition] as number) =
					lowerVal + factor * (upperVal - lowerVal);
			}
		}
	}

	return resultComp;
}

/**
 * Calculate the molecular weight of the atmosphere at a given altitude
 * @returns Molecular weight in g/mol
 */
export function getMolecularWeight(altitude: number): number {
	const comp = getCompositionAtAltitude(altitude);

	// Molecular weights of primary components (g/mol)
	const weights = {
		carbonDioxide: 44.01,
		nitrogen: 28.01,
		sulfurDioxide: 64.07,
		argon: 39.95,
		waterVapor: 18.02,
		carbonMonoxide: 28.01,
		helium: 4.00,
		neon: 20.18,
		hydrogenChloride: 36.46,
		hydrogenFluoride: 20.01,
		sulfuricAcid: 98.08,
		atomicOxygen: 16.00,
		atomicHydrogen: 1.01
	};

	// Start with main components (percentages)
	let totalWeight = 0;
	let totalPercentage = 0;

	// Add CO2 contribution
	if (comp.carbonDioxide) {
		totalWeight += comp.carbonDioxide * weights.carbonDioxide;
		totalPercentage += comp.carbonDioxide;
	}

	// Add N2 contribution
	if (comp.nitrogen) {
		totalWeight += comp.nitrogen * weights.nitrogen;
		totalPercentage += comp.nitrogen;
	}

	// Add atomic oxygen (in thermosphere)
	if (comp.atomicOxygen) {
		totalWeight += comp.atomicOxygen * weights.atomicOxygen;
		totalPercentage += comp.atomicOxygen;
	}

	// Add atomic hydrogen (in thermosphere)
	if (comp.atomicHydrogen) {
		totalWeight += comp.atomicHydrogen * weights.atomicHydrogen;
		totalPercentage += comp.atomicHydrogen;
	}

	// Add helium (increases in thermosphere)
	if (comp.helium && altitude > 100) {
		// Convert from ppm to percentage for upper atmosphere
		const heliumPercent = comp.helium > 1 ? comp.helium : comp.helium / 10000;
		totalWeight += heliumPercent * weights.helium;
		totalPercentage += heliumPercent;
	}

	// Return weighted average
	return totalWeight / totalPercentage;
}