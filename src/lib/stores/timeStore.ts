// src/lib/stores/timeStore.ts
import { writable, derived } from 'svelte/store';

interface TimeState {
	playing: boolean;       // Is simulation running?
	timeScale: number;      // Simulation speed multiplier
	elapsedTime: number;    // Total elapsed time in seconds
	timestamp: number;      // Last update timestamp (real time)
	deltaTime: number;      // Time since last update in seconds
	time: number;           // For compatibility (alias of elapsedTime)
	startTime: number;      // When the simulation started
}

function createTimeStore() {
	// Initial state
	const initialState: TimeState = {
		playing: false,
		timeScale: 1.0,       // Normal speed
		elapsedTime: 0,
		timestamp: Date.now(),
		deltaTime: 0,
		time: 0,              // Alias for elapsedTime for compatibility
		startTime: Date.now() // When simulation started
	};

	const { subscribe, set, update } = writable(initialState);

	// Update function to call on each frame
	let frameId: number | null = null;

	function tick() {
		update(state => {
			const now = Date.now();
			const realTimeDelta = (now - state.timestamp) / 1000; // Convert to seconds
			const simulationDelta = realTimeDelta * state.timeScale;

			const newElapsedTime = state.elapsedTime + (state.playing ? simulationDelta : 0);

			return {
				...state,
				elapsedTime: newElapsedTime,
				time: newElapsedTime, // Keep time in sync with elapsedTime
				timestamp: now,
				deltaTime: simulationDelta
			};
		});

		frameId = requestAnimationFrame(tick);
	}

	return {
		subscribe,

		// Toggle play/pause
		togglePlay: () => {
			update(state => {
				// If we're starting to play, initialize the animation frame
				if (!state.playing && !frameId) {
					frameId = requestAnimationFrame(tick);
				}

				return {
					...state,
					playing: !state.playing,
					timestamp: Date.now() // Reset timestamp when toggling to avoid huge deltas
				};
			});
		},

		// Set time scale
		setTimeScale: (scale: number) => {
			update(state => ({
				...state,
				timeScale: scale
			}));
		},

		// Reset time
		reset: () => {
			if (frameId) {
				cancelAnimationFrame(frameId);
				frameId = null;
			}

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
export const timeStore = createTimeStore();

// Derived stores
export const playing = derived(timeStore, $store => $store.playing);
export const timeScale = derived(timeStore, $store => $store.timeScale);
export const elapsedTime = derived(timeStore, $store => $store.elapsedTime);