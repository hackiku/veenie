// src/lib/sims/balloon/physics/engine.ts - FIXED VERSION

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

	// Global state
	private paused: boolean = false;
	private singleStep: boolean = false;

	constructor() {
		console.log("PhysicsEngine initializing");

		// vehicle config (balloon)
		// const vehicleConfig = {}
		
		const balloonConfig = {
			initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
			minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
			maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
			gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
			envelopeMassRatio: SIMULATION_CONSTANTS.BALLOON_ENVELOPE_MASS_RATIO || 0.2, // FIXED: Add default
			controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
			gravity: SIMULATION_CONSTANTS.GRAVITY
		};

		console.log("BalloonConfig:", balloonConfig);

		// Initialize balloon physics with FIXED config
		this.balloonPhysics = new BalloonPhysics(balloonConfig);

		// VERIFY: Log initial position to check for NaN
		const initialPos = this.balloonPhysics.getPosition();
		console.log("Initial balloon position:", initialPos);

		if (isNaN(initialPos.x) || isNaN(initialPos.y) || isNaN(initialPos.z)) {
			console.error("CRITICAL: Balloon initialized with NaN position!");
			// Force reset to valid position
			this.balloonPhysics.reset({
				x: 0,
				y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
				z: 0
			});
			console.log("Forced balloon position reset");
		}
	}

	// Get balloon telemetry for UI
	getTelemetry(): BalloonTelemetry {
		const baseTelemetry = this.balloonPhysics.getTelemetry();

		// SAFETY CHECK: Detect and fix NaN values in telemetry
		if (isNaN(baseTelemetry.altitude) || !baseTelemetry.position) {
			console.warn("NaN detected in telemetry, attempting recovery...");

			// Force position update
			const currentPos = this.balloonPhysics.getPosition();
			if (isNaN(currentPos.y)) {
				console.error("Balloon position is NaN, forcing reset");
				this.reset();
				return this.balloonPhysics.getTelemetry();
			}
		}

		// Add cloud system stats if needed
		const balloonPos: [number, number, number] = [
			baseTelemetry.position?.x || 0,
			baseTelemetry.position?.y || SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			baseTelemetry.position?.z || 0
		];

		// SAFETY: Check for NaN in balloon position before cloud calculations
		if (isNaN(balloonPos[0]) || isNaN(balloonPos[1]) || isNaN(balloonPos[2])) {
			console.error("NaN in balloon position for cloud calculation:", balloonPos);
			balloonPos[0] = 0;
			balloonPos[1] = SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT;
			balloonPos[2] = 0;
		}

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
		const size = this.balloonPhysics.getBalloonSize();
		return isNaN(size) ? SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE : size;
	}

	// Get balloon position for rendering
	getBalloonPosition(): Vec3 {
		const pos = this.balloonPhysics.getPosition();

		// SAFETY: Check for NaN and return default if found
		if (isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z)) {
			console.error("NaN in balloon position, returning default");
			return {
				x: 0,
				y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
				z: 0
			};
		}

		return pos;
	}

	// Get balloon orientation for rendering
	getBalloonRotation(): Vec3 {
		const rot = this.balloonPhysics.getRotation();

		// SAFETY: Check for NaN in rotation
		if (isNaN(rot.x) || isNaN(rot.y) || isNaN(rot.z)) {
			console.warn("NaN in balloon rotation, returning zero rotation");
			return { x: 0, y: 0, z: 0 };
		}

		return rot;
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

	// Handle keyboard input - ADD setAnalogControl support
	setKeyState(key: string, pressed: boolean): void {
		const keyLower = key.toLowerCase();

		switch (keyLower) {
			case 'w':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('moveZ', pressed ? 1 : 0);
				} else {
					this.balloonPhysics.setControls({ moveZ: pressed ? 1 : 0 });
				}
				break;
			case 's':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('moveZ', pressed ? -1 : 0);
				} else {
					this.balloonPhysics.setControls({ moveZ: pressed ? -1 : 0 });
				}
				break;
			case 'a':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('moveX', pressed ? -1 : 0);
				} else {
					this.balloonPhysics.setControls({ moveX: pressed ? -1 : 0 });
				}
				break;
			case 'd':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('moveX', pressed ? 1 : 0);
				} else {
					this.balloonPhysics.setControls({ moveX: pressed ? 1 : 0 });
				}
				break;
			case '1':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('deflate', pressed ? 1 : 0);
				} else {
					this.balloonPhysics.setControls({ deflate: pressed ? 1 : 0 });
				}
				break;
			case '2':
				if (this.balloonPhysics.setAnalogControl) {
					this.balloonPhysics.setAnalogControl('inflate', pressed ? 1 : 0);
				} else {
					this.balloonPhysics.setControls({ inflate: pressed ? 1 : 0 });
				}
				break;
		}
	}

	// FIXED: Enhanced reset with NaN detection
	reset(): void {
		console.log("PhysicsEngine reset - checking for NaN issues");

		// Reset balloon to known good state
		this.balloonPhysics.reset({
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		});

		// Verify reset worked
		const pos = this.balloonPhysics.getPosition();
		if (isNaN(pos.x) || isNaN(pos.y) || isNaN(pos.z)) {
			console.error("CRITICAL: Reset failed, position still NaN!");
			// Force create new balloon physics if reset fails
			const balloonConfig = {
				initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
				minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
				maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
				gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
				envelopeMassRatio: SIMULATION_CONSTANTS.BALLOON_ENVELOPE_MASS_RATIO || 0.2,
				controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
				gravity: SIMULATION_CONSTANTS.GRAVITY
			};
			this.balloonPhysics = new BalloonPhysics(balloonConfig);
			console.log("Created new BalloonPhysics instance");
		} else {
			console.log("Reset successful, position:", pos);
		}

		// Reset collection data
		if (this.balloonPhysics.resetCollection) {
			this.balloonPhysics.resetCollection();
		}
	}

	// ENHANCED: Main update method with NaN detection
	update(delta: number): void {
		// Skip if paused and not doing a single step
		if (this.paused && !this.singleStep) return;

		// Cap delta to prevent large jumps and NaN propagation
		const cappedDelta = Math.min(Math.max(delta, 0), 0.1);

		// Check for NaN in delta
		if (isNaN(cappedDelta)) {
			console.error("NaN delta time, skipping update");
			return;
		}

		// Check balloon position before update
		const preUpdatePos = this.balloonPhysics.getPosition();
		if (isNaN(preUpdatePos.x) || isNaN(preUpdatePos.y) || isNaN(preUpdatePos.z)) {
			console.error("NaN position detected before update, forcing reset");
			this.reset();
			return;
		}

		// Update balloon physics
		try {
			this.balloonPhysics.update(cappedDelta);
		} catch (error) {
			console.error("Error in balloon physics update:", error);
			// Try to recover
			this.reset();
			return;
		}

		// Check for NaN after update
		const postUpdatePos = this.balloonPhysics.getPosition();
		if (isNaN(postUpdatePos.x) || isNaN(postUpdatePos.y) || isNaN(postUpdatePos.z)) {
			console.error("NaN position after update, forcing reset");
			this.reset();
		}

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