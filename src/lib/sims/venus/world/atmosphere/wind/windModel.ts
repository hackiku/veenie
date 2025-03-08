// src/lib/sims/venus/physics/windModel.ts

import { Vector3 } from 'three';
import {
	getWindSpeedAtAltitude,
	getTemperatureAtAltitude,
	getPressureAtAltitude
} from '../data/atmosphere';

export interface WindVector {
	speed: number;      // m/s
	direction: Vector3; // normalized vector
	turbulence: number; // 0-1 scale indicating turbulence intensity
}

/**
 * Wind model parameters for the Venus atmosphere
 */
export interface WindModelParams {
	// Super-rotation settings
	superRotationFactor: number;     // Factor for super-rotation intensity
	superRotationMaxAlt: number;     // Altitude of maximum super-rotation (km)

	// Meridional circulation settings
	meridionalStrength: number;      // 0-1 scale for north-south circulation strength
	hadleyCellTopAlt: number;        // Top of Hadley cell (km)
	hadleyCellBottomAlt: number;     // Bottom of Hadley cell (km)

	// Turbulence settings
	turbulenceBaseLevel: number;     // Base turbulence level (0-1)
	cloudLayerTurbulence: number;    // Additional turbulence in cloud layers (0-1)
	surfaceTurbulence: number;       // Additional surface turbulence (0-1)
}

// Default wind model parameters based on Venus observations
export const defaultWindParams: WindModelParams = {
	// Super-rotation peaks around 60-70 km altitude
	superRotationFactor: 1.0,
	superRotationMaxAlt: 65,

	// Venus has a single Hadley cell per hemisphere
	meridionalStrength: 0.2,
	hadleyCellTopAlt: 60,
	hadleyCellBottomAlt: 0,

	// Turbulence settings based on observations
	turbulenceBaseLevel: 0.05,
	cloudLayerTurbulence: 0.2,
	surfaceTurbulence: 0.15,
};

/**
 * Calculate wind vector at a specific location on Venus
 * 
 * @param altitude - Altitude in km
 * @param latitude - Latitude in degrees (-90 to 90)
 * @param longitude - Longitude in degrees (0 to 360)
 * @param params - Wind model parameters
 * @returns Wind vector with speed, direction and turbulence
 */
