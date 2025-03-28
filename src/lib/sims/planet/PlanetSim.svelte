<!-- src/lib/sims/venus/VenusSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from "./Scene.svelte";
  import { venusStore } from "$lib/stores/venusStore";
  
  // State - maintained for backward compatibility
  let simulationSpeed = $state(1);
  let showControls = $state(true);
  let showAtmosphere = $state(true);
  let currentScale = $state('planet');  // New scale state
  let sceneRef: any;
  
  // Subscribe to store
  const unsubscribe = venusStore.subscribe(state => {
    simulationSpeed = state.time.simulationSpeed;
    showAtmosphere = state.showAtmosphere;
    currentScale = state.scale.target;
  });
  
  // Clean up subscription
  $effect(() => {
    return () => {
      unsubscribe();
    };
  });
  
  // Methods
  function toggleControls() {
    showControls = !showControls;
  }
  
  function handleSpeedChange(speed: number) {
    simulationSpeed = speed;
    venusStore.setSpeed(speed);
    
    if (sceneRef?.setSimulationSpeed) {
      console.log(`VenusSim: setting speed to ${speed}`);
      sceneRef.setSimulationSpeed(speed);
    }
  }
  
  function toggleAtmosphere() {
    showAtmosphere = !showAtmosphere;
    venusStore.toggleAtmosphere();
  }
  
  function setScale(scale: 'space' | 'planet' | 'atmosphere') {
    venusStore.setScale(scale);
  }
  
  // Keyboard event handler
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "c" || event.key === "C") {
      toggleControls();
    }
    
    // Speed controls with arrow keys
    if (event.key === "ArrowUp") {
      handleSpeedChange(simulationSpeed * 2);
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      handleSpeedChange(Math.max(0.1, simulationSpeed / 2));
      event.preventDefault();
    }
    
    // Toggle atmosphere with 'a' key
    if (event.key === "a" || event.key === "A") {
      toggleAtmosphere();
      event.preventDefault();
    }
    
    // Scale switching shortcuts
    if (event.key === "1") {
      setScale('space');
      event.preventDefault();
    } else if (event.key === "2") {
      setScale('planet');
      event.preventDefault();
    } else if (event.key === "3") {
      setScale('atmosphere');
      event.preventDefault();
    }
  }
  
  // Initialize component
  $effect(() => {
    console.log("VenusSim component initialized");
  });
</script>

<!-- Rest of the file remains the same -->

<svelte:window onkeydown={handleKeydown} />


<div class="relative w-full h-full">
  <Canvas>
    <!-- Scene component -->
    <Scene 
      bind:this={sceneRef} 
      {simulationSpeed}
      {showAtmosphere}
      scale={currentScale}
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
      
      <div class="text-xs mt-3 text-gray-400">
        <div>Press <kbd class="px-1 bg-gray-800 rounded">C</kbd> to toggle controls</div>
        <div>Press <kbd class="px-1 bg-gray-800 rounded">A</kbd> to toggle atmosphere</div>
        <div>Press <kbd class="px-1 bg-gray-800 rounded">1-3</kbd> to change scale</div>
        <div>Use <kbd class="px-1 bg-gray-800 rounded">↑/↓</kbd> to adjust speed</div>
        <div class="mt-1">Mouse controls:</div>
        <div>• Left-click + drag to rotate</div>
        <div>• Right-click + drag to pan</div>
        <div>• Scroll to zoom</div>
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