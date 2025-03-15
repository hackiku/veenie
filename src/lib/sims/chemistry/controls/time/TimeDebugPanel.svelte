<!-- src/lib/ui/controls/time/TimeDebugPanel.svelte -->
<script lang="ts">
  import { Play, Pause, RotateCcw, Clock, FastForward, Rewind, SkipBack, ChevronUp, ChevronDown } from 'lucide-svelte';
  import { timeyStore, formatTime, TimeMode } from '$lib/stores/timey';
  import PlayControls from './PlayControls.svelte';
  import TimeSlider from './TimeSlider.svelte';
  
  // State for time
  let timeState = $state(null);
  let expanded = $state(true);
  
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
  const timeScale = $derived(timeState?.timeScale || 1.0);
  
  // Format the current time
  const formattedTime = $derived(formatTime(elapsedTime));
  
  // Event handlers
  function togglePlay() {
    timeyStore.togglePlay();
  }
  
  function resetTime() {
    timeyStore.reset();
  }
  
  function rewindTime() {
    timeyStore.setMissionTime(Math.max(0, elapsedTime - 60)); // Rewind 1 minute
  }
  
  function fastForwardTime() {
    timeyStore.setMissionTime(elapsedTime + 60); // Forward 1 minute
  }
  
  function increaseSpeed() {
    timeyStore.setTimeScale(timeScale * 2);
  }
  
  function decreaseSpeed() {
    timeyStore.setTimeScale(timeScale / 2);
  }
  
  function toggleExpanded() {
    expanded = !expanded;
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

<div class="fixed right-4 bottom-4 z-20 flex flex-col items-end">
  <!-- Toggle button -->
  <button 
    class="mb-2 px-3 py-1 bg-gray-800/80 text-white rounded text-sm hover:bg-gray-700/80 flex items-center gap-1"
    onclick={toggleExpanded}
  >
    {expanded ? 'Hide' : 'Show'} Time Debug
    {#if expanded}
      <ChevronDown size={14} />
    {:else}
      <ChevronUp size={14} />
    {/if}
  </button>

  {#if expanded}
    <div class="bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white flex flex-col items-center">
      <div class="mb-3 text-center">
        <div class="text-xs text-gray-400">Current Time</div>
        <div class="text-2xl font-mono">{formattedTime}</div>
        <div class="text-sm font-mono">Scale: {timeScale}x</div>
      </div>
      
      <!-- Speed controls -->
      <div class="flex gap-2 mb-4">
        <button
          class="px-2 py-1 bg-indigo-700/70 hover:bg-indigo-600/70 rounded text-xs"
          onclick={decreaseSpeed}
          disabled={timeScale <= 0.25}
        >
          Slower
        </button>
        
        <button
          class="px-2 py-1 bg-indigo-700/70 hover:bg-indigo-600/70 rounded text-xs"
          onclick={increaseSpeed}
          disabled={timeScale >= 128}
        >
          Faster
        </button>
      </div>
      
      <!-- Play controls using our component -->
      <div class="mb-4">
        <PlayControls
          {playing}
          showRewind={true}
          showFastForward={true}
          size="medium"
          ontoggle={togglePlay}
          onreset={resetTime}
          onrewind={rewindTime}
          onfastForward={fastForwardTime}
        />
      </div>
      
      <!-- Time slider -->
      <TimeSlider max={3600} step={1} width={300} />
      
      <!-- Space bar hint -->
      <div class="mt-3 text-xs text-gray-500">
        Press <span class="px-1 py-0.5 bg-gray-700/50 rounded">Space</span> to Play/Pause
      </div>
    </div>
  {/if}
</div>