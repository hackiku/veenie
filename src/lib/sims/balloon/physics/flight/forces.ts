// src/lib/sims/balloon/physics/flight/forces.ts

import type { Vec3 } from '../engine';
import type { FlightState, ForceComponent } from './core.ts';

// Control inputs for force calculation
export interface ControlInputs {
	movement: { x: number; z: number; y?: number }; // -1 to 1
	rotation: { yaw: number; pitch?: number; roll?: number }; // -1 to 1
	throttle?: number; // 0 to 1
	balloonControls?: { inflate: number; deflate: number }; // 0 to 1
	sensitivity: {
		movement: number;
		rotation: number;
		throttle: number;
	};
}

/**
 * Base force component calculator
 */
export abstract class BaseForceComponent {
	abstract name: string;

	abstract calculate(
		state: Readonly<FlightState>,
		controls: ControlInputs,
		deltaTime: number
	): ForceComponent;

	protected createValidForce(
		name: string,
		force: Vec3,
		torque: Vec3 = { x: 0, y: 0, z: 0 },
		debug?: any
	): ForceComponent {
		return {
			name,
			force: this.sanitizeVec3(force),
			torque: this.sanitizeVec3(torque),
			isValid: this.isValidVec3(force) && this.isValidVec3(torque),
			debug
		};
	}

	protected sanitizeVec3(v: Vec3): Vec3 {
		return {
			x: isFinite(v.x) ? v.x : 0,
			y: isFinite(v.y) ? v.y : 0,
			z: isFinite(v.z) ? v.z : 0
		};
	}

	protected isValidVec3(v: Vec3): boolean {
		return isFinite(v.x) && isFinite(v.y) && isFinite(v.z);
	}

	protected vec3Scale(v: Vec3, scalar: number): Vec3 {
		return {
			x: v.x * scalar,
			y: v.y * scalar,
			z: v.z * scalar
		};
	}

	protected vec3Length(v: Vec3): number {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}
}

/**
 * Atmospheric drag force
 */
export class DragForce extends BaseForceComponent {
	name = 'drag';

	constructor(
		private dragCoefficient: number = 0.5,
		private referenceArea: number = 1.0
	) {
		super();
	}

	calculate(state: Readonly<FlightState>, controls: ControlInputs): ForceComponent {
		const { velocity, atmosphericData } = state;

		if (!atmosphericData || atmosphericData.density <= 0) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		const airDensity = atmosphericData.density;
		const speed = this.vec3Length(velocity);

		if (speed < 0.01) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		// Drag force opposes velocity direction
		const dragMagnitude = 0.5 * airDensity * this.dragCoefficient * this.referenceArea * speed * speed;

		const dragForce = {
			x: -(velocity.x / speed) * dragMagnitude,
			y: -(velocity.y / speed) * dragMagnitude,
			z: -(velocity.z / speed) * dragMagnitude
		};

		return this.createValidForce(this.name, dragForce, { x: 0, y: 0, z: 0 }, {
			dragMagnitude,
			speed,
			airDensity
		});
	}

	updateProperties(dragCoefficient?: number, referenceArea?: number): void {
		if (dragCoefficient !== undefined) this.dragCoefficient = Math.max(0, dragCoefficient);
		if (referenceArea !== undefined) this.referenceArea = Math.max(0.01, referenceArea);
	}
}

/**
 * Buoyancy force for balloons
 */
export class BuoyancyForce extends BaseForceComponent {
	name = 'buoyancy';

	constructor(
		private getVolume: () => number,
		private gasDensityRatio: number = 0.125, // Hydrogen/Helium relative to Venus atmosphere
		private structuralMassRatio: number = 0.2 // Envelope mass relative to displaced air
	) {
		super();
	}

	calculate(state: Readonly<FlightState>, controls: ControlInputs): ForceComponent {
		const { atmosphericData, mass } = state;

		if (!atmosphericData || atmosphericData.density <= 0) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		const volume = this.getVolume();
		if (volume <= 0) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		const airDensity = atmosphericData.density;
		const gasDensity = this.gasDensityRatio * airDensity;

		// Mass components
		const displacedAirMass = volume * airDensity;
		const gasMass = volume * gasDensity;
		const envelopeMass = displacedAirMass * this.structuralMassRatio;
		const totalSystemMass = mass + gasMass + envelopeMass;

		// Buoyancy force (positive = upward)
		const buoyancyForce = (displacedAirMass - totalSystemMass) * 8.87; // Venus gravity

		return this.createValidForce(
			this.name,
			{ x: 0, y: buoyancyForce, z: 0 },
			{ x: 0, y: 0, z: 0 },
			{
				volume,
				displacedAirMass,
				gasMass,
				envelopeMass,
				totalSystemMass,
				buoyancyForce,
				airDensity
			}
		);
	}
}

/**
 * Control forces (thrust, movement controls)
 */
export class ControlForce extends BaseForceComponent {
	name = 'control';

	constructor(
		private maxControlForce: number = 500, // Newtons
		private maxControlTorque: number = 100 // Newton-meters
	) {
		super();
	}

	calculate(state: Readonly<FlightState>, controls: ControlInputs): ForceComponent {
		const { movement, rotation, sensitivity } = controls;

		// Calculate control forces based on inputs
		const controlForce = {
			x: movement.x * sensitivity.movement * this.maxControlForce,
			y: (movement.y || 0) * sensitivity.movement * this.maxControlForce,
			z: movement.z * sensitivity.movement * this.maxControlForce
		};

		// Calculate control torques
		const controlTorque = {
			x: (rotation.pitch || 0) * sensitivity.rotation * this.maxControlTorque,
			y: rotation.yaw * sensitivity.rotation * this.maxControlTorque,
			z: (rotation.roll || 0) * sensitivity.rotation * this.maxControlTorque
		};

		return this.createValidForce(this.name, controlForce, controlTorque, {
			inputMagnitude: {
				movement: Math.sqrt(movement.x * movement.x + movement.z * movement.z),
				rotation: Math.abs(rotation.yaw)
			}
		});
	}
}

