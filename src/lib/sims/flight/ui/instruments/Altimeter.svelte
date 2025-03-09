<!-- src/lib/sims/flight/ui/instruments/Altimeter.svelte -->

<script>
  import { ArrowUp, ArrowDown, MoveVertical, Gauge } from 'lucide-svelte';
  import { flightStore } from '$lib/stores/flightStore';
  import { createAltimeterData } from '../../physics/motion';
  import { ALTITUDE } from '$lib/data/flight/constants';
  
  // Props
  const { 
    referenceAltitude = ALTITUDE.CLOUD_LAYER,
    position = 'bottom-right'
  } = $props();
  
  // State
  let flightState = $state(null);
  
  // Subscribe to the flight store
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Computed altimeter data
  const altimeterData = $derived(
    flightState ? createAltimeterData(flightState.altitude, referenceAltitude) : null
  );
  
  // Position classes
  const positionClassMap = {
    'bottom-right': 'fixed bottom-12 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4'
  };
  
  const positionClass = $derived(positionClassMap[position] || positionClassMap['bottom-right']);
  
  // Color functions
  function getAltitudeColor(safetyStatus) {
    switch (safetyStatus) {
      case 'danger': return 'text-red-400';
      case 'caution': return 'text-amber-400';
      case 'safe': return 'text-green-400';
      default: return 'text-white';
    }
  }
  
  function getTrendIcon(trend) {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return MoveVertical;
    }
  }
</script>

<div class="{positionClass} bg-black/40 text-white p-3 rounded-lg shadow-lg z-20 backdrop-blur-sm w-44">
  <h3 class="text-md mb-2 font-semibold flex items-center gap-2">
    <Gauge size={18} />
    <span>Altimeter</span>
  </h3>
  
  {#if altimeterData}
    <div class="grid grid-cols-1 gap-y-2 text-xs">
      <!-- Absolute altitude -->
      <div class="flex items-center justify-between">
        <span>Altitude:</span>
        <span class="font-bold {getAltitudeColor(altimeterData.safetyStatus)}">
          {altimeterData.absoluteAltitude} km
        </span>
      </div>
      
      <!-- Relative altitude -->
      <div class="flex items-center justify-between">
        <span>Relative:</span>
        <span class="font-bold">
          {altimeterData.relativeAltitude >= 0 ? '+' : ''}{altimeterData.relativeAltitude} m
        </span>
      </div>
      
      <!-- Current layer -->
      <div class="flex items-center justify-between">
        <span>Layer:</span>
        <span class="font-bold">{altimeterData.layer}</span>
      </div>
      
      <!-- Trend indicator -->
      <div class="mt-1 p-1 rounded bg-black/40 flex items-center justify-between">
        <span>Trend:</span>
        <div class="flex items-center gap-1">
          <svelte:component 
            this={getTrendIcon(altimeterData.verticalTrend)} 
            size={14} 
            class={getAltitudeColor(altimeterData.safetyStatus)}
          />
          <span class={getAltitudeColor(altimeterData.safetyStatus)}>
            {altimeterData.verticalTrend}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Reference altitude setting (QNH) -->
    <div class="mt-2 text-xs flex items-center justify-between">
      <span class="text-gray-400">QNH:</span>
      <span>{referenceAltitude} km</span>
    </div>
  {/if}
</div>