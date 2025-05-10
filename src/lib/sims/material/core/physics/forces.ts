// src/lib/sims/material/core/physics/forces.ts
import { Vector3 } from 'three';
import type { AtmosphericConditions } from './atmosphere';

/**
 * Interface for a 3D force vector
 */
export interface Force {
	x: number;
	y: number;
	z: number;
}

/**
 * Interface for a collection of all forces acting on an entity
 */
export interface ForceCollection {
	buoyancy: Force;
	drag: Force;
	wind: Force | null;
	gravity: Force;
	total: Force; // Sum of all forces
}

/**
 * Venus gravity constant (m/s²)
 */
export const VENUS_GRAVITY = 8.87;

/**
 * Calculate buoyancy force based on atmospheric density and vehicle properties
 * 
 * @param buoyancyCoefficient - Vehicle's buoyancy coefficient
 * @param atmosphericDensity - Current atmospheric density (kg/m³)
 * @returns Buoyancy force vector
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
 * 
 * @param velocity - Current velocity vector
 * @param dragCoefficient - Vehicle's drag coefficient
 * @param atmosphericDensity - Current atmospheric density (kg/m³)
 * @returns Drag force vector
 */
export function calculateDragForces(
	velocity: { x: number, y: number, z: number },
	dragCoefficient: number,
	atmosphericDensity: number
): Force {
	// Calculate drag forces proportional to velocity squared (more realistic)
	// Drag force = -0.5 * density * velocity^2 * drag_coefficient * cross_section_area
	// We simplify by incorporating cross-section into dragCoefficient

	// Horizontal drag (x, z planes)
	const dragX = -velocity.x * Math.abs(velocity.x) * dragCoefficient * atmosphericDensity;
	const dragZ = -velocity.z * Math.abs(velocity.z) * dragCoefficient * atmosphericDensity;

	// Vertical drag (y axis) - typically less due to streamlining of balloons/airships
	const verticalDragFactor = 0.5; // Vertical drag is 50% of horizontal drag
	const dragY = -velocity.y * Math.abs(velocity.y) * dragCoefficient * atmosphericDensity * verticalDragFactor;

	return {
		x: dragX,
		y: dragY,
		z: dragZ
	};
}

/**
 * Calculate wind force based on wind vector and intensity
 * 
 * @param windVector - Current wind vector
 * @param windIntensity - Wind intensity multiplier
 * @returns Wind force vector
 */
export function calculateWindForce(
	windVector: Vector3,
	windIntensity: number
): Force {
	// Wind force is proportional to wind velocity squared
	// We use a scaling factor to convert wind velocity to force
	const scalingFactor = 0.01;

	return {
		x: windVector.x * windIntensity * scalingFactor,
		y: 0,  // Assuming negligible vertical wind component
		z: windVector.z * windIntensity * scalingFactor
	};
}

/**
 * Calculate gravity force for a given mass
 * 
 * @param mass - Entity mass in kg
 * @param gravity - Optional gravity constant (defaults to Venus)
 * @returns Gravity force vector
 */
export function calculateGravityForce(
	mass: number,
	gravity: number = VENUS_GRAVITY
): Force {
	return {
		x: 0,
		y: -gravity * mass,
		z: 0
	};
}

/**
 * Calculate all forces acting on an entity
 * 
 * @param mass - Entity mass in kg
 * @param buoyancyCoefficient - Entity's buoyancy coefficient
 * @param dragCoefficient - Entity's drag coefficient
 * @param velocity - Current velocity vector
 * @param atmosphericConditions - Current atmospheric conditions
 * @param windEnabled - Whether wind effects are enabled
 * @param windIntensity - Wind intensity multiplier
 * @returns Collection of all forces and their sum
 */
export function calculateAllForces(
	mass: number,
	buoyancyCoefficient: number,
	dragCoefficient: number,
	velocity: { x: number, y: number, z: number },
	atmosphericConditions: AtmosphericConditions,
	windEnabled: boolean = true,
	windIntensity: number = 1.0
): ForceCollection {
	// Calculate individual forces
	const buoyancy = calculateBuoyancyForce(
		buoyancyCoefficient,
		atmosphericConditions.density
	);

	const drag = calculateDragForces(
		velocity,
		dragCoefficient,
		atmosphericConditions.density
	);

	const gravity = calculateGravityForce(mass);

	// Calculate wind force if enabled
	let wind = null;
	if (windEnabled && atmosphericConditions.windVector) {
		wind = calculateWindForce(
			atmosphericConditions.windVector,
			windIntensity
		);
	}

	// Calculate total force
	const total = {
		x: buoyancy.x + drag.x + (wind?.x || 0) + gravity.x,
		y: buoyancy.y + drag.y + (wind?.y || 0) + gravity.y,
		z: buoyancy.z + drag.z + (wind?.z || 0) + gravity.z
	};

	return {
		buoyancy,
		drag,
		wind,
		gravity,
		total
	};
}

/**
 * Sum multiple forces
 * 
 * @param forces - Array of forces to sum
 * @returns Summed force vector
 */
export function sumForces(forces: Force[]): Force {
	return forces.reduce(
		(sum, force) => ({
			x: sum.x + force.x,
			y: sum.y + force.y,
			z: sum.z + force.z
		}),
		{ x: 0, y: 0, z: 0 }
	);
}