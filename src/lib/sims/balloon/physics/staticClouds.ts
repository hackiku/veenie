// src/lib/sims/balloon/physics/staticClouds.ts
import { SIMULATION_CONSTANTS } from '../constants';

export interface CloudField {
	id: number;
	position: [number, number, number]; // x, y, z in meters
	dimensions: [number, number, number]; // width, height, depth in meters
	density: number; // kg/m³ (affects drag and ISRU collection)
	acidity: number; // pH level for realism
	temperature: number; // Kelvin
	composition: {
		sulfuricAcid: number; // 0-1
		water: number; // 0-1
		carbonDioxide: number; // 0-1
	};
	visualProperties: {
		color: string;
		opacity: number;
		roughness: number;
	};
	// Engineering properties
	dragCoefficient: number;
	collectionRate: number; // For ISRU gameplay
	turbulence: number; // Affects balloon stability
}

export interface CloudLayer {
	altitude: number; // meters
	thickness: number; // meters
	coverage: number; // 0-1 (how much of the area is covered)
	baseProperties: Partial<CloudField>;
}

export class StaticCloudSystem {
	private cloudFields: CloudField[] = [];
	private cloudLayers: CloudLayer[] = [];
	private nextCloudId = 0;

	constructor() {
		this.initializeVenusCloudLayers();
		this.generateCloudFields();
	}

	private initializeVenusCloudLayers(): void {
		// Venus has distinct cloud layers based on real atmospheric data
		this.cloudLayers = [
			{
				altitude: 48000, // Lower cloud deck
				thickness: 8000,
				coverage: 0.9,
				baseProperties: {
					density: 2.5,
					acidity: 0.8,
					temperature: 320,
					composition: {
						sulfuricAcid: 0.85,
						water: 0.10,
						carbonDioxide: 0.05
					},
					visualProperties: {
						color: '#D4B896', // Yellowish-brown
						opacity: 0.7,
						roughness: 0.9
					},
					dragCoefficient: 1.2,
					collectionRate: 0.8,
					turbulence: 0.6
				}
			},
			{
				altitude: 56000, // Middle cloud layer  
				thickness: 6000,
				coverage: 0.8,
				baseProperties: {
					density: 1.8,
					acidity: 0.9,
					temperature: 280,
					composition: {
						sulfuricAcid: 0.90,
						water: 0.08,
						carbonDioxide: 0.02
					},
					visualProperties: {
						color: '#E8C547', // Brighter yellow
						opacity: 0.6,
						roughness: 0.8
					},
					dragCoefficient: 1.0,
					collectionRate: 0.9,
					turbulence: 0.4
				}
			},
			{
				altitude: 64000, // Upper haze layer
				thickness: 4000,
				coverage: 0.6,
				baseProperties: {
					density: 0.8,
					acidity: 0.7,
					temperature: 240,
					composition: {
						sulfuricAcid: 0.75,
						water: 0.15,
						carbonDioxide: 0.10
					},
					visualProperties: {
						color: '#F5E6A3', // Pale yellow
						opacity: 0.4,
						roughness: 0.6
					},
					dragCoefficient: 0.6,
					collectionRate: 0.6,
					turbulence: 0.2
				}
			}
		];
	}

	private generateCloudFields(): void {
		const terrainSize = SIMULATION_CONSTANTS.TERRAIN_SIZE;

		this.cloudLayers.forEach(layer => {
			const fieldsInLayer = Math.floor(layer.coverage * 25); // ~25 fields per layer max

			for (let i = 0; i < fieldsInLayer; i++) {
				const field = this.createCloudField(layer);
				this.cloudFields.push(field);
			}
		});
	}

