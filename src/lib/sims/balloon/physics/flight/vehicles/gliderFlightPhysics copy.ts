// src/lib/sims/balloon/physics/flight/vehicles/gliderFlightPhysics.ts

import { FlightPhysics, type FlightConfig } from '../flightDynamics';
import { getAtmosphericConditions } from '../../atmosphere';
import type { Vec3 } from '../../engine';

/**
 * Glider flight physics
 */
export class GliderFlightPhysics extends FlightPhysics {
	private wingArea: number = 15.0; // m²
	private aspectRatio: number = 18; // Typical glider aspect ratio
	private liftCoefficient: number = 1.2;

	calculateLiftForce(atmosphere: any): number {
		// Lift equation: L = 0.5 * ρ * v² * Cl * A
		const airspeed = Math.sqrt(
			this.state.velocity.x ** 2 +
			this.state.velocity.z ** 2
		);

		const dynamicPressure = 0.5 * atmosphere.density * airspeed * airspeed;

		// Angle of attack affects lift coefficient (simplified)
		const angleOfAttack = Math.atan2(this.state.velocity.y, airspeed);
		const effectiveCl = this.liftCoefficient * Math.sin(angleOfAttack + 0.1); // Small positive AoA

		return dynamicPressure * effectiveCl * this.wingArea;
	}

	calculateVehicleSpecificForces(delta: number): Vec3 {
		const atmosphere = getAtmosphericConditions(this.state.position.y);

		// Calculate lift
		const lift = this.calculateLiftForce(atmosphere);

		// Induced drag from lift (simplified)
		const inducedDragCoeff = (this.liftCoefficient * this.liftCoefficient) / (Math.PI * this.aspectRatio);
		const airspeed = Math.sqrt(this.state.velocity.x ** 2 + this.state.velocity.z ** 2);
		const inducedDrag = 0.5 * atmosphere.density * airspeed * airspeed * inducedDragCoeff * this.wingArea;

		// Apply induced drag opposite to velocity direction
		const velocityMag = Math.sqrt(this.state.velocity.x ** 2 + this.state.velocity.z ** 2);
		const dragForce = velocityMag > 0 ? {
			x: -(this.state.velocity.x / velocityMag) * inducedDrag,
			y: 0,
			z: -(this.state.velocity.z / velocityMag) * inducedDrag
		} : { x: 0, y: 0, z: 0 };

		return {
			x: dragForce.x,
			y: lift,
			z: dragForce.z
		};
	}

	getVehicleSize(): number {
		return Math.sqrt(this.wingArea); // Approximate wingspan
	}

	getVehicleType(): string {
		return 'glider';
	}

	getWingArea(): number {
		return this.wingArea;
	}

	getLiftToWeight(): number {
		const atmosphere = getAtmosphericConditions(this.state.position.y);
		const lift = this.calculateLiftForce(atmosphere);
		const weight = this.config.mass * this.config.gravity;
		return lift / weight;
	}
}
