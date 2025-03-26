// src/lib/data/atmosphere/index.ts
// Unified API for Venus atmospheric data

import {
	getWindSpeedAt,
	getWindDirectionAt,
	getCloudLayerAt,
	getCloudOpacityAt,
	getAtmosphericTurbulence
} from './atmosphericDynamics';

import { getTemperatureAtAltitude } from './temperature';
import { getPressureAtAltitude } from './pressure';
import { getCompositionAtAltitude } from './composition';

// Re-export with consistent naming
export const getWindSpeedAtAltitude = getWindSpeedAt;
export const getWindDirectionAtAltitude = getWindDirectionAt;

// Provide a comprehensive function that returns all atmospheric properties at once
export function getAtmosphericProperties(altitude: number, latitude: number = 0) {
	return {
		temperature: getTemperatureAtAltitude(altitude),
		pressure: getPressureAtAltitude(altitude),
		composition: getCompositionAtAltitude(altitude),
		windSpeed: getWindSpeedAt(altitude, latitude),
		windDirection: getWindDirectionAt(altitude, latitude),
		cloudLayer: getCloudLayerAt(altitude),
		cloudOpacity: getCloudOpacityAt(altitude),
		turbulence: getAtmosphericTurbulence(altitude, latitude)
	};
}

// Re-export all the original functions too
export {
	getTemperatureAtAltitude,
	getPressureAtAltitude,
	getCompositionAtAltitude,
	getWindSpeedAt,
	getWindDirectionAt,
	getCloudLayerAt,
	getCloudOpacityAt,
	getAtmosphericTurbulence
};