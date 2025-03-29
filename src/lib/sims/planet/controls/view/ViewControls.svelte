<!-- src/lib/sims/planet/controls/view/ViewControls.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  
  // Get planet context
  const planetContext = getContext('planetContext');
  
  // Local state to track controls
  let currentScale = $state(planetContext.getScale());
  let showAtmosphere = $state(planetContext.getShowAtmosphere());
  let showControls = $state(true);
  let showGrid = $state(planetContext.getShowGrid ? planetContext.getShowGrid() : false);
  let expanded = $state(true);
  
  // Update local state when context changes
  $effect(() => {
    currentScale = planetContext.getScale();
    showAtmosphere = planetContext.getShowAtmosphere();
    if (planetContext.getShowGrid) {
      showGrid = planetContext.getShowGrid();
    }
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
  
  function toggleGrid() {
    if (planetContext.toggleGrid) {
      planetContext.toggleGrid();
    }
  }
  
  // Toggle expanded state
  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<div 
  class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white max-w-xs transition-all duration-200"
  class:h-12={!expanded}
>
  {#if expanded}
    <div class="flex justify-between items-center mb-2 cursor-pointer" onclick={toggleExpanded}>
      <h2 class="text-xl font-bold">Views</h2>
      <button class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
        </svg>
      </button>
    </div>
    
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
    
    <!-- Toggle Controls -->
    <div class="mb-4">
      <div class="text-sm font-medium mb-2">Display Options:</div>
      <div class="grid grid-cols-2 gap-2">
        <!-- Atmosphere Toggle -->
        <div class="flex items-center p-2 bg-gray-800/70 rounded">
          <label class="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showAtmosphere}
              onchange={toggleAtmosphere}
              class="sr-only peer"
            />
            <div class="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
            <span class="ml-2 text-xs font-medium">Atmosphere</span>
          </label>
        </div>
        
        <!-- Grid Toggle -->
        <div class="flex items-center p-2 bg-gray-800/70 rounded">
          <label class="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showGrid}
              onchange={toggleGrid}
              class="sr-only peer"
            />
            <div class="relative w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
            <span class="ml-2 text-xs font-medium">Grid</span>
          </label>
        </div>
      </div>
    </div>
  
  {:else}
    <!-- Collapsed view - just show title that can be clicked -->
    <div type="button" class="flex justify-between items-center cursor-pointer h-full" onclick={toggleExpanded}>
      <h2 class="text-lg font-bold ">Views</h2>
      <button class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" />
          <path fill-rule="evenodd" d="M4 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" />
        </svg>
      </button>
    </div>
  {/if}
</div>