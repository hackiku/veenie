<!-- src/lib/sims/balloon/ui/Altimeter.svelte -->
<script lang="ts">
  // Props with defaults
  let { 
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 },
    position = "bottom-right",
    min = 0,
    max = 150, // 0-150 km range
    label = "Altitude",
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle state
  let useKilometers = $state(true);
  
  // Conversion factors
  const METERS_TO_FEET = 3.28084;
  
  // Calculate altitude percentage for display
  $effect(() => {
    // Handle in meters first (raw value)
    const altitudeMeters = telemetry.altitude;
    const altitudeKm = altitudeMeters / 1000;
    const altitudeFeet = altitudeMeters * METERS_TO_FEET;
    
    // Cap altitude within min-max range (in km)
    const cappedKm = Math.max(min, Math.min(max, altitudeKm));
    
    // Calculate percentage position on scale
    displayPercentage = ((cappedKm - min) / (max - min)) * 100;
    
    // Store current values for display
    currentAltitude = useKilometers ? altitudeKm : altitudeFeet;
  });
  
  // State
  let displayPercentage = $state(0);
  let currentAltitude = $state(0);
  
  // Format number with proper decimal places
  function formatNumber(value, decimals = 1) {
    if (typeof value === 'number') {
      return value.toFixed(decimals);
    }
    return '0.0';
  }
  
  // Format altitude based on current unit
  function formatAltitude(value, decimals = 2) {
    if (typeof value !== 'number') return '0.00';
    return value.toFixed(decimals);
  }
  
  // Toggle between km and ft
  function toggleUnits() {
    useKilometers = !useKilometers;
  }
  
  // Get tick values based on current unit
  function getTickValues() {
    if (useKilometers) {
      return [
        { position: 0, value: 0 },
        { position: 20, value: min + (max - min) * 0.2 },
        { position: 40, value: min + (max - min) * 0.4 },
        { position: 60, value: min + (max - min) * 0.6 },
        { position: 80, value: min + (max - min) * 0.8 },
        { position: 100, value: max }
      ];
    } else {
      // Feet values (converted from km)
      const minFeet = min * 1000 * METERS_TO_FEET;
      const maxFeet = max * 1000 * METERS_TO_FEET;
      const range = maxFeet - minFeet;
      
      return [
        { position: 0, value: minFeet },
        { position: 20, value: minFeet + range * 0.2 },
        { position: 40, value: minFeet + range * 0.4 },
        { position: 60, value: minFeet + range * 0.6 },
        { position: 80, value: minFeet + range * 0.8 },
        { position: 100, value: maxFeet }
      ];
    }
  }
  
  $effect(() => {
    tickValues = getTickValues();
  });
  
  let tickValues = $state(getTickValues());
  
  // Calculate the position of the gradient
  // The gradient is designed for 0-200km on a full scale
  // We need to position it so the color at max altitude is at the top of our container
  // Multiply by -1 because we're moving it upward (negative top)
  const gradientTopPosition = -1 * ((200 - max) / 200) * 100;
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container -->
  <div class="bg-black/40 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 85px; height: 240px;">
    <!-- Label at the top -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-semibold">
      {label}
    </div>
    
    <div class="relative flex-1 w-full mt-6 mb-2 mx-auto" style="height: calc(100% - 2rem);">
      <!-- Ticks container (left side) -->
      <div class="absolute left-0 top-0 bottom-0 w-8">
        <!-- Background scale line -->
        <div class="absolute h-full w-px bg-white/40 left-1/2 transform -translate-x-1/2"></div>
        
        <!-- Tick marks -->
        {#each tickValues as tick}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {tick.position}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-3 bg-white"></div>
            <div class="absolute right-4 text-[10px] font-mono">
              {useKilometers 
                ? formatNumber(tick.value, 1) 
                : formatNumber(tick.value / 1000, 0) + 'k'}
            </div>
          </div>
        {/each}
        
        <!-- Minor ticks -->
        {#each [10, 30, 50, 70, 90] as pos}
          <div class="absolute w-4 flex items-center justify-end" 
            style="bottom: {pos}%; left: 50%; transform: translateX(-100%);">
            <div class="h-px w-2 bg-white/70"></div>
          </div>
        {/each}
        
        <!-- Indicator triangle and value box -->
        <div 
          class="absolute left-7 flex items-center z-10 transition-all" 
          style="bottom: {displayPercentage}%; transform: translate(-50%, 50%);"
        >
          <!-- Triangle pointer -->
          <div class="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-l-0 border-transparent border-r-white/70"></div>
          
          <!-- Value box with balloon color -->
          <div class="bg-white/30 text-white px-2 py-0.5 text-xs font-mono font-regular rounded-sm ml-1">
            {formatAltitude(currentAltitude)}
          </div>
        </div>
      </div>
      
      <!-- Atmosphere gradient (right side) -->
      <div class="absolute right-2 top-0 bottom-0 w-3">
        <!-- Clip container to keep rounded edges -->
        <div class="w-full h-full rounded-full overflow-hidden relative">
          <!-- Venus atmosphere gradient - fixed scale but positioned to show correct colors -->
          <div 
            class="w-full h-full absolute"
            style="
              background: linear-gradient(to bottom, 
                #080808 0%,
                #4D7899 17%,
                #85C9FE 34%,
                #A2BEC6 54%,
                #E4DEB7 64%,
                #BFBD97 72%,
                #E1DCBB 77%,
                #DACDAB 80%,
                #FFEDBF 84%,
                #FEDD91 90%,
                #FDBD4B 95%,
                #F6A309 100%
              );
              bottom: {gradientTopPosition}%;
              height: 100%;
            "
          ></div>
        </div>
      </div>
    </div>
    
    <!-- Unit at the bottom (clickable) -->
    <button 
      class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80 cursor-pointer hover:text-blue-300 transition-colors"
      onclick={toggleUnits}
      title="Click to toggle units"
    >
      {useKilometers ? 'km' : 'ft'}
	</button>
  </div>
</div>