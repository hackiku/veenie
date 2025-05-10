// src/lib/sims/material/state/simulationContext.svelte.ts

import { getContext, setContext } from 'svelte';
import { createDefaultTelemetry, type Telemetry } from './telemetry';
import { type SimCommand, type CommandDispatcher, Commands } from './commands';
import { getAtmosphericConditions, getCloudLayers } from '../core/atmosphere';
import { DEFAULT_VEHICLES } from '../core/vehicleProperties';
import type { VehicleProperties } from '../core/vehicleProperties';

// Context key
const SIMULATION_CONTEXT_KEY = 'simulation-context';

/**
 * Create the simulation context
 */
export function createSimulationContext(dbData = null) {
	// Telemetry store - the single source of truth
	let telemetry = $state(createDefaultTelemetry());

	// Reset counter - incremented to trigger component recreation
	let resetCounter = $state(0);

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

	// Set initial vehicle from database
	telemetry.vehicle = {
		name: vehicles[0]?.name || DEFAULT_VEHICLES[0].name,
		type: vehicles[0]?.type || DEFAULT_VEHICLES[0].type,
		mass: vehicles[0]?.data?.mass || DEFAULT_VEHICLES[0].mass,
		buoyancy: vehicles[0]?.data?.buoyancy || DEFAULT_VEHICLES[0].buoyancy,
		dragCoefficient: vehicles[0]?.data?.dragFactor || DEFAULT_VEHICLES[0].dragCoefficient,
	};

	// Command dispatcher - handles all simulation commands
	const dispatch: CommandDispatcher = (command: SimCommand) => {
		try {
			switch (command.type) {
				case 'PLAY':
					telemetry.simulation.isPaused = false;
					break;

				case 'PAUSE':
					telemetry.simulation.isPaused = true;
					break;

				case 'RESET':
					// Reset position and velocity
					telemetry.position = [0, 51000, 0];
					telemetry.velocity = [0, 0, 0];
					telemetry.altitude = 51000;

					// Reset forces
					telemetry.forces = createDefaultTelemetry().forces;

					// Reset timer
					telemetry.simulation.elapsedTime = 0;

					// Increment reset counter to trigger component recreation
					resetCounter++;
					break;

				case 'SET_WIND_ENABLED':
					telemetry.simulation.windEnabled = command.payload;
					break;

				case 'SET_WIND_INTENSITY':
					telemetry.simulation.windIntensity = command.payload;
					break;

				case 'SET_VEHICLE':
					const vehicle = vehicles.find(v => v.name === command.payload);
					if (vehicle) {
						telemetry.vehicle = {
							name: vehicle.name,
							type: vehicle.type,
							mass: vehicle.data?.mass || DEFAULT_VEHICLES[0].mass,
							buoyancy: vehicle.data?.buoyancy || DEFAULT_VEHICLES[0].buoyancy,
							dragCoefficient: vehicle.data?.dragFactor || DEFAULT_VEHICLES[0].dragCoefficient,
						};
					}
					break;

				case 'SET_POSITION':
					telemetry.position = command.payload;
					telemetry.altitude = command.payload[1];
					break;

				case 'SET_TIME_SCALE':
					telemetry.simulation.timeScale = Math.max(0.1, Math.min(3.0, command.payload));
					break;

				case 'SET_DEBUG':
					telemetry.simulation.isDebug = command.payload;
					break;

				case 'RECORD_TELEMETRY':
					// Update specific telemetry values
					telemetry = { ...telemetry, ...command.payload };
					break;

				case 'START_SESSION':
					telemetry.simulation.sessionId = `session-${Date.now()}`;
					console.log("Session started:", telemetry.simulation.sessionId);
					break;
			}
		} catch (err) {
			console.error("Error handling command:", command, err);
		}
	};

	// Getters for telemetry values (convenience methods)
	function getPosition() { return telemetry.position; }
	function getVelocity() { return telemetry.velocity; }
	function getAltitude() { return telemetry.altitude; }
	function isPaused() { return telemetry.simulation.isPaused; }
	function isDebug() { return telemetry.simulation.isDebug; }
	function getTimeScale() { return telemetry.simulation.timeScale; }
	function getWindEnabled() { return telemetry.simulation.windEnabled; }
	function getWindIntensity() { return telemetry.simulation.windIntensity; }
	function getSessionId() { return telemetry.simulation.sessionId; }
	function getResetCounter() { return resetCounter; }

	// Get atmospheric conditions at current altitude
	function getAtmosphericConditionsAtAltitude() {
		return getAtmosphericConditions(
			atmosphere,
			telemetry.altitude,
			telemetry.simulation.windEnabled,
			telemetry.simulation.windIntensity
		);
	}

	// Command helpers for components (convenience methods)
	const commands = {
		play: () => dispatch(Commands.play()),
		pause: () => dispatch(Commands.pause()),
		reset: () => dispatch(Commands.reset()),
		setWindEnabled: (enabled: boolean) => dispatch(Commands.setWindEnabled(enabled)),
		setWindIntensity: (intensity: number) => dispatch(Commands.setWindIntensity(intensity)),
		setVehicle: (name: string) => dispatch(Commands.setVehicle(name)),
		setTimeScale: (scale: number) => dispatch(Commands.setTimeScale(scale)),
		setDebug: (debug: boolean) => dispatch(Commands.setDebug(debug)),
		startSession: () => dispatch(Commands.startSession()),
		updatePosition: (pos: { x: number, y: number, z: number } | [number, number, number]) => {
			if (Array.isArray(pos)) {
				dispatch(Commands.setPosition(pos));
			} else {
				dispatch(Commands.setPosition([pos.x, pos.y, pos.z]));
			}
		},
		updateVelocity: (vel: { x: number, y: number, z: number } | [number, number, number]) => {
			if (Array.isArray(vel)) {
				telemetry.velocity = vel;
			} else {
				telemetry.velocity = [vel.x, vel.y, vel.z];
			}
		},
		recordTelemetry: (data: Record<string, any>) => {
			dispatch(Commands.recordTelemetry(data));
		}
	};

	// Create the context object
	const context = {
		// The core telemetry store
		telemetry,

		// Command system
		dispatch,
		commands,

		// Getters for UI components
		getPosition,
		getVelocity,
		getAltitude,
		isPaused,
		isDebug,
		getTimeScale,
		getWindEnabled,
		getWindIntensity,
		getSessionId,
		getResetCounter,

		// Database data
		atmosphere,
		vehicles,
		planet: planetData,

		// Helper methods
		getAtmosphericConditions: getAtmosphericConditionsAtAltitude,
		getCloudLayers: () => getCloudLayers(atmosphere),

		// Legacy compatibility
		getBuoyancy: () => telemetry.vehicle.buoyancy
	};

	// Register the context
	setContext(SIMULATION_CONTEXT_KEY, context);

	return context;
}

/**
 * Get the simulation context
 */
export function getSimulationContext() {
	const context = getContext(SIMULATION_CONTEXT_KEY);

	if (!context) {
		console.warn('No simulation context found. Did you forget to create it in a parent component?');
		return null;
	}

	return context;
}