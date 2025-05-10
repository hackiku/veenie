// src/routes/(flight)/+layout.server.ts

import { getPlanetData, getAtmosphereDataByRange, getAvailableVehicles } from '$lib/server/db/simulation-services';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	try {
		// Load data in parallel
		const [planet, atmosphereData, vehicles] = await Promise.all([
			getPlanetData('Venus'),
			getAtmosphereDataByRange('Venus', 0, 100),
			getAvailableVehicles()
		]);

		// Process atmosphere data into layers for easier consumption
		const atmosphereLayers = atmosphereData
			.filter(layer => layer.data.type === 'layer' || layer.data.name)
			.map(layer => ({
				altitude: layer.altitude,
				name: layer.data.name || `Layer ${layer.altitude}km`,
				color: layer.data.color || '#ffffff',
				opacity: layer.data.opacity || 1.0,
				density: layer.data.densityRatio || 1.0,
				temperature: layer.data.temperature || 300,
				pressure: layer.data.pressure || 1.0,
				windSpeed: layer.data.windSpeed || 0
			}));

		// Extract temperature-pressure profile
		const temperaturePressureProfile = atmosphereData
			.filter(point => point.data.type === 'profile_point')
			.map(point => ({
				altitude: point.altitude,
				temperature: point.data.temperature,
				pressure: point.data.pressure
			}));

		// Return all data needed for the simulation
		return {
			planet: planet || {
				name: 'Venus',
				data: {
					gravity: 8.87,
					radius: 6051.8,
					atmoDensity: 65,
					surfaceTemperature: 735
				}
			},
			atmosphere: {
				layers: atmosphereLayers,
				profile: temperaturePressureProfile
			},
			vehicles: vehicles || [],
			success: true
		};
	} catch (error) {
		console.error('Failed to load simulation data:', error);

		// Return default fallback data
		return {
			planet: {
				name: 'Venus',
				data: {
					gravity: 8.87,
					radius: 6051.8,
					atmoDensity: 65,
					surfaceTemperature: 735
				}
			},
			atmosphere: {
				layers: [],
				profile: []
			},
			vehicles: [],
			error: String(error)
		};
	}
};