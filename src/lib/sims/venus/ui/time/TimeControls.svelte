<!-- src/lib/sims/venus/ui/time/TimeControls.svelte -->
<script lang="ts">
  import { getVenusTime } from '../../context/time.svelte';
  
  // Get time context
  const venusTime = getVenusTime();
  
  // Time scale options
  const timeScales = [
    { label: '<<', value: -10, title: 'Reverse 10x' },
    { label: '<', value: -1, title: 'Reverse 1x' },
    { label: '0.1x', value: 0.1, title: 'Slow motion' },
    { label: '1x', value: 1, title: 'Real time' },
    { label: '10x', value: 10, title: 'Fast 10x' },
    { label: '100x', value: 100, title: 'Fast 100x' },
    { label: '1000x', value: 1000, title: 'Very fast' }
  ];
  
  // Current time scale for highlighting
  let currentScale = $state(1);
  
  function togglePlayPause() {
    venusTime.toggle();
  }
  
  function setTimeScale(scale: number) {
    currentScale = scale;
    venusTime.setTimeScale(scale);
  }
  
  function resetTime() {
    venusTime.reset();
    currentScale = 1;
  }
  
  // Handle keyboard shortcuts
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        resetTime();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
  <!-- Time Display -->
  <div class="text-center mb-3">
    <div class="text-lg font-mono">{venusTime.getDateString()}</div>
    <div class="text-sm text-gray-300">
      Sim Time: {venusTime.getTimeString()} | 
      Venus Day: {venusTime.state.venusDay} | 
      Rotation: {venusTime.state.venusRotation.toFixed(1)}°
    </div>
  </div>
  
  <!-- Play/Pause Button -->
  <div class="flex justify-center mb-3">
    <button
      onclick={togglePlayPause}
      class="px-4 py-2 rounded-lg font-semibold text-lg {venusTime.state.isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors"
    >
      {venusTime.state.isPlaying ? '⏸️ Pause' : '▶️ Play'}
    </button>
  </div>
  
  <!-- Time Scale Controls -->
  <div class="space-y-2">
    <div class="text-xs text-center text-gray-300">Time Scale:</div>
    <div class="flex flex-wrap justify-center gap-1">
      {#each timeScales as scale}
        <button
          onclick={() => setTimeScale(scale.value)}
          class="px-2 py-1 text-xs rounded {currentScale === scale.value ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors"
          title={scale.title}
        >
          {scale.label}
        </button>
      {/each}
    </div>
    
    <!-- Current scale indicator -->
    <div class="text-center text-xs text-yellow-300">
      Current: {currentScale}x {currentScale < 0 ? '(Reverse)' : ''}
    </div>
  </div>
  
  <!-- Reset Button -->
  <div class="flex justify-center mt-3">
    <button
      onclick={resetTime}
      class="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-500 rounded transition-colors"
    >
      🔄 Reset
    </button>
  </div>
  
  <!-- Keyboard hints -->
  <div class="text-xs text-center text-gray-400 mt-2">
    Space: Play/Pause | Ctrl+R: Reset
  </div>
</div>