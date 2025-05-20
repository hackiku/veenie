// src/lib/sims/balloon/physics/balloon.ts
import { getAtmosphericConditions } from './atmosphere';
import { SIMULATION_CONSTANTS } from '../constants';
import { venusCoordinates } from './coordinates/venusCoordinates';
import type { Vec3 } from './engine';

export interface BalloonConfig {
	initialSize: number;   // meters
	minSize: number;       // meters
	maxSize: number;       // meters
	gasDensityRatio: number;
	controlSensitivity: number;
	gravity: number;       // m/s²
}

export interface BalloonControls {
	inflate: boolean;
	deflate: boolean;
	moveX: number;
	moveZ: number;
}

export interface BalloonTelemetry {
	altitude: number;      // meters
	balloonSize: number;   // meters
	airDensity: number;    // kg/m³
	buoyancy: number;      // Newtons
	position?: { x: number, y: number, z: number }; // meters
	velocity?: { x: number, y: number, z: number }; // m/s
	globalPosition?: { latitude: number, longitude: number, altitude: number };
	windSpeed?: number;    // m/s
}

export class BalloonPhysics {
	// Balloon state
	private position: Vec3;
	private velocity: Vec3;
	private rotation: Vec3;
	private angularVelocity: Vec3;
	private balloonSize: number;
	private config: BalloonConfig;
	private mass: number = SIMULATION_CONSTANTS.BALLOON_MASS; // kg

	// Global position tracking
	private globalPosition: { latitude: number; longitude: number; altitude: number };
	private lastUpdateTime: number = Date.now() / 1000;
	private windSpeed: number = 0;

	// Controls state
	private controls: BalloonControls = {
		inflate: false,
		deflate: false,
		moveX: 0,
		moveZ: 0
	};

	// Telemetry data
	private telemetry: BalloonTelemetry = {
		altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
		balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
		airDensity: 0,
		buoyancy: 0
	};

	// Frame counter for throttling logs
	private frameCount: number = 0;
	private lastSizeChange: number = 0;

	constructor(config: BalloonConfig) {
		this.config = config;
		this.balloonSize = config.initialSize;
		this.position = {
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		};
		this.velocity = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 0, y: 0, z: 0 };
		this.angularVelocity = { x: 0, y: 0, z: 0 };

		// Initialize global position
		this.globalPosition = venusCoordinates.localToSpherical(
			this.position.x,
			this.position.y,
			this.position.z
		);

