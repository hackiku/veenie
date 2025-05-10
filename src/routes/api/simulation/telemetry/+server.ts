// src/routes/api/simulation/telemetry/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { probeTelemetry } from '$lib/server/db/schema';

export async function POST({ request }) {
	try {
		const { sessionId, data } = await request.json();

		if (!sessionId) {
			return json({
				success: false,
				error: 'No sessionId provided'
			}, { status: 400 });
		}

		// Insert telemetry point
		const telemetry = await db.insert(probeTelemetry)
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

		return json({
			success: true,
			telemetryId: telemetry[0].id
		});
	} catch (error) {
		console.error('Failed to record telemetry:', error);

		return json({
			success: false,
			error: String(error)
		}, { status: 500 });
	}
}