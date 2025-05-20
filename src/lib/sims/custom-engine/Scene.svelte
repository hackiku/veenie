<!-- src/lib/sims/custom-engine/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import Balloon from './world/Balloon.svelte';
  import Terrain from './world/Terrain.svelte';
  import Clouds from './world/Clouds.svelte';
  import Camera from './world/Camera.svelte';
  import CoordinateGrid from './world/helpers/CoordinateGrid.svelte';
  import CoordinateOverlay from './ui/CoordinateOverlay.svelte';
  import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Props
  let { 
    telemetry,
    updateTelemetry,
    stepCount,
    running,
    singleStep
  } = $props();
  
  // Reset flag for restarting components
  let resetSignal = $state(Date.now());
  
  $effect(() => {
    if (stepCount === 0) {
      resetSignal = Date.now();
    }
  });
  
  // Camera reference
  let cameraComponent;
  
  // Update engine simulation state
  $effect(() => {
    engine.setPaused(!running);
    engine.setSingleStep(singleStep);
  });
  
  // Run physics in animation frame
  let lastTime = performance.now();
  let animationFrameId = null;
  
  function updatePhysics() {
    const now = performance.now();
    const deltaSeconds = (now - lastTime) / 1000;
    lastTime = now;
    
    // Don't update with huge time steps (e.g., when tab is inactive)
    if (deltaSeconds < 0.2) {
      // Update the physics engine
      engine.update(deltaSeconds);
      
      // Update telemetry from engine
      updateTelemetry(engine.getTelemetry());
    }
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(updatePhysics);
  }
  
  // Start/stop physics loop based on component lifecycle
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    // Start animation loop
    updatePhysics();
    
    return () => {
      // Clean up animation loop
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
</script>

<!-- Coordinate overlay in UI space -->
<CoordinateOverlay balloonTelemetry={telemetry} />

<!-- 3D Scene elements -->
<Camera bind:this={cameraComponent} />

<!-- Lighting -->
<T.DirectionalLight 
  position={[50, 100, 50]} 
  intensity={1.5} 
  castShadow 
/>
<T.AmbientLight intensity={0.5} />

<!-- Venus atmosphere color -->
<T.FogExp2 color="#FFE0B2" density={0.00005} />

<!-- Components -->
<Balloon 
  resetSignal={resetSignal} 
/>

<Terrain />

<!-- Coordinate grid on the terrain -->
<CoordinateGrid 
  size={300}
  divisions={30}
  labelInterval={6}
  height={0.2}
/>

<Clouds 
  resetSignal={resetSignal}
/>