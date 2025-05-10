<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { getSimulationContext } from './contexts/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import ContextControls from './ui/ContextControls.svelte';
  
  // Get the simulation context from the layout
  const sim = getSimulationContext();
  
  // We no longer need to set up keyboard shortcuts here as they're in the layout
</script>

<!-- Altimeter -->
<Altimeter 
  position="bottom-right"
  min={0}
  max={100}
  label="Altitude"
  unit="m"
/>

<!-- Context Controls with Bits UI Components -->
<ContextControls />

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={[0, -8.87, 0]}
      paused={sim.isPaused()}
    >
      {#if sim.isDebug()}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>