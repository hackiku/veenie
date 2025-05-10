<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { getSimulationContext } from './state/context.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  import VenusWorld from './world/VenusWorld.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Reactive debug state from telemetry
  const debug = $derived(sim.telemetry.simulation.isDebug);
  const showDebugPanel = $derived(true); // Always show for now
  
  // Start a session on load
  $effect(() => {
    if (typeof window !== 'undefined') {
      sim.commands.startSession();
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
<!-- {#if showDebugPanel}
{/if} -->
<DebugPanel />

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