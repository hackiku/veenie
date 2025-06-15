// src/lib/sims/balloon/context/physicsbridge.svelte.ts

import { getPhysicsEngine } from '../physics/engine';
import type { PhysicsEngine } from '../physics/engine';
import type { ControlCommand, ControlState } from './controls.svelte';

/**
 * Enhanced Physics Bridge with analog controls and yaw support
 */
export class PhysicsBridge {
	private engine = getPhysicsEngine();
	private lastControlState: ControlState | null = null;

	/**
	 * Update physics engine with enhanced analog control support
	 */
	updatePhysics(controlState: ControlState): void {
		// Skip if no changes (performance optimization)
		if (this.lastControlState && this.statesEqual(controlState, this.lastControlState)) {
			return;
		}

		// Update all control systems
		this.updateMovementControls(controlState);
		this.updateYawControls(controlState);
		this.updateBalloonControls(controlState);
		this.updateSimulationControls(controlState);

		// Store last state for comparison
		this.lastControlState = JSON.parse(JSON.stringify(controlState));
	}

	/**
	 * Enhanced movement controls with analog sensitivity
	 */
	private updateMovementControls(state: ControlState): void {
		// Use much lower threshold for analog controls
		const threshold = 0.01;

		// The balloon physics expects analog values, so we pass the actual values
		// instead of converting to boolean
		if (this.engine.setAnalogControl) {
			// If engine supports analog controls directly
			this.engine.setAnalogControl('moveX', state.movement.x);
			this.engine.setAnalogControl('moveZ', state.movement.z);
		} else {
			// Fallback to existing key-based system but with variable intensity
			// This maintains compatibility with current balloon physics
			this.engine.setKeyState('w', state.movement.z > threshold);
			this.engine.setKeyState('s', state.movement.z < -threshold);
			this.engine.setKeyState('a', state.movement.x < -threshold);
			this.engine.setKeyState('d', state.movement.x > threshold);

			// If balloon physics supports setting control intensity
			if (this.engine.setControlIntensity) {
				this.engine.setControlIntensity('moveX', Math.abs(state.movement.x));
				this.engine.setControlIntensity('moveZ', Math.abs(state.movement.z));
			}
		}
	}

	/**
	 * New yaw controls for rotation
	 */
	private updateYawControls(state: ControlState): void {
		const threshold = 0.01;

		if (this.engine.setAnalogControl) {
			// Direct analog yaw control
			this.engine.setAnalogControl('yaw', state.movement.yaw);
		} else {
			// Fallback to Q/E key simulation
			this.engine.setKeyState('q', state.movement.yaw < -threshold);
			this.engine.setKeyState('e', state.movement.yaw > threshold);

			// Set yaw intensity if supported
			if (this.engine.setControlIntensity) {
				this.engine.setControlIntensity('yaw', Math.abs(state.movement.yaw));
			}
		}
	}

	/**
	 * Enhanced balloon controls with analog intensity
	 */
	private updateBalloonControls(state: ControlState): void {
		const threshold = 0.01;

		if (this.engine.setAnalogControl) {
			// Direct analog balloon controls
			this.engine.setAnalogControl('inflate', state.balloon.inflate);
			this.engine.setAnalogControl('deflate', state.balloon.deflate);
		} else {
			// Existing boolean system
			this.engine.setKeyState('2', state.balloon.inflate > threshold);
			this.engine.setKeyState('1', state.balloon.deflate > threshold);

			// Set balloon intensity if supported
			if (this.engine.setControlIntensity) {
				this.engine.setControlIntensity('inflate', state.balloon.inflate);
				this.engine.setControlIntensity('deflate', state.balloon.deflate);
			}
		}
	}

	/**
	 * Simulation controls (unchanged)
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
	 * Enhanced state comparison including yaw
	 */
	private statesEqual(a: ControlState, b: ControlState): boolean {
		return a.movement.x === b.movement.x &&
			a.movement.z === b.movement.z &&
			a.movement.yaw === b.movement.yaw &&
			a.balloon.inflate === b.balloon.inflate &&
			a.balloon.deflate === b.balloon.deflate &&
			a.simulation.paused === b.simulation.paused &&
			a.simulation.timeScale === b.simulation.timeScale &&
			a.sensitivity.movement === b.sensitivity.movement &&
			a.sensitivity.rotation === b.sensitivity.rotation &&
			a.sensitivity.balloon === b.sensitivity.balloon;
	}

	/**
	 * Get physics engine reference
	 */
	getEngine() {
		return this.engine;
	}

	/**
	 * Add method to check if engine supports enhanced controls
	 */
	supportsAnalogControls(): boolean {
		return typeof this.engine.setAnalogControl === 'function';
	}

	/**
	 * Add method to check if engine supports control intensity
	 */
	supportsControlIntensity(): boolean {
		return typeof this.engine.setControlIntensity === 'function';
	}
}

// Singleton instance
let bridgeInstance: PhysicsBridge | null = null;

export function getPhysicsBridge(): PhysicsBridge {
	if (!bridgeInstance) {
		bridgeInstance = new PhysicsBridge();
	}
	return bridgeInstance;
}