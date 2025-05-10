// src/lib/sims/material/contexts/flightContext.svelte.ts
import { getContext, setContext } from 'svelte';
import { getPhysicsContext } from './physicsContext.svelte';

// Unique key for the flight context
const FLIGHT_CONTEXT_KEY = 'material-flight';

// Control keys mapping
const CONTROL_KEYS = {
	FORWARD: 'w',
	BACKWARD: 's',
	LEFT: 'a',
	RIGHT: 'd',
	UP: ' ', // spacebar
	DOWN: 'Shift'
};

export function createFlightContext() {
	// Get physics context to interact with
	const physics = getPhysicsContext();

	// Track which keys are currently pressed
	let keyStates = $state({
		[CONTROL_KEYS.FORWARD]: false,
		[CONTROL_KEYS.BACKWARD]: false,
		[CONTROL_KEYS.LEFT]: false,
		[CONTROL_KEYS.RIGHT]: false,
		[CONTROL_KEYS.UP]: false,
		[CONTROL_KEYS.DOWN]: false
	});

	// Control strength
	let thrustStrength = $state(0.05);
	let verticalThrustStrength = $state(0.1);

	// Setup keyboard listeners (must be called explicitly)
	function setupKeyboardListeners() {
		if (typeof window === 'undefined') return;

		// Handle key down events
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key.toLowerCase();

			// Check for each control key
			if (key === CONTROL_KEYS.FORWARD) keyStates[CONTROL_KEYS.FORWARD] = true;
			else if (key === CONTROL_KEYS.BACKWARD) keyStates[CONTROL_KEYS.BACKWARD] = true;
			else if (key === CONTROL_KEYS.LEFT) keyStates[CONTROL_KEYS.LEFT] = true;
			else if (key === CONTROL_KEYS.RIGHT) keyStates[CONTROL_KEYS.RIGHT] = true;
			else if (key === CONTROL_KEYS.UP) keyStates[CONTROL_KEYS.UP] = true;
			else if (key.toLowerCase() === CONTROL_KEYS.DOWN.toLowerCase()) keyStates[CONTROL_KEYS.DOWN] = true;

			// Prevent default for control keys
			if (Object.values(CONTROL_KEYS).includes(key)) {
				e.preventDefault();
			}
		};

		// Handle key up events
		const handleKeyUp = (e: KeyboardEvent) => {
			const key = e.key.toLowerCase();

			// Check for each control key
			if (key === CONTROL_KEYS.FORWARD) keyStates[CONTROL_KEYS.FORWARD] = false;
			else if (key === CONTROL_KEYS.BACKWARD) keyStates[CONTROL_KEYS.BACKWARD] = false;
			else if (key === CONTROL_KEYS.LEFT) keyStates[CONTROL_KEYS.LEFT] = false;
			else if (key === CONTROL_KEYS.RIGHT) keyStates[CONTROL_KEYS.RIGHT] = false;
			else if (key === CONTROL_KEYS.UP) keyStates[CONTROL_KEYS.UP] = false;
			else if (key.toLowerCase() === CONTROL_KEYS.DOWN.toLowerCase()) keyStates[CONTROL_KEYS.DOWN] = false;
		};

		// Attach listeners
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		// Return cleanup function
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}

	// Apply control forces based on current key states
	function applyControlForces() {
		if (!physics.rigidBody || physics.paused) return;

		// Calculate horizontal direction vector
		const moveX = (keyStates[CONTROL_KEYS.RIGHT] ? 1 : 0) - (keyStates[CONTROL_KEYS.LEFT] ? 1 : 0);
		const moveZ = (keyStates[CONTROL_KEYS.BACKWARD] ? 1 : 0) - (keyStates[CONTROL_KEYS.FORWARD] ? 1 : 0);

		// Calculate vertical thrust
		const verticalThrust =
			(keyStates[CONTROL_KEYS.UP] ? verticalThrustStrength : 0) -
			(keyStates[CONTROL_KEYS.DOWN] ? verticalThrustStrength : 0);

		// Apply forces if any direction is active
		if (moveX !== 0 || moveZ !== 0 || verticalThrust !== 0) {
			const force = {
				x: moveX * thrustStrength,
				y: verticalThrust,
				z: moveZ * thrustStrength
			};

			physics.rigidBody.applyImpulse(force, true);
		}
	}

	// Set thrust strength
	function setThrustStrength(value: number) {
		thrustStrength = value;
	}

	// Set vertical thrust strength
	function setVerticalThrustStrength(value: number) {
		verticalThrustStrength = value;
	}

	// Create the context object
	const context = {
		// State
		keyStates,
		thrustStrength,
		verticalThrustStrength,
		CONTROL_KEYS,

		// Methods
		setupKeyboardListeners,
		applyControlForces,
		setThrustStrength,
		setVerticalThrustStrength
	};

	// Register the context
	setContext(FLIGHT_CONTEXT_KEY, context);

	return context;
}

// Helper to access flight context
export function getFlightContext() {
	return getContext(FLIGHT_CONTEXT_KEY);
}