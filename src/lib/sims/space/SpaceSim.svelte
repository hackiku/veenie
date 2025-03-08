<!-- src/lib/sims/space/SpaceSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // Import components
  import Scene from './Scene.svelte';
  import Time from './controls/Time.svelte';
  import Bodies from './controls/Bodies.svelte';
  
  // State using runes
  let simulationSpeed = $state(1);
  let focusedPlanet = $state('earth');
  let showControls = $state(true);
  let isLoading = $state(true);
  
  // Reference to Scene component
  let sceneRef = $state(null);
  
  // Toggle controls visibility
  function toggleControls() {
    showControls = !showControls;
  }
  
  // Set focus to a specific planet
  function focusOn(planet) {
    focusedPlanet = planet;
    sceneRef?.focusOnPlanet?.(planet);
  }
  
  // Update simulation speed
  function updateSpeed(newSpeed) {
    simulationSpeed = newSpeed;
    sceneRef?.setSimulationSpeed?.(newSpeed);
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
    isLoading = false;
    return () => window.removeEventListener('keydown', handleKeyDown);
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
  <!-- Threlte Canvas with our Scene -->
  <Canvas>
    <Scene 
      bind:this={sceneRef}
      initialFocus={focusedPlanet}
      simulationSpeed={simulationSpeed}
    />
  </Canvas>
  
  <!-- Loading indicator -->
  {#if isLoading}
    <div class="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
      <div class="text-center">
        <p class="text-xl mb-2">Loading Solar System</p>
        <div class="w-12 h-12 border-4 border-t-purple-500 border-b-purple-700 border-l-purple-600 border-r-purple-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  {/if}
  
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
      
      <button 
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm w-full"
        onclick={toggleControls}
      >
        Hide Controls
      </button>
      
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