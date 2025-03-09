// src/lib/data/flight/vehicleModels.ts
// Vehicle models, designs, and performance data

import { PHYSICS } from './constants';

/**
 * Balloon aerostats for Venus exploration
 */
export const BALLOON_VEHICLES = {
	// Small sensor probe balloon
	EXPLORER: {
		NAME: "Explorer Probe",
		DESCRIPTION: "Small atmospheric sensor platform",
		MASS: 20,          // kg
		PAYLOAD_MASS: 5,   // kg
		VOLUME: 5,         // m³
		DIAMETER: 2.1,     // m
		LIFT_CAPACITY: 25, // kg at cloud altitude
		ENDURANCE: 30,     // days
		POWER: 50,         // Watts
		MAX_ALTITUDE: 65,  // km
		MIN_ALTITUDE: 45,  // km
		MANEUVERABILITY: 0.2, // Low maneuverability (0-1 scale)
		DRAG_COEFFICIENT: 0.4,
		COLOR: "#E7A621",
	},

	// Medium research balloon
	SCIENTIST: {
		NAME: "Scientist Platform",
		DESCRIPTION: "Mid-sized research aerostat with substantial instrument suite",
		MASS: 120,         // kg
		PAYLOAD_MASS: 50,  // kg
		VOLUME: 30,        // m³
		DIAMETER: 3.8,     // m
		LIFT_CAPACITY: 150, // kg at cloud altitude
		ENDURANCE: 90,     // days
		POWER: 200,        // Watts
		MAX_ALTITUDE: 70,  // km
		MIN_ALTITUDE: 40,  // km
		MANEUVERABILITY: 0.5, // Medium maneuverability (0-1 scale)
		DRAG_COEFFICIENT: 0.35,
		COLOR: "#2196F3",
	},

	// Large habitable aerostat
	HABITAT: {
		NAME: "Venus Habitat",
		DESCRIPTION: "Large aerostat capable of supporting human explorers",
		MASS: 1500,        // kg
		PAYLOAD_MASS: 1000, // kg
		VOLUME: 250,       // m³
		DIAMETER: 8.5,     // m
		LIFT_CAPACITY: 2700, // kg at cloud altitude
		ENDURANCE: 180,    // days
		POWER: 5000,       // Watts
		MAX_ALTITUDE: 65,  // km
		MIN_ALTITUDE: 50,  // km
		MANEUVERABILITY: 0.7, // High maneuverability (0-1 scale)
		DRAG_COEFFICIENT: 0.3,
		COLOR: "#8BC34A",
	}
};

/**
 * Airship/Dirigible style vehicles with propulsion
 */
export const AIRSHIP_VEHICLES = {
	// Small dirigible
	SCOUT: {
		NAME: "Scout Airship",
		DESCRIPTION: "Small, rapid exploration dirigible",
		MASS: 80,          // kg
		PAYLOAD_MASS: 20,  // kg
		VOLUME: 20,        // m³
		LENGTH: 6,         // m
		DIAMETER: 2.5,     // m
		THRUST: 100,       // Newtons
		MAX_SPEED: 30,     // m/s
		LIFT_CAPACITY: 105, // kg at cloud altitude
		ENDURANCE: 20,     // days
		POWER: 300,        // Watts
		MAX_ALTITUDE: 70,  // km
		MIN_ALTITUDE: 40,  // km
		MANEUVERABILITY: 0.8, // High maneuverability (0-1 scale)
		DRAG_COEFFICIENT: 0.2,
		COLOR: "#FF5722",
	},

	// Large expedition airship
	VOYAGER: {
		NAME: "Voyager Airship",
		DESCRIPTION: "Long-range expedition airship with multiple propulsion units",
		MASS: 500,         // kg
		PAYLOAD_MASS: 250, // kg
		VOLUME: 150,       // m³
		LENGTH: 15,        // m
		DIAMETER: 5,       // m
		THRUST: 400,       // Newtons
		MAX_SPEED: 40,     // m/s
		LIFT_CAPACITY: 780, // kg at cloud altitude
		ENDURANCE: 120,    // days
		POWER: 2000,       // Watts
		MAX_ALTITUDE: 75,  // km
		MIN_ALTITUDE: 35,  // km
		MANEUVERABILITY: 0.7, // Good maneuverability (0-1 scale)
		DRAG_COEFFICIENT: 0.15,
		COLOR: "#9C27B0",
	}
};

