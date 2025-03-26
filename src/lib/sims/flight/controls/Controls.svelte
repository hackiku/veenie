<!-- src/lib/sims/flight/controls/Controls.svelte -->
<script>
  import { getContext } from 'svelte';
  import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from 'lucide-svelte';
  
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
  
  // Button click handlers
  function startControl(control) {
    if (!playing) return;
    controls[control] = true;
    flightContext.updateControl(control, true);
  }
  
  function stopControl(control) {
    controls[control] = false;
    flightContext.updateControl(control, false);
  }
  
  // Buoyancy adjustment handlers
  function increaseBuoyancy() {
    flightContext.adjustBuoyancy(buoyancyStep);
  }
  
  function decreaseBuoyancy() {
    flightContext.adjustBuoyancy(-buoyancyStep);
  }
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<!-- Modern, elegant control panel -->
<div class="bg-black/40 text-white p-4 rounded-lg shadow backdrop-blur-sm">
  <h3 class="text-xs font-bold mb-4 text-center">Flight Controls</h3>
  
  <div class="flex gap-4">
    <!-- Left column: Vertical movement controls -->
    <div class="flex flex-col gap-2 items-center">
      <!-- Up button -->
      <button
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all
              {controls.up ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
        onmousedown={() => startControl('up')}
        onmouseup={() => stopControl('up')}
        onmouseleave={() => stopControl('up')}
        aria-label="Move Up"
      >
        <ArrowUp size={18} />
      </button>
      
      <!-- Key label -->
      <div class="text-xs text-gray-400 mt-1">SPACE</div>
      
      <!-- Down button -->
      <button
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all mt-2
              {controls.down ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
        onmousedown={() => startControl('down')}
        onmouseup={() => stopControl('down')}
        onmouseleave={() => stopControl('down')}
        aria-label="Move Down"
      >
        <ArrowDown size={18} />
      </button>
      
      <!-- Key label -->
      <div class="text-xs text-gray-400 mt-1">SHIFT</div>
    </div>
    
    <!-- Right column: WASD controls -->
    <div class="flex flex-col gap-2 items-center">
      <!-- Forward (W) -->
      <button
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-all
              {controls.forward ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
        onmousedown={() => startControl('forward')}
        onmouseup={() => stopControl('forward')}
        onmouseleave={() => stopControl('forward')}
        aria-label="Move Forward"
      >
        <div class="font-semibold text-sm">W</div>
      </button>
      
      <!-- Middle row (A, S, D) -->
      <div class="flex gap-2">
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg transition-all
                {controls.left ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
          onmousedown={() => startControl('left')}
          onmouseup={() => stopControl('left')}
          onmouseleave={() => stopControl('left')}
          aria-label="Move Left"
        >
          <div class="font-semibold text-sm">A</div>
        </button>
        
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg transition-all
                {controls.backward ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
          onmousedown={() => startControl('backward')}
          onmouseup={() => stopControl('backward')}
          onmouseleave={() => stopControl('backward')}
          aria-label="Move Backward"
        >
          <div class="font-semibold text-sm">S</div>
        </button>
        
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg transition-all
                {controls.right ? 'bg-indigo-600 shadow-indigo-500/50 shadow-inner' : 'bg-gray-700/50 hover:bg-gray-600/50'}"
          onmousedown={() => startControl('right')}
          onmouseup={() => stopControl('right')}
          onmouseleave={() => stopControl('right')}
          aria-label="Move Right"
        >
          <div class="font-semibold text-sm">D</div>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Buoyancy controls -->
  <div class="mt-5 border-t border-gray-600 pt-4">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm">Buoyancy</span>
      <div class="flex gap-2">
        <button
          class="p-1.5 rounded bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
          onclick={decreaseBuoyancy}
          aria-label="Decrease Buoyancy"
        >
          <ChevronDown size={16} />
        </button>
        <button
          class="p-1.5 rounded bg-gray-700/70 hover:bg-gray-600/70 transition-colors"
          onclick={increaseBuoyancy}
          aria-label="Increase Buoyancy"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </div>
    
    <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"
        style="width: {((buoyancyForce - minBuoyancy) / (maxBuoyancy - minBuoyancy)) * 100}%"
      ></div>
    </div>
    
    <div class="text-center mt-1 text-sm font-mono text-green-300">{buoyancyForce.toFixed(1)}</div>
  </div>
  
  <!-- Status display -->
  <div class="mt-4 pt-3 border-t border-gray-600">
    <div class="flex justify-between text-xs">
      <span class="text-gray-400">Status:</span>
      <span class="{playing ? 'text-green-400' : 'text-red-400'} font-semibold">
        {playing ? 'ACTIVE' : 'PAUSED'}
      </span>
    </div>
    
    <div class="flex justify-between text-xs mt-1">
      <span class="text-gray-400">Altitude:</span>
      <span class="text-cyan-300 font-mono">
        {gameState.altitude.toFixed(1)} km
      </span>
    </div>
  </div>
</div>