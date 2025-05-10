<!-- src/lib/sims/material/world/VenusWorld.svelte -->
<script lang="ts">
  import { World, Debug } from '@threlte/rapier';
  import { getSimulationContext } from '../state/simulationContext.svelte';
  import { configureVenusGravity } from '../core/venusPhysicsModel';
  
  // Props
  let { 
    showDebug = false,
    children
  } = $props();
  
  // Get simulation context
  const sim = getSimulationContext();
  
  // Derive state from sim context
  const paused = $derived(sim?.isPaused() ?? false);
  const debug = $derived(showDebug || (sim?.isDebug() ?? false));
  
  // Use variable timestep for more stability with Rapier
  const timeStepMode = "variable";
  
  // Configure gravity based on planet data from context
  const venusGravity = $derived(configureVenusGravity(sim?.planet));
  
  // Toggle whether we use Rapier's built-in gravity or apply manually
  // You can switch this to false and handle gravity in the physics model
  const useRapierGravity = $derived(true);
  
  // The gravity to apply to the Rapier world
  const worldGravity = $derived(useRapierGravity ? venusGravity : [0, 0, 0]);
</script>

<World
  gravity={worldGravity}
  paused={paused}
  timeStep={timeStepMode}
>
  {#if debug}
    <Debug />
  {/if}
  
  <!-- Pass through all child components using the new render syntax -->
  {@render children()}
</World>