// src/lib/server/db/simulation-services.ts

import { db } from './index';
import { celestialBodies, atmosphericData, vehicles, materials } from './schema';
import { eq, asc, desc, between } from 'drizzle-orm';

// Get planet data
export async function getPlanetData(name = 'Venus') {
	return db.query.celestialBodies.findFirst({
		where: eq(celestialBodies.name, name)
	});
}

// Get atmosphere data by altitude range
export async function getAtmosphereDataByRange(bodyName = 'Venus', minAlt = 0, maxAlt = 100) {
	const body = await db.query.celestialBodies.findFirst({
		where: eq(celestialBodies.name, bodyName)
	});

	if (!body) return [];

	return db.query.atmosphericData.findMany({
		where: (fields, { and, eq, between }) => and(
			eq(fields.bodyId, body.id),
			between(fields.altitude, minAlt, maxAlt)
		),
		orderBy: [asc(atmosphericData.altitude)]
	});
}

// Get vehicle by name
export async function getVehicleByName(name) {
	return db.query.vehicles.findFirst({
		where: eq(vehicles.name, name)
	});
}

// Get all available vehicles
export async function getAvailableVehicles() {
	return db.query.vehicles.findMany();
}

// Get all materials by category
export async function getMaterialsByCategory(category) {
	return db.query.materials.findMany({
		where: eq(materials.category, category)
	});
}

// Record simulation session
export async function recordSimulationSession(userId, settings) {
	const [session] = await db.insert(simSessions)
		.values({
			userId: userId || null,
			settings
		})
		.returning();

	return session;
}

// Record telemetry point
export async function recordTelemetryPoint(sessionId, data) {
	return db.insert(probeTelemetry)
		.values({
			sessionId,
			timestamp: new Date(),
			altitude: data.altitude,
			latitude: data.latitude || 0,
			longitude: data.longitude || 0,
			temperature: data.temperature || 0,
			pressure: data.pressure || 0,
			windSpeed: data.windSpeed || 0,
			status: data.status || 'ACTIVE'
		})
		.returning();
}