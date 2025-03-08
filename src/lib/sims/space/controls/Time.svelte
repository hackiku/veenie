<!-- src/lib/sims/space/controls/Time.svelte -->
<script>
  // Props using runes
  let { speed = 1, onSpeedChange = undefined } = $props();
  
  // Handle speed adjustments
  function decreaseSpeed() {
    const newSpeed = Math.max(0.1, speed / 2);
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    }
  }
  
  function increaseSpeed() {
    const newSpeed = speed * 2;
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    }
  }
  
  function updateSpeed(event) {
    const newSpeed = parseFloat(event.target.value);
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    }
  }
</script>

<div class="mb-4">
  <label class="block text-sm font-medium mb-1">
    Simulation Speed: {speed.toFixed(1)} days/second
  </label>
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
      oninput={updateSpeed}
      class="w-full mx-2"
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