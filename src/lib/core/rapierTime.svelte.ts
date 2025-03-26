// In a new file: lib/core/rapierTime.svelte.ts
// A minimal time manager that leverages Rapier's physics step

// Central time state using runes
export let timeState = $state({
	elapsed: 0,        // Total elapsed simulation time
	paused: true,      // Is simulation paused?
	timeScale: 1,      // How fast time flows (1 = real-time)
	lastDelta: 0,      // Last delta time from physics step
	frameCount: 0      // Number of frames processed
});

// Advance time based on Rapier's physics step
export function advance(delta) {
	if (timeState.paused) return false;

	// Scale delta by timeScale
	const scaledDelta = delta * timeState.timeScale;

	// Update elapsed time
	timeState.elapsed += scaledDelta;
	timeState.lastDelta = scaledDelta;
	timeState.frameCount++;

	return true; // Indicates time was advanced
}

// Simple control functions
export function pause() {
	timeState.paused = true;
}

export function start() {
	timeState.paused = false;
}

export function togglePlay() {
	timeState.paused = !timeState.paused;
}

export function reset() {
	timeState.elapsed = 0;
	timeState.frameCount = 0;
	timeState.paused = true;
}

// Helper to format time as m:ss
export function formatTime(seconds = timeState.elapsed) {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, '0')}`;
}