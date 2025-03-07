// src/lib/sims/venus/telemetry/telemetryGenerator.ts
export interface Telemetry {
	timestamp: Date;
	altitude: number;         // km from Venus surface
	temperature: number;      // Celsius
	pressure: number;         // atmospheres
	windSpeed: number;        // m/s
	acidity: number;          // pH scale 0-14
	visibility: number;       // km
	radiationLevel: number;   // arbitrary scale 0-10
	systemStatus: SystemStatus;
	eventLog: string[];
}

export interface SystemStatus {
	power: number;            // percentage 0-100
	comms: number;            // percentage 0-100
	computers: number;        // percentage 0-100
	sensors: number;          // percentage 0-100
	propulsion: number;       // percentage 0-100
	structuralIntegrity: number; // percentage 0-100
	lifeSupportBackup: number;   // percentage 0-100
}

// Venus atmospheric conditions by altitude
// Data represents approximate values based on Venus studies
const atmosphericLayers = [
	{
		minAltitude: 0, maxAltitude: 15,
		temp: { min: 450, max: 470 },
		pressure: { min: 75, max: 92 },
		wind: { min: 0.5, max: 2 },
		visibility: { min: 0.01, max: 0.1 }
	},
	{
		minAltitude: 15, maxAltitude: 30,
		temp: { min: 390, max: 450 },
		pressure: { min: 35, max: 75 },
		wind: { min: 1, max: 5 },
		visibility: { min: 0.1, max: 0.3 }
	},
	{
		minAltitude: 30, maxAltitude: 50,
		temp: { min: 250, max: 390 },
		pressure: { min: 5, max: 35 },
		wind: { min: 30, max: 120 },
		visibility: { min: 0.3, max: 2 }
	},
	{
		minAltitude: 50, maxAltitude: 65,
		temp: { min: 30, max: 250 },
		pressure: { min: 0.5, max: 5 },
		wind: { min: 60, max: 150 },
		visibility: { min: 2, max: 10 }
	},
	{
		minAltitude: 65, maxAltitude: 100,
		temp: { min: -30, max: 30 },
		pressure: { min: 0.01, max: 0.5 },
		wind: { min: 10, max: 60 },
		visibility: { min: 10, max: 50 }
	}
];

// Pre-scripted key events in the mission
const missionEvents: { altitude: number, event: string }[] = [
	{ altitude: 100, event: "Entering Venus atmosphere, initial deceleration begins" },
	{ altitude: 80, event: "Deploying heat shield, external temperatures rising rapidly" },
	{ altitude: 70, event: "Passing through upper sulfuric acid cloud layer" },
	{ altitude: 60, event: "Deploying atmospheric analyzers, beginning chemical composition readings" },
	{ altitude: 55, event: "Reached target altitude for initial balloon inflation" },
	{ altitude: 52, event: "Primary balloon deployment sequence initiated" },
	{ altitude: 50, event: "Stabilizing at Earth-like temperature and pressure conditions" },
	{ altitude: 49, event: "Deploying solar arrays and research instruments" },
	{ altitude: 48, event: "First full atmospheric sampling cycle complete" },
	{ altitude: 47, event: "Beginning long-term monitoring operations" }
];

// Random event generators to add variety
const randomEvents: (() => string)[] = [
	() => "Detecting unusual sulfur concentrations in local atmosphere",
	() => "Energy output from solar arrays exceeding expectations by 3%",
	() => "Minor turbulence causing slight oscillation in balloon pressure",
	() => "Observed lightning activity in cloud layer below",
	() => "Detected trace organic compounds in atmospheric sample",
	() => "Radiation spike temporarily affecting sensor calibration",
	() => "Thermal regulation system adjusting to maintain equipment temperatures",
	() => "Magnetic anomaly detected in local measurements",
	() => "Communications signal strength fluctuating due to atmospheric conditions",
	() => "Observed interesting cloud formation pattern through visual sensors"
];

// Initial clean system state
const initialSystemStatus: SystemStatus = {
	power: 100,
	comms: 100,
	computers: 100,
	sensors: 100,
	propulsion: 100,
	structuralIntegrity: 100,
	lifeSupportBackup: 100
};

