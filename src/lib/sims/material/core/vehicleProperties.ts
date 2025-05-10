// src/lib/sims/material/core/vehicleProperties.ts

export interface VehicleProperties {
	name: string;
	type: string;
	mass: number;
	buoyancy: number;
	dragCoefficient: number;
	dimensions: {
		length?: number;
		width?: number;
		height?: number;
		radius?: number;
	};
	[key: string]: any;
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
 */
export function getVehicleByName(vehicles: VehicleProperties[], name: string): VehicleProperties {
	const vehicle = vehicles.find(v => v.name === name);
	return vehicle || DEFAULT_VEHICLES[0];
}

/**
 * Calculate buoyancy to maintain neutral buoyancy at a specific altitude
 */
export function calculateNeutralBuoyancy(
	vehicleMass: number,
	atmosphericDensity: number,
	venusGravity: number = 8.87
): number {
	return venusGravity * vehicleMass / atmosphericDensity;
}