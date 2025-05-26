// src/lib/sims/venus/context/time.svelte.ts

import { setContext, getContext } from 'svelte';

// Context key
const VENUS_TIME_CONTEXT_KEY = Symbol('venus-time');

/**
 * Venus Time State - Simplified for performance
 */
export interface VenusTimeState {
	// Core time tracking
	realTime: number;           // Real elapsed seconds since start
	simulationTime: number;     // Simulation time in seconds
	currentDate: Date;          // Current simulation date

	// Control state
	isPlaying: boolean;         // Is time running
	timeScale: number;          // Time multiplier (1 = real time, 2 = 2x speed, -1 = reverse)

	// Venus-specific
	venusDay: number;           // Current Venus day (0-243)
	venusRotation: number;      // Planet rotation degrees (0-360)

	// Enhanced state
	timeDirection: 'forward' | 'reverse'; // Direction of time flow
	timeScaleAbs: number;       // Absolute value of time scale
}

export interface VenusTimeConfig {
	startDate?: Date;
	initialTimeScale?: number;
	enableKeyboard?: boolean;   // Auto-handle space key
}

/**
 * Time unit constants (seconds per unit) - Simplified
 */
export const TIME_UNITS = {
	HOUR: 3600,
	DAY: 86400,
	WEEK: 604800,
	MONTH: 2592000, // 30 days
} as const;

/**
 * Create Venus Time Context - Simplified
 */
