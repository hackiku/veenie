// src/lib/sims/balloon/context/controls.svelte.ts

import { setContext, getContext } from 'svelte';
import { getPhysicsBridge } from './physicsbridge.svelte';

// Context key - use a Symbol for guaranteed uniqueness
const CONTROL_CONTEXT_KEY = Symbol('balloon-controls');

/**
 * Control command types - expanded with yaw and sensitivity
 */
export type ControlCommand =
	| { type: 'balloon.inflate'; intensity: number }  // 0-1 intensity
	| { type: 'balloon.deflate'; intensity: number }  // 0-1 intensity  
	| { type: 'balloon.move'; direction: { x: number; z: number }; sensitivity?: number } // -1 to 1, optional sensitivity multiplier
	| { type: 'balloon.yaw'; direction: number; sensitivity?: number } // -1 to 1 (left/right)
	| { type: 'sim.pause' }
	| { type: 'sim.play' }
	| { type: 'sim.reset' }
	| { type: 'sim.step' };

/**
 * Control state - expanded with yaw and sensitivity
 */
export interface ControlState {
	// Movement controls (-1 to 1)
	movement: {
		x: number;  // left/right (A/D keys)
		z: number;  // forward/back (W/S keys)
		yaw: number; // rotation left/right (Q/E keys)
	};

	// Balloon controls (0 to 1)
	balloon: {
		inflate: number;   // 2 key or API
		deflate: number;   // 1 key or API
	};

	// Simulation state
	simulation: {
		paused: boolean;
		timeScale: number;
	};

	// Control sensitivity settings
	sensitivity: {
		movement: number;    // Base movement sensitivity (0.1 to 2.0)
		rotation: number;    // Yaw rotation sensitivity (0.1 to 2.0)
		balloon: number;     // Balloon control sensitivity (0.1 to 2.0)
	};

	// Last command timestamp (for debugging)
	lastCommand: number;
}

/**
 * Create the control context with enhanced analog controls
 */
