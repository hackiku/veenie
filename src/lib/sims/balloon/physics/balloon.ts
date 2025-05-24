// src/lib/sims/balloon/physics/balloon.ts
import { getAtmosphericConditions } from './atmosphere';
import { SIMULATION_CONSTANTS } from '../constants';
import { venusCoordinates } from './coordinates/venusCoordinates';
import type { Vec3 } from './engine';

export interface BalloonConfig {
	initialSize: number;
	minSize: number;
	maxSize: number;
	gasDensityRatio: number;
	controlSensitivity: number;
	gravity: number;
}

// Enhanced BalloonControls with analog values and yaw
export interface BalloonControls {
	inflate: number;    // 0-1 analog intensity
	deflate: number;    // 0-1 analog intensity
	moveX: number;      // -1 to 1 analog movement
	moveZ: number;      // -1 to 1 analog movement
	yaw: number;        // -1 to 1 analog rotation (new)

	// Sensitivity multipliers
	movementSensitivity: number;  // Overall movement sensitivity
	rotationSensitivity: number;  // Yaw rotation sensitivity
	balloonSensitivity: number;   // Balloon inflation sensitivity
}

export interface BalloonTelemetry {
	altitude: number;
	balloonSize: number;
	airDensity: number;
	buoyancy: number;
	position?: { x: number, y: number, z: number };
	velocity?: { x: number, y: number, z: number };
	globalPosition?: { latitude: number, longitude: number, altitude: number };
	windSpeed?: number;
	// Enhanced telemetry
	yawRate?: number;           // Current rotation rate
	controlIntensity?: {        // Current control intensities
		movement: number;
		rotation: number;
		balloon: number;
	};
}

export class BalloonPhysics {
	// Balloon state
	private position: Vec3;
	private velocity: Vec3;
	private rotation: Vec3;
	private angularVelocity: Vec3;
	private balloonSize: number;
	private config: BalloonConfig;
	private mass: number = SIMULATION_CONSTANTS.BALLOON_MASS;

	// Global position tracking
	private globalPosition: { latitude: number; longitude: number; altitude: number };
	private lastUpdateTime: number = Date.now() / 1000;
	private windSpeed: number = 0;

	// Enhanced controls state with analog support
	private controls: BalloonControls = {
		inflate: 0,
		deflate: 0,
		moveX: 0,
		moveZ: 0,
		yaw: 0,
		movementSensitivity: 1.0,
		rotationSensitivity: 1.0,
		balloonSensitivity: 1.0
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

		console.log("Enhanced BalloonPhysics initialized with analog controls");
	}

	/**
	 * Enhanced control setting with analog support
	 */
	setControls(controls: Partial<BalloonControls>): void {
		const oldControls = { ...this.controls };
		this.controls = { ...this.controls, ...controls };

		// Log significant changes
		const hasSignificantChange =
			Math.abs(oldControls.moveX - this.controls.moveX) > 0.1 ||
			Math.abs(oldControls.moveZ - this.controls.moveZ) > 0.1 ||
			Math.abs(oldControls.yaw - this.controls.yaw) > 0.1 ||
			Math.abs(oldControls.inflate - this.controls.inflate) > 0.1 ||
			Math.abs(oldControls.deflate - this.controls.deflate) > 0.1;

		if (hasSignificantChange) {
			console.log('Enhanced balloon controls updated:', {
				movement: { x: this.controls.moveX.toFixed(2), z: this.controls.moveZ.toFixed(2) },
				yaw: this.controls.yaw.toFixed(2),
				balloon: { inflate: this.controls.inflate.toFixed(2), deflate: this.controls.deflate.toFixed(2) }
			});
		}
	}

	/**
	 * Set analog control intensity (new method for physics bridge)
	 */
	setAnalogControl(control: string, value: number): void {
		switch (control) {
			case 'moveX':
				this.controls.moveX = Math.max(-1, Math.min(1, value));
				break;
			case 'moveZ':
				this.controls.moveZ = Math.max(-1, Math.min(1, value));
				break;
			case 'yaw':
				this.controls.yaw = Math.max(-1, Math.min(1, value));
				break;
			case 'inflate':
				this.controls.inflate = Math.max(0, Math.min(1, value));
				break;
			case 'deflate':
				this.controls.deflate = Math.max(0, Math.min(1, value));
				break;
		}
	}

