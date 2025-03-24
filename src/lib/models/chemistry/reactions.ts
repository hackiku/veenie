// lib/models/chemistry/reactions.ts
// Chemical reaction definitions

import { Compound, COMPOUNDS } from './compounds';

export type Reaction = {
  id: string;
  name: string;
  reactants: Array<{compound: Compound, coefficient: number}>;
  products: Array<{compound: Compound, coefficient: number}>;
  enthalpy: number;   // kJ/mol - negative for exothermic
  activationEnergy: number; // kJ/mol
  rateConstant: number;
  temperatureDependent: boolean;
  catalysts?: Array<Compound>;
};

// Key reactions for methalox production on Venus
export const METHALOX_REACTIONS: Record<string, Reaction> = {
  // CO2 + 4H2 → CH4 + 2H2O (Sabatier reaction)
  sabatier: {
    id: 'sabatier',
    name: 'Sabatier Reaction',
    reactants: [
      { compound: COMPOUNDS.co2, coefficient: 1 },
      { compound: COMPOUNDS.h2, coefficient: 4 }
    ],
    products: [
      { compound: COMPOUNDS.ch4, coefficient: 1 },
      { compound: COMPOUNDS.h2o, coefficient: 2 }
    ],
    enthalpy: -165, // kJ/mol - exothermic
    activationEnergy: 70,
    rateConstant: 0.01,
    temperatureDependent: true,
    catalysts: [] // Would include nickel or ruthenium catalysts
  },
  
  // CO2 + H2 → CO + H2O (Reverse Water-Gas Shift)
  rwgs: {
    id: 'rwgs',
    name: 'Reverse Water-Gas Shift',
    reactants: [
      { compound: COMPOUNDS.co2, coefficient: 1 },
      { compound: COMPOUNDS.h2, coefficient: 1 }
    ],
    products: [
      // CO would be defined in COMPOUNDS
      { compound: COMPOUNDS.h2o, coefficient: 1 }
    ],
    enthalpy: 41, // kJ/mol - endothermic
    activationEnergy: 55,
    rateConstant: 0.005,
    temperatureDependent: true,
    catalysts: [] // Would include copper-based catalysts
  },
  
  // 2H2O → 2H2 + O2 (Water Electrolysis)
  electrolysis: {
    id: 'electrolysis',
    name: 'Water Electrolysis',
    reactants: [
      { compound: COMPOUNDS.h2o, coefficient: 2 }
    ],
    products: [
      { compound: COMPOUNDS.h2, coefficient: 2 },
      { compound: COMPOUNDS.o2, coefficient: 1 }
    ],
    enthalpy: 286, // kJ/mol - endothermic
    activationEnergy: 0, // Electrolysis doesn't have conventional activation energy
    rateConstant: 1,
    temperatureDependent: false,
    catalysts: [] // Would include platinum or iridium catalysts
  }
};

// Calculate reaction rate
export function calculateReactionRate(
  reaction: Reaction,
  reactantConcentrations: Record<string, number>,
  temperature: number,
  catalysts: Array<Compound> = []
): number {
  // Implement Arrhenius equation k = A*e^(-Ea/RT)
  // For MVP, return a simplified calculation
  return 0.01; // mol/(L·s)
}
