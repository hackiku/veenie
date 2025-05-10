// src/lib/sims/material/contexts/physicsContext.svelte.ts
import { getContext, setContext } from 'svelte';

const PHYSICS_CONTEXT_KEY = 'material-physics';

export function createPhysicsContext() {
	// Physical parameters
	let mass = $state(1.0);
	let buoyancy = $state(0.3);
	let dragCoefficient = $state(0.05);

	// State
	let position = $state([0, 51000, 0]); // Start at 51km altitude
	let velocity = $state([0, 0, 0]);
	let forces = $state([]);

	// Control state
	let controlState = $state({
		forward: false,
		backward: false,
		left: false,
		right: false,
		up: false,
		down: false
	});

	// Control strength
	let thrustStrength = $state(0.05);
	let verticalThrustStrength = $state(0.1);

	// Update the physics model based on vehicle data
	function updateFromVehicle(vehicle) {
		if (!vehicle || !vehicle.data) return;

		if (vehicle.data.mass !== undefined) mass = vehicle.data.mass;
		if (vehicle.data.buoyancy !== undefined) buoyancy = vehicle.data.buoyancy;
		if (vehicle.data.dragFactor !== undefined) dragCoefficient = vehicle.data.dragFactor;
	}

	// Apply a force to the physics model
	function applyForce(force) {
		forces.push(force);
	}

	// Main physics update
	function update(deltaTime, atmosphericConditions) {
		// Calculate buoyancy force
		const buoyancyForce = {
			x: 0,
			y: buoyancy * atmosphericConditions.density,
			z: 0
		};

		// Apply natural forces
		applyForce(buoyancyForce);

		// Apply gravity
		applyForce({
			x: 0,
			y: -8.87, // Venus gravity
			z: 0
		});

		// Apply control forces
		applyControlForces();

		// Calculate total force
		let totalForce = { x: 0, y: 0, z: 0 };
		for (const force of forces) {
			totalForce.x += force.x;
			totalForce.y += force.y;
			totalForce.z += force.z;
		}

		// Calculate drag force (proportional to velocity squared)
		const vx = velocity[0];
		const vy = velocity[1];
		const vz = velocity[2];

		const dragX = -vx * Math.abs(vx) * dragCoefficient * atmosphericConditions.density;
		const dragY = -vy * Math.abs(vy) * dragCoefficient * atmosphericConditions.density * 0.5; // Less vertical drag
		const dragZ = -vz * Math.abs(vz) * dragCoefficient * atmosphericConditions.density;

		totalForce.x += dragX;
		totalForce.y += dragY;
		totalForce.z += dragZ;

		// Calculate acceleration (F = ma)
		const ax = totalForce.x / mass;
		const ay = totalForce.y / mass;
		const az = totalForce.z / mass;

		// Update velocity (v = v₀ + a·t)
		velocity[0] += ax * deltaTime;
		velocity[1] += ay * deltaTime;
		velocity[2] += az * deltaTime;

		// Update position (p = p₀ + v·t)
		position[0] += velocity[0] * deltaTime;
		position[1] += velocity[1] * deltaTime;
		position[2] += velocity[2] * deltaTime;

		// Clear forces for next update
		forces = [];

		// Prevent going below ground (0m)
		if (position[1] < 0) {
			position[1] = 0;
			velocity[1] = Math.max(0, velocity[1]);
		}
	}

	// Calculate and apply control forces based on control state
	function applyControlForces() {
		const moveX = (controlState.right ? 1 : 0) - (controlState.left ? 1 : 0);
		const moveZ = (controlState.backward ? 1 : 0) - (controlState.forward ? 1 : 0);
		const moveY = (controlState.up ? 1 : 0) - (controlState.down ? 1 : 0);

		if (moveX !== 0 || moveZ !== 0 || moveY !== 0) {
			applyForce({
				x: moveX * thrustStrength,
				y: moveY * verticalThrustStrength,
				z: moveZ * thrustStrength
			});
		}
	}

	// Set control state
	function setControlState(state) {
		controlState = { ...controlState, ...state };
	}

	// Reset the physics model
	function reset() {
		position = [0, 51000, 0]; // 51km altitude
		velocity = [0, 0, 0];
		forces = [];
	}

	// Create the context object
	const context = {
		// State getters
		getPosition: () => position,
		getVelocity: () => velocity,
		getMass: () => mass,
		getBuoyancy: () => buoyancy,
		getDragCoefficient: () => dragCoefficient,

		// Control methods
		setControlState,
		getThrustStrength: () => thrustStrength,
		setThrustStrength: (value) => { thrustStrength = value; },
		getVerticalThrustStrength: () => verticalThrustStrength,
		setVerticalThrustStrength: (value) => { verticalThrustStrength = value; },

		// Main methods
		updateFromVehicle,
		applyForce,
		update,
		reset,

		// Physical parameter setters
		setBuoyancy: (value) => { buoyancy = value; },
		setMass: (value) => { mass = value; },
		setDragCoefficient: (value) => { dragCoefficient = value; }
	};

	// Register the context
	setContext(PHYSICS_CONTEXT_KEY, context);

	return context;
}

export function getPhysicsContext() {
	return getContext(PHYSICS_CONTEXT_KEY);
}