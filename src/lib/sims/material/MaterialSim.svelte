<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { getSimulationContext } from './state/simulationContext.svelte';
  import { freezePhysics, unfreezePhysics } from './core/rapierBridge';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  import VenusWorld from './world/VenusWorld.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Safe getters with fallbacks using Svelte 5 derived state
  const debug = $derived(sim?.isDebug() ?? false);
  const paused = $derived(sim?.isPaused() ?? false);
  
  // Track previous pause state to avoid excessive calls
  let wasPaused = $state(paused);
  
  // Watch for changes in pause state to freeze/unfreeze physics
  $effect(() => {
    // Only call if the state actually changed
    if (paused !== wasPaused) {
      try {
        if (paused) {
          // When paused, freeze all physics objects
          freezePhysics();
        } else {
          // When unpaused, restore physics objects to previous state
          unfreezePhysics();
        }
        wasPaused = paused;
      } catch (e) {
        console.error('Error updating physics state:', e);
      }
    }
  });
</script>

<!-- Altimeter -->
<Altimeter 
  position="bottom-right"
  min={0}
  max={100000}
  label="Altitude"
  unit="m"
/>

<!-- Debug Panel -->
<!-- <DebugPanel /> -->

<!-- Play Pause Controls -->
<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <VenusWorld showDebug={debug}>
      {#snippet children()}
        <Scene />
      {/snippet}
    </VenusWorld>
  </Canvas>
</div>