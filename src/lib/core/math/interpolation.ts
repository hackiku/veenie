// lib/core/math/interpolation.ts
// Interpolation functions for smooth transitions

// Linear interpolation
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Bilinear interpolation for 2D data
export function bilinear(x: number, y: number, q11: number, q12: number, q21: number, q22: number, 
                         x1: number, x2: number, y1: number, y2: number): number {
  const r1 = lerp(q11, q21, (x - x1) / (x2 - x1));
  const r2 = lerp(q12, q22, (x - x1) / (x2 - x1));
  return lerp(r1, r2, (y - y1) / (y2 - y1));
}

// Smooth step function
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
