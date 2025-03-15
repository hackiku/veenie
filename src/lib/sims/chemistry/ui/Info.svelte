<!-- src/lib/sims/chemistry/ui/Info.svelte -->
<script lang="ts">
  import { CHEMICAL_REACTIONS } from '$lib/data/chemistry/constants';
  
  // Props
  let { showInfo = false } = $props();
  
  // Events
  function dispatch(name) {
    return () => {
      const event = new CustomEvent(name);
      dispatchEvent(event);
    };
  }
  
  const dispatchToggle = dispatch('toggleInfo');
  
  // Chemical equation formatting
  function formatEquation(equation: string) {
    return equation
      .replace(/(\d+)/g, '<sub>$1</sub>')
      .replace(/→/g, '→')
      .replace(/\+/g, ' + ');
  }
</script>

<!-- Info button -->
{#if !showInfo}
  <button 
    class="fixed top-4 right-4 bg-green-800/80 text-white px-3 py-1.5 rounded z-50 text-sm hover:bg-green-700/80 transition shadow flex items-center gap-2"
    onclick={() => dispatchEvent(new CustomEvent('toggleInfo'))}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
    ISRU Chemistry
  </button>
{/if}

<!-- Information panel -->
{#if showInfo}
  <div class="fixed top-4 right-4 w-96 max-h-[calc(100vh-2rem)] overflow-y-auto bg-black/80 backdrop-blur-md text-white p-4 rounded-lg shadow-lg z-50">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-green-400">Venus ISRU Chemistry</h2>
      <button
        aria-label="Toggle info button"
        class="text-gray-400 hover:text-white"
        onclick={() => dispatchEvent(new CustomEvent('toggleInfo'))}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Content sections remain the same -->
  </div>
{/if}