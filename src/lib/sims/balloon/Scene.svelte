<!-- Scene.svelte - Updated with proper timing -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { useTask } from '@threlte/core';
  import { useRapier } from '@threlte/rapier';
  import Balloon from './world/Balloon.svelte';
  import Terrain from './world/Terrain.svelte';
  import Clouds from './world/Clouds.svelte';
  import Camera from './world/Camera.svelte';
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
  
  // Update engine simulation state
  $effect(() => {
    engine.setPaused(!running);
    engine.setSingleStep(singleStep);
  });
  
  // Run physics in the simulation stage
  useTask((delta) => {
    // Only update in Rapier's simulation stage
    // This ensures we're aligned with Rapier's timestep
    engine.update(delta);
    
    // Update telemetry from engine
    updateTelemetry(engine.getTelemetry());
  }, {
    stage: simulationStage
  });
</script>

<!-- Camera component -->
<Camera />

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

<Clouds 
  resetSignal={resetSignal}
/>

<!-- Additional grid for orientation at balloon height -->
<Grid 
  position={[0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
  cellSize={10}
  sectionSize={10}
  cellColor="#666666"
  sectionColor="#444444"
  fadeDistance={200}
  infiniteGrid={false}
/>