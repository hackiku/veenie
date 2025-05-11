// src/lib/contexts/GlobalTimeSystem.ts

import type { World as RapierWorld } from '@dimforge/rapier3d-compat';

/**
 * Time units for different contexts
 */
export enum TimeUnit {
	MILLISECONDS,
	SECONDS,
	MINUTES,
	HOURS,
	DAYS,
	JULIAN_DAYS
}

/**
 * Time state including different representations
 */
export interface TimeState {
	unixTimestamp: number;      // Unix timestamp in milliseconds
	julianDate: number;         // Julian date (astronomical time reference)
	simulationTime: number;     // Accumulated simulation time
	deltaTime: number;          // Time since last update
	timeScale: number;          // Current time scaling factor
	isPaused: boolean;          // Whether simulation is paused
}

/**
 * Configuration for the time system
 */
export interface TimeConfig {
	initialTime?: number;       // Starting time (Unix timestamp)
	initialTimeScale?: number;  // Starting time scale (1.0 = real time)
	initialPaused?: boolean;    // Start paused?
	syncWithServer?: boolean;   // Whether to sync with server time
	serverUrl?: string;         // URL for time server
	syncInterval?: number;      // How often to sync with server (ms)
}

/**
 * Global time system that can drive multiple physics engines
 */
export class GlobalTimeSystem {
	private state: TimeState;
	private config: TimeConfig;
	private lastRealTime: number;
	private listeners: Array<(state: TimeState) => void>;
	private serverTimeOffset: number = 0;
	private syncIntervalId: number | null = null;

	constructor(config: TimeConfig = {}) {
		this.config = {
			initialTime: Date.now(),
			initialTimeScale: 1.0,
			initialPaused: false,
			syncWithServer: false,
			serverUrl: '/api/time',
			syncInterval: 60000, // Sync every minute by default
			...config
		};

		this.state = {
			unixTimestamp: this.config.initialTime,
			julianDate: this.unixToJulian(this.config.initialTime),
			simulationTime: 0,
			deltaTime: 0,
			timeScale: this.config.initialTimeScale,
			isPaused: this.config.initialPaused
		};

		this.lastRealTime = performance.now() / 1000; // in seconds
		this.listeners = [];

		// Start server sync if enabled
		if (this.config.syncWithServer) {
			this.syncWithServer();
			this.syncIntervalId = window.setInterval(
				() => this.syncWithServer(),
				this.config.syncInterval
			);
		}
	}

	/**
	 * Convert Unix timestamp to Julian date
	 */
	private unixToJulian(unixTime: number): number {
		// Unix timestamp is milliseconds since Jan 1, 1970
		// Julian date 2440587.5 is Jan 1, 1970 00:00:00 UTC
		return 2440587.5 + (unixTime / 86400000);
	}

	/**
	 * Sync with server time
	 */
	private async syncWithServer(): Promise<void> {
		try {
			const response = await fetch(this.config.serverUrl);
			const data = await response.json();

			// Calculate offset between local and server time
			const localTime = Date.now();
			const serverTime = data.timestamp;
			this.serverTimeOffset = serverTime - localTime;

			console.log(`Time sync: server offset ${this.serverTimeOffset}ms`);
		} catch (error) {
			console.error('Failed to sync with time server:', error);
		}
	}

	/**
	 * Get current time with server offset applied
	 */
	private getPreciseTime(): number {
		return Date.now() + this.serverTimeOffset;
	}

	/**
	 * Update the time state based on real time passage
	 * 
	 * @returns Time delta in seconds (0 if paused)
	 */
	public update(): number {
		if (this.state.isPaused) {
			this.state.deltaTime = 0;
			return 0;
		}

		// Get current real time and calculate delta
		const currentRealTime = performance.now() / 1000;
		const realDelta = currentRealTime - this.lastRealTime;
		this.lastRealTime = currentRealTime;

		// Apply time scale
		const simulationDelta = realDelta * this.state.timeScale;

		// Update time state
		this.state.simulationTime += simulationDelta;
		this.state.deltaTime = simulationDelta;
		this.state.unixTimestamp = this.getPreciseTime() +
			(this.state.simulationTime * 1000 * this.state.timeScale);
		this.state.julianDate = this.unixToJulian(this.state.unixTimestamp);

		// Notify listeners
		this.notifyListeners();

		return simulationDelta;
	}

