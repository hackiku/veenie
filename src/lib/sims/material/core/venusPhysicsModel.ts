// src/lib/sims/material/core/venusPhysicsModel.ts
import type { RigidBody } from '@dimforge/rapier3d-compat';
import type { Vector3 } from 'three';
import type { AtmosphericConditions, AtmosphereLayer } from './atmosphere';
import type { VehicleProperties } from './vehicleProperties';
import { getAtmosphericConditions } from './atmosphere';
import {
	calculateBuoyancyForce,
	calculateDragForces,
	calculateWindForce,
	calculateVenusGravity
} from './venusForces';

// Scaling factor to convert our physics model forces to Rapier impulses
// This may need tuning based on visual behavior
const FORCE_SCALING = 0.15;

export interface PhysicsState {
	position: { x: number; y: number; z: number };
	velocity: { x: number; y: number; z: number };
	forces: {
		buoyancy: { x: number; y: number; z: number };
		drag: { x: number; y: number; z: number };
		wind: { x: number; y: number; z: number } | null;
		gravity: { x: number; y: number; z: number };
		total: { x: number; y: number; z: number };
	};
	atmospheric: AtmosphericConditions;
}

/**
 * Apply Venus physics to a Rapier rigid body based on atmospheric data and vehicle properties
 */
export function applyVenusPhysics(
	rigidBody: RigidBody,
	atmosphereData: AtmosphereLayer[],
	vehicle: VehicleProperties,
	windEnabled: boolean,
	windIntensity: number,
	useRapierGravity: boolean = false
): PhysicsState {
	// Get current position and velocity
	const pos = rigidBody.translation();
	const vel = rigidBody.linvel();

	// Get atmospheric conditions at current altitude
	const conditions = getAtmosphericConditions(
		atmosphereData,
		pos.y,
		windEnabled,
		windIntensity,
		performance.now()
	);

	// Extract vehicle properties with proper fallbacks
	const mass = vehicle.mass || 1.2;
	const buoyancyCoefficient = vehicle.buoyancy || 0.35;
	const dragCoefficient = vehicle.dragCoefficient || 0.05;

	// Calculate forces
	const buoyancyForce = calculateBuoyancyForce(
		buoyancyCoefficient,
		conditions.density
	);

	const dragForce = calculateDragForces(
		vel,
		dragCoefficient,
		conditions.density
	);

	// Calculate wind force if enabled
	let windForce = null;
	if (windEnabled && conditions.windVector) {
		windForce = calculateWindForce(
			conditions.windVector,
			windIntensity
		);
	}

	// Calculate gravity (only if not using Rapier's gravity)
	const gravityForce = useRapierGravity ?
		{ x: 0, y: 0, z: 0 } :
		calculateVenusGravity(mass);

	// Calculate total force
	const totalForce = {
		x: buoyancyForce.x + dragForce.x + (windForce?.x || 0) + gravityForce.x,
		y: buoyancyForce.y + dragForce.y + (windForce?.y || 0) + gravityForce.y,
		z: buoyancyForce.z + dragForce.z + (windForce?.z || 0) + gravityForce.z
	};

	// Apply the combined force as an impulse
	rigidBody.applyImpulse({
		x: totalForce.x * FORCE_SCALING,
		y: totalForce.y * FORCE_SCALING,
		z: totalForce.z * FORCE_SCALING
	}, true);

	// Return state for telemetry/debugging
	return {
		position: { x: pos.x, y: pos.y, z: pos.z },
		velocity: { x: vel.x, y: vel.y, z: vel.z },
		forces: {
			buoyancy: buoyancyForce,
			drag: dragForce,
			wind: windForce,
			gravity: gravityForce,
			total: totalForce
		},
		atmospheric: conditions
	};
}

/**
 * Configure a Rapier world for Venus gravity
 */
export function configureVenusGravity(planet) {
	const venusGravity = planet?.data?.gravity || 8.87; // m/s²
	return [0, -venusGravity, 0]; // Rapier expects a 3D vector
}