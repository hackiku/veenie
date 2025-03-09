// src/lib/sims/flight/physics/motion.ts
// Motion physics and kinematics for Venus flight simulation

import type { RigidBody } from '@dimforge/rapier3d-compat';
import type { PhysicsState, Vector3, ControlInputs } from './types';
import { getPhysicsState, calculateNetForce } from './forces';
import {
	getAtmosphereDensity,
	getTemperatureAtAltitude,
	getPressureAtAltitude,
	getWindVector
} from '$lib/data/flight/atmosphereModel';
import { ALTITUDE } from '$lib/data/flight/constants';

/**
 * Calculate the full physics state for a rigid body
 * @param rigidBody The rigid body
 * @param controls Current control inputs
 * @param time Current simulation time
 * @returns Complete physics state
 */
export function calculatePhysicsState(
	rigidBody: RigidBody,
	controls: ControlInputs,
	time: number
): PhysicsState {
	if (!rigidBody) {
		return createEmptyPhysicsState();
	}

	// Get position and calculate altitude
	const position = rigidBody.translation();
	const altitude = position.y;

	// Get velocity vector
	const velocity = rigidBody.linvel();

	// Calculate atmospheric properties at current altitude
	const density = getAtmosphereDensity(altitude);
	const pressure = getPressureAtAltitude(altitude);
	const temperature = getTemperatureAtAltitude(altitude);

	// Get wind vector
	const windVectorArray = getWindVector(altitude, time);
	const windVector = {
		x: windVectorArray[0],
		y: windVectorArray[1],
		z: windVectorArray[2]
	};

	// Calculate forces
	const netForce = calculateNetForce(rigidBody, altitude, controls, time);

	// Calculate drag force from net force
	const dragForce = {
		x: -velocity.x * 0.3 * density,
		y: -velocity.y * 0.3 * density,
		z: -velocity.z * 0.3 * density
	};

	// Calculate buoyancy force
	const buoyancyForce = controls.buoyancyForce;

	// Calculate speed metrics
	const airspeed = calculateAirspeed(velocity, windVector);
	const groundSpeed = calculateGroundSpeed(velocity);
	const verticalSpeed = velocity.y;

	return {
		position: {
			x: position.x,
			y: position.y,
			z: position.z
		},
		velocity: {
			x: velocity.x,
			y: velocity.y,
			z: velocity.z
		},
		altitude,

		// Environmental conditions
		density,
		pressure,
		temperature,
		windVector,

		// Forces
		buoyancyForce,
		dragForce,
		netForce,

		// Speed metrics
		airspeed,
		verticalSpeed,
		groundSpeed
	};
}

/**
 * Create an empty physics state with default values
 * @returns Default empty physics state
 */
function createEmptyPhysicsState(): PhysicsState {
	return {
		position: { x: 0, y: ALTITUDE.CLOUD_LAYER, z: 0 },
		velocity: { x: 0, y: 0, z: 0 },
		altitude: ALTITUDE.CLOUD_LAYER,

		density: 0,
		pressure: 0,
		temperature: 0,
		windVector: { x: 0, y: 0, z: 0 },

		buoyancyForce: 0,
		dragForce: { x: 0, y: 0, z: 0 },
		netForce: { x: 0, y: 0, z: 0 },

		airspeed: 0,
		verticalSpeed: 0,
		groundSpeed: 0
	};
}

/**
 * Calculate airspeed (speed relative to surrounding air)
 * @param velocity Velocity vector
 * @param windVector Wind vector
 * @returns Airspeed in m/s
 */
export function calculateAirspeed(velocity: Vector3, windVector: Vector3): number {
	// Airspeed is the magnitude of the velocity vector relative to the air
	const relativeVelocity = {
		x: velocity.x - windVector.x,
		y: velocity.y - windVector.y,
		z: velocity.z - windVector.z
	};

	return Math.sqrt(
		relativeVelocity.x * relativeVelocity.x +
		relativeVelocity.y * relativeVelocity.y +
		relativeVelocity.z * relativeVelocity.z
	);
}

/**
 * Calculate ground speed (horizontal component of velocity)
 * @param velocity Velocity vector
 * @returns Ground speed in m/s
 */
export function calculateGroundSpeed(velocity: Vector3): number {
	// Ground speed is the magnitude of the horizontal velocity vector
	return Math.sqrt(
		velocity.x * velocity.x +
		velocity.z * velocity.z
	);
}

