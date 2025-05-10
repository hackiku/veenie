// src/lib/sims/material/core/rapierBridge.ts
import type { RigidBody, Vector } from '@dimforge/rapier3d-compat';

// Types for saved state
interface SavedState {
	linvel: [number, number, number];
	angvel: [number, number, number];
	position: [number, number, number];
	wasFixed: boolean;
}

// Track all rigid bodies to manage during pause
const managedBodies = new Set<RigidBody>();

// Save velocities when pausing
const savedStates = new Map<RigidBody, SavedState>();

/**
 * Register a rigid body to be managed for pause/resume
 * @returns A function to unregister the body
 */
export function registerRigidBody(rigidBody: RigidBody) {
	managedBodies.add(rigidBody);

	// Return unregister function
	return () => {
		managedBodies.delete(rigidBody);
		savedStates.delete(rigidBody);
	};
}

/**
 * Freeze all physics objects - save their state and set velocities to zero
 */
export function freezePhysics() {
	managedBodies.forEach(body => {
		const linvel = body.linvel();
		const angvel = body.angvel();
		const position = body.translation();
		const wasFixed = body.isFixed();

		savedStates.set(body, {
			linvel: [linvel.x, linvel.y, linvel.z],
			angvel: [angvel.x, angvel.y, angvel.z],
			position: [position.x, position.y, position.z],
			wasFixed
		});

		// Complete lockdown of physics body
		// First set velocities to zero
		body.setLinvel({ x: 0, y: 0, z: 0 }, true);
		body.setAngvel({ x: 0, y: 0, z: 0 }, true);

		// Then lock translations and rotations
		body.lockTranslations(true);
		body.lockRotations(true);

		// Set to fixed body type if dynamic
		if (!wasFixed) {
			body.setBodyType(1, true); // 1 = fixed
		}
	});
}

/**
 * Restore physics from frozen state
 */
export function unfreezePhysics() {
	managedBodies.forEach(body => {
		const savedState = savedStates.get(body);
		if (savedState) {
			// Restore body type first
			if (!savedState.wasFixed) {
				body.setBodyType(0, true); // 0 = dynamic
			}

			// Unlock motions
			body.lockTranslations(false);
			body.lockRotations(false);

			// Make sure the body is still at the saved position
			// This prevents any drift that might have happened while paused
			body.setTranslation({
				x: savedState.position[0],
				y: savedState.position[1],
				z: savedState.position[2]
			}, true);

			// Restore velocities
			body.setLinvel({
				x: savedState.linvel[0],
				y: savedState.linvel[1],
				z: savedState.linvel[2]
			}, true);

			body.setAngvel({
				x: savedState.angvel[0],
				y: savedState.angvel[1],
				z: savedState.angvel[2]
			}, true);
		}
	});
}

/**
 * Apply Venus atmospheric forces to a rigid body
 */
export function applyVenusForces(
	rigidBody: RigidBody,
	buoyancyForce: { x: number, y: number, z: number },
	dragForce: { x: number, y: number, z: number },
	gravityForce: { x: number, y: number, z: number },
	windForce: { x: number, y: number, z: number } | null = null
) {
	// Apply forces to Rapier rigid body
	rigidBody.applyImpulse(buoyancyForce, true);
	rigidBody.applyImpulse(dragForce, true);
	rigidBody.applyImpulse(gravityForce, true);

	// Apply wind if provided
	if (windForce) {
		rigidBody.applyImpulse(windForce, true);
	}
}

/**
 * Convert a Vec3-like object to a Rapier-compatible Vector
 */
export function toRapierVector(vec: { x: number, y: number, z: number }): Vector {
	return { x: vec.x, y: vec.y, z: vec.z };
}