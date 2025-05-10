<!-- Update MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { getSimulationContext } from './contexts/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import ContextControls from './ui/ContextControls.svelte';
  import VehicleSelector from './ui/VehicleSelector.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  
  // Get the simulation context from the layout
  const sim = getSimulationContext();
</script>

<!-- Altimeter -->
<Altimeter 
  position="bottom-right"
  min={0}
  max={100}
  label="Altitude"
  unit="m"
/>

<!-- Controls -->
<ContextControls />
<VehicleSelector />

<!-- Debug Panel -->
<!-- {#if sim.isDebug()} -->
  <DebugPanel />
<!-- {/if} -->

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