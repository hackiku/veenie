// src/lib/sims/venus/data/surfaceTerrain.ts

import { Color } from 'three';

/**
 * Venus surface terrain data
 * Information about the major terrain features on Venus
 */

export interface TerrainFeature {
	name: string;
	type: 'highland' | 'lowland' | 'mountain' | 'volcano' | 'corona' | 'canyon' | 'tessera' | 'impact';
	center: { lat: number; lon: number }; // degrees
	extent: { lat: [number, number]; lon: [number, number] }; // degrees
	elevation: number; // km relative to mean radius
	diameter?: number; // km (for circular features)
	description: string;
	color?: Color; // for visualization
}

export interface SurfaceProperties {
	composition: string[];
	reflectivity: number; // 0-1
	emissivity: number; // 0-1
	thermalInertia: number; // J/m²/K/√s - ability to resist temperature changes
	radarBrightness: number; // 0-1 scale, for radar visualization
	color: Color; // Average color from Venera lander images
}

// Major terrain features on Venus
export const majorFeatures: TerrainFeature[] = [
	{
		name: 'Ishtar Terra',
		type: 'highland',
		center: { lat: 67, lon: 1 },
		extent: { lat: [60, 75], lon: [-10, 15] },
		elevation: 3.5,
		description: 'A highland region about the size of Australia',
		color: new Color(0xAA7755)
	},
	{
		name: 'Maxwell Montes',
		type: 'mountain',
		center: { lat: 65.2, lon: 3.3 },
		extent: { lat: [63, 67.5], lon: [0, 6.5] },
		elevation: 11, // highest point on Venus
		description: 'Highest mountain on Venus, located in Ishtar Terra',
		color: new Color(0xBB8866)
	},
	{
		name: 'Aphrodite Terra',
		type: 'highland',
		center: { lat: -5, lon: 105 },
		extent: { lat: [-15, 5], lon: [60, 150] },
		elevation: 5,
		description: 'A highland region roughly the size of Africa',
		color: new Color(0xAA7755)
	},
	{
		name: 'Maat Mons',
		type: 'volcano',
		center: { lat: 0.9, lon: 194.5 },
		extent: { lat: [-1, 3], lon: [193, 196] },
		elevation: 8,
		diameter: 395,
		description: 'Large shield volcano with evidence of recent lava flows',
		color: new Color(0xCC9966)
	},
	{
		name: 'Alpha Regio',
		type: 'tessera',
		center: { lat: -25.5, lon: 1.3 },
		extent: { lat: [-30, -20], lon: [-4, 7] },
		elevation: 1.5,
		description: 'A highland region with complex ridged terrain',
		color: new Color(0xBB8855)
	},
	{
		name: 'Beta Regio',
		type: 'highland',
		center: { lat: 25, lon: 282.8 },
		extent: { lat: [20, 30], lon: [277, 289] },
		elevation: 4.5,
		description: 'A volcanic upland region with two large shield volcanoes',
		color: new Color(0xBB8855)
	},
	{
		name: 'Artemis Corona',
		type: 'corona',
		center: { lat: -35, lon: 135 },
		extent: { lat: [-45, -25], lon: [125, 145] },
		elevation: 0.5,
		diameter: 2600,
		description: 'Largest corona on Venus, circular feature formed by upwelling of magma',
		color: new Color(0xBB7744)
	},
	{
		name: 'Lakshmi Planum',
		type: 'highland',
		center: { lat: 68, lon: 339 },
		extent: { lat: [60, 75], lon: [330, 350] },
		elevation: 3.5,
		description: 'Elevated volcanic plateau within Ishtar Terra',
		color: new Color(0xAA7755)
	},
	{
		name: 'Devana Chasma',
		type: 'canyon',
		center: { lat: 0, lon: 290 },
		extent: { lat: [-15, 15], lon: [285, 295] },
		elevation: -2,
		description: 'Rift valley system stretching over 4000 km',
		color: new Color(0x996644)
	},
	{
		name: 'Lada Terra',
		type: 'highland',
		center: { lat: -60, lon: 20 },
		extent: { lat: [-70, -50], lon: [0, 40] },
		elevation: 2.5,
		description: 'Southern highland region with volcanic features',
		color: new Color(0xAA7755)
	},
	{
		name: 'Thetis Regio',
		type: 'highland',
		center: { lat: 10, lon: 130 },
		extent: { lat: [5, 15], lon: [125, 135] },
		elevation: 4,
		description: 'Highland region within Aphrodite Terra',
		color: new Color(0xAA7755)
	},
	{
		name: 'Diana Chasma',
		type: 'canyon',
		center: { lat: -15, lon: 155 },
		extent: { lat: [-17, -13], lon: [150, 160] },
		elevation: -1.5,
		description: 'Deep canyon system in Aphrodite Terra region',
		color: new Color(0x996644)
	},
	{
		name: 'Mead Crater',
		type: 'impact',
		center: { lat: 12.5, lon: 57.2 },
		extent: { lat: [11, 14], lon: [56, 59] },
		elevation: -0.5,
		diameter: 280,
		description: 'Largest impact crater on Venus',
		color: new Color(0x885533)
	},
	{
		name: 'Sacajawea Patera',
		type: 'volcano',
		center: { lat: 64.5, lon: 337 },
		extent: { lat: [63, 66], lon: [335, 339] },
		elevation: 2.5,
		diameter: 120,
		description: 'Large volcanic caldera in Lakshmi Planum',
		color: new Color(0xBB8855)
	},
	{
		name: 'Ovda Regio',
		type: 'tessera',
		center: { lat: -5, lon: 85 },
		extent: { lat: [-10, 0], lon: [80, 90] },
		elevation: 3.5,
		description: 'Highly deformed highland terrain in western Aphrodite Terra',
		color: new Color(0xBB8855)
	}
];

