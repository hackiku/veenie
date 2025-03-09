// src/lib/sims/flight/physics/forces.ts
// Physics force calculations for Venus flight simulation

import type { RigidBody } from '@dimforge/rapier3d-compat';
import type { ControlInputs, Vector3 } from './types';
import {
	getAtmosphereDensityFactor,
	getAtmosphereDensity,
	getWindVector
} from '$lib/data/flight/atmosphereModel';
import { PHYSICS, CONTROLS } from '$lib/data/flight/constants';
import { calculateDragForce } from '$lib/data/flight/vehicleModels';

/**
 * Apply all forces to a rigid body based on controls and current state
 * @param rigidBody The rigid body to apply forces to
 * @param delta Time delta in seconds
 * @param controls Control inputs
 * @param altitude Current altitude in km
 * @param time Current simulation time in seconds
 */
export function applyForces(
	rigidBody: RigidBody,
	delta: number,
	controls: ControlInputs,
	altitude: number,
	time: number = 0
): void {
	if (!rigidBody) return;

	// Apply control forces
	applyControlForces(rigidBody, delta, controls);

	// Apply environmental forces
	applyBuoyancyForce(rigidBody, delta, controls, altitude);
	applyDragForce(rigidBody, delta, altitude);
	applyWindForce(rigidBody, delta, altitude, time);
}

/**
 * Apply forces based on user controls
 * @param rigidBody The rigid body to apply forces to
 * @param delta Time delta in seconds
 * @param controls Control inputs
 */
export function applyControlForces(
	rigidBody: RigidBody,
	delta: number,
	controls: ControlInputs
): void {
	// Base force magnitudes
	const horizontalForce = CONTROLS.HORIZONTAL_FORCE;
	const verticalForce = CONTROLS.VERTICAL_FORCE;

	// Apply directional forces based on current controls
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

	// Up/down movement
	if (controls.up) {
		rigidBody.applyImpulse({ x: 0, y: verticalForce * delta, z: 0 }, true);
	}
	if (controls.down) {
		rigidBody.applyImpulse({ x: 0, y: -verticalForce * delta, z: 0 }, true);
	}
}

/**
 * Apply buoyancy force (counteracts gravity)
 * @param rigidBody The rigid body to apply forces to
 * @param delta Time delta in seconds
 * @param controls Control inputs (for buoyancy force adjustment)
 * @param altitude Current altitude in km
 */
export function applyBuoyancyForce(
	rigidBody: RigidBody,
	delta: number,
	controls: ControlInputs,
	altitude: number
): void {
	// Get density factor based on current altitude
	const densityFactor = getAtmosphereDensityFactor(altitude);

	// Apply buoyancy (upward force to counter gravity)
	// Adjusted by altitude-based density and user-controlled buoyancy setting
	const effectiveBuoyancy = controls.buoyancyForce * densityFactor;
	rigidBody.applyImpulse({ x: 0, y: effectiveBuoyancy * delta, z: 0 }, true);
}

/**
 * Apply drag force based on current velocity and atmospheric density
 * @param rigidBody The rigid body to apply forces to
 * @param delta Time delta in seconds
 * @param altitude Current altitude in km
 */
export function applyDragForce(
	rigidBody: RigidBody,
	delta: number,
	altitude: number
): void {
	// Get velocity vector
	const linearVel = rigidBody.linvel();

	// Get density factor
	const densityFactor = getAtmosphereDensityFactor(altitude);

	// Calculate drag coefficient based on density
	const dragCoefficient = 0.3 * densityFactor; // More drag in denser atmosphere

	// Apply gentle damping for atmospheric drag
	rigidBody.applyImpulse({
		x: -linearVel.x * dragCoefficient * delta,
		y: -linearVel.y * dragCoefficient * delta,
		z: -linearVel.z * dragCoefficient * delta
	}, true);
}