	/**
	 * Set control sensitivity (new method)
	 */
	setControlSensitivity(type: 'movement' | 'rotation' | 'balloon', sensitivity: number): void {
		switch (type) {
			case 'movement':
				this.controls.movementSensitivity = Math.max(0.1, Math.min(2.0, sensitivity));
				break;
			case 'rotation':
				this.controls.rotationSensitivity = Math.max(0.1, Math.min(2.0, sensitivity));
				break;
			case 'balloon':
				this.controls.balloonSensitivity = Math.max(0.1, Math.min(2.0, sensitivity));
				break;
		}
	}

	// Existing methods (unchanged)
	getBalloonSize(): number {
		return this.balloonSize;
	}

	getPosition(): Vec3 {
		return this.position;
	}

	getRotation(): Vec3 {
		return this.rotation;
	}

	getGlobalPosition() {
		return { ...this.globalPosition };
	}

	/**
	 * Enhanced telemetry with new control info
	 */
	getTelemetry(): BalloonTelemetry {
		return {
			...this.telemetry,
			position: { ...this.position },
			velocity: { ...this.velocity },
			globalPosition: { ...this.globalPosition },
			windSpeed: this.windSpeed,
			yawRate: this.angularVelocity.y, // Y-axis rotation for yaw
			controlIntensity: {
				movement: Math.sqrt(this.controls.moveX ** 2 + this.controls.moveZ ** 2),
				rotation: Math.abs(this.controls.yaw),
				balloon: Math.max(this.controls.inflate, this.controls.deflate)
			}
		};
	}

	/**
	 * Enhanced reset method
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

		// Reset enhanced controls
		this.controls = {
			inflate: 0,
			deflate: 0,
			moveX: 0,
			moveZ: 0,
			yaw: 0,
			movementSensitivity: 1.0,
			rotationSensitivity: 1.0,
			balloonSensitivity: 1.0
		};

		// Reset telemetry
		this.telemetry = {
			altitude: resetPos.y,
			balloonSize: this.balloonSize,
			airDensity: 0,
			buoyancy: 0,
			globalPosition: { ...this.globalPosition },
			windSpeed: 0,
			yawRate: 0,
			controlIntensity: { movement: 0, rotation: 0, balloon: 0 }
		};
	}

	/**
	 * Main physics update with enhanced controls
	 */
	update(delta: number): void {
		this.frameCount++;

		// Calculate elapsed real time for superrotation
		const currentTime = Date.now() / 1000;
		const elapsed = currentTime - this.lastUpdateTime;
		this.lastUpdateTime = currentTime;

		// 1. Update balloon size based on analog controls
		const sizeChangeRate = 1.1; // Size change per second
		let sizeChange = 0;

		// Apply analog balloon controls with sensitivity
		const effectiveInflate = this.controls.inflate * this.controls.balloonSensitivity;
		const effectiveDeflate = this.controls.deflate * this.controls.balloonSensitivity;

		if (effectiveInflate > 0) {
			sizeChange = sizeChangeRate * effectiveInflate;
		} else if (effectiveDeflate > 0) {
			sizeChange = -sizeChangeRate * effectiveDeflate;
		}

		// Apply size change with delta time scaling
		if (Math.abs(sizeChange) > 0.01) {
			const newSize = Math.max(
				this.config.minSize,
				Math.min(
					this.balloonSize + (sizeChange * delta),
					this.config.maxSize
				)
			);

			if (Math.abs(newSize - this.balloonSize) > 0.01) {
				this.lastSizeChange = this.frameCount;
				this.balloonSize = newSize;
			}
		}

		// 2. Get atmosphere data
		const atmosphere = getAtmosphericConditions(this.position.y);
		const airDensity = atmosphere.density;

		// 3. Calculate buoyancy (unchanged)
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);
		const gasDensity = this.config.gasDensityRatio * airDensity;
		const structuralMassRatio = 0.15;
		const displacedAirMass = volume * airDensity;
		const structuralMass = displacedAirMass * structuralMassRatio;
		const gasInsideMass = volume * gasDensity;
		const payloadMass = this.mass;
		const totalMass = structuralMass + payloadMass + gasInsideMass;
		const buoyancyForce = (displacedAirMass - totalMass) * this.config.gravity;

