<!-- src/lib/sims/flight/FlightSim.svelte -->

<script>
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import { Play, Pause } from 'lucide-svelte';
	import Scene from './scene/Scene.svelte';
  import Controls from './controls/Controls.svelte';
  import FlightDashboard from './ui/FlightDashboard.svelte';
  
	import { flightStore } from '$lib/stores/flightStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { onDestroy } from 'svelte';
  import { venusData } from './physics/data';
  
  // Debug mode toggle
  let showDebug = $state(false);
  
  // World settings
  const worldSettings = $state({
    framerate: 60, // Fixed framerate for deterministic physics
    gravity: { x: 0, y: venusData.physics.gravity, z: 0 }
  });
  
  // PlayPause Button
  function toggleSimulation() {
    flightStore.togglePlay();
  }
  
  // Reset Button
  function resetSimulation() {
    flightStore.reset();
    // We don't need to call timeStore.reset() directly as flightStore.reset() handles it
  }
    
  // Cleanup timeStore when component is destroyed
  onDestroy(() => {
    timeStore.cleanup();
  });
</script>

<!-- Controls UI -->
<div class="fixed top-4 left-4 z-20">
  <Controls />
</div>

<!-- Sim Controls -->
<div class="fixed top-4 right-4 z-20 flex gap-2">
  <button 
    class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    onclick={toggleSimulation}
  >
	<Play size={12}/>
    <!-- {$playing ? 'Pause' : 'Play'} -->
		 Play
  </button>
  
  <button 
    class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
    onclick={resetSimulation}
  >
    Reset
  </button>

</div>

<!-- Flight Dashboard -->
<FlightDashboard />

<div class="relative w-full h-full">
  <Canvas>
    <!-- Use a fixed framerate for deterministic physics -->
    <World framerate={worldSettings.framerate}>
      
      <!-- Main simulation scene -->
      <Scene />
    </World>
  </Canvas>
</div>