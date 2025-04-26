// src/lib/sims/material/physics/atmosphere.ts
import { Vector3 } from "three";

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
	private startTime: number;

	constructor() {
		this.baseDensity = 1.5;        // kg/m³ at reference altitude
		this.baseTemperature = 330;    // K at reference altitude
		this.windEnabled = true;
		this.windIntensity = 1.0;
		this.startTime = performance.now();
	}

	getConditionsAtAltitude(altitude: number): AtmosphericConditions {
		// Simplified exponential density model
		const density = this.baseDensity * Math.exp(-altitude / 10);

		// Linear temperature model
		const temperature = this.baseTemperature - altitude * 0.5;

		// Simplified pressure model based on density and temperature
		const pressure = density * 0.08 * temperature;

		// Create time-based wind with less frame-to-frame randomness
		let windVector = new Vector3(0, 0, 0);

		if (this.windEnabled) {
			// Calculate time-based variations using sine waves
			// This creates smooth, gradual changes rather than random jumps
			const timeFactor = (performance.now() - this.startTime) / 5000;

			// Base wind strength increases with altitude
			const baseWind = 1 + altitude / 20;

			// Smoother variations
			const xVariation = Math.sin(timeFactor) * 0.1;
			const zVariation = Math.cos(timeFactor * 1.3) * 0.05;

			// Set the vector properties
			windVector.set(
				baseWind * (1 + xVariation) * this.windIntensity,
				0, // No vertical wind component
				zVariation * baseWind * this.windIntensity
			);
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

		// Reset the start time when enabling wind to avoid jarring changes
		if (enabled) {
			this.startTime = performance.now();
		}
	}

	setWindIntensity(value: number): void {
		// Clamp the value between 0 and 2
		this.windIntensity = Math.max(0, Math.min(2, value));
	}

	getWindIntensity(): number {
		return this.windIntensity;
	}

	isWindEnabled(): boolean {
		return this.windEnabled;
	}
}