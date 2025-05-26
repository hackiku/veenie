// src/lib/sims/balloon/physics/balloon.ts - FIXED VERSION

import { getAtmosphericConditions } from './atmosphere';
import { SIMULATION_CONSTANTS } from '../constants';
import { venusCoordinates } from './coordinates/venusCoordinates';
import type { Vec3 } from './engine';

export interface BalloonConfig {
	initialSize: number;
	minSize: number;
	maxSize: number;
	gasDensityRatio: number;
	envelopeMassRatio: number;  // NEW: Envelope mass as ratio of payload
	controlSensitivity: number;
	gravity: number;
}

// Enhanced BalloonControls with analog values and yaw
export interface BalloonControls {
	inflate: number;    // 0-1 analog intensity
	deflate: number;    // 0-1 analog intensity
	moveX: number;      // -1 to 1 analog movement
	moveZ: number;      // -1 to 1 analog movement
	yaw: number;        // -1 to 1 analog rotation

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
	// NEW: Mass breakdown for debugging
	massBreakdown?: {
		payload: number;
		envelope: number;
		gas: number;
		total: number;
		displacedAir: number;
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
	private payloadMass: number = SIMULATION_CONSTANTS.BALLOON_MASS;

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

		console.log("Enhanced BalloonPhysics initialized with realistic mass model");
		console.log(`Payload mass: ${this.payloadMass}kg, Envelope ratio: ${config.envelopeMassRatio}`);
	}

	/**
	 * Enhanced control setting with proper validation
	 */
	setControls(controls: Partial<BalloonControls>): void {
		const oldControls = { ...this.controls };

		// Merge new controls with existing ones
		this.controls = { ...this.controls, ...controls };

		// Ensure all values are numbers
		this.controls.inflate = Number(this.controls.inflate) || 0;
		this.controls.deflate = Number(this.controls.deflate) || 0;
		this.controls.moveX = Number(this.controls.moveX) || 0;
		this.controls.moveZ = Number(this.controls.moveZ) || 0;
		this.controls.yaw = Number(this.controls.yaw) || 0;
		this.controls.movementSensitivity = Number(this.controls.movementSensitivity) || 1.0;
		this.controls.rotationSensitivity = Number(this.controls.rotationSensitivity) || 1.0;
		this.controls.balloonSensitivity = Number(this.controls.balloonSensitivity) || 1.0;

		// Log significant changes
		const hasSignificantChange =
			Math.abs((oldControls.moveX || 0) - this.controls.moveX) > 0.1 ||
			Math.abs((oldControls.moveZ || 0) - this.controls.moveZ) > 0.1 ||
			Math.abs((oldControls.yaw || 0) - this.controls.yaw) > 0.1 ||
			Math.abs((oldControls.inflate || 0) - this.controls.inflate) > 0.1 ||
			Math.abs((oldControls.deflate || 0) - this.controls.deflate) > 0.1;

		if (hasSignificantChange) {
			console.log('Enhanced balloon controls updated:', {
				movement: { x: this.controls.moveX.toFixed(2), z: this.controls.moveZ.toFixed(2) },
				yaw: this.controls.yaw.toFixed(2),
				balloon: { inflate: this.controls.inflate.toFixed(2), deflate: this.controls.deflate.toFixed(2) }
			});
		}
	}

	/**
	 * Set analog control intensity with proper validation
	 */
	setAnalogControl(control: string, value: number): void {
		const numValue = Number(value) || 0;

		switch (control) {
			case 'moveX':
				this.controls.moveX = Math.max(-1, Math.min(1, numValue));
				break;
			case 'moveZ':
				this.controls.moveZ = Math.max(-1, Math.min(1, numValue));
				break;
			case 'yaw':
				this.controls.yaw = Math.max(-1, Math.min(1, numValue));
				break;
			case 'inflate':
				this.controls.inflate = Math.max(0, Math.min(1, numValue));
				break;
			case 'deflate':
				this.controls.deflate = Math.max(0, Math.min(1, numValue));
				break;
		}
	}

	/**
	 * Set control sensitivity with validation
	 */
	setControlSensitivity(type: 'movement' | 'rotation' | 'balloon', sensitivity: number): void {
		const numSensitivity = Number(sensitivity) || 1.0;
		const clampedSensitivity = Math.max(0.1, Math.min(2.0, numSensitivity));

		switch (type) {
			case 'movement':
				this.controls.movementSensitivity = clampedSensitivity;
				break;
			case 'rotation':
				this.controls.rotationSensitivity = clampedSensitivity;
				break;
			case 'balloon':
				this.controls.balloonSensitivity = clampedSensitivity;
				break;
		}
	}

