// lib/core/time.svelte.ts
// Centralized time management that can be imported anywhere

// Main time state
let time = $state({
	current: 0,         // Current simulation time in seconds
	elapsedTime: 0,     // Total elapsed time in seconds
	deltaTime: 1 / 60,    // Physics time step in seconds
	speed: 1,           // Simulation speed multiplier
	paused: true,       // Is simulation paused?
	startDate: new Date('2025-01-01T00:00:00Z'), // Reference start date
	lastRealTime: 0     // Last real-world time for calculating frame time
});

// Derived time representations
let milliseconds = $derived(Math.floor(time.current * 1000));
let seconds = $derived(time.current);
let minutes = $derived(time.current / 60);
let hours = $derived(time.current / 3600);
let days = $derived(time.current / 86400);

// Current date and time
let currentDate = $derived(new Date(time.startDate.getTime() + time.current * 1000));

// Format functions for display
function formatTime(format: 'ms' | 's' | 'min' | 'h' | 'd' | 'date' | 'datetime'): string {
	switch (format) {
		case 'ms': return `${milliseconds}`;
		case 's': return `${seconds.toFixed(1)}s`;
		case 'min': return `${minutes.toFixed(2)}m`;
		case 'h': return `${hours.toFixed(2)}h`;
		case 'd': return `${days.toFixed(2)}d`;
		case 'date': return currentDate.toLocaleDateString();
		case 'datetime': return currentDate.toLocaleString();
		default: return `${seconds.toFixed(1)}s`;
	}
}

// Time control functions
function pause() {
	time.paused = true;
}

function start() {
	time.paused = false;
	time.lastRealTime = performance.now() / 1000;
}

function reset() {
	pause();
	time.current = 0;
	time.elapsedTime = 0;
}

function setSpeed(newSpeed: number) {
	time.speed = newSpeed;
}

function setTimeStep(step: number) {
	time.deltaTime = step;
}

// Time advancement function (called by simulation loop)
function advance(realTimeDelta: number) {
	if (time.paused) return false;

	const scaledDelta = realTimeDelta * time.speed;
	time.current += scaledDelta;
	time.elapsedTime += scaledDelta;

	return true;
}

export {
	time,
	milliseconds,
	seconds,
	minutes,
	hours,
	days,
	currentDate,
	formatTime,
	pause,
	start,
	reset,
	setSpeed,
	setTimeStep,
	advance
};