		// 4. Enhanced force calculation with analog controls
		const forces = { x: 0, y: buoyancyForce, z: 0 };

		// Apply analog movement controls with sensitivity
		const controlSpeed = this.config.controlSensitivity * 5.0;
		const effectiveMoveX = this.controls.moveX * this.controls.movementSensitivity;
		const effectiveMoveZ = this.controls.moveZ * this.controls.movementSensitivity;

		forces.x += effectiveMoveX * controlSpeed;
		forces.z += effectiveMoveZ * controlSpeed;

		// 5. Enhanced yaw control (new)
		const yawTorque = this.controls.yaw * this.controls.rotationSensitivity * 50.0; // Adjust multiplier as needed
		this.angularVelocity.y += yawTorque * delta;

		// Apply yaw damping
		this.angularVelocity.y *= 0.95;

		// Update yaw rotation
		this.rotation.y += this.angularVelocity.y * delta;

		// Normalize yaw rotation to prevent overflow
		this.rotation.y = ((this.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

		// 6. Calculate drag (unchanged)
		const dragCoefficient = 0.5;
		const crossSectionalArea = Math.PI * this.balloonSize * this.balloonSize;
		const dragFactor = 0.5 * airDensity * dragCoefficient * crossSectionalArea;

		const dragForce = {
			x: -this.velocity.x * Math.abs(this.velocity.x) * dragFactor,
			y: -this.velocity.y * Math.abs(this.velocity.y) * dragFactor * 0.5,
			z: -this.velocity.z * Math.abs(this.velocity.z) * dragFactor
		};

		forces.x += dragForce.x;
		forces.y += dragForce.y;
		forces.z += dragForce.z;

		// 7. Update velocity (unchanged)
		const acceleration = {
			x: forces.x / totalMass,
			y: forces.y / totalMass,
			z: forces.z / totalMass
		};

		this.velocity.x += acceleration.x * delta;
		this.velocity.y += acceleration.y * delta;
		this.velocity.z += acceleration.z * delta;

		// 8. Update position
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
		this.position.z += this.velocity.z * delta;

		// 9-12. Wind effects, coordinate updates, telemetry (unchanged from original)
		const windEffect = venusCoordinates.calculateSuperrotationDisplacement(
			this.position.y,
			elapsed
		);

		this.windSpeed = windEffect.speed;

		const updatedLocal = venusCoordinates.updateGridIfNeeded(
			this.position.x,
			this.position.z
		);

		if (updatedLocal.x !== this.position.x || updatedLocal.z !== this.position.z) {
			this.position.x = updatedLocal.x;
			this.position.z = updatedLocal.z;
		}

		const global = venusCoordinates.localToSpherical(
			this.position.x,
			this.position.y,
			this.position.z
		);

		global.longitude += windEffect.longitude;
		global.longitude = ((global.longitude + 180) % 360) - 180;

		this.globalPosition = global;

		// Enhanced telemetry update
		this.telemetry = {
			altitude: this.position.y,
			balloonSize: this.balloonSize,
			airDensity,
			buoyancy: buoyancyForce,
			globalPosition: { ...this.globalPosition },
			windSpeed: windEffect.speed,
			yawRate: this.angularVelocity.y,
			controlIntensity: {
				movement: Math.sqrt(effectiveMoveX ** 2 + effectiveMoveZ ** 2),
				rotation: Math.abs(this.controls.yaw * this.controls.rotationSensitivity),
				balloon: Math.max(effectiveInflate, effectiveDeflate)
			}
		};

		// Enhanced logging
		const shouldLog =
			this.frameCount % 60 === 0 ||
			(this.frameCount - this.lastSizeChange) < 5;

		if (shouldLog) {
			console.log(`Enhanced balloon status: pos=(${this.position.x.toFixed(1)},${this.position.y.toFixed(1)},${this.position.z.toFixed(1)}), yaw=${(this.rotation.y * 180 / Math.PI).toFixed(1)}°, controls=(${effectiveMoveX.toFixed(2)},${effectiveMoveZ.toFixed(2)},yaw:${(this.controls.yaw * this.controls.rotationSensitivity).toFixed(2)})`);
		}
	}
}