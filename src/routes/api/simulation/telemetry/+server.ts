// src/routes/api/simulation/telemetry/+server.ts
import { json } from '@sveltejs/kit';
import { recordTelemetryPoint } from '$lib/server/db/simulation-services';

export async function POST({ request }) {
	try {
		const { sessionId, data } = await request.json();

		if (!sessionId) {
			return json({
				success: false,
				error: 'No sessionId provided'
			}, { status: 400 });
		}

		const telemetry = await recordTelemetryPoint(sessionId, data);

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