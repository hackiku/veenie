// src/lib/stores/chemistryStore.ts

import { writable, derived } from 'svelte/store';
import { timeStore } from './timeStore';
import {
	getCompositionAtAltitude,
	getTemperatureAtAltitude,
	getPressureAtAltitude
} from '$lib/data/chemistry/atmosphericComposition';

// Define interfaces for type safety
interface Position {
	x: number;
	y: number;
	z: number;
}

interface Production {
	co2CaptureRate: number;  // kg/hr
	waterExtraction: number; // kg/hr
	oxygenProduction: number; // kg/hr
	fuelProduction: number;  // kg/hr
}

interface ChemistryState {
	playing: boolean;
	altitude: number;        // Current altitude in km
	temperature: number;     // K
	pressure: number;        // bar
	composition: Record<string, number>; // Gas composition at current altitude
	production: Production;  // Current production rates
	efficiency: number;      // Overall process efficiency (%)
	timestamp: number;       // Last update timestamp
}

// Create the main chemistry store
function createChemistryStore() {
	// Default altitude for cloud layer (where many ISRU operations would be optimal)
	const defaultAltitude = 10; // km

	// Initial state
	const initialState: ChemistryState = {
		playing: false,
		altitude: defaultAltitude,
		temperature: getTemperatureAtAltitude(defaultAltitude),
		pressure: getPressureAtAltitude(defaultAltitude),
		composition: getCompositionAtAltitude(defaultAltitude),
		production: {
			co2CaptureRate: 0,
			waterExtraction: 0,
			oxygenProduction: 0,
			fuelProduction: 0
		},
		efficiency: 0,
		timestamp: Date.now()
	};

	// Create the writable store
	const { subscribe, set, update } = writable(initialState);

	// Subscribe to timeStore to sync play state
	const unsubTimeStore = timeStore.subscribe(timeState => {
		update(state => ({
			...state,
			playing: timeState.playing
		}));
	});

	// Update production rates based on current conditions
	function calculateProduction(altitude: number, temperature: number, pressure: number, composition: Record<string, number>) {
		// Get key atmospheric components
		const co2Fraction = composition['CO2'] || 0;
		const waterFraction = composition['H2O'] || 0;
		const so2Fraction = composition['SO2'] || 0;

		// Base rates optimized at around 50-55km altitude
		const altitudeEfficiency = calculateAltitudeEfficiency(altitude);

		// CO2 capture is most efficient with high CO2 concentration and moderate pressure
		const co2CaptureRate = 20 * co2Fraction * altitudeEfficiency * (pressure / 1.0);

		// Water extraction depends on water vapor content and temperature
		const waterExtraction = 5 * waterFraction * altitudeEfficiency * (1 - Math.abs(temperature - 300) / 200);

		// Oxygen production is derived from CO2 and H2O
		const oxygenProduction = (co2CaptureRate * 0.6) + (waterExtraction * 0.8);

		// Fuel production (assuming methane from CO2 reduction)
		const fuelProduction = co2CaptureRate * 0.15;

		return {
			co2CaptureRate,
			waterExtraction,
			oxygenProduction,
			fuelProduction
		};
	}

	// Calculate efficiency based on altitude (optimal range around 50-60km)
	function calculateAltitudeEfficiency(altitude: number) {
		// Peak efficiency around 50-55km (habitable zone with Earth-like pressure/temp)
		if (altitude >= 48 && altitude <= 55) {
			return 1.0;
		}
		// Good efficiency from 45-60km
		else if (altitude >= 45 && altitude <= 60) {
			return 0.8;
		}
		// Moderate efficiency from 40-45km and 60-65km
		else if ((altitude >= 40 && altitude < 45) || (altitude > 60 && altitude <= 65)) {
			return 0.6;
		}
		// Low efficiency from 30-40km and 65-70km
		else if ((altitude >= 30 && altitude < 40) || (altitude > 65 && altitude <= 70)) {
			return 0.4;
		}
		// Poor efficiency below 30km or above 70km
		else {
			return 0.2;
		}
	}

	// Calculate overall process efficiency
	function calculateProcessEfficiency(altitude: number, production: Production) {
		const altitudeEfficiency = calculateAltitudeEfficiency(altitude);
		const productionSum = production.co2CaptureRate + production.waterExtraction +
			production.oxygenProduction + production.fuelProduction;

		// Process efficiency based on production rates and altitude suitability
		return altitudeEfficiency * 60 + (productionSum / 50) * 40;
	}

	// Create the store object with additional methods
	const store = {
		subscribe,

		// Toggle play/pause state (syncs with timeStore)
		togglePlay: () => {
			if (typeof timeStore.togglePlay === 'function') {
				timeStore.togglePlay();
			}

			update(state => ({
				...state,
				playing: !state.playing,
				timestamp: Date.now()
			}));
		},

		// Update altitude and recalculate atmospheric conditions
		updateAltitude: (altitude: number) => update(state => {
			// Ensure altitude is within bounds
			const boundedAltitude = Math.max(0, Math.min(100, altitude));

			// Get atmospheric conditions at this altitude
			const temperature = getTemperatureAtAltitude(boundedAltitude);
			const pressure = getPressureAtAltitude(boundedAltitude);
			const composition = getCompositionAtAltitude(boundedAltitude);

			// Calculate production rates
			const production = calculateProduction(boundedAltitude, temperature, pressure, composition);

			// Calculate overall efficiency
			const efficiency = calculateProcessEfficiency(boundedAltitude, production);

			return {
				...state,
				altitude: boundedAltitude,
				temperature,
				pressure,
				composition,
				production,
				efficiency,
				timestamp: Date.now()
			};
		}),

		// Update production rates (for manual adjustments or upgrades)
		updateProductionRates: (rates: Partial<Production>) => update(state => ({
			...state,
			production: {
				...state.production,
				...rates
			},
			efficiency: calculateProcessEfficiency(state.altitude, {
				...state.production,
				...rates
			}),
			timestamp: Date.now()
		})),

		// Perform a simulation tick update
		tick: (deltaTime: number) => {
			update(state => {
				if (!state.playing) return state;

				// Update production rates slightly over time
				const productionVariance = (Math.random() - 0.5) * 0.1; // +/- 5% variance

				const updatedProduction = {
					co2CaptureRate: state.production.co2CaptureRate * (1 + productionVariance),
					waterExtraction: state.production.waterExtraction * (1 + productionVariance),
					oxygenProduction: state.production.oxygenProduction * (1 + productionVariance),
					fuelProduction: state.production.fuelProduction * (1 + productionVariance)
				};

				const efficiency = calculateProcessEfficiency(state.altitude, updatedProduction);

				return {
					...state,
					production: updatedProduction,
					efficiency,
					timestamp: Date.now()
				};
			});
		},

		// Reset simulation to initial state
		reset: () => {
			try {
				if (typeof timeStore.reset === 'function') {
					timeStore.reset();
				}
			} catch (e) {
				console.warn("Could not reset timeStore:", e);
			}

			set({
				...initialState,
				timestamp: Date.now()
			});
		},

		// Cleanup when component is destroyed
		cleanup: () => {
			if (unsubTimeStore) {
				unsubTimeStore();
			}
		}
	};

	return store;
}

// Create and export the store
export const chemistryStore = createChemistryStore();

// Derived stores for specific values
export const altitude = derived(chemistryStore, $store => $store.altitude);
export const temperature = derived(chemistryStore, $store => $store.temperature);
export const pressure = derived(chemistryStore, $store => $store.pressure);
export const composition = derived(chemistryStore, $store => $store.composition);
export const production = derived(chemistryStore, $store => $store.production);
export const efficiency = derived(chemistryStore, $store => $store.efficiency);
export const playing = derived(chemistryStore, $store => $store.playing);