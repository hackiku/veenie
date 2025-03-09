// src/lib/stores/flightStore.ts

import { writable, derived } from 'svelte/store';

// Initial state
const initialState = {
	playing: true,
	time: 0,
	timeScale: 1,
	startTime: Date.now()
};

// Private timer variables (defined at the top to avoid initialization errors)
let frameId: number | null = null;

// Private timer functions
function startTimer(store: any) {
	if (frameId) return;

	const tick = () => {
		store.update((state: any) => {
			const now = Date.now();
			const elapsed = (now - state.startTime) / 1000;

			return {
				...state,
				time: state.time + (elapsed * state.timeScale),
				startTime: now
			};
		});

		frameId = requestAnimationFrame(() => tick());
	};

	frameId = requestAnimationFrame(() => tick());
}

function stopTimer() {
	if (frameId) {
		cancelAnimationFrame(frameId);
		frameId = null;
	}
}

// Create the main store
const createFlightStore = () => {
	const store = writable(initialState);
	const { subscribe, update } = store;

	const flightStore = {
		subscribe,

		// Play/pause control
		togglePlay: () => {
			update(state => {
				const newPlaying = !state.playing;

				if (newPlaying) {
					// Reset start time when resuming
					startTimer(store);
					return { ...state, playing: true, startTime: Date.now() };
				} else {
					stopTimer();
					return { ...state, playing: false };
				}
			});
		},

		// Set time scale (speed)
		setTimeScale: (scale: number) => {
			update(state => ({ ...state, timeScale: scale }));
		},

		// Reset time
		resetTime: () => {
			update(state => ({ ...state, time: 0, startTime: Date.now() }));
		},

		// For direct access to store values
		playing: derived(store, state => state.playing),
		time: derived(store, state => state.time),
		timeScale: derived(store, state => state.timeScale)
	};

	// Start timer if needed
	if (typeof window !== 'undefined') {
		const unsubscribe = subscribe(state => {
			if (state.playing) {
				startTimer(store);
			} else {
				stopTimer();
			}
		});
	}

	return flightStore;
};

// Create and export the singleton instance
export const flightStore = createFlightStore();