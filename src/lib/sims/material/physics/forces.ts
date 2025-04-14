// src/lib/sims/material/physics/forces.ts

import { GRAVITY, ATMOSPHERE, BALLOON } from './data/constants';

/**
 * Calculate density of atmosphere at a given altitude
 * Using simplified barometric formula: ρ(h) = ρ₀ * e^(-h/H)
 * 
 * @param altitude - Altitude in km
 * @returns Density in kg/m³
 */
export function calculateDensity(altitude: number): number {
	// Base density at 50km: ~1.5 kg/m³
	const baseDensity = 1.5;
	const baseAltitude = 50; // km

	// Use scale height from constants
	const scaleHeight = ATMOSPHERE.PRESSURE.SCALE_HEIGHT;

	// Calculate density using exponential decrease
	return baseDensity * Math.exp(-(altitude - baseAltitude) / scaleHeight);
}

/**
 * Calculate temperature at a given altitude
 * Using linear approximation from constants
 * 
 * @param altitude - Altitude in km
 * @returns Temperature in Kelvin
 */
export function calculateTemperature(altitude: number): number {
	const { BASE, LAPSE_RATE } = ATMOSPHERE.TEMPERATURE;
	return BASE - LAPSE_RATE * altitude;
}

/**
 * Calculate buoyancy force on balloon
 * Simplified for initial simulation
 * 
 * @param altitude - Altitude in km
 * @param volume - Balloon volume in m³
 * @param balloonMass - Mass of balloon in kg
 * @returns Net buoyancy force in Newtons
 */
export function calculateBuoyancy(altitude: number, volume: number, balloonMass: number): number {
	// Get atmospheric density at current altitude
	const atmosphericDensity = calculateDensity(altitude);

	// Density of hydrogen (lifting gas) - simplified and constant for now
	const hydrogenDensity = 0.09; // kg/m³

	// Calculate buoyancy force: F = (ρatm - ρgas) * V * g
	const displacedMass = atmosphericDensity * volume;
	const gasMass = hydrogenDensity * volume;
	const netBuoyancyForce = (displacedMass - gasMass - balloonMass) * GRAVITY.VENUS;

	return netBuoyancyForce;
}

/**
 * Calculate wind force vector
 * Very simplified for initial simulation
 * 
 * @param altitude - Altitude in km
 * @returns Wind force vector [x, y, z]
 */
export function calculateWindForce(altitude: number): [number, number, number] {
	// Base wind force in x direction (east)
	const baseWindSpeed = ATMOSPHERE.WIND.SPEED;

	// Add small random variation
	const variation = ATMOSPHERE.WIND.VARIATION;
	const randomFactor = 1 + (Math.random() * 2 - 1) * variation;

	const windSpeed = baseWindSpeed * randomFactor;

	// For now, wind only pushes in x direction
	// Later we can add more complex wind patterns
	return [windSpeed, 0, 0];
}