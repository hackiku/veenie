<!-- src/lib/sims/flight/FlightSim.svelte -->

<script>
  import { Canvas } from '@threlte/core';
  import { World, Debug } from '@threlte/rapier';
  import Scene from './scene/Scene.svelte';
  import Controls from './scene/Controls.svelte';
  import { flightStore } from '$lib/stores/flightStore';
  
  // Subscribe to flight store for play/pause using runes
  const playing = $derived(flightStore.playing);
  
  // Toggle play/pause
  function togglePlayPause() {
    flightStore.togglePlay();
  }
</script>

<div class="relative w-full h-full">
  <Canvas>
    <!-- Use a fixed framerate for deterministic physics -->
    <World framerate={60}>
      <!-- Debug visualization for physics bodies (disabled in production) -->
      {#if false}
        <Debug />
      {/if}
      
      <!-- Main simulation scene -->
      <Scene />
    </World>
  </Canvas>  
  
  <!-- Play/Pause Controls -->
  <div class="absolute top-4 right-4 bg-black/50 text-white p-2 rounded">
    <button 
      class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
      onclick={togglePlayPause}
    >
      {playing ? '⏸ Pause' : '▶ Play'}
    </button>
  </div>
  
  <!-- Load the keyboard controls -->
  <Controls />
</div>