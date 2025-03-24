// lib/models/chemistry/methalox.svelte.ts
// Reactive chemistry model for methalox production

import { COMPOUNDS } from './compounds';
import { METHALOX_REACTIONS, calculateReactionRate } from './reactions';
import { simulateReaction } from './kinetics';

// Reactive state for the chemical system
let $state reactionState = {
  // Resource inventory (mol)
  inventory: {
    co2: 1000,
    h2: 0,
    h2o: 10,
    ch4: 0,
    o2: 0
  },
  
  // Reaction parameters
  temperature: 500, // K
  pressure: 10,     // bar
  catalysts: [],
  
  // Reaction efficiency (0-1)
  efficiency: {
    sabatier: 0.95,
    rwgs: 0.85,
    electrolysis: 0.70
  },
  
  // Energy consumption (MJ)
  energyConsumed: 0,
  
  // Production stats (mol/hour)
  productionRate: {
    ch4: 0,
    o2: 0
  }
};

// Functions to perform reactions
function performSabatierReaction(amount: number) {
  // Check if we have enough reactants
  const neededCO2 = amount;
  const neededH2 = amount * 4;
  
  if (reactionState.inventory.co2 >= neededCO2 && 
      reactionState.inventory.h2 >= neededH2) {
    
    // Calculate actual production with efficiency
    const efficiency = reactionState.efficiency.sabatier;
    const actualProduced = amount * efficiency;
    
    // Update inventory
    reactionState.inventory.co2 -= neededCO2;
    reactionState.inventory.h2 -= neededH2;
    reactionState.inventory.ch4 += actualProduced;
    reactionState.inventory.h2o += actualProduced * 2;
    
    // Update energy - Sabatier is exothermic, so we generate energy
    reactionState.energyConsumed -= 0.165 * actualProduced; // MJ
    
    return actualProduced;
  }
  
  return 0;
}

function performElectrolysis(amount: number, energyAvailable: number) {
  // Check if we have enough water and energy
  const neededH2O = amount;
  const neededEnergy = amount * 0.286; // MJ
  
  if (reactionState.inventory.h2o >= neededH2O && 
      energyAvailable >= neededEnergy) {
    
    // Calculate actual production with efficiency
    const efficiency = reactionState.efficiency.electrolysis;
    const actualProduced = amount * efficiency;
    
    // Update inventory
    reactionState.inventory.h2o -= neededH2O;
    reactionState.inventory.h2 += actualProduced * 2;
    reactionState.inventory.o2 += actualProduced;
    
    // Update energy - Electrolysis consumes energy
    reactionState.energyConsumed += neededEnergy;
    
    return actualProduced;
  }
  
  return 0;
}

// Reactive functions for the chemical system
let $derived optimalRatio = () => {
  // For methalox rocket engines, optimal O2:CH4 ratio is typically 3.5:1
  return 3.5;
};

let $derived currentRatio = () => {
  if (reactionState.inventory.ch4 === 0) return 0;
  return reactionState.inventory.o2 / reactionState.inventory.ch4;
};

let $derived totalPropellant = () => {
  return reactionState.inventory.ch4 + reactionState.inventory.o2;
};

// Export the reactive chemical system
export {
  reactionState,
  performSabatierReaction,
  performElectrolysis,
  optimalRatio,
  currentRatio,
  totalPropellant
};
