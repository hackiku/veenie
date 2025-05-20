// src/lib/sims/balloon/context/keyboard.svelte.ts
import { setContext, getContext } from 'svelte';

// Context key
const KEYBOARD_CONTEXT_KEY = 'keyboard-context';

/**
 * Create the keyboard context with runes state
 */
export function createKeyboardContext() {
	// Active keys state
	const activeKeys = $state({});

	// Key press durations
	const pressDurations = $state({});

	// Last update time
	let lastUpdateTime = $state(Date.now());

	// Handle key down events
	function handleKeyDown(event) {
		const key = event.key.toLowerCase();
		activeKeys[key] = true;

		// Initialize press duration if not set
		if (!pressDurations[key]) {
			pressDurations[key] = 0;
		}
	}

	// Handle key up events
	function handleKeyUp(event) {
		const key = event.key.toLowerCase();
		activeKeys[key] = false;
		pressDurations[key] = 0;
	}

	// Set up keyboard listeners
	function setupKeyboardListeners() {
		if (typeof window === 'undefined') return () => { };

		// Add event listeners
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		// Return cleanup function
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}

	// Update key press durations
	function updateKeyPressDurations() {
		const now = Date.now();
		const delta = (now - lastUpdateTime) / 1000; // Convert to seconds
		lastUpdateTime = now;

		// Update durations for active keys
		for (const key in activeKeys) {
			if (activeKeys[key]) {
				pressDurations[key] = (pressDurations[key] || 0) + delta;
			}
		}
	}

	// Check if a key is active
	function isKeyActive(key) {
		return !!activeKeys[key];
	}

	// Get the duration of a key press
	function getKeyPressTime(key) {
		return pressDurations[key] || 0;
	}

	// Reset all inputs
	function resetInputs() {
		for (const key in activeKeys) {
			activeKeys[key] = false;
			pressDurations[key] = 0;
		}
	}

	// Create the context object
	const context = {
		// State
		get activeKeys() { return activeKeys; },
		get pressDurations() { return pressDurations; },

		// Methods
		setupKeyboardListeners,
		updateKeyPressDurations,
		isKeyActive,
		getKeyPressTime,
		resetInputs
	};

	// Set the context
	setContext(KEYBOARD_CONTEXT_KEY, context);

	return context;
}

/**
 * Get the keyboard context
 */
export function getKeyboardContext() {
	const context = getContext(KEYBOARD_CONTEXT_KEY);
	if (!context) {
		console.warn('No keyboard context found. Did you forget to create it in a parent component?');
		return null;
	}
	return context;
}