<!-- src/lib/sims/material/ui/PlayPause.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../state/simulationContext.svelte";
  import { Button } from "bits-ui";
  import { onMount, onDestroy } from 'svelte';

  // Get the simulation context
  const sim = getSimulationContext();
  
  // State tracking
  let isPaused = $state(sim?.isPaused() || false);
  let isProcessing = $state(false);
  
  // Timer state
  let elapsedTime = $state(0);
  let timerInterval = $state(null);
  let startTime = $state(Date.now());
  
  // Update timer every 100ms when not paused
  function updateTimer() {
    if (!isPaused) {
      elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    }
  }
  
  // Format timer as mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Update state when function is called
  function togglePause() {
    if (sim && !isProcessing) {
      isProcessing = true;
      
      // Toggle pause state
      sim.setPaused(!sim.isPaused());
      isPaused = sim.isPaused();
      
      // Handle timer
      if (isPaused) {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      } else {
        // If we're unpausing, don't reset the elapsed time
        // Just update the startTime to account for the pause duration
        startTime = Date.now() - (elapsedTime * 1000);
        
        if (!timerInterval) {
          timerInterval = setInterval(updateTimer, 100);
        }
      }
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessing = false;
      }, 300);
    }
  }

  // Reset simulation
  function resetSimulation() {
    if (sim && !isProcessing) {
      isProcessing = true;
      
      // Reset simulation
      sim.resetSimulation();
      
      // Reset timer
      startTime = Date.now();
      elapsedTime = 0;
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessing = false;
      }, 300);
    }
  }

  // Handle keyboard shortcuts
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.key === ' ' || e.code === 'Space') && !isProcessing) {
      e.preventDefault();
      togglePause();
    } else if (e.key === 'r' && e.ctrlKey && !isProcessing) {
      e.preventDefault();
      resetSimulation();
    }
  }
  
  // Setup on mount
  onMount(() => {
    // Initialize state
    isPaused = sim?.isPaused() || false;
    
    // Start timer if not paused
    if (!isPaused) {
      timerInterval = setInterval(updateTimer, 100);
    }
    
    // Add keyboard listener
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  // Clean up timer on destroy
  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });
  
  // Keep isPaused in sync with simulation state
  $effect(() => {
    const contextPaused = sim?.isPaused() || false;
    if (isPaused !== contextPaused && !isProcessing) {
      isPaused = contextPaused;
      
      // Manage timer based on pause state
      if (isPaused) {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      } else if (!timerInterval) {
        startTime = Date.now() - (elapsedTime * 1000);
        timerInterval = setInterval(updateTimer, 100);
      }
    }
  });
</script>

<div class="flex space-x-2">
  <Button.Root
    class="px-3 py-2 {isPaused ? 'bg-green-700/80 hover:bg-green-700' : 'bg-blue-700/80 hover:bg-blue-700'} rounded font-medium flex items-center gap-2"
    onclick={togglePause}
    disabled={isProcessing}
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
    disabled={isProcessing}
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