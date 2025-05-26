<!-- src/lib/sims/balloon/ui/instruments/Thermometer.svelte -->
<script lang="ts">
  // Props with defaults
  let { 
    telemetry = { altitude: 0, temperature: 462 },
    position = "bottom-right-offset",
    min = -80, // -80°C to 200°C range
    max = 200,
    label = "Temp",
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-right-offset": "fixed bottom-4 right-34", // More spacing to clear altimeter
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle state
  let useCelsius = $state(true);
  
  // Venus atmospheric temperature data (altitude in meters, temp in Celsius)
  const venusTemperatureData = [
    { altitude: 0, temp: 462 },
    { altitude: 5000, temp: 424 },
    { altitude: 10000, temp: 385 },
    { altitude: 15000, temp: 348 },
    { altitude: 20000, temp: 306 },
    { altitude: 25000, temp: 264 },
    { altitude: 30000, temp: 222 },
    { altitude: 35000, temp: 180 },
    { altitude: 40000, temp: 143 },
    { altitude: 45000, temp: 110 },
    { altitude: 50000, temp: 75 },
    { altitude: 55000, temp: 27 },
    { altitude: 60000, temp: -10 },
    { altitude: 65000, temp: -30 },
    { altitude: 70000, temp: -43 },
    { altitude: 80000, temp: -76 },
    { altitude: 90000, temp: -104 },
    { altitude: 100000, temp: -112 }
  ];
  
  // Calculate temperature from altitude using Venus atmospheric data
  function calculateTemperature(altitude) {
    // Find the two data points to interpolate between
    for (let i = 0; i < venusTemperatureData.length - 1; i++) {
      const lower = venusTemperatureData[i];
      const upper = venusTemperatureData[i + 1];
      
      if (altitude >= lower.altitude && altitude <= upper.altitude) {
        // Linear interpolation
        const ratio = (altitude - lower.altitude) / (upper.altitude - lower.altitude);
        return lower.temp + (upper.temp - lower.temp) * ratio;
      }
    }
    
    // Handle edge cases
    if (altitude < venusTemperatureData[0].altitude) {
      return venusTemperatureData[0].temp;
    } else {
      return venusTemperatureData[venusTemperatureData.length - 1].temp;
    }
  }
  
  // Calculate temperature and display percentage
  $effect(() => {
    const tempCelsius = calculateTemperature(telemetry.altitude || 55000);
    const tempKelvin = tempCelsius + 273.15;
    
    // Cap temperature within min-max range
    const cappedTemp = Math.max(min, Math.min(max, tempCelsius));
    
    // Calculate percentage position on scale
    displayPercentage = ((cappedTemp - min) / (max - min)) * 100;
    
    // Store current values for display
    currentTemperature = useCelsius ? tempCelsius : tempKelvin;
  });
  
  // State
  let displayPercentage = $state(0);
  let currentTemperature = $state(462);
  
  // Format temperature
  function formatTemperature(value, decimals = 0) {
    if (typeof value !== 'number') return '0';
    return value.toFixed(decimals);
  }
  
  // Toggle between C and K
  function toggleUnits() {
    useCelsius = !useCelsius;
  }
  
  // Get tick values based on temperature range
  function getTickValues() {
    const range = max - min;
    return [
      { position: 0, value: min },
      { position: 20, value: min + range * 0.2 },
      { position: 40, value: min + range * 0.4 },
      { position: 60, value: min + range * 0.6 },
      { position: 80, value: min + range * 0.8 },
      { position: 100, value: max }
    ];
  }
  
  let tickValues = $state(getTickValues());
  
  // Temperature color based on value (red hot to blue cold)
  function getTemperatureColor(temp) {
    const normalizedTemp = (temp - min) / (max - min);
    
    if (normalizedTemp > 0.8) return '#FF4444'; // Very hot - red
    if (normalizedTemp > 0.6) return '#FF8844'; // Hot - orange  
    if (normalizedTemp > 0.4) return '#FFBB44'; // Warm - yellow
    if (normalizedTemp > 0.2) return '#88BB44'; // Cool - green
    return '#4488BB'; // Cold - blue
  }
  
  // Special temperature markers
  const specialTemps = [
    { temp: 0, label: 'H₂O freeze', color: '#4488FF' },
    { temp: 100, label: 'H₂O boil', color: '#FF4488' },
    { temp: 27, label: 'Cloud layer', color: '#FFAA44' },
    { temp: 462, label: 'Surface', color: '#FF2222' }
  ];
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container - half width -->
  <div class="bg-black/40 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 40px; height: 200px;">
    <!-- Label at the top -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-semibold">
      {label}
    </div>
    
    <div class="relative flex-1 w-full mt-6 mb-2 mx-auto" style="height: calc(100% - 2rem);">
      <!-- Ticks container (left side) -->
      <div class="absolute -left-4 top-0 bottom-0 w-4">
        <!-- Background scale line -->
        <div class="absolute h-full w-px bg-white/40 left-1/2 transform -translate-x-1/2"></div>
        
        <!-- Tick marks -->
        {#each tickValues as tick}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {tick.position}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-2 bg-white"></div>
            <div class="absolute right-2 text-[8px] font-mono">
              {formatTemperature(tick.value)}
            </div>
          </div>
        {/each}
        
        <!-- Minor ticks -->
        {#each [10, 30, 50, 70, 90] as pos}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {pos}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-1 bg-white/70"></div>
          </div>
        {/each}
        
        <!-- Special temperature markers - full width lines -->
        {#each specialTemps as special}
          {@const specialPos = ((special.temp - min) / (max - min)) * 100}
          {#if specialPos >= 0 && specialPos <= 100}
            <div 
              class="absolute left-0 right-0 h-px"
              style="bottom: {specialPos}%; background-color: {special.color}; opacity: 0.6;"
              title={special.label}
            ></div>
          {/if}
        {/each}
        
        <!-- Temperature indicator -->
        <div 
          class="absolute left-7 flex items-center z-10 transition-all" 
          style="bottom: {displayPercentage}%; transform: translate(-50%, 50%);"
        >
          <!-- Triangle pointer -->
          <div class="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-l-0 border-transparent border-r-white/90"></div>
          
          <!-- Temperature value box -->
          <div 
            class="text-white px-1 py-0.5 text-[10px] font-mono font-bold rounded-sm ml-0.5"
            style="background-color: {getTemperatureColor(currentTemperature)}; color: white;"
          >
            {formatTemperature(currentTemperature)}{useCelsius ? '°' : 'K'}
          </div>
        </div>
      </div>
      
      <!-- Temperature gradient (right side, closer to ticks) -->
      <div class="absolute right-1 top-0 bottom-0 w-2">
        <!-- Clip container to keep rounded edges -->
        <div class="w-full h-full rounded-full overflow-hidden relative">
          <!-- Temperature gradient from hot to cold (reversed) -->
          <div 
            class="w-full h-full absolute"
            style="
              background: linear-gradient(to bottom, 
                #BB4444 0%,
                #BB8844 25%,
                #BBBB44 50%,
                #44BB88 75%,
                #4488BB 100%
              );
            "
          ></div>
        </div>
      </div>
    </div>
    
    <!-- Unit toggle button at the bottom -->
    <button 
      class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80 cursor-pointer hover:text-blue-300 transition-colors bg-transparent border-none"
      onclick={toggleUnits}
      title="Click to toggle units"
    >
      {useCelsius ? '°C' : 'K'}
    </button>
  </div>
</div>

<!-- Temperature info tooltip -->
{#each specialTemps as special}
  {@const specialPos = ((special.temp - min) / (max - min)) * 100}
  {#if specialPos >= 0 && specialPos <= 100 && Math.abs(currentTemperature - special.temp) < 10}
    <div class="fixed {positionClasses[position].replace('bottom-4', 'bottom-4')} -translate-x-20 bg-black/80 text-white p-2 rounded text-xs pointer-events-none">
      {special.label}: {special.temp}°C
    </div>
  {/if}
{/each}