// src/lib/sims/material/physics/atmosphere.ts

// import { Vector3 } from './flight';
import type { Vector3 } from "three";

// import type { Vector3 } from './flight';

export interface AtmosphericConditions {
	density: number;     // kg/m³
	temperature: number; // Kelvin
	pressure: number;    // kPa
	windVector: Vector3; // m/s
}

export class AtmosphereModel {
	private baseDensity: number;
	private baseTemperature: number;
	private windEnabled: boolean;
	private windIntensity: number;

	constructor() {
		this.baseDensity = 1.5;        // kg/m³ at reference altitude
		this.baseTemperature = 330;    // K at reference altitude
		this.windEnabled = true;
		this.windIntensity = 1.0;
	}

	getConditionsAtAltitude(altitude: number): AtmosphericConditions {
		// Simplified exponential density model
		const density = this.baseDensity * Math.exp(-altitude / 10);

		// Linear temperature model
		const temperature = this.baseTemperature - altitude * 0.5;

		// Simplified pressure model based on density and temperature
		const pressure = density * 0.08 * temperature;

		// Simple altitude-dependent wind
		let windVector: Vector3 = { x: 0, y: 0, z: 0 };

		if (this.windEnabled) {
			// Wind increases with altitude and has some randomness
			const baseWind = 1 + altitude / 20;
			const randomFactor = 0.2;
			const randomVariation = (Math.random() * 2 - 1) * randomFactor;

			windVector = {
				x: baseWind * (1 + randomVariation) * this.windIntensity,
				y: 0,
				z: randomVariation * 0.5 * this.windIntensity
			};
		}

		return {
			density,
			temperature,
			pressure,
			windVector
		};
	}

	setWindEnabled(enabled: boolean): void {
		this.windEnabled = enabled;
	}

	setWindIntensity(intensity: number): void {
		this.windIntensity = Math.max(0, Math.min(2, intensity));
	}
}
