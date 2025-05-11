<!-- src/lib/sims/material/world/PhysicsSystem.svelte -->
<script lang="ts">
  import { useTask } from '@threlte/core';
  import { getSimulationContext } from '../state/context.svelte';
  
  // Get simulation context
  const sim = getSimulationContext();
  
  // Get the world from props
  let { world } = $props();
  
  // Initialize the bridge if needed
  if (world && sim) {
    console.log("PhysicsSystem initializing bridge with world");
    const bridge = sim.commands.initializeBridge(world);
    console.log("Bridge initialized:", bridge ? "Success" : "Failed");
    
    // Ensure we have a balloon
    setTimeout(() => {
      const entities = sim.entityRegistry.getAll();
      console.log("Entities after world creation:", entities.length);
      if (entities.length === 0) {
        console.log("No entities found, creating balloon");
        sim.commands.reset();
      }
    }, 200);
  }
  
  // Set up physics update task
  useTask('physics-update', (delta) => {
    if (world && sim) {
      sim.update(delta);
    }
  });
</script>