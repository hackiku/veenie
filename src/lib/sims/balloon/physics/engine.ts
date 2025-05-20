// src/lib/sims/balloon/physics/engine.ts (modified for time system)

import { SIMULATION_CONSTANTS } from '../constants';
import type { Vector3 } from 'three';
import { BalloonPhysics, type BalloonTelemetry } from './balloon';
import { CloudSystem } from './clouds';
import type { TimeUnit } from '$lib/contexts/time.svelte';

// Simple 3D vector operations
export interface Vec3 {
	x: number;
	y: number;
	z: number;
}

export function vec3Add(a: Vec3, b: Vec3): Vec3 {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
		z: a.z + b.z
	};
}

export function vec3Scale(v: Vec3, scalar: number): Vec3 {
	return {
		x: v.x * scalar,
		y: v.y * scalar,
		z: v.z * scalar
	};
}

export function vec3Length(v: Vec3): number {
	return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export class PhysicsEngine {
	// Systems
	private balloonPhysics: BalloonPhysics;
	private cloudSystem: CloudSystem;

	// Global state
	private paused: boolean = false;
	private singleStep: boolean = false;
	private timeSystem: any = null; // Reference to time system

	constructor() {
		console.log("Custom PhysicsEngine initializing in metric system");

		// Initialize balloon physics with metric values
		this.balloonPhysics = new BalloonPhysics({
			initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
			minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
			maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
			gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
			controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
			gravity: SIMULATION_CONSTANTS.GRAVITY
		});

		// Initialize cloud system
		this.cloudSystem = new CloudSystem(50);
	}

	// Connect to time system
	setTimeSystem(timeSystem: any): void {
		this.timeSystem = timeSystem;
	}

	// Get balloon telemetry for UI
	getTelemetry(): BalloonTelemetry {
		return this.balloonPhysics.getTelemetry();
	}

	// Get balloon size for rendering (in meters)
	getBalloonSize(): number {
		return this.balloonPhysics.getBalloonSize();
	}

	// Get balloon position for rendering (in meters)
	getBalloonPosition(): Vec3 {
		return this.balloonPhysics.getPosition();
	}

	// Get balloon orientation for rendering
	getBalloonRotation(): Vec3 {
		return this.balloonPhysics.getRotation();
	}

	// Get cloud data for rendering (positions in meters)
	getCloudData() {
		return this.cloudSystem.getClouds();
	}

	// Set simulation state
	setPaused(paused: boolean): void {
		this.paused = paused;
		this.cloudSystem.setPaused(paused);

		// Sync with time system if available
		if (this.timeSystem) {
			this.timeSystem.setPaused(paused);
		}
	}

	setSingleStep(singleStep: boolean): void {
		this.singleStep = singleStep;
	}

	// Handle keyboard input
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
			case '1':
				this.balloonPhysics.setControls({ deflate: pressed });
				break;
			case '2':
				this.balloonPhysics.setControls({ inflate: pressed });
				break;
		}
	}

	// Reset physics to initial state
	reset(): void {
		console.log("Custom PhysicsEngine reset");

		this.balloonPhysics.reset({
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		});

		this.cloudSystem.reset();

		// Reset time system if available
		if (this.timeSystem) {
			this.timeSystem.reset();
		}
	}

	// Main update method - called every frame
	update(delta: number): void {
		// If using time system, use its delta
		if (this.timeSystem && !this.singleStep) {
			delta = this.timeSystem.update();
		}

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