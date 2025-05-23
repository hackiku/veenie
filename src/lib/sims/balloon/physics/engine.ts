// src/lib/sims/balloon/physics/engine.ts (simplified version)

import { SIMULATION_CONSTANTS } from '../constants';
import type { Vector3 } from 'three';
import { BalloonPhysics, type BalloonTelemetry } from './balloon';
import { getStaticCloudSystem } from './staticClouds';

// Simple 3D vector operations (keep existing)
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
	private cloudSystem = getStaticCloudSystem();

	// Global state (simplified - no time system integration)
	private paused: boolean = false;
	private singleStep: boolean = false;

	constructor() {
		console.log("Simplified PhysicsEngine initializing");

		// Initialize balloon physics with metric values
		this.balloonPhysics = new BalloonPhysics({
			initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
			minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
			maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
			gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
			controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
			gravity: SIMULATION_CONSTANTS.GRAVITY
		});
	}

	// Get balloon telemetry for UI (now includes cloud interaction data)
	getTelemetry(): BalloonTelemetry {
		const baseTelemetry = this.balloonPhysics.getTelemetry();

		// Add cloud system stats if needed
		const balloonPos: [number, number, number] = [
			baseTelemetry.position?.x || 0,
			baseTelemetry.position?.y || SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			baseTelemetry.position?.z || 0
		];

		const cloudProps = this.cloudSystem.getCloudPropertiesAtPosition(balloonPos);

		return {
			...baseTelemetry,
			cloudInteraction: {
				inCloud: cloudProps.inCloud,
				cloudDensity: cloudProps.density,
				dragMultiplier: cloudProps.dragMultiplier,
				turbulenceLevel: cloudProps.turbulence,
				collectionRate: cloudProps.collectionRate,
				totalCollected: this.balloonPhysics.getCollectionData?.()?.totalCollected || 0
			}
		};
	}

	// Get balloon size for rendering
	getBalloonSize(): number {
		return this.balloonPhysics.getBalloonSize();
	}

	// Get balloon position for rendering
	getBalloonPosition(): Vec3 {
		return this.balloonPhysics.getPosition();
	}

	// Get balloon orientation for rendering
	getBalloonRotation(): Vec3 {
		return this.balloonPhysics.getRotation();
	}

	// Get cloud system for external access
	getCloudSystem() {
		return this.cloudSystem;
	}

	// Set simulation state
	setPaused(paused: boolean): void {
		this.paused = paused;
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
		console.log("PhysicsEngine reset");

		this.balloonPhysics.reset({
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		});

		// Reset collection data
		if (this.balloonPhysics.resetCollection) {
			this.balloonPhysics.resetCollection();
		}
	}

	// Main update method - simplified without time system conflicts
	update(delta: number): void {
		// Skip if paused and not doing a single step
		if (this.paused && !this.singleStep) return;

		// Cap delta to prevent large jumps (e.g., when tab was inactive)
		const cappedDelta = Math.min(delta, 0.1);

		// Update balloon physics with cloud interactions
		this.balloonPhysics.update(cappedDelta);

		// Reset single step flag
		this.singleStep = false;
	}

	// Engineering methods for external access
	getCloudFieldsNearBalloon(radius: number = 5000) {
		const balloonPos = this.getBalloonPosition();
		return this.cloudSystem.getCloudFieldsInRange(
			[balloonPos.x, balloonPos.y, balloonPos.z],
			radius
		);
	}

	isInOptimalCollectionZone(): boolean {
		return this.balloonPhysics.isInOptimalCollectionZone?.() || false;
	}

	getCollectionData() {
		return this.balloonPhysics.getCollectionData?.() || {
			totalCollected: 0,
			currentRate: 0,
			composition: null,
			efficiency: 0
		};
	}

	// System stats for debugging/telemetry
	getSystemStats() {
		return {
			balloon: {
				position: this.getBalloonPosition(),
				size: this.getBalloonSize(),
				inCloud: this.getTelemetry().cloudInteraction?.inCloud || false
			},
			clouds: this.cloudSystem.getStats(),
			performance: {
				paused: this.paused,
				singleStep: this.singleStep
			}
		};
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
	(window as any).getCloudSystem = () => getPhysicsEngine().getCloudSystem();
}