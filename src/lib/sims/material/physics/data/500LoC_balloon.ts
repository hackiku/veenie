// models/atmosphericBalloon.ts

// Define vector and matrix types for calculations
export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

export interface Matrix3 {
	m11: number; m12: number; m13: number;
	m21: number; m22: number; m23: number;
	m31: number; m32: number; m33: number;
}

// Atmospheric conditions at a given altitude
export interface AtmosphericConditions {
	density: number;        // kg/m³
	temperature: number;    // Kelvin
	pressure: number;       // kPa
	windVector: Vector3;    // m/s
	composition: {
		co2: number;          // % concentration
		n2: number;
		so2: number;
		// ... other gases
	};
}

// Balloon physical parameters
export interface BalloonParameters {
	envelopeVolume: number;      // m³
	envelopeMaterial: string;    // Material type
	envelopeThickness: number;   // mm
	payloadMass: number;         // kg
	gasType: 'hydrogen' | 'helium' | 'heated-atmosphere';
	maxTemperature: number;      // Kelvin
	dragCoefficient: number;     // Dimensionless
}

// State that can be exposed to external systems
export interface BalloonState {
	position: Vector3;
	velocity: Vector3;
	acceleration: Vector3;
	altitude: number;
	temperature: {
		internal: number;
		envelope: number;
	};
	pressure: {
		internal: number;
		external: number;
		differential: number;
	};
	volume: number;
	netBuoyancy: number;
	orientation: Matrix3;
	angularVelocity: Vector3;
	isStable: boolean;
	structuralStress: number;
	remainingBuoyancyControlResource: number;
}

/**
 * Advanced physics model for a high-altitude balloon in Venus's atmosphere
 */
export class AtmosphericBalloonModel {
	// Core physical state
	private position: Vector3;
	private velocity: Vector3;
	private acceleration: Vector3;
	private orientation: Matrix3;
	private angularVelocity: Vector3;
	private angularAcceleration: Vector3;

	// Balloon parameters
	private balloonParameters: BalloonParameters;

	// Dynamic properties
	private volume: number;
	private internalTemperature: number;
	private envelopeTemperature: number;
	private internalPressure: number;
	private buoyancyControlAmount: number;

	// Environment cache
	private currentAtmosphere: AtmosphericConditions | null;

	// Constants
	private readonly VENUS_GRAVITY = 8.87;  // m/s²
	private readonly GAS_CONSTANT = 8.314;  // J/(mol·K)

	/**
	 * Initializes a new balloon model with the given parameters
	 */
	constructor(parameters: BalloonParameters) {
		this.balloonParameters = parameters;

		// Initialize state vectors
		this.position = { x: 0, y: 50000, z: 0 };  // 50km altitude
		this.velocity = { x: 0, y: 0, z: 0 };
		this.acceleration = { x: 0, y: 0, z: 0 };

		// Initialize orientation (identity matrix)
		this.orientation = {
			m11: 1, m12: 0, m13: 0,
			m21: 0, m22: 1, m23: 0,
			m31: 0, m32: 0, m33: 1
		};

		this.angularVelocity = { x: 0, y: 0, z: 0 };
		this.angularAcceleration = { x: 0, y: 0, z: 0 };

		// Initialize dynamic properties
		this.volume = parameters.envelopeVolume;
		this.internalTemperature = 330;  // K
		this.envelopeTemperature = 330;  // K
		this.internalPressure = 1000;    // kPa
		this.buoyancyControlAmount = 1.0; // 0.0 to 1.0

		this.currentAtmosphere = null;
	}

