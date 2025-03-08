// src/lib/sims/venus/data/orbitalCharacteristics.ts

/**
 * Venus orbital characteristics data
 * Source: Wikipedia and NASA data
 */

export interface OrbitalParameters {
	// Orbital parameters
	aphelion: number;              // AU
	perihelion: number;            // AU
	semiMajorAxis: number;         // AU
	eccentricity: number;          // dimensionless
	orbitalPeriod: number;         // Earth days (sidereal)
	orbitalPeriodSynodic: number;  // Earth days
	orbitalSpeed: number;          // km/s
	meanAnomaly: number;           // degrees
	inclination: number;           // degrees to ecliptic
	inclinationToSunEquator: number; // degrees
	longitudeOfAscendingNode: number; // degrees
	argumentOfPerihelion: number;  // degrees
}

export interface PhysicalParameters {
	// Physical characteristics
	radius: number;                // km
	radiusEquatorial: number;      // km
	radiusPolar: number;           // km
	flattening: number;            // dimensionless
	surfaceArea: number;           // km²
	volume: number;                // km³
	mass: number;                  // kg
	meanDensity: number;           // g/cm³
	surfaceGravity: number;        // m/s²
	escapeVelocity: number;        // km/s
	siderealRotationPeriod: number; // Earth days (negative for retrograde)
	solarDay: number;              // Earth days
	equatorialRotationVelocity: number; // m/s
	axialTilt: number;             // degrees (for retrograde rotation)
	axialTiltToOrbit: number;      // degrees
	albedoGeometric: number;       // dimensionless
	albedoBond: number;            // dimensionless
	blackbodyTemperature: number;  // K
}

// Orbital characteristics of Venus
export const venusOrbital: OrbitalParameters = {
	aphelion: 0.728213,            // AU
	perihelion: 0.718440,          // AU
	semiMajorAxis: 0.723332,       // AU
	eccentricity: 0.006772,        // dimensionless
	orbitalPeriod: 224.701,        // Earth days (sidereal)
	orbitalPeriodSynodic: 583.92,  // Earth days
	orbitalSpeed: 35.02,           // km/s
	meanAnomaly: 50.115,           // degrees
	inclination: 3.39458,          // degrees to ecliptic
	inclinationToSunEquator: 3.86, // degrees
	longitudeOfAscendingNode: 76.680, // degrees
	argumentOfPerihelion: 54.884   // degrees
};

// Physical characteristics of Venus
export const venusPhysical: PhysicalParameters = {
	radius: 6051.8,                // km
	radiusEquatorial: 6051.8,      // km
	radiusPolar: 6051.8,           // km (no flattening)
	flattening: 0,                 // dimensionless
	surfaceArea: 4.6023e8,         // km²
	volume: 9.2843e11,             // km³
	mass: 4.8675e24,               // kg
	meanDensity: 5.243,            // g/cm³
	surfaceGravity: 8.87,          // m/s²
	escapeVelocity: 10.36,         // km/s
	siderealRotationPeriod: -243.0226, // Earth days (negative for retrograde)
	solarDay: 116.75,              // Earth days (synodic rotation period)
	equatorialRotationVelocity: 1.81, // m/s
	axialTilt: 2.64,               // degrees (for retrograde rotation)
	axialTiltToOrbit: 177.36,      // degrees
	albedoGeometric: 0.689,        // dimensionless
	albedoBond: 0.76,              // dimensionless
	blackbodyTemperature: 232      // K
};

// Convert AU to kilometers
export function auToKm(au: number): number {
	const AU_TO_KM = 149597870.7; // 1 AU in kilometers
	return au * AU_TO_KM;
}

// Convert kilometers to AU
export function kmToAu(km: number): number {
	const KM_TO_AU = 1 / 149597870.7; // 1 km in AU
	return km * KM_TO_AU;
}

// Convert degrees to radians
export function degToRad(degrees: number): number {
	return degrees * (Math.PI / 180);
}

// Convert radians to degrees
export function radToDeg(radians: number): number {
	return radians * (180 / Math.PI);
}

