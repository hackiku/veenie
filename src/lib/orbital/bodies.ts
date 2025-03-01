// src/lib/orbital/bodies.ts
export interface CelestialBody {
	id: string;
	name: string;
	radius: number;     // km
	mass: number;       // kg
	color: string;
	texture?: string;   // path to texture
	position: [number, number, number]; // Initial position
	velocity: [number, number, number]; // Initial velocity
}

// Simplified solar system data
export const bodies: Record<string, CelestialBody> = {
	sun: {
		id: 'sun',
		name: 'Sun',
		radius: 696340,
		mass: 1.989e30,
		color: '#ffcc33',
		position: [0, 0, 0],
		velocity: [0, 0, 0],
	},
	venus: {
		id: 'venus',
		name: 'Venus',
		radius: 6051.8,
		mass: 4.867e24,
		color: '#e8a678',
		position: [108208000, 0, 0], // km from Sun
		velocity: [0, 35020, 0],     // m/s
	},
	earth: {
		id: 'earth',
		name: 'Earth',
		radius: 6371,
		mass: 5.972e24,
		color: '#2244cc',
		position: [149598023, 0, 0], // km from Sun
		velocity: [0, 29780, 0],     // m/s
	},
	mars: {
		id: 'mars',
		name: 'Mars',
		radius: 3389.5,
		mass: 6.39e23,
		color: '#c1440e',
		position: [227939200, 0, 0], // km from Sun
		velocity: [0, 24130, 0],     // m/s
	}
};

// Scale factors for visualization
export const SCALE_FACTOR = 1e-6; // Scale down distances for visualization
export const TIME_FACTOR = 60 * 60 * 24 * 7; // One week per second