export function createControlContext() {
	// Get physics bridge
	const physicsBridge = getPhysicsBridge();

	// Enhanced control state with sensitivity
	const controlState = $state<ControlState>({
		movement: { x: 0, z: 0, yaw: 0 },
		balloon: { inflate: 0, deflate: 0 },
		simulation: { paused: false, timeScale: 1.0 },
		sensitivity: {
			movement: 1.0,   // Default sensitivity
			rotation: 1.0,
			balloon: 1.0
		},
		lastCommand: 0
	});

	// Command history for debugging/replay
	const commandHistory = $state<ControlCommand[]>([]);

	/**
	 * Execute a control command with enhanced analog support
	 */
	function executeCommand(command: ControlCommand): boolean {
		try {
			// Update timestamp
			controlState.lastCommand = Date.now();

			// Add to history
			commandHistory.push(command);
			if (commandHistory.length > 100) {
				commandHistory.shift();
			}

			// Process the command with sensitivity support
			switch (command.type) {
				case 'balloon.inflate':
					controlState.balloon.inflate = Math.max(0, Math.min(1,
						command.intensity * controlState.sensitivity.balloon
					));
					break;

				case 'balloon.deflate':
					controlState.balloon.deflate = Math.max(0, Math.min(1,
						command.intensity * controlState.sensitivity.balloon
					));
					break;

				case 'balloon.move':
					const moveSensitivity = command.sensitivity || controlState.sensitivity.movement;
					controlState.movement.x = Math.max(-1, Math.min(1,
						command.direction.x * moveSensitivity
					));
					controlState.movement.z = Math.max(-1, Math.min(1,
						command.direction.z * moveSensitivity
					));
					break;

				case 'balloon.yaw':
					const yawSensitivity = command.sensitivity || controlState.sensitivity.rotation;
					controlState.movement.yaw = Math.max(-1, Math.min(1,
						command.direction * yawSensitivity
					));
					break;

				case 'sim.pause':
					controlState.simulation.paused = true;
					break;

				case 'sim.play':
					controlState.simulation.paused = false;
					break;

				case 'sim.reset':
					// Reset all controls to neutral
					controlState.movement = { x: 0, z: 0, yaw: 0 };
					controlState.balloon = { inflate: 0, deflate: 0 };
					controlState.simulation.paused = false;
					physicsBridge.executeCommand(command);
					break;

				case 'sim.step':
					physicsBridge.executeCommand(command);
					break;

				default:
					console.warn('Unknown control command:', command);
					return false;
			}

			// Update physics engine through the bridge
			physicsBridge.updatePhysics(controlState);

			return true;
		} catch (error) {
			console.error('Failed to execute control command:', error);
			return false;
		}
	}

	/**
	 * Enhanced convenience methods with sensitivity support
	 */
	const actions = {
		// Balloon controls
		startInflate: (intensity = 1) => executeCommand({ type: 'balloon.inflate', intensity }),
		stopInflate: () => executeCommand({ type: 'balloon.inflate', intensity: 0 }),
		startDeflate: (intensity = 1) => executeCommand({ type: 'balloon.deflate', intensity }),
		stopDeflate: () => executeCommand({ type: 'balloon.deflate', intensity: 0 }),

		// Movement controls with optional sensitivity
		move: (x: number, z: number, sensitivity?: number) => executeCommand({
			type: 'balloon.move',
			direction: { x, z },
			sensitivity
		}),
		stopMovement: () => executeCommand({
			type: 'balloon.move',
			direction: { x: 0, z: 0 }
		}),

		// Yaw controls
		yaw: (direction: number, sensitivity?: number) => executeCommand({
			type: 'balloon.yaw',
			direction,
			sensitivity
		}),
		stopYaw: () => executeCommand({
			type: 'balloon.yaw',
			direction: 0
		}),

		// Simulation controls
		pause: () => executeCommand({ type: 'sim.pause' }),
		play: () => executeCommand({ type: 'sim.play' }),
		reset: () => executeCommand({ type: 'sim.reset' }),
		step: () => executeCommand({ type: 'sim.step' }),

		// Toggle pause
		togglePause: () => {
			if (controlState.simulation.paused) {
				actions.play();
			} else {
				actions.pause();
			}
		},

		// Sensitivity adjustment methods
		setSensitivity: (type: 'movement' | 'rotation' | 'balloon', value: number) => {
			controlState.sensitivity[type] = Math.max(0.1, Math.min(2.0, value));
		},

		// Preset sensitivity profiles for different "thrust" profiles
		setThrustProfile: (profile: 'gentle' | 'normal' | 'aggressive') => {
			switch (profile) {
				case 'gentle':
					controlState.sensitivity.movement = 0.3;
					controlState.sensitivity.rotation = 0.4;
					controlState.sensitivity.balloon = 0.5;
					break;
				case 'normal':
					controlState.sensitivity.movement = 1.0;
					controlState.sensitivity.rotation = 1.0;
					controlState.sensitivity.balloon = 1.0;
					break;
				case 'aggressive':
					controlState.sensitivity.movement = 1.8;
					controlState.sensitivity.rotation = 1.6;
					controlState.sensitivity.balloon = 1.5;
					break;
			}
		}
	};

	/**
	 * Enhanced status with yaw info
	 */
	const status = $derived({
		isMoving: controlState.movement.x !== 0 || controlState.movement.z !== 0,
		isRotating: controlState.movement.yaw !== 0,
		isBalloonActive: controlState.balloon.inflate > 0 || controlState.balloon.deflate > 0,
		isPaused: controlState.simulation.paused,
		commandCount: commandHistory.length,
		sensitivity: { ...controlState.sensitivity }
	});

	// Create the context API
	const context = {
		// State (readonly for external access)
		get state() { return controlState; },
		get status() { return status; },
		get history() { return [...commandHistory]; },

		// Methods
		executeCommand,
		actions
	};

	// Set context for child components
	setContext(CONTROL_CONTEXT_KEY, context);

	return context;
}

/**
 * Get the control context
 */
export function getControlContext() {
	const context = getContext(CONTROL_CONTEXT_KEY);
	if (!context) {
		throw new Error('Control context not found. Make sure createControlContext() is called in a parent component.');
	}
	return context;
}

export type ControlContextType = ReturnType<typeof createControlContext>;