export function createVenusTime(config: VenusTimeConfig = {}) {
	// Initialize state with runes
	const state = $state<VenusTimeState>({
		realTime: 0,
		simulationTime: 0,
		currentDate: config.startDate || new Date(),
		isPlaying: false,  // Start paused for dev work
		timeScale: config.initialTimeScale || 1,
		venusDay: 0,
		venusRotation: 0,
		timeDirection: 'forward',
		timeScaleAbs: Math.abs(config.initialTimeScale || 1)
	});

	// Internal tracking
	let lastUpdateTime = performance.now() / 1000;
	let animationFrameId: number | null = null;

	/**
	 * Update derived state when timeScale changes
	 */
	function updateDerivedState() {
		state.timeDirection = state.timeScale >= 0 ? 'forward' : 'reverse';
		state.timeScaleAbs = Math.abs(state.timeScale);
	}

	/**
	 * Update time state - optimized for larger time scales
	 */
	function update() {
		if (!state.isPlaying) return;

		const now = performance.now() / 1000;
		const realDelta = now - lastUpdateTime;
		lastUpdateTime = now;

		// Skip very small deltas for performance
		if (realDelta < 0.001) return;

		// Update real time
		state.realTime += realDelta;

		// Update simulation time with scaling
		const simDelta = realDelta * state.timeScale;
		state.simulationTime += simDelta;

		// Update current date
		state.currentDate = new Date(state.currentDate.getTime() + (simDelta * 1000));

		// Venus rotation (optimized for larger time scales)
		const venusRotationRate = -360 / (243 * 24 * 3600); // degrees per second, retrograde
		state.venusRotation += venusRotationRate * simDelta;

		// Keep rotation in 0-360 range
		state.venusRotation = ((state.venusRotation % 360) + 360) % 360;

		// Update Venus day count
		state.venusDay = Math.floor(Math.abs(state.simulationTime) / (243 * 24 * 3600));

		// Continue animation loop
		if (state.isPlaying) {
			animationFrameId = requestAnimationFrame(update);
		}
	}

	/**
	 * Start time
	 */
	function play() {
		if (state.isPlaying) return;

		state.isPlaying = true;
		lastUpdateTime = performance.now() / 1000;
		animationFrameId = requestAnimationFrame(update);
	}

	/**
	 * Stop time
	 */
	function pause() {
		state.isPlaying = false;
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}

	/**
	 * Toggle play/pause
	 */
	function toggle() {
		if (state.isPlaying) {
			pause();
		} else {
			play();
		}
	}

	/**
	 * Set time scale (1 = normal, 2 = 2x speed, -1 = reverse)
	 */
	function setTimeScale(scale: number) {
		state.timeScale = scale;
		updateDerivedState();
	}

	/**
	 * Set time scale using units (e.g., 1 day per second)
	 */
	function setTimeUnit(unit: number, reverse: boolean = false) {
		const scale = reverse ? -unit : unit;
		setTimeScale(scale);
	}

	/**
	 * Quick unit setters - simplified
	 */
	function setHoursPerSecond(multiplier: number = 1, reverse: boolean = false) {
		setTimeUnit(TIME_UNITS.HOUR * multiplier, reverse);
	}

	function setDaysPerSecond(multiplier: number = 1, reverse: boolean = false) {
		setTimeUnit(TIME_UNITS.DAY * multiplier, reverse);
	}

	function setWeeksPerSecond(multiplier: number = 1, reverse: boolean = false) {
		setTimeUnit(TIME_UNITS.WEEK * multiplier, reverse);
	}

	function setMonthsPerSecond(multiplier: number = 1, reverse: boolean = false) {
		setTimeUnit(TIME_UNITS.MONTH * multiplier, reverse);
	}

	/**
	 * Reverse current time direction
	 */
	function reverseTime() {
		setTimeScale(-state.timeScale);
	}

	/**
	 * Jump to specific date
	 */
	function setDate(date: Date) {
		state.currentDate = new Date(date);
	}

	/**
	 * Jump time by a specific amount
	 */
	function jumpTime(seconds: number) {
		state.simulationTime += seconds;
		state.currentDate = new Date(state.currentDate.getTime() + (seconds * 1000));

		// Recalculate Venus rotation and day
		const venusRotationRate = -360 / (243 * 24 * 3600);
		state.venusRotation += venusRotationRate * seconds;
		state.venusRotation = ((state.venusRotation % 360) + 360) % 360;
		state.venusDay = Math.floor(Math.abs(state.simulationTime) / (243 * 24 * 3600));
	}

	/**
	 * Reset to initial state
	 */
	function reset() {
		pause();
		state.realTime = 0;
		state.simulationTime = 0;
		state.currentDate = config.startDate || new Date();
		state.venusDay = 0;
		state.venusRotation = 0;
		state.timeScale = config.initialTimeScale || 1;
		updateDerivedState();
	}

	/**
	 * Get formatted time string
	 */
	function getTimeString(): string {
		const totalSeconds = Math.floor(Math.abs(state.simulationTime));
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	/**
	 * Get formatted date string
	 */
	function getDateString(): string {
		return state.currentDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	/**
	 * Get human-readable time scale description
	 */
	function getTimeScaleDescription(): string {
		const abs = state.timeScaleAbs;
		const dir = state.timeDirection;

		if (abs === 1) return dir === 'forward' ? 'Real time' : 'Reverse time';
		if (abs === TIME_UNITS.HOUR) return dir === 'forward' ? '1 hour/sec' : 'Reverse 1 hour/sec';
		if (abs === TIME_UNITS.DAY) return dir === 'forward' ? '1 day/sec' : 'Reverse 1 day/sec';
		if (abs === TIME_UNITS.WEEK) return dir === 'forward' ? '1 week/sec' : 'Reverse 1 week/sec';
		if (abs === TIME_UNITS.MONTH) return dir === 'forward' ? '1 month/sec' : 'Reverse 1 month/sec';

		return `${abs}x ${dir}`;
	}

	// Initialize derived state
	updateDerivedState();

	// DON'T handle keyboard here - let the component handle it to avoid conflicts
	// The keyboard handling is moved to the TimeControls component

	// Create context API
	const context = {
		// State (readonly access)
		get state() { return state; },

		// Control methods
		play,
		pause,
		toggle,
		setTimeScale,
		setTimeUnit,
		reverseTime,
		setDate,
		jumpTime,
		reset,

		// Unit convenience methods - simplified
		setHoursPerSecond,
		setDaysPerSecond,
		setWeeksPerSecond,
		setMonthsPerSecond,

		// Utility methods
		getTimeString,
		getDateString,
		getTimeScaleDescription,

		// Manual update (for when not using auto-update)
		update,

		// Constants
		TIME_UNITS
	};

	// Set context
	setContext(VENUS_TIME_CONTEXT_KEY, context);

	return context;
}

/**
 * Get Venus Time Context
 */
export function getVenusTime() {
	const context = getContext(VENUS_TIME_CONTEXT_KEY);
	if (!context) {
		throw new Error('Venus time context not found. Make sure createVenusTime() is called in a parent component.');
	}
	return context;
}

export type VenusTimeContext = ReturnType<typeof createVenusTime>;