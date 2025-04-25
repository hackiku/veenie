
// src/lib/sims/material/types/index.ts
export interface PhysicsContext {
	buoyancy: number;
	gravity: number;
	paused: boolean;
	bodyPosition: [number, number, number];
	debug: boolean;
	rigidBody: any;
	gravityVector: [number, number, number];

	setBuoyancy(value: number): void;
	setGravity(value: number): void;
	setPaused(value: boolean): void;
	setDebug(value: boolean): void;
	setRigidBody(body: any): void;
	applyForce(force: { x: number, y: number, z: number }): void;
	resetSimulation(): void;
	update(deltaTime: number): void;
}

export interface FlightContext {
	keyStates: Record<string, boolean>;
	thrustStrength: number;
	verticalThrustStrength: number;
	CONTROL_KEYS: Record<string, string>;

	setupKeyboardListeners(): (() => void) | undefined;
	applyControlForces(): void;
	setThrustStrength(value: number): void;
	setVerticalThrustStrength(value: number): void;
}

export interface AtmosphereContext {
	windEnabled: boolean;
	windIntensity: number;
	cloudLayers: Array<{ altitude: number, thickness: number, density: number }>;
	currentDensity: number;
	currentTemperature: number;
	currentAltitude: number;

	updateConditions(altitude: number): void;
	applyAtmosphericForces(altitude: number): void;
	setWindEnabled(value: boolean): void;
	setWindIntensity(value: number): void;
}

export interface SimulationContext {
	paused: boolean;
	timeScale: number;
	debugMode: boolean;

	physics: PhysicsContext;
	flight: FlightContext;
	atmosphere: AtmosphereContext;

	togglePause(): void;
	setTimeScale(scale: number): void;
	toggleDebug(): void;
	resetSimulation(): void;
	update(deltaTime: number): void;
}