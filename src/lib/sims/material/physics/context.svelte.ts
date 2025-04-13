// src/lib/sims/material/physics/context.svelte.ts
import { getContext, setContext } from 'svelte';

// Define types for our physics state
export type PhysicsState = {
	debug: boolean;
	buoyancy: number;
	gravity: number;
	paused: boolean;
	bodyPosition: [number, number, number];
};

// Define the return type of our context function
export type PhysicsContext = ReturnType<typeof createPhysicsContext>;

// Context key
const PHYSICS_CONTEXT_KEY = 'material-physics';

export function createPhysicsContext(initialState?: Partial<PhysicsState>) {
	// Core state using runes
	let debug = $state(initialState?.debug ?? false);
	let buoyancy = $state(initialState?.buoyancy ?? 0.1);
	let gravity = $state(initialState?.gravity ?? 8.87); // Venus gravity
	let paused = $state(initialState?.paused ?? false);
	let bodyPosition = $state<[number, number, number]>(
		initialState?.bodyPosition ?? [0, 10, 0]
	);

	// Derived values
	const gravityVector = $derived<[number, number, number]>([0, -gravity, 0]);

	// Methods for updating state
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

	function resetSimulation() {
		bodyPosition = [0, 10, 0];
		// Other reset logic...
	}

	// Physics methods
	function applyBuoyancyForce(rigidBody: any) {
		if (!rigidBody || paused) return;

		// Apply upward force based on buoyancy
		rigidBody.applyImpulse(
			{ x: 0, y: buoyancy, z: 0 },
			true
		);

		// Update position state from physics engine
		const position = rigidBody.translation();
		bodyPosition = [position.x, position.y, position.z];
	}

	// Create the context object
	const context = {
		// State
		debug,
		buoyancy,
		gravity,
		paused,
		bodyPosition,
		gravityVector,

		// State setters
		setDebug,
		setBuoyancy,
		setGravity,
		setPaused,
		setBodyPosition,

		// Physics methods
		applyBuoyancyForce,
		resetSimulation
	};

	// Set the context so child components can access it
	setContext(PHYSICS_CONTEXT_KEY, context);

	return context;
}

// Helper to get the physics context in any component
export function getPhysicsContext() {
	return getContext<PhysicsContext>(PHYSICS_CONTEXT_KEY);
}