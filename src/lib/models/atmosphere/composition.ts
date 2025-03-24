// lib/models/atmosphere/composition.ts
// Atmospheric composition at different altitudes

// Base composition at surface level (%)
export const SURFACE_COMPOSITION = {
  co2: 96.5,
  n2: 3.5,
  so2: 0.015,
  h2o: 0.002,
  co: 0.0017,
  he: 0.0012,
  ne: 0.0007,
  hcl: 0.0001,
  hf: 0.00001
};

// Get composition at a specific altitude
export function getCompositionAtAltitude(altitude: number): Record<string, number> {
  // For MVP, return fixed composition with minor variations
  // In future versions, implement proper altitude-dependent composition model
  return { ...SURFACE_COMPOSITION };
}
