// src/lib/sims/material/contexts/simulationContext.svelte.ts

import { getContext, setContext } from 'svelte';
import { FlightModel } from '../physics/flight';
import { AtmosphereModel } from '../physics/atmosphere';
import { ControllerModel } from '../physics/controller';
import type { ControlState } from '../physics/controller';

const SIMULATION_CONTEXT_KEY = 'simulation-context';

export function createSimulationContext() {
	// Constants
	const VENUS_GRAVITY = 8.87;

	// Create model instances
	const flight = new FlightModel();
	const atmosphere = new AtmosphereModel();
	const controller = new ControllerModel();

	// State exposed to components
	let position = $state<[number, number, number]>([0, 50, 0]);
	let velocity = $state<[number, number, number]>([0, 0, 0]);
	let altitude = $derived(position[1]);

	let atmosphericConditions = $state({
		density: 1.5,
		temperature: 330,
		pressure: 100,
		windVector: [0, 0, 0]
	});

	let paused = $state(false);
	let debug = $state(false);
	let timeScale = $state(1.0);

	// Update state from models
	function syncState() {
		const flightPosition = flight.getPosition();
		position = [flightPosition.x, flightPosition.y, flightPosition.z];

		const flightVelocity = flight.getVelocity();
		velocity = [flightVelocity.x, flightVelocity.y, flightVelocity.z];

		const conditions = atmosphere.getConditionsAtAltitude(position[1]);
		atmosphericConditions = {
			density: conditions.density,
			temperature: conditions.temperature,
			pressure: conditions.pressure,
			windVector: [
				conditions.windVector.x,
				conditions.windVector.y,
				conditions.windVector.z
			]
		};
	}

	// Main update method
	function update(deltaTime: number) {
		if (paused) return;

		// Scale time
		const scaledDelta = deltaTime * timeScale;

		// Get atmospheric conditions
		const conditions = atmosphere.getConditionsAtAltitude(position[1]);

		// Calculate control forces
		const controlForce = controller.calculateControlForce();

		// Apply forces to flight model
		flight.applyForce(controlForce);

		if (conditions.windVector) {
			// Apply wind forces
			flight.applyForce({
				x: conditions.windVector.x * 0.01,
				y: 0,
				z: conditions.windVector.z * 0.01
			});
		}

		// Update flight physics
		flight.update(scaledDelta, VENUS_GRAVITY, conditions.density);

		// Sync state for components
		syncState();
	}

	// Control methods
	function setControlState(state: Partial<ControlState>) {
		controller.setControlState(state);
	}

	function setBuoyancy(value: number) {
		flight.setBuoyancy(value);
	}

	function setWindEnabled(enabled: boolean) {
		atmosphere.setWindEnabled(enabled);
	}

	function setWindIntensity(value: number) {
		atmosphere.setWindIntensity(value);
	}

	function setPaused(value: boolean) {
		paused = value;
	}

	function setDebug(value: boolean) {
		debug = value;
	}

	function resetSimulation() {
		flight.reset();
		syncState();
	}

	// Create the context object
	const context = {
		// State
		position,
		velocity,
		altitude,
		atmosphericConditions,
		paused,
		debug,
		timeScale,

		// Methods
		update,
		setControlState,
		setBuoyancy,
		setWindEnabled,
		setWindIntensity,
		setPaused,
		setDebug,
		resetSimulation
	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

export function getSimulationContext() {
	return getContext(SIMULATION_CONTEXT_KEY);
}