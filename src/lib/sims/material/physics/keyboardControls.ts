// src/lib/sims/material/physics/keyboardControls.ts
import { BALLOON } from './data/constants';

/**
 * Sets up keyboard control handlers for the balloon
 * @param physics The physics context from createPhysicsContext()
 */
export function setupKeyboardControls(physics: any) {
	// Track which keys are currently pressed
	const keyState = {
		w: false,
		a: false,
		s: false,
		d: false,
		ArrowUp: false,
		ArrowDown: false,
		ArrowLeft: false,
		ArrowRight: false
	};

	// Handle key down events
	const handleKeyDown = (e: KeyboardEvent) => {
		const key = e.key;
		if (key in keyState) {
			keyState[key] = true;
			e.preventDefault(); // Prevent scrolling with arrow keys
		}
	};

	// Handle key up events
	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key in keyState) {
			keyState[key] = false;
		}
	};

	// Attach event listeners
	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);

	// Function to apply forces based on current key state
	const applyKeyboardControls = () => {
		if (!physics.rigidBody || physics.paused) return;

		// Get current control strength
		const strength = BALLOON.CONTROL_STRENGTH;

		// Apply forces based on WASD or arrow keys
		if (keyState.w || keyState.ArrowUp) physics.applyControlForce('forward', strength);
		if (keyState.s || keyState.ArrowDown) physics.applyControlForce('backward', strength);
		if (keyState.a || keyState.ArrowLeft) physics.applyControlForce('left', strength);
		if (keyState.d || keyState.ArrowRight) physics.applyControlForce('right', strength);
	};

	// Clean up function to remove event listeners
	const cleanup = () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);
	};

	return {
		applyKeyboardControls,
		cleanup
	};
}