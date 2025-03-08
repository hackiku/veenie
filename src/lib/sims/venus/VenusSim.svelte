<!-- src/lib/sims/venus/VenusSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import { onMount } from 'svelte';
  import VenusThrelte from './VenusThrelte.svelte';
  import VenusSpaceKit from './VenusSpaceKit.svelte';
  
  // Simulation state
  let showThrelte = $state(true);
  let showControls = $state(true);
  let habitatAltitude = $state(55); // km
  let buoyancyFactors = $state({
    surfaceDensity: 65, // kg/m³
    cloudDensity: 1.6,  // kg/m³
    habitatDensity: 1.4 // kg/m³
  });
  
  // Toggle between Threlte and SpaceKit
  function toggleEngine() {
    showThrelte = !showThrelte;
  }
  
  // Toggle control panel
  function toggleControls() {
    showControls = !showControls;
  }
  
  // Handle keyboard shortcuts
  function handleKeyDown(event) {
    if (event.key === 't' || event.key === 'T') {
      toggleEngine();
    } else if (event.key === 'c' || event.key === 'C') {
      toggleControls();
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  // Calculate if the habitat would float at the current altitude
  function calculateBuoyancy() {
    // Very simplified model
    const atmosphericDensity = buoyancyFactors.surfaceDensity * 
      Math.exp(-habitatAltitude / 15);
      
    // Buoyancy factor (>1 means it floats, <1 means it sinks)
    return atmosphericDensity / buoyancyFactors.habitatDensity;
  }
  
  $derived buoyancyFactor = calculateBuoyancy();
  $derived buoyancyStatus = buoyancyFactor > 1 ? 'Floating' : 'Sinking';
  $derived buoyancyClass = buoyancyFactor > 1 ? 'text-green-500' : 'text-red-500';
</script>

<div class="w-full h-full relative">
  <!-- Visualization container -->
  <div class="absolute inset-0">
    {#if showThrelte}
      <!-- Threlte Venus Scene -->
      <Canvas>
        <VenusThrelte {habitatAltitude} />
      </Canvas>
    {:else}
      <!-- SpaceKit Venus Scene -->
      <VenusSpaceKit />
    {/if}
  </div>
  
  <!-- Controls panel -->
  {#if showControls}
    <div class="absolute top-4 right-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white max-w-xs">
      <h2 class="text-xl font-bold mb-2">Venus Habitat Simulator</h2>
      <p class="text-sm text-gray-300 mb-4">
        LOX/CH4 Buoyancy Proof of Concept
      </p>
      
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">
          Habitat Altitude: {habitatAltitude} km
        </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="1" 
          bind:value={habitatAltitude}
          class="w-full"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">
          Habitat Density: {buoyancyFactors.habitatDensity.toFixed(2)} kg/m³
        </label>
        <input 
          type="range" 
          min="0.5" 
          max="3" 
          step="0.1" 
          bind:value={buoyancyFactors.habitatDensity}
          class="w-full"
        />
      </div>
      
      <div class="mb-4 p-2 bg-gray-900/50 rounded">
        <h3 class="font-medium mb-1">Buoyancy Status:</h3>
        <div class={`text-lg font-bold ${buoyancyClass}`}>
          {buoyancyStatus} (Factor: {buoyancyFactor.toFixed(2)})
        </div>
        <div class="text-xs text-gray-400 mt-1">
          {buoyancyFactor > 1 ? 'Habitat is less dense than atmosphere' : 'Habitat is more dense than atmosphere'}
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button 
          class="px-3 py-1 bg-purple-800 hover:bg-purple-700 rounded text-sm"
          on:click={toggleEngine}
        >
          Switch to {showThrelte ? 'SpaceKit' : 'Threlte'}
        </button>
        <button 
          class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          on:click={toggleControls}
        >
          Hide Controls
        </button>
      </div>
      
      <div class="text-xs mt-3 text-gray-400">
        Press <kbd class="px-1 bg-gray-800 rounded">T</kbd> to toggle renderer<br>
        Press <kbd class="px-1 bg-gray-800 rounded">C</kbd> to toggle controls
      </div>
    </div>
  {:else}
    <button 
      class="absolute top-4 right-4 px-3 py-1 bg-gray-800/50 hover:bg-gray-700/70 rounded text-white text-sm"
      on:click={toggleControls}
    >
      Show Controls
    </button>
  {/if}
  
  <!-- Info panel with habitat details -->
  <div class="absolute bottom-4 left-4 bg-black/80 p-4 rounded-md border border-blue-900/50 text-white max-w-md">
    <h3 class="text-lg font-bold mb-1">Venus Floating Habitat</h3>
    <p class="text-sm text-gray-300 mb-2">
      LOX/CH4 propellant bladders provide buoyancy in Venus's dense atmosphere.
    </p>
    
    <div class="bg-gray-900/50 p-2 rounded text-sm">
      <div class="flex justify-between mb-1">
        <span>Altitude:</span>
        <span>{habitatAltitude} km</span>
      </div>
      <div class="flex justify-between mb-1">
        <span>Atmospheric Density:</span>
        <span>{(buoyancyFactors.surfaceDensity * Math.exp(-habitatAltitude/15)).toFixed(2)} kg/m³</span>
      </div>
      <div class="flex justify-between mb-1">
        <span>Temperature:</span>
        <span>{(737 - habitatAltitude * 7.5).toFixed(0)} K</span>
      </div>
      <div class="flex justify-between">
        <span>Pressure:</span>
        <span>{(92 * Math.exp(-habitatAltitude/15.5)).toFixed(1)} bar</span>
      </div>
    </div>
  </div>
</div>