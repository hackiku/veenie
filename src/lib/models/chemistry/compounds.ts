// lib/models/chemistry/compounds.ts
// Chemical compound properties

export type Compound = {
  id: string;
  name: string;
  formula: string;
  molarMass: number;  // g/mol
  state: 'gas' | 'liquid' | 'solid';
  density?: number;   // kg/m³
  boilingPoint?: number; // K
  meltingPoint?: number; // K
  specificHeat?: number; // J/(kg·K)
};

// Database of compounds relevant to Venus and ISRU
export const COMPOUNDS: Record<string, Compound> = {
  co2: {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    molarMass: 44.01,
    state: 'gas',
    density: 1.98, // at STP
    boilingPoint: 194.7,
    specificHeat: 0.844
  },
  n2: {
    id: 'n2',
    name: 'Nitrogen',
    formula: 'N₂',
    molarMass: 28.014,
    state: 'gas',
    density: 1.25, // at STP
    boilingPoint: 77.4,
    specificHeat: 1.04
  },
  h2o: {
    id: 'h2o',
    name: 'Water',
    formula: 'H₂O',
    molarMass: 18.015,
    state: 'liquid',
    density: 1000,
    boilingPoint: 373.15,
    meltingPoint: 273.15,
    specificHeat: 4.186
  },
  ch4: {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    molarMass: 16.043,
    state: 'gas',
    density: 0.657, // at STP
    boilingPoint: 111.65,
    specificHeat: 2.22
  },
  o2: {
    id: 'o2',
    name: 'Oxygen',
    formula: 'O₂',
    molarMass: 31.998,
    state: 'gas',
    density: 1.429, // at STP
    boilingPoint: 90.2,
    specificHeat: 0.918
  },
  h2: {
    id: 'h2',
    name: 'Hydrogen',
    formula: 'H₂',
    molarMass: 2.016,
    state: 'gas',
    density: 0.09, // at STP
    boilingPoint: 20.28,
    specificHeat: 14.3
  },
  // Add other compounds relevant to methalox production
};
