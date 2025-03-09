// src/lib/sims/flight/physics/simplePhysics.ts

import type { RigidBody } from '@dimforge/rapier3d-compat';
import { venusData } from './data';

export interface PhysicsState {
	altitude: number;
	velocity: {
		x: number;
		y: number;
		z: number;
	};
	density: number;
}

/**
 * Calculate atmosphere density factor based on altitude
 */
export function getAtmosphereDensityFactor(altitude: number): number {
	// Simplified model with transition zones
	if (altitude < venusData.atmosphere.lowerDenseLayer) return venusData.atmosphere.maxDensityFactor;
	if (altitude > venusData.atmosphere.upperDenseLayer) return venusData.atmosphere.minDensityFactor;

	// Linear interpolation in the transition zone
	return venusData.atmosphere.maxDensityFactor -
		((altitude - venusData.atmosphere.lowerDenseLayer) /
			(venusData.atmosphere.upperDenseLayer - venusData.atmosphere.lowerDenseLayer)) *
		(venusData.atmosphere.maxDensityFactor - venusData.atmosphere.minDensityFactor);
}

/**
 * Apply forces to a rigid body based on controls and current state
 */
export function applyForces(
	rigidBody: RigidBody,
	delta: number,
	controls: any,
	altitude: number
): void {
	// Base force values
	const horizontalForce = venusData.controls.horizontalForce;
	const verticalForce = venusData.controls.verticalForce;

	// Directional movement forces
	if (controls.forward) {
		rigidBody.applyImpulse({ x: 0, y: 0, z: -horizontalForce * delta }, true);
	}
	if (controls.backward) {
		rigidBody.applyImpulse({ x: 0, y: 0, z: horizontalForce * delta }, true);
	}
	if (controls.left) {
		rigidBody.applyImpulse({ x: -horizontalForce * delta, y: 0, z: 0 }, true);
	}
	if (controls.right) {
		rigidBody.applyImpulse({ x: horizontalForce * delta, y: 0, z: 0 }, true);
	}

	// Vertical movement forces
	if (controls.up) {
		rigidBody.applyImpulse({ x: 0, y: verticalForce * delta, z: 0 }, true);
	}
	if (controls.down) {
		rigidBody.applyImpulse({ x: 0, y: -verticalForce * delta, z: 0 }, true);
	}

	// Get density factor based on current altitude
	const densityFactor = getAtmosphereDensityFactor(altitude);

	// Apply buoyancy (upward force to counter gravity)
	// Adjusted by altitude-based density and user-controlled buoyancy setting
	const effectiveBuoyancy = controls.buoyancyForce * densityFactor;
	rigidBody.applyImpulse({ x: 0, y: effectiveBuoyancy * delta, z: 0 }, true);

	// Apply atmospheric drag
	const linearVel = rigidBody.linvel();
	const dragFactor = venusData.physics.dragCoefficient * densityFactor;

	rigidBody.applyImpulse({
		x: -linearVel.x * dragFactor * delta,
		y: -linearVel.y * dragFactor * delta,
		z: -linearVel.z * dragFactor * delta
	}, true);
}

/**
 * Get current physics state from a rigid body
 */
export function getPhysicsState(rigidBody: RigidBody): PhysicsState {
	const position = rigidBody.translation();
	const velocity = rigidBody.linvel();
	const altitude = position.y;
	const density = getAtmosphereDensityFactor(altitude);

	return {
		altitude,
		velocity: {
			x: velocity.x,
			y: velocity.y,
			z: velocity.z
		},
		density
	};
}