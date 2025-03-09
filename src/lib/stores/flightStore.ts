// src/lib/stores/flightStore.ts

import { writable, derived } from 'svelte/store';
import { timeStore } from './timeStore';
import { venusData, getTemperatureAtAltitude, getPressureAtAltitude } from '$lib/sims/flight/physics/data';
import type { PhysicsState } from '$lib/sims/flight/physics/simplePhysics';

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
		position: { x: 0, y: venusData.altitude.cloudLayer, z: 0 }, // Start at cloud altitude
		velocity: { x: 0, y: 0, z: 0 },
		temperature: getTemperatureAtAltitude(venusData.altitude.cloudLayer),
		pressure: getPressureAtAltitude(venusData.altitude.cloudLayer),
		density: 1.0,
		altitude: venusData.altitude.cloudLayer,
		controls: {
			forward: false,
			backward: false,
			left: false,
			right: false,
			up: false,
			down: false,
			buoyancyUp: false,
			buoyancyDown: false,
			buoyancyForce: venusData.controls.defaultBuoyancy
		},
		timestamp: Date.now()
	};

	// Create the writable store
	const { subscribe, set, update } = writable(initialState);

	// Subscribe to timeStore to sync play state
	timeStore.subscribe(timeState => {
		update(state => ({
			...state,
			playing: timeState.playing
		}));
	});

	// Create the store object with additional properties
	const store = {
		subscribe,

		// Constants (available as properties)
		VENUS_GRAVITY: venusData.physics.gravity,
		CLOUD_ALTITUDE: venusData.altitude.cloudLayer,

		// Toggle play/pause state (syncs with timeStore)
		togglePlay: () => {
			timeStore.togglePlay();
			update(state => ({
				...state,
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

		// Update full physics state
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
			timeStore.reset();
			set({
				...initialState,
				timestamp: Date.now()
			});
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