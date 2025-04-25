// src/lib/sims/material/contexts/physicsContext.svelte.ts
import { getContext, setContext } from 'svelte';

const PHYSICS_CONTEXT_KEY = 'material-physics';

export function createPhysicsContext() {
	// Physics state
	let buoyancy = $state(0.309);
	let gravity = $state(8.87);
	let paused = $state(false);
	let bodyPosition = $state<[number, number, number]>([0, 8, 0]);
	let debug = $state(false);

	// Derived values - must be declared outside of the object literal
	let gravityVector = $derived<[number, number, number]>([0, -gravity, 0]);

	// RigidBody reference from Balloon component
	let rigidBody = $state(null);

	// Accumulated forces to apply on next update
	let pendingForces = $state<Array<{ x: number, y: number, z: number }>>([]);

	// Getters/Setters
	function setBuoyancy(value: number) {
		buoyancy = value;
	}

	function setGravity(value: number) {
		gravity = value;
	}

	function setPaused(value: boolean) {
		paused = value;
	}

	function setDebug(value: boolean) {
		debug = value;
	}

	function setRigidBody(body: any) {
		rigidBody = body;
	}

	// Force application
	function applyForce(force: { x: number, y: number, z: number }) {
		pendingForces.push(force);
	}

	// TODO: change to actual reset
	function resetSimulation() {
		if (rigidBody) {
			rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
			rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
			rigidBody.setTranslation({ x: 0, y: 10, z: 0 }, true);
		}
		bodyPosition = [0, 10, 0];
		pendingForces = [];
	}

	// Main update method
	function update(deltaTime: number) {
		if (!rigidBody || paused) return;

		// Apply natural buoyancy force
		rigidBody.applyImpulse({ x: 0, y: buoyancy, z: 0 }, true);

		// Apply all accumulated forces
		for (const force of pendingForces) {
			rigidBody.applyImpulse(force, true);
		}

		// Clear pending forces after applying them
		pendingForces = [];

		// Update position state from physics engine
		const position = rigidBody.translation();
		bodyPosition = [position.x, position.y, position.z];
	}

	// Create the context object
	const context = {
		// State
		buoyancy,
		gravity,
		paused,
		bodyPosition,
		debug,
		rigidBody,

		// Include the derived value as a normal property
		gravityVector,

		// Methods
		setBuoyancy,
		setGravity,
		setPaused,
		setDebug,
		setRigidBody,
		applyForce,
		resetSimulation,
		update
	};

	// Register the context
	setContext(PHYSICS_CONTEXT_KEY, context);

	return context;
}

export function getPhysicsContext() {
	return getContext(PHYSICS_CONTEXT_KEY);
}