// src/lib/sims/venus/stores/simulation.ts
import { writable, derived } from 'svelte/store';

// Define the types for clarity
type ScaleLevel = 'space' | 'planet' | 'atmosphere' | 'probe';

interface SimulationState {
	speed: number;
	paused: boolean;
	currentScale: ScaleLevel;
	showAtmosphere: boolean;
	showGrid: boolean;
	showCoordinates: boolean;
	time: Date;
	selectedAltitude: number;
}

// Create the main simulation store
const createSimulationStore = () => {
	// Initialize with default values
	const defaultState: SimulationState = {
		speed: 1,
		paused: false,
		currentScale: 'planet',
		showAtmosphere: true,
		showGrid: false,
		showCoordinates: false,
		time: new Date(),
		selectedAltitude: 50
	};

	const { subscribe, set, update } = writable<SimulationState>(defaultState);

	// Define store methods
	return {
		subscribe,

		setSpeed: (speed: number) => update(state => ({ ...state, speed })),

		togglePause: () => update(state => ({ ...state, paused: !state.paused })),

		setScale: (scale: ScaleLevel) => update(state => ({ ...state, currentScale: scale })),

		toggleAtmosphere: () => update(state => ({ ...state, showAtmosphere: !state.showAtmosphere })),

		toggleGrid: () => update(state => ({ ...state, showGrid: !state.showGrid })),

		toggleCoordinates: () => update(state => ({ ...state, showCoordinates: !state.showCoordinates })),

		setAltitude: (altitude: number) => update(state => ({ ...state, selectedAltitude: altitude })),

		advanceTime: (deltaSeconds: number) => update(state => {
			if (state.paused) return state;

			const newTime = new Date(state.time);
			newTime.setSeconds(newTime.getSeconds() + deltaSeconds * state.speed);

			return {
				...state,
				time: newTime
			};
		}),

		reset: () => set(defaultState)
	};
};

// Create and export the store
export const simulationStore = createSimulationStore();

// Derived stores
export const simulationTime = derived(
	simulationStore,
	$sim => $sim.time
);

export const currentScale = derived(
	simulationStore,
	$sim => $sim.currentScale
);