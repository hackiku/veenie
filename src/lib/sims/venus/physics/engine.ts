// src/lib/sims/venus/physics/engine.ts

import {
	VENUS_CONSTANTS,
	type PlanetaryCoords,
	type CartesianCoords,
	type AtmosphericCoords,
	getAtmosphericProperties,
	getWindVector,
	planetaryToCartesian,
	cartesianToPlanetary,
	getSunPosition
} from './coordinates';

/**
 * Venus Physics Engine
 * 
 * Handles atmospheric dynamics, thermal modeling, and time-based physics
 * for the Venus planetary simulation at 1+ hour time scales.
 */

// =============================================================================
// PHYSICS STATE INTERFACES
// =============================================================================

export interface AtmosphericCell {
	coords: PlanetaryCoords;
	properties: {
		pressure: number;      // bar
		temperature: number;   // °C
		density: number;       // kg/m³
		humidity: number;      // relative humidity (0-1)
		composition: {
			co2: number;        // CO2 percentage
			n2: number;         // N2 percentage
			so2: number;        // SO2 percentage
			h2so4: number;      // H2SO4 aerosols percentage
		};
	};
	dynamics: {
		windVelocity: { speed: number; direction: number; vertical: number };
		turbulence: number;    // turbulence intensity
		convection: number;    // convective activity
	};
	thermal: {
		solarHeating: number;  // W/m²
		irHeating: number;     // IR heating from greenhouse effect
		irCooling: number;     // IR cooling to space
		netHeating: number;    // Net heating rate
	};
}

export interface HadleyCellState {
	strength: number;        // Cell circulation strength
	latitude: number;        // Cell center latitude
	width: number;          // Cell width in degrees
	rising: boolean;        // Is air rising or sinking here
}

export interface VenusPhysicsState {
	time: {
		elapsed: number;       // Simulation seconds elapsed
		venusDay: number;      // Current Venus day
		solarDay: number;      // Current solar day
		date: Date;           // Current simulation date
	};
	atmosphere: {
		cells: AtmosphericCell[][];  // 3D grid of atmospheric cells
		hadleyCells: HadleyCellState[];
		globalCirculation: {
			superRotationSpeed: number;  // m/s
			equatorialJet: number;       // Jet stream strength
			polarConvection: number;     // Polar convection activity
		};
	};
	thermal: {
		globalTemperature: number;    // Global average temperature
		temperatureGradient: number;  // Pole-to-equator gradient
		greenhouseStrength: number;   // Greenhouse effect strength
		solarConstant: number;        // Solar flux at Venus orbit
	};
	orbital: {
		sunPosition: CartesianCoords; // Sun position relative to Venus
		solarFlux: number;           // Current solar flux
		orbitPhase: number;          // Position in orbit (0-1)
	};
}

// =============================================================================
// PHYSICS ENGINE CLASS
// =============================================================================

export class VenusPhysicsEngine {
	private state: VenusPhysicsState;
	private updateInterval: number = 1.0; // Update every 1 second of simulation time
	private lastUpdate: number = 0;

	constructor() {
		this.state = this.initializeState();
	}

	/**
	 * Initialize the physics state
	 */
	private initializeState(): VenusPhysicsState {
		// Initialize atmospheric grid (simplified - lat/lon grid)
		const latResolution = 18; // 10-degree latitude bands
		const lonResolution = 36; // 10-degree longitude bands
		const altLayers = 10;     // 10 altitude layers

		const cells: AtmosphericCell[][] = [];

		for (let lat = 0; lat < latResolution; lat++) {
			cells[lat] = [];
			for (let lon = 0; lon < lonResolution; lon++) {
				cells[lat][lon] = this.createAtmosphericCell(
					(lat * 10) - 90,    // -90 to +80 degrees
					lon * 10,           // 0 to 350 degrees
					55                  // Cloud layer altitude
				);
			}
		}

		// Initialize Hadley cells (simplified - 3 cells per hemisphere)
		const hadleyCells: HadleyCellState[] = [
			{ strength: 1.0, latitude: -60, width: 30, rising: false }, // Southern polar
			{ strength: 1.5, latitude: -30, width: 30, rising: true },  // Southern mid-lat
			{ strength: 2.0, latitude: 0, width: 30, rising: false },   // Equatorial
			{ strength: 1.5, latitude: 30, width: 30, rising: true },   // Northern mid-lat
			{ strength: 1.0, latitude: 60, width: 30, rising: false },  // Northern polar
		];

		return {
			time: {
				elapsed: 0,
				venusDay: 0,
				solarDay: 0,
				date: new Date()
			},
			atmosphere: {
				cells,
				hadleyCells,
				globalCirculation: {
					superRotationSpeed: 100,  // Strong super-rotation
					equatorialJet: 120,
					polarConvection: 0.5
				}
			},
			thermal: {
				globalTemperature: 462,
				temperatureGradient: 20,  // Small gradient due to thick atmosphere
				greenhouseStrength: 0.95, // Very strong greenhouse effect
				solarConstant: 2601       // W/m² at Venus orbit
			},
			orbital: {
				sunPosition: { x: 0, y: 0, z: 0 },
				solarFlux: 2601,
				orbitPhase: 0
			}
		};
	}

