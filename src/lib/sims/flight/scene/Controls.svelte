<!-- src/lib/sims/flight/controls/Controls.svelte -->

<script>
  import { flightStore } from '$lib/stores/flightStore';
  
  // Subscribe to flight store for play/pause
  const playing = $derived(flightStore.playing);
  
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
  let buoyancyForce = $state(8.87 * 2.02); // Default to slightly positive buoyancy
  const maxBuoyancy = 8.87 * 1.5;
  const minBuoyancy = 8.87 * 0.5;
  const buoyancyStep = 0.2;
  
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
      case ' ': controls.up = true; break;
      case 'Shift': controls.down = true; break;
      // Arrow up/down for buoyancy control (trim)
      case 'ArrowUp': controls.buoyancyUp = true; break;
      case 'ArrowDown': controls.buoyancyDown = true; break;
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
    }
    if (controls.buoyancyDown) {
      buoyancyForce = Math.max(buoyancyForce - buoyancyStep, minBuoyancy);
    }
    
    // Update the flight store with current buoyancy
    flightStore.updateControls({
      ...controls,
      buoyancyForce
    });
  });
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<!-- No visible UI elements needed for this controller component -->