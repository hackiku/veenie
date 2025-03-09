<!-- src/lib/sims/flight/ui/instruments/altimeter/Altimeter.svelte -->

<script>
  import { flightStore } from '$lib/stores/flightStore';
  import { ALTITUDE } from '$lib/data/flight/constants';
  import AltimeterTape from './AltimeterTape.svelte';
  import VerticalSpeed from './VerticalSpeed.svelte';
  import LayerIndicator from './LayerIndicator.svelte';
  
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
  
  // Toggle unit system
  function toggleUnits() {
    showMetric = !showMetric;
  }
  
  // Handle QNH update
  function handleQnhSubmit() {
    showQnhInput = false;
  }
  
  // Position classes
  const positionClassMap = {
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4'
  };
</script>

<div class="{positionClassMap[props.position]} bg-black/20 text-cyan-300 p-0 rounded-sm shadow-lg z-30 w-24 overflow-hidden" style="height: 400px;">
  <!-- Main altimeter container with higher transparency -->
  <div class="relative h-full w-full">
    <!-- Background gradient - more transparent -->
    <div class="absolute inset-0 bg-gradient-to-b from-blue-800/30 via-black/40 to-blue-800/30 z-0"></div>
    
    <!-- Altitude tape component -->
    <AltimeterTape 
      altitude={absoluteAltitude}
      showMetric={showMetric}
      layers={ALTITUDE}
      kmToFeet={kmToFeet}
    />
    
    <!-- Vertical speed indicator -->
    <div class="absolute top-2 inset-x-0 flex justify-center z-40">
      <VerticalSpeed 
        speed={verticalSpeed} 
        showMetric={showMetric} 
        mPerSecToFtPerMin={mPerSecToFtPerMin}
      />
    </div>
    
    <!-- Layer name display -->
    <div class="absolute bottom-8 inset-x-0 flex justify-center z-40">
      <LayerIndicator altitude={absoluteAltitude} />
    </div>
    
    <!-- Unit indicator -->
    <div class="absolute bottom-0 left-0 z-40 bg-black/40 px-1 rounded-tr-sm">
      <span class="text-xs text-cyan-300 font-mono cursor-pointer" onclick={toggleUnits}>
        {showMetric ? 'km' : 'ft'}
      </span>
    </div>
    
    <!-- QNH setting -->
    <div class="absolute bottom-1 right-0 z-40">
      {#if showQnhInput}
        <div class="bg-black/70 p-1 rounded-sm">
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
          class="text-[9px] font-mono bg-black/40 px-1 py-0.5 text-cyan-200 cursor-pointer"
          onclick={() => showQnhInput = true}
        >
          QNH: {qnhValue} km
        </div>
      {/if}
    </div>
  </div>
</div>