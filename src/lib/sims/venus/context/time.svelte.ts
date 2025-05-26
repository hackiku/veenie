// src/lib/sims/venus/context/time.svelte.ts

import { setContext, getContext } from 'svelte';
import { getVenusRotation } from '../physics/orbital';

// Context key
const VENUS_TIME_CONTEXT_KEY = Symbol('venus-time');

/**
 * Simplified Venus Time State
 */
export interface VenusTimeState {
	// Core time tracking
	realTime: number;           // Real elapsed seconds since start
	simulationTime: number;     // Simulation time in seconds
	currentDate: Date;          // Current simulation date

	// Control state
	isPlaying: boolean;         // Is time running
	timeScale: number;          // Time multiplier

	// Venus-specific (calculated)
	venusRotation: number;      // Planet rotation degrees (0-360)
}

export interface VenusTimeConfig {
	startDate?: Date;
	initialTimeScale?: number;
	enableKeyboard?: boolean;
}

/**
 * Time unit constants (seconds per unit)
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
	// Initialize state
	const state = $state<VenusTimeState>({
		realTime: 0,
		simulationTime: 0,
		currentDate: config.startDate || new Date(),
		isPlaying: false,
		timeScale: config.initialTimeScale || 1,
		venusRotation: 0
	});

	// Internal tracking
	let lastUpdateTime = performance.now() / 1000;
	let animationFrameId: number | null = null;

	/**
	 * Update time state
	 */
	function update() {
		if (!state.isPlaying) return;

		const now = performance.now() / 1000;
		const realDelta = now - lastUpdateTime;
		lastUpdateTime = now;

		if (realDelta < 0.001) return; // Skip tiny updates

		// Update times
		state.realTime += realDelta;
		const simDelta = realDelta * state.timeScale;
		state.simulationTime += simDelta;

		// Update current date
		state.currentDate = new Date(state.currentDate.getTime() + (simDelta * 1000));

		// Calculate Venus rotation using orbital calculations
		state.venusRotation = getVenusRotation(state.simulationTime);

		// Continue animation loop
		if (state.isPlaying) {
			animationFrameId = requestAnimationFrame(update);
		}
	}

	/**
	 * Control methods
	 */
	function play() {
		if (state.isPlaying) return;
		state.isPlaying = true;
		lastUpdateTime = performance.now() / 1000;
		animationFrameId = requestAnimationFrame(update);
	}

	function pause() {
		state.isPlaying = false;
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}

	function toggle() {
		if (state.isPlaying) {
			pause();
		} else {
			play();
		}
	}

	function setTimeScale(scale: number) {
		state.timeScale = scale;
	}

	function reset() {
		pause();
		state.realTime = 0;
		state.simulationTime = 0;
		state.currentDate = config.startDate || new Date();
		state.venusRotation = 0;
		state.timeScale = config.initialTimeScale || 1;
	}

	/**
	 * Utility methods
	 */
	function getTimeString(): string {
		const totalSeconds = Math.floor(Math.abs(state.simulationTime));
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	function getDateString(): string {
		return state.currentDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Create context API
	const context = {
		// State (readonly access)
		get state() { return state; },

		// Control methods
		play,
		pause,
		toggle,
		setTimeScale,
		reset,

		// Utility methods
		getTimeString,
		getDateString,

		// Manual update
		update,

		// Constants
		TIME_UNITS
	};

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