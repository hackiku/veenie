<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas, useTask } from '@threlte/core';
  import { World, Debug } from '@threlte/rapier';
  import { getSimulationContext } from './state/context.svelte';
  
  import Scene from './Scene.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  import DebugPanel from './ui/DebugPanel.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  import PhysicsSystem from './world/PhysicsSystem.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Reactive debug state
  const debug = $derived(sim.isDebug());
  const showDebugPanel = $derived(true); // Always show for now
  
  // Venus gravity based on planet data
  const gravity = $derived([0, -sim.planet.data.gravity || -8.87, 0]);
  
  // World reference
  let rapierWorld = $state(null);
  let isPaused = $derived(sim.isPaused());
  
  // Handle world creation
  function handleWorldCreate(world) {
    console.log("Rapier world created");
    rapierWorld = world;
    return () => {
      rapierWorld = null;
    };
  }
  
  // Start a session on load
  $effect(() => {
    if (typeof window !== 'undefined') {
      sim.commands.startSession();
    }
  });
</script>

<!-- UI Components -->
<Altimeter position="bottom-right" min={0} max={100000} label="Altitude" unit="m" />
<DebugPanel />
<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={gravity}
      paused={isPaused}
      timeStep="fixed"
      timestep={1/120}
      substeps={2}
      oncreate={handleWorldCreate}
    >
      {#if rapierWorld}
        <!-- New component to handle physics update -->
        <PhysicsSystem world={rapierWorld} />
      {/if}
      
      {#if debug}
        <Debug />
      {/if}
      
      <Scene />
    </World>
  </Canvas>
</div>