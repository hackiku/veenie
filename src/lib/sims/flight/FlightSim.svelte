<!-- src/lib/sims/flight/FlightSim.svelte -->

<script>
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import { Play, Pause, RefreshCw } from 'lucide-svelte';
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
  
  // State for flight
  let flightState = $state(null);
  
  // Subscribe to the flight store using $effect
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Derived state
  const isPlaying = $derived(flightState?.playing || false);
  
  // PlayPause Button
  function toggleSimulation() {
    flightStore.togglePlay();
  }
  
  // Reset Button
  function resetSimulation() {
    flightStore.reset();
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

<!-- Flight Dashboard -->
<FlightDashboard />

<!-- Sim Controls - positioned at bottom center -->
<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
  <button 
    class="flex items-center justify-center w-12 h-12 bg-blue-600/80 text-white rounded-full hover:bg-blue-700 transition shadow-lg backdrop-blur-sm"
    onclick={toggleSimulation}
    title={isPlaying ? 'Pause' : 'Play'}
  >
    {#if isPlaying}
      <Pause size={20} />
    {:else}
      <Play size={20} />
    {/if}
  </button>
  
  <button 
    class="flex items-center justify-center w-12 h-12 bg-gray-600/80 text-white rounded-full hover:bg-gray-700 transition shadow-lg backdrop-blur-sm"
    onclick={resetSimulation}
    title="Reset Simulation"
  >
    <RefreshCw size={20} />
  </button>
</div>

<div class="relative w-full h-full">
  <Canvas>
    <!-- Use a fixed framerate for deterministic physics -->
    <World framerate={worldSettings.framerate}>
      <!-- Main simulation scene -->
      <Scene />
    </World>
  </Canvas>
</div>