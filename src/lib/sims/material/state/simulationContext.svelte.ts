// src/lib/sims/material/state/simulationContext.svelte.ts

import { getContext, setContext } from 'svelte';
import { getAtmosphericConditions, getCloudLayers } from '../core/atmosphere';
import { DEFAULT_VEHICLES } from '../core/vehicleProperties';
import type { VehicleProperties } from '../core/vehicleProperties';

const SIMULATION_CONTEXT_KEY = 'simulation-context';

export function createSimulationContext(dbData = null) {
	// Core simulation state
	let paused = $state(false);
	let debug = $state(false);
	let timeScale = $state(0.2);

	// Position tracking for UI (position is actually managed by Rapier)
	let position = $state([0, 51000, 0]);
	let velocity = $state([0, 0, 0]);

	// Wind settings
	let windEnabled = $state(false);
	let windIntensity = $state(1.0);

	// Extract data from DB
	const vehicles = dbData?.vehicles || DEFAULT_VEHICLES;
	const atmosphere = dbData?.atmosphere || [];
	const planetData = dbData?.planet || {
		name: 'Venus',
		data: {
			gravity: 8.87,
			radius: 6051.8,
			atmoDensity: 65,
			surfaceTemperature: 735
		}
	};

	// Active vehicle (first one by default) - CHANGED FROM CONST TO LET WITH $STATE
	let currentVehicle = $state(vehicles[0] || DEFAULT_VEHICLES[0]);

	// Methods
	function isPaused() { return paused; }
	function setPaused(value) { paused = value; }
	function isDebug() { return debug; }
	function setDebug(value) { debug = value; }

	function getPosition() { return position; }
	function updatePosition(pos) {
		if (pos && typeof pos.x === 'number') {
			position = [pos.x, pos.y, pos.z];
		} else if (Array.isArray(pos)) {
			position = [...pos];
		}
	}

	function getVelocity() { return velocity; }
	function updateVelocity(vel) {
		if (vel && typeof vel.x === 'number') {
			velocity = [vel.x, vel.y, vel.z];
		} else if (Array.isArray(vel)) {
			velocity = [...vel];
		}
	}

	function getAltitude() { return position[1]; }

	function getAtmosphericConditionsAtAltitude() {
		return getAtmosphericConditions(
			atmosphere,
			position[1],
			windEnabled,
			windIntensity
		);
	}

	function resetSimulation() {
		position = [0, 51000, 0];
		velocity = [0, 0, 0];
	}

	// Vehicle methods
	function setVehicle(name) {
		const vehicle = vehicles.find(v => v.name === name);
		if (vehicle) {
			currentVehicle = vehicle; // Now this should work since currentVehicle is reactive
		}
	}

	// Create the context object
	const context = {
		// State getters/setters
		isPaused,
		setPaused,
		isDebug,
		setDebug,
		getTimeScale: () => timeScale,
		setTimeScale: (value) => { timeScale = Math.max(0.1, Math.min(3.0, value)); },

		// Wind controls
		windEnabled,
		setWindEnabled: (value) => { windEnabled = value; },
		windIntensity,
		setWindIntensity: (value) => { windIntensity = Math.max(0, Math.min(2, value)); },

		// Position/velocity tracking
		getPosition,
		updatePosition,
		getVelocity,
		updateVelocity,
		getAltitude,

		// Atmospheric data
		atmosphere,
		getAtmosphericConditions: getAtmosphericConditionsAtAltitude,
		getCloudLayers: () => getCloudLayers(atmosphere),

		// Vehicle data
		vehicle: currentVehicle,
		vehicles,
		setVehicle,

		// Planet data
		planet: planetData,

		// Simulation controls
		resetSimulation,

		// Compatibility methods for existing components
		getBuoyancy: () => currentVehicle?.data?.buoyancy || 0.35,

		// Legacy context compatibility for atmosphere
		atmosphere: {
			getWindIntensity: () => windIntensity,
			isWindEnabled: () => windEnabled,
			setWindEnabled: (value) => { windEnabled = value; },
			setWindIntensity: (value) => { windIntensity = value; },
			getConditionsAtAltitude: (altitude) =>
				getAtmosphericConditions(atmosphere, altitude, windEnabled, windIntensity),
			getCloudLayers: () => getCloudLayers(atmosphere)
		},

		// Legacy context compatibility for vehicle
		vehicle: {
			getCurrentVehicle: () => currentVehicle,
			setVehicle,
			getVehicles: () => vehicles,
			getVehicleDetails: () => ({
				name: currentVehicle.name,
				type: currentVehicle.type,
				mass: currentVehicle.data?.mass || 1.0,
				buoyancy: currentVehicle.data?.buoyancy || 0.35,
				dragCoefficient: currentVehicle.data?.dragFactor || 0.05
			})
		},

		// Session methods (minimal implementation)
		getSessionId: () => "mock-session-id",
		startSession: async () => {
			console.log("Session started (mock)");
			return "mock-session-id";
		}
	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

export function getSimulationContext() {
	const context = getContext(SIMULATION_CONTEXT_KEY);

	if (!context) {
		console.warn('No simulation context found. Did you forget to create it in a parent component?');
		return null;
	}

	return context;
}