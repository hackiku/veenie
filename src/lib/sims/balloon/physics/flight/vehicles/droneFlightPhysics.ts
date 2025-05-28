// src/lib/sims/balloon/physics/flight/vehicles/droneFlightPhysics.ts

import { FlightPhysics, type FlightConfig } from '../flightDynamics';
import { getAtmosphericConditions } from '../../atmosphere';
import type { Vec3 } from '../../engine';

/**
 * Drone/Quadcopter flight physics
 */
export class DroneFlightPhysics extends FlightPhysics {
	private rotorSpeed: number[] = [0, 0, 0, 0]; // 4 rotors
	private batteryLevel: number = 1.0;

	calculateLiftForce(atmosphere: any): number {
		// Lift from rotors - depends on rotor speed and air density
		const totalRotorSpeed = this.rotorSpeed.reduce((sum, speed) => sum + speed, 0);
		const averageRotorSpeed = totalRotorSpeed / 4;

		// Simplified rotor physics: Lift ∝ ρ * A * v²
		const rotorArea = 0.2; // m² per rotor
		const liftCoefficient = 0.8;

		return atmosphere.density * rotorArea * 4 * Math.pow(averageRotorSpeed, 1.5) * liftCoefficient;
	}

	calculateVehicleSpecificForces(delta: number): Vec3 {
		const atmosphere = getAtmosphericConditions(this.state.position.y);

		// Update rotor speeds based on throttle
		const throttle = this.controls.throttle || 0;
		this.rotorSpeed = this.rotorSpeed.map(speed => {
			const targetSpeed = throttle * 100; // Max rotor speed
			return speed + (targetSpeed - speed) * delta * 5; // Rotor response time
		});

		// Calculate lift
		const lift = this.calculateLiftForce(atmosphere);

		// Battery drain
		this.batteryLevel -= throttle * delta * 0.01; // 1% per second at full throttle
		this.batteryLevel = Math.max(0, this.batteryLevel);

		// Reduce power if battery is low
		const powerMultiplier = Math.min(1, this.batteryLevel * 5);

		return { x: 0, y: lift * powerMultiplier, z: 0 };
	}

	getVehicleSize(): number {
		return 0.5; // Drone arm span radius
	}

	getVehicleType(): string {
		return 'drone';
	}

	getBatteryLevel(): number {
		return this.batteryLevel;
	}

	getRotorSpeeds(): number[] {
		return [...this.rotorSpeed];
	}
}