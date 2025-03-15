// Constants for Venus
const G = 6.67430e-11; // Gravitational constant, m^3 kg^-1 s^-2
const M_VENUS = 4.8675e24; // Venus mass, kg
const R_VENUS = 6051800; // Venus radius, m
const SURFACE_GRAVITY = 8.87; // Venus surface gravity, m/s^2
const VENUS_ATMOSPHERIC_SCALE_HEIGHT = 15900; // Venus atmospheric scale height, m

// Space Shuttle specs (baseline for comparison)
const SHUTTLE_EMPTY_MASS = 78000; // kg
const SHUTTLE_PAYLOAD_CAPACITY = 24400; // kg
const SHUTTLE_PROPELLANT_MASS = 103000; // kg external tank
const SHUTTLE_LENGTH = 37.2; // m
const SHUTTLE_WING_SPAN = 23.8; // m
const SHUTTLE_WING_AREA = 249.9; // m²
const SHUTTLE_LD_RATIO = 4.5; // L/D during landing

// Function to calculate gravity at a given altitude
function gravityAtAltitude(altitude) {
	const r = R_VENUS + altitude;
	return G * M_VENUS / (r * r);
}

// Function to calculate atmospheric density at a given altitude on Venus
function venusAtmosphericDensity(altitude) {
	// Venus surface density is approximately 65 kg/m^3
	const surfaceDensity = 65;
	return surfaceDensity * Math.exp(-altitude / VENUS_ATMOSPHERIC_SCALE_HEIGHT);
}

// Function to calculate drag force
function calculateDrag(velocity, altitude, referenceArea, cd) {
	const density = venusAtmosphericDensity(altitude);
	return 0.5 * density * velocity * velocity * referenceArea * cd;
}

// Function to calculate lift force
function calculateLift(velocity, altitude, referenceArea, cl) {
	const density = venusAtmosphericDensity(altitude);
	return 0.5 * density * velocity * velocity * referenceArea * cl;
}

// Define different configurations for Venus Shuttle-like vehicle
const configurations = [
	{
		name: "Venus Shuttle Baseline",
		scaleFactor: 1.0, // Same size as Earth Shuttle
		propellantFraction: 0.5, // 50% propellant
		engineIsp: 340, // s
		ldRatio: 4.5, // Same as Earth Shuttle
		wingArea: SHUTTLE_WING_AREA,
		referenceArea: SHUTTLE_WING_AREA,
		initialMass: 200000, // kg
	},
	{
		name: "Venus Shuttle Enlarged",
		scaleFactor: 1.5, // 50% larger than Earth Shuttle
		propellantFraction: 0.55, // 55% propellant
		engineIsp: 340, // s
		ldRatio: 4.5, // Same as Earth Shuttle
		wingArea: SHUTTLE_WING_AREA * 1.5 * 1.5, // Scale by area
		referenceArea: SHUTTLE_WING_AREA * 1.5 * 1.5,
		initialMass: 200000 * 1.5 * 1.5, // Mass scales with volume (cube of linear dimension)
	},
	{
		name: "Venus Shuttle High L/D",
		scaleFactor: 1.0, // Same size as Earth Shuttle
		propellantFraction: 0.48, // 48% propellant (less due to more wing structure)
		engineIsp: 340, // s
		ldRatio: 7.0, // Improved aerodynamics
		wingArea: SHUTTLE_WING_AREA * 1.2, // Larger wings for better L/D
		referenceArea: SHUTTLE_WING_AREA * 1.2,
		initialMass: 200000, // kg
	},
	{
		name: "Venus Shuttle Propellant Optimized",
		scaleFactor: 1.0, // Same size as Earth Shuttle
		propellantFraction: 0.65, // 65% propellant (more fuel, less structure)
		engineIsp: 340, // s
		ldRatio: 4.0, // Slightly worse aerodynamics
		wingArea: SHUTTLE_WING_AREA * 0.9, // Smaller wings
		referenceArea: SHUTTLE_WING_AREA * 0.9,
		initialMass: 200000, // kg
	}
];

// Add derived properties to each configuration
configurations.forEach(config => {
	// Calculate mass breakdown
	config.propellantMass = config.initialMass * config.propellantFraction;
	config.dryMass = config.initialMass - config.propellantMass;

	// Assuming 60% of dry mass is structure, 10% is systems, and the rest could be payload
	config.structuralMass = config.dryMass * 0.6;
	config.systemsMass = config.dryMass * 0.1;
	config.maxPayloadMass = config.dryMass - config.structuralMass - config.systemsMass;

	// Calculate lift/drag coefficients
	config.cd = 0.5; // Base drag coefficient (simplified)
	config.cl = config.cd * config.ldRatio; // Calculate lift coefficient from L/D ratio
});

