<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { createSimulationContext } from './contexts/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import ContextControls from './ui/ContextControls.svelte';
  
  // Create simulation context (main context for the application)
  const sim = createSimulationContext();
  
  // Keyboard shortcuts for simulation control
  function handleKeyDown(e) {
    if (e.key === 'p') {
      sim.setPaused(!sim.isPaused());
    } else if (e.key === 'r') {
      sim.resetSimulation();
    } else if (e.key === 'd') {
      sim.setDebug(!sim.isDebug());
    }
  }
  
  // Set up global keyboard shortcuts
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
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