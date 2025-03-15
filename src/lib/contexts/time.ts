// src/lib/contexts/time.ts
// import { state, effect } from 'svelte';
import { getContext, setContext } from 'svelte';

setContext('key', value);

let userKey = Symbol('user');

interface User {
	user: string;
}

export function setUserContext(user: User) {
	setContext(userKey, user);
}

export function getUserContext(): User {
	return getContext(userKey) as User;
}

// let _context;

export function createTimeContext() {
	if (_context) return _context;

	// Core state
	const playing = $state(false);
	const timeScale = $state(1.0);
	const elapsedTime = $state(0);
	const startTime = $state(Date.now());
	const deltaTime = $state(0);

	// Animation frame handling
	let frameId = null;

	// Animation tick function
	function tick() {
		if (playing.value) {
			const now = Date.now();
			const realTimeDelta = (now - lastTimestamp) / 1000;
			deltaTime.value = realTimeDelta * timeScale.value;
			elapsedTime.value += deltaTime.value;
			lastTimestamp = now;
		}

		frameId = requestAnimationFrame(tick);
	}

	// Start animation loop
	let lastTimestamp = Date.now();
	frameId = requestAnimationFrame(tick);

	// Action functions
	function togglePlay() {
		playing.value = !playing.value;
		lastTimestamp = Date.now(); // Reset to avoid jumps
	}

	function setTimeScale(scale) {
		timeScale.value = scale;
	}

	function reset() {
		elapsedTime.value = 0;
		playing.value = false;
		lastTimestamp = Date.now();
	}

	// Cleanup function
	function cleanup() {
		if (frameId) {
			cancelAnimationFrame(frameId);
			frameId = null;
		}
	}

	_context = {
		playing,
		timeScale,
		elapsedTime,
		deltaTime,
		togglePlay,
		setTimeScale,
		reset,
		cleanup
	};

	return _context;
}