// src/routes/(flight)/+layout.server.ts

import { db } from '$lib/server/db';
import { celestialBodies, atmosphericData, vehicles } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

// src/routes/(flight)/+layout.server.ts
export async function load() {
	try {
		console.log("Attempting to load simulation data from database...");

		// Check if db connection is available
		if (!db || !db.query) {
			throw new Error("Database connection not available");
		}

		// Load fallback data first
		let result = {
			planet: {
				name: 'Venus',
				data: {
					gravity: 8.87,
					radius: 6051.8,
					atmoDensity: 65,
					surfaceTemperature: 735,
					cloudLayers: [
						{ altitude: 48, thickness: 5, density: 0.7, name: 'Lower Clouds', color: '#A08C78' },
						{ altitude: 55, thickness: 10, density: 0.5, name: 'Middle Clouds', color: '#D3C0A9' },
						{ altitude: 65, thickness: 5, density: 0.2, name: 'Upper Haze', color: '#F0E0C0' }
					]
				}
			},
			atmosphere: [
				{ altitude: 0, data: { density: 65, temperature: 735, pressure: 9200 } },
				{ altitude: 25, data: { density: 10.5, temperature: 500, pressure: 1000 } },
				{ altitude: 55, data: { density: 0.9, temperature: 290, pressure: 50 } }
			],
			vehicles: [
				{
					id: 1,
					name: "Research Balloon",
					type: "balloon",
					data: {
						mass: 1.2,
						buoyancy: 0.35,
						dragFactor: 0.05,
						dimensions: { radius: 1.5 }
					}
				},
				{
					id: 2,
					name: "Explorer Airship",
					type: "airship",
					data: {
						mass: 2.5,
						buoyancy: 0.42,
						dragFactor: 0.08,
						dimensions: { length: 4, width: 1.5, height: 1.5 }
					}
				}
			],
			success: true
		};

		// Try to get Venus data from db
		try {
			const planet = await db.query.celestialBodies.findFirst({
				where: eq(celestialBodies.name, 'Venus')
			});

			if (planet) {
				result.planet = planet;

				// Get atmosphere data
				const atmosphereLayers = await db.query.atmosphericData.findMany({
					where: (fields, { and, eq, between }) => and(
						eq(fields.bodyId, planet.id),
						fields.altitude <= 100
					),
					orderBy: [asc(atmosphericData.altitude)]
				});

				if (atmosphereLayers && atmosphereLayers.length > 0) {
					result.atmosphere = atmosphereLayers;
				}
			}
		} catch (dbErr) {
			console.warn("Failed to load planet data:", dbErr);
			// Continue with fallback data
		}

		// Try to get vehicles
		try {
			const availableVehicles = await db.query.vehicles.findMany();
			if (availableVehicles && availableVehicles.length > 0) {
				result.vehicles = availableVehicles;
			}
		} catch (vehicleErr) {
			console.warn("Failed to load vehicle data:", vehicleErr);
			// Continue with fallback data
		}

		console.log(`Data loaded: planet: ${result.planet?.name}, layers: ${result.atmosphere.length}, vehicles: ${result.vehicles.length}`);

		return result;
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
					surfaceTemperature: 735,
					cloudLayers: [
						{ altitude: 48, thickness: 5, density: 0.7, name: 'Lower Clouds', color: '#A08C78' },
						{ altitude: 55, thickness: 10, density: 0.5, name: 'Middle Clouds', color: '#D3C0A9' },
						{ altitude: 65, thickness: 5, density: 0.2, name: 'Upper Haze', color: '#F0E0C0' }
					]
				}
			},
			atmosphere: [
				{ altitude: 0, data: { density: 65, temperature: 735, pressure: 9200 } },
				{ altitude: 25, data: { density: 10.5, temperature: 500, pressure: 1000 } },
				{ altitude: 55, data: { density: 0.9, temperature: 290, pressure: 50 } }
			],
			vehicles: [
				{
					id: 1,
					name: "Research Balloon",
					type: "balloon",
					data: {
						mass: 1.2,
						buoyancy: 0.35,
						dragFactor: 0.05,
						dimensions: { radius: 1.5 }
					}
				},
				{
					id: 2,
					name: "Explorer Airship",
					type: "airship",
					data: {
						mass: 2.5,
						buoyancy: 0.42,
						dragFactor: 0.08,
						dimensions: { length: 4, width: 1.5, height: 1.5 }
					}
				}
			],
			error: String(error)
		};
	}
}