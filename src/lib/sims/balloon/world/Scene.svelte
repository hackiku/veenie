<!-- src/lib/sims/balloon/world/Scene.svelte -->
<script lang="ts">
  import { T, useThrelte } from '@threlte/core';
	import { Environment } from '@threlte/extras';
  import Balloon from './vehicles/Balloon.svelte';
  import Terrain from './terrain/Terrain.svelte';
  
  // Atmosphere components - conditionally imported
  import Atmosphere from './atmosphere/Atmosphere.svelte';
  import StaticClouds from './atmosphere/StaticClouds.svelte';
  import VenusDistanceFog from './atmosphere/VenusDistanceFog.svelte';
  import { TextureLoader } from 'three'
	
	// camera
  import Camera from './Camera.svelte';
  // import CoordinateGrid from './helpers/CoordinateGrid.svelte';
  // import CoordinateOverlay from '../ui/CoordinateOverlay.svelte';
  // import { SIMULATION_CONSTANTS } from '../constants';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Get Threlte context for exposure control
  const { renderer, invalidate } = useThrelte();
  
  // Props - NOW ALL PROPERLY TYPED
  let { 
    telemetry,
    updateTelemetry,
    stepCount = 0,
    running = true,
    singleStep = false,
    exposure = 0.35,
    disableAtmosphere = false
  } = $props();
  
  // Reset flag for restarting components
  let resetSignal = $state(Date.now());
  

  // const loader = new TextureLoader().setPath('/atmosphere/venusAtmo.svg').setRequestHeader({
	// });
	
	// const promise = loader.loadAsync('texture.jpg').then((texture) => {
  //   texture.mapping = EquirectangularReflectionMapping
  //   return texture
  // })


  // Watch for step count changes to trigger resets
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
  
  // Update engine simulation state when props change
  $effect(() => {
    engine.setPaused(!running);
    if (singleStep) {
      engine.setSingleStep(true);
    }
  });
  
  // Run physics in animation frame - IMPROVED VERSION
  let lastTime = performance.now();
  let animationFrameId = null;
  
  function updatePhysics() {
    const now = performance.now();
    const deltaSeconds = (now - lastTime) / 1000;
    lastTime = now;
    
    // Don't update with huge time steps (e.g., when tab is inactive)
    if (deltaSeconds < 0.2 && running) {
      // Update the physics engine
      engine.update(deltaSeconds);
      
      // Update telemetry from engine
      if (updateTelemetry) {
        updateTelemetry(engine.getTelemetry());
      }
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

<!-- IMPROVED: Conditional Atmosphere Rendering -->
<!-- {#if !disableAtmosphere} -->
  <Atmosphere 
    showClouds={true}
    showLayers={true}
    showDevGrids={false}
    atmosphericFog={true}
    {resetSignal}
  />

  <!-- <StaticClouds 
    showStats={false}
    showDensityInfo={false}
  /> -->

	<VenusDistanceFog />

<!-- IMPROVED: Lighting based on atmosphere mode -->
<!-- {#if disableAtmosphere} -->
  <!-- Sky Mode: Reduced lighting since Sky component provides environment -->
  <!-- <T.DirectionalLight 
    position={[100000, 120000, 80000]}
    intensity={0.8}
    color="#FFF4E6"
    castShadow={true}
  /> -->
  
  <!-- <T.AmbientLight 
    intensity={0.05} 
    color="#FFDB99" 
  /> -->

	<!-- <Environment
		url="/atmosphere/venusAtmo.svg"
	/> -->

<Balloon 
  {resetSignal} 
/>

<Terrain />