// Simulation parameters
const INITIAL_ALTITUDE = 50000; // m, starting at 50 km
const INITIAL_VELOCITY = 300 * 1000 / 3600; // m/s, 300 km/h from superrotation
const TIME_STEP = 1; // seconds
const MAX_TIME = 1200; // seconds (20 minutes)
const BURN_RATE = 1000; // kg/s fuel consumption (Space Shuttle Main Engines ~3x 7775 kN / 4462.5 s = ~1470 kg/s)

// Function to simulate ascent trajectory
function simulateAscent(config) {
	// Initial conditions
	let altitude = INITIAL_ALTITUDE;
	let velocity = INITIAL_VELOCITY;
	let time = 0;
	let mass = config.initialMass;
	let propellantRemaining = config.propellantMass;
	let deltaV = 0;

	// Arrays to store trajectory data
	const trajectory = [];

	// Simulate until we run out of propellant or reach max time
	while (time < MAX_TIME && propellantRemaining > 0) {
		// Record current state
		trajectory.push({
			time,
			altitude: altitude / 1000, // km
			velocity,
			mass,
			propellantRemaining,
			deltaV,
			specificImpulse: config.engineIsp // s
		});

		// Calculate current gravitational acceleration
		const gravity = gravityAtAltitude(altitude);

		// Calculate thrust
		const thrust = BURN_RATE * config.engineIsp * 9.81; // F = mdot * Isp * g0

		// Calculate aerodynamic forces
		const drag = calculateDrag(velocity, altitude, config.referenceArea, config.cd);
		const lift = calculateLift(velocity, altitude, config.wingArea, config.cl);

		// Simplified ascent profile - initial vertical, then pitch over
		// Start with 90° (vertical), transitioning to 45° by 100 seconds, then to 0° by end
		const pitchAngle = Math.max(0, 90 - time * 0.45) * (Math.PI / 180);

		// Calculate acceleration components
		const thrustAccel = thrust / mass;
		const gravityAccel = gravity;
		const dragAccel = drag / mass;
		const liftAccel = lift / mass;

		// Resolve forces along velocity vector (simplified)
		const netAccelVertical = thrustAccel * Math.sin(pitchAngle) - gravityAccel + liftAccel * Math.cos(pitchAngle);
		const netAccelHorizontal = thrustAccel * Math.cos(pitchAngle) - dragAccel;

		// Calculate net acceleration magnitude (simplified)
		const netAccel = Math.sqrt(netAccelVertical * netAccelVertical + netAccelHorizontal * netAccelHorizontal);

		// Update velocity
		velocity += netAccel * TIME_STEP;

		// Update altitude (simplified vertical component)
		altitude += velocity * Math.sin(pitchAngle) * TIME_STEP;

		// Update mass
		propellantRemaining -= BURN_RATE * TIME_STEP;
		mass = config.dryMass + propellantRemaining;

		// Accumulate delta-V
		deltaV += thrustAccel * TIME_STEP;

		// Increment time
		time += TIME_STEP;

		// Safety check - don't let altitude go negative
		if (altitude < 0) break;
	}

	return trajectory;
}

// Run simulations for each configuration
const simulationResults = {};
configurations.forEach(config => {
	const trajectory = simulateAscent(config);
	simulationResults[config.name] = trajectory;

	// Calculate key performance metrics
	const finalState = trajectory[trajectory.length - 1];
	config.finalAltitude = finalState.altitude;
	config.finalVelocity = finalState.velocity;
	config.finalDeltaV = finalState.deltaV;
	config.burnTime = finalState.time;

	// Calculate delta-V remaining to orbit
	// Orbital velocity at final altitude (simplified circular orbit)
	const finalAltitudeMeters = finalState.altitude * 1000;
	const orbitalV = Math.sqrt(G * M_VENUS / (R_VENUS + finalAltitudeMeters));
	config.deltaVToOrbit = orbitalV - finalState.velocity;

	// Calculate payload to orbit (for the remaining delta-V)
	// Using rocket equation: deltaV = Isp * g0 * ln(m0/mf)
	// m0 = initial mass, mf = final mass

	// If we've already reached or exceeded orbital velocity
	if (config.deltaVToOrbit <= 0) {
		config.deliverablePropellant = config.maxPayloadMass;
	}
	// Otherwise, calculate how much of the payload we'd need to burn to reach orbit
	else {
		const massRatio = Math.exp(config.deltaVToOrbit / (config.engineIsp * 9.81));
		const burnableMass = (config.dryMass * (massRatio - 1)) / (massRatio - config.propellantFraction / (1 - config.propellantFraction));

		// Make sure we don't burn more than max payload
		config.deliverablePropellant = Math.max(0, config.maxPayloadMass - burnableMass);
	}

	// Calculate total propellant to orbit ratio
	config.propellantDeliveryRatio = config.deliverablePropellant / config.propellantMass;
});

