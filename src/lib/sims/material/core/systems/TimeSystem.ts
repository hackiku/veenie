// src/lib/sims/material/core/systems/TimeSystem.ts

/**
 * Interface for time system options
 */
export interface TimeSystemOptions {
	/**
	 * Initial simulation time in seconds
	 */
	initialTime?: number;

	/**
	 * Initial time scale (1.0 = real time)
	 */
	initialTimeScale?: number;

	/**
	 * Initial paused state
	 */
	initialPaused?: boolean;

	/**
	 * Minimum allowed time scale
	 */
	minTimeScale?: number;

	/**
	 * Maximum allowed time scale
	 */
	maxTimeScale?: number;
}

/**
 * Class for managing simulation time
 */
export class TimeSystem {
	/**
	 * Current simulation time in seconds
	 */
	private time: number;

	/**
	 * Time scale multiplier (1.0 = real time)
	 */
	private timeScale: number;

	/**
	 * Whether the simulation is paused
	 */
	private paused: boolean;

	/**
	 * Last real-time timestamp for calculating delta
	 */
	private lastRealTime: number;

	/**
	 * Minimum allowed time scale
	 */
	private minTimeScale: number;

	/**
	 * Maximum allowed time scale
	 */
	private maxTimeScale: number;

	/**
	 * List of pause change listeners
	 */
	private pauseListeners: ((paused: boolean) => void)[] = [];

	/**
	 * List of time scale change listeners
	 */
	private timeScaleListeners: ((timeScale: number) => void)[] = [];

	/**
	 * Construct a new TimeSystem
	 * 
	 * @param options - Options for the time system
	 */
	constructor(options: TimeSystemOptions = {}) {
		this.time = options.initialTime ?? 0;
		this.timeScale = options.initialTimeScale ?? 1.0;
		this.paused = options.initialPaused ?? false;
		this.lastRealTime = performance.now() / 1000; // Convert to seconds
		this.minTimeScale = options.minTimeScale ?? 0.1;
		this.maxTimeScale = options.maxTimeScale ?? 10.0;
	}

	/**
	 * Add a listener for pause state changes
	 * 
	 * @param listener - Function to call when pause state changes
	 * @returns Unsubscribe function
	 */
	onPauseChange(listener: (paused: boolean) => void): () => void {
		this.pauseListeners.push(listener);

		return () => {
			this.pauseListeners = this.pauseListeners.filter(l => l !== listener);
		};
	}

	/**
	 * Add a listener for time scale changes
	 * 
	 * @param listener - Function to call when time scale changes
	 * @returns Unsubscribe function
	 */
	onTimeScaleChange(listener: (timeScale: number) => void): () => void {
		this.timeScaleListeners.push(listener);

		return () => {
			this.timeScaleListeners = this.timeScaleListeners.filter(l => l !== listener);
		};
	}

	/**
	 * Get the current simulation time
	 * 
	 * @returns Current simulation time in seconds
	 */
	getTime(): number {
		return this.time;
	}

	/**
	 * Get the current time scale
	 * 
	 * @returns Current time scale multiplier
	 */
	getTimeScale(): number {
		return this.timeScale;
	}

	/**
	 * Get whether the simulation is paused
	 * 
	 * @returns Whether the simulation is paused
	 */
	isPaused(): boolean {
		return this.paused;
	}

	/**
	 * Set whether the simulation is paused
	 * 
	 * @param paused - Whether the simulation should be paused
	 */
	setPaused(paused: boolean): void {
		if (this.paused === paused) {
			return; // No change
		}

		this.paused = paused;

		// Reset last real time to prevent large delta after unpausing
		if (!paused) {
			this.lastRealTime = performance.now() / 1000;
		}

		// Notify pause listeners
		this.pauseListeners.forEach(listener => listener(paused));
	}

	/**
	 * Toggle the paused state
	 * 
	 * @returns New paused state
	 */
	togglePaused(): boolean {
		this.setPaused(!this.paused);
		return this.paused;
	}

	/**
	 * Set the time scale
	 * 
	 * @param timeScale - New time scale multiplier
	 */
	setTimeScale(timeScale: number): void {
		// Clamp time scale to valid range
		const newTimeScale = Math.max(
			this.minTimeScale,
			Math.min(this.maxTimeScale, timeScale)
		);

		if (this.timeScale === newTimeScale) {
			return; // No change
		}

		this.timeScale = newTimeScale;

		// Notify time scale listeners
		this.timeScaleListeners.forEach(listener => listener(newTimeScale));
	}

	/**
	 * Reset the simulation time
	 * 
	 * @param time - New simulation time (defaults to 0)
	 */
	resetTime(time: number = 0): void {
		this.time = time;
		this.lastRealTime = performance.now() / 1000;
	}

	/**
	 * Update the simulation time based on real time
	 * 
	 * @returns Delta time in seconds (0 if paused)
	 */
	update(): number {
		if (this.paused) {
			return 0; // No time passes while paused
		}

		// Calculate real-time delta
		const currentRealTime = performance.now() / 1000;
		const realDelta = currentRealTime - this.lastRealTime;
		this.lastRealTime = currentRealTime;

		// Apply time scale to get simulation delta
		const simulationDelta = realDelta * this.timeScale;

		// Update simulation time
		this.time += simulationDelta;

		return simulationDelta;
	}

	/**
	 * Format the simulation time as a string
	 * 
	 * @returns Formatted time string (HH:MM:SS)
	 */
	formatTime(): string {
		const totalSeconds = Math.floor(this.time);
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
 * A singleton instance of the TimeSystem
 */
let timeSystemInstance: TimeSystem | null = null;

/**
 * Get the singleton TimeSystem instance
 * 
 * @param options - Options for creating the time system (only used if not already created)
 * @returns The TimeSystem instance
 */
export function getTimeSystem(options: TimeSystemOptions = {}): TimeSystem {
	if (!timeSystemInstance) {
		timeSystemInstance = new TimeSystem(options);
	}

	return timeSystemInstance;
}

/**
 * Reset the TimeSystem instance (for testing or simulation reset)
 * 
 * @param options - Options for the new time system
 */
export function resetTimeSystem(options: TimeSystemOptions = {}): void {
	timeSystemInstance = new TimeSystem(options);
}