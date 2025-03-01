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
  
  // Computed formatted time strings
  $: year = currentTime.getFullYear();
  $: month = String(currentTime.getMonth() + 1).padStart(2, '0');
  $: day = String(currentTime.getDate()).padStart(2, '0');
  $: hours = String(currentTime.getHours()).padStart(2, '0');
  $: minutes = String(currentTime.getMinutes()).padStart(2, '0');
  $: seconds = String(currentTime.getSeconds()).padStart(2, '0');
  
  $: formattedDate = `${year} ${monthName(currentTime.getMonth())} ${day}`;
  $: formattedTime = `${hours}:${minutes}:${seconds} UTC`;
  $: targetYear = year + 10; // For 10yr prediction display
  
  function monthName(month: number): string {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
  }
</script>

<div class="time-control {compact ? 'compact' : ''}" class:paused={timeScale === 0}>
  <div class="time-display">
    <div class="time-row">
      <span class="future">{targetYear}</span>
      <span class="separator">|</span>
      <span class="current">{formattedDate}</span>
    </div>
    <div class="time-row">
      <span class="scale">{timeScale}x time</span>
      <span class="separator">|</span>
      <span class="current-time">{formattedTime}</span>
    </div>
  </div>
  
  <div class="controls">
    <button on:click={() => setSpeed(0.1)} class="control-btn" aria-label="Slow motion">
      <div class="ph ph-rewind"></div>
    </button>
    <button on:click={stepBackward} class="control-btn" aria-label="Step backward">
      <div class="ph ph-skip-back"></div>
    </button>
    <button on:click={togglePause} class="control-btn" aria-label="Play/Pause">
      {#if timeScale === 0}
        <div class="ph ph-play"></div>
      {:else}
        <div class="ph ph-pause"></div>
      {/if}
    </button>
    <button on:click={stepForward} class="control-btn" aria-label="Step forward">
      <div class="ph ph-skip-forward"></div>
    </button>
    <button on:click={() => setSpeed(10)} class="control-btn" aria-label="Fast forward">
      <div class="ph ph-fast-forward"></div>
    </button>
    <button on:click={resetToNow} class="control-btn now-btn" aria-label="Reset to now">
      Now
    </button>
  </div>
</div>

<style>
  .time-control {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    color: white;
    font-family: monospace;
    padding: 8px 12px;
    user-select: none;
    position: absolute;
    bottom: 16px;
    left: 16px;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(128, 128, 255, 0.3);
    min-width: 240px;
    z-index: 100;
  }
  
  .time-control.compact {
    min-width: auto;
    padding: 4px 8px;
  }
  
  .time-display {
    margin-bottom: 8px;
  }
  
  .time-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
    font-size: 0.9rem;
  }
  
  .compact .time-row {
    font-size: 0.8rem;
  }
  
  .future {
    color: #6ee7b7;
  }
  
  .scale {
    color: #60a5fa;
  }
  
  .current, .current-time {
    color: #e2e8f0;
  }
  
  .separator {
    color: #6b7280;
    margin: 0 8px;
  }
  
  .controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  
  .control-btn {
    background: rgba(30, 30, 60, 0.5);
    border: 1px solid rgba(128, 128, 255, 0.2);
    border-radius: 3px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    height: 24px;
    width: 24px;
    padding: 0;
    transition: background 0.2s;
  }
  
  .compact .control-btn {
    height: 20px;
    width: 20px;
    font-size: 0.6rem;
  }
  
  .control-btn:hover {
    background: rgba(60, 60, 120, 0.7);
  }
  
  .now-btn {
    font-size: 0.7rem;
    padding: 0 8px;
    width: auto;
  }
  
  .paused {
    border-color: rgba(239, 68, 68, 0.5);
  }
</style>