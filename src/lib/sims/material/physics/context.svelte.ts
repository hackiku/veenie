// src/lib/sims/material/physics/context.svelte.ts
import { getContext, setContext } from 'svelte';

// Our unique identifier for the context
const PHYSICS_CONTEXT_KEY = 'material-physics';

export function createPhysicsContext() {
	// Core state variables from MaterialSim
	let debug = $state(false);
	let buoyancy = $state(0.309);
	let gravity = $state(8.87);
	let paused = $state(false);
	let bodyPosition = $state<[number, number, number]>([0, 8, 0]);

	// Derived values
	const gravityVector = $derived<[number, number, number]>([0, -gravity, 0]);

	// RigidBody reference from Balloon component
	let rigidBody = $state(null);

	// Basic methods
	function setDebug(value: boolean) {
		debug = value;
	}

	function setBuoyancy(value: number) {
		buoyancy = value;
	}

	function setGravity(value: number) {
		gravity = value;
	}

	function setPaused(value: boolean) {
		paused = value;
	}

	function setBodyPosition(position: [number, number, number]) {
		bodyPosition = position;
	}

	function setRigidBody(body: any) {
		rigidBody = body;
	}

	// Simple reset function
	function resetSimulation() {
		bodyPosition = [0, 10, 0];
	}

	// Simple physics calculation (currently in Balloon.svelte)
	function applyBuoyancyForce() {
		if (!rigidBody || paused) return;

		// Simple upward force (buoyancy)
		rigidBody.applyImpulse(
			{ x: 0, y: buoyancy, z: 0 },
			true
		);

		// Update position state from physics engine
		const position = rigidBody.translation();
		bodyPosition = [position.x, position.y, position.z];
	}

	// Create the context object with all our state and methods
	const context = {
		// State
		debug,
		buoyancy,
		gravity,
		paused,
		bodyPosition,
		rigidBody,
		gravityVector,

		// Setters
		setDebug,
		setBuoyancy,
		setGravity,
		setPaused,
		setBodyPosition,
		setRigidBody,

		// Methods
		resetSimulation,
		applyBuoyancyForce
	};

	// Register the context so components can access it
	setContext(PHYSICS_CONTEXT_KEY, context);

	return context;
}

// Helper function for components to access the context
export function getPhysicsContext() {
	return getContext(PHYSICS_CONTEXT_KEY);
}