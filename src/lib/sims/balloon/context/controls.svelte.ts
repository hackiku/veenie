// src/lib/sims/balloon/context/controls.svelte.ts

import { setContext, getContext } from 'svelte';
import { getPhysicsBridge } from './physicsbridge.svelte';

// Context key - use a Symbol for guaranteed uniqueness
const CONTROL_CONTEXT_KEY = Symbol('balloon-controls');

/**
 * Control command types - this is our "vocabulary" for all control systems
 */
export type ControlCommand =
	| { type: 'balloon.inflate'; intensity: number }  // 0-1 intensity
	| { type: 'balloon.deflate'; intensity: number }  // 0-1 intensity  
	| { type: 'balloon.move'; direction: { x: number; z: number } } // -1 to 1
	| { type: 'sim.pause' }
	| { type: 'sim.play' }
	| { type: 'sim.reset' }
	| { type: 'sim.step' };

/**
 * Control state - what the current control inputs are
 */
export interface ControlState {
	// Movement controls (-1 to 1)
	movement: {
		x: number;  // left/right (A/D keys)
		z: number;  // forward/back (W/S keys)
	};

	// Balloon controls (0 to 1)
	balloon: {
		inflate: number;   // 2 key or API
		deflate: number;   // 1 key or Shift or API
	};

	// Simulation state
	simulation: {
		paused: boolean;
		timeScale: number;
	};

	// Last command timestamp (for debugging)
	lastCommand: number;
}

/**
 * Create the control context - this is the "air traffic control tower"
 */
export function createControlContext() {
	// Get physics bridge (this safely connects to your existing engine)
	const physicsBridge = getPhysicsBridge();

	// RUNE PATTERN 1: $state creates reactive state
	// This automatically triggers updates when changed
	const controlState = $state<ControlState>({
		movement: { x: 0, z: 0 },
		balloon: { inflate: 0, deflate: 0 },
		simulation: { paused: false, timeScale: 1.0 },
		lastCommand: 0
	});

	// Command history for debugging/replay (optional)
	const commandHistory = $state<ControlCommand[]>([]);

	/**
	 * Execute a control command - this is our single entry point
	 * ALL control inputs go through this function
	 */
	function executeCommand(command: ControlCommand): boolean {
		try {
			// Update timestamp
			controlState.lastCommand = Date.now();

			// Add to history (keep last 100 commands)
			commandHistory.push(command);
			if (commandHistory.length > 100) {
				commandHistory.shift();
			}

			// Process the command
			switch (command.type) {
				case 'balloon.inflate':
					controlState.balloon.inflate = Math.max(0, Math.min(1, command.intensity));
					break;

				case 'balloon.deflate':
					controlState.balloon.deflate = Math.max(0, Math.min(1, command.intensity));
					break;

				case 'balloon.move':
					controlState.movement.x = Math.max(-1, Math.min(1, command.direction.x));
					controlState.movement.z = Math.max(-1, Math.min(1, command.direction.z));
					break;

				case 'sim.pause':
					controlState.simulation.paused = true;
					break;

				case 'sim.play':
					controlState.simulation.paused = false;
					break;

				case 'sim.reset':
					// Reset all controls to neutral
					controlState.movement = { x: 0, z: 0 };
					controlState.balloon = { inflate: 0, deflate: 0 };
					controlState.simulation.paused = false;
					// Let the bridge handle the engine reset
					physicsBridge.executeCommand(command);
					break;

				case 'sim.step':
					// Let the bridge handle stepping
					physicsBridge.executeCommand(command);
					break;

				default:
					console.warn('Unknown control command:', command);
					return false;
			}

			// Update physics engine through the bridge (this is the key integration!)
			physicsBridge.updatePhysics(controlState);

			return true;
		} catch (error) {
			console.error('Failed to execute control command:', error);
			return false;
		}
	}

	/**
	 * Convenience methods for common operations
	 * These make it easier for UI components to send commands
	 */
	const actions = {
		// Balloon controls
		startInflate: () => executeCommand({ type: 'balloon.inflate', intensity: 1 }),
		stopInflate: () => executeCommand({ type: 'balloon.inflate', intensity: 0 }),
		startDeflate: () => executeCommand({ type: 'balloon.deflate', intensity: 1 }),
		stopDeflate: () => executeCommand({ type: 'balloon.deflate', intensity: 0 }),

		// Movement controls
		move: (x: number, z: number) => executeCommand({
			type: 'balloon.move',
			direction: { x, z }
		}),
		stopMovement: () => executeCommand({
			type: 'balloon.move',
			direction: { x: 0, z: 0 }
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
		}
	};

	/**
	 * RUNE PATTERN 2: $derived creates computed values
	 * This automatically recalculates when dependencies change
	 */
	const status = $derived({
		isMoving: controlState.movement.x !== 0 || controlState.movement.z !== 0,
		isBalloonActive: controlState.balloon.inflate > 0 || controlState.balloon.deflate > 0,
		isPaused: controlState.simulation.paused,
		commandCount: commandHistory.length
	});

	// Create the context API
	const context = {
		// State (readonly for external access)
		get state() { return controlState; },
		get status() { return status; },
		get history() { return [...commandHistory]; }, // Return copy to prevent mutations

		// Methods
		executeCommand,
		actions
	};

	// Set context for child components
	setContext(CONTROL_CONTEXT_KEY, context);

	return context;
}

/**
 * Get the control context - use this in child components
 */
export function getControlContext() {
	const context = getContext(CONTROL_CONTEXT_KEY);
	if (!context) {
		throw new Error('Control context not found. Make sure createControlContext() is called in a parent component.');
	}
	return context;
}

/**
 * Type helper for external API
 */
export type ControlContextType = ReturnType<typeof createControlContext>;