// Calculate the heliocentric position of Venus at a given date
export function getVenusPositionAtDate(date: Date): { x: number; y: number; z: number } {
	// This is a simplified model - for a more accurate position,
	// a full ephemeris calculation would be needed

	// Calculate days since J2000.0 (January 1, 2000, 12:00 UTC)
	const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
	const daysSinceJ2000 = (date.getTime() - j2000.getTime()) / (1000 * 60 * 60 * 24);

	// Mean anomaly at the specified date
	const meanAnomaly = (venusOrbital.meanAnomaly + (360 / venusOrbital.orbitalPeriod) * daysSinceJ2000) % 360;
	const meanAnomalyRad = degToRad(meanAnomaly);

	// Eccentric anomaly (approximate solution using Newton-Raphson method)
	let eccentricAnomaly = meanAnomalyRad;
	for (let i = 0; i < 5; i++) { // Usually converges within a few iterations
		eccentricAnomaly = eccentricAnomaly -
			(eccentricAnomaly - venusOrbital.eccentricity * Math.sin(eccentricAnomaly) - meanAnomalyRad) /
			(1 - venusOrbital.eccentricity * Math.cos(eccentricAnomaly));
	}

	// True anomaly
	const x = Math.cos(eccentricAnomaly) - venusOrbital.eccentricity;
	const y = Math.sqrt(1 - venusOrbital.eccentricity * venusOrbital.eccentricity) * Math.sin(eccentricAnomaly);
	const trueAnomaly = Math.atan2(y, x);

	// Distance from Sun (in AU)
	const distance = venusOrbital.semiMajorAxis * (1 - venusOrbital.eccentricity * Math.cos(eccentricAnomaly));

	// Position in orbital plane
	const xOrbit = distance * Math.cos(trueAnomaly + degToRad(venusOrbital.argumentOfPerihelion));
	const yOrbit = distance * Math.sin(trueAnomaly + degToRad(venusOrbital.argumentOfPerihelion));

	// Convert to ecliptic coordinates
	const ascendingNode = degToRad(venusOrbital.longitudeOfAscendingNode);
	const inclination = degToRad(venusOrbital.inclination);

	const x1 = xOrbit * (Math.cos(ascendingNode) * Math.cos(degToRad(venusOrbital.argumentOfPerihelion)) -
		Math.sin(ascendingNode) * Math.sin(degToRad(venusOrbital.argumentOfPerihelion)) * Math.cos(inclination)) -
		yOrbit * (Math.cos(ascendingNode) * Math.sin(degToRad(venusOrbital.argumentOfPerihelion)) +
			Math.sin(ascendingNode) * Math.cos(degToRad(venusOrbital.argumentOfPerihelion)) * Math.cos(inclination));

	const y1 = xOrbit * (Math.sin(ascendingNode) * Math.cos(degToRad(venusOrbital.argumentOfPerihelion)) +
		Math.cos(ascendingNode) * Math.sin(degToRad(venusOrbital.argumentOfPerihelion)) * Math.cos(inclination)) +
		yOrbit * (Math.cos(ascendingNode) * Math.cos(degToRad(venusOrbital.argumentOfPerihelion)) * Math.cos(inclination) -
			Math.sin(ascendingNode) * Math.sin(degToRad(venusOrbital.argumentOfPerihelion)));

	const z1 = xOrbit * Math.sin(degToRad(venusOrbital.argumentOfPerihelion)) * Math.sin(inclination) +
		yOrbit * Math.cos(degToRad(venusOrbital.argumentOfPerihelion)) * Math.sin(inclination);

	return { x: x1, y: y1, z: z1 };
}

// Get Venus illumination fraction (phase) at a given date
export function getVenusPhase(date: Date): number {
	// Simplified phase calculation
	const venusPosition = getVenusPositionAtDate(date);
	const earthPosition = { x: 0, y: 0, z: 0 }; // Simplified - Earth at origin

	// Distance from Venus to Sun
	const venusToSunDistance = Math.sqrt(
		venusPosition.x * venusPosition.x +
		venusPosition.y * venusPosition.y +
		venusPosition.z * venusPosition.z
	);

	// Distance from Venus to Earth (simplified)
	const venusToEarthDistance = Math.sqrt(
		Math.pow(venusPosition.x - earthPosition.x, 2) +
		Math.pow(venusPosition.y - earthPosition.y, 2) +
		Math.pow(venusPosition.z - earthPosition.z, 2)
	);

	// Earth-Venus-Sun angle (phase angle)
	const cosPhaseAngle = (venusToSunDistance * venusToSunDistance + venusToEarthDistance * venusToEarthDistance - 1) /
		(2 * venusToSunDistance * venusToEarthDistance);

	// Phase ranges from 0 (new) to 1 (full)
	return (1 + Math.cos(Math.acos(cosPhaseAngle))) / 2;
}

// Calculate Venus rotation at a given date
export function getVenusRotationAngle(date: Date): number {
	// Calculate days since J2000.0 (January 1, 2000, 12:00 UTC)
	const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
	const daysSinceJ2000 = (date.getTime() - j2000.getTime()) / (1000 * 60 * 60 * 24);

	// Venus rotates very slowly and retrograde
	// Rotation period is -243.0226 Earth days
	// Calculate rotation angle in radians
	const rotationsCompleted = daysSinceJ2000 / venusPhysical.siderealRotationPeriod;
	const fractionalPart = rotationsCompleted - Math.floor(rotationsCompleted);

	// Convert to angle (2π = 360°)
	return fractionalPart * 2 * Math.PI;
}