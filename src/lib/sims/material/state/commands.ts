// src/lib/sims/material/state/commands.ts

/**
 * Command types for the simulation
 */
export enum CommandType {
	// Time controls
	PLAY = 'PLAY',
	PAUSE = 'PAUSE',
	TOGGLE_PAUSE = 'TOGGLE_PAUSE',
	SET_TIME_SCALE = 'SET_TIME_SCALE',
	RESET = 'RESET',

	// Balloon controls
	DEPLOY_BALLOON = 'DEPLOY_BALLOON',
	SET_BALLOON_BUOYANCY = 'SET_BALLOON_BUOYANCY',
	UPDATE_POSITION = 'UPDATE_POSITION',
	UPDATE_VELOCITY = 'UPDATE_VELOCITY',

	// Environment controls
	SET_WIND_ENABLED = 'SET_WIND_ENABLED',
	SET_WIND_INTENSITY = 'SET_WIND_INTENSITY',

	// Debug controls
	SET_DEBUG = 'SET_DEBUG',

	// Session control
	START_SESSION = 'START_SESSION',
	END_SESSION = 'END_SESSION'
}

/**
 * Interface for a command
 */
export interface Command {
	type: CommandType;
	payload?: any;
}

/**
 * Create a command dispatcher
 * 
 * @param api - Command API from simulation context
 * @returns Command dispatcher
 */
export function createCommandDispatcher(api: any) {
	// Register handlers for each command type
	const handlers: Record<CommandType, (payload?: any) => void> = {
		[CommandType.PLAY]: () => api.play(),
		[CommandType.PAUSE]: () => api.pause(),
		[CommandType.TOGGLE_PAUSE]: () => api.togglePause(),
		[CommandType.SET_TIME_SCALE]: (payload) => api.setTimeScale(payload),
		[CommandType.RESET]: () => api.reset(),

		[CommandType.DEPLOY_BALLOON]: (payload) =>
			api.deployBalloon(payload.vehicleName, payload.position),
		[CommandType.SET_BALLOON_BUOYANCY]: (payload) =>
			api.setBalloonBuoyancy(payload.amount),
		[CommandType.UPDATE_POSITION]: (payload) =>
			api.updatePosition(payload),
		[CommandType.UPDATE_VELOCITY]: (payload) =>
			api.updateVelocity(payload),

		[CommandType.SET_WIND_ENABLED]: (payload) =>
			api.setWindEnabled(payload),
		[CommandType.SET_WIND_INTENSITY]: (payload) =>
			api.setWindIntensity(payload),

		[CommandType.SET_DEBUG]: (payload) =>
			api.setDebug(payload),

		[CommandType.START_SESSION]: () => api.startSession(),
		[CommandType.END_SESSION]: () => api.endSession()
	};

	// Dispatch a command
	function dispatch(command: Command): void {
		const handler = handlers[command.type];
		if (handler) {
			handler(command.payload);
		} else {
			console.warn(`No handler for command: ${command.type}`);
		}
	}

	return {
		dispatch
	};
}