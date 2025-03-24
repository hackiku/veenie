// lib/core/math/random.ts
// Controlled randomness with seedable functions

// Seedable random number generator
export class SeededRandom {
  private seed: number;
  
  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }
  
  // Get next random value
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  // Get random number in range
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
  
  // Get random integer in range
  rangeInt(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }
}

// Export a default instance
export const random = new SeededRandom();
