// src/lib/sims/flight/physics/types.ts
// Type definitions for the physics system

import type { RigidBody } from '@dimforge/rapier3d-compat';

/**
 * Vector3 representation for positions, velocities, etc.
 */
export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

/**
 * Current vehicle physics state
 */
export interface PhysicsState {
	// Position and motion
	position: Vector3;
	velocity: Vector3;
	altitude: number;

	// Atmospheric conditions at current position
	density: number;
	pressure: number;
	temperature: number;
	windVector: Vector3;

	// Current forces
	buoyancyForce: number;
	dragForce: Vector3;
	netForce: Vector3;

	// Calculated metrics
	airspeed: number;
	verticalSpeed: number;
	groundSpeed: number;
}

/**
 * Control inputs that affect physics
 */
export interface ControlInputs {
	// Basic movement controls
	forward: boolean;
	backward: boolean;
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;

	// Buoyancy controls
	buoyancyUp: boolean;
	buoyancyDown: boolean;
	buoyancyForce: number;

	// Additional controls (for future expansion)
	roll?: number;
	pitch?: number;
	yaw?: number;
	throttle?: number;
}

/**
 * Vehicle configuration that affects physics
 */
export interface VehicleConfig {
	// Basic properties
	mass: number;
	volume: number;
	dragCoefficient: number;
	frontalArea: number;

	// Control effectiveness
	controlSensitivity: number;

	// Physical limits
	maxSpeed: number;
	maxAltitude: number;
	minAltitude: number;

	// Visual properties
	visualRadius: number;
	color: string;
}

/**
 * Physics engine settings
 */
export interface PhysicsSettings {
	// Time settings
	timestep: number;
	maxSubsteps: number;

	// World settings
	gravity: Vector3;

	// Simulation settings
	enableWind: boolean;
	enableBuoyancy: boolean;
	enableDrag: boolean;
}

/**
 * Physics engine interface for interacting with underlying system
 */
export interface PhysicsEngine {
	rigidBody: RigidBody | null;
	initialize(position: Vector3): void;
	applyForce(force: Vector3, atPosition?: Vector3): void;
	applyImpulse(impulse: Vector3, atPosition?: Vector3): void;
	getPosition(): Vector3;
	getVelocity(): Vector3;
	setVelocity(velocity: Vector3): void;
	getState(): PhysicsState;
	update(deltaTime: number): void;
	reset(position: Vector3): void;
}