// Print a summary of results
console.log("Venus Shuttle Configuration Performance Summary:");
console.log("================================================");

configurations.forEach(config => {
	console.log(`\n${config.name}:`);
	console.log(`- Scale factor: ${config.scaleFactor}x Earth Shuttle`);
	console.log(`- Propellant fraction: ${config.propellantFraction * 100}%`);
	console.log(`- L/D ratio: ${config.ldRatio}`);
	console.log(`- Initial mass: ${Math.round(config.initialMass)} kg`);
	console.log(`- Max payload capacity: ${Math.round(config.maxPayloadMass)} kg`);
	console.log(`- Burn time: ${config.burnTime} seconds`);
	console.log(`- Final altitude: ${config.finalAltitude.toFixed(1)} km`);
	console.log(`- Final velocity: ${config.finalVelocity.toFixed(0)} m/s`);
	console.log(`- Delta-V achieved: ${config.finalDeltaV.toFixed(0)} m/s`);
	console.log(`- Delta-V needed to reach orbit: ${config.deltaVToOrbit.toFixed(0)} m/s`);
	console.log(`- Deliverable propellant to orbit: ${Math.round(config.deliverablePropellant)} kg`);
	console.log(`- Propellant delivery ratio: ${(config.propellantDeliveryRatio * 100).toFixed(1)}%`);
});

// Generate data for delta-V over time comparison
console.log("\nDelta-V over time data (CSV format):");
console.log("Time(s),Baseline(m/s),Enlarged(m/s),HighLD(m/s),PropellantOpt(m/s)");

// Find max length of any trajectory
const maxLength = Math.max(...configurations.map(config => simulationResults[config.name].length));

// Generate time-aligned data for all configurations
for (let i = 0; i < maxLength; i += 10) { // Output every 10 seconds for readability
	if (i >= simulationResults["Venus Shuttle Baseline"].length) break;

	const time = simulationResults["Venus Shuttle Baseline"][i].time;
	let line = `${time}`;

	configurations.forEach(config => {
		const trajectoryData = simulationResults[config.name];
		if (i < trajectoryData.length) {
			line += `,${trajectoryData[i].deltaV.toFixed(0)}`;
		} else {
			line += `,`;
		}
	});

	console.log(line);
}

// Generate data for altitude over time
console.log("\nAltitude over time data (CSV format):");
console.log("Time(s),Baseline(km),Enlarged(km),HighLD(km),PropellantOpt(km)");

for (let i = 0; i < maxLength; i += 10) {
	if (i >= simulationResults["Venus Shuttle Baseline"].length) break;

	const time = simulationResults["Venus Shuttle Baseline"][i].time;
	let line = `${time}`;

	configurations.forEach(config => {
		const trajectoryData = simulationResults[config.name];
		if (i < trajectoryData.length) {
			line += `,${trajectoryData[i].altitude.toFixed(1)}`;
		} else {
			line += `,`;
		}
	});

	console.log(line);
}

// Calculate ISRU efficiency (propellant produced vs. delivered to orbit)
configurations.forEach(config => {
	// Assuming ISRU production consumes 20% of produced propellant for the process
	const isruEfficiency = 0.8; // 80% of produced propellant is deliverable

	// Annual operation calculations
	const turnaroundDays = 10;
	const operationalDays = 300; // Accounting for maintenance
	const flightsPerYear = Math.floor(operationalDays / turnaroundDays);

	// Annual propellant delivered
	const annualDelivery = config.deliverablePropellant * flightsPerYear;

	console.log(`\n${config.name} annual ISRU performance:`);
	console.log(`- Flights per year: ${flightsPerYear}`);
	console.log(`- Annual propellant to orbit: ${Math.round(annualDelivery / 1000)} metric tons`);
	console.log(`- ISRU production required: ${Math.round(annualDelivery / isruEfficiency / 1000)} metric tons`);
});

// Compare propellant delivery ratio across configurations
console.log("\nPropellant Delivery Ratio Comparison:");
configurations.forEach(config => {
	console.log(`${config.name}: ${(config.propellantDeliveryRatio * 100).toFixed(1)}%`);
});