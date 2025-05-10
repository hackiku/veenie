// src/routes/api/simulation/session/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { simSessions } from '$lib/server/db/schema';

export async function POST({ request }) {
	try {
		const { userId, settings } = await request.json();

		// Insert new simulation session
		const sessions = await db.insert(simSessions)
			.values({
				userId: userId || null,
				settings: settings,
				startedAt: new Date()
			})
			.returning();

		return json({
			success: true,
			sessionId: sessions[0].id
		});
	} catch (error) {
		console.error('Failed to create simulation session:', error);

		return json({
			success: false,
			error: String(error)
		}, { status: 500 });
	}
}