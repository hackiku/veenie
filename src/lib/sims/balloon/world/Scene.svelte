<!-- src/lib/sims/balloon/world/Scene.svelte -->
<script lang="ts">
  import { T, useThrelte } from '@threlte/core';
  import Balloon from './vehicles/Balloon.svelte';
  import Terrain from './terrain/Terrain.svelte';
  
  // Atmosphere components - conditionally imported
  import Atmosphere from './atmosphere/Atmosphere.svelte';
  import StaticClouds from './atmosphere/StaticClouds.svelte';
  
  import Camera from './Camera.svelte';
  import CoordinateGrid from './helpers/CoordinateGrid.svelte';
  import CoordinateOverlay from '../ui/CoordinateOverlay.svelte';
  import { SIMULATION_CONSTANTS } from '../constants';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Get Threlte context for exposure control
  const { renderer, invalidate } = useThrelte();
  
  // Props
  let { 
    telemetry,
    updateTelemetry,
    stepCount,
    running,
    singleStep,
    exposure = 0.35,
    disableAtmosphere = false // New prop to disable atmosphere when using Sky
  } = $props();
  
  // Reset flag for restarting components
  let resetSignal = $state(Date.now());
  
  $effect(() => {
    if (stepCount === 0) {
      resetSignal = Date.now();
    }
  });
  
  // Update renderer exposure when it changes
  $effect(() => {
    if (renderer) {
      renderer.toneMappingExposure = exposure;
      invalidate();
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
  import { onMount } from 'svelte';
  
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

<!-- 3D Scene elements -->
<Camera bind:this={cameraComponent} />

<!-- Conditional Atmosphere - only show if not using Sky component -->
{#if !disableAtmosphere}
  <Atmosphere 
    showClouds={false}
    showLayers={true}
    showDevGrids={false}
    atmosphericFog={true}
    resetSignal={resetSignal}
  />
{/if}

<!-- Lighting -->
<!-- Primary Sun (heavily filtered through thick atmosphere) -->
<T.DirectionalLight 
  position={[100000, 120000, 80000]}
  intensity={1.8}
  color="#FFF4E6"
  castShadow={true}
/>

<!-- Atmospheric bounce light (warm) - reduced when using Sky -->
{#if !disableAtmosphere}
  <T.DirectionalLight 
    position={[-60000, 80000, -40000]}
    intensity={1.0}
    color="#FFD700"
    castShadow={false}
  />
{/if}

<!-- Ambient light - adjust based on whether we're using Sky -->
<T.AmbientLight 
  intensity={disableAtmosphere ? 0.05 : 0.1} 
  color="#FFDB99" 
/>

<!-- Components -->
<Balloon 
  resetSignal={resetSignal} 
/>

<Terrain />

<!-- Optional coordinate grid for debugging -->
<!-- <CoordinateGrid 
  size={300}
  divisions={30}
  labelInterval={10}
  height={0.2}
/> -->

<!-- Optional coordinate overlay -->
<!-- <CoordinateOverlay balloonTelemetry={telemetry} /> -->

<!-- Static clouds - only show if not using full atmosphere -->
{#if disableAtmosphere}
  <StaticClouds 
    showStats={false}
    showDensityInfo={false}
  />
{/if}