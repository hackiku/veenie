<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { getSimulationContext } from './contexts/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import ContextControls from './ui/ContextControls.svelte';
  import VehicleSelector from './ui/VehicleSelector.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Safe getters with fallbacks
  const debug = $derived(() => {
    try {
      return sim?.isDebug() ?? false;
    } catch (e) {
      return false;
    }
  });
  
  const paused = $derived(() => {
    try {
      return sim?.isPaused() ?? false;
    } catch (e) {
      return false;
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

<!-- Controls -->
<!-- <ContextControls /> -->
<VehicleSelector />

<!-- Debug Panel -->
<!-- {#if debug} -->
  <DebugPanel />
<!-- {/if} -->

<!-- Play Pause Controls -->
<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={[0, -8.87, 0]}
      paused={paused}
    >
      {#if debug}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>