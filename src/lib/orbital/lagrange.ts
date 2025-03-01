// src/lib/orbital/lagrange.ts
import { bodies, SCALE_FACTOR } from './bodies';

// Calculate Lagrange points for a two-body system
export function calculateLagrangePoints(
	primaryId: string = 'sun',
	secondaryId: string = 'venus'
): Record<string, [number, number, number]> {
	const primary = bodies[primaryId];
	const secondary = bodies[secondaryId];

	if (!primary || !secondary) {
		return {
			L1: [0, 0, 0],
			L2: [0, 0, 0],
			L3: [0, 0, 0],
			L4: [0, 0, 0],
			L5: [0, 0, 0]
		};
	}

	// Calculate mass ratio
	const μ = secondary.mass / (primary.mass + secondary.mass);

	// Calculate distance between bodies
	const r = Math.sqrt(
		Math.pow(secondary.position[0] - primary.position[0], 2) +
		Math.pow(secondary.position[1] - primary.position[1], 2) +
		Math.pow(secondary.position[2] - primary.position[2], 2)
	);

	// Direction from primary to secondary
	const dx = secondary.position[0] - primary.position[0];
	const dy = secondary.position[1] - primary.position[1];
	const dz = secondary.position[2] - primary.position[2];

	// Unit vector
	const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
	const ux = dx / d;
	const uy = dy / d;
	const uz = dz / d;

	// L1: Between primary and secondary
	const rL1 = r * (1 - Math.pow(μ / 3, 1 / 3));
	const L1 = [
		primary.position[0] + rL1 * ux,
		primary.position[1] + rL1 * uy,
		primary.position[2] + rL1 * uz
	];

	// L2: Beyond secondary
	const rL2 = r * (1 + Math.pow(μ / 3, 1 / 3));
	const L2 = [
		primary.position[0] + rL2 * ux,
		primary.position[1] + rL2 * uy,
		primary.position[2] + rL2 * uz
	];

	// L3: Opposite side from secondary
	const rL3 = r * (1 + 5 * μ / 12);
	const L3 = [
		primary.position[0] - rL3 * ux,
		primary.position[1] - rL3 * uy,
		primary.position[2] - rL3 * uz
	];

	// L4 and L5: 60 degrees ahead and behind
	// Cross product to get the perpendicular direction
	const vx = -uz;
	const vy = 0;
	const vz = ux;

	// L4: 60 degrees ahead
	const L4 = [
		primary.position[0] + r * (0.5 * ux + Math.sqrt(3) / 2 * vx),
		primary.position[1] + r * (0.5 * uy + Math.sqrt(3) / 2 * vy),
		primary.position[2] + r * (0.5 * uz + Math.sqrt(3) / 2 * vz)
	];

	// L5: 60 degrees behind
	const L5 = [
		primary.position[0] + r * (0.5 * ux - Math.sqrt(3) / 2 * vx),
		primary.position[1] + r * (0.5 * uy - Math.sqrt(3) / 2 * vy),
		primary.position[2] + r * (0.5 * uz - Math.sqrt(3) / 2 * vz)
	];

	// Scale for visualization
	return {
		L1: L1.map(v => v * SCALE_FACTOR) as [number, number, number],
		L2: L2.map(v => v * SCALE_FACTOR) as [number, number, number],
		L3: L3.map(v => v * SCALE_FACTOR) as [number, number, number],
		L4: L4.map(v => v * SCALE_FACTOR) as [number, number, number],
		L5: L5.map(v => v * SCALE_FACTOR) as [number, number, number]
	};
}