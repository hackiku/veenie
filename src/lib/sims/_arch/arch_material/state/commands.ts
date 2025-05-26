// src/lib/sims/material/state/commands.ts
import type { Vector3 } from 'three';

/**
 * All possible commands for the Venus Balloon simulation
 */
export type SimCommand =
	| { type: 'PLAY' }
	| { type: 'PAUSE' }
	| { type: 'RESET' }
	| { type: 'SET_WIND_ENABLED'; payload: boolean }
	| { type: 'SET_WIND_INTENSITY'; payload: number }
	| { type: 'SET_VEHICLE'; payload: string }
	| { type: 'SET_POSITION'; payload: [number, number, number] }
	| { type: 'SET_TIME_SCALE'; payload: number }
	| { type: 'SET_DEBUG'; payload: boolean }
	| { type: 'RECORD_TELEMETRY'; payload: Record<string, any> }
	| { type: 'START_SESSION' };

/**
 * Command dispatcher function type
 */
export type CommandDispatcher = (command: SimCommand) => void;

/**
 * Create command helpers for cleaner syntax
 */
export const Commands = {
	play: (): SimCommand => ({ type: 'PLAY' }),
	pause: (): SimCommand => ({ type: 'PAUSE' }),
	reset: (): SimCommand => ({ type: 'RESET' }),
	setWindEnabled: (enabled: boolean): SimCommand => ({
		type: 'SET_WIND_ENABLED',
		payload: enabled
	}),
	setWindIntensity: (intensity: number): SimCommand => ({
		type: 'SET_WIND_INTENSITY',
		payload: intensity
	}),
	setVehicle: (vehicleName: string): SimCommand => ({
		type: 'SET_VEHICLE',
		payload: vehicleName
	}),
	setPosition: (position: [number, number, number]): SimCommand => ({
		type: 'SET_POSITION',
		payload: position
	}),
	setTimeScale: (scale: number): SimCommand => ({
		type: 'SET_TIME_SCALE',
		payload: scale
	}),
	setDebug: (debug: boolean): SimCommand => ({
		type: 'SET_DEBUG',
		payload: debug
	}),
	recordTelemetry: (data: Record<string, any>): SimCommand => ({
		type: 'RECORD_TELEMETRY',
		payload: data
	}),
	startSession: (): SimCommand => ({ type: 'START_SESSION' })
};