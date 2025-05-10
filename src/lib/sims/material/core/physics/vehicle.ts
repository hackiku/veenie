// src/lib/sims/material/core/physics/vehicle.ts
import { VENUS_GRAVITY } from './forces';

/**
 * Interface for vehicle dimensions
 */
export interface VehicleDimensions {
	length?: number;  // meters
	width?: number;   // meters
	height?: number;  // meters
	radius?: number;  // meters (for spherical vehicles like balloons)
}

/**
 * Interface for vehicle properties
 */
export interface VehicleProperties {
	id?: string | number;         // Unique identifier
	name: string;                 // Display name
	type: string;                 // Vehicle type (balloon, airship, etc.)
	mass: number;                 // Vehicle mass in kg
	buoyancy: number;             // Buoyancy coefficient
	dragCoefficient: number;      // Drag coefficient
	dimensions: VehicleDimensions;// Vehicle dimensions
	payload?: number;             // Payload capacity in kg
	maxAltitude?: number;         // Maximum operational altitude in meters
	minAltitude?: number;         // Minimum operational altitude in meters
	maxTemperature?: number;      // Maximum tolerable temperature in Kelvin
	energyCapacity?: number;      // Energy storage capacity in kWh
	[key: string]: any;           // Additional properties
}

/**
 * Default vehicle properties for Venus atmosphere
 */
export const DEFAULT_VEHICLES: VehicleProperties[] = [
	{
		name: "Research Balloon",
		type: "balloon",
		mass: 1.2,
		buoyancy: 0.35,
		dragCoefficient: 0.05,
		dimensions: { radius: 1.5 }
	},
	{
		name: "Explorer Airship",
		type: "airship",
		mass: 2.5,
		buoyancy: 0.42,
		dragCoefficient: 0.08,
		dimensions: { length: 4, width: 1.5, height: 1.5 }
	}
];

/**
 * Get vehicle properties by name
 * 
 * @param vehicles - Array of available vehicles
 * @param name - Name of the vehicle to retrieve
 * @returns Vehicle properties or default if not found
 */
export function getVehicleByName(
	vehicles: VehicleProperties[],
	name: string
): VehicleProperties {
	const vehicle = vehicles.find(v => v.name === name);
	return vehicle || DEFAULT_VEHICLES[0];
}

/**
 * Calculate buoyancy coefficient needed for neutral buoyancy
 * 
 * @param vehicleMass - Vehicle mass in kg
 * @param atmosphericDensity - Current atmospheric density in kg/m³
 * @param gravity - Gravity constant (defaults to Venus)
 * @returns Buoyancy coefficient for neutral buoyancy
 */
export function calculateNeutralBuoyancy(
	vehicleMass: number,
	atmosphericDensity: number,
	gravity: number = VENUS_GRAVITY
): number {
	// For neutral buoyancy: buoyancy force = gravity force
	// buoyancyCoefficient * atmosphericDensity = gravity * mass
	return gravity * vehicleMass / atmosphericDensity;
}

/**
 * Calculate vehicle volume based on dimensions
 * 
 * @param dimensions - Vehicle dimensions
 * @returns Volume in cubic meters
 */
export function calculateVehicleVolume(dimensions: VehicleDimensions): number {
	if (dimensions.radius) {
		// Spherical vehicle (balloon)
		return (4 / 3) * Math.PI * Math.pow(dimensions.radius, 3);
	} else if (dimensions.length && dimensions.width && dimensions.height) {
		// Cuboid vehicle (airship approximation)
		// For airships, we use ellipsoidal approximation: (4/3) * π * a * b * c
		// where a, b, c are semi-axes (half of length, width, height)
		return (4 / 3) * Math.PI * (dimensions.length / 2) * (dimensions.width / 2) * (dimensions.height / 2);
	}

	// Default fallback
	return 1.0;
}

/**
 * Calculate lift-to-drag ratio for a vehicle
 * 
 * @param vehicleType - Type of vehicle
 * @param dragCoefficient - Vehicle's drag coefficient
 * @returns Lift-to-drag ratio
 */
export function calculateLiftToDragRatio(
	vehicleType: string,
	dragCoefficient: number
): number {
	// Typical lift-to-drag ratios for different vehicle types
	switch (vehicleType.toLowerCase()) {
		case 'balloon':
			return 0.8 / dragCoefficient;
		case 'airship':
			return 2.5 / dragCoefficient;
		default:
			return 1.0 / dragCoefficient;
	}
}

/**
 * Calculate maximum theoretical altitude for a vehicle
 * 
 * @param buoyancyCoefficient - Vehicle's buoyancy coefficient
 * @param mass - Vehicle mass in kg
 * @param baseAtmosphericDensity - Surface atmospheric density
 * @param scaleHeight - Atmospheric scale height
 * @param gravity - Gravity constant
 * @returns Maximum theoretical altitude in meters
 */
export function calculateMaxAltitude(
	buoyancyCoefficient: number,
	mass: number,
	baseAtmosphericDensity: number = 65, // Venus surface density
	scaleHeight: number = 15500,         // Venus scale height
	gravity: number = VENUS_GRAVITY
): number {
	// At maximum altitude, buoyancy force equals gravity force
	// buoyancyCoefficient * density = mass * gravity
	// density = mass * gravity / buoyancyCoefficient
	// Using exponential atmosphere model: density = baseAtmosphericDensity * exp(-altitude/scaleHeight)
	// altitude = -scaleHeight * ln(density / baseAtmosphericDensity)

	// Calculate minimum density needed for neutral buoyancy
	const minDensity = mass * gravity / buoyancyCoefficient;

	// If minimum density is greater than surface density, vehicle cannot float
	if (minDensity >= baseAtmosphericDensity) {
		return 0;
	}

	// Calculate maximum altitude
	return -scaleHeight * Math.log(minDensity / baseAtmosphericDensity);
}