	/**
	 * Updates the balloon physics for the given time step
	 * @param deltaTime Time step in seconds
	 * @param atmosphere Current atmospheric conditions
	 */
	update(deltaTime: number, atmosphere: AtmosphericConditions): void {
		// Cache current atmosphere
		this.currentAtmosphere = atmosphere;

		// Calculate forces
		const gravitationalForce = this.calculateGravitationalForce();
		const buoyancyForce = this.calculateBuoyancyForce(atmosphere);
		const dragForce = this.calculateDragForce(atmosphere);
		const windForce = this.calculateWindForce(atmosphere);

		// Net force
		const netForce: Vector3 = {
			x: buoyancyForce.x + dragForce.x + windForce.x + gravitationalForce.x,
			y: buoyancyForce.y + dragForce.y + windForce.y + gravitationalForce.y,
			z: buoyancyForce.z + dragForce.z + windForce.z + gravitationalForce.z
		};

		// Calculate acceleration (F = ma, so a = F/m)
		const totalMass = this.calculateTotalMass();
		this.acceleration = {
			x: netForce.x / totalMass,
			y: netForce.y / totalMass,
			z: netForce.z / totalMass
		};

		// Update velocity (v = v₀ + a·t)
		this.velocity.x += this.acceleration.x * deltaTime;
		this.velocity.y += this.acceleration.y * deltaTime;
		this.velocity.z += this.acceleration.z * deltaTime;

		// Update position (p = p₀ + v·t)
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;
		this.position.z += this.velocity.z * deltaTime;

		// Update thermal dynamics
		this.updateThermalState(deltaTime, atmosphere);

		// Update volume based on temperature and pressure
		this.updateVolume(atmosphere);

		// Update envelope stress based on pressure differential
		this.calculateEnvelopeStress();

		// Apply angular forces and update orientation
		this.updateOrientation(deltaTime, atmosphere);
	}

	/**
	 * Applies an external force to the balloon
	 */
	applyForce(force: Vector3, worldSpace: boolean = true): void {
		if (worldSpace) {
			this.acceleration.x += force.x / this.calculateTotalMass();
			this.acceleration.y += force.y / this.calculateTotalMass();
			this.acceleration.z += force.z / this.calculateTotalMass();
		} else {
			// Convert from local to world space using orientation matrix
			// (Simplified for brevity - would use matrix multiplication)
			const worldForce = this.localToWorldDirection(force);
			this.acceleration.x += worldForce.x / this.calculateTotalMass();
			this.acceleration.y += worldForce.y / this.calculateTotalMass();
			this.acceleration.z += worldForce.z / this.calculateTotalMass();
		}
	}

	/**
	 * Controls buoyancy by adjusting gas temperature or releasing ballast
	 * @param amount 0.0 to 1.0, where 0 is minimum buoyancy and 1 is maximum
	 */
	controlBuoyancy(amount: number): void {
		this.buoyancyControlAmount = Math.max(0, Math.min(1, amount));

		if (this.balloonParameters.gasType === 'heated-atmosphere') {
			// For hot air balloons, adjust target temperature
			const minTemp = this.currentAtmosphere?.temperature || 330;
			const maxTemp = this.balloonParameters.maxTemperature;
			const targetTemp = minTemp + (maxTemp - minTemp) * this.buoyancyControlAmount;

			// Temperature will transition gradually in updateThermalState
			this.internalTemperature = targetTemp;
		} else {
			// For gas balloons, we could simulate releasing gas or ballast
			// (Simplified for this example)
		}
	}

	/**
	 * Returns the current state of the balloon for external systems
	 */
	getState(): BalloonState {
		// Calculate altitude from y position (assuming y = altitude in meters)
		const altitude = this.position.y;

		// Calculate pressure differential
		const externalPressure = this.currentAtmosphere?.pressure || 0;
		const pressureDifferential = this.internalPressure - externalPressure;

		// Determine if the balloon is stable based on vertical velocity
		const isStable = Math.abs(this.velocity.y) < 0.1;

		// Calculate structural stress (simplified)
		const structuralStress = pressureDifferential * 0.1;

		return {
			position: this.position,
			velocity: this.velocity,
			acceleration: this.acceleration,
			altitude,
			temperature: {
				internal: this.internalTemperature,
				envelope: this.envelopeTemperature
			},
			pressure: {
				internal: this.internalPressure,
				external: this.currentAtmosphere?.pressure || 0,
				differential: pressureDifferential
			},
			volume: this.volume,
			netBuoyancy: this.calculateNetBuoyancy(),
			orientation: this.orientation,
			angularVelocity: this.angularVelocity,
			isStable,
			structuralStress,
			remainingBuoyancyControlResource: this.buoyancyControlAmount
		};
	}

