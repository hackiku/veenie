<!-- src/lib/orbital/gui/TimeControl.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  // Expose props for configuration
  export let currentTime = new Date();
  export let timeScale = 1; // 1x time
  export let compact = false; // Whether to show compact view
  
  // Event dispatcher for time changes
  const dispatch = createEventDispatcher<{
    timeChange: { time: Date; scale: number }
  }>();
  
  // Time control functions
  function setSpeed(speed: number) {
    timeScale = speed;
    dispatch('timeChange', { time: currentTime, scale: timeScale });
  }
  
  function stepBackward() {
    const newTime = new Date(currentTime);
    newTime.setMonth(newTime.getMonth() - 1);
    currentTime = newTime;
    dispatch('timeChange', { time: currentTime, scale: timeScale });
  }
  
  function stepForward() {
    const newTime = new Date(currentTime);
    newTime.setMonth(newTime.getMonth() + 1);
    currentTime = newTime;
    dispatch('timeChange', { time: currentTime, scale: timeScale });
  }
  
  function togglePause() {
    setSpeed(timeScale === 0 ? 1 : 0);
  }
  
  function resetToNow() {
    currentTime = new Date();
    dispatch('timeChange', { time: currentTime, scale: timeScale });
  }
  
  // Add 10 years to get future date
  const futureDate = new Date(currentTime);
  futureDate.setFullYear(futureDate.getFullYear() + 10);
  
  // Computed formatted time strings
  $: year = currentTime.getFullYear();
  $: month = String(currentTime.getMonth() + 1).padStart(2, '0');
  $: day = String(currentTime.getDate()).padStart(2, '0');
  $: hours = String(currentTime.getHours()).padStart(2, '0');
  $: minutes = String(currentTime.getMinutes()).padStart(2, '0');
  $: seconds = String(currentTime.getSeconds()).padStart(2, '0');
  
  $: formattedDate = `${year} ${monthName(currentTime.getMonth())} ${day}`;
  $: formattedTime = `${hours}:${minutes}:${seconds}`;
  $: targetYear = year + 10; // For 10yr prediction display
  
  $: futureYear = futureDate.getFullYear();
  $: futureMonth = monthName(futureDate.getMonth());
  $: futureDay = String(futureDate.getDate()).padStart(2, '0');
  
  function monthName(month: number): string {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
  }
</script>

<div class="time-control {compact ? 'compact' : ''}" class:paused={timeScale === 0}>
  <div class="time-display grid grid-cols-2 gap-4">
    <div class="future-column">
      <div class="label text-purple-400 text-xs uppercase tracking-wider mb-1">Goal</div>
      <div class="value text-2xl font-bold text-green-400">{futureYear}</div>
      <div class="details text-xs text-gray-400">{futureMonth} {futureDay}</div>
    </div>
    
    <div class="current-column">
      <div class="label text-purple-400 text-xs uppercase tracking-wider mb-1">Current</div>
      <div class="value text-2xl font-bold text-blue-400">{year}</div>
      <div class="details text-xs text-gray-400">{monthName(currentTime.getMonth())} {day} {formattedTime}</div>
    </div>
  </div>
  
  <div class="divider h-px bg-purple-900/50 my-3"></div>
  
  <div class="controls flex justify-between items-center">
    <div class="playback-controls flex items-center gap-2">
      <button on:click={() => setSpeed(0.1)} class="control-btn" aria-label="Slow motion">
        ⏪
      </button>
      <button on:click={stepBackward} class="control-btn" aria-label="Step backward">
        ⏮
      </button>
      <button on:click={togglePause} class="control-btn play-pause" aria-label="Play/Pause">
        {#if timeScale === 0}
          ▶️
        {:else}
          ⏸
        {/if}
      </button>
      <button on:click={stepForward} class="control-btn" aria-label="Step forward">
        ⏭
      </button>
      <button on:click={() => setSpeed(10)} class="control-btn" aria-label="Fast forward">
        ⏩
      </button>
    </div>
    
    <div class="speed-display flex items-center">
      <span class="text-xs text-blue-400 mr-2">{timeScale}x</span>
      <button on:click={resetToNow} class="control-btn now-btn flex items-center gap-1" aria-label="Reset to now">
        🕒 Now
      </button>
    </div>
  </div>
</div>

<style>
  .time-control {
    background: rgba(13, 6, 32, 0.85);
    border-radius: 8px;
    color: white;
    font-family: monospace;
    padding: 12px 16px;
    user-select: none;
    position: fixed;
    bottom: 24px;
    left: 24px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(139, 92, 246, 0.3);
    min-width: 300px;
    z-index: 100;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
  
  .time-control.compact {
    min-width: auto;
    padding: 8px 12px;
  }
  
  .control-btn {
    background: rgba(88, 28, 135, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    padding: 0;
    transition: all 0.2s;
  }
  
  .control-btn:hover {
    background: rgba(139, 92, 246, 0.3);
    transform: translateY(-1px);
  }
  
  .play-pause {
    background: rgba(139, 92, 246, 0.4);
    height: 32px;
    width: 32px;
  }
  
  .now-btn {
    padding: 0 8px;
    width: auto;
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }
  
  .now-btn:hover {
    background: rgba(59, 130, 246, 0.3);
  }
  
  .paused {
    border-color: rgba(239, 68, 68, 0.5);
  }
  
  .paused .play-pause {
    background: rgba(239, 68, 68, 0.4);
  }
</style>