<!-- src/lib/sims/chemistry/ui/CompAnalyzer.svelte -->

<script>
  import { chemistryStore } from '$lib/stores/chemistryStore';
  import { 
    getCompositionAtAltitude, 
    getTemperatureAtAltitude, 
    getPressureAtAltitude 
  } from '$lib/data/chemistry/atmosphericComposition';
  
  // Props
  const props = $state({ 
    position: 'top-right',
  });
  
  // State
  let chemState = $state(null);
  let showPercentView = $state(true);
  let expandedView = $state(false);
  
  // Subscribe to the chemistry store
  $effect(() => {
    const unsubChemStore = chemistryStore.subscribe(state => {
      chemState = state;
    });
    
    return () => {
      unsubChemStore();
    };
  });
  
  // Current altitude (in km)
  const altitude = $derived(chemState?.altitude || 50);
  
  // Get composition data based on current altitude
  const composition = $derived(getCompositionAtAltitude(altitude));
  const temperature = $derived(getTemperatureAtAltitude(altitude));
  const pressure = $derived(getPressureAtAltitude(altitude));
  
  // Toggle between percentage and ppm view
  function toggleView() {
    showPercentView = !showPercentView;
  }
  
  // Toggle expanded/compact view
  function toggleExpandedView() {
    expandedView = !expandedView;
  }
  
  // Format value as percentage or ppm
  function formatValue(value) {
    if (showPercentView) {
      return (value * 100).toFixed(2) + '%';
    } else {
      return (value * 1000000).toFixed(0) + ' ppm';
    }
  }
  
  // Get color based on gas type
  function getGasColor(gas) {
    const colorMap = {
      'CO2': 'bg-red-400',
      'N2': 'bg-blue-400',
      'SO2': 'bg-yellow-400',
      'H2O': 'bg-cyan-400',
      'H2SO4': 'bg-purple-400',
      'HCl': 'bg-emerald-400',
      'HF': 'bg-lime-400',
      'CO': 'bg-rose-400',
      'OCS': 'bg-amber-400',
      'S2': 'bg-orange-400',
      'Ar': 'bg-gray-400',
      'He': 'bg-indigo-400',
      'Ne': 'bg-pink-400'
    };
    
    return colorMap[gas] || 'bg-gray-400';
  }
  
  // Calculate if a gas is worth extracting based on abundance
  function isExtractionWorthy(gas, value) {
    if (gas === 'CO2' && value > 0.9) return true;
    if (gas === 'N2' && value > 0.03) return true;
    if (gas === 'SO2' && value > 0.0001) return true;
    if (gas === 'H2O' && value > 0.00001) return true;
    if (gas === 'H2SO4' && value > 0.000001) return true;
    return false;
  }
  
  // Position classes
  const positionClassMap = {
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4'
  };
</script>

<div class="{positionClassMap[props.position]} bg-black/30 text-white p-4 rounded-lg shadow-lg z-30 backdrop-blur-sm w-80">
  <div class="flex justify-between items-center mb-3">
    <h3 class="text-lg font-bold">Atmospheric Composition</h3>
    <div class="flex gap-2">
      <button 
        on:click={toggleView} 
        class="text-xs px-2 py-1 bg-green-800/70 hover:bg-green-700 rounded"
      >
        {showPercentView ? '%' : 'ppm'}
      </button>
      <button 
        on:click={toggleExpandedView} 
        class="text-xs px-2 py-1 bg-blue-800/70 hover:bg-blue-700 rounded"
      >
        {expandedView ? 'Compact' : 'Expanded'}
      </button>
    </div>
  </div>
  
  <div class="mb-4">
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div class="flex items-center">
        <span class="w-28">Altitude:</span>
        <span class="font-bold text-green-300">{altitude.toFixed(1)} km</span>
      </div>
      <div class="flex items-center">
        <span class="w-28">Temperature:</span>
        <span class="font-bold text-amber-300">{temperature.toFixed(1)} K</span>
      </div>
      <div class="flex items-center">
        <span class="w-28">Pressure:</span>
        <span class="font-bold text-blue-300">{pressure.toFixed(2)} bar</span>
      </div>
    </div>
  </div>
  
  <!-- Composition bars with percentage values -->
  <div class="space-y-2">
    {#each Object.entries(composition) as [gas, value]}
      {#if value > 0.00001 || expandedView}
        <div class="flex flex-col">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm">{gas}</span>
            <span class="text-sm font-mono">{formatValue(value)}</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              class="h-full rounded-full {getGasColor(gas)}" 
              style="width: {Math.max(0.5, value * 100)}%"
            ></div>
          </div>
          {#if isExtractionWorthy(gas, value)}
            <div class="text-xs text-green-400 mt-1">✓ Extraction candidate</div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  
  <div class="mt-4 text-xs text-gray-400">
    <p>Venus atmosphere is primarily CO₂ with trace sulfuric compounds.</p>
    <p>ISRU potential increases at 45-65 km altitude range.</p>
  </div>
</div>