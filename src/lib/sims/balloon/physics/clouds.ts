// src/lib/sims/balloon/physics/clouds.ts
import { SIMULATION_CONSTANTS } from '../constants';

// Define simple cloud "types" for visual variation
enum CloudVisualType {
	PUFFY, // Standard
	WISPY, // Smaller, slightly higher, more transparent
	DENSE_PATCH // Larger, slightly lower, less transparent
}

export interface CloudData {
	id: number; // For keyed #each
	position: [number, number, number];
	basePosition: [number, number, number];
	size: number;
	speed: {
		x: number;
		z: number;
	};
	amplitude: number;
	frequency: number;
	phase: number;
	opacity: number; // New: for visual variation
	tint: string;    // New: for visual variation (hex color)
	visualType: CloudVisualType; // New: for categorizing
}

export class CloudSystem {
	private clouds: CloudData[];
	private time: number = 0;
	private readonly terrainSize: number;
	private readonly cloudLayerBaseHeight: number; // Renamed for clarity
	private paused: boolean = false;
	private nextCloudId: number = 0;

	constructor(count: number = 30) {
		const { TERRAIN_SIZE, CLOUD_LAYER_HEIGHT } = SIMULATION_CONSTANTS;
		this.terrainSize = TERRAIN_SIZE;
		this.cloudLayerBaseHeight = CLOUD_LAYER_HEIGHT;

		this.clouds = Array(count).fill(0).map(() => this.createCloud());
	}

	setPaused(paused: boolean): void {
		this.paused = paused;
	}

	private createCloud(): CloudData {
		const id = this.nextCloudId++;
		const x = (Math.random() - 0.5) * this.terrainSize * 0.8;
		const z = (Math.random() - 0.5) * this.terrainSize * 0.8;

		let size: number;
		let heightVariation: number;
		let opacity: number;
		let tint: string;
		const visualType = Math.random() < 0.6
			? CloudVisualType.PUFFY
			: Math.random() < 0.5
				? CloudVisualType.WISPY
				: CloudVisualType.DENSE_PATCH;

		switch (visualType) {
			case CloudVisualType.WISPY:
				size = (Math.random() * 3000) + 5000; // Smaller
				heightVariation = (Math.random() * 3000) - 1000; // Can be a bit higher
				opacity = (Math.random() * 0.2) + 0.3; // More transparent: 0.3 to 0.5
				tint = '#FFFFF0'; // Ivory white, slightly yellowish
				break;
			case CloudVisualType.DENSE_PATCH:
				size = (Math.random() * 7000) + 10000; // Larger
				heightVariation = (Math.random() * 3000) - 2000; // Can be a bit lower
				opacity = (Math.random() * 0.2) + 0.6; // Less transparent: 0.6 to 0.8
				tint = '#FAFAC8'; // Pale yellow
				break;
			case CloudVisualType.PUFFY:
			default:
				size = (Math.random() * 6000) + 8000;
				heightVariation = (Math.random() * 5000) - 2500;
				opacity = (Math.random() * 0.3) + 0.4; // Mid-range opacity: 0.4 to 0.7
				tint = '#FFF8DC'; // Cornsilk (yellowish white)
				break;
		}
		// Ensure opacity is within reasonable bounds
        opacity = Math.max(0.2, Math.min(opacity, 0.85));


		const baseAltitude = this.cloudLayerBaseHeight + heightVariation;

		return {
			id,
			position: [x, baseAltitude, z],
			basePosition: [x, baseAltitude, z],
			size,
			speed: {
				x: (Math.random() - 0.5) * (visualType === CloudVisualType.WISPY ? 15 : 10), // Wispy clouds might move faster
				z: (Math.random() - 0.5) * (visualType === CloudVisualType.WISPY ? 15 : 10)
			},
			amplitude: (Math.random() * (visualType === CloudVisualType.WISPY ? 2000 : 3000)) + 1000,
			frequency: (Math.random() * 0.0008) + 0.0002,
			phase: Math.random() * Math.PI * 2,
			opacity,
			tint,
			visualType
		};
	}

	getClouds(): CloudData[] {
		return this.clouds;
	}

	reset(): void {
		this.clouds.forEach((cloud) => {
			cloud.position[0] = cloud.basePosition[0];
			cloud.position[1] = cloud.basePosition[1];
			cloud.position[2] = cloud.basePosition[2];
		});
		this.time = 0;
		// No need to recreate clouds on reset unless you want their visual types to change too
	}

	update(delta: number): void {
		if (this.paused) return;
		this.time += delta;

		this.clouds.forEach((cloud) => {
			// Keep existing movement logic, but now speeds can vary by type
			// Base movement: scaling factors (160, 400) are arbitrary and could be tied to wind speeds later
			let x = cloud.basePosition[0] + this.time * cloud.speed.x * 20; // Reduced overall drift speed for now
			let z = cloud.basePosition[2] + this.time * cloud.speed.z * 50; // Reduced overall drift speed for now

			// Add sine wave motion
			x += Math.sin(this.time * cloud.frequency + cloud.phase) * cloud.amplitude;
			const y = cloud.basePosition[1] +
				Math.sin(this.time * cloud.frequency * 0.5 + cloud.phase) * (cloud.visualType === CloudVisualType.WISPY ? 200 : 500); // Wispy clouds less vertical bob

			// Wrap around
			const halfSize = this.terrainSize / 2;
			if (x > halfSize) x -= this.terrainSize; else if (x < -halfSize) x += this.terrainSize;
			if (z > halfSize) z -= this.terrainSize; else if (z < -halfSize) z += this.terrainSize;
            // Simple y boundary for clouds not to go too low/high from their base layer
            cloud.position[1] = Math.max(this.cloudLayerBaseHeight - 5000, Math.min(y, this.cloudLayerBaseHeight + 5000));


			cloud.position[0] = x;
			// cloud.position[1] = y; // Vertical position handled above
			cloud.position[2] = z;
		});
	}
}

let cloudSystemInstance: CloudSystem | null = null;
export function getCloudSystem(count?: number): CloudSystem {
	if (!cloudSystemInstance) {
		cloudSystemInstance = new CloudSystem(count);
	}
	return cloudSystemInstance;
}
// resetCloudSystem isn't strictly necessary if engine.reset() handles cloudSystem.reset()
// export function resetCloudSystem(): void {
// 	if (cloudSystemInstance) {
// 		cloudSystemInstance.reset();
// 	}
// }