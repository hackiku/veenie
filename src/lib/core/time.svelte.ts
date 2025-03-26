// src/lib/core/time.svelte.ts
// Centralized time management using Svelte runes

import { browser } from '$app/environment';

// Main time state
let time = $state({
	current: 0,         // Current simulation time in seconds
	elapsedTime: 0,     // Total elapsed time in seconds
	deltaTime: 1 / 60,  // Physics time step in seconds
	speed: 1,           // Simulation speed multiplier
	paused: true,       // Is simulation paused?
	startDate: new Date('2025-01-01T00:00:00Z'), // Reference start date
	lastRealTime: 0     // Last real-world time for calculating frame time
});

// Initialize lastRealTime in browser environment
if (browser) {
	time.lastRealTime = performance.now() / 1000;
}

// Instead of exporting derived state, create getter functions
function getMilliseconds() {
	return Math.floor(time.current * 1000);
}

function getSeconds() {
	return time.current;
}

function getMinutes() {
	return time.current / 60;
}

function getHours() {
	return time.current / 3600;
}

function getDays() {
	return time.current / 86400;
}

function getCurrentDate() {
	return new Date(time.startDate.getTime() + time.current * 1000);
}

// Format time for display
function formatTime(format: 'ms' | 's' | 'min' | 'h' | 'd' | 'date' | 'datetime' = 's'): string {
	switch (format) {
		case 'ms': return `${getMilliseconds()}`;
		case 's': return `${getSeconds().toFixed(1)}s`;
		case 'min': return `${getMinutes().toFixed(2)}m`;
		case 'h': return `${getHours().toFixed(2)}h`;
		case 'd': return `${getDays().toFixed(2)}d`;
		case 'date': return getCurrentDate().toLocaleDateString();
		case 'datetime': return getCurrentDate().toLocaleString();
		default: return `${getSeconds().toFixed(1)}s`;
	}
}

// Format time into HH:MM:SS
function formatClock(): string {
	const totalSeconds = Math.floor(time.current);
	const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
	const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
	const secs = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
	return `${hours}:${minutes}:${secs}`;
}

// Time control functions
function pause() {
	time.paused = true;
}

function start() {
	time.paused = false;
	if (browser) {
		time.lastRealTime = performance.now() / 1000;
	}
}

function togglePlay() {
	if (time.paused) {
		start();
	} else {
		pause();
	}
}

function reset() {
	pause();
	time.current = 0;
	time.elapsedTime = 0;
}

function setSpeed(newSpeed: number) {
	time.speed = Math.max(0.1, Math.min(10, newSpeed));
}

function setTimeStep(step: number) {
	time.deltaTime = step;
}

// Time advancement function (called by animation loop)
function tick() {
	if (time.paused || !browser) return false;

	const now = performance.now() / 1000;
	const realTimeDelta = now - time.lastRealTime;
	time.lastRealTime = now;

	// Skip extremely large time deltas (e.g., when tab was inactive)
	if (realTimeDelta > 1) {
		return false;
	}

	const scaledDelta = realTimeDelta * time.speed;
	time.current += scaledDelta;
	time.elapsedTime += scaledDelta;
	time.deltaTime = realTimeDelta;

	return true;
}

// Start animation loop
let frameId: number | null = null;

function startLoop() {
	if (!browser || frameId) return;

	function loop() {
		tick();
		frameId = requestAnimationFrame(loop);
	}

	frameId = requestAnimationFrame(loop);
}

function stopLoop() {
	if (!browser) return;

	if (frameId) {
		cancelAnimationFrame(frameId);
		frameId = null;
	}
}

// Clean up on component unmount
function cleanup() {
	stopLoop();
}

// Auto-start the loop only in browser environment
if (browser) {
	startLoop();
}

// Export the main state and functions, not derived values
export {
	time,
	getMilliseconds,
	getSeconds,
	getMinutes,
	getHours,
	getDays,
	getCurrentDate,
	formatTime,
	formatClock,
	pause,
	start,
	togglePlay,
	reset,
	setSpeed,
	setTimeStep,
	tick,
	startLoop,
	stopLoop,
	cleanup
};