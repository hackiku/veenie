// src/lib/sims/material/contexts/simulationContext.svelte.ts

import { getContext, setContext } from 'svelte';
import { FlightModel } from '../physics/flight';
import { AtmosphereModel } from '../physics/atmosphere';
import { ControllerModel } from '../physics/controller';
import type { ControlState } from '../physics/controller';
import { Vector3 } from 'three';

const SIMULATION_CONTEXT_KEY = 'simulation-context';

export function createSimulationContext(dbData = null) {
	// Extract data from DB
	const planetData = dbData?.planet;
	const atmosphereData = dbData?.atmosphere;
	const vehicleData = dbData?.vehicles?.[0]; // Default to first vehicle

	// Get planetary constants from DB or use defaults
	const VENUS_GRAVITY = planetData?.data?.gravity || 8.87;

	// Create model instances with DB data
	const flight = new FlightModel(vehicleData);
	const atmosphere = new AtmosphereModel(atmosphereData);
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

	// Session tracking
	let sessionId = $state(null);
	let recordingEnabled = $state(true);
	let telemetryInterval = $state(null);

	// vehicle selection
	let availableVehicles = $state([]);
	let currentVehicle = $state(null);	

	function setVehicle(vehicle) {
		currentVehicle = vehicle;

		// Update flight model with vehicle data
		if (vehicle && flight) {
			flight.setVehicle(vehicle);

			// Also update UI parameters
			syncState();
		}
	}

	function getVehicles() {
		return availableVehicles;
	}

	function getVehicleDetails() {
		if (!currentVehicle) return {};

		return {
			type: currentVehicle.type,
			mass: flight.getMass(),
			buoyancy: flight.getBuoyancy(),
			drag: flight.getDragCoefficient(),
			...(currentVehicle.data.dimensions || {})
		};
	}

	// Initialize vehicles from DB
	if (dbData && dbData.vehicles && dbData.vehicles.length > 0) {
		availableVehicles = dbData.vehicles;

		// Set the first vehicle as default
		if (availableVehicles.length > 0) {
			setVehicle(availableVehicles[0]);
		}
	}
	

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

	// DB integration methods
	async function startSession(userId = null) {
		try {
			// Get current settings
			const settings = {
				gravity: VENUS_GRAVITY,
				buoyancy: flight.getBuoyancy(),
				vehicle: flight.getVehicleData()?.name || 'default',
				windEnabled: atmosphere.isWindEnabled(),
				windIntensity: atmosphere.getWindIntensity(),
				timeScale
			};

			// Call API to start session
			const response = await fetch('/api/simulation/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId, settings })
			});

			if (!response.ok) {
				console.warn('Session recording unavailable, continuing without persistence');
				return null;
			}

			const data = await response.json();
			sessionId = data.sessionId;

			// Start recording telemetry
			if (recordingEnabled && sessionId) {
				startTelemetryRecording();
			}

			return sessionId;
		} catch (error) {
			console.warn('Failed to start session, continuing without persistence:', error);
			return null;
		}
	}

	function startTelemetryRecording() {
		if (!sessionId || !recordingEnabled) return;

		// Clear any existing interval
		if (telemetryInterval) {
			clearInterval(telemetryInterval);
		}

		// Start recording every 5 seconds
		telemetryInterval = setInterval(() => {
			recordTelemetryPoint();
		}, 5000);
	}

	async function recordTelemetryPoint() {
		if (!sessionId || !recordingEnabled) return;

		try {
			const telemetryData = {
				altitude: position[1],
				latitude: 0,  // Not implemented yet
				longitude: 0, // Not implemented yet
				temperature: atmosphericConditions.temperature,
				pressure: atmosphericConditions.pressure,
				windSpeed: Math.sqrt(
					Math.pow(atmosphericConditions.windVector[0], 2) +
					Math.pow(atmosphericConditions.windVector[1], 2) +
					Math.pow(atmosphericConditions.windVector[2], 2)
				),
				status: paused ? 'PAUSED' : 'ACTIVE'
			};

			// Call API to record telemetry
			await fetch('/api/simulation/telemetry', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sessionId, data: telemetryData })
			});
		} catch (error) {
			console.error('Failed to record telemetry:', error);
		}
	}

	function stopTelemetryRecording() {
		if (telemetryInterval) {
			clearInterval(telemetryInterval);
			telemetryInterval = null;
		}
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

	function getCloudLayers() {
		// Return cloud layers suitable for rendering
		return atmosphere.getCloudLayers();
	}

	function getSessionId() {
		return sessionId;
	}

	// Create the context object with getter methods instead of direct state references
	const context = {
		// Model references for advanced usage
		models: {
			flight,
			atmosphere,
			controller
		},

		// Planet data
		planet: planetData,

		// Getter methods for state
		getPosition,
		getVelocity,
		getAltitude,
		getAtmosphericConditions,
		isPaused,
		isDebug,
		getTimeScale,
		getCloudLayers,
		getSessionId,

		// For backward compatibility, also expose the state directly
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
		resetSimulation,

		// DB integration
		startSession,
		recordTelemetryPoint,
		startTelemetryRecording,
		stopTelemetryRecording,

		// vehicle
	  setVehicle,
		getVehicles,
		getVehicleDetails,

	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

export function getSimulationContext() {
	return getContext(SIMULATION_CONTEXT_KEY);
}