	/**
	 * Resets the balloon to its initial state
	 */
	reset(): void {
		this.position = { x: 0, y: 50000, z: 0 };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.acceleration = { x: 0, y: 0, z: 0 };

		this.orientation = {
			m11: 1, m12: 0, m13: 0,
			m21: 0, m22: 1, m23: 0,
			m31: 0, m32: 0, m33: 1
		};

		this.angularVelocity = { x: 0, y: 0, z: 0 };
		this.angularAcceleration = { x: 0, y: 0, z: 0 };

		this.volume = this.balloonParameters.envelopeVolume;
		this.internalTemperature = 330;
		this.envelopeTemperature = 330;
		this.internalPressure = 1000;
		this.buoyancyControlAmount = 1.0;
	}

	//////////////////////////
	// Private helper methods
	//////////////////////////

	/**
	 * Calculates the total mass of the balloon system
	 */
	private calculateTotalMass(): number {
		const envelopeMass = this.estimateEnvelopeMass();
		const gasMass = this.calculateGasMass();
		return envelopeMass + gasMass + this.balloonParameters.payloadMass;
	}

	/**
	 * Estimates the mass of the balloon envelope based on material and size
	 */
	private estimateEnvelopeMass(): number {
		// Simplified calculation: surface area * thickness * density
		const surfaceArea = 4 * Math.PI * Math.pow(Math.cbrt(3 * this.volume / (4 * Math.PI)), 2);

		// Assume material density based on type (simplified)
		let materialDensity = 1000; // kg/m³
		if (this.balloonParameters.envelopeMaterial === "composite") {
			materialDensity = 1500;
		} else if (this.balloonParameters.envelopeMaterial === "synthetic") {
			materialDensity = 900;
		}

		return surfaceArea * (this.balloonParameters.envelopeThickness / 1000) * materialDensity;
	}

	/**
	 * Calculates the mass of the lifting gas
	 */
	private calculateGasMass(): number {
		// Using ideal gas law: PV = nRT, mass = n * molecular weight
		const molarMass = this.getGasMolarMass();

		// n = PV/RT
		const moles = (this.internalPressure * 1000) * this.volume /
			(this.GAS_CONSTANT * this.internalTemperature);

		return moles * molarMass;
	}

	/**
	 * Gets the molar mass of the lifting gas in kg/mol
	 */
	private getGasMolarMass(): number {
		switch (this.balloonParameters.gasType) {
			case 'hydrogen':
				return 0.002016; // kg/mol
			case 'helium':
				return 0.004003; // kg/mol
			case 'heated-atmosphere':
				// Simplified - would actually depend on atmospheric composition
				return 0.044; // kg/mol (roughly CO2)
			default:
				return 0.004003; // Default to helium
		}
	}

	/**
	 * Calculates gravitational force
	 */
	private calculateGravitationalForce(): Vector3 {
		const totalMass = this.calculateTotalMass();
		return {
			x: 0,
			y: -totalMass * this.VENUS_GRAVITY,
			z: 0
		};
	}

	/**
	 * Calculates buoyancy force using Archimedes' principle
	 */
	private calculateBuoyancyForce(atmosphere: AtmosphericConditions): Vector3 {
		if (!atmosphere) return { x: 0, y: 0, z: 0 };

		// Buoyancy = weight of displaced fluid
		// F_b = ρ_fluid * V * g
		const displacedFluidMass = atmosphere.density * this.volume;
		const buoyancyMagnitude = displacedFluidMass * this.VENUS_GRAVITY;

		return {
			x: 0,
			y: buoyancyMagnitude,
			z: 0
		};
	}

