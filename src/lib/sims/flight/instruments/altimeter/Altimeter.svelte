<!-- src/lib/sims/flight/instruments/altimeter/Altimeter.svelte -->

<script lang="ts">
  import { ArrowUp, ArrowDown, MoveVertical } from 'lucide-svelte';
  import { flightStore } from '$lib/stores/flightStore';
  import { ALTITUDE } from '$lib/data/flight/constants';
  
  // Props
  const props = $state({
    referenceAltitude: ALTITUDE.CLOUD_LAYER,
    position: 'bottom-right',
    unit: 'km',
    verticalUnit: 'm/s'
  });
  
  // State
  let flightState = $state(null);
  let timeState = $state(null);
  let showMetric = $state(true);
  let qnhValue = $state(props.referenceAltitude);
  let showQnhInput = $state(false);
  let prevAltitude = $state(null);
  let verticalSpeed = $state(0);
  let lastUpdateTime = $state(Date.now());
  
  // Subscribe to the flight store
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
      
      // Calculate vertical speed
      const now = Date.now();
      const timeDelta = (now - lastUpdateTime) / 1000; // seconds
      
      if (prevAltitude !== null && timeDelta > 0) {
        const altitudeDelta = (state?.altitude || 0) - prevAltitude;
        // Convert km to m and calculate m/s
        verticalSpeed = (altitudeDelta * 1000) / timeDelta;
      }
      
      prevAltitude = state?.altitude || 0;
      lastUpdateTime = now;
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Safe accessor functions
  function safeAltitude() {
    if (!flightState || flightState.altitude === undefined || isNaN(flightState.altitude)) return 0;
    return flightState.altitude;
  }
  
  // Computed values
  const absoluteAltitude = $derived(safeAltitude());
  const relativeAltitude = $derived(absoluteAltitude - qnhValue);
  const relativeAltitudeMeters = $derived(relativeAltitude * 1000);
  
  // Conversion functions
  function kmToFeet(km) {
    return km * 3280.84;
  }
  
  function mPerSecToFtPerMin(mps) {
    return mps * 196.85;
  }
  
  // Format functions with unit conversion
  function formatAltitude(altitude) {
    if (showMetric) {
      return altitude.toFixed(2);
    } else {
      return Math.round(kmToFeet(altitude)).toLocaleString();
    }
  }
  
  function formatVerticalSpeed(speed) {
    if (showMetric) {
      return speed.toFixed(1);
    } else {
      return Math.round(mPerSecToFtPerMin(speed)).toLocaleString();
    }
  }
  
  function getLayerName(altitude) {
    if (altitude < 0) return "Below Surface";
    if (altitude < 10) return "Lower Atmosphere";
    if (altitude < ALTITUDE.LOWER_HAZE) return "Near Surface";
    if (altitude < 30) return "Lower Haze";
    if (altitude < ALTITUDE.LOWER_CLOUD) return "Approaching Clouds";
    if (altitude < ALTITUDE.CLOUD_LAYER) return "Lower Cloud";
    if (altitude < ALTITUDE.UPPER_CLOUD) return "Main Cloud";
    if (altitude < ALTITUDE.UPPER_HAZE) return "Upper Cloud";
    if (altitude < ALTITUDE.TOP_OF_ATMOSPHERE) return "Upper Haze";
    return "Outer Atmosphere";
  }
  
  // Generate altimeter tape markers
  function generateAltimeterMarkers(currentAltitude, range = 3) {
    const markers = [];
    const step = showMetric ? 0.1 : 100; // 100m or 100ft steps
    const mainStep = showMetric ? 1 : 1000; // 1km or 1000ft main steps
    
    // Calculate start and end based on current altitude in appropriate units
    let startAlt = showMetric 
      ? Math.floor(currentAltitude - range) 
      : Math.floor(kmToFeet(currentAltitude) - range * 1000);
    
    let endAlt = showMetric 
      ? Math.ceil(currentAltitude + range) 
      : Math.ceil(kmToFeet(currentAltitude) + range * 1000);
    
    // Generate all markers
    for (let alt = startAlt; alt <= endAlt; alt += step) {
      const isMainMark = alt % mainStep === 0;
      const displayValue = showMetric ? alt : alt;
      
      // Convert back to km for position calculation if in feet mode
      const kmValue = showMetric ? alt : alt / 3280.84;
      
      // Calculate position as percentage from bottom
      const position = ((kmValue - (currentAltitude - range)) / (range * 2)) * 100;
      
      if (position >= 0 && position <= 100) {
        markers.push({
          value: displayValue,
          position: position,
          isMain: isMainMark
        });
      }
    }
    
    return markers;
  }
  
  // Calculate altitude safety status
  function getAltitudeSafetyStatus(altitude) {
    if (altitude < 30 || altitude > 70) return 'danger';
    if (altitude < 45 || altitude > 65) return 'caution'; 
    return 'safe';
  }
  
  // Position classes
  const positionClassMap = {
    'bottom-right': 'fixed bottom-12 right-4',
    'bottom-left': 'fixed bottom-12 left-4',
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4'
  };
  
  // Toggle unit system
  function toggleUnits() {
    showMetric = !showMetric;
  }
  
  // Handle QNH update
  function handleQnhSubmit() {
    showQnhInput = false;
  }
  
  // Safety colors
  function getSafetyColor(status) {
    switch(status) {
      case 'danger': return 'text-red-400';
      case 'caution': return 'text-amber-400';
      case 'safe': return 'text-green-400';
      default: return 'text-white';
    }
  }
