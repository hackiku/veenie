// src/lib/sims/material/contexts/rapierContext.svelte.ts
import { getContext, setContext } from 'svelte';

const RAPIER_CONTEXT_KEY = 'material-rapier';

export function createRapierContext() {
	let rigidBody = $state(null);

	function syncFromPhysics(physics) {
		if (!rigidBody) return;

		// Get position and velocity from physics model
		const pos = physics.getPosition();
		const vel = physics.getVelocity();

		// Update Rapier rigid body
		rigidBody.setTranslation({ x: pos[0], y: pos[1], z: pos[2] }, true);
		rigidBody.setLinvel({ x: vel[0], y: vel[1], z: vel[2] }, true);
	}

	function applyForce(force) {
		if (!rigidBody) return;

		// Apply force to Rapier rigid body
		rigidBody.applyImpulse(force, true);
	}

	function reset() {
		if (rigidBody) {
			// Reset Rapier rigid body to initial position
			rigidBody.setTranslation({ x: 0, y: 51000, z: 0 }, true);
			rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
			rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
		}
	}

	// Create the context object
	const context = {
		setRigidBody: (body) => { rigidBody = body; },
		getRigidBody: () => rigidBody,
		syncFromPhysics,
		applyForce,
		reset
	};

	// Register the context
	setContext(RAPIER_CONTEXT_KEY, context);

	return context;
}

export function getRapierContext() {
	return getContext(RAPIER_CONTEXT_KEY);
}