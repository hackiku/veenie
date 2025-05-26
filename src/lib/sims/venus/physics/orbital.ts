// src/lib/sims/venus/physics/orbital.ts

/**
 * Simple orbital calculations for Venus simulation
 * Just the basics: sun position based on time
 */

export const VENUS_ORBITAL = {
	ORBITAL_PERIOD_DAYS: 224.7,    // Venus year in Earth days
	ORBITAL_DISTANCE: 108.2e6,     // km from Sun
	ROTATION_PERIOD_DAYS: 243.0,   // Venus day in Earth days (retrograde)
} as const;

/**
 * Calculate sun position relative to Venus
 * Returns position in simulation coordinates (scaled down)
 */
export function getSunPosition(simulationTimeSeconds: number): [number, number, number] {
	try {
		// Ensure we have a valid number
		const timeSeconds = typeof simulationTimeSeconds === 'number' && !isNaN(simulationTimeSeconds)
			? simulationTimeSeconds
			: 0;

		// Convert simulation time to days
		const days = timeSeconds / (24 * 3600);

		// Venus orbital position (simplified circular orbit)
		const orbitalAngle = (days / VENUS_ORBITAL.ORBITAL_PERIOD_DAYS) * 2 * Math.PI;

		// Scale down for rendering (make sun visible but not too close)
		const renderDistance = 30000; // Much smaller than real distance

		const x = renderDistance * Math.cos(orbitalAngle);
		const y = renderDistance * 0.1; // Slight Y offset 
		const z = renderDistance * Math.sin(orbitalAngle);

		return [x, y, z];
	} catch (error) {
		console.error('Error in getSunPosition:', error);
		return [30000, 3000, 0]; // Fallback position
	}
}

/**
 * Calculate Venus rotation angle
 */
export function getVenusRotation(simulationTimeSeconds: number): number {
	try {
		const timeSeconds = typeof simulationTimeSeconds === 'number' && !isNaN(simulationTimeSeconds)
			? simulationTimeSeconds
			: 0;

		const days = timeSeconds / (24 * 3600);

		// Venus rotates backwards (retrograde) very slowly
		const rotationAngle = -(days / VENUS_ORBITAL.ROTATION_PERIOD_DAYS) * 360;

		return rotationAngle % 360;
	} catch (error) {
		console.error('Error in getVenusRotation:', error);
		return 0;
	}
}

/**
 * Generate orbital path points for visualization
 */
export function getOrbitalPathPoints(segments: number = 64): number[] {
	const points: number[] = [];
	const renderDistance = 30000; // Same as sun distance

	for (let i = 0; i <= segments; i++) {
		const angle = (i / segments) * Math.PI * 2;
		points.push(
			renderDistance * Math.cos(angle),
			0, // Keep on XZ plane
			renderDistance * Math.sin(angle)
		);
	}

	return points;
}