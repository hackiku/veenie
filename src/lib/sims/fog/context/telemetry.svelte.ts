// src/lib/sims/balloon/context/telemetry.svelte.ts

import { setContext, getContext } from "svelte";

// context key
const BALLOON_TELEMETRY_CONTEXT_KEY = Symbol('balloon-telemetry');



// export interface BalloonTelemetry {
export interface AircraftTelemetry {
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