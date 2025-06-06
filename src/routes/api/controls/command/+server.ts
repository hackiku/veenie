// src/routes/api/controls/command/+server.ts

import { json } from '@sveltejs/kit';
import type { ControlCommand } from '$lib/sims/balloon/context/controls.svelte';

// In-memory store for active sessions
const activeSessions = new Map<string, {
	sessionId: string;
	lastCommand: number;
	commandQueue: ControlCommand[];
}>();

/**
 * POST /api/controls/command
 * Execute a control command for a specific session
 */
export async function POST({ request }) {
	try {
		const { sessionId, command } = await request.json();

		// Validate session ID
		if (!sessionId || typeof sessionId !== 'string') {
			return json({
				success: false,
				error: 'Invalid or missing sessionId'
			}, { status: 400 });
		}

		// Validate command structure
		if (!command || !command.type) {
			return json({
				success: false,
				error: 'Invalid command structure. Must include type field.'
			}, { status: 400 });
		}

		// Enhanced validation for new command types
		const validationResult = validateCommand(command);
		if (!validationResult.valid) {
			return json({
				success: false,
				error: `Invalid command: ${validationResult.error}`
			}, { status: 400 });
		}

		// Get or create session
		let session = activeSessions.get(sessionId);
		if (!session) {
			session = {
				sessionId,
				lastCommand: 0,
				commandQueue: []
			};
			activeSessions.set(sessionId, session);
		}

		// Add command to queue
		session.commandQueue.push(command);
		session.lastCommand = Date.now();

		// Keep only last 10 commands per session
		if (session.commandQueue.length > 10) {
			session.commandQueue = session.commandQueue.slice(-10);
		}

		// Log successful command for debugging
		console.log(`Command queued for ${sessionId}:`, command);

		return json({
			success: true,
			sessionId,
			commandId: `${sessionId}-${Date.now()}`,
			queueLength: session.commandQueue.length
		});

	} catch (error) {
		console.error('Control API error:', error);
		return json({
			success: false,
			error: 'Internal server error'
		}, { status: 500 });
	}
}

/**
 * GET /api/controls/command?sessionId=xxx
 * Get pending commands for a session (polling endpoint)
 */
export async function GET({ url }) {
	try {
		const sessionId = url.searchParams.get('sessionId');

		if (!sessionId) {
			return json({
				success: false,
				error: 'Missing sessionId parameter'
			}, { status: 400 });
		}

		const session = activeSessions.get(sessionId);
		if (!session) {
			return json({
				success: true,
				commands: [],
				sessionExists: false
			});
		}

		// Return all pending commands and clear the queue
		const commands = [...session.commandQueue];
		session.commandQueue = [];

		// Log command delivery for debugging
		if (commands.length > 0) {
			console.log(`Delivering ${commands.length} commands to ${sessionId}`);
		}

		return json({
			success: true,
			commands,
			sessionExists: true,
			lastCommand: session.lastCommand
		});

	} catch (error) {
		console.error('Control API error:', error);
		return json({
			success: false,
			error: 'Internal server error'
		}, { status: 500 });
	}
}

/**
 * Enhanced validation for all command types including yaw
 */
function validateCommand(command: any): { valid: boolean; error?: string } {
	switch (command.type) {
		case 'balloon.inflate':
		case 'balloon.deflate':
			if (typeof command.intensity !== 'number') {
				return { valid: false, error: 'intensity must be a number' };
			}
			if (command.intensity < 0 || command.intensity > 1) {
				return { valid: false, error: 'intensity must be between 0 and 1' };
			}
			break;

		case 'balloon.move':
			if (!command.direction || typeof command.direction !== 'object') {
				return { valid: false, error: 'move command requires direction object' };
			}
			if (typeof command.direction.x !== 'number' || typeof command.direction.z !== 'number') {
				return { valid: false, error: 'direction.x and direction.z must be numbers' };
			}
			if (Math.abs(command.direction.x) > 1 || Math.abs(command.direction.z) > 1) {
				return { valid: false, error: 'direction values must be between -1 and 1' };
			}
			// Optional sensitivity validation
			if (command.sensitivity !== undefined) {
				if (typeof command.sensitivity !== 'number' || command.sensitivity < 0.1 || command.sensitivity > 2.0) {
					return { valid: false, error: 'sensitivity must be a number between 0.1 and 2.0' };
				}
			}
			break;

		case 'balloon.yaw':
			if (typeof command.direction !== 'number') {
				return { valid: false, error: 'yaw command requires direction number' };
			}
			if (Math.abs(command.direction) > 1) {
				return { valid: false, error: 'yaw direction must be between -1 and 1' };
			}
			// Optional sensitivity validation
			if (command.sensitivity !== undefined) {
				if (typeof command.sensitivity !== 'number' || command.sensitivity < 0.1 || command.sensitivity > 2.0) {
					return { valid: false, error: 'yaw sensitivity must be a number between 0.1 and 2.0' };
				}
			}
			break;

		case 'sim.pause':
		case 'sim.play':
		case 'sim.reset':
		case 'sim.step':
			// These commands have no additional parameters to validate
			break;

		default:
			return { valid: false, error: `Unknown command type: ${command.type}` };
	}

	return { valid: true };
}

// Clean up old sessions periodically (run every 5 minutes)
if (typeof setInterval !== 'undefined') {
	setInterval(() => {
		const now = Date.now();
		const fiveMinutesAgo = now - (5 * 60 * 1000);

		for (const [sessionId, session] of activeSessions.entries()) {
			if (session.lastCommand < fiveMinutesAgo) {
				activeSessions.delete(sessionId);
				console.log(`Cleaned up inactive session: ${sessionId}`);
			}
		}
	}, 5 * 60 * 1000);
}