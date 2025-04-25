// src/lib/sims/material/contexts/atmosphereContext.svelte.ts
import { getContext, setContext } from 'svelte';
import type { PhysicsContext } from '../types';
import { calculateDensity, calculateTemperature, calculateWindForce } from '../physics/forces';

const ATMOSPHERE_CONTEXT_KEY = 'material-atmosphere';

export function createAtmosphereContext(physics: PhysicsContext) {
	// Atmosphere state
	let windEnabled = $state(true);
	let windIntensity = $state(1.0);
	let cloudLayers = $state([
		{ altitude: 48, thickness: 5, density: 0.7 },
		{ altitude: 55, thickness: 8, density: 0.9 },
	]);

	// Current conditions at balloon position
	let currentDensity = $state(0);
	let currentTemperature = $state(0);
	let currentAltitude = $state(0);

	// Update atmospheric conditions based on altitude
	function updateConditions(altitude: number) {
		// Convert from simulation units to km
		const altitudeKm = altitude / 1000;
		currentAltitude = altitudeKm;

		// Calculate conditions
		currentDensity = calculateDensity(altitudeKm);
		currentTemperature = calculateTemperature(altitudeKm);
	}

	// Apply atmospheric forces to the balloon
	function applyAtmosphericForces(altitude: number) {
		if (!windEnabled) return;

		// Update conditions first
		updateConditions(altitude);

		// Calculate and apply wind force
		const windForce = calculateWindForce(currentAltitude);
		physics.applyForce({
			x: windForce[0] * windIntensity,
			y: windForce[1] * windIntensity,
			z: windForce[2] * windIntensity
		});
	}

	// Create the context object
	const context = {
		// State
		windEnabled,
		windIntensity,
		cloudLayers,
		currentDensity,
		currentTemperature,
		currentAltitude,

		// Methods
		updateConditions,
		applyAtmosphericForces,
		setWindEnabled(value: boolean) { windEnabled = value; },
		setWindIntensity(value: number) { windIntensity = value; }
	};

	// Register the context
	setContext(ATMOSPHERE_CONTEXT_KEY, context);

	return context;
}

export function getAtmosphereContext() {
	return getContext(ATMOSPHERE_CONTEXT_KEY);
}