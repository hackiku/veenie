<!-- BalloonSim.svelte - Updated with PlayPause -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import Scene from './Scene.svelte';
  
	// ui
	import SimControls from './ui/SimControls.svelte';
  import PlayPause from './ui/PlayPause.svelte';
	import Altimeter from './ui/Altimeter.svelte'
  import { SIMULATION_CONSTANTS } from './constants';
  
  // Simulation state with Svelte 5 runes
  let running = $state(true);
  let stepCount = $state(0);
  let singleStep = $state(false);
  
  // Telemetry data for UI
  let telemetry = $state({
    altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
    airDensity: 0,
    buoyancy: 0
  });
  
  // Control functions
  function toggleSimulation() {
    running = !running;
  }
  
  function doSingleStep() {
    if (!running) {
      singleStep = true;
      setTimeout(() => {
        stepCount++;
        singleStep = false;
      }, 50);
    }
  }
  
  function restartSimulation() {
    // Reset all state
    stepCount = 0;
    telemetry = {
      altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
      balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
      airDensity: 0,
      buoyancy: 0
    };
  }
  
  // Update telemetry function
  function updateTelemetry(newData) {
    telemetry = { ...telemetry, ...newData };
  }
</script>

<Altimeter 
	telemetry={telemetry} 
/>

<div class="relative w-full h-screen overflow-hidden">
  <Canvas>
    <World 
      gravity={[0, -SIMULATION_CONSTANTS.GRAVITY, 0]}
      autoStart={true}
    >
      <Scene 
        telemetry={telemetry} 
        updateTelemetry={updateTelemetry} 
        stepCount={stepCount} 
        running={running}
        singleStep={singleStep}
      />
    </World>
  </Canvas>
  
  <!-- Telemetry panel on bottom left -->
  <div class="absolute top-5 left-5 z-10">
    <SimControls 
      stepCount={stepCount}
      telemetry={telemetry}
    />
  </div>
  
  <!-- Play/Pause controls in the center bottom -->
  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
    <PlayPause
      running={running}
      stepCount={stepCount}
      toggleSimulation={toggleSimulation}
      doSingleStep={doSingleStep}
      restartSimulation={restartSimulation}
    />
  </div>
</div>