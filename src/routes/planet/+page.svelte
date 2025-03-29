<!-- src/routes/planet/+page.svelte -->
<script lang="ts">
  import PlanetSim from '$lib/sims/planet/PlanetSim.svelte';
  import DataDisplay from '$lib/sims/planet/ui/info/DataDisplay.svelte';
  // import Menu from '$lib/ui/Menu.svelte';


  // Page state
  let showInfo = $state(false);
  let selectedAltitude = $state(50); // km
  
  function toggleInfo() {
    showInfo = !showInfo;
  }
</script>


<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <PlanetSim />
</div>

<!-- Info panel -->
{#if showInfo}
  <div class="fixed left-4 top-4 bg-black/90 p-4 rounded-md border border-orange-900/50 text-white z-10 w-96 overflow-y-scroll max-h-screen">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold text-orange-400">Venus</h2>
      <button 
        class="text-gray-400 hover:text-white"
        onclick={toggleInfo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">
        Altitude: {selectedAltitude} km
      </label>
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="1" 
        value={selectedAltitude}
        oninput={(e) => selectedAltitude = parseFloat(e.currentTarget.value)}
        class="w-full"
      />
    </div>
    
    <DataDisplay selectedAltitude={selectedAltitude} />
  </div>
{:else}
  <button 
    class="fixed left-4 top-4 px-3 py-1 bg-black/70 hover:bg-black/90 rounded text-white text-sm z-10"
    onclick={toggleInfo}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
    Venus Data
  </button>
{/if}