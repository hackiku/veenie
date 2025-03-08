<!-- src/lib/sims/space/SpaceSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import { onMount, onDestroy } from 'svelte';
  
  // Import components
  import SpaceKitSim from './SpaceKitSim.svelte';
  import Time from './controls/Time.svelte';
  import Bodies from './controls/Bodies.svelte';
  
  // State using runes
  let simulationSpeed = $state(1); // Days per second
  let focusedPlanet = $state('earth');
  let showControls = $state(true);
  
  // References to components
  let spaceKitRef = $state(null);
  
  // Toggle controls visibility
  function toggleControls() {
    showControls = !showControls;
  }
  
  // Set focus to a specific planet
  function focusOn(planet) {
    focusedPlanet = planet;
    if (spaceKitRef) {
      spaceKitRef.focusOnPlanet(planet);
    }
  }
  
  // Update simulation speed
  function updateSpeed(newSpeed) {
    simulationSpeed = newSpeed;
    if (spaceKitRef) {
      spaceKitRef.setSimulationSpeed(newSpeed);
    }
  }
  
  // Handle keyboard shortcuts
  function handleKeyDown(event) {
    if (event.key === 'c' || event.key === 'C') {
      toggleControls();
    } else if (event.key === 'ArrowUp') {
      updateSpeed(simulationSpeed * 2);
    } else if (event.key === 'ArrowDown') {
      updateSpeed(simulationSpeed / 2);
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  // Planet list for navigation
  const planets = [
    { id: 'sun', name: 'Sun', color: '#FFCC00' },
    { id: 'mercury', name: 'Mercury', color: '#BBB' },
    { id: 'venus', name: 'Venus', color: '#E7CDCD' },
    { id: 'earth', name: 'Earth', color: '#3399FF' },
    { id: 'mars', name: 'Mars', color: '#FF5533' },
    { id: 'jupiter', name: 'Jupiter', color: '#FFAA66' },
    { id: 'saturn', name: 'Saturn', color: '#EECC66' },
    { id: 'uranus', name: 'Uranus', color: '#AAEEFF' },
    { id: 'neptune', name: 'Neptune', color: '#6688FF' }
  ];
</script>

<div class="relative w-full h-full">
  <!-- Visualization container -->
  <div class="absolute inset-0">
    <SpaceKitSim 
      bind:this={spaceKitRef}
      initialFocus={focusedPlanet}
      simulationSpeed={simulationSpeed}
      showOrbits={true}
    />
  </div>
  

  <!-- Controls panel -->
  {#if showControls}
    <div class="absolute top-4 right-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white max-w-xs z-10">
      <h2 class="text-xl font-bold mb-2">Solar System Simulation</h2>
      
      <!-- Time controls component -->
      <Time 
        speed={simulationSpeed} 
        onSpeedChange={updateSpeed}
      />
      
      <!-- Bodies selection component -->
      <Bodies
        planets={planets}
        focusedPlanet={focusedPlanet}
        onFocusChange={focusOn}
      />
      
      <div class="flex space-x-2">
        <button 
          class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          onclick={toggleControls}
        >
          Hide Controls
        </button>
      </div>
      
      <div class="text-xs mt-3 text-gray-400">
        Press <kbd class="px-1 bg-gray-800 rounded">C</kbd> to toggle controls
      </div>
    </div>
  {:else}
    <button 
      class="absolute top-4 right-4 px-3 py-1 bg-gray-800/50 hover:bg-gray-700/70 rounded text-white text-sm z-10"
      onclick={toggleControls}
    >
      Show Controls
    </button>
  {/if}
  
  <!-- Info panel -->
  <div class="absolute bottom-4 left-4 bg-black/80 p-4 rounded-md border border-blue-900/50 text-white max-w-md z-10">
    <h3 class="text-lg font-bold mb-1">Solar System Explorer</h3>
    <p class="text-sm text-gray-300 mb-2">
      Interactive visualization of our solar system with accurate orbital mechanics.
    </p>
    
    <div class="text-xs text-gray-400">
      Currently viewing: <span class="font-medium text-white">{planets.find(p => p.id === focusedPlanet)?.name || 'Solar System'}</span>
      <div class="mt-1">
        Speed: <span class="font-medium text-white">{simulationSpeed.toFixed(1)} days/second</span>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: black;
  }
</style>