// src/lib/sims/material/contexts/simulationContext.svelte.ts

import { getContext, setContext } from 'svelte';
import { FlightModel } from '../physics/flight';
import { AtmosphereModel } from '../physics/atmosphere';
import { ControllerModel } from '../physics/controller';
import type { ControlState } from '../physics/controller';
import { Vector3 } from 'three';

const SIMULATION_CONTEXT_KEY = 'simulation-context';

export function createSimulationContext() {
	// Constants
	const VENUS_GRAVITY = 8.87;

	// Create model instances
	const flight = new FlightModel();
	const atmosphere = new AtmosphereModel();
	const controller = new ControllerModel();

	// State exposed to components
	let position = $state<[number, number, number]>([0, 25, 0]);
	let velocity = $state<[number, number, number]>([0, 0, 0]);
	let altitude = $derived(position[1]);

	let atmosphericConditions = $state({
		density: 10.5,
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
			// Apply wind forces - creating a proper Vector3 instance
			flight.applyForce(new Vector3(
				conditions.windVector.x * 0.01,
				0,
				conditions.windVector.z * 0.01
			));
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

	// Add a getter for buoyancy
	function getBuoyancy(): number {
		return flight.getBuoyancy();
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

	function setTimeScale(value: number): void {
		timeScale = Math.max(0.1, Math.min(3.0, value));
	}

	function resetSimulation() {
		flight.reset();
		syncState();
	}

	// Create getters for reactive state
	function getPosition() {
		return position;
	}

	function getVelocity() {
		return velocity;
	}

	function getAltitude() {
		return altitude;
	}

	function getAtmosphericConditions() {
		return atmosphericConditions;
	}

	function isPaused() {
		return paused;
	}

	function isDebug() {
		return debug;
	}

	function getTimeScale() {
		return timeScale;
	}

	// Create the context object with getter methods instead of direct state references
	const context = {
		// Getter methods for state
		getPosition,
		getVelocity,
		getAltitude,
		getAtmosphericConditions,
		isPaused,
		isDebug,
		getTimeScale,

		// For backward compatibility, also expose the state directly
		// This won't be reactive in context consumers but is available for direct access
		get position() { return position; },
		get velocity() { return velocity; },
		get altitude() { return altitude; },
		get atmosphericConditions() { return atmosphericConditions; },
		get paused() { return paused; },
		get debug() { return debug; },
		get timeScale() { return timeScale; },

		// Methods
		update,
		setControlState,
		setBuoyancy,
		getBuoyancy,
		setWindEnabled,
		setWindIntensity,
		setPaused,
		setDebug,
		setTimeScale,
		resetSimulation
	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

export function getSimulationContext() {
	return getContext(SIMULATION_CONTEXT_KEY);
}