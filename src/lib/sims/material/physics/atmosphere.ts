// src/lib/sims/material/physics/atmosphere.ts
import { Vector3 } from "three";

export interface AtmosphericConditions {
	density: number;     // kg/m³
	temperature: number; // Kelvin
	pressure: number;    // kPa
	windVector: Vector3; // m/s
}

export interface AtmosphereLayer {
	altitude: number;
	name: string;
	color: string;
	opacity: number;
	density: number;
	temperature: number;
	pressure: number;
	windSpeed: number;
}

export class AtmosphereModel {
	private baseDensity: number;
	private baseTemperature: number;
	private windEnabled: boolean;
	private windIntensity: number;
	private startTime: number;
	private layers: AtmosphereLayer[];
	private profile: Array<{ altitude: number, temperature: number, pressure: number }>;

	constructor(dbData = null) {
		// Default values
		this.baseDensity = 1.5;
		this.baseTemperature = 330;
		this.windEnabled = true;
		this.windIntensity = 1.0;
		this.startTime = performance.now();
		this.layers = [];
		this.profile = [];

		// Override with DB data if available
		if (dbData) {
			this.initFromDatabase(dbData);
		}
	}

	initFromDatabase(dbData) {
		// Store the layers
		if (dbData.layers && dbData.layers.length > 0) {
			this.layers = dbData.layers;

			// Set base values from the reference layer (usually lower atmosphere)
			const referenceLayer = this.layers.find(l => l.altitude < 10) || this.layers[0];
			if (referenceLayer) {
				this.baseDensity = referenceLayer.density;
				this.baseTemperature = referenceLayer.temperature;
			}
		}

		// Store the temperature-pressure profile
		if (dbData.profile && dbData.profile.length > 0) {
			this.profile = dbData.profile;
		}
	}

	getConditionsAtAltitude(altitude: number): AtmosphericConditions {
		// Try to find matching layer from DB data
		const layer = this.findNearestLayer(altitude);

		// Calculate density using exponential model or from layer
		const density = layer ?
			layer.density * Math.exp((layer.altitude - altitude) / 10) :
			this.baseDensity * Math.exp(-altitude / 10);

		// Calculate temperature using linear model or from layer/profile
		const temperature = layer ?
			this.interpolateTemperature(altitude) :
			this.baseTemperature - altitude * 0.5;

		// Calculate pressure using ideal gas law or from layer/profile
		const pressure = layer ?
			this.interpolatePressure(altitude) :
			density * 0.08 * temperature;

		// Create wind vector
		let windVector = new Vector3(0, 0, 0);

		if (this.windEnabled) {
			// Calculate time-based variations using sine waves
			const timeFactor = (performance.now() - this.startTime) / 5000;

			// Base wind strength from layer or calculated
			const baseWind = layer ? layer.windSpeed : (1 + altitude / 20);

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

	// Helper to find the nearest layer
	private findNearestLayer(altitude: number): AtmosphereLayer | null {
		if (!this.layers || this.layers.length === 0) return null;

		// Find the layer closest to but not above our altitude
		return this.layers
			.filter(layer => layer.altitude <= altitude)
			.sort((a, b) => b.altitude - a.altitude)[0] || this.layers[0];
	}

	// Interpolate temperature based on profile data
	private interpolateTemperature(altitude: number): number {
		if (!this.profile || this.profile.length < 2) {
			return this.baseTemperature - altitude * 0.5; // Fallback
		}

		return this.interpolateValue(altitude, 'temperature');
	}

	// Interpolate pressure based on profile data
	private interpolatePressure(altitude: number): number {
		if (!this.profile || this.profile.length < 2) {
			// Fallback - rough estimate
			return this.baseDensity * Math.exp(-altitude / 10) * 0.08 * this.baseTemperature;
		}

		return this.interpolateValue(altitude, 'pressure');
	}

	// Generic interpolation helper
	private interpolateValue(altitude: number, property: string): number {
		// Sort profile by altitude
		const sortedProfile = [...this.profile].sort((a, b) => a.altitude - b.altitude);

		// If below lowest point
		if (altitude <= sortedProfile[0].altitude) {
			return sortedProfile[0][property];
		}

		// If above highest point
		if (altitude >= sortedProfile[sortedProfile.length - 1].altitude) {
			return sortedProfile[sortedProfile.length - 1][property];
		}

		// Find the two points to interpolate between
		for (let i = 0; i < sortedProfile.length - 1; i++) {
			const lowerPoint = sortedProfile[i];
			const upperPoint = sortedProfile[i + 1];

			if (altitude >= lowerPoint.altitude && altitude < upperPoint.altitude) {
				// Linear interpolation
				const ratio = (altitude - lowerPoint.altitude) /
					(upperPoint.altitude - lowerPoint.altitude);

				return lowerPoint[property] + ratio * (upperPoint[property] - lowerPoint[property]);
			}
		}

		// Fallback - this shouldn't happen
		return sortedProfile[0][property];
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

	getCloudLayers(): any[] {
		// Extract cloud layers from the layers data
		return this.layers
			.filter(layer => layer.name.toLowerCase().includes('cloud'))
			.map(layer => ({
				altitude: layer.altitude,
				thickness: 5, // Default thickness
				density: layer.density
			}));
	}
}