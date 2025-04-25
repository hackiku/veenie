// src/lib/sims/material/physics/flight.ts
import { Vector3 } from "three";


export class FlightModel {
	private position: Vector3;
	private velocity: Vector3;
	private acceleration: Vector3;
	private mass: number;
	private buoyancy: number;

	constructor() {
		this.position = { x: 0, y: 50, z: 0 };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.acceleration = { x: 0, y: 0, z: 0 };
		this.mass = 1.0;
		this.buoyancy = 0.3;
	}

	update(deltaTime: number, gravity: number, atmosphericDensity: number): void {
		// Calculate buoyancy force based on atmospheric density
		const buoyancyForce = this.buoyancy * atmosphericDensity;

		// Apply gravitational force
		this.acceleration.y = buoyancyForce - gravity;

		// Update velocity
		this.velocity.x += this.acceleration.x * deltaTime;
		this.velocity.y += this.acceleration.y * deltaTime;
		this.velocity.z += this.acceleration.z * deltaTime;

		// Update position
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;
		this.position.z += this.velocity.z * deltaTime;

		// Reset horizontal acceleration for next frame
		this.acceleration.x = 0;
		this.acceleration.z = 0;
	}

	applyForce(force: Vector3): void {
		this.acceleration.x += force.x / this.mass;
		this.acceleration.y += force.y / this.mass;
		this.acceleration.z += force.z / this.mass;
	}

	setBuoyancy(value: number): void {
		this.buoyancy = value;
	}

	getPosition(): Vector3 {
		return { ...this.position };
	}

	getVelocity(): Vector3 {
		return { ...this.velocity };
	}

	reset(): void {
		this.position = { x: 0, y: 50, z: 0 };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.acceleration = { x: 0, y: 0, z: 0 };
	}
}
