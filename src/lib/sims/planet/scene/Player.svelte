<!-- src/lib/sims/planet/Player.svelte -->
<script>
  import { Play, Pause, FastForward, Rewind } from 'lucide-svelte';
  
  // State 
  let playing = $state(false);
  let speed = $state(1); // simulation speed
  
  // Speed presets
  const speedOptions = [0.1, 0.5, 1, 2, 5, 10];
  
  // Methods
  function togglePlay() {
    playing = !playing;
  }
  
  function speedUp() {
    const currentIndex = speedOptions.indexOf(speed);
    if (currentIndex < speedOptions.length - 1) {
      speed = speedOptions[currentIndex + 1];
    }
  }
  
  function slowDown() {
    const currentIndex = speedOptions.indexOf(speed);
    if (currentIndex > 0) {
      speed = speedOptions[currentIndex - 1];
    }
  }
</script>

<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-2 rounded-full flex items-center space-x-2 z-10">
  <button 
    class="p-1 hover:bg-gray-700 rounded-full"
    onclick={slowDown}
    disabled={speed === speedOptions[0]}
  >
    <Rewind size={20} />
  </button>
  
  <button 
    class="p-2 hover:bg-gray-700 rounded-full"
    onclick={togglePlay}
  >
    {#if playing}
      <Pause size={24} />
    {:else}
      <Play size={24} />
    {/if}
  </button>
  
  <button 
    class="p-1 hover:bg-gray-700 rounded-full"
    onclick={speedUp}
    disabled={speed === speedOptions[speedOptions.length - 1]}
  >
    <FastForward size={20} />
  </button>
  
  <div class="text-xs bg-gray-800 px-2 py-1 rounded ml-2">
    {speed}x
  </div>
</div>