	/**
	 * Create an atmospheric cell at given coordinates
	 */
	private createAtmosphericCell(lat: number, lon: number, alt: number): AtmosphericCell {
		const coords: PlanetaryCoords = { latitude: lat, longitude: lon, altitude: alt };
		const properties = getAtmosphericProperties(alt);
		const windVector = getWindVector(coords, 0);

		// Calculate thermal properties without referencing this.state
		const solarHeating = this.calculateSolarHeatingStatic(coords);
		const irHeating = this.calculateIRHeatingStatic(coords);
		const irCooling = this.calculateIRCoolingStatic(coords, properties.temperature);

		return {
			coords,
			properties: {
				pressure: properties.pressure,
				temperature: properties.temperature,
				density: properties.density,
				humidity: 0.0, // Venus has very low water vapor
				composition: {
					co2: 96.5,
					n2: 3.5,
					so2: 0.015,
					h2so4: 0.1
				}
			},
			dynamics: {
				windVelocity: {
					speed: windVector.speed,
					direction: windVector.direction,
					vertical: 0
				},
				turbulence: 0.1,
				convection: alt < 50 ? 0.1 : 0.8 // Higher convection in cloud layer
			},
			thermal: {
				solarHeating,
				irHeating,
				irCooling,
				netHeating: solarHeating + irHeating - irCooling
			}
		};
	}

	/**
	 * Update physics state
	 */
	public update(deltaTime: number, currentTime: Date): VenusPhysicsState {
		this.state.time.elapsed += deltaTime;
		this.state.time.date = new Date(currentTime);

		// Calculate Venus days
		const secondsPerVenusDay = VENUS_CONSTANTS.SIDEREAL_DAY * 24 * 3600;
		const secondsPerSolarDay = VENUS_CONSTANTS.SOLAR_DAY * 24 * 3600;

		this.state.time.venusDay = this.state.time.elapsed / secondsPerVenusDay;
		this.state.time.solarDay = this.state.time.elapsed / secondsPerSolarDay;

		// Update orbital position
		const daysSinceEpoch = this.state.time.elapsed / (24 * 3600);
		this.state.orbital.sunPosition = getSunPosition(daysSinceEpoch);
		this.state.orbital.orbitPhase = (daysSinceEpoch / VENUS_CONSTANTS.ORBITAL_PERIOD) % 1;

		// Update at specified intervals for performance
		if (this.state.time.elapsed - this.lastUpdate >= this.updateInterval) {
			this.updateAtmosphericDynamics(deltaTime);
			this.updateThermalModel(deltaTime);
			this.updateHadleyCells(deltaTime);
			this.lastUpdate = this.state.time.elapsed;
		}

		return this.state;
	}

	/**
	 * Update atmospheric dynamics
	 */
	private updateAtmosphericDynamics(deltaTime: number): void {
		// Update super-rotation
		const seasonalVariation = Math.sin(this.state.orbital.orbitPhase * 2 * Math.PI) * 5;
		this.state.atmosphere.globalCirculation.superRotationSpeed = 100 + seasonalVariation;

		// Update each atmospheric cell
		for (let lat = 0; lat < this.state.atmosphere.cells.length; lat++) {
			for (let lon = 0; lon < this.state.atmosphere.cells[lat].length; lon++) {
				const cell = this.state.atmosphere.cells[lat][lon];

				// Update wind patterns
				const newWind = getWindVector(cell.coords, this.state.time.elapsed);
				cell.dynamics.windVelocity.speed = newWind.speed;
				cell.dynamics.windVelocity.direction = newWind.direction;

				// Update convection based on heating
				if (cell.thermal.netHeating > 0) {
					cell.dynamics.convection = Math.min(1.0, cell.dynamics.convection + 0.01);
				} else {
					cell.dynamics.convection = Math.max(0.0, cell.dynamics.convection - 0.01);
				}
			}
		}
	}

	/**
	 * Update thermal model
	 */
	private updateThermalModel(deltaTime: number): void {
		const solarFlux = this.state.thermal.solarConstant;

		// Update each cell's thermal properties
		for (let lat = 0; lat < this.state.atmosphere.cells.length; lat++) {
			for (let lon = 0; lon < this.state.atmosphere.cells[lat].length; lon++) {
				const cell = this.state.atmosphere.cells[lat][lon];

				// Calculate heating components
				cell.thermal.solarHeating = this.calculateSolarHeating(cell.coords);
				cell.thermal.irHeating = this.calculateIRHeating(cell.coords);
				cell.thermal.irCooling = this.calculateIRCooling(cell.coords, cell.properties.temperature);

				// Net heating
				cell.thermal.netHeating =
					cell.thermal.solarHeating +
					cell.thermal.irHeating -
					cell.thermal.irCooling;

				// Update temperature (simplified)
				const heatCapacity = 1000; // J/kg/K (simplified)
				const tempChange = (cell.thermal.netHeating * deltaTime) /
					(cell.properties.density * heatCapacity);

				cell.properties.temperature += tempChange * 0.001; // Slow thermal response
			}
		}
	}

