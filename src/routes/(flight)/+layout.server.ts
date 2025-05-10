// src/routes/(flight)/+layout.server.ts
import { db } from '$lib/server/db';
import { celestialBodies, atmosphericData, vehicles } from '$lib/server/db/schema';
import { eq, asc, between } from 'drizzle-orm';

export async function load() {
	try {
		// Get Venus data
		const venus = await db.query.celestialBodies.findFirst({
			where: eq(celestialBodies.name, 'Venus')
		});

		// Get atmosphere data (all layers up to 100km)
		let atmosphereLayers = [];
		if (venus) {
			atmosphereLayers = await db.query.atmosphericData.findMany({
				where: (fields, { and, eq, between }) => and(
					eq(fields.bodyId, venus.id),
					between(fields.altitude, 0, 100)
				),
				orderBy: [asc(atmosphericData.altitude)]
			});
		}

		// Get vehicles
		const availableVehicles = await db.query.vehicles.findMany();

		return {
			planet: venus || {
				name: 'Venus',
				type: 'planet',
				data: {
					radius: 6051.8, // km
					mass: 4.867e24, // kg
					gravity: 8.87, // m/s²
					rotationPeriod: -243.0226, // days (retrograde)
					orbitalPeriod: 224.7, // days
					axialTilt: 177.3, // degrees
					surfaceTemperature: 735, // K
					surfacePressure: 92, // bar
					atmoDensity: 65, // kg/m³
				}
			},
			atmosphere: atmosphereLayers || [],
			vehicles: availableVehicles || [],
			success: true
		};
	} catch (error) {
		console.error('Failed to load simulation data:', error);

		// Return fallback data
		return {
			planet: {
				name: 'Venus',
				type: 'planet',
				data: {
					radius: 6051.8,
					mass: 4.867e24,
					gravity: 8.87,
					rotationPeriod: -243.0226,
					orbitalPeriod: 224.7,
					axialTilt: 177.3,
					surfaceTemperature: 735,
					surfacePressure: 92,
					atmoDensity: 65,
				}
			},
			atmosphere: [],
			vehicles: [],
			error: String(error)
		};
	}
}