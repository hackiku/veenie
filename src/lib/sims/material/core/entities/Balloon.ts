
// src/lib/sims/material/core/entities/Balloon.ts

import type { VehicleProperties } from '../physics/vehicle';
import type { AtmosphericConditions } from '../physics/atmosphere';
import type { ForceCollection } from '../physics/forces';

/**
 * Interface defining the state of a balloon entity
 */
export interface BalloonState {
	// Identification
	id: string;
	name: string;

	// Physical properties (from vehicle definition)
	properties: VehicleProperties;

	// Current position and movement
	position: [number, number, number];
	velocity: [number, number, number];
	acceleration: [number, number, number];
	rotation: [number, number, number];

	// Current environmental conditions
	atmosphericConditions: AtmosphericConditions | null;

	// Current forces
	forces: ForceCollection | null;

	// Control state
	buoyancyControl: number;      // -1 to 1, controls buoyancy adjustment
	ballastRemaining: number;     // kg, remaining ballast for dropping
	heatLevel: number;            // 0 to 1, current heating level for balloon

	// System state
	health: number;               // 0 to 1, overall health
	temperature: number;          // K, internal temperature
	pressure: number;             // kPa, internal pressure
	energyRemaining: number;      // 0 to 1, remaining energy

	// Mission state
	deployed: boolean;            // Whether the balloon is deployed
	instrumentsActive: boolean[]; // Array of active instrument flags
	dataCollected: number;        // Amount of scientific data collected

	// Timing
	lastUpdated: number;          // Timestamp of last update
}

/**
 * Create a new balloon entity with default state
 * 
 * @param id - Unique identifier for the balloon
 * @param properties - Vehicle properties for the balloon
 * @param initialPosition - Starting position [x, y, z]
 * @returns A new balloon entity with default state
 */
export function createBalloon(
	id: string,
	properties: VehicleProperties,
	initialPosition: [number, number, number] = [0, 51000, 0]
): BalloonState {
	return {
		// Identification
		id,
		name: properties.name,

		// Physical properties
		properties,

		// Current position and movement
		position: initialPosition,
		velocity: [0, 0, 0],
		acceleration: [0, 0, 0],
		rotation: [0, 0, 0],

		// Environmental conditions
		atmosphericConditions: null,

		// Forces
		forces: null,

		// Control state
		buoyancyControl: 0,        // Neutral buoyancy initially
		ballastRemaining: 5,       // 5kg of ballast
		heatLevel: 0.5,            // 50% heat

		// System state
		health: 1.0,               // 100% health
		temperature: 293,          // 20°C (293K) internal temperature
		pressure: 101.3,           // Standard pressure (101.3 kPa)
		energyRemaining: 1.0,      // 100% energy

		// Mission state
		deployed: true,
		instrumentsActive: [true, true, true, true], // All instruments active
		dataCollected: 0,

		// Timing
		lastUpdated: Date.now()
	};
}

/**
 * Update balloon position based on velocity and time delta
 * 
 * @param balloon - Current balloon state
 * @param delta - Time delta in seconds
 * @returns Updated balloon state with new position
 */
export function updateBalloonPosition(
	balloon: BalloonState,
	delta: number
): BalloonState {
	// Apply velocity to position
	const newPosition: [number, number, number] = [
		balloon.position[0] + balloon.velocity[0] * delta,
		balloon.position[1] + balloon.velocity[1] * delta,
		balloon.position[2] + balloon.velocity[2] * delta
	];

	return {
		...balloon,
		position: newPosition,
		lastUpdated: Date.now()
	};
}

/**
 * Update balloon velocity based on acceleration and time delta
 * 
 * @param balloon - Current balloon state
 * @param delta - Time delta in seconds
 * @returns Updated balloon state with new velocity
 */
export function updateBalloonVelocity(
	balloon: BalloonState,
	delta: number
): BalloonState {
	// Apply acceleration to velocity
	const newVelocity: [number, number, number] = [
		balloon.velocity[0] + balloon.acceleration[0] * delta,
		balloon.velocity[1] + balloon.acceleration[1] * delta,
		balloon.velocity[2] + balloon.acceleration[2] * delta
	];

	return {
		...balloon,
		velocity: newVelocity,
		lastUpdated: Date.now()
	};
}

