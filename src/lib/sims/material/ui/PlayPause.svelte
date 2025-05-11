<!-- src/lib/sims/material/ui/PlayPause.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../state/context.svelte";
  import { Button } from "bits-ui";
  import { onMount } from 'svelte';

  // Get the simulation context
  const sim = getSimulationContext();
  const { commands, timeSystem } = sim;
  
  // Track state for UI
  let isPaused = $state(sim.isPaused());
  let elapsedTime = $state(0);
  
  // Update UI on timer
  $effect.root(() => {
    const timer = setInterval(() => {
      isPaused = sim.isPaused();
      elapsedTime = sim.getTime();
    }, 100);
    
    return () => clearInterval(timer);
  });
  
  // Format timer as hh:mm:ss
  function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Toggle pause state
  function togglePause() {
    console.log("Current pause state:", isPaused);
    if (isPaused) {
      commands.play();
    } else {
      commands.pause();
    }
    // Force update
    isPaused = sim.isPaused();
    console.log("New pause state:", isPaused);
  }

  // Reset simulation
  function resetSimulation() {
    commands.reset();
  }

  // Handle keyboard shortcuts
  function handleKeyDown(e) {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePause();
    } else if (e.key === 'r' && e.ctrlKey) {
      e.preventDefault();
      resetSimulation();
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<div class="flex space-x-2">
  <Button.Root
    class="px-3 py-2 {isPaused ? 'bg-green-700/80 hover:bg-green-700' : 'bg-blue-700/80 hover:bg-blue-700'} rounded font-medium flex items-center gap-2"
    onclick={togglePause}
  >
    {#snippet children()}
      {#if isPaused}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Play</span>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span>{formatTime(elapsedTime)}</span>
      {/if}
    {/snippet}
  </Button.Root>

  <Button.Root
    class="px-3 py-2 bg-red-700/80 hover:bg-red-700 rounded font-medium flex items-center gap-2"
    onclick={resetSimulation}
  >
    {#snippet children()}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
      </svg>
      <span>Reset</span>
    {/snippet}
  </Button.Root>
</div>

<div class="text-xs text-center mt-2 text-white/60">
  Space to pause | Ctrl+R to reset
</div>