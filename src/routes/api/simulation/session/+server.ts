// src/routes/api/simulation/session/+server.ts

import { json } from '@sveltejs/kit';
import { recordSimulationSession } from '$lib/server/db/simulation-services';

export async function POST({ request }) {
	try {
		const { userId, settings } = await request.json();

		const session = await recordSimulationSession(userId, settings);

		return json({
			success: true,
			sessionId: session.id
		});
	} catch (error) {
		console.error('Failed to create simulation session:', error);

		return json({
			success: false,
			error: String(error)
		}, { status: 500 });
	}
}