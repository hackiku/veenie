// lib/models/atmosphere/venus.svelte.ts
// Complete reactive Venus atmosphere model

import { getCompositionAtAltitude } from './composition';
import { getTemperatureAtAltitude, ATMOSPHERIC_LAYERS } from './temperature';
import { getPressureAtAltitude } from './pressure';
import { getWindVectorAtAltitude } from './dynamics';

// Reactive atmospheric model
let $state layers = ATMOSPHERIC_LAYERS;

// Reactive functions
let $derived temperatureAtAltitude = getTemperatureAtAltitude;
let $derived pressureAtAltitude = getPressureAtAltitude;
let $derived compositionAtAltitude = getCompositionAtAltitude;

// Calculate density using ideal gas law
let $derived densityAtAltitude = (altitude: number) => {
  const pressure = pressureAtAltitude(altitude);
  const temperature = temperatureAtAltitude(altitude);
  const molarMass = 0.0434; // kg/mol - average for Venus atmosphere
  const R = 8.314; // J/(mol·K) - gas constant
  
  // Convert bar to Pa
  const pressurePa = pressure * 100000;
  
  // ρ = PM/RT
  return (pressurePa * molarMass) / (R * temperature);
};

// Wind vector with time dependency
let $derived windVectorAtAltitude = getWindVectorAtAltitude;

// Export the reactive atmospheric model
export {
  layers,
  temperatureAtAltitude,
  pressureAtAltitude,
  compositionAtAltitude,
  densityAtAltitude,
  windVectorAtAltitude
};
