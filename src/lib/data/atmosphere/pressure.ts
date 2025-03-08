// src/lib/sims/venus/data/pressure.ts

/**
 * Venus pressure profile data
 * Pressures in bars and altitude in km
 */

export interface PressurePoint {
	altitude: number;  // km
	pressure: number;  // bars
}

// Venus pressure profile from observation data
export const pressureProfile: PressurePoint[] = [
	{ altitude: 0, pressure: 92.10 },
	{ altitude: 5, pressure: 66.65 },
	{ altitude: 10, pressure: 47.39 },
	{ altitude: 15, pressure: 33.04 },
	{ altitude: 20, pressure: 22.52 },
	{ altitude: 25, pressure: 14.93 },
	{ altitude: 30, pressure: 9.851 },
	{ altitude: 35, pressure: 5.917 },
	{ altitude: 40, pressure: 3.501 },
	{ altitude: 45, pressure: 1.979 },
	{ altitude: 50, pressure: 1.066 },
	{ altitude: 55, pressure: 0.5314 },
	{ altitude: 60, pressure: 0.2357 },
	{ altitude: 65, pressure: 0.09765 },
	{ altitude: 70, pressure: 0.03690 },
	{ altitude: 80, pressure: 0.004760 },
	{ altitude: 90, pressure: 0.0003736 },
	{ altitude: 100, pressure: 0.00002660 },
	{ altitude: 110, pressure: 0.000001950 },
	{ altitude: 120, pressure: 0.0000001470 },
	{ altitude: 130, pressure: 0.00000001120 },
	{ altitude: 140, pressure: 0.00000000108 },
	{ altitude: 150, pressure: 0.00000000012 }
];

// Function to get pressure at a specific altitude
export function getPressureAtAltitude(altitude: number): number {
	// Return surface pressure for below-surface queries
	if (altitude < 0) return pressureProfile[0].pressure;

	// Return highest altitude pressure for queries above our data
	if (altitude > pressureProfile[pressureProfile.length - 1].altitude) {
		return pressureProfile[pressureProfile.length - 1].pressure;
	}

	// Find the two closest altitude data points
	let lowerIndex = 0;
	for (let i = 0; i < pressureProfile.length; i++) {
		if (pressureProfile[i].altitude <= altitude) {
			lowerIndex = i;
		}
	}

	// If exact match, return that pressure
	if (pressureProfile[lowerIndex].altitude === altitude) {
		return pressureProfile[lowerIndex].pressure;
	}

	// Logarithmic interpolation between the two closest points (pressure decreases exponentially with height)
	const upperIndex = lowerIndex + 1;
	const lowerAlt = pressureProfile[lowerIndex].altitude;
	const upperAlt = pressureProfile[upperIndex].altitude;
	const lowerPressure = Math.log(pressureProfile[lowerIndex].pressure);
	const upperPressure = Math.log(pressureProfile[upperIndex].pressure);

	const factor = (altitude - lowerAlt) / (upperAlt - lowerAlt);
	const interpolatedLogPressure = lowerPressure + factor * (upperPressure - lowerPressure);

	return Math.exp(interpolatedLogPressure);
}

// Convert pressure to different units
export function convertPressure(pressure: number, unit: 'bar' | 'pascal' | 'atm' | 'psi'): number {
	switch (unit) {
		case 'bar':
			return pressure;
		case 'pascal':
			return pressure * 100000; // 1 bar = 100,000 Pa
		case 'atm':
			return pressure * 0.986923; // 1 bar = 0.986923 atm
		case 'psi':
			return pressure * 14.5038; // 1 bar = 14.5038 psi
		default:
			return pressure;
	}
}

// Format pressure for display based on magnitude
export function formatPressure(pressure: number): string {
	if (pressure < 0.000001) {
		return `${(pressure * 1000000000).toFixed(2)} nbar`;
	} else if (pressure < 0.001) {
		return `${(pressure * 1000000).toFixed(2)} μbar`;
	} else if (pressure < 1) {
		return `${(pressure * 1000).toFixed(2)} mbar`;
	} else {
		return `${pressure.toFixed(2)} bar`;
	}
}

// Calculate density based on pressure and temperature (ideal gas law)
export function calculateDensity(pressure: number, temperature: number): number {
	// Venus atmosphere is primarily CO2 with molar mass of about 44 g/mol
	const molarMass = 0.044; // kg/mol
	const R = 8.3145; // J/(mol·K) - gas constant

	// Convert pressure from bars to pascals
	const pressurePa = pressure * 100000;

	// Density = PM/RT
	return (pressurePa * molarMass) / (R * temperature);
}