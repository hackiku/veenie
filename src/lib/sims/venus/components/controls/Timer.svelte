<!-- src/lib/sims/venus/gui/controls/Timer.svelte -->
<script lang="ts">
  // Props using runes
  let { 
    speed = 1,
    onSpeedChange = (value: number) => {}
  } = $props<{
    speed: number;
    onSpeedChange?: (value: number) => void;
  }>();
  
  // Handle speed decrease
  function decreaseSpeed() {
    onSpeedChange(Math.max(0.1, speed / 2));
  }
  
  // Handle speed increase
  function increaseSpeed() {
    onSpeedChange(speed * 2);
  }
  
  // Handle input change
  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    onSpeedChange(parseFloat(target.value));
  }
</script>

<div class="mb-4">
  <div class="block text-sm font-medium mb-1">
    Simulation Speed: {speed.toFixed(1)} days/second
  </div>
  <div class="flex items-center">
    <button 
      class="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-l"
      onclick={decreaseSpeed}
    >
      -
    </button>
    <input 
      type="range" 
      min="0.1" 
      max="365" 
      step="0.1" 
      value={speed}
      oninput={handleInputChange}
      class="w-full mx-2"
      aria-label="Simulation Speed"
    />
    <button 
      class="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-r"
      onclick={increaseSpeed}
    >
      +
    </button>
  </div>
  <div class="text-xs text-gray-400 mt-1">
    Use ↑/↓ arrows to adjust speed
  </div>
</div>