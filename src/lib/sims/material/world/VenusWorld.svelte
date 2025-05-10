<!-- src/lib/sims/material/world/VenusWorld.svelte -->
<script lang="ts">
  import { World, Debug } from '@threlte/rapier';
  import { getSimulationContext } from '../state/simulationContext.svelte';
  import { configureVenusGravity } from '../core/venusPhysicsModel';
  import { useTask } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // Props
  let { 
    showDebug = false,
    children
  } = $props();
  
  // Get simulation context
  const sim = getSimulationContext();
  
  // Derive state from sim context
  const paused = $derived(sim.telemetry.simulation.isPaused);
  const debug = $derived(showDebug || sim.telemetry.simulation.isDebug);
  
  // Use fixed timestep for more predictable physics during pause/unpause
  const timeStepMode = "fixed";
  const fixedStepRate = 120; // Hz - higher rate for smoother simulation
  
  // Configure gravity based on planet data from context
  const venusGravity = $derived(configureVenusGravity(sim.planet));
  
  // The gravity to apply to the Rapier world - zero when paused!
  const worldGravity = $derived(paused ? [0, 0, 0] : venusGravity);
  
  // Update elapsed time when not paused
  // useFrame((_, delta) => {
  //   if (!paused) {
  //     sim.telemetry.simulation.elapsedTime += delta;
  //   }
  // });
  
  // Track World component for additional pause control
  let worldInstance = $state(null);
  
  // Setup additional pause controls when the World component mounts
  function handleWorldCreate(world) {
    worldInstance = world;
    
    return () => {
      worldInstance = null;
    };
  }
  
  // Additional pause handling to ensure the physics stays frozen
  $effect(() => {
    if (!worldInstance) return;
    
    if (paused) {
      // Extra steps to ensure physics is fully paused
      // These will supplement the World component's built-in pause
      worldInstance.timestep = 0; // Set timestep to 0 to prevent any physics updates
    } else {
      // Restore normal physics when unpausing
      worldInstance.timestep = 1 / fixedStepRate;
    }
  });
</script>

<World
  gravity={worldGravity}
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