/**
 * Apply wind forces based on altitude and time
 * @param rigidBody The rigid body to apply forces to
 * @param delta Time delta in seconds
 * @param altitude Current altitude in km
 * @param time Current simulation time in seconds
 */
export function applyWindForce(
	rigidBody: RigidBody,
	delta: number,
	altitude: number,
	time: number
): void {
	// Get wind vector at current altitude and time
	const windVector = getWindVector(altitude, time);

	// Apply wind force - affected by atmospheric density
	const densityFactor = getAtmosphereDensityFactor(altitude);
	const windForceFactor = 0.05 * densityFactor; // Scale wind effect

	rigidBody.applyImpulse({
		x: windVector[0] * windForceFactor * delta,
		y: windVector[1] * windForceFactor * delta,
		z: windVector[2] * windForceFactor * delta
	}, true);
}

/**
 * Calculate net force currently acting on a body
 * @param rigidBody The rigid body
 * @param altitude Current altitude in km
 * @param controls Control inputs
 * @param time Current simulation time in seconds
 * @returns Vector3 of net force in Newtons
 */
export function calculateNetForce(
	rigidBody: RigidBody,
	altitude: number,
	controls: ControlInputs,
	time: number
): Vector3 {
	if (!rigidBody) return { x: 0, y: 0, z: 0 };

	// Get current velocity
	const velocity = rigidBody.linvel();

	// Get atmosphere density
	const density = getAtmosphereDensity(altitude);
	const densityFactor = getAtmosphereDensityFactor(altitude);

	// Calculate gravity force (always pulling down)
	const gravityForce = {
		x: 0,
		y: PHYSICS.GRAVITY * rigidBody.mass(),
		z: 0
	};

	// Calculate buoyancy force (pushing up)
	const buoyancyForce = {
		x: 0,
		y: controls.buoyancyForce * densityFactor,
		z: 0
	};

	// Calculate drag force
	const dragCoefficient = 0.3 * densityFactor;
	const dragForce = {
		x: -velocity.x * dragCoefficient,
		y: -velocity.y * dragCoefficient,
		z: -velocity.z * dragCoefficient
	};

	// Calculate wind force
	const windVector = getWindVector(altitude, time);
	const windForceFactor = 0.05 * densityFactor;
	const windForce = {
		x: windVector[0] * windForceFactor,
		y: windVector[1] * windForceFactor,
		z: windVector[2] * windForceFactor
	};

	// Calculate control forces
	const controlForces = { x: 0, y: 0, z: 0 };
	if (controls.forward) controlForces.z -= CONTROLS.HORIZONTAL_FORCE;
	if (controls.backward) controlForces.z += CONTROLS.HORIZONTAL_FORCE;
	if (controls.left) controlForces.x -= CONTROLS.HORIZONTAL_FORCE;
	if (controls.right) controlForces.x += CONTROLS.HORIZONTAL_FORCE;
	if (controls.up) controlForces.y += CONTROLS.VERTICAL_FORCE;
	if (controls.down) controlForces.y -= CONTROLS.VERTICAL_FORCE;

	// Sum all forces
	return {
		x: gravityForce.x + buoyancyForce.x + dragForce.x + windForce.x + controlForces.x,
		y: gravityForce.y + buoyancyForce.y + dragForce.y + windForce.y + controlForces.y,
		z: gravityForce.z + buoyancyForce.z + dragForce.z + windForce.z + controlForces.z
	};
}

/**
 * Get the current physics state from a rigid body
 * @param rigidBody The rigid body
 * @param time Current simulation time
 * @returns Current physics state including position, velocity, and forces
 */
export function getPhysicsState(rigidBody: RigidBody, time: number = 0): {
	altitude: number;
	velocity: Vector3;
	density: number;
} {
	if (!rigidBody) {
		return {
			altitude: 0,
			velocity: { x: 0, y: 0, z: 0 },
			density: 0
		};
	}

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