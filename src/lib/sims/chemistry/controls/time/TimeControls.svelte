<!-- src/lib/ui/controls/time/TimeControls.svelte -->
<script lang="ts">
  import { Play, Pause, RotateCcw, Clock } from 'lucide-svelte';
  import { timeyStore, formatTime } from '$lib/stores/timey';
  
  // State for time
  let timeState = $state(null);
  
  // Subscribe to time store
  $effect(() => {
    const unsubTimeStore = timeyStore.subscribe(state => {
      timeState = state;
    });
    
    return () => {
      unsubTimeStore();
    };
  });
  
  // Derived values
  const playing = $derived(timeState?.playing || false);
  const elapsedTime = $derived(timeState?.elapsedTime || 0);
  
  // Format the current time
  const formattedTime = $derived(formatTime(elapsedTime));
  
  // Format the current date (fictional Venus mission date)
  function formatDate() {
    // Start with a baseline mission date
    const missionStart = new Date('2035-06-01T00:00:00Z');
    const currentDate = new Date(missionStart.getTime() + elapsedTime * 1000);
    return currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  const currentDate = $derived(formatDate());
  
  // Toggle play/pause
  function togglePlay() {
    timeyStore.togglePlay();
  }
  
  // Reset time
  function resetTime() {
    timeyStore.reset();
  }
  
  // Handle keyboard shortcuts
  function handleKeydown(event) {
    // Space bar for play/pause
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent default space behavior
      togglePlay();
    }
    // 'R' key for reset
    else if (event.code === 'KeyR') {
      resetTime();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
  <!-- Time display -->
  <div class="bg-black/60 text-white px-4 py-2 rounded-t-lg backdrop-blur-sm flex gap-4 items-center">
    <div class="flex flex-col items-center">
      <div class="text-xs text-gray-400">Venus Mission</div>
      <div class="text-sm font-mono">{currentDate}</div>
    </div>
    
    <div class="border-l border-gray-600 h-10"></div>
    
    <div class="flex items-center gap-2">
      <Clock size={16} class="text-blue-400" />
      <div class="font-mono text-xl">{formattedTime}</div>
    </div>
  </div>
  
  <!-- Control buttons -->
  <div class="flex gap-3 mt-2">
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
      onclick={resetTime}
      title="Reset Time"
    >
      <RotateCcw size={20} />
    </button>
  </div>
</div>