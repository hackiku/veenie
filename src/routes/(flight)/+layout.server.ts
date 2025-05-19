// src/routes/(flight)/+layout.server.ts

import { db } from '$lib/server/db';
// import type { celestialBodies, atmosphericData, vehicles } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';


// src/routes/(flight)/+layout.server.ts

export async function load() {
	try {
		console.log("Attempting to load simulation data from database...");

		// Default fallback data
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

		// Dynamically import database - safer for environments without DB
		let db;
		try {
			const { db: importedDb } = await import('$lib/server/db');
			db = importedDb;
		} catch (importErr) {
			console.log("Database module not available, using fallback data");
			return result;
		}

		// Safe check for DB availability
		if (!db || !db.query || typeof db.query !== 'object') {
			console.log("Database connection not available, using fallback data");
			return result;
		}

		// Check for required query methods
		const hasCelestialQueries = db.query.celestialBodies &&
			typeof db.query.celestialBodies.findFirst === 'function';
		const hasVehicleQueries = db.query.vehicles &&
			typeof db.query.vehicles.findMany === 'function';
		const hasAtmosphereQueries = db.query.atmosphericData &&
			typeof db.query.atmosphericData.findMany === 'function';

		// Only proceed with DB queries if methods exist
		if (hasCelestialQueries) {
			try {
				// Import schema definitions only if DB is available
				const { celestialBodies, atmosphericData } = await import('$lib/server/db/schema');
				const { eq, asc } = await import('drizzle-orm');

				const planet = await db.query.celestialBodies.findFirst({
					where: eq(celestialBodies.name, 'Venus')
				});

				if (planet) {
					result.planet = planet;

					if (hasAtmosphereQueries) {
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
				}
			} catch (dbErr) {
				console.warn("Failed to load planet data:", dbErr);
				// Continue with fallback data
			}
		}

		// Try to get vehicles if that query is available
		if (hasVehicleQueries) {
			try {
				const availableVehicles = await db.query.vehicles.findMany();
				if (availableVehicles && availableVehicles.length > 0) {
					result.vehicles = availableVehicles;
				}
			} catch (vehicleErr) {
				console.warn("Failed to load vehicle data:", vehicleErr);
				// Continue with fallback data
			}
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
			]
		};
	}
}