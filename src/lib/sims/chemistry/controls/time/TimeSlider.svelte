<!-- src/lib/ui/controls/time/TimeSlider.svelte -->
<script lang="ts">
  import { timeyStore, formatTime } from '$lib/stores/timey';
  
  // Props
  let { 
    max = 3600, // Default max: 1 hour in seconds
    step = 1,   // Default step: 1 second
    width = 300 // Default width in pixels
  } = $props<{
    max?: number;
    step?: number;
    width?: number;
  }>();
  
  // State for time
  let timeyState = $state(null);
  let isDragging = $state(false);
  
  // Subscribe to the time store
  $effect(() => {
    const unsubTimeStore = timeyStore.subscribe(state => {
      timeyState = state;
    });
    
    return () => {
      unsubTimeStore();
    };
  });
  
  // Derived value
  const elapsedTime = $derived(timeyState?.elapsedTime || 0);
  
  // Format elapsed time
  const formattedTime = $derived(formatTime(elapsedTime));
  
  // Handle slider change
  function handleSliderChange(event) {
    const newTime = parseFloat(event.target.value);
    // Pause while dragging to avoid jumps
    if (!isDragging) {
      // Remember playing state to restore after dragging
      isDragging = true;
      if (timeyState?.playing) {
        timeyStore.pause();
      }
    }
    
    // Directly set elapsed time
    timeyStore.update(state => ({
      ...state,
      elapsedTime: newTime,
      // Also update mission time to keep in sync
      missionTime: newTime
    }));
  }
  
  // Handle drag end
  function handleDragEnd() {
    isDragging = false;
  }
</script>

<div class="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white flex flex-col" style="width: {width}px">
  <div class="flex justify-between mb-1">
    <span class="text-xs opacity-70">Time Slider (Debug)</span>
    <span class="text-xs font-mono">{formattedTime}</span>
  </div>
  
  <input 
    type="range" 
    min="0" 
    max={max} 
    step={step}
    value={elapsedTime}
    oninput={handleSliderChange}
    onchange={handleDragEnd}
    class="w-full h-6" 
  />
  
  <div class="flex justify-between text-xs opacity-60 mt-1">
    <span>0:00:00</span>
    <span>Max: {formatTime(max)}</span>
  </div>
</div>

<style>
  input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    background: rgba(59, 130, 246, 0.3);
    border-radius: 5px;
    outline: none;
  }
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(59, 130, 246);
    cursor: pointer;
  }
  
  input[type=range]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(59, 130, 246);
    cursor: pointer;
  }
</style>