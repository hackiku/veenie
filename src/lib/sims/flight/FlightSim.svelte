<!-- src/lib/sims/flight/FlightSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import Scene from './scene/Scene.svelte';
  import Controls from './controls/Controls.svelte';
  import Altimeter from './instruments/altimeter/Altimeter.svelte';
  import FlightDashboard from './ui/FlightDashboard.svelte';
  import PlayPause from './controls/time/PlayPause.svelte';
  
  import * as timeSystem from '$lib/core/time.svelte';
  import { onDestroy, setContext } from 'svelte';
  import { venusData } from '$lib/data/flight/constants';
  import { getTemperatureAtAltitude, getPressureAtAltitude } from '$lib/data/flight/atmosphereModel';
  
  // World settings
  const worldSettings = $state({
    framerate: 60, // Fixed framerate for deterministic physics
    gravity: { x: 0, y: 0, z: 0 } // Start with zero gravity, will be set in Scene.svelte
  });
  
  // Core game state using runes
  let gameState = $state({
    position: { x: 0, y: venusData.altitude.CLOUD_LAYER, z: 0 }, // Starting at correct altitude
    velocity: { x: 0, y: 0, z: 0 },
    altitude: venusData.altitude.CLOUD_LAYER, // Explicitly track altitude
    temperature: getTemperatureAtAltitude(venusData.altitude.CLOUD_LAYER),
    pressure: getPressureAtAltitude(venusData.altitude.CLOUD_LAYER),
    density: 1.0,
    controls: {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
      buoyancyUp: false,
      buoyancyDown: false,
      buoyancyForce: venusData.controls.DEFAULT_BUOYANCY
    },
    playing: false,
    time: 0
  });
  
  // Set up the flight context
  setContext('flightContext', {
    // State getters
    getGameState: () => gameState,
    
    // State updaters
    updatePosition: (newPosition) => {
      gameState.position = newPosition;
      gameState.altitude = newPosition.y;
      
      // Update derived environmental properties
      gameState.temperature = getTemperatureAtAltitude(newPosition.y);
      gameState.pressure = getPressureAtAltitude(newPosition.y);
      
      // Calculate simplified density factor
      let densityFactor = 1.0;
      if (newPosition.y < 40) densityFactor = 1.2;
      else if (newPosition.y > 60) densityFactor = 0.8;
      else densityFactor = 1.2 - ((newPosition.y - 40) / 20) * 0.4;
      
      gameState.density = densityFactor;
    },
    
    updateVelocity: (newVelocity) => {
      gameState.velocity = newVelocity;
    },
    
    updateControl: (controlName, value) => {
      gameState.controls[controlName] = value;
    },
    
    adjustBuoyancy: (delta) => {
      // More fine-grained adjustment
      const newValue = gameState.controls.buoyancyForce + delta;
      const maxBuoyancy = venusData.controls.MAX_BUOYANCY;
      const minBuoyancy = venusData.controls.MIN_BUOYANCY;
      gameState.controls.buoyancyForce = Math.max(minBuoyancy, Math.min(maxBuoyancy, newValue));
    },
    
    togglePlay: () => {
      gameState.playing = !gameState.playing;
      
      // Update time system
      if (gameState.playing) {
        timeSystem.start();
      } else {
        timeSystem.pause();
      }
    },
    
    reset: () => {
      gameState = {
        position: { x: 0, y: venusData.altitude.CLOUD_LAYER, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        altitude: venusData.altitude.CLOUD_LAYER,
        temperature: getTemperatureAtAltitude(venusData.altitude.CLOUD_LAYER),
        pressure: getPressureAtAltitude(venusData.altitude.CLOUD_LAYER),
        density: 1.0,
        controls: {
          forward: false,
          backward: false,
          left: false,
          right: false,
          up: false,
          down: false,
          buoyancyUp: false,
          buoyancyDown: false,
          buoyancyForce: venusData.controls.DEFAULT_BUOYANCY
        },
        playing: false,
        time: 0
      };
      
      // Reset time system
      timeSystem.reset();
    },
    
    // Time system access
    getTime: () => timeSystem.time,
    
    // Constants (for easy access)
    constants: venusData
  });
  
  // Cleanup time system when component is destroyed
  onDestroy(() => {
    timeSystem.cleanup();
  });
</script>

<!-- Controls UI -->
<div class="fixed top-4 left-4 z-20">
  <Controls />
</div>

<!-- Flight Dashboard -->
<FlightDashboard />
<Altimeter />

<!-- Sim Controls - positioned at bottom center -->
<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<div class="relative w-full h-full">
  <Canvas>
    <!-- Use a fixed framerate for deterministic physics -->
    <World framerate={worldSettings.framerate} gravity={worldSettings.gravity}>
      <!-- Main simulation scene -->
      <Scene />
    </World>
  </Canvas>
</div>