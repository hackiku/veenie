<!-- src/lib/sims/flight/FlightSim.svelte -->

<script>
  import { Canvas } from '@threlte/core';
  import { World, Debug } from '@threlte/rapier';
  import Scene from './scene/Scene.svelte';
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
    <World framerate={200}>
      <!-- Debug visualization for physics bodies -->
      <Debug />
      
      <!-- Move OrbitControls to Scene component to be child of camera -->
      <Scene />
    </World>
  </Canvas>
  
  <!-- Play/Pause Controls -->
  <div class="absolute top-4 right-4 bg-black/50 text-white p-2 rounded">
    <button 
      class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
      onclick={togglePlayPause}
    >
      {$playing ? '⏸ Pause' : '▶ Play'}
    </button>
  </div>
  
  <!-- Key controls help -->
  <div class="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded">
    <h3 class="font-bold">Controls:</h3>
    <div>Arrow keys: Move ball</div>
    <div>Space: Jump</div>
    <div>Mouse drag: Orbit camera</div>
    <div>Mouse wheel: Zoom</div>
  </div>
</div>