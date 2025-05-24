// src/lib/sims/balloon/context/physicsbridge.svelte.ts

import { getPhysicsEngine } from '../physics/engine';
import type { ControlCommand, ControlState } from './controls.svelte';

/**
 * Physics Bridge - Safely connects new control system to existing physics engine
 * 
 * This is a translation layer that:
 * 1. Takes clean control commands from the new system
 * 2. Translates them to the existing engine.setKeyState() calls
 * 3. Doesn't modify the complex physics engine (no risk of breaking it!)
 */
export class PhysicsBridge {
	private engine = getPhysicsEngine();
	private lastControlState: ControlState | null = null;

	/**
	 * Update physics engine based on control state changes
	 * This is called automatically by the control context
	 */
	updatePhysics(controlState: ControlState): void {
		// Skip if no changes (performance optimization)
		if (this.lastControlState && this.statesEqual(controlState, this.lastControlState)) {
			return;
		}

		// Translate movement controls to WASD key states
		this.updateMovementControls(controlState);

		// Translate balloon controls to key states
		this.updateBalloonControls(controlState);

		// Translate simulation controls
		this.updateSimulationControls(controlState);

		// Store last state for comparison
		this.lastControlState = JSON.parse(JSON.stringify(controlState));
	}

	/**
	 * Translate movement controls to engine key states
	 */
	private updateMovementControls(state: ControlState): void {
		// Convert analog movement values to boolean key states
		// The engine expects boolean key states, so we use thresholds
		const threshold = 0.1;

		this.engine.setKeyState('w', state.movement.z > threshold);   // Forward
		this.engine.setKeyState('s', state.movement.z < -threshold);  // Backward  
		this.engine.setKeyState('a', state.movement.x < -threshold);  // Left
		this.engine.setKeyState('d', state.movement.x > threshold);   // Right
	}

	/**
	 * Translate balloon controls to engine key states
	 */
	private updateBalloonControls(state: ControlState): void {
		const threshold = 0.1;

		this.engine.setKeyState('2', state.balloon.inflate > threshold);  // Inflate
		this.engine.setKeyState('1', state.balloon.deflate > threshold);  // Deflate
	}

	/**
	 * Translate simulation controls to engine calls
	 */
	private updateSimulationControls(state: ControlState): void {
		// Only update if pause state changed
		if (!this.lastControlState ||
			this.lastControlState.simulation.paused !== state.simulation.paused) {
			this.engine.setPaused(state.simulation.paused);
		}
	}

	/**
	 * Execute command through physics engine
	 * This handles special commands that don't map to continuous state
	 */
	executeCommand(command: ControlCommand): boolean {
		try {
			switch (command.type) {
				case 'sim.reset':
					this.engine.reset();
					break;

				case 'sim.step':
					if (this.lastControlState?.simulation.paused) {
						this.engine.setSingleStep(true);
					}
					break;

				// Movement and balloon commands are handled by updatePhysics()
				default:
					// Most commands are handled by the continuous state updates
					return true;
			}

			return true;
		} catch (error) {
			console.error('Physics bridge command error:', error);
			return false;
		}
	}

	/**
	 * Compare two control states for equality (performance optimization)
	 */
	private statesEqual(a: ControlState, b: ControlState): boolean {
		return a.movement.x === b.movement.x &&
			a.movement.z === b.movement.z &&
			a.balloon.inflate === b.balloon.inflate &&
			a.balloon.deflate === b.balloon.deflate &&
			a.simulation.paused === b.simulation.paused &&
			a.simulation.timeScale === b.simulation.timeScale;
	}

	/**
	 * Get physics engine reference (for legacy compatibility)
	 */
	getEngine() {
		return this.engine;
	}
}

// Singleton instance - ensures we have one bridge per physics engine
let bridgeInstance: PhysicsBridge | null = null;

export function getPhysicsBridge(): PhysicsBridge {
	if (!bridgeInstance) {
		bridgeInstance = new PhysicsBridge();
	}
	return bridgeInstance;
}