/**
 * Fixed-wing aircraft concepts for Venus
 */
export const FIXED_WING_VEHICLES = {
	// Solar-powered high-altitude aircraft
	SOLARIS: {
		NAME: "Solaris Plane",
		DESCRIPTION: "Solar-powered fixed-wing aircraft for high-altitude surveys",
		MASS: 50,          // kg
		PAYLOAD_MASS: 15,  // kg
		WINGSPAN: 12,      // m
		LENGTH: 5,         // m
		WING_AREA: 20,     // m²
		THRUST: 80,        // Newtons
		MAX_SPEED: 60,     // m/s
		MIN_SPEED: 25,     // m/s (stall speed)
		ENDURANCE: Infinity, // Days (solar powered)
		POWER: 1000,       // Watts
		MAX_ALTITUDE: 80,  // km
		MIN_ALTITUDE: 60,  // km
		LIFT_COEFFICIENT: 1.2,
		DRAG_COEFFICIENT: 0.05,
		COLOR: "#FFEB3B",
	}
};

/**
 * Calculate buoyancy force for a given volume at a given altitude
 * @param volumeM3 Volume in cubic meters
 * @param altitudeKm Altitude in kilometers
 * @returns Buoyancy force in Newtons
 */
export function calculateBuoyancyForce(volumeM3: number, altitudeKm: number): number {
	// Simplified calculation - assume the lifting gas is hydrogen
	// Buoyancy force = (density of atmosphere - density of lifting gas) * volume * g

	// This is approximate for standard Venus conditions at cloud layer
	// More complex models would account for gas compression, temperature, etc.

	// Approximate density based on altitude (kg/m³)
	let atmosphereDensity: number;

	if (altitudeKm < 30) {
		// Exponential density decrease from surface to 30km
		const t = altitudeKm / 30;
		atmosphereDensity = 65 * Math.exp(-4 * t);
	} else if (altitudeKm < 60) {
		// Slower decrease through the cloud layer
		const t = (altitudeKm - 30) / 30;
		atmosphereDensity = 5 * Math.exp(-2 * t);
	} else {
		// Very thin atmosphere above 60km
		const t = (altitudeKm - 60) / 30;
		atmosphereDensity = 0.5 * Math.exp(-3 * t);
	}

	// Hydrogen density (kg/m³) at local temperature and pressure
	// This is a simplification; real value depends on temperature and pressure
	const hydrogenDensity = atmosphereDensity * 0.07; // Approximately 7% of atmosphere density

	// Calculate buoyancy force: (atmosphere_density - hydrogen_density) * volume * gravity
	const buoyancyForce = (atmosphereDensity - hydrogenDensity) * volumeM3 * Math.abs(PHYSICS.GRAVITY);

	return buoyancyForce;
}

/**
 * Calculate drag force for an object
 * @param velocity Velocity vector [x, y, z] in m/s
 * @param dragCoefficient Drag coefficient of the object
 * @param frontalArea Frontal area in m²
 * @param density Air density in kg/m³
 * @returns Drag force vector [x, y, z] in Newtons
 */
export function calculateDragForce(
	velocity: [number, number, number],
	dragCoefficient: number,
	frontalArea: number,
	density: number
): [number, number, number] {
	// Calculate velocity magnitude
	const velocityMagnitude = Math.sqrt(
		velocity[0] * velocity[0] +
		velocity[1] * velocity[1] +
		velocity[2] * velocity[2]
	);

	if (velocityMagnitude === 0) {
		return [0, 0, 0];
	}

	// Calculate drag magnitude: 0.5 * density * velocity² * drag_coefficient * area
	const dragMagnitude = 0.5 * density * velocityMagnitude * velocityMagnitude * dragCoefficient * frontalArea;

	// Calculate normalized direction (opposite to velocity)
	const normalizedDirection: [number, number, number] = [
		-velocity[0] / velocityMagnitude,
		-velocity[1] / velocityMagnitude,
		-velocity[2] / velocityMagnitude
	];

	// Apply drag magnitude in the normalized direction
	return [
		normalizedDirection[0] * dragMagnitude,
		normalizedDirection[1] * dragMagnitude,
		normalizedDirection[2] * dragMagnitude
	];
}