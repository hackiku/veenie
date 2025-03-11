// src/lib/stores/timeStore.ts
import { writable, derived, get } from 'svelte/store';

/**
 * Time modes for different simulations
 */
export enum TimeMode {
	REAL_TIME = 'realtime',      // 1:1 time flow
	FAST_FORWARD = 'fast',       // Accelerated time
	SLOW_MOTION = 'slow',        // Slowed down time
	MISSION_TIME = 'mission',    // Mission elapsed time
	VENUS_SOL = 'venus-sol'      // Venus solar days
}

/**
 * Interface for the time state
 */
export interface TimeState {
	playing: boolean;       // Is simulation running?
	timeScale: number;      // Simulation speed multiplier
	elapsedTime: number;    // Total elapsed time in seconds
	missionTime: number;    // Mission time in seconds
	systemTime: number;     // Real system time (always advances)
	mode: TimeMode;         // Current time mode
	timestamp: number;      // Last update timestamp (real time)
	deltaTime: number;      // Time since last update in seconds
	frameCount: number;     // Count of frames since start
}

/**
 * Create the improved time store
 */
function createTimeStore() {
	// Initial state
	const initialState: TimeState = {
		playing: false,
		timeScale: 1.0,          // Normal speed
		elapsedTime: 0,          // Simulation time 
		missionTime: 0,          // Mission time
		systemTime: 0,           // Real system clock (can't be paused)
		mode: TimeMode.REAL_TIME,
		timestamp: Date.now(),
		deltaTime: 0,
		frameCount: 0
	};

	const { subscribe, set, update } = writable<TimeState>(initialState);

	// Update function to call on each frame
	let frameId: number | null = null;
	let lastFrameTime = 0;

	function tick(timestamp: number) {
		// Calculate delta time from last frame
		const deltaTime = lastFrameTime ? (timestamp - lastFrameTime) / 1000 : 0;
		lastFrameTime = timestamp;

		update(state => {
			const now = Date.now();
			const realTimeDelta = (now - state.timestamp) / 1000; // Convert to seconds
			const simulationDelta = state.playing ? realTimeDelta * state.timeScale : 0;

			// Always advance system time
			const newSystemTime = state.systemTime + realTimeDelta;

			// Only advance simulation time if playing
			const newElapsedTime = state.playing
				? state.elapsedTime + simulationDelta
				: state.elapsedTime;

			// Mission time may advance at a different rate or be tied to simulation events
			const newMissionTime = state.playing
				? state.missionTime + simulationDelta
				: state.missionTime;

			return {
				...state,
				elapsedTime: newElapsedTime,
				missionTime: newMissionTime,
				systemTime: newSystemTime,
				timestamp: now,
				deltaTime: simulationDelta,
				frameCount: state.frameCount + 1
			};
		});

		frameId = requestAnimationFrame(tick);
	}

	// Start the animation loop when timeStore is created
	function startTick() {
		if (!frameId) {
			lastFrameTime = 0;
			frameId = requestAnimationFrame(tick);
		}
	}

	// Start the tick loop immediately
	startTick();

	return {
		subscribe,

		// Toggle play/pause
		togglePlay: () => {
			update(state => {
				// Make sure tick loop is running
				if (!frameId) {
					startTick();
				}

				return {
					...state,
					playing: !state.playing,
					timestamp: Date.now() // Reset timestamp when toggling to avoid huge deltas
				};
			});
		},

		// Play - explicitly start
		play: () => {
			update(state => {
				if (!state.playing) {
					if (!frameId) {
						startTick();
					}
					return {
						...state,
						playing: true,
						timestamp: Date.now()
					};
				}
				return state;
			});
		},

		// Pause - explicitly pause
		pause: () => {
			update(state => {
				if (state.playing) {
					return {
						...state,
						playing: false,
						timestamp: Date.now()
					};
				}
				return state;
			});
		},

		// Set time scale
		setTimeScale: (scale: number) => {
			update(state => ({
				...state,
				timeScale: scale
			}));
		},

		// Set time mode
		setTimeMode: (mode: TimeMode) => {
			update(state => ({
				...state,
				mode
			}));
		},

		// Set mission time directly (for synchronizing with events)
		setMissionTime: (time: number) => {
			update(state => ({
				...state,
				missionTime: time
			}));
		},

		// Reset time
		reset: () => {
			update(state => ({
				...initialState,
				timestamp: Date.now(),
				// Maintain the current time mode and scale
				mode: state.mode,
				timeScale: state.timeScale,
				// Keep system time advancing
				systemTime: state.systemTime
			}));
		},

		// Full reset (including mode and scale)
		fullReset: () => {
			set({
				...initialState,
				timestamp: Date.now()
			});
		},

		// Clean up when component is destroyed
		cleanup: () => {
			if (frameId) {
				cancelAnimationFrame(frameId);
				frameId = null;
			}
		}
	};
}

// Create and export the store
export const timeyStore = createTimeStore();

// Derived stores for commonly used values
export const playing = derived(timeyStore, $store => $store.playing);
export const timeScale = derived(timeyStore, $store => $store.timeScale);
export const elapsedTime = derived(timeyStore, $store => $store.elapsedTime);
export const missionTime = derived(timeyStore, $store => $store.missionTime);
export const deltaTime = derived(timeyStore, $store => $store.deltaTime);
export const timeMode = derived(timeyStore, $store => $store.mode);

// Helper to get formatted time strings
export function formatTime(seconds: number, format: 'short' | 'full' = 'short'): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (format === 'short') {
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	} else {
		return `${hours}h ${minutes}m ${secs}s`;
	}
}