export function calculateWindVector(
	altitude: number,
	latitude: number,
	longitude: number,
	params: WindModelParams = defaultWindParams
): WindVector {
	// Get base wind speed from altitude profile
	const baseSpeed = getWindSpeedAtAltitude(altitude);

	// Calculate zonal (east-west) component - super-rotation
	// Wind speed decreases with latitude (faster at equator, slower at poles)
	const latitudeFactor = Math.cos(latitude * Math.PI / 180);

	// Super-rotation profile peaks at a certain altitude
	const altitudeFactor = 1 - Math.abs(altitude - params.superRotationMaxAlt) / 100;
	const superRotationSpeed = baseSpeed * latitudeFactor * Math.max(0.2, altitudeFactor) * params.superRotationFactor;

	// Calculate meridional (north-south) component - Hadley cells
	let meridionalSpeed = 0;

	// Simple Hadley cell model: rising air at equator, falling at poles
	if (altitude >= params.hadleyCellBottomAlt && altitude <= params.hadleyCellTopAlt) {
		// Normalize altitude within Hadley cell
		const cellAltFactor = (altitude - params.hadleyCellBottomAlt) /
			(params.hadleyCellTopAlt - params.hadleyCellBottomAlt);

		// Maximum meridional flow in the middle of the cell
		const cellStrength = Math.sin(cellAltFactor * Math.PI);

		// Direction depends on hemisphere (positive in north, negative in south)
		const poleward = latitude < 0 ? -1 : 1;

		// At mid-levels, flow is poleward; at top and bottom, flow is equatorward
		const flowDirection = cellAltFactor < 0.5 ? 1 : -1;

		meridionalSpeed = 10 * cellStrength * poleward * flowDirection * params.meridionalStrength;
	}

	// Calculate vertical component (usually much smaller than horizontal)
	let verticalSpeed = 0;

	// Rising air near equator, sinking air near poles in Hadley cell
	if (Math.abs(latitude) < 30 && altitude < params.hadleyCellTopAlt) {
		// Weak rising motion at equator
		verticalSpeed = 0.5 * (1 - altitude / params.hadleyCellTopAlt) * params.meridionalStrength;
	} else if (Math.abs(latitude) > 60 && altitude < params.hadleyCellTopAlt) {
		// Weak sinking motion at poles
		verticalSpeed = -0.3 * (1 - altitude / params.hadleyCellTopAlt) * params.meridionalStrength;
	}

	// Calculate turbulence
	let turbulence = params.turbulenceBaseLevel;

	// Higher turbulence in cloud layers (45-70 km)
	if (altitude >= 45 && altitude <= 70) {
		turbulence += params.cloudLayerTurbulence * (1 - Math.abs(altitude - 55) / 15);
	}

	// Higher turbulence near surface
	if (altitude < 10) {
		turbulence += params.surfaceTurbulence * (1 - altitude / 10);
	}

	// Create direction vector (normalize later)
	const direction = new Vector3(
		superRotationSpeed,   // x: east-west (zonal)
		verticalSpeed,        // y: vertical
		meridionalSpeed       // z: north-south (meridional)
	);

	// Calculate total speed
	const speed = Math.sqrt(
		Math.pow(superRotationSpeed, 2) +
		Math.pow(meridionalSpeed, 2) +
		Math.pow(verticalSpeed, 2)
	);

	// Normalize direction
	if (speed > 0) {
		direction.normalize();
	}

	return {
		speed,
		direction,
		turbulence
	};
}

/**
 * Apply wind effects to a particle or object
 * 
 * @param position - Current position Vector3 (km)
 * @param velocity - Current velocity Vector3 (m/s)
 * @param mass - Object mass (kg)
 * @param area - Cross-sectional area (m²)
 * @param altitude - Current altitude (km)
 * @param latitude - Current latitude (degrees)
 * @param longitude - Current longitude (degrees)
 * @param deltaTime - Time step (seconds)
 * @returns Updated velocity Vector3 (m/s)
 */
export function applyWindForces(
	position: Vector3,
	velocity: Vector3,
	mass: number,
	area: number,
	altitude: number,
	latitude: number,
	longitude: number,
	deltaTime: number,
	params: WindModelParams = defaultWindParams
): Vector3 {
	// Calculate wind vector at current position
	const wind = calculateWindVector(altitude, latitude, longitude, params);

	// Calculate air density based on temperature and pressure
	const temperature = getTemperatureAtAltitude(altitude); // K
	const pressure = getPressureAtAltitude(altitude) * 100000; // Convert from bars to Pa

	// Approximate gas constant for CO2 (Venus atmosphere)
	const gasConstant = 8.314 / 0.044; // J/(kg·K) for CO2

	// Air density using ideal gas law (ρ = P/RT)
	const density = pressure / (gasConstant * temperature); // kg/m³

	// Calculate relative velocity
	const relativeVelocity = new Vector3(
		wind.speed * wind.direction.x - velocity.x,
		wind.speed * wind.direction.y - velocity.y,
		wind.speed * wind.direction.z - velocity.z
	);

	// Calculate drag force magnitude
	// F = 0.5 * ρ * v² * A * Cd
	const dragCoefficient = 0.47; // Approximate drag coefficient for a sphere
	const relativeSpeed = relativeVelocity.length();
	const dragForceMagnitude = 0.5 * density * Math.pow(relativeSpeed, 2) * area * dragCoefficient;

	// Convert force to acceleration (F = ma)
	const acceleration = dragForceMagnitude / mass;

	// Apply acceleration in the direction of relative velocity
	const accelerationVector = relativeVelocity.clone().normalize().multiplyScalar(acceleration);

	// Update velocity
	const newVelocity = velocity.clone().add(
		accelerationVector.multiplyScalar(deltaTime)
	);

	// Add turbulence effects
	if (wind.turbulence > 0) {
		const turbulenceMagnitude = wind.turbulence * 5 * density; // Scale turbulence with density

		// Apply random turbulence in all directions
		newVelocity.x += (Math.random() * 2 - 1) * turbulenceMagnitude;
		newVelocity.y += (Math.random() * 2 - 1) * turbulenceMagnitude;
		newVelocity.z += (Math.random() * 2 - 1) * turbulenceMagnitude;
	}

	return newVelocity;
}