/**
 * Calculate vertical speed (climb or descent rate)
 * @param velocity Velocity vector
 * @returns Vertical speed in m/s
 */
export function calculateVerticalSpeed(velocity: Vector3): number {
	return velocity.y;
}

/**
 * Calculate relative altitude above a reference level
 * @param altitude Current absolute altitude in km
 * @param referenceAltitude Reference altitude in km
 * @returns Relative altitude in meters
 */
export function calculateRelativeAltitude(
	altitude: number,
	referenceAltitude: number = ALTITUDE.CLOUD_LAYER
): number {
	return (altitude - referenceAltitude) * 1000; // Convert km to meters
}

/**
 * Update the physics simulation for a single step
 * @param rigidBody The rigid body to update
 * @param controls Current control inputs
 * @param deltaTime Time step in seconds
 * @param time Current simulation time
 * @returns Updated physics state
 */
export function updatePhysics(
	rigidBody: RigidBody,
	controls: ControlInputs,
	deltaTime: number,
	time: number
): PhysicsState {
	if (!rigidBody) {
		return createEmptyPhysicsState();
	}

	// Get current position and velocity
	const position = rigidBody.translation();
	const altitude = position.y;

	// Apply all forces
	const { applyForces } = require('./forces');
	applyForces(rigidBody, deltaTime, controls, altitude, time);

	// Calculate and return the new state
	return calculatePhysicsState(rigidBody, controls, time);
}

/**
 * Get altitude classification (description of current altitude layer)
 * @param altitude Current altitude in km
 * @returns String description of the current altitude layer
 */
export function getAltitudeClassification(altitude: number): string {
	if (altitude < 0) return "Below Surface";
	if (altitude < 10) return "Lower Atmosphere";
	if (altitude < ALTITUDE.LOWER_HAZE) return "Near Surface";
	if (altitude < 30) return "Lower Haze Layer";
	if (altitude < ALTITUDE.LOWER_CLOUD) return "Approaching Clouds";
	if (altitude < ALTITUDE.CLOUD_LAYER) return "Lower Cloud Layer";
	if (altitude < ALTITUDE.UPPER_CLOUD) return "Main Cloud Layer";
	if (altitude < ALTITUDE.UPPER_HAZE) return "Upper Cloud Layer";
	if (altitude < ALTITUDE.TOP_OF_ATMOSPHERE) return "Upper Haze Layer";
	return "Outer Atmosphere";
}

/**
 * Create a simplified altimeter display data
 * @param currentAltitude Current altitude in km
 * @param referenceAltitude Reference altitude (QNH equivalent) in km
 * @returns Altimeter data object for display
 */
export function createAltimeterData(
	currentAltitude: number,
	referenceAltitude: number = ALTITUDE.CLOUD_LAYER
): {
	absoluteAltitude: number;       // Kilometers
	relativeAltitude: number;       // Meters relative to reference
	verticalTrend: 'up' | 'down' | 'level';
	safetyStatus: 'safe' | 'caution' | 'danger';
	layer: string;
} {
	// Calculate relative altitude in meters
	const relativeAltitude = calculateRelativeAltitude(currentAltitude, referenceAltitude);

	// Determine vertical trend based on relative position to cloud layer
	let verticalTrend: 'up' | 'down' | 'level';
	if (Math.abs(relativeAltitude) < 100) {
		verticalTrend = 'level';
	} else if (relativeAltitude > 0) {
		verticalTrend = 'up';
	} else {
		verticalTrend = 'down';
	}

	// Determine safety status based on altitude
	let safetyStatus: 'safe' | 'caution' | 'danger';
	if (currentAltitude > ALTITUDE.UPPER_CLOUD || currentAltitude < ALTITUDE.LOWER_CLOUD) {
		safetyStatus = 'caution';
	} else if (currentAltitude > ALTITUDE.UPPER_HAZE || currentAltitude < 30) {
		safetyStatus = 'danger';
	} else {
		safetyStatus = 'safe';
	}

	// Get current layer description
	const layer = getAltitudeClassification(currentAltitude);

	return {
		absoluteAltitude: parseFloat(currentAltitude.toFixed(2)),
		relativeAltitude: Math.round(relativeAltitude),
		verticalTrend,
		safetyStatus,
		layer
	};
}