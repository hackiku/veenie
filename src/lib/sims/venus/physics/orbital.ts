// src/lib/sims/venus/physics/orbital.ts

/**
 * Simple Venus-centric model for simulation
 * No complex orbital mechanics, just what we need for lighting and rotation
 */

export const VENUS_PARAMS = {
  ROTATION_PERIOD_HOURS: 243 * 24,  // Venus day in hours (retrograde)
  SUN_ORBIT_DISTANCE: 25000,        // Render distance for sun
  SUN_ORBIT_PERIOD: 3600,           // Sun orbit period in seconds (1 hour for demo)
} as const;

/**
 * Calculate sun position relative to Venus (Venus-centric)
 * Simple circular orbit for lighting purposes
 */
export function getSunPosition(simulationTimeSeconds: number): [number, number, number] {
  try {
    const timeSeconds = typeof simulationTimeSeconds === 'number' && !isNaN(simulationTimeSeconds) 
      ? simulationTimeSeconds 
      : 0;
    
    // Simple orbit around Venus for lighting
    const angle = (timeSeconds / VENUS_PARAMS.SUN_ORBIT_PERIOD) * 2 * Math.PI;
    const distance = VENUS_PARAMS.SUN_ORBIT_DISTANCE;
    
    return [
      distance * Math.cos(angle),
      distance * 0.2, // Slight vertical offset
      distance * Math.sin(angle)
    ];
  } catch (error) {
    console.error('Error in getSunPosition:', error);
    return [25000, 5000, 0]; // Fallback position
  }
}

/**
 * Calculate Venus rotation angle (retrograde)
 */
export function getVenusRotation(simulationTimeSeconds: number): number {
  try {
    const timeSeconds = typeof simulationTimeSeconds === 'number' && !isNaN(simulationTimeSeconds) 
      ? simulationTimeSeconds 
      : 0;
    
    // Venus rotates backwards (retrograde) very slowly
    const rotationRate = -360 / (VENUS_PARAMS.ROTATION_PERIOD_HOURS * 3600); // degrees per second
    const rotationAngle = timeSeconds * rotationRate;
    
    return rotationAngle % 360;
  } catch (error) {
    console.error('Error in getVenusRotation:', error);
    return 0;
  }
}

/**
 * Generate simple circular path for visualization
 */
export function getCircularPathPoints(radius: number = 25000, segments: number = 64): number[] {
  const points: number[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      radius * Math.cos(angle),
      0, // Keep on XZ plane
      radius * Math.sin(angle)
    );
  }
  
  return points;
}