// Lowland plains (planitia) regions
export const planitiaRegions: TerrainFeature[] = [
	{
		name: 'Atalanta Planitia',
		type: 'lowland',
		center: { lat: 65, lon: 165 },
		extent: { lat: [55, 75], lon: [150, 180] },
		elevation: -1.5,
		description: 'Extensive lowland plain in northern hemisphere',
		color: new Color(0x885533)
	},
	{
		name: 'Guinevere Planitia',
		type: 'lowland',
		center: { lat: 15, lon: 325 },
		extent: { lat: [5, 25], lon: [310, 340] },
		elevation: -0.5,
		description: 'Vast volcanic plains region',
		color: new Color(0x885533)
	},
	{
		name: 'Lavinia Planitia',
		type: 'lowland',
		center: { lat: -45, lon: 350 },
		extent: { lat: [-55, -35], lon: [340, 360] },
		elevation: -0.8,
		description: 'Southern hemisphere plain with deformation belts',
		color: new Color(0x885533)
	},
	{
		name: 'Helen Planitia',
		type: 'lowland',
		center: { lat: -50, lon: 255 },
		extent: { lat: [-60, -40], lon: [245, 265] },
		elevation: -1.2,
		description: 'Southern hemisphere lowland region',
		color: new Color(0x885533)
	},
	{
		name: 'Niobe Planitia',
		type: 'lowland',
		center: { lat: 15, lon: 130 },
		extent: { lat: [10, 20], lon: [125, 135] },
		elevation: -0.7,
		description: 'Plains region with several impact craters',
		color: new Color(0x885533)
	},
	{
		name: 'Sedna Planitia',
		type: 'lowland',
		center: { lat: 40, lon: 335 },
		extent: { lat: [35, 45], lon: [325, 345] },
		elevation: -0.6,
		description: 'Northern plains region with lava flows',
		color: new Color(0x885533)
	}
];

// Average surface properties of Venus
export const venusSurface: SurfaceProperties = {
	composition: [
		'Basaltic rock',
		'Iron sulfides',
		'Pyrite',
		'Magnetite',
		'Possibly granitic materials in highlands'
	],
	reflectivity: 0.15, // Venus has a relatively low albedo
	emissivity: 0.85,   // High emissivity in IR
	thermalInertia: 800, // High thermal inertia due to dense atmosphere
	radarBrightness: 0.4, // Average radar backscatter
	color: new Color(0xD0B090) // Yellowish-orange from Venera lander images
};

