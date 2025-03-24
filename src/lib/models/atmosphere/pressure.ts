// lib/models/atmosphere/pressure.ts
// Pressure profile by altitude

import { ATMOSPHERIC_LAYERS } from './temperature';

// Get pressure at specific altitude
export function getPressureAtAltitude(altitude: number): number {
  // Find layers below and above
  const lowerLayer = ATMOSPHERIC_LAYERS
    .filter(l => l.altitude <= altitude)
    .sort((a, b) => b.altitude - a.altitude)[0];
    
  const upperLayer = ATMOSPHERIC_LAYERS
    .filter(l => l.altitude > altitude)
    .sort((a, b) => a.altitude - b.altitude)[0];
  
  // Handle edge cases
  if (!lowerLayer) return upperLayer.pressure;
  if (!upperLayer) return lowerLayer.pressure;
  
  // For more accuracy, use barometric formula instead of linear interpolation
  // But for MVP, linear interpolation is adequate
  const ratio = (altitude - lowerLayer.altitude) / 
    (upperLayer.altitude - lowerLayer.altitude);
  return lowerLayer.pressure + ratio * (upperLayer.pressure - lowerLayer.pressure);
}
