// src/lib/sims/balloon/physics/engine.ts

import type { RigidBody } from '@threlte/rapier';
import { BalloonPhysics } from './balloon';
import { CloudSystem } from './clouds';
import { SIMULATION_CONSTANTS } from '../constants';

export class PhysicsEngine {
	// Systems
	private balloonPhysics: BalloonPhysics;
	private cloudSystem: CloudSystem;

	// State
	private paused: boolean = false;
	private singleStep: boolean = false;

	constructor() {
		// Initialize systems
		this.balloonPhysics = new BalloonPhysics({
			initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
			minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
			maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
			gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
			controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
			gravity: SIMULATION_CONSTANTS.GRAVITY
		});

		this.cloudSystem = new CloudSystem(
			SIMULATION_CONSTANTS.TERRAIN_SIZE,
			SIMULATION_CONSTANTS.CLOUD_LAYER_HEIGHT
		);
	}

	// Register the balloon rigid body
	registerBalloon(body: RigidBody): void {
		this.balloonPhysics.setRigidBody(body);
	}

	// Register a cloud rigid body
	registerCloud(index: number, body: RigidBody): void {
		this.cloudSystem.setCloudRef(index, body);
	}

	// Set simulation state
	setPaused(paused: boolean): void {
		this.paused = paused;
	}

	setSingleStep(singleStep: boolean): void {
		this.singleStep = singleStep;
	}

	// Get balloon telemetry
	getBalloonTelemetry() {
		return this.balloonPhysics.getTelemetry();
	}

	// Get balloon size for rendering
	getBalloonSize(): number {
		return this.balloonPhysics.getBalloonSize();
	}

	// Get cloud data for rendering
	getCloudData() {
		return this.cloudSystem.getClouds();
	}

	// Update controls
	setKeyState(key: string, pressed: boolean): void {
		// Map keys to balloon controls
		if (key === 'w' || key === 'W') {
			this.balloonPhysics.setControls({ moveX: pressed ? 1 : 0 });
		}
		if (key === 's' || key === 'S') {
			this.balloonPhysics.setControls({ moveX: pressed ? -1 : 0 });
		}
		if (key === 'a' || key === 'A') {
			this.balloonPhysics.setControls({ moveZ: pressed ? -1 : 0 });
		}
		if (key === 'd' || key === 'D') {
			this.balloonPhysics.setControls({ moveZ: pressed ? 1 : 0 });
		}
		if (key === '1') {
			this.balloonPhysics.setControls({ deflate: pressed });
		}
		if (key === '2') {
			this.balloonPhysics.setControls({ inflate: pressed });
		}
	}

	// Reset entire simulation
	reset(): void {
		this.balloonPhysics.reset({
			x: 0,
			y: SIMULATION_CONSTANTS.TERRAIN_HEIGHT + SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		});
		this.cloudSystem.reset();
	}

	// Main update method - called from useTask
	update(delta: number): void {
		// Skip if paused and not doing a single step
		if (this.paused && !this.singleStep) return;

		// Update physics systems
		this.balloonPhysics.update(delta);
		this.cloudSystem.update(delta);

		// Reset single step flag
		this.singleStep = false;
	}
}

// Singleton instance for convenience
let engineInstance: PhysicsEngine | null = null;

export function getPhysicsEngine(): PhysicsEngine {
	if (!engineInstance) {
		engineInstance = new PhysicsEngine();
	}
	return engineInstance;
}

export function resetPhysicsEngine(): void {
	if (engineInstance) {
		engineInstance.reset();
	}
}