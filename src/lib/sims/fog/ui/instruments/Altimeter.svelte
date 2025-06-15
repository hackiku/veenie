<!-- src/lib/sims/fog/ui/instruments/Altimeter.svelte -->
<script lang="ts">
  // Props
  let { 
    telemetry = { altitude: 55000, atmosphericLayer: 'Cloud Layer' },
    position = "bottom-right",
    min = 0,
    max = 200, // 0-200 km range
    label = "Altitude"
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4", 
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle
  let useKilometers = $state(true);
  
  // Calculate display values
  const altitudeKm = $derived(telemetry.altitude / 1000);
  const altitudeFeet = $derived(telemetry.altitude * 3.28084);
  const displayAltitude = $derived(useKilometers ? altitudeKm : altitudeFeet);
  const displayPercentage = $derived(((altitudeKm - min) / (max - min)) * 100);
  
  // Format number
  function formatNumber(value: number, decimals = 1) {
    return value.toFixed(decimals);
  }
  
  // Toggle units
  function toggleUnits() {
    useKilometers = !useKilometers;
  }
  
  // Get tick values
  function getTickValues() {
    if (useKilometers) {
      return [
        { position: 0, value: 0 },
        { position: 25, value: 50 },
        { position: 50, value: 100 },
        { position: 75, value: 150 },
        { position: 100, value: 200 }
      ];
    } else {
      // Feet values
      return [
        { position: 0, value: 0 },
        { position: 25, value: 164000 }, // ~50km
        { position: 50, value: 328000 }, // ~100km  
        { position: 75, value: 492000 }, // ~150km
        { position: 100, value: 656000 } // ~200km
      ];
    }
  }
  
  const tickValues = $derived(getTickValues());
</script>

<div class="{positionClasses[position]} z-30">
  <div class="bg-black/60 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 90px; height: 200px;">
    <!-- Label -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-semibold">
      {label}
    </div>
    
    <div class="relative flex-1 w-full mt-6 mb-2 mx-auto" style="height: calc(100% - 2rem);">
      <!-- Scale background -->
      <div class="absolute left-0 top-0 bottom-0 w-8">
        <div class="absolute h-full w-px bg-white/40 left-1/2 transform -translate-x-1/2"></div>
        
        <!-- Tick marks -->
        {#each tickValues as tick}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {tick.position}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-3 bg-white"></div>
            <div class="absolute right-4 text-[9px] font-mono">
              {useKilometers 
                ? formatNumber(tick.value, 0) 
                : formatNumber(tick.value / 1000, 0) + 'k'}
            </div>
          </div>
        {/each}
        
        <!-- Altitude indicator -->
        <div 
          class="absolute left-7 flex items-center z-10 transition-all duration-300" 
          style="bottom: {Math.max(0, Math.min(100, displayPercentage))}%; transform: translate(-50%, 50%);"
        >
          <!-- Pointer -->
          <div class="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[8px] border-l-0 border-transparent border-r-orange-400"></div>
          
          <!-- Value display -->
          <div class="bg-orange-400/90 text-black px-2 py-1 text-xs font-mono font-bold rounded-sm ml-1">
            {formatNumber(displayAltitude, 1)}
          </div>
        </div>
      </div>
      
      <!-- Atmosphere gradient -->
      <div class="absolute right-2 top-0 bottom-0 w-3 rounded-full overflow-hidden">
        <div class="w-full h-full bg-gradient-to-b from-gray-800 via-blue-400 via-yellow-300 to-orange-600"></div>
      </div>
    </div>
    
    <!-- Unit toggle -->
    <button 
      class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80 cursor-pointer hover:text-orange-300 transition-colors"
      onclick={toggleUnits}
    >
      {useKilometers ? 'km' : 'ft'}
    </button>
    
    <!-- Layer indicator -->
    <div class="absolute -bottom-8 left-0 right-0 text-center text-xs text-orange-300 font-mono">
      {telemetry.atmosphericLayer}
    </div>
  </div>
</div>