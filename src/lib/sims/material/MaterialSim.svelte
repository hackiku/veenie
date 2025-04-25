<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { createPhysicsContext } from './contexts/physicsContext.svelte';
  import { createSimulationContext } from './contexts/simulationContext.svelte';
  
  import Scene from './Scene.svelte';
  import TelemetryScreen from './ui/TelemetryScreen.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import ContextControls from './ui/ContextControls.svelte';
  
  // Create physics context first (keep for backward compatibility)
  const physics = createPhysicsContext();
  
  // Create simulation context (will use physics models)
  let sim;
  try {
    sim = createSimulationContext();
  } catch (e) {
    console.error("Failed to initialize simulation context", e);
  }
  
  // Keyboard shortcuts for simulation control
  function handleKeyDown(e) {
    if (e.key === 'p') {
      physics.setPaused(!physics.paused);
      if (sim) sim.setPaused(!sim.paused);
    } else if (e.key === 'r') {
      physics.resetSimulation();
      if (sim) sim.resetSimulation();
    } else if (e.key === 'd') {
      physics.setDebug(!physics.debug);
      if (sim) sim.setDebug(!physics.debug);
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

<!-- Telemetry displays -->
<TelemetryScreen />

<Altimeter 
  position="bottom-right"
  value={physics.bodyPosition[1]}
  min={0}
  max={20}
  label="Height"
  unit="m"
/>

<!-- Add the new Context Controls if simulation context is available -->
{#if sim}
  <ContextControls />
{/if}

<!-- Control instructions -->
<div class="fixed bottom-4 right-4 bg-black/60 text-white/80 p-3 rounded text-sm">
  <div class="font-bold mb-1">Controls:</div>
  <div>WASD = Move horizontally</div>
  <div>Space = Ascend</div>
  <div>Shift = Descend</div>
  <div class="mt-2 text-xs">
    P = Pause/Play | R = Reset | D = Debug View
  </div>
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={physics.gravityVector}
      paused={physics.paused}
      timeStep={1/60}
    >
      {#if physics.debug}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>