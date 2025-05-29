// src/lib/sims/balloon/physics/flight/VehicleFactory.ts

import type { Vec3 } from '../engine';

export type VehicleType = 'balloon' | 'drone' | 'glider';

export interface VehicleConfig {
	type: VehicleType;
	mass: number;
	position: Vec3;
	// Vehicle-specific config
	[key: string]: any;
}

/**
 * Factory for creating different vehicle types
 */
export class VehicleFactory {
	static createVehicle(config: VehicleConfig): FlightPhysics {
		switch (config.type) {
			case 'balloon':
				return new BalloonFlightPhysics({
					mass: config.mass,
					dragCoefficient: 0.5,
					crossSectionalArea: Math.PI * (config.initialSize || 3.42) ** 2,
					gravity: 8.87,
					controlSensitivity: 100.9,
					initialSize: config.initialSize || 3.42,
					minSize: config.minSize || 0.01,
					maxSize: config.maxSize || 50.0,
					gasDensityRatio: config.gasDensityRatio || 1 / 8
				}, config.position);

			case 'drone':
				return new DroneFlightPhysics({
					mass: config.mass,
					dragCoefficient: 0.8,
					crossSectionalArea: 0.2,
					gravity: 8.87,
					controlSensitivity: 50.0
				}, config.position);

			case 'glider':
				return new GliderFlightPhysics({
					mass: config.mass,
					dragCoefficient: 0.02, // Very low parasite drag
					crossSectionalArea: 1.0, // Fuselage cross-section
					gravity: 8.87,
					controlSensitivity: 25.0
				}, config.position);

			default:
				throw new Error(`Unknown vehicle type: ${config.type}`);
		}
	}
}