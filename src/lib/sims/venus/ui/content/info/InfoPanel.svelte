<!-- src/lib/sims/venus/content/info/InfoPanel.svelte -->
<script lang="ts">
  import DataDisplay from './DataDisplay.svelte';
  // import MathDisplay from './MathDisplay.svelte';
  // import ChartDisplay from './ChartDisplay.svelte';
  
  // Props using runes
  let {
    altitude = 50,
    expanded = false
  } = $props<{
    altitude?: number;
    expanded?: boolean;
  }>();
  
  // State
  let activeTab = $state('data');
  let panelHeight = $state(expanded ? '80vh' : '300px');
  
  // Methods
  function setActiveTab(tab: string) {
    activeTab = tab;
  }
  
  function toggleExpand() {
    expanded = !expanded;
    panelHeight = expanded ? '80vh' : '300px';
  }
  
  // Update state based on props
  $effect(() => {
    panelHeight = expanded ? '80vh' : '300px';
  });
</script>

<div 
  class="fixed right-4 top-20 bg-black/90 rounded-md border border-orange-900/50 text-white z-20 overflow-hidden transition-all duration-300"
  style="width: 650px; height: {panelHeight};"
>
  <!-- Header -->
  <div class="flex justify-between items-center border-b border-orange-900/50 p-3">
    <h2 class="text-xl font-bold text-orange-400">Venus Information</h2>
    <div class="flex space-x-2">
      <button 
        class="p-1 hover:bg-gray-800 rounded"
        onclick={toggleExpand}
        title={expanded ? "Collapse panel" : "Expand panel"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          {#if expanded}
            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
          {:else}
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          {/if}
        </svg>
      </button>
      <button 
        class="p-1 hover:bg-gray-800 rounded"
        onclick={() => document.dispatchEvent(new CustomEvent('closeInfoPanel'))}
        title="Close panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Tab navigation -->
  <div class="flex border-b border-orange-900/50">
    <button 
      class="py-2 px-4 font-medium focus:outline-none"
      class:text-orange-400={activeTab === 'data'}
      class:border-b-2={activeTab === 'data'}
      class:border-orange-400={activeTab === 'data'}
      onclick={() => setActiveTab('data')}
    >
      Data
    </button>
    <button 
      class="py-2 px-4 font-medium focus:outline-none"
      class:text-orange-400={activeTab === 'chart'}
      class:border-b-2={activeTab === 'chart'}
      class:border-orange-400={activeTab === 'chart'}
      onclick={() => setActiveTab('chart')}
    >
      Chart
    </button>
    <button 
      class="py-2 px-4 font-medium focus:outline-none"
      class:text-orange-400={activeTab === 'math'}
      class:border-b-2={activeTab === 'math'}
      class:border-orange-400={activeTab === 'math'}
      onclick={() => setActiveTab('math')}
    >
      Calculations
    </button>
  </div>
  
  <!-- Content area -->
  <div class="p-4 overflow-y-auto" style="height: calc(100% - 92px);">
    {#if activeTab === 'data'}
      <DataDisplay selectedAltitude={altitude} />
    {:else if activeTab === 'chart'}
			ChartDisplay
		<!-- <ChartDisplay selectedAltitude={altitude} /> -->
    {:else if activeTab === 'math'}
			MathDisplay
      <!-- <MathDisplay altitude={altitude} /> -->
    {/if}
  </div>
</div>