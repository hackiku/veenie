// src/lib/stores/flightStore.ts

import { writable, derived } from 'svelte/store';

// Define interfaces for type safety
interface Position {
	x: number;
	y: number;
	z: number;
}

interface Controls {
	forward: boolean;
	backward: boolean;
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
	buoyancyUp: boolean;
	buoyancyDown: boolean;
	buoyancyForce: number;
}

interface FlightState {
	playing: boolean;
	position: Position;
	velocity: Position;
	altitude: number;
	temperature: number;
	pressure: number;
	controls: Controls;
	timestamp: number;
}

// Constants for Venus simulation
const VENUS_GRAVITY = -8.87; // m/s²
const CLOUD_ALTITUDE = 54; // km 

// Create the main flight store
function createFlightStore() {
	// Initial state
	const initialState: FlightState = {
		playing: false,
		position: { x: 0, y: CLOUD_ALTITUDE, z: 0 }, // Start at cloud altitude
		velocity: { x: 0, y: 0, z: 0 },
		temperature: 0,
		pressure: 0,
		altitude: CLOUD_ALTITUDE,
		controls: {
			forward: false,
			backward: false,
			left: false,
			right: false,
			up: false,
			down: false,
			buoyancyUp: false,
			buoyancyDown: false,
			buoyancyForce: 8.87 * 1.02 // Default to slightly positive buoyancy
		},
		timestamp: Date.now()
	};

	// Create the writable store
	const { subscribe, set, update } = writable(initialState);

	// Return the store with custom methods
	return {
		subscribe,

		// Constants
		VENUS_GRAVITY,
		CLOUD_ALTITUDE,

		// Toggle play/pause state
		togglePlay: () => update(state => {
			const newState = {
				...state,
				playing: !state.playing
			};

			console.log("Flight state:", newState.playing ? "Playing" : "Paused");

			return newState;
		}),

		// Update position and calculate derived atmospheric values
		updatePosition: (position: Position) => update(state => {
			const altitude = position.y;

			return {
				...state,
				position,
				altitude,
				temperature: getTemperatureAtAltitude(altitude),
				pressure: getPressureAtAltitude(altitude),
				timestamp: Date.now()
			};
		}),

		// Update velocity
		updateVelocity: (velocity: Position) => update(state => ({
			...state,
			velocity
		})),

		// Update controls
		updateControls: (controls: Controls) => update(state => ({
			...state,
			controls
		})),

		// Reset simulation to initial state
		reset: () => set({
			...initialState,
			temperature: getTemperatureAtAltitude(initialState.altitude),
			pressure: getPressureAtAltitude(initialState.altitude),
			timestamp: Date.now()
		})
	};
}

// Helper function to get temperature at altitude - simplified Venus model
function getTemperatureAtAltitude(altitude: number): number {
	// Handle edge cases
	if (altitude < 0) return 735; // Surface temperature (735K)
	if (altitude > 100) return 175; // Upper atmosphere (175K)

	// Simplified altitude bands
	if (altitude < 30) {
		// Surface to 30km: 735K to 511K
		return 735 - (altitude / 30) * (735 - 511);
	} else if (altitude < 60) {
		// 30km to 60km: 511K to 270K (habitable zone ~50km)
		return 511 - ((altitude - 30) / 30) * (511 - 270);
	} else {
		// 60km to 100km: 270K to 175K
		return 270 - ((altitude - 60) / 40) * (270 - 175);
	}
}

// Helper function to get pressure at altitude - simplified Venus model
function getPressureAtAltitude(altitude: number): number {
	if (altitude < 0) return 93; // Surface pressure (93 bar)
	if (altitude > 100) return 0.000001; // Upper atmosphere

	// Exponential decay - at 50km pressure is ~1 bar (Earth-like)
	return 93 * Math.exp(-0.086 * altitude);
}

// Venus atmosphere density decreases with altitude
export function getAtmosphereDensityFactor(altitude: number): number {
	// Simplified model:
	// - Below 40km: high density (more buoyant)
	// - 40km to 60km: linear transition zone (cloud layer)
	// - Above 60km: low density (less buoyant)

	if (altitude < 40) return 1.2;
	if (altitude > 60) return 0.8;

	// Linear interpolation in the transition zone
	return 1.2 - ((altitude - 40) / 20) * 0.4;
}

// Create and export the store
export const flightStore = createFlightStore();

// Derived stores for specific values
export const altitude = derived(flightStore, $store => $store.altitude);
export const temperature = derived(flightStore, $store => $store.temperature);
export const pressure = derived(flightStore, $store => $store.pressure);
export const playing = derived(flightStore, $store => $store.playing);
export const controls = derived(flightStore, $store => $store.controls);