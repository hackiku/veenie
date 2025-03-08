// src/lib/sims/venus/stores/simulationStore.ts
import { writable, derived, get } from 'svelte/store';

// Define the types for clarity
export type ScaleLevel = 'space' | 'planet' | 'atmosphere' | 'probe';

// Simple time state tracking
export interface TimeState {
	date: Date;
	simulationSpeed: number;
	paused: boolean;
}

// Scale configuration
export interface ScaleConfig {
	target: ScaleLevel;
	camera: {
		position: [number, number, number];
		fov: number;
		minDistance: number;
		maxDistance: number;
	};
}

// Complete simulation state
export interface SimulationState {
	time: TimeState;
	scale: ScaleConfig;
	showAtmosphere: boolean;
	showGrid: boolean;
	showCoordinates: boolean;
	selectedAltitude: number;
}

// Scale presets with camera settings
const SCALE_PRESETS: Record<ScaleLevel, ScaleConfig> = {
	space: {
		target: 'space',
		camera: {
			position: [0, 0, 100],
			fov: 30,
			minDistance: 20,
			maxDistance: 500
		}
	},
	planet: {
		target: 'planet',
		camera: {
			position: [0, 0, 20],
			fov: 45,
			minDistance: 7,
			maxDistance: 200
		}
	},
	atmosphere: {
		target: 'atmosphere',
		camera: {
			position: [0, 0, 10],
			fov: 60,
			minDistance: 5,
			maxDistance: 50
		}
	},
	probe: {
		target: 'probe',
		camera: {
			position: [0, 0, 2],
			fov: 70,
			minDistance: 1,
			maxDistance: 20
		}
	}
};

// Create the simulation store
const createSimulationStore = () => {
	// Initialize with default values
	const defaultState: SimulationState = {
		time: {
			date: new Date("2025-01-01"), // Start date
			simulationSpeed: 1,
			paused: false
		},
		scale: SCALE_PRESETS.planet,
		showAtmosphere: true,
		showGrid: false,
		showCoordinates: false,
		selectedAltitude: 50
	};

	const { subscribe, set, update } = writable<SimulationState>(defaultState);

	// Store with simplified methods
	return {
		subscribe,

		// Scale management
		setScale: (targetScale: ScaleLevel) => update(state => ({
			...state,
			scale: SCALE_PRESETS[targetScale]
		})),

		// Time management
		setSpeed: (simulationSpeed: number) => update(state => ({
			...state,
			time: {
				...state.time,
				simulationSpeed
			}
		})),

		togglePause: () => update(state => ({
			...state,
			time: {
				...state.time,
				paused: !state.time.paused
			}
		})),

		// Set a specific date
		setDate: (date: Date) => update(state => ({
			...state,
			time: {
				...state.time,
				date: new Date(date)
			}
		})),

		// UI toggles
		toggleAtmosphere: () => update(state => ({
			...state,
			showAtmosphere: !state.showAtmosphere
		})),

		toggleGrid: () => update(state => ({
			...state,
			showGrid: !state.showGrid
		})),

		toggleCoordinates: () => update(state => ({
			...state,
			showCoordinates: !state.showCoordinates
		})),

		setAltitude: (altitude: number) => update(state => ({
			...state,
			selectedAltitude: altitude
		})),

		// Advance simulation time based on real-time delta
		advanceTime: (deltaSeconds: number) => update(state => {
			if (state.time.paused) return state;

			// Convert speed from days/second to milliseconds
			const deltaMsec = deltaSeconds * state.time.simulationSpeed * 24 * 60 * 60 * 1000;
			const newDate = new Date(state.time.date.getTime() + deltaMsec);

			return {
				...state,
				time: {
					...state.time,
					date: newDate
				}
			};
		}),

		// Reset to defaults
		reset: () => set(defaultState)
	};
};

// Create and export the store
export const simulationStore = createSimulationStore();

// Derived stores for commonly used values
export const currentScale = derived(
	simulationStore,
	$sim => $sim.scale.target
);

export const simulationTime = derived(
	simulationStore,
	$sim => $sim.time.date
);

export const simulationSpeed = derived(
	simulationStore,
	$sim => $sim.time.simulationSpeed
);

export const cameraConfig = derived(
	simulationStore,
	$sim => $sim.scale.camera
);

// Venus physical constants
export const venusConstants = {
	radius: 6051.8, // km
	rotationPeriod: -243.025, // days (retrograde)
	axialTilt: 177.3, // degrees
	orbitalPeriod: 224.7, // Earth days
	semiMajorAxis: 108.2, // million km
	eccentricity: 0.0068,
	gravity: 8.87, // m/s²
	atmosphereHeight: 250, // km
};