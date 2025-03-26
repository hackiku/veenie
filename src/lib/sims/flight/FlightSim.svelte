<!-- src/lib/sims/flight/FlightSim.svelte -->
<script>
  import { Canvas, useTask } from '@threlte/core';
  import { World, useRapier } from '@threlte/rapier';
  import Scene from './scene/Scene.svelte';
  import Controls from './controls/Controls.svelte';
  import Altimeter from './instruments/altimeter/Altimeter.svelte';
  import FlightDashboard from './ui/FlightDashboard.svelte';
  import PlayPause from './controls/time/PlayPause.svelte';
  import CameraPosition from './ui/CameraPosition.svelte';
  
  import { onDestroy, setContext } from 'svelte';
  import { venusData } from '$lib/data/flight/constants';
  
  // World settings with fixed gravity
  const worldSettings = $state({
    gravity: { x: 0, y: venusData.physics.GRAVITY, z: 0 }, // Set gravity from constants
    timeStep: 1/60,
    interpolate: true
  });
  
  // Time state using Rapier's physics step
  let timeState = $state({
    elapsed: 0,        // Total elapsed time in seconds
    paused: true,      // Is simulation paused?
    timeScale: 1,      // Simulation speed multiplier
    lastDelta: 0       // Last physics step delta
  });
  
  // Advance time function (will be called by physics system)
  function advanceTime(delta) {
    if (timeState.paused) return false;
    
    // Scale delta by timeScale
    const scaledDelta = delta * timeState.timeScale;
    
    // Update elapsed time
    timeState.elapsed += scaledDelta;
    timeState.lastDelta = scaledDelta;
    
    return true; // Time was advanced
  }
  
  // Time control functions
  function pauseTime() {
    timeState.paused = true;
  }
  
  function startTime() {
    timeState.paused = false;
  }
  
  function toggleTime() {
    timeState.paused = !timeState.paused;
  }
  
  function resetTime() {
    timeState.elapsed = 0;
    timeState.paused = true;
  }
  
  // Rapier context is available after world is created
  let rapierContext = null;
  
  // Simplified atmospheric properties without expensive calculations
  function getSimplifiedAtmosphericProperties(altitude) {
    // Simple temperature model (linear interpolation)
    const surfaceTemp = 735; // K
    const cloudTemp = 330;   // K
    const temperature = altitude < 50 
      ? surfaceTemp - (altitude / 50) * (surfaceTemp - cloudTemp)
      : cloudTemp - ((altitude - 50) / 50) * (cloudTemp - 170);
    
    // Simple pressure model (exponential decay)
    const pressure = 92 * Math.exp(-altitude / 15);
    
    // Simple density factor
    const densityFactor = altitude < 40 ? 1.2 :
                         altitude > 60 ? 0.8 :
                         1.2 - ((altitude - 40) / 20) * 0.4;
    
    return { temperature, pressure, densityFactor };
  }
  
  // Initial atmospheric properties
  const initialAltitude = venusData.altitude.CLOUD_LAYER;
  const initialAtmosphere = getSimplifiedAtmosphericProperties(initialAltitude);
  
  // Core game state using runes
  let gameState = $state({
    position: { x: 0, y: initialAltitude, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    altitude: initialAltitude,
    temperature: initialAtmosphere.temperature,
    pressure: initialAtmosphere.pressure,
    density: initialAtmosphere.densityFactor,
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
  
  // Set up time advancement with Rapier's physics step
  $effect(() => {
    if (rapierContext) {
      const { simulationTask } = rapierContext;
      
      // Set up task to advance time based on physics step
      useTask('advanceTime', (delta) => {
        // Update game state time
        if (!timeState.paused) {
          gameState.time = timeState.elapsed;
        }
        
        // Advance time
        return advanceTime(delta);
      }, { after: simulationTask });
    }
  });
  
  // Set up the flight context
  setContext('flightContext', {
    // State getters
    getGameState: () => gameState,
    
    // State updaters
    updatePosition: (newPosition) => {
      gameState.position = newPosition;
      gameState.altitude = newPosition.y;
      
      // Update derived atmospheric properties using simplified model
      const atmosphere = getSimplifiedAtmosphericProperties(newPosition.y);
      gameState.temperature = atmosphere.temperature;
      gameState.pressure = atmosphere.pressure;
      gameState.density = atmosphere.densityFactor;
    },
    
    updateVelocity: (newVelocity) => {
      gameState.velocity = newVelocity;
    },
    
    updateControl: (controlName, value) => {
      gameState.controls[controlName] = value;
    },
    
    adjustBuoyancy: (delta) => {
      // Adjust buoyancy force with limits
      const newValue = gameState.controls.buoyancyForce + delta;
      const maxBuoyancy = venusData.controls.MAX_BUOYANCY;
      const minBuoyancy = venusData.controls.MIN_BUOYANCY;
      gameState.controls.buoyancyForce = Math.max(minBuoyancy, Math.min(maxBuoyancy, newValue));
    },
    
    togglePlay: () => {
      gameState.playing = !gameState.playing;
      
      // Update time system
      toggleTime();
    },
    
    reset: () => {
      // Reset to initial state
      const initialAtmosphere = getSimplifiedAtmosphericProperties(initialAltitude);
      
      gameState = {
        position: { x: 0, y: initialAltitude, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        altitude: initialAltitude,
        temperature: initialAtmosphere.temperature,
        pressure: initialAtmosphere.pressure,
        density: initialAtmosphere.densityFactor,
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
      resetTime();
    },
    
    // Time system access
    getTime: () => ({ 
      current: timeState.elapsed,
      paused: timeState.paused,
      timeScale: timeState.timeScale
    }),
    
    // Constants (for easy access)
    constants: venusData
  });
  
  // Store Rapier context when available
  function storeRapierContext() {
    try {
      rapierContext = useRapier();
    } catch (error) {
      console.error("Rapier context not available yet:", error);
    }
  }
</script>

<!-- Controls UI -->
<div class="fixed top-4 left-4 z-20">
  <Controls />
</div>

<!-- Camera position display -->
<CameraPosition />

<!-- Flight Dashboard -->
<FlightDashboard />
<Altimeter />

<!-- Sim Controls - positioned at bottom center -->
<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
  <PlayPause />
</div>

<div class="relative w-full h-full">
  <Canvas>
    <World 
      gravity={worldSettings.gravity}
      paused={timeState.paused}
      timeStep={worldSettings.timeStep}
      interpolate={worldSettings.interpolate}
      oncreate={storeRapierContext}
    >
      <Scene />
    </World>
  </Canvas>
</div>