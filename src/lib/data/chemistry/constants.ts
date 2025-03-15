// src/lib/data/chemistry/constants.ts

// Physical constants
export const PHYSICAL_CONSTANTS = {
	// Universal constants
	R: 8.31446,                 // Universal gas constant [J/(mol·K)]
	AVOGADRO: 6.02214076e23,    // Avogadro's number [1/mol]

	// Venus-specific constants
	VENUS_GRAVITY: 8.87,         // Surface gravity [m/s²]
	VENUS_RADIUS: 6051.8,        // Mean radius [km]
	VENUS_MASS: 4.8675e24,       // Planet mass [kg]
	VENUS_DAY: 243.025 * 24,     // Sidereal day [hours]
	VENUS_YEAR: 224.7,           // Orbital period [Earth days]
	VENUS_SURFACE_PRESSURE: 92,  // Surface atmospheric pressure [bar]
	VENUS_SURFACE_TEMP: 735,     // Surface temperature [K]
};

// ISRU (In-Situ Resource Utilization) constants
export const ISRU_CONSTANTS = {
	// Energy requirements for various processes (kWh/kg)
	CO2_CAPTURE_ENERGY: 0.3,     // Energy needed to capture 1kg of CO2
	H2O_EXTRACTION_ENERGY: 0.5,  // Energy needed to extract 1kg of water
	ELECTROLYSIS_ENERGY: 4.2,    // Energy needed to electrolyze 1kg of water
	SABATIER_ENERGY: 2.1,        // Energy for Sabatier reaction per kg of CH4

	// Process efficiencies (theoretical max = 1.0)
	CO2_CAPTURE_EFFICIENCY: 0.85,
	H2O_EXTRACTION_EFFICIENCY: 0.75,
	ELECTROLYSIS_EFFICIENCY: 0.7,
	SABATIER_EFFICIENCY: 0.9,

	// Mass ratios
	O2_TO_H2O_RATIO: 8 / 9,        // Mass of O2 produced from 1 mass unit of H2O
	CH4_TO_CO2_RATIO: 16 / 44,     // Mass of CH4 produced from 1 mass unit of CO2

	// Equipment specifications
	SOLAR_PANEL_EFFICIENCY: 0.3, // Solar panel efficiency 
	PANELS_PER_KW: 5,            // Number of panels needed per kW at 1 AU
	VENUS_SOLAR_FLUX: 2600,      // Solar energy at Venus [W/m²]
};

// Altitude zones with special significance
export const ALTITUDE = {
	SURFACE: 0,                  // Surface [km]
	LOWER_HAZE: 15,              // Lower haze layer [km]
	LOWER_CLOUD: 48,             // Lower cloud boundary [km]
	HABITABLE_MIN: 50,           // Lower boundary of "habitable" zone [km]
	HABITABLE_MAX: 60,           // Upper boundary of "habitable" zone [km]
	UPPER_CLOUD: 65,             // Upper cloud boundary [km]
	TOP_OF_ATMOSPHERE: 100,      // Top of significant atmosphere [km]
};

// Chemical reactions for ISRU processes
export const CHEMICAL_REACTIONS = {
	// Water electrolysis
	WATER_ELECTROLYSIS: {
		equation: "2 H2O → 2 H2 + O2",
		enthalpy: 286,              // kJ/mol
		inputs: { "H2O": 2 },
		outputs: { "H2": 2, "O2": 1 }
	},

	// Sabatier reaction (methanation)
	SABATIER: {
		equation: "CO2 + 4 H2 → CH4 + 2 H2O",
		enthalpy: -165,             // kJ/mol (exothermic)
		inputs: { "CO2": 1, "H2": 4 },
		outputs: { "CH4": 1, "H2O": 2 }
	},

	// Water-gas shift reaction
	WATER_GAS_SHIFT: {
		equation: "CO + H2O → CO2 + H2",
		enthalpy: -41,              // kJ/mol (exothermic)
		inputs: { "CO": 1, "H2O": 1 },
		outputs: { "CO2": 1, "H2": 1 }
	},

	// Sulfuric acid decomposition
	SULFURIC_ACID_DECOMP: {
		equation: "H2SO4 → H2O + SO3",
		enthalpy: 87,               // kJ/mol
		inputs: { "H2SO4": 1 },
		outputs: { "H2O": 1, "SO3": 1 }
	},

	// Sulfur trioxide decomposition
	SULFUR_TRIOXIDE_DECOMP: {
		equation: "SO3 → SO2 + 1/2 O2",
		enthalpy: 99,               // kJ/mol
		inputs: { "SO3": 1 },
		outputs: { "SO2": 1, "O2": 0.5 }
	}
};

// Venus atmospheric entry data for ISRU platforms
export const CHEMISTRY_SYSTEM = {
	// System defaults
	DEFAULT_ALTITUDE: 55,         // Default simulation altitude [km]
	MIN_ALTITUDE: 0,              // Minimum simulation altitude [km]
	MAX_ALTITUDE: 100,            // Maximum simulation altitude [km]

	// Visual settings
	PROCESS_PLANT_COLOR: "#66cccc",
	SOLAR_PANEL_COLOR: "#2244aa",
	STORAGE_TANK_COLOR: "#66cc66",

	// Production rates
	BASE_CO2_CAPTURE_RATE: 20,    // Base CO2 capture rate [kg/hr]
	BASE_H2O_EXTRACTION_RATE: 5,  // Base water extraction rate [kg/hr]
	BASE_O2_PRODUCTION_RATE: 15,  // Base oxygen production rate [kg/hr]
	BASE_CH4_PRODUCTION_RATE: 3,  // Base methane production rate [kg/hr]

	// System efficiencies
	OVERALL_EFFICIENCY: 0.6,      // Overall system efficiency
};

// Venus data bundle for export
export const venusData = {
	physical: PHYSICAL_CONSTANTS,
	isru: ISRU_CONSTANTS,
	altitude: ALTITUDE,
	reactions: CHEMICAL_REACTIONS,
	chemistry: CHEMISTRY_SYSTEM
};