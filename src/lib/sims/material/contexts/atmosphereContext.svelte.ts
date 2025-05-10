// src/lib/sims/material/contexts/atmosphereContext.svelte.ts
import { getContext, setContext } from 'svelte';
import { Vector3 } from 'three';

const ATMOSPHERE_CONTEXT_KEY = 'material-atmosphere';

export function createAtmosphereContext(dbLayers = []) {
	// Atmosphere state
	let windEnabled = $state(true);
	let windIntensity = $state(1.0);
	let cloudLayers = $state([
		{ altitude: 48000, thickness: 5000, density: 0.7, name: 'Lower Clouds', color: '#A08C78' },
		{ altitude: 55000, thickness: 8000, density: 0.9, name: 'Middle Clouds', color: '#D3C0A9' },
		{ altitude: 65000, thickness: 5000, density: 0.3, name: 'Upper Haze', color: '#F0E0C0' },
	]);

	// Base values for fallback
	let baseDensity = $state(43.5);  // kg/m³
	let baseTemperature = $state(735); // K (Venus surface)
	let startTime = $state(performance.now());
	let dbAtmosphereData = $state(dbLayers);

	// Initialize with DB data if available
	if (dbLayers && dbLayers.length > 0) {
		initFromDatabase(dbLayers);
	}

	function initFromDatabase(layers) {
		// Find a reference layer (usually low atmosphere) to set base values
		const referenceLayer = layers.find(layer =>
			layer.altitude <= 10 && layer.data && layer.data.density
		);

		if (referenceLayer) {
			baseDensity = referenceLayer.data.density || baseDensity;
			baseTemperature = referenceLayer.data.temperature || baseTemperature;
		}

		dbAtmosphereData = layers;

		// Update cloud layers if available in planet data
		const venusLayers = layers.find(layer =>
			layer.data && layer.data.cloudLayers);

		if (venusLayers && venusLayers.data && venusLayers.data.cloudLayers) {
			cloudLayers = venusLayers.data.cloudLayers.map(layer => ({
				...layer,
				altitude: layer.altitude * 1000, // Convert to meters
				thickness: layer.thickness * 1000 // Convert to meters
			}));
		}
	}

	// Get atmospheric conditions at a given altitude
	function getConditionsAtAltitude(altitude) {
		// Try to find matching layer from DB data
		let dbConditions = null;
		if (dbAtmosphereData && dbAtmosphereData.length > 0) {
			// Find closest layer at or below this altitude
			const matchingLayers = dbAtmosphereData
				.filter(layer => layer.altitude * 1000 <= altitude) // Convert km to m
				.sort((a, b) => b.altitude - a.altitude);

			if (matchingLayers.length > 0) {
				const closestLayer = matchingLayers[0];
				dbConditions = closestLayer.data;
			}
		}

		// Calculate density (use DB value if available)
		const density = dbConditions?.density ||
			baseDensity * Math.exp(-altitude / 10000); // Scale height

		// Calculate temperature (use DB value if available)
		const temperature = dbConditions?.temperature ||
			baseTemperature - (altitude / 1000) * 0.5; // Temp decreases with altitude

		// Calculate pressure (use DB value if available)
		const pressure = dbConditions?.pressure ||
			density * 0.08 * temperature;

		// Create wind vector
		let windVector;
		if (!windEnabled) {
			windVector = new Vector3(0, 0, 0);
		} else {
			const timeFactor = (performance.now() - startTime) / 5000;
			const baseWind = 1 + altitude / 20000;
			const xVariation = Math.sin(timeFactor) * 0.1;
			const zVariation = Math.cos(timeFactor * 1.3) * 0.05;

			windVector = new Vector3(
				baseWind * (1 + xVariation) * windIntensity,
				0,
				zVariation * baseWind * windIntensity
			);
		}

		return {
			density,
			temperature,
			pressure,
			windVector,
			// Return altitude for easy access
			altitude
		};
	}

	// Getters and setters
	function setWindEnabled(enabled) {
		windEnabled = enabled;
		if (!enabled) {
			// Reset the start time when enabling wind to avoid jarring changes
			startTime = performance.now();
		}
	}

	function isWindEnabled() {
		return windEnabled;
	}

	function setWindIntensity(value) {
		windIntensity = Math.max(0, Math.min(2, value));
	}

	function getWindIntensity() {
		return windIntensity;
	}

	function getCloudLayers() {
		return cloudLayers;
	}

	// Create the context object
	const context = {
		getConditionsAtAltitude,
		setWindEnabled,
		isWindEnabled,
		setWindIntensity,
		getWindIntensity,
		getCloudLayers,

		// For debugging
		getDatabaseLayers: () => dbAtmosphereData
	};

	// Register the context
	setContext(ATMOSPHERE_CONTEXT_KEY, context);

	return context;
}

export function getAtmosphereContext() {
	return getContext(ATMOSPHERE_CONTEXT_KEY);
}