// lib/models/atmosphere/temperature.ts
// Temperature profile by altitude

// Reference atmospheric layers
export const ATMOSPHERIC_LAYERS = [
  { altitude: -0.5, name: "Surface", temp: 737, pressure: 92 },
  { altitude: 5, name: "Lower Cloud", temp: 650, pressure: 66.5 },
  { altitude: 50, name: "Middle Cloud", temp: 345, pressure: 3.8 },
  { altitude: 70, name: "Upper Cloud", temp: 230, pressure: 0.3 },
  { altitude: 100, name: "Mesosphere", temp: 170, pressure: 0.001 },
  { altitude: 200, name: "Thermosphere", temp: 300, pressure: 0.00001 }
];

// Get temperature at specific altitude
export function getTemperatureAtAltitude(altitude: number): number {
  // Find layers below and above
  const lowerLayer = ATMOSPHERIC_LAYERS
    .filter(l => l.altitude <= altitude)
    .sort((a, b) => b.altitude - a.altitude)[0];
    
  const upperLayer = ATMOSPHERIC_LAYERS
    .filter(l => l.altitude > altitude)
    .sort((a, b) => a.altitude - b.altitude)[0];
  
  // Handle edge cases
  if (!lowerLayer) return upperLayer.temp;
  if (!upperLayer) return lowerLayer.temp;
  
  // Linear interpolation
  const ratio = (altitude - lowerLayer.altitude) / 
    (upperLayer.altitude - lowerLayer.altitude);
  return lowerLayer.temp + ratio * (upperLayer.temp - lowerLayer.temp);
}
