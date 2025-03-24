// lib/models/economics/resources.ts
// Resource definitions and properties

export type Resource = {
  id: string;
  name: string;
  units: string;
  density?: number;  // kg/m³ if applicable
  energyContent?: number; // MJ/kg if applicable
  storageType: 'mass' | 'volume' | 'energy' | 'count';
  storageRequirements?: {
    temperature?: number;  // K
    pressure?: number;     // bar
    special?: string;      // Additional requirements
  };
};

// Resources for Venus ISRU
export const RESOURCES: Record<string, Resource> = {
  co2: {
    id: 'co2',
    name: 'Carbon Dioxide',
    units: 'kg',
    density: 1.98,  // at STP
    storageType: 'mass',
    storageRequirements: {
      temperature: 293,  // K (20°C)
      pressure: 1,       // bar
    }
  },
  h2o: {
    id: 'h2o',
    name: 'Water',
    units: 'kg',
    density: 1000,
    energyContent: 0,
    storageType: 'mass',
    storageRequirements: {
      temperature: 293,  // K (20°C)
      pressure: 1,       // bar
    }
  },
  ch4: {
    id: 'ch4',
    name: 'Methane',
    units: 'kg',
    density: 0.657,
    energyContent: 55.5, // MJ/kg
    storageType: 'mass',
    storageRequirements: {
      temperature: 111,  // K (-162°C) - liquefaction
      pressure: 1,       // bar
      special: 'Cryogenic storage'
    }
  },
};
