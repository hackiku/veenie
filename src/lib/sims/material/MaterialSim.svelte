<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { getSimulationContext } from './state/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Safe getters with fallbacks using Svelte 5 derived state
  const debug = $derived(sim?.isDebug() ?? false);
  const paused = $derived(sim?.isPaused() ?? false);
  
  // We'll apply gravity manually in physics calculations
  const zeroGravity = [0, 0, 0];
  // Use variable timestep for physics
  const timeStepMode = "variable";
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
<DebugPanel />

<!-- Play Pause Controls -->
<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={zeroGravity}
      paused={paused}
      timeStep={timeStepMode}
    >
      {#if debug}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>