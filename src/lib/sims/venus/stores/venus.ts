// stores/venus.ts
import { writable, derived } from 'svelte/store';
import { db } from '$lib/server/db';
import { simSessions, probeTelemetry } from '$lib/server/db/schema';

// Global simulation state
export const simulationState = writable({
	speed: 1,
	paused: false,
	showAtmosphere: true,
	selectedAltitude: 50
});

// Create a store that syncs with DB when needed
export const probeData = writable({
	position: { alt: 70, lat: 0, lon: 0 },
	velocity: { x: 0, y: 0, z: 0 },
	telemetry: { temp: null, pressure: null }
});

// Function to save current state to DB
export async function saveSession(userId) {
	let sessionId;
	// Create session record
	// Use the database client
	// ...

	return sessionId;
}