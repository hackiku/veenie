// src/lib/sims/balloon/physics/engine.ts - Minimal version
import type { RigidBody } from '@threlte/rapier';
import { SIMULATION_CONSTANTS } from '../constants';
import { BalloonPhysics, type BalloonTelemetry } from './balloon';
import { CloudSystem } from './clouds';

export class PhysicsEngine {
	// Systems
	private balloonPhysics: BalloonPhysics;
	private cloudSystem: CloudSystem;

	// State
	private paused: boolean = false;
	private singleStep: boolean = false;

	constructor() {
		console.log("PhysicsEngine initializing");

		// Initialize balloon physics
		this.balloonPhysics = new BalloonPhysics({
			initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
			minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
			maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
			gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
			controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
			gravity: SIMULATION_CONSTANTS.GRAVITY
		});

		// Initialize cloud system
		this.cloudSystem = new CloudSystem();
	}

	// Register the balloon rigid body
	registerBalloon(body: RigidBody): void {
		console.log("Registering balloon rigid body");
		this.balloonPhysics.setRigidBody(body);
	}

	// Register a cloud rigid body
	registerCloud(index: number, body: RigidBody): void {
		this.cloudSystem.setCloudRef(index, body);
	}

	// Get balloon telemetry for UI
	getTelemetry(): BalloonTelemetry {
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

	// Set simulation state
	setPaused(paused: boolean): void {
		this.paused = paused;
		this.cloudSystem.setPaused(paused);
	}

	setSingleStep(singleStep: boolean): void {
		this.singleStep = singleStep;
	}

	// Handle keyboard input - DIRECT MAPPING
	setKeyState(key: string, pressed: boolean): void {
		const keyLower = key.toLowerCase();

		switch (keyLower) {
			case 'w':
				this.balloonPhysics.setControls({ moveZ: pressed ? 1 : 0 });
				break;
			case 's':
				this.balloonPhysics.setControls({ moveZ: pressed ? -1 : 0 });
				break;
			case 'a':
				this.balloonPhysics.setControls({ moveX: pressed ? -1 : 0 });
				break;
			case 'd':
				this.balloonPhysics.setControls({ moveX: pressed ? 1 : 0 });
				break;
			case ' ':
			case 'space':
				this.balloonPhysics.setControls({ inflate: pressed });
				break;
			case 'shift':
				this.balloonPhysics.setControls({ deflate: pressed });
				break;
			case '1':
				this.balloonPhysics.setControls({ deflate: pressed });
				break;
			case '2':
				this.balloonPhysics.setControls({ inflate: pressed });
				break;
		}
	}

	// Reset physics
	reset(): void {
		console.log("PhysicsEngine reset");

		this.balloonPhysics.reset({
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		});

		this.cloudSystem.reset();
	}

	// Made public for debug testing
	_getBalloonPhysics(): BalloonPhysics {
		return this.balloonPhysics;
	}

	// Main update method - called from useTask
	update(delta: number): void {
		// Skip if paused and not doing a single step
		if (this.paused && !this.singleStep) return;

		// Update balloon physics
		this.balloonPhysics.update(delta);

		// Update clouds
		this.cloudSystem.update(delta);

		// Reset single step flag
		this.singleStep = false;
	}
}

// Singleton instance
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

// For debugging in console
if (typeof window !== 'undefined') {
	(window as any).getPhysicsEngine = getPhysicsEngine;
}