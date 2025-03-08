<!-- src/lib/sims/space/Space.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import TimeControls from './controls/TimeControls.svelte';
  import BodiesControls from './controls/BodiesControls.svelte';
  
  // State
  let simulationSpeed = $state(1);
  let focusedPlanet = $state('earth');
  let showControls = $state(true);
  let sceneRef = $state(null);
  
  // Methods
  function toggleControls() {
    showControls = !showControls;
  }
  
  function handleFocusChange(planet) {
    focusedPlanet = planet;
    sceneRef?.focusOnPlanet?.(planet);
  }
  
  function handleSpeedChange(speed) {
    simulationSpeed = speed;
    sceneRef?.setSimulationSpeed?.(speed);
  }
  
  // Keyboard handlers
  function handleKeydown(event) {
    if (event.key === 'c' || event.key === 'C') {
      toggleControls();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full h-full">
  <!-- Threlte Canvas with Scene -->
  <Canvas>
    <Scene 
      bind:this={sceneRef}
      initialFocus={focusedPlanet}
      simulationSpeed={simulationSpeed}
    />
  </Canvas>
  
  <!-- Controls Panel -->
  {#if showControls}
    <div class="absolute top-4 right-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white max-w-xs z-10">
      <h2 class="text-xl font-bold mb-2">Solar System</h2>
      
      <TimeControls 
        speed={simulationSpeed} 
        onSpeedChange={handleSpeedChange} 
      />
      
      <BodiesControls
        focusedPlanet={focusedPlanet}
        onFocusChange={handleFocusChange}
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