	/**
	 * FIXED: Calculate realistic mass breakdown
	 */
	private calculateMassBreakdown(volume: number, airDensity: number) {
		// Payload mass (instruments, basket, etc.)
		const payloadMass = this.payloadMass;

		// Envelope mass based on ratio
		const envelopeMass = payloadMass * this.config.envelopeMassRatio;

		// Gas mass inside balloon
		const gasDensity = this.config.gasDensityRatio * airDensity;
		const gasMass = volume * gasDensity;

		// Total system mass
		const totalMass = payloadMass + envelopeMass + gasMass;

		// Mass of displaced air
		const displacedAirMass = volume * airDensity;

		return {
			payload: payloadMass,
			envelope: envelopeMass,
			gas: gasMass,
			total: totalMass,
			displacedAir: displacedAirMass
		};
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
	 * Enhanced telemetry with mass breakdown
	 */
	getTelemetry(): BalloonTelemetry {
		return {
			...this.telemetry,
			position: { ...this.position },
			velocity: { ...this.velocity },
			globalPosition: { ...this.globalPosition },
			windSpeed: this.windSpeed,
			yawRate: this.angularVelocity.y,
			controlIntensity: {
				movement: Math.sqrt((this.controls.moveX || 0) ** 2 + (this.controls.moveZ || 0) ** 2),
				rotation: Math.abs(this.controls.yaw || 0),
				balloon: Math.max(this.controls.inflate || 0, this.controls.deflate || 0)
			}
		};
	}

	/**
	 * Enhanced reset method with proper initialization
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

		console.log('Balloon physics reset to realistic configuration');
	}

	/**
	 * MAIN PHYSICS UPDATE - FIXED BUOYANCY CALCULATION
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
		const effectiveInflate = (this.controls.inflate || 0) * (this.controls.balloonSensitivity || 1.0);
		const effectiveDeflate = (this.controls.deflate || 0) * (this.controls.balloonSensitivity || 1.0);

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

		// 3. FIXED BUOYANCY CALCULATION
		const volume = (4 / 3) * Math.PI * Math.pow(this.balloonSize, 3);
		const massBreakdown = this.calculateMassBreakdown(volume, airDensity);

		// Buoyancy force using Archimedes' principle
		const buoyancyForce = (massBreakdown.displacedAir - massBreakdown.total) * this.config.gravity;

		// 4. Enhanced force calculation with analog controls
		const forces = { x: 0, y: buoyancyForce, z: 0 };

		// Apply analog movement controls with sensitivity
		const controlSpeed = this.config.controlSensitivity * 5.0;
		const effectiveMoveX = (this.controls.moveX || 0) * (this.controls.movementSensitivity || 1.0);
		const effectiveMoveZ = (this.controls.moveZ || 0) * (this.controls.movementSensitivity || 1.0);

		forces.x += effectiveMoveX * controlSpeed;
		forces.z += effectiveMoveZ * controlSpeed;

		// 5. Enhanced yaw control
		const yawTorque = (this.controls.yaw || 0) * (this.controls.rotationSensitivity || 1.0) * 50.0;
		this.angularVelocity.y += yawTorque * delta;

		// Apply yaw damping
		this.angularVelocity.y *= 0.95;

		// Update yaw rotation
		this.rotation.y += this.angularVelocity.y * delta;

		// Normalize yaw rotation to prevent overflow
		this.rotation.y = ((this.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

		// 6. Drag calculation
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

		// 7. Update velocity using F = ma
		const acceleration = {
			x: forces.x / massBreakdown.total,
			y: forces.y / massBreakdown.total,
			z: forces.z / massBreakdown.total
		};

		this.velocity.x += acceleration.x * delta;
		this.velocity.y += acceleration.y * delta;
		this.velocity.z += acceleration.z * delta;

		// 8. Update position
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;
		this.position.z += this.velocity.z * delta;

		// 9. Wind effects and coordinate updates
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

		// 10. Enhanced telemetry update with mass breakdown
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
				rotation: Math.abs((this.controls.yaw || 0) * (this.controls.rotationSensitivity || 1.0)),
				balloon: Math.max(effectiveInflate, effectiveDeflate)
			},
			massBreakdown
		};

		// Enhanced logging with mass breakdown
		const shouldLog = this.frameCount % 120 === 0 || (this.frameCount - this.lastSizeChange) < 5;

		if (shouldLog) {
			console.log(`🎈 FIXED Balloon Status:`, {
				altitude: `${this.position.y.toFixed(0)}m`,
				size: `${this.balloonSize.toFixed(2)}m`,
				airDensity: `${airDensity.toFixed(2)}kg/m³`,
				masses: {
					displaced: `${massBreakdown.displacedAir.toFixed(1)}kg`,
					total: `${massBreakdown.total.toFixed(1)}kg`,
					payload: `${massBreakdown.payload.toFixed(1)}kg`,
					envelope: `${massBreakdown.envelope.toFixed(1)}kg`,
					gas: `${massBreakdown.gas.toFixed(1)}kg`
				},
				buoyancy: `${buoyancyForce.toFixed(1)}N`,
				netAccel: `${(buoyancyForce / massBreakdown.total).toFixed(2)}m/s²`
			});
		}
	}
}