// lib/core/physics.svelte.ts
import * as timeModule from './time.svelte.ts';
import { getAtmosphericProperties } from '../data/atmosphere/index.ts';

// Physics state using runes
export let physicsState = $state({
	bodies: {},            // Map of all rigid bodies
	forces: {},            // Current forces on each body
	fixedTimeStep: 1 / 60,   // Physics time step in seconds
	accumulator: 0,        // Time accumulator for fixed step
	lastUpdateTime: 0      // Last update time
});

// Initialize physics system
export function initPhysics() {
	physicsState.lastUpdateTime = timeModule.getSeconds();
	physicsState.accumulator = 0;
}

// Register a rigid body with the physics system
export function registerBody(id, rigidBody, properties) {
	physicsState.bodies[id] = {
		ref: rigidBody,
		properties,
		forces: {}
	};
}

// Apply atmospheric forces to a body
export function applyAtmosphericForces(id, altitude) {
	const body = physicsState.bodies[id];
	if (!body || !body.ref) return;

	// Get atmospheric properties at current altitude
	const { density, pressure, temperature } = getAtmosphericProperties(altitude);

	// Calculate and store forces
	body.forces.buoyancy = calculateBuoyancy(body.properties, density);
	body.forces.drag = calculateDrag(body.ref, density);
	body.forces.wind = calculateWind(altitude);

	// Apply all forces
	for (const [name, force] of Object.entries(body.forces)) {
		body.ref.applyImpulse(force, true);
	}
}

// Update physics with fixed timestep
export function updatePhysics() {
	if (timeModule.time.paused) return;

	const currentTime = timeModule.getSeconds();
	const frameTime = currentTime - physicsState.lastUpdateTime;
	physicsState.lastUpdateTime = currentTime;

	// Fixed timestep accumulator
	physicsState.accumulator += frameTime;

	// Run physics at fixed intervals
	while (physicsState.accumulator >= physicsState.fixedTimeStep) {
		// Update each body
		for (const [id, body] of Object.entries(physicsState.bodies)) {
			if (body.properties.altitude !== undefined) {
				applyAtmosphericForces(id, body.properties.altitude);
			}
		}

		physicsState.accumulator -= physicsState.fixedTimeStep;
	}
}

// Physics calculations
function calculateBuoyancy(properties, density) {
	const volume = properties.volume || 1;
	const buoyantForce = density * volume * Math.abs(9.81);
	return { x: 0, y: buoyantForce, z: 0 };
}

function calculateDrag(rigidBody, density) {
	// Implementation of drag force calculation
	// ...
}

function calculateWind(altitude) {
	// Implementation of wind force calculation
	// ...
}