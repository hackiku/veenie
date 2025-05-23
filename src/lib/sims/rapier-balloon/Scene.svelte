<!-- Scene.svelte - Updated with separate Camera component -->
<script lang="ts">
  import { T } from '@threlte/core';
	// no Grid needed
  import { useTask } from '@threlte/core';
  import { useRapier } from '@threlte/rapier';
  import Terrain from './world/Terrain.svelte';
  import Clouds from './world/Clouds.svelte';
  import Camera from './world/Camera.svelte';

	import Balloon from './world/Balloon.svelte';
	import Submarine from './world/Submarine.svelte'
	// import HybridBalloon from './world/HybridBalloon.svelte'

	import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';
  
  // Get Rapier context for simulation stage
  const { simulationStage } = useRapier();
  
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
  
  // Run physics in the simulation stage
  useTask((delta) => {
    // Update the physics engine
    engine.update(delta);
    
    // Update telemetry from engine
    updateTelemetry(engine.getTelemetry());
  }, {
    stage: simulationStage
  });
</script>

<!-- Camera component -->
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
<Balloon resetSignal={resetSignal} />

<!-- <Submarine resetSignal={resetSignal} /> -->
<!-- <HybridBalloon resetSignal={resetSignal} /> -->


<Terrain />

<Clouds 
  resetSignal={resetSignal}
/>
