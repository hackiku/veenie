// src/lib/orbital/simulator.ts
import { bodies, CelestialBody, SCALE_FACTOR } from './bodies';

// Gravitational constant
const G = 6.67430e-11; // m³/(kg·s²)

export class OrbitalSimulator {
	private bodies: CelestialBody[];
	private positions: Map<string, [number, number, number]>;
	private velocities: Map<string, [number, number, number]>;

	constructor(initialBodies = Object.values(bodies)) {
		this.bodies = [...initialBodies];
		this.positions = new Map();
		this.velocities = new Map();

		// Initialize positions and velocities
		for (const body of this.bodies) {
			this.positions.set(body.id, [...body.position]);
			this.velocities.set(body.id, [...body.velocity]);
		}
	}

	// Get current position for a body (scaled for visualization)
	getPosition(bodyId: string): [number, number, number] {
		const pos = this.positions.get(bodyId);
		if (!pos) return [0, 0, 0];

		// Scale position for visualization
		return [
			pos[0] * SCALE_FACTOR,
			pos[1] * SCALE_FACTOR,
			pos[2] * SCALE_FACTOR
		];
	}

	// Quick and dirty orbit calculation
	// This is simplified for visualization - for a real simulator
	// you'd use proper orbital elements and integrators
	calculateOrbit(bodyId: string, steps = 100): [number, number, number][] {
		const body = this.bodies.find(b => b.id === bodyId);
		if (!body) return [];

		// For simplicity, just assume circular orbit around the Sun
		const sunMass = bodies.sun.mass;
		const r = Math.sqrt(
			body.position[0] * body.position[0] +
			body.position[1] * body.position[1] +
			body.position[2] * body.position[2]
		);

		const period = 2 * Math.PI * Math.sqrt(Math.pow(r, 3) / (G * sunMass));

		// Generate points around the orbit
		const orbitPoints: [number, number, number][] = [];
		for (let i = 0; i < steps; i++) {
			const angle = (i / steps) * 2 * Math.PI;
			const x = r * Math.cos(angle);
			const y = 0; // Simplifying to 2D orbital plane
			const z = r * Math.sin(angle);

			orbitPoints.push([
				x * SCALE_FACTOR,
				y * SCALE_FACTOR,
				z * SCALE_FACTOR
			]);
		}

		return orbitPoints;
	}
}