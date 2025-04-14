// src/lib/sims/material/physics/context.svelte.ts
import { getContext, setContext } from 'svelte';
import { GRAVITY, BALLOON, ALTITUDE } from './data/constants';
import { calculateBuoyancy, calculateTemperature, calculateDensity, calculateWindForce } from './forces';

// Define the context key - this is our unique identifier for this context
const PHYSICS_CONTEXT_KEY = 'material-physics';

// Define the type for our physics context
export type PhysicsContext = ReturnType<typeof createPhysicsContext>;

export function createPhysicsContext() {
	// Core state variables
	let debug = $state(false);
	let paused = $state(false);

	// Balloon position in 3D space [x, y, z]
	let bodyPosition = $state<[number, number, number]>([0, 10, 0]);

	// Physics properties
	let gravity = $state(GRAVITY.VENUS);
	let buoyancy = $state(BALLOON.BUOYANCY_FACTOR);
	let balloonVolume = $state(BALLOON.VOLUME);
	let balloonMass = $state(BALLOON.MASS);

	// Simulation time
	let time = $state(0);
	let timeStep = $state(1 / 60); // 60fps

	// Derived values
	const gravityVector = $derived<[number, number, number]>([0, -gravity, 0]);

	// Convert position height to altitude in km (assuming 1 unit = 1m)
	const altitude = $derived(ALTITUDE.MIN + (bodyPosition[1] / 1000));

	// Calculate atmospheric properties at current altitude
	const temperature = $derived(calculateTemperature(altitude));
	const density = $derived(calculateDensity(altitude));

	// Calculate realistic buoyancy force
	const buoyancyForce = $derived(calculateBuoyancy(altitude, balloonVolume, balloonMass));

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

	// Reset the simulation
	function resetSimulation() {
		bodyPosition = [0, 10, 0];
		time = 0;
	}

	// Apply physics forces to a rigid body
	function applyBuoyancyForce(rigidBody: any) {
		if (!rigidBody || paused) return;

		// Apply upward force based on buoyancy
		// For now, we'll use the simplified buoyancy factor
		// Later we can switch to the realistic buoyancy force
		rigidBody.applyImpulse(
			{ x: 0, y: buoyancy, z: 0 },
			true
		);

		// Apply wind force
		const windForce = calculateWindForce(altitude);
		rigidBody.applyImpulse(
			{ x: windForce[0] * 0.01, y: 0, z: 0 }, // Scale down for simulation stability
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
		time,
		timeStep,

		// Derived values
		gravityVector,
		altitude,
		temperature,
		density,
		buoyancyForce,

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
export function getPhysicsContext(): PhysicsContext {
	return getContext<PhysicsContext>(PHYSICS_CONTEXT_KEY);
}