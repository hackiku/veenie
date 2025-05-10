// src/lib/sims/material/contexts/atmosphereContext.ts
import { getContext, setContext } from 'svelte';
import type { PhysicsContext } from '../types';
import { AtmosphereModel } from '../physics/atmosphere';

const ATMOSPHERE_CONTEXT_KEY = 'material-atmosphere';

export function createAtmosphereContext(physics: PhysicsContext) {
	// Create the atmosphere model
	const atmosphereModel = new AtmosphereModel();

	// Atmosphere state (from model)
	let windEnabled = $state(atmosphereModel.isWindEnabled());
	let windIntensity = $state(atmosphereModel.getWindIntensity());
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
		currentAltitude = altitude;

		// Get conditions from model
		const conditions = atmosphereModel.getConditionsAtAltitude(altitude);
		currentDensity = conditions.density;
		currentTemperature = conditions.temperature;

		return conditions;
	}

	// Apply atmospheric forces to the balloon
	function applyAtmosphericForces(altitude: number) {
		if (!windEnabled) return;

		// Update conditions first
		const conditions = updateConditions(altitude);

		// Apply wind force from model
		physics.applyForce({
			x: conditions.windVector.x * windIntensity,
			y: conditions.windVector.y * windIntensity,
			z: conditions.windVector.z * windIntensity
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

		// Model access
		atmosphereModel,

		// Methods
		updateConditions,
		applyAtmosphericForces,
		setWindEnabled(value: boolean) {
			windEnabled = value;
			atmosphereModel.setWindEnabled(value);
		},
		setWindIntensity(value: number) {
			windIntensity = value;
			atmosphereModel.setWindIntensity(value);
		}
	};

	// Register the context
	setContext(ATMOSPHERE_CONTEXT_KEY, context);

	return context;
}

export function getAtmosphereContext() {
	return getContext(ATMOSPHERE_CONTEXT_KEY);
}