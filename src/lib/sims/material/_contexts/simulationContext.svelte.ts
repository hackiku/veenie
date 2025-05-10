// src/lib/sims/material/contexts/simulationContext.svelte.ts
import { getContext, setContext } from 'svelte';
import { getPhysicsContext, createPhysicsContext } from './physicsContext.svelte';
import { getAtmosphereContext, createAtmosphereContext } from './atmosphereContext.svelte';
import { getVehicleContext, createVehicleContext } from './vehicleContext.svelte';
import { getRapierContext, createRapierContext } from './rapierContext.svelte';

const SIMULATION_CONTEXT_KEY = 'simulation-context';

export function createSimulationContext(dbData = null) {
	// Extract data from DB

	

	const planetData = dbData?.planet;
	const atmosphereData = dbData?.atmosphere;
	const vehicleData = dbData?.vehicles || [];

	// Create child contexts
	const physics = createPhysicsContext();
	const atmosphere = createAtmosphereContext(atmosphereData);
	const vehicle = createVehicleContext(vehicleData);
	const rapier = createRapierContext();

	if (!dbData) {
		console.warn('Missing data for simulation context, using defaults');
		dbData = {
			planet: {
				name: 'Venus',
				data: {
					gravity: 8.87,
					radius: 6051.8,
					atmoDensity: 65,
					surfaceTemperature: 735
				}
			},
			atmosphere: [],
			vehicles: []
		};
	}

	// Core simulation state
	let paused = $state(false);
	let debug = $state(false);
	let timeScale = $state(1.0);

	// Session tracking
	let sessionId = $state(null);
	let recordingEnabled = $state(true);
	let telemetryInterval = $state(null);

	// Initialize with first vehicle
	if (vehicleData && vehicleData.length > 0) {
		vehicle.setVehicle(vehicleData[0]);
		physics.updateFromVehicle(vehicle.getCurrentVehicle());
	}

	// Main update method
	function update(deltaTime: number) {
		if (paused) return;

		// Scale time
		const scaledDelta = deltaTime * timeScale;

		// Get atmospheric conditions at current altitude
		const currentAltitude = physics.getPosition()[1];
		const conditions = atmosphere.getConditionsAtAltitude(currentAltitude);

		// Update physics model with current conditions
		physics.update(scaledDelta, conditions);

		// Apply control and other forces
		if (conditions.windVector && atmosphere.isWindEnabled()) {
			physics.applyForce({
				x: conditions.windVector.x * atmosphere.getWindIntensity() * 0.01,
				y: 0,
				z: conditions.windVector.z * atmosphere.getWindIntensity() * 0.01
			});
		}

		// Sync Rapier rigid body with our physics model
		rapier.syncFromPhysics(physics);
	}

	// Control methods
	function setControlState(state) {
		physics.setControlState(state);
	}

	function setBuoyancy(value: number) {
		physics.setBuoyancy(value);
	}

	function getBuoyancy(): number {
		return physics.getBuoyancy();
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
		physics.reset();
		rapier.reset();
	}

	// DB integration methods
	async function startSession(userId = null) {
		try {
			// Get current settings
			const settings = {
				gravity: planetData?.data?.gravity || 8.87,
				buoyancy: physics.getBuoyancy(),
				vehicle: vehicle.getCurrentVehicle()?.name || 'default',
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
			const pos = physics.getPosition();
			const conditions = atmosphere.getConditionsAtAltitude(pos[1]);

			// Calculate wind speed
			const windVector = atmosphere.isWindEnabled() ?
				conditions.windVector : { x: 0, y: 0, z: 0 };

			const windSpeed = Math.sqrt(
				Math.pow(windVector.x, 2) +
				Math.pow(windVector.y, 2) +
				Math.pow(windVector.z, 2)
			);

			const telemetryData = {
				altitude: pos[1],
				latitude: 0,  // Not implemented yet
				longitude: 0, // Not implemented yet
				temperature: conditions.temperature,
				pressure: conditions.pressure,
				windSpeed: windSpeed,
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

	// Create the context object
	const context = {
		// Child contexts
		physics,
		atmosphere,
		vehicle,
		rapier,

		// Planetary data
		planet: planetData,

		// Methods for the original API compatibility
		getPosition: () => physics.getPosition(),
		getVelocity: () => physics.getVelocity(),
		getAltitude: () => physics.getPosition()[1],
		getAtmosphericConditions: () => {
			const altitude = physics.getPosition()[1];
			return atmosphere.getConditionsAtAltitude(altitude);
		},
		getCloudLayers: () => atmosphere.getCloudLayers(),
		isPaused: () => paused,
		isDebug: () => debug,
		getTimeScale: () => timeScale,
		getSessionId: () => sessionId,

		// Expose our models for backwards compatibility
		models: {
			atmosphere,
			flight: physics // Map old flight model to physics
		},

		// Control methods
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

		// Vehicle methods
		getVehicles: () => vehicle.getVehicles(),
		setVehicle: (v) => vehicle.setVehicle(v),
		getVehicleDetails: () => vehicle.getVehicleDetails(),

		// DB integration
		startSession,
		recordTelemetryPoint,
		startTelemetryRecording,
		stopTelemetryRecording
	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

// In simulationContext.svelte.ts, update the getContext function
export function getSimulationContext() {
	const context = getContext(SIMULATION_CONTEXT_KEY);

	if (!context) {
		console.warn('No simulation context found. Did you forget to create it in a parent component?');
		return null;
	}

	return context;
}