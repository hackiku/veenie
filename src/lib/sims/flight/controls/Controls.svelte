<!-- src/lib/sims/flight/controls/Controls.svelte -->

<script>
  import { getContext } from 'svelte';
  
  // Access the flight context
  const flightContext = getContext('flightContext');
  const constants = flightContext.constants;
  
  // Get the current state
  const gameState = $derived(flightContext.getGameState());
  const playing = $derived(gameState.playing);
  
  // Controls state object (local to this component)
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
  let buoyancyForce = $derived(gameState.controls.buoyancyForce);
  const maxBuoyancy = constants.controls.MAX_BUOYANCY;
  const minBuoyancy = constants.controls.MIN_BUOYANCY;
  const buoyancyStep = constants.controls.BUOYANCY_STEP;
  
  // Handle key down
  function handleKeyDown(event) {
    if (!playing) return;
    
    let controlsChanged = false;
    
    switch(event.key) {
      // WASD for flight controls
      case 'w': 
        if (!controls.forward) {
          controls.forward = true;
          controlsChanged = true;
        }
        break;
      case 'a': 
        if (!controls.left) {
          controls.left = true;
          controlsChanged = true;
        }
        break;
      case 's': 
        if (!controls.backward) {
          controls.backward = true;
          controlsChanged = true;
        }
        break;
      case 'd': 
        if (!controls.right) {
          controls.right = true;
          controlsChanged = true;
        }
        break;
      // Space and Shift for vertical movement
      case ' ': 
        if (!controls.up) {
          controls.up = true;
          controlsChanged = true;
        }
        event.preventDefault();
        break;
      case 'Shift': 
        if (!controls.down) {
          controls.down = true;
          controlsChanged = true;
        }
        break;
      // Arrow up/down for buoyancy control (trim)
      case 'ArrowUp': 
        if (!controls.buoyancyUp) {
          controls.buoyancyUp = true;
          flightContext.adjustBuoyancy(buoyancyStep);
        }
        event.preventDefault();
        break;
      case 'ArrowDown': 
        if (!controls.buoyancyDown) {
          controls.buoyancyDown = true;
          flightContext.adjustBuoyancy(-buoyancyStep);
        }
        event.preventDefault();
        break;
    }
    
    // Update the context with current controls if they changed
    if (controlsChanged) {
      // Update each control individually
      Object.entries(controls).forEach(([key, value]) => {
        flightContext.updateControl(key, value);
      });
    }
  }
  
  // Handle key up
  function handleKeyUp(event) {
    let controlsChanged = false;
    
    switch(event.key) {
      case 'w': 
        if (controls.forward) {
          controls.forward = false;
          controlsChanged = true;
        }
        break;
      case 'a': 
        if (controls.left) {
          controls.left = false;
          controlsChanged = true;
        }
        break;
      case 's': 
        if (controls.backward) {
          controls.backward = false;
          controlsChanged = true;
        }
        break;
      case 'd': 
        if (controls.right) {
          controls.right = false;
          controlsChanged = true;
        }
        break;
      case ' ': 
        if (controls.up) {
          controls.up = false;
          controlsChanged = true;
        }
        break;
      case 'Shift': 
        if (controls.down) {
          controls.down = false;
          controlsChanged = true;
        }
        break;
      case 'ArrowUp': 
        controls.buoyancyUp = false;
        break;
      case 'ArrowDown': 
        controls.buoyancyDown = false;
        break;
    }
    
    // Update the context with current controls if they changed
    if (controlsChanged) {
      // Update each control individually
      Object.entries(controls).forEach(([key, value]) => {
        flightContext.updateControl(key, value);
      });
    }
  }
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
      <p><span class="text-gray-400">Altitude:</span> <span class="font-bold text-amber-300">{gameState.altitude.toFixed(1)} km</span></p>
    </div>
  </div>
</div>