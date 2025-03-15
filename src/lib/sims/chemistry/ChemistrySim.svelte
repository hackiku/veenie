<!-- src/lib/sims/chemistry/ChemistrySim.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import { Play, Pause, RefreshCw } from 'lucide-svelte';
  import Scene from './scene/Scene.svelte';
  import CompAnalyzer from './ui/CompAnalyzer.svelte';
  // import ChemistryDashboard from './ui/ChemistryDashboard.svelte';
  
  import { chemistryStore } from '$lib/stores/chemistryStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { onDestroy } from 'svelte';
  import { venusData } from '$lib/data/chemistry/constants';
  
  
  // State for chemistry
  let chemState = $state(null);
  
  // Subscribe to the chemistry store using $effect
  $effect(() => {
    const unsubChemStore = chemistryStore.subscribe(state => {
      chemState = state;
    });
    
    return () => {
      unsubChemStore();
    };
  });
  
  // Derived state
  const isPlaying = $derived(chemState?.playing || false);
  
  // PlayPause Button
  function toggleSimulation() {
    chemistryStore.togglePlay();
  }
  
  // Reset Button
  function resetSimulation() {
    chemistryStore.reset();
  }
    
  // Cleanup timeStore when component is destroyed
  onDestroy(() => {
    timeStore.cleanup();
  });
</script>

<!-- Chemistry Dashboard -->
<!-- <ChemistryDashboard /> -->
<CompAnalyzer />

<!-- Sim Controls - positioned at bottom center -->
<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
  <button 
    class="flex items-center justify-center w-12 h-12 bg-green-600/80 text-white rounded-full hover:bg-green-700 transition shadow-lg backdrop-blur-sm"
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
    <!-- Simple world without physics for chemistry visualization -->
    <Scene />
  </Canvas>
</div>