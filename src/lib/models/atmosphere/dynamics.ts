// lib/models/atmosphere/dynamics.ts
// Wind and circulation patterns

import { Vector3 } from '/core/types/physics';

// Get wind vector at a specific altitude and time
export function getWindVectorAtAltitude(altitude: number, time: number = 0): Vector3 {
  // Example wind model - would be more complex in full simulation
  
  // Super-rotation in upper atmosphere (60+ km)
  if (altitude > 60) {
    // Fast winds ~100 m/s, primarily east-west (zonal)
    return {
      x: Math.sin(time/1000) * 100,
      y: 0,
      z: Math.cos(time/1000) * 100
    };
  } 
  // Mid-level atmosphere (40-60 km)
  else if (altitude > 40) {
    // Moderate winds ~50 m/s
    return {
      x: Math.sin(time/500) * 50,
      y: 0,
      z: Math.cos(time/500) * 50
    };
  } 
  // Lower atmosphere
  else {
    // Slower winds ~10 m/s
    return {
      x: Math.sin(time/200) * 10,
      y: 0,
      z: Math.cos(time/200) * 10
    };
  }
}

// Get circulation pattern - thermal cells
export function getCirculationCells(latitude: number, altitude: number): string {
  if (altitude < 20) return "Lower Hadley Cell";
  if (altitude < 50) return "Middle Hadley Cell";
  return "Upper Hadley Cell";
}