</script>

<div class="{positionClassMap[props.position]} bg-black/30 text-cyan-300 p-0 rounded-sm shadow-lg z-30 w-24 overflow-hidden" style="height: 400px;">
  <!-- Altimeter tape -->
  <div class="relative h-full w-full">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-blue-800/50 via-black/70 to-blue-800/50 z-0"></div>
    
    <!-- Layer markers - horizontal lines at key altitudes -->
    <div class="absolute inset-0 z-10">
      {#each Object.entries(ALTITUDE) as [name, value]}
        {@const relPosition = 50 - ((value - absoluteAltitude) / 6) * 100}
        {#if relPosition >= 0 && relPosition <= 100}
          <div class="absolute w-full h-px bg-cyan-800/70" style="top: {100 - relPosition}%"></div>
          <div class="absolute text-[8px] text-cyan-400/70 left-1" style="top: calc({100 - relPosition}% - 6px)">
            {name.charAt(0)}{name.charAt(1)}
          </div>
        {/if}
      {/each}
    </div>
    
    <!-- Altitude markers -->
    <div class="absolute inset-0 flex flex-col items-stretch z-20">
      {#each generateAltimeterMarkers(absoluteAltitude, 3) as marker}
        <div 
          class="absolute flex items-center h-6 right-0 left-0" 
          style="bottom: {marker.position}%;"
        >
          {#if marker.isMain}
            <div class="h-px w-full bg-cyan-400/70"></div>
            <div class="absolute left-2 text-sm font-mono font-bold">
              {showMetric 
                ? marker.value.toFixed(1) 
                : Math.round(marker.value).toString().padStart(5, '0')}
            </div>
          {:else}
            <div class="h-px w-6 bg-cyan-400/30 ml-auto mr-0"></div>
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Current altitude indicator -->
    <div class="absolute inset-x-0 flex items-center justify-end z-30" style="top: 50%; height: 24px; margin-top: -12px;">
      <!-- Pointer triangle -->
      <div class="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-cyan-400 mr-0"></div>
      
      <!-- Value display box -->
      <div class="bg-neutral-800/90 text-center px-1 border-l-2 border-l-cyan-400 rounded-sm">
        <div class="font-mono text-lg font-bold text-white">
          {showMetric 
            ? absoluteAltitude.toFixed(2)
            : Math.round(kmToFeet(absoluteAltitude)).toString().padStart(5, '0')}
        </div>
      </div>
    </div>
    
    <!-- Unit indicator -->
    <div class="absolute bottom-0 left-0 z-40 bg-black/50 px-1 rounded-tr-sm">
      <span class="text-xs text-cyan-300 font-mono cursor-pointer" onclick={toggleUnits}>
        {showMetric ? 'km' : 'ft'}
      </span>
    </div>
    
    <!-- Vertical speed indicator -->
    <div class="absolute top-2 inset-x-0 flex justify-center z-40">
      <div class="bg-black/70 px-2 py-1 rounded flex items-center gap-1">
        {#if verticalSpeed > 1}
          <ArrowUp size={12} class="text-green-400" />
        {:else if verticalSpeed < -1}
          <ArrowDown size={12} class="text-red-400" />
        {:else}
          <MoveVertical size={12} class="text-yellow-400" />
        {/if}
        
        <span class="font-mono text-xs {verticalSpeed > 1 ? 'text-green-400' : verticalSpeed < -1 ? 'text-red-400' : 'text-yellow-400'}">
          <!-- {formatVerticalSpeed(verticalSpeed)} {showMetric ? 'm/s' : 'ft/min'} -->
					{verticalSpeed} {showMetric ? 'm/s' : 'ft/min'}
        </span>
        <span class="mt-2 font-mono text-xs {verticalSpeed > 1 ? 'text-green-400' : verticalSpeed < -1 ? 'text-red-400' : 'text-yellow-400'}">
          <!-- {formatVerticalSpeed(verticalSpeed)} {showMetric ? 'm/s' : 'ft/min'} -->
        </span>
      </div>
    </div>
    
    <!-- Layer name -->
    <div class="absolute bottom-8 inset-x-0 flex justify-center z-40">
      <div class="bg-black/70 px-2 py-0.5 rounded-sm">
        <span class="text-[10px] font-mono {getSafetyColor(getAltitudeSafetyStatus(absoluteAltitude))}">
          {getLayerName(absoluteAltitude)}
        </span>
      </div>
    </div>
    
    <!-- QNH setting -->
    <div class="absolute bottom-1 right-0 z-40">
      {#if showQnhInput}
        <div class="bg-black/90 p-1 rounded-sm">
          <input 
            class="w-16 bg-neutral-900 text-white text-xs px-1 py-0.5 rounded-sm" 
            type="number" 
            bind:value={qnhValue}
            step="0.1"
          />
          <button 
            class="text-xs bg-cyan-800 text-white px-1 rounded-sm" 
            onclick={handleQnhSubmit}
          >
            Set
          </button>
        </div>
      {:else}
        <div 
          class="text-[9px] font-mono bg-black/50 px-1 py-0.5 text-cyan-200 cursor-pointer"
          onclick={() => showQnhInput = true}
        >
          QNH: {qnhValue} km
        </div>
      {/if}
    </div>
  </div>
</div>