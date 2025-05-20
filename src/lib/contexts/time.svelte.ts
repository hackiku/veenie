// src/lib/contexts/time.svelte.ts
import { writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

export enum TimeUnit {
	MILLISECONDS,
	SECONDS,
	MINUTES,
	HOURS,
	DAYS,
	JULIAN_DAYS
}

export interface TimeState {
	unixTimestamp: number;    // Unix timestamp in milliseconds
	julianDate: number;       // Julian date (astronomical time reference)
	simulationTime: number;   // Accumulated simulation time in seconds
	deltaTime: number;        // Last frame's delta time in seconds
	timeScale: number;        // Current time scaling factor
	isPaused: boolean;        // Whether simulation is paused
}

export interface TimeConfig {
	initialTime?: number;     // Starting time (Unix timestamp)
	initialTimeScale?: number; // Starting time scale (1.0 = real time)
	initialPaused?: boolean;  // Start paused?
	useJulianDate?: boolean;  // Whether to calculate Julian dates (can skip for performance)
	frameRate?: number;       // Target frame rate for step mode
}

const TIME_CONTEXT_KEY = 'global-time-system';

/**
 * Create a global time system with runes
 */
export function createTimeSystem(config: TimeConfig = {}) {
	// Apply defaults
	const fullConfig: TimeConfig = {
		initialTime: Date.now(),
		initialTimeScale: 1.0,
		initialPaused: false,
		useJulianDate: true,
		frameRate: 60,
		...config
	};

	// Calculate Julian date if needed
	const initialJulianDate = fullConfig.useJulianDate
		? unixToJulian(fullConfig.initialTime)
		: 0;

	// State
	let state = $state<TimeState>({
		unixTimestamp: fullConfig.initialTime,
		julianDate: initialJulianDate,
		simulationTime: 0,
		deltaTime: 0,
		timeScale: fullConfig.initialTimeScale,
		isPaused: fullConfig.initialPaused
	});

	// Last real time for delta calculations
	let lastRealTime = $state(performance.now() / 1000);

	// Svelte store for compatibility with non-runes components
	const timeStore = writable(state);

	// Convert Unix timestamp to Julian date
	function unixToJulian(unixTime: number): number {
		// Unix timestamp is milliseconds since Jan 1, 1970
		// Julian date 2440587.5 is Jan 1, 1970 00:00:00 UTC
		return 2440587.5 + (unixTime / 86400000);
	}

	/**
	 * Update the time state based on real time passage
	 */
	function update(): number {
		if (state.isPaused) {
			state.deltaTime = 0;
			return 0;
		}

		// Get current real time and calculate delta
		const currentRealTime = performance.now() / 1000;
		const realDelta = currentRealTime - lastRealTime;
		lastRealTime = currentRealTime;

		// Cap delta to avoid large jumps
		const cappedDelta = Math.min(realDelta, 0.1);

		// Apply time scale
		const simulationDelta = cappedDelta * state.timeScale;

		// Update time state
		state.simulationTime += simulationDelta;
		state.deltaTime = simulationDelta;
		state.unixTimestamp += simulationDelta * 1000;

		// Only calculate Julian date if needed (it's expensive)
		if (fullConfig.useJulianDate) {
			state.julianDate = unixToJulian(state.unixTimestamp);
		}

		// Update store
		timeStore.set({ ...state });

		return simulationDelta;
	}

	/**
	 * Take a single time step of fixed duration
	 */
	function step(): number {
		const stepSize = 1 / fullConfig.frameRate;

		// Update time without real-time dependency
		state.simulationTime += stepSize;
		state.deltaTime = stepSize;
		state.unixTimestamp += stepSize * 1000;

		// Only calculate Julian date if needed
		if (fullConfig.useJulianDate) {
			state.julianDate = unixToJulian(state.unixTimestamp);
		}

		// Update store
		timeStore.set({ ...state });

		return stepSize;
	}

	/**
	 * Set whether the simulation is paused
	 */
	function setPaused(paused: boolean): void {
		if (state.isPaused === paused) return;

		state.isPaused = paused;

		// Reset last real time to prevent jumps
		if (!paused) {
			lastRealTime = performance.now() / 1000;
		}

		// Update store
		timeStore.set({ ...state });
	}

	/**
	 * Toggle pause state
	 */
	function togglePaused(): boolean {
		setPaused(!state.isPaused);
		return state.isPaused;
	}

	/**
	 * Set time scale
	 */
	function setTimeScale(scale: number): void {
		state.timeScale = scale;
		timeStore.set({ ...state });
	}

	/**
	 * Reset the time system
	 */
	function reset(): void {
		state.simulationTime = 0;
		state.deltaTime = 0;
		state.unixTimestamp = fullConfig.initialTime;

		if (fullConfig.useJulianDate) {
			state.julianDate = unixToJulian(state.unixTimestamp);
		}

		lastRealTime = performance.now() / 1000;
		timeStore.set({ ...state });
	}

	/**
	 * Get current time in the specified unit
	 */
	function getTime(unit: TimeUnit = TimeUnit.SECONDS): number {
		switch (unit) {
			case TimeUnit.MILLISECONDS:
				return state.unixTimestamp;
			case TimeUnit.SECONDS:
				return state.unixTimestamp / 1000;
			case TimeUnit.MINUTES:
				return state.unixTimestamp / 60000;
			case TimeUnit.HOURS:
				return state.unixTimestamp / 3600000;
			case TimeUnit.DAYS:
				return state.unixTimestamp / 86400000;
			case TimeUnit.JULIAN_DAYS:
				return state.julianDate;
			default:
				return state.simulationTime;
		}
	}

	/**
	 * Get formatted time string
	 */
	function getTimeString(format: 'hh:mm:ss' | 'iso' | 'julian'): string {
		if (format === 'julian') {
			return state.julianDate.toFixed(6);
		} else if (format === 'iso') {
			return new Date(state.unixTimestamp).toISOString();
		} else {
			// Format as HH:MM:SS
			const totalSeconds = Math.floor(state.simulationTime);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			return [
				hours.toString().padStart(2, '0'),
				minutes.toString().padStart(2, '0'),
				seconds.toString().padStart(2, '0')
			].join(':');
		}
	}

	/**
	 * Get the current time scale
	 */
	function getTimeScale(): number {
		return state.timeScale;
	}

	/**
	 * Get the time state
	 */
	function getState(): TimeState {
		return { ...state };
	}

	// Create API
	const timeSystem = {
		update,
		step,
		setPaused,
		togglePaused,
		setTimeScale,
		getTimeScale,
		reset,
		getTime,
		getTimeString,
		getState,
		store: timeStore
	};

	// Register context
	setContext(TIME_CONTEXT_KEY, timeSystem);

	return timeSystem;
}

/**
 * Get the time system from context
 */
export function getTimeSystem() {
	return getContext<ReturnType<typeof createTimeSystem>>(TIME_CONTEXT_KEY);
}