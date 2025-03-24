// lib/models/chemistry/kinetics.ts
// Reaction rate calculations

import { Reaction } from './reactions';
import { Compound } from './compounds';

// Constants
const R = 8.31446; // Gas constant in J/(mol·K)

// Calculate reaction rate using Arrhenius equation
export function arrhenius(
  preExponentialFactor: number,
  activationEnergy: number,
  temperature: number
): number {
  return preExponentialFactor * Math.exp(-activationEnergy * 1000 / (R * temperature));
}

// Calculate equilibrium constant
export function equilibriumConstant(
  reaction: Reaction,
  temperature: number
): number {
  // Use van't Hoff equation - simplified for MVP
  // ln(K2/K1) = (ΔH/R)*(1/T1 - 1/T2)
  
  // For MVP, return a placeholder value
  return 1.0;
}

// Simulate reaction progress over time
export function simulateReaction(
  reaction: Reaction,
  initialConcentrations: Record<string, number>,
  temperature: number,
  pressure: number,
  timestep: number,
  duration: number
): Array<Record<string, number>> {
  // For MVP, implement a simplified reaction simulation
  const results: Array<Record<string, number>> = [];
  
  // Starting point is initial concentrations
  results.push({...initialConcentrations});
  
  // For each timestep
  for (let t = timestep; t <= duration; t += timestep) {
    // Get previous state
    const prevState = results[results.length - 1];
    
    // Calculate reaction rate
    const k = arrhenius(
      reaction.rateConstant,
      reaction.activationEnergy,
      temperature
    );
    
    // Apply reaction rate to update concentrations
    // This is a very simplified model - would need proper
    // differential equations for accurate simulation
    const nextState = {...prevState};
    
    results.push(nextState);
  }
  
  return results;
}