	private createCloudField(layer: CloudLayer): CloudField {
		const terrainSize = SIMULATION_CONSTANTS.TERRAIN_SIZE;

		// Position within terrain bounds
		const x = (Math.random() - 0.5) * terrainSize * 0.8;
		const z = (Math.random() - 0.5) * terrainSize * 0.8;
		const y = layer.altitude + (Math.random() - 0.5) * layer.thickness;

		// Dimensions vary based on layer
		const baseSize = 8000 + Math.random() * 12000; // 8-20km diameter
		const width = baseSize;
		const depth = baseSize * (0.8 + Math.random() * 0.4);
		const height = layer.thickness * (0.3 + Math.random() * 0.4);

		// Merge layer properties with variations
		const baseProps = layer.baseProperties;

		return {
			id: this.nextCloudId++,
			position: [x, y, z],
			dimensions: [width, height, depth],
			density: baseProps.density! * (0.8 + Math.random() * 0.4),
			acidity: baseProps.acidity! * (0.9 + Math.random() * 0.2),
			temperature: baseProps.temperature! + (Math.random() - 0.5) * 20,
			composition: { ...baseProps.composition! },
			visualProperties: {
				color: baseProps.visualProperties!.color,
				opacity: baseProps.visualProperties!.opacity! * (0.8 + Math.random() * 0.4),
				roughness: baseProps.visualProperties!.roughness!
			},
			dragCoefficient: baseProps.dragCoefficient! * (0.9 + Math.random() * 0.2),
			collectionRate: baseProps.collectionRate! * (0.8 + Math.random() * 0.4),
			turbulence: baseProps.turbulence! * (0.5 + Math.random() * 1.0)
		};
	}

	// Engineering methods for balloon interaction
	getCloudFieldsInRange(position: [number, number, number], radius: number): CloudField[] {
		return this.cloudFields.filter(field => {
			const dx = field.position[0] - position[0];
			const dy = field.position[1] - position[1];
			const dz = field.position[2] - position[2];
			const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

			// Check if balloon is within cloud field bounds
			const fieldRadius = Math.max(field.dimensions[0], field.dimensions[2]) / 2;
			return distance < (fieldRadius + radius);
		});
	}

	getCloudPropertiesAtPosition(position: [number, number, number]): {
		density: number;
		dragMultiplier: number;
		turbulence: number;
		collectionRate: number;
		inCloud: boolean;
	} {
		const cloudsHere = this.getCloudFieldsInRange(position, 100); // 100m radius around balloon

		if (cloudsHere.length === 0) {
			return {
				density: 0,
				dragMultiplier: 1.0,
				turbulence: 0,
				collectionRate: 0,
				inCloud: false
			};
		}

		// Combine effects from multiple overlapping clouds
		let totalDensity = 0;
		let totalDrag = 1.0;
		let totalTurbulence = 0;
		let totalCollection = 0;

		cloudsHere.forEach(cloud => {
			// Calculate influence based on position within cloud
			const influence = this.calculateCloudInfluence(position, cloud);

			totalDensity += cloud.density * influence;
			totalDrag += cloud.dragCoefficient * influence;
			totalTurbulence += cloud.turbulence * influence;
			totalCollection += cloud.collectionRate * influence;
		});

		return {
			density: totalDensity,
			dragMultiplier: totalDrag,
			turbulence: totalTurbulence,
			collectionRate: totalCollection,
			inCloud: true
		};
	}

	private calculateCloudInfluence(position: [number, number, number], cloud: CloudField): number {
		const [px, py, pz] = position;
		const [cx, cy, cz] = cloud.position;
		const [w, h, d] = cloud.dimensions;

		// Calculate normalized distance from cloud center
		const dx = Math.abs(px - cx) / (w / 2);
		const dy = Math.abs(py - cy) / (h / 2);
		const dz = Math.abs(pz - cz) / (d / 2);

		// If outside cloud bounds, no influence
		if (dx > 1 || dy > 1 || dz > 1) return 0;

		// Smooth falloff from center to edges
		const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
		return Math.max(0, 1 - Math.pow(distance, 1.5));
	}

	getAllCloudFields(): CloudField[] {
		return [...this.cloudFields];
	}

	getCloudLayers(): CloudLayer[] {
		return [...this.cloudLayers];
	}

	// For telemetry and debugging
	getStats() {
		return {
			totalFields: this.cloudFields.length,
			layerCount: this.cloudLayers.length,
			averageDensity: this.cloudFields.reduce((sum, field) =>
				sum + field.density, 0) / this.cloudFields.length,
			coverageByAltitude: this.cloudLayers.map(layer => ({
				altitude: layer.altitude,
				coverage: layer.coverage
			}))
		};
	}
}

// Singleton instance
let staticCloudSystemInstance: StaticCloudSystem | null = null;

export function getStaticCloudSystem(): StaticCloudSystem {
	if (!staticCloudSystemInstance) {
		staticCloudSystemInstance = new StaticCloudSystem();
	}
	return staticCloudSystemInstance;
}