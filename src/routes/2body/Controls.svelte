<!-- src/routes/2body/Controls.svelte -->
<script>
  // Props using runes
  let {
    gravityStrength = 6.674e-2,
    initialVelocity = 2,
    moonMass = 0.1,
    showDebug = false,
    onDebugToggle = () => {}
  } = $props();
  
  // Local state
  let expanded = $state(true);
  
  // Methods
  function toggleControls() {
    expanded = !expanded;
  }
  
  // Prevent events from bubbling to Threlte
  function stopPropagation(e) {
    e.stopPropagation();
  }
</script>

<div 
  class="controls bg-black/80 backdrop-blur text-white rounded-lg overflow-hidden transition-all duration-300"
  class:w-60={expanded}
  class:w-10={!expanded}
  on:pointerdown={stopPropagation}
  on:pointermove={stopPropagation}
  on:wheel={stopPropagation}
>
  <div class="flex justify-between items-center p-3 border-b border-gray-700">
    <h2 class={expanded ? 'text-lg font-bold' : 'hidden'}>Orbit Controls</h2>
    <button 
      class="p-1.5 bg-indigo-800 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      on:click={toggleControls}
    >
      {expanded ? '←' : '→'}
    </button>
  </div>
  
  {#if expanded}
    <div class="p-4 space-y-4">
      <div class="space-y-2">
        <label for="gravity" class="block text-sm font-medium">
          Gravity: {gravityStrength.toFixed(3)}
        </label>
        <input 
          type="range" 
          id="gravity" 
          min="0.001" 
          max="0.2" 
          step="0.001" 
          bind:value={gravityStrength}
          class="w-full"
        />
      </div>
      
      <div class="space-y-2">
        <label for="velocity" class="block text-sm font-medium">
          Initial Velocity: {initialVelocity.toFixed(1)}
        </label>
        <input 
          type="range" 
          id="velocity" 
          min="0.5" 
          max="5" 
          step="0.1" 
          bind:value={initialVelocity}
          class="w-full"
        />
      </div>
      
      <div class="space-y-2">
        <label for="mass" class="block text-sm font-medium">
          Moon Mass: {moonMass.toFixed(2)}
        </label>
        <input 
          type="range" 
          id="mass" 
          min="0.01" 
          max="1" 
          step="0.01" 
          bind:value={moonMass}
          class="w-full"
        />
      </div>
      
      <div class="pt-2 border-t border-gray-700">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            bind:checked={showDebug} 
            on:change={onDebugToggle}
            class="w-4 h-4"
          />
          <span class="text-sm">Show Debug View</span>
        </label>
      </div>
      
      <div class="pt-2 text-xs text-gray-400 space-y-1">
        <p>• Click & drag to rotate view</p>
        <p>• Scroll to zoom</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .controls {
    position: absolute;
    z-index: 50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    background: #4b5563;
    border-radius: 4px;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #818cf8;
    border-radius: 50%;
    cursor: pointer;
  }
</style>