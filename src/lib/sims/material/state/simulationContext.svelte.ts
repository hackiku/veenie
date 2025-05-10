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
	let timeScale = $state(0.5);

	// Position tracking for UI (position is actually managed by Rapier)
	let position = $state([0, 51000, 0]);
	let velocity = $state([0, 0, 0]);

	// Telemetry data
	let telemetry = $state({
		temperature: 0,
		pressure: 0,
		density: 0,
		altitude: 51000,
		status: 'IDLE'
	});

	// Wind settings
	let windEnabled = $state(true);
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

	// Active vehicle
	let currentVehicle = $state(vehicles[0] || DEFAULT_VEHICLES[0]);

	// ----------------------
	// Core Simulation Methods
	// ----------------------

	// Pause control
	function isPaused() { return paused; }
	function setPaused(value) { paused = !!value; } // Force boolean

	// Debug control
	function isDebug() { return debug; }
	function setDebug(value) { debug = !!value; } // Force boolean

	// Time control
	function getTimeScale() { return timeScale; }
	function setTimeScale(value) {
		timeScale = Math.max(0.1, Math.min(3.0, value));
	}

	// Position/velocity tracking
	function getPosition() { return position; }
	function updatePosition(pos) {
		if (pos && typeof pos.x === 'number') {
			position = [pos.x, pos.y, pos.z];
			telemetry = { ...telemetry, altitude: pos.y };
		} else if (Array.isArray(pos)) {
			position = [...pos];
			telemetry = { ...telemetry, altitude: pos[1] };
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

	// Altitude convenience methods
	function getAltitude() { return position[1]; }

	// Telemetry methods
	function updateTelemetry(data) {
		telemetry = { ...telemetry, ...data };
	}

	function getTelemetry() {
		return telemetry;
	}

	// Atmospheric conditions
	function getAtmosphericConditionsAtAltitude() {
		return getAtmosphericConditions(
			atmosphere,
			position[1],
			windEnabled,
			windIntensity
		);
	}

	// Wind controls
	function getWindEnabled() { return windEnabled; }
	function setWindEnabled(value) { windEnabled = !!value; } // Force boolean

	function getWindIntensity() { return windIntensity; }
	function setWindIntensity(value) {
		windIntensity = Math.max(0, Math.min(2, value));
	}

	// Vehicle methods
	function setVehicle(name) {
		const vehicle = vehicles.find(v => v.name === name);
		if (vehicle) {
			currentVehicle = vehicle;
		}
	}

	function getVehicle() {
		return currentVehicle;
	}

	// Reset simulation
	function resetSimulation() {
		position = [0, 51000, 0];
		velocity = [0, 0, 0];
		updateTelemetry({
			altitude: 51000,
			status: 'RESET'
		});
	}

	// Session methods
	let sessionId = $state(null);

	function getSessionId() {
		return sessionId || "mock-session-id";
	}

	async function startSession() {
		console.log("Session started");
		sessionId = "session-" + Date.now();
		return sessionId;
	}

	// Create the context object with organized structure
	const context = {
		// Core simulation control
		isPaused,
		setPaused,
		isDebug,
		setDebug,
		getTimeScale,
		setTimeScale,
		resetSimulation,

		// Wind control
		windEnabled: getWindEnabled,
		setWindEnabled,
		windIntensity: getWindIntensity,
		setWindIntensity,

		// Position tracking
		getPosition,
		updatePosition,
		getVelocity,
		updateVelocity,
		getAltitude,

		// Telemetry
		getTelemetry,
		updateTelemetry,

		// Atmospheric data
		atmosphere,
		getAtmosphericConditions: getAtmosphericConditionsAtAltitude,
		getCloudLayers: () => getCloudLayers(atmosphere),

		// Vehicle data
		vehicle: currentVehicle,
		getVehicle,
		vehicles,
		setVehicle,

		// Planet data
		planet: planetData,

		// Session management
		getSessionId,
		startSession,

		// Legacy compatibility
		getBuoyancy: () => currentVehicle?.data?.buoyancy || 0.35,
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