/**
 * Update balloon acceleration based on forces and mass
 * 
 * @param balloon - Current balloon state
 * @param forces - Current forces acting on the balloon
 * @returns Updated balloon state with new acceleration
 */
export function updateBalloonAcceleration(
	balloon: BalloonState,
	forces: ForceCollection
): BalloonState {
	// Calculate acceleration using F = ma, so a = F/m
	const mass = balloon.properties.mass;

	const newAcceleration: [number, number, number] = [
		forces.total.x / mass,
		forces.total.y / mass,
		forces.total.z / mass
	];

	return {
		...balloon,
		acceleration: newAcceleration,
		forces,
		lastUpdated: Date.now()
	};
}

/**
 * Update balloon based on atmospheric conditions
 * 
 * @param balloon - Current balloon state
 * @param conditions - Current atmospheric conditions
 * @returns Updated balloon state with new atmospheric conditions
 */
export function updateBalloonAtmosphere(
	balloon: BalloonState,
	conditions: AtmosphericConditions
): BalloonState {
	return {
		...balloon,
		atmosphericConditions: conditions,
		lastUpdated: Date.now()
	};
}

/**
 * Adjust balloon buoyancy based on control input
 * 
 * @param balloon - Current balloon state
 * @param adjustment - Buoyancy adjustment (-1 to 1)
 * @returns Updated balloon state with new buoyancy control
 */
export function adjustBalloonBuoyancy(
	balloon: BalloonState,
	adjustment: number
): BalloonState {
	// Clamp adjustment between -1 and 1
	const newBuoyancyControl = Math.max(-1, Math.min(1, adjustment));

	return {
		...balloon,
		buoyancyControl: newBuoyancyControl,
		lastUpdated: Date.now()
	};
}

/**
 * Drop ballast to increase buoyancy
 * 
 * @param balloon - Current balloon state
 * @param amount - Amount of ballast to drop in kg
 * @returns Updated balloon state with reduced ballast and mass
 */
export function dropBallast(
	balloon: BalloonState,
	amount: number
): BalloonState {
	// Calculate how much ballast can actually be dropped
	const droppableAmount = Math.min(amount, balloon.ballastRemaining);

	if (droppableAmount <= 0) {
		return balloon; // No ballast to drop
	}

	// Reduce ballast remaining
	const newBallastRemaining = balloon.ballastRemaining - droppableAmount;

	// Reduce vehicle mass
	const newProperties = {
		...balloon.properties,
		mass: balloon.properties.mass - droppableAmount
	};

	return {
		...balloon,
		properties: newProperties,
		ballastRemaining: newBallastRemaining,
		lastUpdated: Date.now()
	};
}

/**
 * Activate or deactivate scientific instruments
 * 
 * @param balloon - Current balloon state
 * @param instrumentIndex - Index of the instrument to toggle
 * @param active - Whether the instrument should be active
 * @returns Updated balloon state with new instrument state
 */
export function setInstrumentActive(
	balloon: BalloonState,
	instrumentIndex: number,
	active: boolean
): BalloonState {
	if (instrumentIndex < 0 || instrumentIndex >= balloon.instrumentsActive.length) {
		return balloon; // Invalid instrument index
	}

	// Create a new array with the updated instrument state
	const newInstrumentsActive = [...balloon.instrumentsActive];
	newInstrumentsActive[instrumentIndex] = active;

	return {
		...balloon,
		instrumentsActive: newInstrumentsActive,
		lastUpdated: Date.now()
	};
}

/**
 * Record scientific data based on active instruments and conditions
 * 
 * @param balloon - Current balloon state
 * @param dataAmount - Amount of data to record
 * @returns Updated balloon state with increased data collection
 */
export function recordScientificData(
	balloon: BalloonState,
	dataAmount: number
): BalloonState {
	// Count how many instruments are active
	const activeInstruments = balloon.instrumentsActive.filter(active => active).length;

	// Data collection is proportional to number of active instruments
	const collectionMultiplier = activeInstruments / balloon.instrumentsActive.length;
	const dataCollected = balloon.dataCollected + (dataAmount * collectionMultiplier);

	return {
		...balloon,
		dataCollected,
		lastUpdated: Date.now()
	};
}