/**
 * Get simulated telemetry data based on altitude and mission time
 */
export function generateTelemetry(altitude: number, missionTime: Date): Telemetry {
	// Find the atmospheric layer for the current altitude
	const layer = atmosphericLayers.find(
		l => altitude >= l.minAltitude && altitude <= l.maxAltitude
	) || atmosphericLayers[0];

	// Calculate values based on the layer with some randomness
	const randomInRange = (min: number, max: number) =>
		min + Math.random() * (max - min);

	// Calculate temperature with altitude interpolation
	const tempRange = altitude / layer.maxAltitude;
	const temperature = randomInRange(
		layer.temp.min + (layer.temp.max - layer.temp.min) * tempRange,
		layer.temp.max
	);

	// Calculate pressure with altitude interpolation
	const pressureFactor = 1 - (altitude - layer.minAltitude) /
		(layer.maxAltitude - layer.minAltitude);
	const pressure = randomInRange(
		layer.pressure.min,
		layer.pressure.min + (layer.pressure.max - layer.pressure.min) * pressureFactor
	);

	// Wind speed increases with randomness
	const windSpeed = randomInRange(layer.wind.min, layer.wind.max);

	// Acidity is higher in certain cloud layers (50-60km)
	const acidity = altitude >= 45 && altitude <= 65
		? randomInRange(1, 3)  // Very acidic in cloud layers
		: randomInRange(3, 7); // Less acidic elsewhere

	// Visibility
	const visibility = randomInRange(layer.visibility.min, layer.visibility.max);

	// Radiation levels
	const radiationBase = 1 - (altitude / 100); // Higher closer to surface
	const radiationLevel = radiationBase * randomInRange(3, 10);

	// Calculate system status
	const systemStatus = calculateSystemStatus(altitude, initialSystemStatus);

	// Generate event log
	const eventLog = generateEventLog(altitude, missionTime);

	return {
		timestamp: missionTime,
		altitude,
		temperature,
		pressure,
		windSpeed,
		acidity,
		visibility,
		radiationLevel,
		systemStatus,
		eventLog
	};
}

/**
 * Calculate system status based on altitude and conditions
 */
function calculateSystemStatus(altitude: number, baseStatus: SystemStatus): SystemStatus {
	const status = { ...baseStatus };

	// Below 30km, heat affects systems
	if (altitude < 30) {
		const heatFactor = 1 - (altitude / 30);
		status.power = Math.max(60, status.power - heatFactor * 20);
		status.sensors = Math.max(70, status.sensors - heatFactor * 15);
		status.comms = Math.max(80, status.comms - heatFactor * 10);
	}

	// In the cloud layer (50-65km), acid affects structural integrity
	if (altitude >= 45 && altitude <= 65) {
		const acidFactor = Math.min(1, (65 - altitude) / 20);
		status.structuralIntegrity = Math.max(85, status.structuralIntegrity - acidFactor * 10);
	}

	// High wind areas (around 50-70km) affect stability
	if (altitude >= 45 && altitude <= 75) {
		const windFactor = Math.min(1, (1 - Math.abs(60 - altitude) / 15));
		status.propulsion = Math.max(90, status.propulsion - windFactor * 5);
	}

	// Add small random fluctuations
	Object.keys(status).forEach(key => {
		const randomFactor = 1 + (Math.random() * 0.05 - 0.025); // ±2.5%
		status[key as keyof SystemStatus] *= randomFactor;
		status[key as keyof SystemStatus] = Math.min(100, Math.max(0, status[key as keyof SystemStatus]));
	});

	return status;
}

/**
 * Generate appropriate event log entries based on altitude and mission time
 */
function generateEventLog(altitude: number, missionTime: Date): string[] {
	const events: string[] = [];

	// Add scripted events when they occur
	const scriptedEvents = missionEvents.filter(e =>
		Math.abs(e.altitude - altitude) < 0.5
	);

	scriptedEvents.forEach(e => events.push(e.event));

	// Add random events occasionally
	if (Math.random() < 0.2) { // 20% chance each call
		const randomEventIndex = Math.floor(Math.random() * randomEvents.length);
		events.push(randomEvents[randomEventIndex]());
	}

	return events;
}