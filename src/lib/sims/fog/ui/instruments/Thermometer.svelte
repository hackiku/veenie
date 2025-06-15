<!-- src/lib/sims/fog/ui/instruments/Thermometer.svelte -->
<script lang="ts">
  // Props
  let { 
    telemetry = { altitude: 55000, temperature: 27 },
    position = "bottom-right-offset",
    min = -100,
    max = 500,
    label = "Temp"
  } = $props();
  
  // Position classes  
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-right-offset": "fixed bottom-4 right-24",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle
  let useCelsius = $state(true);
  
  // Calculate display values
  const tempCelsius = $derived(telemetry.temperature);
  const tempKelvin = $derived(telemetry.temperature + 273.15);
  const displayTemp = $derived(useCelsius ? tempCelsius : tempKelvin);
  const displayPercentage = $derived(((tempCelsius - min) / (max - min)) * 100);
  
  // Format temperature
  function formatTemp(value: number, decimals = 0) {
    return value.toFixed(decimals);
  }
  
  // Toggle units
  function toggleUnits() {
    useCelsius = !useCelsius;
  }
  
  // Get temperature color
  function getTempColor(temp: number) {
    const normalized = (temp - min) / (max - min);
    
    if (normalized > 0.8) return '#FF2222'; // Very hot - red
    if (normalized > 0.6) return '#FF6644'; // Hot - orange
    if (normalized > 0.4) return '#FFAA44'; // Warm - yellow
    if (normalized > 0.2) return '#44AA88'; // Cool - teal
    return '#4488BB'; // Cold - blue
  }
  
  // Get tick values
  function getTickValues() {
    return [
      { position: 0, value: min },
      { position: 25, value: min + (max - min) * 0.25 },
      { position: 50, value: min + (max - min) * 0.5 },
      { position: 75, value: min + (max - min) * 0.75 },
      { position: 100, value: max }
    ];
  }
  
  const tickValues = $derived(getTickValues());
  
  // Special temperature markers for Venus
  const venusMarkers = [
    { temp: 0, label: 'H₂O freeze', color: '#4488FF' },
    { temp: 100, label: 'H₂O boil', color: '#FF4488' },
    { temp: 462, label: 'Venus surface', color: '#FF2222' }
  ];
</script>

<div class="{positionClasses[position]} z-30">
  <div class="bg-black/60 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 45px; height: 160px;">
    <!-- Label -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-semibold">
      {label}
    </div>
    
    <div class="relative flex-1 w-full mt-6 mb-2 mx-auto" style="height: calc(100% - 2rem);">
      <!-- Scale background -->
      <div class="absolute -left-6 top-0 bottom-0 w-6">
        <div class="absolute h-full w-px bg-white/40 left-1/2 transform -translate-x-1/2"></div>
        
        <!-- Tick marks -->
        {#each tickValues as tick}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {tick.position}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-2 bg-white"></div>
            <div class="absolute right-2 text-[8px] font-mono">
              {formatTemp(tick.value)}
            </div>
          </div>
        {/each}
        
        <!-- Venus temperature markers -->
        {#each venusMarkers as marker}
          {@const markerPos = ((marker.temp - min) / (max - min)) * 100}
          {#if markerPos >= 0 && markerPos <= 100}
            <div 
              class="absolute left-0 right-0 h-px opacity-60"
              style="bottom: {markerPos}%; background-color: {marker.color};"
              title={marker.label}
            ></div>
          {/if}
        {/each}
        
        <!-- Temperature indicator -->
        <div 
          class="absolute left-7 flex items-center z-10 transition-all duration-300" 
          style="bottom: {Math.max(0, Math.min(100, displayPercentage))}%; transform: translate(-50%, 50%);"
        >
          <!-- Pointer -->
          <div class="w-0 h-0 border-t-[4px] border-b-[4px] border-r-[6px] border-l-0 border-transparent border-r-white/90"></div>
          
          <!-- Value display -->
          <div 
            class="text-white px-1 py-0.5 text-[10px] font-mono font-bold rounded-sm ml-0.5"
            style="background-color: {getTempColor(tempCelsius)};"
          >
            {formatTemp(displayTemp)}{useCelsius ? '°' : 'K'}
          </div>
        </div>
      </div>
      
      <!-- Temperature gradient -->
      <div class="absolute right-1 top-0 bottom-0 w-2 rounded-full overflow-hidden">
        <div class="w-full h-full bg-gradient-to-b from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-600"></div>
      </div>
    </div>
    
    <!-- Unit toggle -->
    <button 
      class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80 cursor-pointer hover:text-blue-300 transition-colors"
      onclick={toggleUnits}
    >
      {useCelsius ? '°C' : 'K'}
    </button>
  </div>
</div>