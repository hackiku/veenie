<!-- src/lib/sims/flight/controls/Controls.svelte -->

<script>
  import { flightStore } from '$lib/stores/flightStore';
  import { venusData } from '../physics/data';
  
  // State for flight
  let flightState = $state(null);
  
  // Subscribe to flight store using $effect
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Derive playing state
  const playing = $derived(flightState?.playing || false);
  
  // Controls state object
  const controls = $state({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    buoyancyUp: false,
    buoyancyDown: false
  });
  
  // Buoyancy controls
  let buoyancyForce = $state(venusData.controls.defaultBuoyancy);
  const maxBuoyancy = venusData.controls.maxBuoyancy;
  const minBuoyancy = venusData.controls.minBuoyancy;
  const buoyancyStep = venusData.controls.buoyancyStep;
  
  // Handle key down
  function handleKeyDown(event) {
    if (!playing) return;
    
    switch(event.key) {
      // WASD for flight controls
      case 'w': controls.forward = true; break;
      case 'a': controls.left = true; break;
      case 's': controls.backward = true; break;
      case 'd': controls.right = true; break;
      // Space and Shift for vertical movement
      case ' ': controls.up = true; event.preventDefault(); break;
      case 'Shift': controls.down = true; break;
      // Arrow up/down for buoyancy control (trim)
      case 'ArrowUp': controls.buoyancyUp = true; event.preventDefault(); break;
      case 'ArrowDown': controls.buoyancyDown = true; event.preventDefault(); break;
    }
    
    // Update the flight store with current controls
    flightStore.updateControls({
      ...controls,
      buoyancyForce
    });
  }
  
  // Handle key up
  function handleKeyUp(event) {
    switch(event.key) {
      case 'w': controls.forward = false; break;
      case 'a': controls.left = false; break;
      case 's': controls.backward = false; break;
      case 'd': controls.right = false; break;
      case ' ': controls.up = false; break;
      case 'Shift': controls.down = false; break;
      case 'ArrowUp': controls.buoyancyUp = false; break;
      case 'ArrowDown': controls.buoyancyDown = false; break;
    }
    
    // Update the flight store with current controls
    flightStore.updateControls({
      ...controls,
      buoyancyForce
    });
  }
  
  // Update buoyancy based on controls
  $effect(() => {
    if (!playing) return;
    
    if (controls.buoyancyUp) {
      buoyancyForce = Math.min(buoyancyForce + buoyancyStep, maxBuoyancy);
      flightStore.updateControls({
        ...controls,
        buoyancyForce
      });
    }
    if (controls.buoyancyDown) {
      buoyancyForce = Math.max(buoyancyForce - buoyancyStep, minBuoyancy);
      flightStore.updateControls({
        ...controls,
        buoyancyForce
      });
    }
  });
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<!-- Modern, semi-transparent control panel -->
<div class="bg-black/40 text-white p-4 rounded-lg shadow backdrop-blur-sm">
  <h3 class="text-md font-semibold mb-2">Flight Controls</h3>
  <div class="text-xs space-y-1">
    <p><span class="font-bold">W,A,S,D:</span> Move horizontally</p>
    <p><span class="font-bold">Space/Shift:</span> Up/Down</p>
    <p><span class="font-bold">↑/↓:</span> Adjust buoyancy</p>
    <div class="mt-2 py-1 px-2 bg-black/30 rounded">
      <p><span class="text-gray-400">Status:</span> <span class="font-bold text-blue-300">{playing ? 'Flying' : 'Paused'}</span></p>
      <p><span class="text-gray-400">Buoyancy:</span> <span class="font-bold text-green-300">{buoyancyForce.toFixed(1)}</span></p>
      <p><span class="text-gray-400">Altitude:</span> <span class="font-bold text-amber-300">{flightState ? flightState.altitude.toFixed(1) : '0.0'} km</span></p>
    </div>
  </div>
</div>