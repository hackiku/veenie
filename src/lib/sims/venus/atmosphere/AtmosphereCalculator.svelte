<!-- src/lib/sims/venus/atmosphere/AtmosphereCalculator.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    getTemperatureAtAltitude, 
    getPressureAtAltitude, 
    getWindSpeedAtAltitude,
    calculateBuoyancy
  } from '../data/atmosphere';
  
  // Props using runes
  let {
    showBuoyancyCalculator = true
  } = $props<{
    showBuoyancyCalculator?: boolean;
  }>();
  
  // State
  let altitude = $state(50); // km
  let temperature = $state(0); // K
  let pressureBar = $state(0); // bar
  let windSpeed = $state(0); // m/s
  
  // Balloon buoyancy calculator
  let balloonVolume = $state(1000); // m³
  let balloonMass = $state(400); // kg
  let gasDensity = $state(0.18); // kg/m³ (approximate for H2)
  let buoyancyForce = $state(0); // N
  let isFloating = $state(false);
  
  // Update calculations when altitude changes
  $effect(() => {
    updateCalculations();
  });
  
  function updateCalculations() {
    temperature = getTemperatureAtAltitude(altitude);
    pressureBar = getPressureAtAltitude(altitude);
    windSpeed = getWindSpeedAtAltitude(altitude);
    
    // Calculate buoyancy
    buoyancyForce = calculateBuoyancy(altitude, balloonVolume, balloonMass, gasDensity);
    isFloating = buoyancyForce > 0;
  }
  
  function handleAltitudeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    altitude = parseFloat(target.value);
  }
  
  function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    balloonVolume = parseFloat(target.value);
    updateCalculations();
  }
  
  function handleMassChange(event: Event) {
    const target = event.target as HTMLInputElement;
    balloonMass = parseFloat(target.value);
    updateCalculations();
  }
  
  function handleGasDensityChange(event: Event) {
    const target = event.target as HTMLInputElement;
    gasDensity = parseFloat(target.value);
    updateCalculations();
  }
  
  // Gas type options
  const gasOptions = [
    { name: 'Hydrogen (H₂)', density: 0.18 },
    { name: 'Helium (He)', density: 0.33 },
    { name: 'Nitrogen (N₂)', density: 2.33 },
    { name: 'Oxygen (O₂)', density: 2.66 },
    { name: 'Earth Air', density: 2.5 }
  ];
  
  function selectGas(density: number) {
    gasDensity = density;
    updateCalculations();
  }
  
  onMount(() => {
    updateCalculations();
  });
</script>

<div class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white">
  <h2 class="text-lg font-bold mb-3">Venus Atmosphere Calculator</h2>
  
  <!-- Altitude slider -->
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">
      Altitude: {altitude.toFixed(1)} km
    </label>
    <input 
      type="range" 
      min="0" 
      max="200" 
      step="0.5" 
      value={altitude}
      on:input={handleAltitudeChange}
      class="w-full"
    />
  </div>
  
  <!-- Atmospheric conditions -->
  <div class="grid grid-cols-3 gap-2 mb-4 text-center">
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Temperature</div>
      <div class="font-bold">{temperature.toFixed(1)} K</div>
      <div class="text-xs">{(temperature - 273.15).toFixed(1)} °C</div>
    </div>
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Pressure</div>
      <div class="font-bold">{pressureBar.toFixed(3)} bar</div>
      <div class="text-xs">{(pressureBar * 1000).toFixed(0)} kPa</div>
    </div>
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Wind Speed</div>
      <div class="font-bold">{windSpeed.toFixed(1)} m/s</div>
      <div class="text-xs">{(win