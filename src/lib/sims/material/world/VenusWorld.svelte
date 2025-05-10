<!-- src/lib/sims/material/world/VenusWorld.svelte -->
<script lang="ts">
  import { World, Debug } from '@threlte/rapier';
  import { getSimulationContext } from '../state/context.svelte';
  import { useThrelte, useTask } from '@threlte/core';
  
  // Props
  let { 
    showDebug = false,
    children
  } = $props();
  
  // Get simulation context and threlte context
  const sim = getSimulationContext();
  const { renderStage } = useThrelte();
  
  // Get state from simulation context
  const paused = $derived(sim.isPaused());
  const debug = $derived(showDebug || sim.isDebug());
  
  // Configure Venus gravity based on planet data
  const gravity = $derived([0, -sim.planet.data.gravity || -8.87, 0]);
  
  // Use fixed timestep for more predictable physics
  const timeStepMode = "fixed";
  const fixedStepRate = 120; // Hz - higher rate for smoother simulation
  
  // Track World component
  let world = $state(null);
  
  // Set up physics update task based on Threlte 8 docs
  useTask('physics-update', (delta) => {
    // Update simulation with current world instance
    if (world) {
      sim.update(delta, world);
    }
  });
  
  // Initialize Rapier world when created
  function handleWorldCreate(rapierWorld) {
    world = rapierWorld;
    console.log("Rapier world created, initializing bridge");
    sim.commands.initializeBridge(rapierWorld);
    return () => {
      world = null;
    };
  }
</script>

<World
  gravity={paused ? [0, 0, 0] : gravity}
  paused={paused}
  timeStep={timeStepMode}
  timestep={1 / fixedStepRate}
  substeps={2}
  oncreate={handleWorldCreate}
>
  {#if debug}
    <Debug />
  {/if}
  
  <!-- Pass through all child components -->
  {@render children()}
</World>