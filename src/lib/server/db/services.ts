// src/lib/server/db/services.ts
import { db } from './index';
import { celestialBodies, atmosphericData, vehicles, materials, missions } from './schema';
import { eq, desc, asc, between } from 'drizzle-orm';

// Celestial bodies (e.g., Venus)
export async function getCelestialBody(name: string) {
	return db.query.celestialBodies.findFirst({
		where: eq(celestialBodies.name, name)
	});
}

export async function createOrUpdateCelestialBody(name: string, type: string, data: any) {
	const existing = await getCelestialBody(name);

	if (existing) {
		return db.update(celestialBodies)
			.set({ type, data })
			.where(eq(celestialBodies.id, existing.id))
			.returning();
	} else {
		return db.insert(celestialBodies)
			.values({ name, type, data })
			.returning();
	}
}

// Atmospheric data
export async function getAtmosphericData(bodyName: string, minAlt: number, maxAlt: number) {
	const body = await getCelestialBody(bodyName);
	if (!body) return [];

	return db.query.atmosphericData.findMany({
		where: (fields, { and, eq, between }) => and(
			eq(fields.bodyId, body.id),
			between(fields.altitude, minAlt, maxAlt)
		),
		orderBy: [asc(atmosphericData.altitude)]
	});
}

export async function addAtmosphericDataPoint(bodyName: string, altitude: number, data: any) {
	const body = await getCelestialBody(bodyName);
	if (!body) throw new Error(`Body not found: ${bodyName}`);

	return db.insert(atmosphericData)
		.values({ bodyId: body.id, altitude, data })
		.returning();
}

// Flexible query function for any table
export async function getAll(table: any) {
	return db.select().from(table);
}

export async function getById(table: any, id: number) {
	return db.select().from(table).where(eq(table.id, id));
}

export async function insertIntoTable(table: any, data: any) {
	return db.insert(table).values(data).returning();
}

export async function updateInTable(table: any, id: number, data: any) {
	return db.update(table).set(data).where(eq(table.id, id)).returning();
}

export async function deleteFromTable(table: any, id: number) {
	return db.delete(table).where(eq(table.id, id));
}