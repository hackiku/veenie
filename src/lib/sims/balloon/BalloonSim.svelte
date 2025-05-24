<!-- src/lib/sims/balloon/BalloonSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './world/Scene.svelte';
  import VenusSky from './world/sky/VenusSky.svelte';
  
  // UI Components
  import SimControls from './ui/controls/SimControls.svelte';
  import PlayPause from './ui/controls/PlayPause.svelte';
  import CameraSelector from './ui/CameraSelector.svelte';
  import InteractiveCamera from './world/InteractiveCamera.svelte';
  import Instruments from './ui/Instruments.svelte';
  
  import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';

  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Camera component reference
  let cameraComponent;
  
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
			balloonMass: SIMULATION_CONSTANTS.BALLOON_MASS,
			airDensity: 0,
			buoyancy: 0,
			temperature: 27,
			globalPosition: { latitude: 0, longitude: 0 }
		});  
  
		// Camera heading for compass
  let cameraHeading = $state(0);
  
  // Sky settings
  let skyExposure = $state(0.35); // Start at cloud layer exposure
  
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
      buoyancy: 0,
      temperature: 27,
      globalPosition: { latitude: 0, longitude: 0 }
    };
  }
</script>

<div class="relative w-full h-screen overflow-hidden">
  <Canvas>
    <!-- Venus Sky System - placed first for proper environment setup -->
    <VenusSky
      setEnvironment={true}
      autoTransition={true}
      balloonAltitude={telemetry.altitude}
      bind:exposure={skyExposure}
    />

    <!-- Interactive Camera -->
    <InteractiveCamera bind:this={cameraComponent} />
    
    <!-- Main Scene - disable atmospheric fog to avoid conflicts with sky -->
    <Scene 
      {telemetry}
      updateTelemetry={(newData) => telemetry = {...telemetry, ...newData}}
      {stepCount} 
      {running}
      {singleStep}
      exposure={skyExposure}
      disableAtmosphere={true}
    />
  </Canvas>
  
  <!-- Camera Controls -->
  <CameraSelector 
    position="top-right"
    on:cameraChange={(e) => {
      if (cameraComponent) {
        cameraComponent.setMode(e.detail.mode);
      }
    }}
  />

  <!-- Simulation Controls -->
  <div class="absolute top-5 left-5 z-10">
    <SimControls 
      {stepCount}
      {telemetry}
    />
  </div>
  
  <!-- Play/Pause Controls -->
  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
    <PlayPause
      {running}
      {stepCount}
      {toggleSimulation}
      {doSingleStep}
      {restartSimulation}
    />
  </div>
  
  <!-- Instrument Panel -->
  <Instruments
    {telemetry}
    {cameraHeading}
    layout="default"
  />
</div>