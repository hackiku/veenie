<!-- src/lib/sims/venus/info/MathDisplay.svelte -->
<script lang="ts">
  import KaTeX from './KaTeX.svelte';
  
  // Props using runes
  let { 
    altitude = 50, // km
    temperature = 348, // K
    pressure = 1.07, // bar
    showEquations = true
  } = $props<{
    altitude?: number;
    temperature?: number;
    pressure?: number;
    showEquations?: boolean;
  }>();
  
  // Constants
  const g = 8.87; // Venus gravity, m/s²
  const R = 8.3145; // Universal gas constant, J/(mol·K)
  const M_CO2 = 0.044; // Molar mass of CO2, kg/mol
  
  // Calculate atmospheric density using ideal gas law (ρ = PM/RT)
  function calculateDensity(p: number, t: number): number {
    const pPa = p * 100000; // Convert bar to Pa
    return (pPa * M_CO2) / (R * t);
  }
  
  // Calculate scale height H = RT/Mg
  function calculateScaleHeight(t: number): number {
    return (R * t) / (M_CO2 * g);
  }
  
  // Calculate buoyancy force for a balloon
  function calculateBuoyancy(volume: number, gasDensity: number, atmDensity: number): number {
    return (atmDensity - gasDensity) * volume * g;
  }
  
  // Calculate escape velocity at a given altitude
  function calculateEscapeVelocity(alt: number): number {
    const G = 6.67430e-11; // Gravitational constant, m³/(kg·s²)
    const M = 4.867e24; // Venus mass, kg
    const R = 6051800; // Venus radius, m
    return Math.sqrt((2 * G * M) / (R + alt * 1000));
  }
  
  // Compute all values
  $effect(() => {
    const density = calculateDensity(pressure, temperature);
    const scaleHeight = calculateScaleHeight(temperature);
    const escapeVelocity = calculateEscapeVelocity(altitude);
    const buoyancyForce = calculateBuoyancy(1000, 0.18, density); // 1000 m³ hydrogen balloon
    
    return {
      density,
      scaleHeight,
      escapeVelocity,
      buoyancyForce
    };
  });
</script>

<div class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white">
  <h2 class="text-xl font-bold mb-3">Venus Calculations</h2>
  
  <!-- Atmospheric Density -->
  <div class="mb-4">
    <h3 class="text-sm font-bold mb-2">Atmospheric Density at {altitude} km</h3>
    <div class="p-3 bg-gray-800/80 rounded text-center">
      <div class="text-lg font-mono">{calculateDensity(pressure, temperature).toFixed(3)} kg/m³</div>
      
      {#if showEquations}
        <div class="text-xs mt-1 text-gray-400">
          Using Ideal Gas Law:
          <div class="mt-1 flex justify-center">
            <KaTeX math="\rho = \frac{PM}{RT}" displayMode={true} />
          </div>
          <div class="mt-1">
            where P = {pressure} bar, M = {M_CO2} kg/mol, R = {R} J/(mol·K), T = {temperature} K
          </div>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Scale Height -->
  <div class="mb-4">
    <h3 class="text-sm font-bold mb-2">Scale Height at {altitude} km</h3>
    <div class="p-3 bg-gray-800/80 rounded text-center">
      <div class="text-lg font-mono">{calculateScaleHeight(temperature).toFixed(1)} km</div>
      
      {#if showEquations}
        <div class="text-xs mt-1 text-gray-400">
          Using Scale Height equation:
          <div class="mt-1 flex justify-center">
            <KaTeX math="H = \frac{RT}{Mg}" displayMode={true} />
          </div>
          <div class="mt-1">
            where R = {R} J/(mol·K), T = {temperature} K, M = {M_CO2} kg/mol, g = {g} m/s²
          </div>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Buoyancy Calculations -->
  <div class="mb-4">
    <h3 class="text-sm font-bold mb-2">Buoyancy for 1000 m³ Hydrogen Balloon</h3>
    <div class="p-3 bg-gray-800/80 rounded text-center">
      <div class="text-lg font-mono">
        {calculateBuoyancy(1000, 0.18, calculateDensity(pressure, temperature)).toFixed(0)} N
      </div>
      
      {#if showEquations}
        <div class="text-xs mt-1 text-gray-400">
          Using Buoyancy equation:
          <div class="mt-1 flex justify-center">
            <KaTeX math="F_b = (\rho_{atm} - \rho_{gas}) \cdot V \cdot g" displayMode={true} />
          </div>
          <div class="mt-1">
            where ρ<sub>atm</sub> = {calculateDensity(pressure, temperature).toFixed(3)} kg/m³, 
            ρ<sub>gas</sub> = 0.18 kg/m³, V = 1000 m³, g = {g} m/s²
          </div>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Escape Velocity -->
  <div>
    <h3 class="text-sm font-bold mb-2">Escape Velocity at {altitude} km</h3>
    <div class="p-3 bg-gray-800/80 rounded text-center">
      <div class="text-lg font-mono">{calculateEscapeVelocity(altitude).toFixed(1)} m/s</div>
      
      {#if showEquations}
        <div class="text-xs mt-1 text-gray-400">
          Using Escape Velocity equation:
          <div class="mt-1 flex justify-center">
            <KaTeX math="v_e = \sqrt{\frac{2GM}{R+h}}" displayMode={true} />
          </div>
          <div class="mt-1">
            where G = 6.67×10<sup>-11</sup> m³/(kg·s²), M = 4.87×10<sup>24</sup> kg, 
            R = 6051.8 km, h = {altitude} km
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>