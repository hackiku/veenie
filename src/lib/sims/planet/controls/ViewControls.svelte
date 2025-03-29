<!-- src/lib/sims/planet/controls/view/ViewControls.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  
  // Get planet context
  const planetContext = getContext('planetContext');
  
  // Local state to track controls
  let currentScale = $state(planetContext.getScale());
  let showAtmosphere = $state(planetContext.getShowAtmosphere());
  let showControls = $state(true);
  
  // Update local state when context changes
  $effect(() => {
    currentScale = planetContext.getScale();
    showAtmosphere = planetContext.getShowAtmosphere();
  });
  
  // Methods to interact with context
  function setScale(scale) {
    planetContext.setScale(scale);
  }
  
  function toggleAtmosphere() {
    planetContext.toggleAtmosphere();
  }
  
  function toggleControls() {
    planetContext.toggleControls();
  }
</script>

{#if showControls}
  <div class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white max-w-xs">
    <h2 class="text-xl font-bold mb-2">Venus Simulation</h2>
    
    <!-- Scale Selection -->
    <div class="mb-4">
      <div class="text-sm font-medium mb-2">View Scale:</div>
      <div class="grid grid-cols-3 gap-2">
        <button 
          class="px-2 py-1 rounded text-xs {currentScale === 'space' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
          onclick={() => setScale('space')}
        >
          Space
        </button>
        <button 
          class="px-2 py-1 rounded text-xs {currentScale === 'planet' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
          onclick={() => setScale('planet')}
        >
          Planet
        </button>
        <button 
          class="px-2 py-1 rounded text-xs {currentScale === 'atmosphere' ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}"
          onclick={() => setScale('atmosphere')}
        >
          Atmosphere
        </button>
      </div>
    </div>
    
    <!-- Atmosphere Toggle -->
    <div class="mb-4">
      <div class="text-sm font-medium mb-2">Atmosphere:</div>
      <div class="flex items-center mb-2">
        <label class="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={showAtmosphere}
            onchange={toggleAtmosphere}
            class="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          <span class="ml-3 text-sm font-medium">Show Atmosphere</span>
        </label>
      </div>
    </div>
    
    <button
      class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm w-full"
      onclick={toggleControls}
    >
      Hide Controls
    </button>
  </div>
{:else}
  <button
    class="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/70 rounded text-white text-sm"
    onclick={toggleControls}
  >
    Show Controls
  </button>
{/if}