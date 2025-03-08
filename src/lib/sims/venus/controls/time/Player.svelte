<!-- src/lib/sims/venus/controls/time/Player.svelte -->
<script lang="ts">
  import { simulationStore } from '../../stores/simulationStore';
  import { 
    Play, 
    Pause, 
    FastForward, 
    Rewind
  } from 'phosphor-svelte';
  
  // Local state
  let isPaused = $state(false);
  let currentSpeed = $state(1);
  
  // Speed presets (in days per second)
  const speedPresets = [0.1, 0.5, 1, 5, 10, 50, 100];
  
  // Subscribe to store to keep local state in sync
  $effect(() => {
    if ($simulationStore) {
      isPaused = $simulationStore.time?.paused || false;
      currentSpeed = $simulationStore.time?.simulationSpeed || 1;
    }
  });
  
  // Methods
  function togglePause() {
    simulationStore.togglePause();
  }
  
  function increaseSpeed() {
    // Find next higher preset
    const nextPreset = speedPresets.find(preset => preset > currentSpeed);
    if (nextPreset) {
      simulationStore.setSpeed(nextPreset);
    }
  }
  
  function decreaseSpeed() {
    // Find next lower preset
    const reversedPresets = [...speedPresets].reverse();
    const prevPreset = reversedPresets.find(preset => preset < currentSpeed);
    if (prevPreset) {
      simulationStore.setSpeed(prevPreset);
    }
  }
  
  // Format simulation speed for display
  function formatSpeed(speed: number): string {
    if (speed >= 30) {
      return `${speed.toFixed(0)}d/s`;
    } else {
      return `${speed.toFixed(1)}d/s`;
    }
  }
</script>

<div class="flex items-center justify-center bg-gray-800/80 rounded-md p-2 text-white">
  <!-- Decrease speed -->
  <button 
    class="p-1 hover:bg-gray-700 rounded-full"
    on:click={decreaseSpeed}
    aria-label="Decrease simulation speed"
    disabled={currentSpeed <= speedPresets[0]}
  >
    <Rewind size={24} weight="fill" />
  </button>
  
  <!-- Play/Pause -->
  <button 
    class="p-1 hover:bg-gray-700 rounded-full mx-1"
    on:click={togglePause}
    aria-label={isPaused ? "Play simulation" : "Pause simulation"}
  >
    {#if isPaused}
      <Play size={24} weight="fill" />
    {:else}
      <Pause size={24} weight="fill" />
    {/if}
  </button>
  
  <!-- Increase speed -->
  <button 
    class="p-1 hover:bg-gray-700 rounded-full"
    on:click={increaseSpeed}
    aria-label="Increase simulation speed"
    disabled={currentSpeed >= speedPresets[speedPresets.length - 1]}
  >
    <FastForward size={24} weight="fill" />
  </button>
  
  <!-- Current speed display -->
  <div class="ml-3 bg-gray-900 px-2 py-1 rounded text-xs font-mono">
    {formatSpeed(currentSpeed)}
  </div>
</div>