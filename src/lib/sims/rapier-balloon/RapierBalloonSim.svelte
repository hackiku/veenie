<!-- RapierBalloonSim.svelte - Updated with proper engine handling -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import Scene from './Scene.svelte';
  import SimControls from './ui/SimControls.svelte';
  import PlayPause from './ui/PlayPause.svelte';
  import Altimeter from './ui/Altimeter.svelte'
  import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Simulation state with Svelte 5 runes
  let running = $state(true);
  let stepCount = $state(0);
  let singleStep = $state(false);
  
  // Update engine state
  $effect(() => {
    engine.setPaused(!running);
  });
  
  $effect(() => {
    engine.setSingleStep(singleStep);
  });
  
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
    // Reset engine
    engine.reset();
    
    // Reset UI state
    stepCount = 0;
    telemetry = {
      altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
      balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
      airDensity: 0,
      buoyancy: 0
    };
  }
  
  // Rapier world reference for pausing
  let worldInstance = $state(null);
  
  // Handle world creation
  function handleWorldCreate(world) {
    worldInstance = world;
    return () => {
      worldInstance = null;
    };
  }
  
  // Sync Rapier world pause state with our running state
  $effect(() => {
    if (!worldInstance) return;
    
    if (running) {
      worldInstance.resume();
    } else {
      worldInstance.pause();
    }
  });
</script>

<Altimeter 
  telemetry={telemetry} 
/>

<div class="relative w-full h-screen overflow-hidden">
  <Canvas>
    <World 
      gravity={[0, -SIMULATION_CONSTANTS.GRAVITY, 0]}
      autoStart={true}
      oncreate={handleWorldCreate}
    >
      <Scene 
        {telemetry}
        updateTelemetry={(newData) => telemetry = {...telemetry, ...newData}}
        {stepCount} 
        {running}
        {singleStep}
      />
    </World>
  </Canvas>
  
  <!-- UI components -->
  <div class="absolute top-5 left-5 z-10">
    <SimControls 
      {stepCount}
      {telemetry}
    />
  </div>
  
  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
    <PlayPause
      {running}
      {stepCount}
      {toggleSimulation}
      {doSingleStep}
      {restartSimulation}
    />
  </div>
</div>