<!-- src/lib/sims/material/ui/PlayPause.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  import { Button } from "bits-ui";
  import { onMount } from 'svelte';

  // Get the simulation context
  const sim = getSimulationContext();

  // Toggle simulation pause state
  function togglePause() {
    if (sim) {
      sim.setPaused(!sim.isPaused());
    }
  }

  // Reset simulation
  function resetSimulation() {
    if (sim) {
      sim.resetSimulation();
    }
  }

  // Handle keyboard shortcuts
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.code === 'Space') {
      // Prevent default space bar action (usually page scroll)
      e.preventDefault();
      togglePause();
    } else if (e.key === 'r' || e.code === 'KeyR') {
      resetSimulation();
    }
  }
  
  // Setup keyboard listener on mount
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="flex space-x-2">
  <Button.Root
    class="px-3 py-2 {sim?.isPaused() ? 'bg-green-700/40 hover:bg-green-700/70' : 'bg-blue-700/40 hover:bg-blue-700/70'} rounded text-sm"
    onclick={togglePause}
  >
    {#snippet children()}
      {sim?.isPaused() ? "▶ Play" : "⏸ Pause"}
    {/snippet}
  </Button.Root>

  <Button.Root
    class="px-3 py-2 bg-red-700/40 hover:bg-red-700/70 rounded text-sm"
    onclick={resetSimulation}
  >
    {#snippet children()}
      🔄 Reset
    {/snippet}
  </Button.Root>
</div>