// src/lib/stores/flightStore.ts

import { writable, derived } from 'svelte/store';
import { timeStore } from './timeStore';
import { venusData } from '$lib/data/flight/constants';
import { getTemperatureAtAltitude, getPressureAtAltitude } from '$lib/data/flight/atmosphereModel';

// Import PhysicsState type
interface PhysicsState {
	altitude: number;
	velocity: {
		x: number;
		y: number;
		z: number;
	};
	density: number;
}

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
	density: number;
	controls: Controls;
	timestamp: number;
}

// Create the main flight store
function createFlightStore() {
	// Initial state
	const initialState: FlightState = {
		playing: false,
		position: { x: 0, y: venusData.altitude.CLOUD_LAYER, z: 0 }, // Start at cloud altitude
		velocity: { x: 0, y: 0, z: 0 },
		temperature: getTemperatureAtAltitude(venusData.altitude.CLOUD_LAYER),
		pressure: getPressureAtAltitude(venusData.altitude.CLOUD_LAYER),
		density: 1.0,
		altitude: venusData.altitude.CLOUD_LAYER,
		controls: {
			forward: false,
			backward: false,
			left: false,
			right: false,
			up: false,
			down: false,
			buoyancyUp: false,
			buoyancyDown: false,
			buoyancyForce: venusData.controls.DEFAULT_BUOYANCY
		},
		timestamp: Date.now()
	};

	// Create the writable store
	const { subscribe, set, update } = writable(initialState);

	// Subscribe to timeStore to sync play state
	const unsubTimeStore = timeStore.subscribe(timeState => {
		update(state => ({
			...state,
			playing: timeState.playing
		}));
	});

	// Create the store object with additional properties
	const store = {
		subscribe,

		// Constants (available as properties)
		VENUS_GRAVITY: venusData.physics.GRAVITY,
		CLOUD_ALTITUDE: venusData.altitude.CLOUD_LAYER,

		// Toggle play/pause state (syncs with timeStore)
		togglePlay: () => {
			if (typeof timeStore.togglePlay === 'function') {
				timeStore.togglePlay();
			}

			update(state => ({
				...state,
				playing: !state.playing,
				timestamp: Date.now()
			}));
		},

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

		// Update physics state
		updatePhysicsState: (physicsState: PhysicsState) => update(state => {
			return {
				...state,
				altitude: physicsState.altitude,
				velocity: physicsState.velocity,
				density: physicsState.density,
				temperature: getTemperatureAtAltitude(physicsState.altitude),
				pressure: getPressureAtAltitude(physicsState.altitude),
				timestamp: Date.now()
			};
		}),

		// Update controls
		updateControls: (controls: Controls) => update(state => ({
			...state,
			controls
		})),

		// Reset simulation to initial state
		reset: () => {
			try {
				if (typeof timeStore.reset === 'function') {
					timeStore.reset();
				}
			} catch (e) {
				console.warn("Could not reset timeStore:", e);
			}

			set({
				...initialState,
				timestamp: Date.now()
			});
		},

		// Cleanup when component is destroyed
		cleanup: () => {
			if (unsubTimeStore) {
				unsubTimeStore();
			}
		}
	};

	return store;
}

// Create and export the store
export const flightStore = createFlightStore();

// Derived stores for specific values
export const altitude = derived(flightStore, $store => $store.altitude);
export const temperature = derived(flightStore, $store => $store.temperature);
export const pressure = derived(flightStore, $store => $store.pressure);
export const playing = derived(flightStore, $store => $store.playing);
export const controls = derived(flightStore, $store => $store.controls);
export const position = derived(flightStore, $store => $store.position);
export const velocity = derived(flightStore, $store => $store.velocity);