// src/lib/sims/custom-engine/physics/clouds.ts
import { SIMULATION_CONSTANTS } from '../constants';

export interface CloudData {
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
}

export class CloudSystem {
	private clouds: CloudData[];
	private time: number = 0;
	private readonly TERRAIN_SIZE: number;
	private readonly CLOUD_LAYER_HEIGHT: number;
	private paused: boolean = false;

	constructor(count: number = 30) {
		const { TERRAIN_SIZE, CLOUD_LAYER_HEIGHT } = SIMULATION_CONSTANTS;
		this.TERRAIN_SIZE = TERRAIN_SIZE;
		this.CLOUD_LAYER_HEIGHT = CLOUD_LAYER_HEIGHT;

		// Generate clouds
		this.clouds = Array(count).fill(0).map(() => this.createCloud());
	}

	// Method to set pause state
	setPaused(paused: boolean): void {
		this.paused = paused;
	}

	private createCloud(): CloudData {
		const x = (Math.random() - 0.5) * this.TERRAIN_SIZE * 0.8;
		const z = (Math.random() - 0.5) * this.TERRAIN_SIZE * 0.8;
		const heightVariation = (Math.random() * 10.0) - 5.0;

		return {
			position: [x, this.CLOUD_LAYER_HEIGHT + heightVariation, z],
			basePosition: [x, this.CLOUD_LAYER_HEIGHT + heightVariation, z],
			size: (Math.random() * 6.0) + 8.0,
			speed: {
				x: (Math.random() - 0.5) * 0.01,
				z: (Math.random() - 0.5) * 0.01
			},
			amplitude: (Math.random() * 3.0) + 1.0,
			frequency: (Math.random() * 0.8) + 0.2,
			phase: Math.random() * Math.PI * 2
		};
	}

	// Get all cloud data
	getClouds(): CloudData[] {
		return this.clouds;
	}

	// Reset all clouds to their initial positions
	reset(): void {
		this.clouds.forEach((cloud, i) => {
			cloud.position[0] = cloud.basePosition[0];
			cloud.position[1] = cloud.basePosition[1];
			cloud.position[2] = cloud.basePosition[2];
		});
		this.time = 0;
	}

	// Update cloud positions - respecting pause state
	update(delta: number): void {
		// Skip update if paused
		if (this.paused) return;

		// Accumulate time
		this.time += delta;

		this.clouds.forEach((cloud, i) => {
			// Base movement in wind direction
			let x = cloud.basePosition[0] + this.time * cloud.speed.x * 160;
			let z = cloud.basePosition[2] + this.time * cloud.speed.z * 400;

			// Add sine wave motion
			x += Math.sin(this.time * cloud.frequency + cloud.phase) * cloud.amplitude;
			const y = cloud.basePosition[1] +
				Math.sin(this.time * cloud.frequency * 0.5 + cloud.phase) * 0.5;

			// Wrap around terrain boundaries
			if (x > this.TERRAIN_SIZE / 2) x -= this.TERRAIN_SIZE * 0.9;
			if (x < -this.TERRAIN_SIZE / 2) x += this.TERRAIN_SIZE * 0.9;
			if (z > this.TERRAIN_SIZE / 2) z -= this.TERRAIN_SIZE * 0.9;
			if (z < -this.TERRAIN_SIZE / 2) z += this.TERRAIN_SIZE * 0.9;

			// Update position
			cloud.position[0] = x;
			cloud.position[1] = y;
			cloud.position[2] = z;
		});
	}
}

// Singleton instance 
let cloudSystemInstance: CloudSystem | null = null;

export function getCloudSystem(count?: number): CloudSystem {
	if (!cloudSystemInstance) {
		cloudSystemInstance = new CloudSystem(count);
	}
	return cloudSystemInstance;
}

export function resetCloudSystem(): void {
	if (cloudSystemInstance) {
		cloudSystemInstance.reset();
	}
}