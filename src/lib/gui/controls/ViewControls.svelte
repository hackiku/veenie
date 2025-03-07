// src/lib/gui/controls/TimeControls.svelte
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let currentTime = new Date();
  export let timeScale = 1;
  
  const dispatch = createEventDispatcher();
  
  function setSpeed(speed) {
    timeScale = speed;
    dispatch('timeChange', { time: currentTime, scale: timeScale });
  }
  
  function togglePause() {
    setSpeed(timeScale === 0 ? 1 : 0);
  }
</script>

<div class="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-purple-900/30 p-4 rounded-md text-white">
  <div class="grid grid-cols-2 gap-4 mb-3">
    <div>
      <div class="text-xs text-purple-400 uppercase">Goal</div>
      <div class="text-xl text-green-400">{currentTime.getFullYear() + 10}</div>
    </div>
    <div>
      <div class="text-xs text-purple-400 uppercase">Current</div>
      <div class="text-xl text-blue-400">{currentTime.getFullYear()}</div>
      <div class="text-xs text-gray-400">
        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
      </div>
    </div>
  </div>
  
  <div class="flex gap-2">
    <button on:click={() => setSpeed(0.1)} class="bg-purple-900/50 p-1 rounded">⏪</button>
    <button on:click={togglePause} class="bg-purple-900/50 p-1 rounded">
      {timeScale === 0 ? '▶️' : '⏸'}
    </button>
    <button on:click={() => setSpeed(10)} class="bg-purple-900/50 p-1 rounded">⏩</button>
    <span class="ml-2 text-blue-400">{timeScale}x</span>
  </div>
</div>