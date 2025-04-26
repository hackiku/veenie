// src/lib/sims/material/physics/flight.ts
import { Vector3 } from "three";

export class FlightModel {
	private position: Vector3;
	private velocity: Vector3;
	private acceleration: Vector3;
	private mass: number;
	private buoyancy: number;
	private dragCoefficient: number;

	constructor() {
		this.position = new Vector3(0, 20, 0);
		this.velocity = new Vector3(0, 0, 0);
		this.acceleration = new Vector3(0, 0, 0);
		this.mass = 1.0;
		this.buoyancy = 0.3;
		this.dragCoefficient = 0.05;
	}

	update(deltaTime: number, gravity: number, atmosphericDensity: number): void {
		// Calculate buoyancy force based on atmospheric density
		const buoyancyForce = this.buoyancy * atmosphericDensity;

		// Apply gravitational force (start with net vertical force)
		this.acceleration.y = buoyancyForce - gravity;

		// Calculate drag forces proportional to velocity squared (more realistic)
		const dragForceX = -this.velocity.x * Math.abs(this.velocity.x) * this.dragCoefficient * atmosphericDensity;
		const dragForceY = -this.velocity.y * Math.abs(this.velocity.y) * this.dragCoefficient * atmosphericDensity * 0.5; // Less vertical drag
		const dragForceZ = -this.velocity.z * Math.abs(this.velocity.z) * this.dragCoefficient * atmosphericDensity;

		// Apply drag forces to acceleration
		this.acceleration.x += dragForceX / this.mass;
		this.acceleration.y += dragForceY / this.mass;
		this.acceleration.z += dragForceZ / this.mass;

		// Update velocity with acceleration
		this.velocity.x += this.acceleration.x * deltaTime;
		this.velocity.y += this.acceleration.y * deltaTime;
		this.velocity.z += this.acceleration.z * deltaTime;

		// Update position with velocity
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;
		this.position.z += this.velocity.z * deltaTime;

		// Ensure minimum altitude (ground collision)
		if (this.position.y < 0) {
			this.position.y = 0;
			this.velocity.y = Math.max(0, this.velocity.y); // Prevent going below ground
		}

		// Reset horizontal acceleration for next frame
		this.acceleration.x = 0;
		this.acceleration.z = 0;
		// Don't reset vertical acceleration to allow buoyancy to continue working
	}

	applyForce(force: Vector3): void {
		this.acceleration.x += force.x / this.mass;
		this.acceleration.y += force.y / this.mass;
		this.acceleration.z += force.z / this.mass;
	}

	setBuoyancy(value: number): void {
		this.buoyancy = value;
	}

	getBuoyancy(): number {
		return this.buoyancy;
	}

	setDragCoefficient(value: number): void {
		this.dragCoefficient = value;
	}

	getDragCoefficient(): number {
		return this.dragCoefficient;
	}

	getPosition(): Vector3 {
		// Return a new Vector3 to avoid mutation
		return new Vector3(this.position.x, this.position.y, this.position.z);
	}

	getVelocity(): Vector3 {
		// Return a new Vector3 to avoid mutation
		return new Vector3(this.velocity.x, this.velocity.y, this.velocity.z);
	}

	reset(): void {
		this.position.set(0, 20, 0);
		this.velocity.set(0, 0, 0);
		this.acceleration.set(0, 0, 0);
	}
}