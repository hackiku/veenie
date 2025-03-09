// src/lib/server/db/seed.ts
import { db } from './index';
import {
	celestialBodies,
	atmosphericData,
	vehicles,
	materials
} from './schema';
import {
	atmosphereLayers,
	temperaturePressureProfile
} from '$lib/data/atmosphere/atmosphere';
import { Color } from 'three';

async function seed() {
	console.log('Seeding database...');

	// Add Venus as a celestial body
	const [venus] = await db.insert(celestialBodies)
		.values({
			name: 'Venus',
			type: 'planet',
			data: {
				radius: 6051.8, // km
				mass: 4.867e24, // kg
				gravity: 8.87, // m/s²
				rotationPeriod: -243.0226, // days (retrograde)
				orbitalPeriod: 224.7, // days
				axialTilt: 177.3, // degrees
				surfaceTemperature: 735, // K
				surfacePressure: 92, // bar
				atmoDensity: 65, // kg/m³
			}
		})
		.returning();

	console.log('Added Venus:', venus);

	// Add atmosphere layers - convert Three.js colors to hex strings
	for (const layer of atmosphereLayers) {
		await db.insert(atmosphericData)
			.values({
				bodyId: venus.id,
				altitude: layer.altitude,
				data: {
					name: layer.name,
					color: '#' + layer.color.getHexString(),
					opacity: layer.opacity,
					temperature: layer.temperature,
					pressure: layer.pressure,
					densityRatio: layer.densityRatio,
					windSpeed: layer.windSpeed,
					composition: layer.composition
				}
			});
	}

	// Add temperature-pressure profile data points
	for (let i = 0; i < temperaturePressureProfile.altitudes.length; i++) {
		await db.insert(atmosphericData)
			.values({
				bodyId: venus.id,
				altitude: temperaturePressureProfile.altitudes[i],
				data: {
					type: 'profile_point',
					temperature: temperaturePressureProfile.temperatures[i],
					pressure: temperaturePressureProfile.pressures[i]
				}
			});
	}

	// Add example vehicles
	await db.insert(vehicles)
		.values([
			{
				name: 'HAVOC Airship',
				type: 'airship',
				data: {
					description: 'High Altitude Venus Operational Concept, a solar-powered airship',
					maxAltitude: 60, // km
					cruiseAltitude: 55, // km
					maxSpeed: 30, // m/s
					mass: 4500, // kg
					dimensions: { length: 130, width: 40, height: 30 }, // meters
					powerSystem: 'Solar + Fuel Cells',
					heatShielding: true,
					crewCapacity: 2,
					sciencePayload: 200 // kg
				}
			},
			{
				name: 'Venus Atmospheric Maneuverable Platform',
				type: 'aircraft',
				data: {
					description: 'Fixed-wing aircraft for Venus atmospheric research',
					maxAltitude: 65, // km
					cruiseAltitude: 62, // km
					maxSpeed: 100, // m/s
					mass: 1200, // kg
					dimensions: { length: 20, width: 25, height: 5 }, // meters
					powerSystem: 'Solar',
					autonomy: 'High',
					sciencePayload: 150 // kg
				}
			}
		]);

	// Add example materials
	await db.insert(materials)
		.values([
			{
				name: 'Titanium Alloy (Ti-6Al-4V)',
				category: 'structural',
				data: {
					description: 'High-strength, low-density alloy resistant to Venus atmosphere',
					meltingPoint: 1660, // K
					density: 4430, // kg/m³
					thermalConductivity: 6.7, // W/(m·K)
					corrosionResistance: 8.5, // 0-10 scale
					strength: 900, // MPa
					yieldStrength: 830, // MPa
					elasticModulus: 114, // GPa
					sulfuricAcidResistance: 'Excellent'
				}
			},
			{
				name: 'Carbon-Carbon Composite',
				category: 'heat-shield',
				data: {
					description: 'Reinforced carbon-carbon for extreme temperature resistance',
					maxServiceTemperature: 2400, // K
					density: 1800, // kg/m³
					thermalConductivity: 15, // W/(m·K)
					corrosionResistance: 6, // 0-10 scale
					strength: 200, // MPa
					ablationRate: 'Very Low',
					reusability: 'Medium'
				}
			}
		]);

	console.log('Database seeded successfully!');
}

seed()
	.catch(e => {
		console.error('Error seeding database:', e);
		process.exit(1);
	})
	.finally(() => {
		// Close connection
		process.exit(0);
	});