// Surface type regions
export const surfaceTypes = [
	{
		name: 'Tessera Terrain',
		coverage: 8, // % of surface
		description: 'Highly deformed, ridged terrain, possibly the oldest surface features',
		color: new Color(0xBB8855)
	},
	{
		name: 'Plains (Planitia)',
		coverage: 65, // % of surface
		description: 'Vast lava plains covering majority of the surface',
		color: new Color(0x996644)
	},
	{
		name: 'Volcanic Features',
		coverage: 20, // % of surface
		description: 'Shield volcanoes, volcanic domes, and pancake domes',
		color: new Color(0xAA7755)
	},
	{
		name: 'Tectonic Features',
		coverage: 6, // % of surface
		description: 'Rifts, mountain belts, and ridge belts',
		color: new Color(0xBB7744)
	},
	{
		name: 'Impact Craters',
		coverage: 1, // % of surface
		description: 'Relatively few impact craters due to young surface age',
		color: new Color(0x885533)
	}
];

/**
 * Get a terrain feature at a specific latitude and longitude
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @returns The terrain feature at this location, or undefined if no specific feature
 */
export function getTerrainFeatureAt(lat: number, lon: number): TerrainFeature | undefined {
	// Normalize longitude to 0-360 range
	lon = ((lon % 360) + 360) % 360;

	// Check all major features
	for (const feature of [...majorFeatures, ...planitiaRegions]) {
		if (lat >= feature.extent.lat[0] && lat <= feature.extent.lat[1]) {
			// Handle longitude that crosses the 0/360 boundary
			let inLonRange = false;
			if (feature.extent.lon[0] <= feature.extent.lon[1]) {
				// Normal longitude range
				inLonRange = lon >= feature.extent.lon[0] && lon <= feature.extent.lon[1];
			} else {
				// Longitude range that crosses the boundary
				inLonRange = lon >= feature.extent.lon[0] || lon <= feature.extent.lon[1];
			}

			if (inLonRange) {
				return feature;
			}
		}
	}

	return undefined;
}

/**
 * Get the elevation at a specific latitude and longitude
 * This is a simplified model - a complete elevation model would require a full DEM
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @returns Elevation in km relative to mean radius
 */
export function getElevationAt(lat: number, lon: number): number {
	const feature = getTerrainFeatureAt(lat, lon);

	if (feature) {
		// For simplicity, return the feature's average elevation
		return feature.elevation;
	}

	// Default to plains with slight variation
	const randomVariation = Math.sin(lat * 10) * Math.cos(lon * 10) * 0.2;
	return -0.2 + randomVariation;
}

/**
 * Get the surface type at a specific latitude and longitude
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @returns Surface type description
 */
export function getSurfaceTypeAt(lat: number, lon: number): string {
	const feature = getTerrainFeatureAt(lat, lon);

	if (feature) {
		return feature.type;
	}

	// Default to plains
	return 'lowland';
}

/**
 * Get the surface temperature at a specific location
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @returns Surface temperature in Kelvin
 */
export function getSurfaceTemperatureAt(lat: number, lon: number): number {
	// Venus has a very uniform surface temperature due to greenhouse effect
	// Slight variations exist with elevation (approximately -8K per km of elevation)
	const baseTemperature = 737; // Surface temperature in Kelvin
	const elevation = getElevationAt(lat, lon);

	// Temperature decreases with elevation (lapse rate)
	return baseTemperature - (elevation * 8);
}

/**
 * Check if a point is in daylight
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param solarLongitude Solar longitude (subsolar point longitude)
 * @returns Boolean indicating daylight
 */
export function isInDaylight(lat: number, lon: number, solarLongitude: number): boolean {
	// Venus rotates very slowly, so this is valid
	// Normalize longitudes to -180 to 180
	let normalizedLon = lon;
	if (normalizedLon > 180) normalizedLon -= 360;

	let normalizedSolarLon = solarLongitude;
	if (normalizedSolarLon > 180) normalizedSolarLon -= 360;

	// Check if point is within 90 degrees of the subsolar point
	const lonDiff = Math.abs(normalizedLon - normalizedSolarLon);
	return lonDiff <= 90 || lonDiff >= 270;
}