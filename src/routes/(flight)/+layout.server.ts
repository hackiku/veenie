// src/routes/(flight)/+layout.server.ts
import { db } from '$lib/server/db';
import { celestialBodies, atmosphericData, vehicles } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function load() {
  try {
    // Get Venus data
    const planet = await db.query.celestialBodies.findFirst({
      where: eq(celestialBodies.name, 'Venus')
    });
    
    // Get atmosphere data (all layers up to 100km)
    let atmosphereLayers = [];
    if (planet) {
      atmosphereLayers = await db.query.atmosphericData.findMany({
        where: (fields, { and, eq, between }) => and(
          eq(fields.bodyId, planet.id),
          fields.altitude <= 100
        ),
        orderBy: [asc(atmosphericData.altitude)]
      });
    }
    
    // Get available vehicles
    const availableVehicles = await db.query.vehicles.findMany();
    
    console.log(`Loaded planet: ${planet?.name}, layers: ${atmosphereLayers.length}, vehicles: ${availableVehicles.length}`);
    
    return {
      planet,
      atmosphere: atmosphereLayers,
      vehicles: availableVehicles,
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
      atmosphere: [],
      vehicles: [],
      error: String(error)
    };
  }
}