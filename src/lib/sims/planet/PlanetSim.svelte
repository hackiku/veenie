<!-- src/lib/sims/planet/PlanetSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import Scene from './scene/Scene.svelte';
  import Player from './scene/Player.svelte';
  import { setContext } from 'svelte';
  
  // Core state using runes
  let showAtmosphere = $state(true);
  let currentScale = $state('planet'); // 'space' | 'planet' | 'atmosphere'
  let showControls = $state(true);
  
  // Functions for context
  function toggleAtmosphere() {
    showAtmosphere = !showAtmosphere;
  }
  
  function setScale(scale) {
    currentScale = scale;
  }
  
  function toggleControls() {
    showControls = !showControls;
  }
  
  // Set up the context for child components
  setContext('planetContext', {
    getScale: () => currentScale,
    getShowAtmosphere: () => showAtmosphere,
    toggleAtmosphere,
    setScale,
    toggleControls
  });
  
  // Handle keyboard shortcuts
  function handleKeydown(event) {
    if (event.key === "c" || event.key === "C") {
      toggleControls();
    }
    
    if (event.key === "a" || event.key === "A") {
      toggleAtmosphere();
    }
    
    if (event.key === "1") setScale('space');
    if (event.key === "2") setScale('planet');
    if (event.key === "3") setScale('atmosphere');
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full h-full">
  <Canvas>
    <Scene 
      scale={currentScale}
      showAtmosphere={showAtmosphere}
    />
  </Canvas>
  
  <!-- Controls Panel -->
  {#if showControls}
    <div class="absolute top-4 right-4 bg-black/80 p-4 rounded-md border border-orange-900/50 text-white max-w-xs z-10">
      <h2 class="text-xl font-bold mb-2">Venus Simulation</h2>
      
      <!-- Scale Selection -->
      <div class="mb-4">
        <div class="text-sm font-medium mb-2">View Scale:</div>
        <div class="grid grid-cols-3 gap-2">
          <button 
            class="px-2 py-1 rounded text-xs {currentScale === 'space' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
            onclick={() => setScale('space')}
          >
            Space
          </button>
          <button 
            class="px-2 py-1 rounded text-xs {currentScale === 'planet' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
            onclick={() => setScale('planet')}
          >
            Planet
          </button>
          <button 
            class="px-2 py-1 rounded text-xs {currentScale === 'atmosphere' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
            onclick={() => setScale('atmosphere')}
          >
            Atmosphere
          </button>
        </div>
      </div>
      
      <!-- Atmosphere Toggle -->
      <div class="mb-4">
        <div class="text-sm font-medium mb-2">Atmosphere:</div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showAtmosphere}
              onchange={toggleAtmosphere}
              class="sr-only peer"
            />
            <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            <span class="ml-3 text-sm font-medium">Show Atmosphere</span>
          </label>
        </div>
      </div>
      
      <button
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm w-full"
        onclick={toggleControls}
      >
        Hide Controls
      </button>
    </div>
  {:else}
    <button
      class="absolute top-4 right-4 px-3 py-1 bg-gray-800/50 hover:bg-gray-700/70 rounded text-white text-sm z-10"
      onclick={toggleControls}
    >
      Show Controls
    </button>
  {/if}
  
  <!-- Time controls -->
  <Player />
</div>