	/**
	 * Update Hadley cell circulation
	 */
	private updateHadleyCells(deltaTime: number): void {
		for (const cell of this.state.atmosphere.hadleyCells) {
			// Seasonal variation in Hadley cell strength
			const seasonalFactor = 1 + 0.1 * Math.sin(this.state.orbital.orbitPhase * 2 * Math.PI);
			cell.strength *= seasonalFactor;

			// Limit strength variations
			cell.strength = Math.max(0.5, Math.min(2.5, cell.strength));
		}
	}

	/**
	 * Calculate solar heating at given coordinates (static version for initialization)
	 */
	private calculateSolarHeatingStatic(coords: PlanetaryCoords): number {
		const { latitude, altitude } = coords;

		// Solar zenith angle (simplified)
		const zenithAngle = Math.abs(latitude) * Math.PI / 180;
		const cosZenith = Math.cos(zenithAngle);

		// Atmospheric absorption (altitude dependent)
		const absorption = altitude < 50 ? 0.95 : 0.7; // Less absorption above clouds

		// Base solar flux (Venus solar constant)
		const baseSolarFlux = 2601 * 0.25; // Quarter sphere

		return baseSolarFlux * cosZenith * (1 - absorption);
	}

	/**
	 * Calculate IR heating from greenhouse effect (static version)
	 */
	private calculateIRHeatingStatic(coords: PlanetaryCoords): number {
		const { altitude } = coords;

		// Strong greenhouse heating in lower atmosphere
		if (altitude < 30) {
			return 300; // Strong IR heating
		} else if (altitude < 60) {
			return 150; // Moderate heating in cloud layer
		} else {
			return 50;  // Weak heating above clouds
		}
	}

	/**
	 * Calculate IR cooling to space (static version)
	 */
	private calculateIRCoolingStatic(coords: PlanetaryCoords, temperature: number): number {
		const { altitude } = coords;

		// Stefan-Boltzmann cooling (simplified)
		const emissivity = altitude > 60 ? 0.8 : 0.1; // Much better cooling above clouds
		const stefanBoltzmann = 5.67e-8;
		const tempKelvin = temperature + 273.15;

		return emissivity * stefanBoltzmann * Math.pow(tempKelvin, 4) / 1000; // Convert to reasonable units
	}

	/**
	 * Calculate solar heating at given coordinates
	 */
	private calculateSolarHeating(coords: PlanetaryCoords): number {
		const { latitude, altitude } = coords;

		// Solar zenith angle (simplified)
		const zenithAngle = Math.abs(latitude) * Math.PI / 180;
		const cosZenith = Math.cos(zenithAngle);

		// Atmospheric absorption (altitude dependent)
		const absorption = altitude < 50 ? 0.95 : 0.7; // Less absorption above clouds

		// Base solar flux
		const baseSolarFlux = this.state.thermal.solarConstant * 0.25; // Quarter sphere

		return baseSolarFlux * cosZenith * (1 - absorption);
	}

	/**
	 * Calculate IR heating from greenhouse effect
	 */
	private calculateIRHeating(coords: PlanetaryCoords): number {
		const { altitude } = coords;

		// Strong greenhouse heating in lower atmosphere
		if (altitude < 30) {
			return 300; // Strong IR heating
		} else if (altitude < 60) {
			return 150; // Moderate heating in cloud layer
		} else {
			return 50;  // Weak heating above clouds
		}
	}

	/**
	 * Calculate IR cooling to space
	 */
	private calculateIRCooling(coords: PlanetaryCoords, temperature?: number): number {
		const { altitude } = coords;
		const temp = temperature || 400; // fallback temperature if not provided

		// Stefan-Boltzmann cooling (simplified)
		const emissivity = altitude > 60 ? 0.8 : 0.1; // Much better cooling above clouds
		const stefanBoltzmann = 5.67e-8;
		const tempKelvin = temp + 273.15;

		return emissivity * stefanBoltzmann * Math.pow(tempKelvin, 4) / 1000; // Convert to reasonable units
	}

	/**
	 * Get atmospheric state at specific coordinates
	 */
	public getAtmosphericState(coords: PlanetaryCoords): AtmosphericCell | null {
		// Find nearest cell in grid
		const latIndex = Math.round((coords.latitude + 90) / 10);
		const lonIndex = Math.round(coords.longitude / 10);

		if (latIndex >= 0 && latIndex < this.state.atmosphere.cells.length &&
			lonIndex >= 0 && lonIndex < this.state.atmosphere.cells[0].length) {
			return this.state.atmosphere.cells[latIndex][lonIndex];
		}

		return null;
	}

	/**
	 * Get current physics state
	 */
	public getState(): VenusPhysicsState {
		return this.state;
	}

	/**
	 * Reset physics state
	 */
	public reset(): void {
		this.state = this.initializeState();
		this.lastUpdate = 0;
	}
}