// src/lib/sims/balloon/physics/atmosphere.ts
import { SIMULATION_CONSTANTS } from '../constants';

// Venus physical constants (you might move some of these to SIMULATION_CONSTANTS or a dedicated physics_constants.ts)
const GAS_CONSTANT_CO2 = 188.92; // J/(kg·K) Specific gas constant for CO2 (dominant gas)
const SPECIFIC_HEAT_RATIO_CO2 = 1.289; // Adiabatic index (gamma) for CO2

// Typical Venusian atmospheric layer approximate altitudes (meters)
const TROPOPAUSE_ALTITUDE_MIN = 60000; // ~60 km, can vary
const TROPOPAUSE_ALTITUDE_MAX = 70000; // ~70 km
const STRATO_MESO_TOP_ALTITUDE = 100000; // ~100 km, approx. top of mesosphere

// Typical temperatures (Kelvin)
const SURFACE_TEMPERATURE = 735.0; // K
const TROPOPAUSE_COLD_POINT_TEMP_AVG = 170.0; // K (very approximate average, can be colder)
// Temperature around 55km is more like 260-300K depending on models.
// For simplicity, we'll use the tropopause region as a major inflection point.

export interface AtmosphericConditions {
	density: number;      // kg/m³
	temperature: number;  // Kelvin
	pressure: number;     // Pa (Pascals, for more standard physics calcs)
	altitude: number;     // meters
	viscosity?: number;   // kg/(m·s) - Optional, for more advanced drag
	layer: 'Troposphere' | 'Tropopause Transition' | 'Strato/Mesosphere' | 'Upper Atmosphere';
}

/**
 * Calculate atmospheric conditions at a given altitude in meters on Venus.
 */
export function getAtmosphericConditions(altitude: number): AtmosphericConditions {
	const { SCALE_HEIGHT, GRAVITY } = SIMULATION_CONSTANTS;

	let temperature: number;
	let pressure: number;
	let density: number;
	let layer: AtmosphericConditions['layer'];

	// --- Temperature Profile ---
	// More realistic, segmented temperature profile
	if (altitude < TROPOPAUSE_ALTITUDE_MIN) {
		// Troposphere: Adiabatic lapse rate (simplified, actual Venusian troposphere is complex)
		// Dry adiabatic lapse rate g/Cp. For CO2, Cp ≈ 846 J/(kg K)
		// const ADIABATIC_LAPSE_RATE = GRAVITY / (GAS_CONSTANT_CO2 * SPECIFIC_HEAT_RATIO_CO2 / (SPECIFIC_HEAT_RATIO_CO2 - 1)); // K/m
		// Or a more direct g/Cp for CO2 (Cp for CO2 ~ 846 J/kgK at relevant temps)
		const ADIABATIC_LAPSE_RATE_VENUS = GRAVITY / 846; // ~0.01048 K/m or 10.48 K/km

		temperature = SURFACE_TEMPERATURE - ADIABATIC_LAPSE_RATE_VENUS * altitude;
		// Ensure a minimum temperature if the lapse rate makes it too cold before tropopause
		temperature = Math.max(temperature, TROPOPAUSE_COLD_POINT_TEMP_AVG); // Prevent unrealistic cold in lower tropo
		layer = 'Troposphere';
	} else if (altitude >= TROPOPAUSE_ALTITUDE_MIN && altitude <= TROPOPAUSE_ALTITUDE_MAX) {
		// Tropopause Transition / Lower Stratosphere: Often more isothermal or complex
		// For simplicity, let's make it roughly isothermal at the cold point, or a slight inversion.
		// A very rough approximation for this region.
		// Let's make it slightly warmer than the cold point, approaching ~200-220K around 70km
		const temp_at_60km = SURFACE_TEMPERATURE - (GRAVITY / 846) * 60000;
		const temp_at_70km = 220; // Target for upper part of this band
		const gradient_tropopause = (temp_at_70km - temp_at_60km) / (TROPOPAUSE_ALTITUDE_MAX - TROPOPAUSE_ALTITUDE_MIN);
		temperature = temp_at_60km + gradient_tropopause * (altitude - TROPOPAUSE_ALTITUDE_MIN);
		layer = 'Tropopause Transition';
	} else if (altitude > TROPOPAUSE_ALTITUDE_MAX && altitude <= STRATO_MESO_TOP_ALTITUDE) {
		// Stratosphere/Mesosphere: Temperature can be relatively constant or slightly increase/decrease
		// before rising sharply in the thermosphere. For Venus, it's often shown as cold.
		// Let's keep it cold, slowly rising towards the thermosphere base.
		// Example: 170K at 70km rising to 200K at 100km.
		const temp_at_70km = 220; // from above
		const temp_at_100km = 200; // before thermospheric rise
		const gradient_stratmeso = (temp_at_100km - temp_at_70km) / (STRATO_MESO_TOP_ALTITUDE - TROPOPAUSE_ALTITUDE_MAX);
		temperature = temp_at_70km + gradient_stratmeso * (altitude - TROPOPAUSE_ALTITUDE_MAX);
		layer = 'Strato/Mesosphere';
	} else {
		// Upper Atmosphere (Thermosphere): Temperature rises sharply (not modeled in detail here for simplicity)
		// For > 100km, it's very rarified, temperature definition changes.
		// Let's cap it or have a slow rise for now for balloon sim.
		temperature = 200 + (altitude - STRATO_MESO_TOP_ALTITUDE) * 0.005; // Gentle rise
		layer = 'Upper Atmosphere';
	}
	temperature = Math.max(150, temperature); // Absolute minimum reasonable temp

	// --- Pressure Calculation ---
	// Using the barometric formula, but integrated piecewise if temperature varies significantly.
	// For simplicity here, we'll still use a single scale height based on an *average* temperature
	// for the whole column below, or directly use the ideal gas law if surface pressure is known.
	// A more accurate pressure would come from integrating hydrostatic equilibrium: dP/dh = -rho * g
	// P = P_surface * exp(- integral(g/(R*T(h))) dh )
	// For now, stick to the simplified exponential decay with a global scale height,
	// acknowledging this is an approximation when temperature isn't constant.
	const surfacePressurePascals = 9200000; // 9.2 MPa in Pascals
	pressure = surfacePressurePascals * Math.exp(-altitude / SCALE_HEIGHT);

	// --- Density Calculation ---
	// Using Ideal Gas Law: rho = P / (R_specific * T)
	// Ensure temperature is not zero to avoid division by zero
	if (temperature <= 0) {
		density = SIMULATION_CONSTANTS.SURFACE_DENSITY; // Fallback, should not happen
		console.warn("Warning: Calculated temperature <= 0K. Altitude:", altitude);
	} else {
		density = pressure / (GAS_CONSTANT_CO2 * temperature);
	}
	// Clamp density to avoid unrealistic values if pressure/temp model gives odd results at extremes
	density = Math.max(0.00001, Math.min(density, SIMULATION_CONSTANTS.SURFACE_DENSITY * 1.5));


	// Optional: Viscosity (Sutherland's Law or simpler model - can be added later)
	// const viscosity = calculateViscosity(temperature);

	return {
		density,
		temperature,
		pressure, // in Pascals
		altitude,
		// viscosity,
		layer
	};
}

// Example: Simple Sutherland's law for CO2 viscosity (coefficients are approximate)
// function calculateViscosity(temperature: number): number {
// 	const C1 = 1.458e-6; // kg/(m·s·K^0.5)
// 	const S_co2 = 222;  // Sutherland's constant for CO2 (K)
// 	return (C1 * Math.pow(temperature, 1.5)) / (temperature + S_co2);
// }