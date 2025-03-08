// src/lib/sims/venus/data/atmosphere.ts

import { Color } from 'three';

export interface AtmosphereLayer {
  name: string;
  altitude: number; // km
  color: Color;
  opacity: number;
  temperature?: number; // K
  pressure?: number; // bars
  densityRatio?: number;
  windSpeed?: number; // m/s
  composition?: Record<string, number>;
}

export interface AtmosphereProfile {
  // Temperature and pressure profile
  altitudes: number[]; // km
  temperatures: number[]; // K
  pressures: number[]; // bars
}

// Data extracted from the provided images
export const venusComposition = {
  carbonDioxide: 96.5, // %
  nitrogen: 3.5, // %
  sulfurDioxide: 150, // ppm
  argon: 70, // ppm
  waterVapor: 20, // ppm
  carbonMonoxide: 17, // ppm
  helium: 12, // ppm
  neon: 7, // ppm
  hydrogenChloride: 0.1, // ppm
  hydrogenFluoride: 0.001 // ppm
};

// Venus temperature-pressure profile from image 2
export const temperaturePressureProfile: AtmosphereProfile = {
  altitudes: [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100
  ],
  temperatures: [
    462, 424, 385, 348, 306, 264, 222, 180, 143, 110, 75, 27, -10, -30, -43, -76, -104, -112
  ].map(celsius => celsius + 273.15), // Convert to Kelvin
  pressures: [
    92.10, 66.65, 47.39, 33.04, 22.52, 14.93, 9.851, 5.917, 3.501, 1.979, 
    1.066, 0.5314, 0.2357, 0.09765, 0.03690, 0.004760, 0.0003736, 0.00002660
  ]
};

// Wind speeds at different altitudes (data from image 3)
export const windProfile = {
  // Approximate data extracted from the zonal wind speed chart
  altitudes: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  speeds: [0, 10, 30, 60, 90, 100, 95, 80, 60, 40, 20, 10, 0] // m/s
};

// Detailed atmosphere layers
export const atmosphereLayers: AtmosphereLayer[] = [
  { 
    name: 'Surface',
    altitude: 0,
    color: new Color(0xFFDB99),
    opacity: 0.9,
    temperature: 735, // K
    pressure: 92, // bars
    densityRatio: 1.0,
    windSpeed: 0.5, // m/s
    composition: { ...venusComposition }
  },
  { 
    name: 'Lower Haze',
    altitude: 30,
    color: new Color(0xE6C98C),
    opacity: 0.7,
    temperature: 495, // K
    pressure: 9.85, // bars
    densityRatio: 0.6,
    windSpeed: 60, // m/s
    composition: { ...venusComposition, sulfurDioxide: 180 } // slight variation
  },
  { 
    name: 'Middle & Lower Clouds',
    altitude: 50,
    color: new Color(0xD9D9D9),
    opacity: 0.6,
    temperature: 348, // K
    pressure: 1.07, // bars
    densityRatio: 0.3,
    windSpeed: 100, // m/s - super-rotation
    composition: { ...venusComposition, sulfuricAcid: 75 } // adding sulfuric acid droplets
  },
  { 
    name: 'Upper Clouds',
    altitude: 65,
    color: new Color(0xBFBFBF),
    opacity: 0.5,
    temperature: 243, // K
    pressure: 0.1, // bars
    densityRatio: 0.1,
    windSpeed: 80, // m/s
    composition: { ...venusComposition, sulfuricAcid: 90 }
  },
  { 
    name: 'Upper Haze',
    altitude: 90,
    color: new Color(0x9FAFCF),
    opacity: 0.3,
    temperature: 169, // K
    pressure: 0.0004, // bars
    densityRatio: 0.001,
    windSpeed: 40, // m/s
    composition: { ...venusComposition, carbonDioxide: 99 }
  },
  { 
    name: 'Thermosphere', 
    altitude: 120,
    color: new Color(0x7E93BE),
    opacity: 0.1,
    temperature: 300, // K (increases due to solar radiation)
    pressure: 0.000001, // bars
    densityRatio: 0.0001,
    windSpeed: 5, // m/s
    composition: { 
      carbonDioxide: 80,
      atomicOxygen: 10,
      atomicHydrogen: 5,
      helium: 5
    }
  }
];

// Function to interpolate values from the temperature-pressure profile
export function interpolateAtmosphereValue(
  altitude: number, 
  altitudes: number[], 
  values: number[]
): number {
  if (altitude <= altitudes[0]) return values[0];
  if (altitude >= altitudes[altitudes.length - 1]) return values[values.length - 1];
  
  // Find the two nearest altitude indices
  let lowerIndex = 0;
  for (let i = 0; i < altitudes.length; i++) {
    if (altitudes[i] <= altitude) lowerIndex = i;
  }
  const upperIndex = lowerIndex + 1;
  
  // Linear interpolation
  const lowerAlt = altitudes[lowerIndex];
  const upperAlt = altitudes[upperIndex];
  const lowerVal = values[lowerIndex];
  const upperVal = values[upperIndex];
  
  const factor = (altitude - lowerAlt) / (upperAlt - lowerAlt);
  return lowerVal + factor * (upperVal - lowerVal);
}

// Get temperature at a specific altitude
export function getTemperatureAtAltitude(altitude: number): number {
  return interpolateAtmosphereValue(
    altitude,
    temperaturePressureProfile.altitudes,
    temperaturePressureProfile.temperatures
  );
}

// Get pressure at a specific altitude
export function getPressureAtAltitude(altitude: number): number {
  return interpolateAtmosphereValue(
    altitude,
    temperaturePressureProfile.altitudes,
    temperaturePressureProfile.pressures
  );
}

// Get wind speed at a specific altitude
export function getWindSpeedAtAltitude(altitude: number): number {
  return interpolateAtmosphereValue(
    altitude,
    windProfile.altitudes,
    windProfile.speeds
  );
}

// Calculate buoyancy for a balloon or floating platform
export function calculateBuoyancy(
  altitude: number,
  volume: number, // m³
  mass: number, // kg
  gasDensity: number // kg/m³ (density of gas in the balloon)
): number {
  // Get Venus atmosphere density at altitude (approximate based on pressure)
  const pressure = getPressureAtAltitude(altitude); // bars
  const temperature = getTemperatureAtAltitude(altitude); // K
  
  // CO2 molar mass is about 44 g/mol
  const molarMass = 0.044; // kg/mol
  const R = 8.3145; // J/(mol·K)
  
  // Density calculation using ideal gas law (ρ = PM/RT)
  // Convert pressure from bars to Pa (1 bar = 100,000 Pa)
  const pressurePa = pressure * 100000;
  const venusDensity = (pressurePa * molarMass) / (R * temperature);
  
  // Buoyancy force = (venus density - balloon gas density) * volume * gravity
  const venusGravity = 8.87; // m/s²
  const buoyancyForce = (venusDensity - gasDensity) * volume * venusGravity;
  
  // Net force = buoyancy force - weight
  const netForce = buoyancyForce - (mass * venusGravity);
  
  return netForce; // Positive means upward force, negative means downward
}