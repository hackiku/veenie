<!-- src/lib/sims/balloon/BalloonSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './world/Scene.svelte';
	// sky
	import { Sky } from '@threlte/extras'
	import type { Preset } from './world/atmosphere/skyPresets'
  import { Spring } from 'svelte/motion'
	import { presets } from './world/atmosphere/skyPresets'
	
	// controls
	import SimControls from './ui/controls/SimControls.svelte';
  import PlayPause from './ui/controls/PlayPause.svelte';
	import CameraSelector from './ui/CameraSelector.svelte';
	import InteractiveCamera from './world/InteractiveCamera.svelte';
  // instruments
	import Altimeter from './ui/instruments/Altimeter.svelte'
  import Compass from './ui/instruments/Compass.svelte'
  import Thermometer from './ui/instruments/Thermometer.svelte'

	import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';



	let cameraComponent;

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
    buoyancy: 0,
    temperature: 27 // Will be calculated from altitude in Thermometer component
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
      buoyancy: 0,
      temperature: 27
    };
  }



	  const entries = Object.entries(presets)
  const presetSpring = new Spring(presets.sunset, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  })
  let setEnvironment = $state(true)
  let azimuth = $state(0)
  let elevation = $state(0)
  let exposure = $state(0)
  let mieCoefficient = $state(0)
  let mieDirectionalG = $state(0)
  let rayleigh = $state(0)
  let turbidity = $state(0)
  const applyPreset = (preset: Preset) => {
    azimuth = preset.azimuth
    elevation = preset.elevation
    exposure = preset.exposure
    mieCoefficient = preset.mieCoefficient
    mieDirectionalG = preset.mieDirectionalG
    rayleigh = preset.rayleigh
    turbidity = preset.turbidity
  }
  applyPreset(presets.sunset)
  $effect(() => {
    presetSpring.set({
      azimuth,
      elevation,
      exposure,
      mieCoefficient,
      mieDirectionalG,
      rayleigh,
      turbidity
    })
  })

</script>

<!-- Instruments Panel -->
<Altimeter 
  telemetry={telemetry}
  position="bottom-right"
  min={0}
  max={200}
  label="Altitude"
/>

<Thermometer 
  telemetry={telemetry}
  position="bottom-right-offset"
  min={-80}
  max={200}
  label="Temp"
/>

<Compass 
  telemetry={telemetry}
  position="bottom-left" 
/>

<div class="relative w-full h-screen overflow-hidden">

  <Canvas>
	  <!-- <Sky
  	  {setEnvironment}
    	{...presetSpring.current}
	  /> -->

		<Sky
			{setEnvironment}
			{...presetSpring.current}
		/>


		<InteractiveCamera bind:this={cameraComponent} />
    <Scene 
      {telemetry}
      updateTelemetry={(newData) => telemetry = {...telemetry, ...newData}}
      {stepCount} 
      {running}
      {singleStep}
			exposure={presetSpring.current.exposure}
    />
  </Canvas>
  
	<CameraSelector 
		position="top-right"
		on:cameraChange={(e) => {
			if (cameraComponent) {
				cameraComponent.setMode(e.detail.mode);
			}
		}}
	/>

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