/**
 * Aerodynamic lift for winged vehicles
 */
export class LiftForce extends BaseForceComponent {
	name = 'lift';

	constructor(
		private wingArea: number = 15.0,
		private liftCoefficient: number = 1.2,
		private aspectRatio: number = 18
	) {
		super();
	}

	calculate(state: Readonly<FlightState>, controls: ControlInputs): ForceComponent {
		const { velocity, atmosphericData, rotation } = state;

		if (!atmosphericData || atmosphericData.density <= 0) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		// Calculate airspeed
		const airspeed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);

		if (airspeed < 1.0) { // Minimum speed for lift
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		// Angle of attack (simplified)
		const angleOfAttack = Math.atan2(velocity.y, airspeed) + rotation.x;

		// Lift calculation
		const dynamicPressure = 0.5 * atmosphericData.density * airspeed * airspeed;
		const effectiveCl = this.liftCoefficient * Math.sin(angleOfAttack + 0.1);
		const liftMagnitude = dynamicPressure * effectiveCl * this.wingArea;

		// Induced drag
		const inducedDragCoeff = (effectiveCl * effectiveCl) / (Math.PI * this.aspectRatio);
		const inducedDrag = dynamicPressure * inducedDragCoeff * this.wingArea;

		// Apply forces
		const liftForce = { x: 0, y: liftMagnitude, z: 0 };
		const dragForce = airspeed > 0 ? {
			x: -(velocity.x / airspeed) * inducedDrag,
			y: 0,
			z: -(velocity.z / airspeed) * inducedDrag
		} : { x: 0, y: 0, z: 0 };

		const totalForce = {
			x: liftForce.x + dragForce.x,
			y: liftForce.y + dragForce.y,
			z: liftForce.z + dragForce.z
		};

		return this.createValidForce(this.name, totalForce, { x: 0, y: 0, z: 0 }, {
			airspeed,
			angleOfAttack: angleOfAttack * 180 / Math.PI,
			liftMagnitude,
			inducedDrag,
			effectiveCl
		});
	}
}

/**
 * Rotor thrust for drones/helicopters
 */
export class RotorThrust extends BaseForceComponent {
	name = 'rotor_thrust';

	private rotorSpeeds: number[] = [0, 0, 0, 0]; // 4 rotors

	constructor(
		private maxRotorSpeed: number = 100,
		private rotorArea: number = 0.2,
		private liftCoefficient: number = 0.8
	) {
		super();
	}

	calculate(state: Readonly<FlightState>, controls: ControlInputs): ForceComponent {
		const { atmosphericData } = state;
		const { throttle = 0, sensitivity } = controls;

		if (!atmosphericData || atmosphericData.density <= 0) {
			return this.createValidForce(this.name, { x: 0, y: 0, z: 0 });
		}

		// Update rotor speeds based on throttle
		const targetSpeed = throttle * sensitivity.throttle * this.maxRotorSpeed;

		// Simple rotor response (could be more sophisticated)
		this.rotorSpeeds = this.rotorSpeeds.map(speed => {
			return speed + (targetSpeed - speed) * 0.1; // 10% per frame response
		});

		// Calculate total thrust
		const totalRotorSpeed = this.rotorSpeeds.reduce((sum, speed) => sum + speed, 0);
		const averageRotorSpeed = totalRotorSpeed / 4;

		// Thrust calculation: T ∝ ρ * A * v²
		const thrust = atmosphericData.density * this.rotorArea * 4 *
			Math.pow(averageRotorSpeed, 1.5) * this.liftCoefficient;

		return this.createValidForce(
			this.name,
			{ x: 0, y: thrust, z: 0 },
			{ x: 0, y: 0, z: 0 },
			{
				rotorSpeeds: [...this.rotorSpeeds],
				averageRotorSpeed,
				thrust,
				throttle
			}
		);
	}

	getRotorSpeeds(): number[] {
		return [...this.rotorSpeeds];
	}
}

/**
 * Force component manager
 */
export class ForceManager {
	private components: Map<string, BaseForceComponent> = new Map();

	addComponent(component: BaseForceComponent): void {
		this.components.set(component.name, component);
	}

	removeComponent(name: string): void {
		this.components.delete(name);
	}

	calculateAllForces(
		state: Readonly<FlightState>,
		controls: ControlInputs,
		deltaTime: number
	): ForceComponent[] {
		const forces: ForceComponent[] = [];

		for (const [name, component] of this.components) {
			try {
				const force = component.calculate(state, controls, deltaTime);
				forces.push(force);
			} catch (error) {
				console.error(`Error calculating force component ${name}:`, error);
				// Add zero force to maintain stability
				forces.push({
					name,
					force: { x: 0, y: 0, z: 0 },
					torque: { x: 0, y: 0, z: 0 },
					isValid: false
				});
			}
		}

		return forces;
	}

	getComponent<T extends BaseForceComponent>(name: string): T | undefined {
		return this.components.get(name) as T;
	}

	getComponentNames(): string[] {
		return Array.from(this.components.keys());
	}

	clear(): void {
		this.components.clear();
	}
}