// src/lib/contexts/chemistry.js
// import { state, derived, effect } from 'svelte';
import { createTimeContext } from './time';
import {
	getCompositionAtAltitude,
	getTemperatureAtAltitude,
	getPressureAtAltitude
} from '../data/chemistry/atmosphericComposition';

let _context;

export function createChemistryContext() {
	if (_context) return _context;

	// Get shared time context
	const timeContext = createTimeContext();

	// Core chemistry state
	const altitude = $state(50); // Default altitude (km)
	const temperature = $state(getTemperatureAtAltitude(50));
	const pressure = $state(getPressureAtAltitude(50));
	const composition = $state(getCompositionAtAltitude(50));

	// Production rates
	const production = $state({
		co2CaptureRate: 0,
		waterExtraction: 0,
		oxygenProduction: 0,
		fuelProduction: 0
	});

	// Derived state
	const efficiency = $derived(() => {
		const altitudeValue = altitude.value;
		const productionValue = production.value;

		// Calculate efficiency based on altitude and production rates
		let altitudeEfficiency = 0;
		if (altitudeValue >= 48 && altitudeValue <= 55) {
			altitudeEfficiency = 1.0;
		} else if (altitudeValue >= 45 && altitudeValue <= 60) {
			altitudeEfficiency = 0.8;
		} else if ((altitudeValue >= 40 && altitudeValue < 45) ||
			(altitudeValue > 60 && altitudeValue <= 65)) {
			altitudeEfficiency = 0.6;
		} else {
			altitudeEfficiency = 0.4;
		}

		const productionSum = productionValue.co2CaptureRate +
			productionValue.waterExtraction +
			productionValue.oxygenProduction +
			productionValue.fuelProduction;

		return altitudeEfficiency * 60 + (productionSum / 50) * 40;
	});

	// Update atmospheric conditions when altitude changes
	effect(() => {
		const currentAltitude = altitude.value;
		temperature.value = getTemperatureAtAltitude(currentAltitude);
		pressure.value = getPressureAtAltitude(currentAltitude);
		composition.value = getCompositionAtAltitude(currentAltitude);

		// Update production rates based on new conditions
		calculateProduction();
	});

	// Update production when simulation is running
	effect(() => {
		if (!timeContext.playing.value) return;

		// Add small random variations to production rates
		const variance = (Math.random() - 0.5) * 0.1;
		const productionValue = production.value;

		production.value = {
			co2CaptureRate: productionValue.co2CaptureRate * (1 + variance),
			waterExtraction: productionValue.waterExtraction * (1 + variance),
			oxygenProduction: productionValue.oxygenProduction * (1 + variance),
			fuelProduction: productionValue.fuelProduction * (1 + variance)
		};
	});

	// Helper function to calculate production rates
	function calculateProduction() {
		const currentAltitude = altitude.value;
		const currentTemperature = temperature.value;
		const currentPressure = pressure.value;
		const currentComposition = composition.value;

		// Get key atmospheric components
		const co2Fraction = currentComposition['CO2'] || 0;
		const waterFraction = currentComposition['H2O'] || 0;

		// Calculate altitude efficiency
		let altitudeEfficiency = 0;
		if (currentAltitude >= 48 && currentAltitude <= 55) {
			altitudeEfficiency = 1.0;
		} else if (currentAltitude >= 45 && currentAltitude <= 60) {
			altitudeEfficiency = 0.8;
		} else if ((currentAltitude >= 40 && currentAltitude < 45) ||
			(currentAltitude > 60 && currentAltitude <= 65)) {
			altitudeEfficiency = 0.6;
		} else if ((currentAltitude >= 30 && currentAltitude < 40) ||
			(currentAltitude > 65 && currentAltitude <= 70)) {
			altitudeEfficiency = 0.4;
		} else {
			altitudeEfficiency = 0.2;
		}

		// Calculate production rates
		const co2CaptureRate = 20 * co2Fraction * altitudeEfficiency * (currentPressure / 1.0);
		const waterExtraction = 5 * waterFraction * altitudeEfficiency *
			(1 - Math.abs(currentTemperature - 300) / 200);
		const oxygenProduction = (co2CaptureRate * 0.6) + (waterExtraction * 0.8);
		const fuelProduction = co2CaptureRate * 0.15;

		production.value = {
			co2CaptureRate,
			waterExtraction,
			oxygenProduction,
			fuelProduction
		};
	}

	// Action functions
	function updateAltitude(newAltitude) {
		altitude.value = Math.max(0, Math.min(100, newAltitude)); // Clamp between 0-100km
	}

	function reset() {
		altitude.value = 50;
		calculateProduction();
		timeContext.reset();
	}

	_context = {
		// State
		altitude,
		temperature,
		pressure,
		composition,
		production,
		efficiency,

		// Time state from time context
		playing: timeContext.playing,
		elapsedTime: timeContext.elapsedTime,

		// Actions
		updateAltitude,
		togglePlay: timeContext.togglePlay,
		reset,
		cleanup: timeContext.cleanup
	};

	return _context;
}