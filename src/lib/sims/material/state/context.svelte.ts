// src/lib/sims/material/state/context.svelte.ts

import { getTimeSystem, resetTimeSystem } from '../core/systems/TimeSystem';
import { getFlightSystem, resetFlightSystem } from '../core/systems/FlightSystem';
import { getEntityRegistry, resetEntityRegistry } from '../core/entities/registry';
import { getRapierBridge, resetRapierBridge } from '../core/bridge';
import { createBalloon } from '../core/entities/Balloon';
import { setContext, getContext } from 'svelte';

// Context key
const SIMULATION_CONTEXT_KEY = 'simulation-context';

/**
 * Create the simulation context with minimal UI state
 */
export function createSimulationContext(dbData = null) {
	// Extract data from database
	const vehicles = dbData?.vehicles || [];
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

	// Initialize physics systems - these are the source of truth
	resetEntityRegistry();
	resetTimeSystem({ initialPaused: true });

	const timeSystem = getTimeSystem();
	const flightSystem = getFlightSystem({ timeSystem });
	const entityRegistry = getEntityRegistry();

	// Initialize balloon with default vehicle
	const defaultVehicle = vehicles[0] || {
		name: "Research Balloon",
		type: "balloon",
		data: {
			mass: 1.2,
			buoyancy: 0.35,
			dragFactor: 0.05,
			dimensions: { radius: 1.5 }
		}
	};

	// Minimal UI-specific state - only what's needed for UI, not physics
	const uiState = $state({
		debug: false,
		resetCounter: 0,
		showDebugPanel: true,
		selectedVehicleName: defaultVehicle.name,
		windEnabled: true,
		windIntensity: 1.0
	});

	// Reference to Rapier bridge - will be initialized when world is created
	let bridge = $state(null);

	// Track whether a physics update has been performed
	let hasUpdated = $state(false);

	// Commands for UI interactions
	const commands = {
		// Time controls
		play() {
			console.log("Setting paused to false");
			timeSystem.setPaused(false);
		},

		pause() {
			console.log("Setting paused to true");
			timeSystem.setPaused(true);
		},

		togglePause() {
			const newState = timeSystem.togglePaused();
			console.log("Toggled pause state to:", newState);
		},

		setTimeScale(scale) {
			timeSystem.setTimeScale(scale);
		},

		// Reset simulation
		reset() {
			console.log("Resetting simulation");
			// Reset time
			timeSystem.resetTime();

			// Reset entities
			resetEntityRegistry();

			// Create new balloon
			const vehicle = vehicles.find(v => v.name === uiState.selectedVehicleName) || defaultVehicle;

			const balloon = createBalloon(
				'balloon-1',
				{
					name: vehicle.name,
					type: vehicle.type,
					mass: vehicle.data.mass,
					buoyancy: vehicle.data.buoyancy,
					dragCoefficient: vehicle.data.dragFactor || 0.05,
					dimensions: vehicle.data.dimensions
				},
				[0, 51000, 0]
			);

			// Register new balloon
			entityRegistry.register(balloon);
			console.log("Created balloon:", balloon.id);

			// Increment reset counter to trigger component recreation
			uiState.resetCounter++;

			// Reset update flag
			hasUpdated = false;
		},

		// Vehicle selection
		setVehicle(name) {
			uiState.selectedVehicleName = name;
		},

		// Environment controls
		setWindEnabled(enabled) {
			uiState.windEnabled = enabled;
			if (bridge) {
				bridge.setWindEnabled(enabled);
			}
		},

		setWindIntensity(intensity) {
			uiState.windIntensity = Math.max(0, Math.min(2, intensity));
			if (bridge) {
				bridge.setWindIntensity(uiState.windIntensity);
			}
		},

		// Debug controls
		setDebug(enabled) {
			uiState.debug = enabled;
		},

		setDebugPanelVisible(visible) {
			uiState.showDebugPanel = visible;
		},

		// Session management
		startSession() {
			// Create balloon if none exists
			if (entityRegistry.getAll().length === 0) {
				this.reset();
			}
		},

		// Bridge initialization
		initializeBridge(rapierWorld) {
			console.log("Initializing Rapier bridge with world", rapierWorld);
			if (!bridge && rapierWorld) {
				resetRapierBridge(rapierWorld, atmosphere);
				bridge = getRapierBridge();

				// Force creation of balloon entity if needed
				if (entityRegistry.getAll().length === 0) {
					this.reset();
				}

				return bridge;
			}
			return bridge;
		}
	};

	// Create context object
	const context = {
		// Core physics systems - direct references
		timeSystem,
		flightSystem,
		entityRegistry,

		// Bridge reference
		get rapierBridge() {
			return bridge;
		},

		// Data references
		atmosphere,
		vehicles,
		planet: planetData,

		// UI state
		uiState,

		// Commands
		commands,

		// Convenience getters that directly access physics state
		isPaused: () => timeSystem.isPaused(),
		getTimeScale: () => timeSystem.getTimeScale(),
		getTime: () => timeSystem.getTime(),
		isDebug: () => uiState.debug,
		getResetCounter: () => uiState.resetCounter,

		// Current state of balloon (first one found)
		getBalloonState() {
			const balloons = flightSystem.getAllBalloons();
			return balloons.length > 0 ? balloons[0] : null;
		},

		// Get telemetry data for UI from physics systems
		getTelemetry() {
			const balloon = this.getBalloonState();

			if (!balloon) {
				return {
					position: [0, 51000, 0],
					velocity: [0, 0, 0],
					altitude: 51000,
					forces: null,
					atmospheric: null,
					simulation: {
						isPaused: timeSystem.isPaused(),
						timeScale: timeSystem.getTimeScale(),
						elapsedTime: timeSystem.getTime(),
						isDebug: uiState.debug,
						windEnabled: uiState.windEnabled,
						windIntensity: uiState.windIntensity
					},
					vehicle: {
						name: uiState.selectedVehicleName,
						type: "balloon",
						mass: 1.2,
						buoyancy: 0.35,
						dragCoefficient: 0.05
					}
				};
			}

			return {
				position: balloon.position,
				velocity: balloon.velocity,
				altitude: balloon.position[1],
				forces: balloon.forces,
				atmospheric: balloon.atmosphericConditions,
				simulation: {
					isPaused: timeSystem.isPaused(),
					timeScale: timeSystem.getTimeScale(),
					elapsedTime: timeSystem.getTime(),
					isDebug: uiState.debug,
					windEnabled: uiState.windEnabled,
					windIntensity: uiState.windIntensity
				},
				vehicle: {
					name: balloon.properties.name,
					type: balloon.properties.type,
					mass: balloon.properties.mass,
					buoyancy: balloon.properties.buoyancy,
					dragCoefficient: balloon.properties.dragCoefficient
				}
			};
		},

		// Update physics - called from the main task loop
		update(delta) {
			console.log("Context update called, delta:", delta);

			if (!bridge) {
				console.log("No bridge available for physics update");
				return;
			}

			// Update time system first to get simulation delta
			const isPaused = timeSystem.isPaused();
			console.log("Simulation paused state:", isPaused);

			const simulationDelta = isPaused ? 0 : timeSystem.update();

			// Log if we're actually getting simulation time
			if (simulationDelta > 0) {
				console.log("Physics update with delta:", simulationDelta);
				bridge.update(simulationDelta);
			} else {
				console.log("No physics update, delta is 0");
			}

			// Update flight system with atmospheric data (even when paused for UI)
			flightSystem.update(
				simulationDelta,
				atmosphere,
				uiState.windEnabled,
				uiState.windIntensity
			);
		}
	};

	// For compatibility with current components - provide telemetry as a getter
	Object.defineProperty(context, 'telemetry', {
		get: function () {
			return this.getTelemetry();
		}
	});

	// Set context
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