	/**
	 * Calculates drag force
	 */
	private calculateDragForce(atmosphere: AtmosphericConditions): Vector3 {
		if (!atmosphere) return { x: 0, y: 0, z: 0 };

		// Relative velocity (accounting for wind)
		const relVelocity = {
			x: this.velocity.x - atmosphere.windVector.x,
			y: this.velocity.y - atmosphere.windVector.y,
			z: this.velocity.z - atmosphere.windVector.z
		};

		// Calculate velocity magnitude
		const velocityMagnitude = Math.sqrt(
			relVelocity.x * relVelocity.x +
			relVelocity.y * relVelocity.y +
			relVelocity.z * relVelocity.z
		);

		if (velocityMagnitude === 0) return { x: 0, y: 0, z: 0 };

		// Normalize velocity
		const velNorm = {
			x: relVelocity.x / velocityMagnitude,
			y: relVelocity.y / velocityMagnitude,
			z: relVelocity.z / velocityMagnitude
		};

		// Calculate projected area (simplified as circle)
		const radius = Math.cbrt(3 * this.volume / (4 * Math.PI));
		const projectedArea = Math.PI * radius * radius;

		// Drag equation: F_d = 0.5 * ρ * v² * C_d * A
		const dragMagnitude = 0.5 * atmosphere.density * velocityMagnitude * velocityMagnitude *
			this.balloonParameters.dragCoefficient * projectedArea;

		// Drag is opposite to velocity
		return {
			x: -dragMagnitude * velNorm.x,
			y: -dragMagnitude * velNorm.y,
			z: -dragMagnitude * velNorm.z
		};
	}

	/**
	 * Calculates force from wind
	 */
	private calculateWindForce(atmosphere: AtmosphericConditions): Vector3 {
		if (!atmosphere) return { x: 0, y: 0, z: 0 };

		// Wind acts differently on stationary vs. moving objects
		// This is a simplified model
		const windMagnitude = Math.sqrt(
			atmosphere.windVector.x * atmosphere.windVector.x +
			atmosphere.windVector.y * atmosphere.windVector.y +
			atmosphere.windVector.z * atmosphere.windVector.z
		);

		if (windMagnitude < 0.01) return { x: 0, y: 0, z: 0 };

		// Calculate projected area (simplified)
		const radius = Math.cbrt(3 * this.volume / (4 * Math.PI));
		const projectedArea = Math.PI * radius * radius;

		// Similar to drag: F_w = 0.5 * ρ * v_wind² * C_d * A
		const forceMagnitude = 0.5 * atmosphere.density * windMagnitude * windMagnitude *
			this.balloonParameters.dragCoefficient * projectedArea;

		// Force is in direction of wind
		const windDirection = {
			x: atmosphere.windVector.x / windMagnitude,
			y: atmosphere.windVector.y / windMagnitude,
			z: atmosphere.windVector.z / windMagnitude
		};

		return {
			x: forceMagnitude * windDirection.x,
			y: forceMagnitude * windDirection.y,
			z: forceMagnitude * windDirection.z
		};
	}

	/**
	 * Updates thermal state of the balloon
	 */
	private updateThermalState(deltaTime: number, atmosphere: AtmosphericConditions): void {
		if (!atmosphere) return;

		// Heat transfer between atmosphere and envelope
		const envelopeSurfaceArea = 4 * Math.PI * Math.pow(Math.cbrt(3 * this.volume / (4 * Math.PI)), 2);
		const convectionCoefficient = 10; // W/(m²·K), simplified

		// Envelope heat transfer
		const envelopeHeatTransfer = convectionCoefficient * envelopeSurfaceArea *
			(atmosphere.temperature - this.envelopeTemperature);

		// Update envelope temperature
		// Simplified - would need envelope heat capacity calculation
		const envelopeHeatCapacity = 1000; // J/K
		this.envelopeTemperature += envelopeHeatTransfer * deltaTime / envelopeHeatCapacity;

		// Heat transfer between envelope and internal gas
		const internalConvectionCoefficient = 5; // W/(m²·K), simplified
		const internalHeatTransfer = internalConvectionCoefficient * envelopeSurfaceArea *
			(this.envelopeTemperature - this.internalTemperature);

		// Update internal temperature
		// Simplified - would need gas heat capacity calculation
		const gasHeatCapacity = this.calculateGasMass() * 1000; // J/K
		this.internalTemperature += internalHeatTransfer * deltaTime / gasHeatCapacity;

		// For heated balloons, add heat source
		if (this.balloonParameters.gasType === 'heated-atmosphere') {
			const heaterEfficiency = 0.8;
			const maxHeaterPower = 5000; // W
			const heaterPower = maxHeaterPower * this.buoyancyControlAmount * heaterEfficiency;

			// Add heat to internal gas
			this.internalTemperature += heaterPower * deltaTime / gasHeatCapacity;
		}

		// Limit to maximum temperature
		this.internalTemperature = Math.min(
			this.internalTemperature,
			this.balloonParameters.maxTemperature
		);
	}

