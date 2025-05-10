// src/lib/sims/material/core/venusForces.ts
import { Vector3 } from 'three';

export interface Force {
	x: number;
	y: number;
	z: number;
}

/**
 * Calculate buoyancy force based on atmospheric density
 */
export function calculateBuoyancyForce(
	buoyancyCoefficient: number,
	atmosphericDensity: number
): Force {
	return {
		x: 0,
		y: buoyancyCoefficient * atmosphericDensity,
		z: 0
	};
}

/**
 * Calculate drag forces based on velocity and atmospheric density
 */
export function calculateDragForces(
	velocity: { x: number, y: number, z: number },
	dragCoefficient: number,
	atmosphericDensity: number
): Force {
	// Calculate drag forces proportional to velocity squared (more realistic)
	const dragX = -velocity.x * Math.abs(velocity.x) * dragCoefficient * atmosphericDensity;
	const dragY = -velocity.y * Math.abs(velocity.y) * dragCoefficient * atmosphericDensity * 0.5; // Less vertical drag
	const dragZ = -velocity.z * Math.abs(velocity.z) * dragCoefficient * atmosphericDensity;

	return {
		x: dragX,
		y: dragY,
		z: dragZ
	};
}

/**
 * Calculate wind force based on wind vector and intensity
 */
export function calculateWindForce(
	windVector: Vector3,
	windIntensity: number
): Force {
	return {
		x: windVector.x * windIntensity * 0.01,
		y: 0,  // No vertical wind component
		z: windVector.z * windIntensity * 0.01
	};
}

/**
 * Calculate Venus gravity force
 */
export function calculateVenusGravity(mass: number): Force {
	const venusGravity = 8.87; // m/s²

	return {
		x: 0,
		y: -venusGravity * mass,
		z: 0
	};
}