	/**
	 * Notify all listeners of time state changes
	 */
	private notifyListeners(): void {
		for (const listener of this.listeners) {
			listener(this.state);
		}
	}

	/**
	 * Add a listener for time state changes
	 */
	public addListener(listener: (state: TimeState) => void): () => void {
		this.listeners.push(listener);

		// Return unsubscribe function
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener);
		};
	}

	/**
	 * Set whether the simulation is paused
	 */
	public setPaused(paused: boolean): void {
		if (this.state.isPaused === paused) return;

		this.state.isPaused = paused;

		// Reset last real time to prevent large delta after unpausing
		if (!paused) {
			this.lastRealTime = performance.now() / 1000;
		}

		this.notifyListeners();
	}

	/**
	 * Toggle pause state
	 */
	public togglePaused(): boolean {
		this.setPaused(!this.state.isPaused);
		return this.state.isPaused;
	}

	/**
	 * Set time scale
	 */
	public setTimeScale(scale: number): void {
		this.state.timeScale = scale;
		this.notifyListeners();
	}

	/**
	 * Get current time state
	 */
	public getTimeState(): TimeState {
		return { ...this.state };
	}

	/**
	 * Get time in specific units
	 */
	public getTime(unit: TimeUnit = TimeUnit.SECONDS): number {
		switch (unit) {
			case TimeUnit.MILLISECONDS:
				return this.state.unixTimestamp;
			case TimeUnit.SECONDS:
				return this.state.unixTimestamp / 1000;
			case TimeUnit.MINUTES:
				return this.state.unixTimestamp / 60000;
			case TimeUnit.HOURS:
				return this.state.unixTimestamp / 3600000;
			case TimeUnit.DAYS:
				return this.state.unixTimestamp / 86400000;
			case TimeUnit.JULIAN_DAYS:
				return this.state.julianDate;
			default:
				return this.state.simulationTime;
		}
	}

	/**
	 * Get formatted time string
	 */
	public getTimeString(format: 'hh:mm:ss' | 'iso' | 'julian'): string {
		if (format === 'julian') {
			return this.state.julianDate.toFixed(6);
		} else if (format === 'iso') {
			return new Date(this.state.unixTimestamp).toISOString();
		} else {
			// Format as HH:MM:SS
			const totalSeconds = Math.floor(this.state.simulationTime);
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
	 * Create adapter for Rapier physics world
	 */
	public createRapierAdapter(world: RapierWorld): PhysicsTimeAdapter {
		return new RapierTimeAdapter(this, world);
	}

	/**
	 * Clean up resources
	 */
	public dispose(): void {
		if (this.syncIntervalId !== null) {
			clearInterval(this.syncIntervalId);
		}

		this.listeners = [];
	}
}

/**
 * Interface for physics engine time adapters
 */
export interface PhysicsTimeAdapter {
	update(): void;
	setPaused(paused: boolean): void;
	setTimeScale(scale: number): void;
}

/**
 * Adapter for Rapier physics
 */
export class RapierTimeAdapter implements PhysicsTimeAdapter {
	private timeSystem: GlobalTimeSystem;
	private world: RapierWorld;

	constructor(timeSystem: GlobalTimeSystem, world: RapierWorld) {
		this.timeSystem = timeSystem;
		this.world = world;
	}

	update(): void {
		const delta = this.timeSystem.update();

		if (delta > 0) {
			// Step physics with the global time delta
			this.world.step();
		}
	}

	setPaused(paused: boolean): void {
		this.timeSystem.setPaused(paused);
	}

	setTimeScale(scale: number): void {
		this.timeSystem.setTimeScale(scale);
	}
}