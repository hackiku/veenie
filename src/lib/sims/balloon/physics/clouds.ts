// src/lib/sims/balloon/physics/clouds.ts

// import { RigidBody } from '@threlte/rapier';
import type { RigidBody } from '@threlte/rapier';
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
	private cloudRefs: (RigidBody | null)[];
	private time: number = 0;
	private readonly TERRAIN_SIZE: number;
	private readonly CLOUD_LAYER_HEIGHT: number;

	constructor(count: number = 30) {
		const { TERRAIN_SIZE, CLOUD_LAYER_HEIGHT } = SIMULATION_CONSTANTS;
		this.TERRAIN_SIZE = TERRAIN_SIZE;
		this.CLOUD_LAYER_HEIGHT = CLOUD_LAYER_HEIGHT;

		// Generate clouds
		this.clouds = Array(count).fill(0).map(() => this.createCloud());
		this.cloudRefs = Array(count).fill(null);
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

	// Register a cloud rigid body
	setCloudRef(index: number, body: RigidBody | null): void {
		if (index >= 0 && index < this.cloudRefs.length) {
			this.cloudRefs[index] = body;
		}
	}

	// Get all cloud data
	getClouds(): CloudData[] {
		return this.clouds;
	}

	// Reset all clouds to their initial positions
	reset(): void {
		this.clouds.forEach((cloud, i) => {
			const rigidBody = this.cloudRefs[i];
			if (rigidBody) {
				rigidBody.setNextKinematicTranslation({
					x: cloud.basePosition[0],
					y: cloud.basePosition[1],
					z: cloud.basePosition[2]
				});
			}
		});
		this.time = 0;
	}

	// Update cloud positions - similar to the useTask logic in your component
	update(delta: number): void {
		// Accumulate time
		this.time += delta;

		this.clouds.forEach((cloud, i) => {
			const rigidBody = this.cloudRefs[i];
			if (rigidBody) {
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

				// Update Rapier rigid body
				rigidBody.setNextKinematicTranslation({ x, y, z });
			}
		});
	}
}

// Singleton instance (optional)
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