	/**
	 * Updates the balloon volume based on temperature and pressure
	 */
	private updateVolume(atmosphere: AtmosphericConditions): void {
		if (!atmosphere) return;

		// For a typical balloon, pressure equilibrium is maintained
		// We assume internal pressure adapts to match external with small differential
		const targetPressure = atmosphere.pressure * 1.05; // 5% higher than external

		// Smooth transition for pressure
		const pressureAdjustRate = 0.1; // Rate of pressure adjustment
		this.internalPressure += (targetPressure - this.internalPressure) * pressureAdjustRate;

		// Using ideal gas law, calculate volume: V = nRT/P
		const gasMoles = this.calculateGasMass() / this.getGasMolarMass();
		const calculatedVolume = gasMoles * this.GAS_CONSTANT * this.internalTemperature /
			(this.internalPressure * 1000); // Convert kPa to Pa

		// Limit volume to balloon capacity
		this.volume = Math.min(calculatedVolume, this.balloonParameters.envelopeVolume);
	}

	/**
	 * Calculates stress on the balloon envelope
	 */
	private calculateEnvelopeStress(): number {
		// Pressure differential
		const externalPressure = this.currentAtmosphere?.pressure || 0;
		const pressureDifferential = this.internalPressure - externalPressure;

		// Balloon radius
		const radius = Math.cbrt(3 * this.volume / (4 * Math.PI));

		// Using thin-walled pressure vessel formula: stress = P * r / (2 * t)
		const stress = pressureDifferential * 1000 * radius /
			(2 * this.balloonParameters.envelopeThickness / 1000);

		return stress;
	}

	/**
	 * Updates orientation based on forces
	 */
	private updateOrientation(deltaTime: number, atmosphere: AtmosphericConditions): void {
		// This would involve quaternion math or rotation matrices
		// Simplified for brevity

		// Apply damping to angular velocity
		const angularDamping = 0.9;
		this.angularVelocity.x *= angularDamping;
		this.angularVelocity.y *= angularDamping;
		this.angularVelocity.z *= angularDamping;

		// Update orientation based on angular velocity
		// (This is a simplified approach - would use proper rotation math)

		// Reset angular acceleration for next frame
		this.angularAcceleration = { x: 0, y: 0, z: 0 };
	}

	/**
	 * Converts a direction from local to world space
	 */
	private localToWorldDirection(localDir: Vector3): Vector3 {
		// This would use matrix multiplication with the orientation matrix
		// Simplified implementation
		return {
			x: this.orientation.m11 * localDir.x + this.orientation.m12 * localDir.y + this.orientation.m13 * localDir.z,
			y: this.orientation.m21 * localDir.x + this.orientation.m22 * localDir.y + this.orientation.m23 * localDir.z,
			z: this.orientation.m31 * localDir.x + this.orientation.m32 * localDir.y + this.orientation.m33 * localDir.z
		};
	}

	/**
	 * Calculates the net buoyancy (buoyancy minus weight)
	 */
	private calculateNetBuoyancy(): number {
		if (!this.currentAtmosphere) return 0;

		const displacedFluidMass = this.currentAtmosphere.density * this.volume;
		const buoyancyForce = displacedFluidMass * this.VENUS_GRAVITY;
		const weightForce = this.calculateTotalMass() * this.VENUS_GRAVITY;

		return buoyancyForce - weightForce;
	}
}