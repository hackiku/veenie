<!-- src/lib/sims/flight/FlightSim.svelte -->

<script>
  import { Canvas } from '@threlte/core';
  import { World, Debug } from '@threlte/rapier';
  import Scene from './scene/Scene.svelte';
</script>

<div class="relative w-full h-full">
  <Canvas>
    <World>
      <!-- Debug visualization for physics bodies -->
      <Debug />
      
      <Scene />
    </World>
  </Canvas>
  
  <!-- Key controls help -->
  <div class="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded">
    <h3 class="font-bold">Controls:</h3>
    <div>Arrow keys: Move ball</div>
    <div>Space: Jump</div>
    <div>Mouse drag: Move camera</div>
    <div>Mouse wheel: Zoom</div>
  </div>
</div>