/**
 * Create wind streamlines for visualization
 * 
 * @param centerPosition - Center position for the grid
 * @param gridSize - Size of the grid in km
 * @param resolution - Number of points per dimension
 * @param altitude - Altitude for the wind field (km)
 * @returns Array of line segments (pairs of Vector3 points)
 */
export function generateWindStreamlines(
	centerPosition: Vector3,
	gridSize: number,
	resolution: number,
	altitude: number,
	params: WindModelParams = defaultWindParams
): Vector3[][] {
	const streamlines: Vector3[][] = [];
	const stepSize = gridSize / resolution;

	// Generate starting points in a grid
	for (let i = 0; i < resolution; i += 3) { // Skip points for clarity
		for (let j = 0; j < resolution; j += 3) {
			const startX = centerPosition.x - gridSize / 2 + i * stepSize;
			const startZ = centerPosition.z - gridSize / 2 + j * stepSize;

			// Convert Cartesian to spherical coordinates (approximate)
			const radius = 6051.8 + altitude; // Venus radius + altitude
			const longitude = (startX / radius) * (180 / Math.PI);
			const latitude = (startZ / radius) * (180 / Math.PI);

			// Create streamline from this starting point
			const streamline = traceStreamline(
				new Vector3(startX, centerPosition.y, startZ),
				altitude,
				latitude,
				longitude,
				20, // Number of steps
				stepSize * 0.5, // Shorter steps for smoother lines
				params
			);

			streamlines.push(streamline);
		}
	}

	return streamlines;
}

/**
 * Trace a single streamline from a starting point
 * 
 * @param startPoint - Starting position
 * @param altitude - Altitude (km)
 * @param latitude - Starting latitude (degrees)
 * @param longitude - Starting longitude (degrees)
 * @param steps - Number of steps to trace
 * @param stepSize - Step size (km)
 * @returns Array of Vector3 points forming the streamline
 */
function traceStreamline(
	startPoint: Vector3,
	altitude: number,
	latitude: number,
	longitude: number,
	steps: number,
	stepSize: number,
	params: WindModelParams
): Vector3[] {
	const points: Vector3[] = [startPoint.clone()];
	let currentPoint = startPoint.clone();
	let currentLatitude = latitude;
	let currentLongitude = longitude;

	for (let i = 0; i < steps; i++) {
		// Get wind at current position
		const wind = calculateWindVector(altitude, currentLatitude, currentLongitude, params);

		// Move point based on wind direction and step size
		const nextPoint = currentPoint.clone().add(
			new Vector3(
				wind.direction.x * stepSize,
				wind.direction.y * stepSize,
				wind.direction.z * stepSize
			)
		);

		// Update position
		currentPoint = nextPoint;
		points.push(currentPoint.clone());

		// Update approximate lat/lon
		const radius = 6051.8 + altitude; // Venus radius + altitude
		currentLongitude += (wind.direction.x * stepSize / radius) * (180 / Math.PI);
		currentLatitude += (wind.direction.z * stepSize / radius) * (180 / Math.PI);
	}

	return points;
}