		console.log("BalloonPhysics initialized with size:", this.balloonSize, "meters");
		console.log("Initial global position:", this.globalPosition);
	}

	/**
	 * Update balloon controls
	 */
	setControls(controls: Partial<BalloonControls>): void {
		const oldControls = { ...this.controls };
		this.controls = { ...this.controls, ...controls };

		// Log only when controls change
		const hasChanged = JSON.stringify(oldControls) !== JSON.stringify(this.controls);
		if (hasChanged) {
			console.log('Balloon controls updated:', this.controls);
		}
	}

	/**
	 * Get current balloon size in meters
	 */
	getBalloonSize(): number {
		return this.balloonSize;
	}

	/**
	 * Get current balloon position in meters
	 */
	getPosition(): Vec3 {
		return this.position;
	}

	/**
	 * Get current balloon rotation
	 */
	getRotation(): Vec3 {
		return this.rotation;
	}

	/**
	 * Get current global position
	 */
	getGlobalPosition() {
		return { ...this.globalPosition };
	}

	/**
	 * Get balloon telemetry
	 */
	getTelemetry(): BalloonTelemetry {
		return {
			...this.telemetry,
			position: { ...this.position },
			velocity: { ...this.velocity },
			globalPosition: { ...this.globalPosition },
			windSpeed: this.windSpeed
		};
	}

	/**
	 * Reset balloon state
	 */
	reset(position?: { x: number, y: number, z: number }): void {
		// Reset size
		this.balloonSize = this.config.initialSize;
		this.frameCount = 0;
		this.lastSizeChange = 0;
		this.lastUpdateTime = Date.now() / 1000;

		// Reset position
		const resetPos = position || {
			x: 0,
			y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
			z: 0
		};

		console.log("Resetting balloon position to:", resetPos, "meters");

		// Reset physics state
		this.position = { ...resetPos };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 0, y: 0, z: 0 };
		this.angularVelocity = { x: 0, y: 0, z: 0 };

		// Reset global position
		this.globalPosition = venusCoordinates.localToSpherical(
			this.position.x,
			this.position.y,
			this.position.z
		);

		// Reset controls
		this.controls = {
			inflate: false,
			deflate: false,
			moveX: 0,
			moveZ: 0
		};

		// Reset telemetry
		this.telemetry = {
			altitude: resetPos.y,
			balloonSize: this.balloonSize,
			airDensity: 0,
			buoyancy: 0,
			globalPosition: { ...this.globalPosition },
			windSpeed: 0
		};
	}

	/**
	 * Main physics update with coordinate system integration
	 */
	update(delta: number): void {
		this.frameCount++;

		// Calculate elapsed real time for superrotation
		const currentTime = Date.now() / 1000;
		const elapsed = currentTime - this.lastUpdateTime;
		this.lastUpdateTime = currentTime;

		// 1. Update balloon size based on controls
		const sizeChangeRate = 0.8; // Size change per second in meters
		let sizeChange = 0;

		if (this.controls.inflate) {
			sizeChange = sizeChangeRate;
		} else if (this.controls.deflate) {
			sizeChange = -sizeChangeRate;
		}

		// Apply size change with delta time scaling
		if (sizeChange !== 0) {
			const newSize = Math.max(
				this.config.minSize,
				Math.min(
					this.balloonSize + (sizeChange * delta),
					this.config.maxSize
				)
			);

			// Check if the size changed significantly
			if (Math.abs(newSize - this.balloonSize) > 0.01) {
				this.lastSizeChange = this.frameCount;
				this.balloonSize = newSize;
				console.log(`Balloon size changed to: ${this.balloonSize.toFixed(2)} meters`);
			}
		}

		// 2. Get atmosphere data at current altitude in meters
		const atmosphere = getAtmosphericConditions(this.position.y);
		const airDensity = atmosphere.density;

		// 3. Calculate buoyancy
		// Volume of a sphere = (4/3) * π * r³ (in m³)
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);

		// Gas density (hydrogen/helium is much lighter than Venus atmosphere)
		const gasDensity = this.config.gasDensityRatio * airDensity;

		// Calculate mass of air displaced by balloon + structural mass
		const structuralMassRatio = 0.15; // 15% of displacement is structural mass
		const displacedAirMass = volume * airDensity;
		const structuralMass = displacedAirMass * structuralMassRatio;

		// Total mass = structural mass + basket/payload + gas inside
		const gasInsideMass = volume * gasDensity;
		const payloadMass = this.mass;
		const totalMass = structuralMass + payloadMass + gasInsideMass;

		// Calculate net buoyancy force: (displaced air mass - total mass) * gravity
		const buoyancyForce = (displacedAirMass - totalMass) * this.config.gravity;

		// 4. Calculate and apply forces
		const forces = { x: 0, y: buoyancyForce, z: 0 };

		// Add control forces
		const controlSpeed = this.config.controlSensitivity * 5.0;
		forces.x += this.controls.moveX * controlSpeed;
		forces.z += this.controls.moveZ * controlSpeed;

		// 5. Calculate drag
		// Drag force = 0.5 * density * velocity^2 * drag coefficient * cross-sectional area
		const dragCoefficient = 0.5;
		const crossSectionalArea = Math.PI * this.balloonSize * this.balloonSize;

		const dragFactor = 0.5 * airDensity * dragCoefficient * crossSectionalArea;

		const dragForce = {
			x: -this.velocity.x * Math.abs(this.velocity.x) * dragFactor,
			y: -this.velocity.y * Math.abs(this.velocity.y) * dragFactor * 0.5, // Less vertical drag
			z: -this.velocity.z * Math.abs(this.velocity.z) * dragFactor
		};

		// Add drag to forces
		forces.x += dragForce.x;
		forces.y += dragForce.y;
		forces.z += dragForce.z;

		// 6. Update velocity (F = ma, so a = F/m)
		const acceleration = {
			x: forces.x / totalMass,
			y: forces.y / totalMass,
			z: forces.z / totalMass
		};

		this.velocity.x += acceleration.x * delta;
		this.velocity.y += acceleration.y * delta;
		this.velocity.z += acceleration.z * delta;

		// 7. Update position
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
		this.position.z += this.velocity.z * delta;

		// 8. Wind effect from superrotation
		// Calculate wind effects based on altitude in meters
		const windEffect = venusCoordinates.calculateSuperrotationDisplacement(
			this.position.y, // altitude in meters
			elapsed // real time elapsed
		);

		// Store wind speed for telemetry
		this.windSpeed = windEffect.speed;

		// 9. Check if we need to shift our coordinate grid
		const updatedLocal = venusCoordinates.updateGridIfNeeded(
			this.position.x,
			this.position.z
		);

		// If the grid shifted, update our local position
		if (updatedLocal.x !== this.position.x || updatedLocal.z !== this.position.z) {
			this.position.x = updatedLocal.x;
			this.position.z = updatedLocal.z;
		}

		// 10. Convert to global coordinates
		const global = venusCoordinates.localToSpherical(
			this.position.x,
			this.position.y,
			this.position.z
		);

		// Apply superrotation effect to longitude
		global.longitude += windEffect.longitude;

		// Normalize longitude
		global.longitude = ((global.longitude + 180) % 360) - 180;

		// Store updated global position
		this.globalPosition = global;

		// 11. Update telemetry
		this.telemetry = {
			altitude: this.position.y,
			balloonSize: this.balloonSize,
			airDensity,
			buoyancy: buoyancyForce,
			globalPosition: { ...this.globalPosition },
			windSpeed: windEffect.speed
		};

		// 12. Log status periodically
		const shouldLog =
			this.frameCount % 60 === 0 || // Regular updates
			(this.frameCount - this.lastSizeChange) < 5; // More frequent updates when size changes

		if (shouldLog) {
			console.log(`Balloon status: pos=(${this.position.x.toFixed(1)},${this.position.y.toFixed(1)},${this.position.z.toFixed(1)})m, global=(${this.globalPosition.latitude.toFixed(2)}°N,${this.globalPosition.longitude.toFixed(2)}°E,${(this.globalPosition.altitude / 1000).toFixed(1)}km), vel=(${this.velocity.x.toFixed(2)},${this.velocity.y.toFixed(2)},${this.velocity.z.toFixed(2)})m/s, size=${this.balloonSize.toFixed(1)}m, windSpeed=${windEffect.speed.toFixed(1)}m/s`);
		}
	}
}