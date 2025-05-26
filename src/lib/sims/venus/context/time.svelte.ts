// =============================================================================
// 2. Venus Time Context - Enhanced
// =============================================================================

// src/lib/sims/venus/context/time.svelte.ts

import { setContext, getContext } from 'svelte';

// Context key
const VENUS_TIME_CONTEXT_KEY = Symbol('venus-time');

/**
 * Venus Time State - Simple and dev-friendly
 */
export interface VenusTimeState {
	// Core time tracking
	realTime: number;           // Real elapsed seconds since start
	simulationTime: number;     // Simulation time in seconds
	currentDate: Date;          // Current simulation date

	// Control state
	isPlaying: boolean;         // Is time running
	timeScale: number;          // Time multiplier (1 = real time, 2 = 2x speed, -1 = reverse)

	// Venus-specific (for later)
	venusDay: number;           // Current Venus day (0-243)
	venusRotation: number;      // Planet rotation degrees (0-360)
}

export interface VenusTimeConfig {
	startDate?: Date;
	initialTimeScale?: number;
	enableKeyboard?: boolean;   // Auto-handle space key
}

/**
 * Create Venus Time Context - Minimal and clean
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
		venusRotation: 0
	});

	// Internal tracking
	let lastUpdateTime = performance.now() / 1000;
	let animationFrameId: number | null = null;

	/**
	 * Update time state - called every frame when playing
	 */
	function update() {
		if (!state.isPlaying) return;

		const now = performance.now() / 1000;
		const realDelta = now - lastUpdateTime;
		lastUpdateTime = now;

		// Update real time
		state.realTime += realDelta;

		// Update simulation time with scaling
		const simDelta = realDelta * state.timeScale;
		state.simulationTime += simDelta;

		// Update current date
		state.currentDate = new Date(state.currentDate.getTime() + (simDelta * 1000));

		// Simple Venus rotation (1 Venus day = 243 Earth days, retrograde)
		const venusRotationRate = -360 / (243 * 24 * 3600); // degrees per second, negative for retrograde
		state.venusRotation += venusRotationRate * simDelta;

		// Keep rotation in 0-360 range
		state.venusRotation = ((state.venusRotation % 360) + 360) % 360;

		// Update Venus day count
		state.venusDay = Math.floor(state.simulationTime / (243 * 24 * 3600));

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
	}

	/**
	 * Jump to specific date
	 */
	function setDate(date: Date) {
		state.currentDate = new Date(date);
		// Recalculate simulation time based on new date
		// This is simplified - in reality you'd want to track from a fixed start point
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
	}

	/**
	 * Get formatted time string
	 */
	function getTimeString(): string {
		const totalSeconds = Math.floor(state.simulationTime);
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

	// Setup keyboard controls if enabled
	if (config.enableKeyboard) {
		if (typeof window !== 'undefined') {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.code === 'Space' && !e.repeat) {
					e.preventDefault();
					toggle();
				}
			};

			window.addEventListener('keydown', handleKeyDown);

			// Cleanup function will be handled by component unmounting
		}
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
		setDate,
		reset,

		// Utility methods
		getTimeString,
		getDateString,

		// Manual update (for when not using auto-update)
		update
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