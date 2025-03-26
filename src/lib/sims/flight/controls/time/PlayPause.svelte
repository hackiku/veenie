<!-- src/lib/sims/flight/controls/time/PlayPause.svelte -->
<script>
  import { Play, Pause, RefreshCw } from 'lucide-svelte';
  import { getContext } from 'svelte';

  // Get the flight context
  const flightContext = getContext('flightContext');
  
  // Derived values from context
  const gameState = $derived(flightContext.getGameState());
  const playing = $derived(gameState.playing);
  
  // Event handlers
  function togglePlay() {
    flightContext.togglePlay();
  }
  
  function reset() {
    flightContext.reset();
  }
</script>

<div class="flex gap-3">
  <button 
    class="flex items-center justify-center w-12 h-12 bg-blue-600/80 text-white rounded-full hover:bg-blue-700 transition shadow-lg backdrop-blur-sm"
    onclick={togglePlay}
    title={playing ? 'Pause' : 'Play'}
  >
    {#if playing}
      <Pause size={20} />
    {:else}
      <Play size={20} />
    {/if}
  </button>
  
  <button 
    class="flex items-center justify-center w-12 h-12 bg-gray-600/80 text-white rounded-full hover:bg-gray-700 transition shadow-lg backdrop-blur-sm"
    onclick={reset}
    title="Reset Simulation"
  >
    <RefreshCw size={20} />
  </button>
</div>