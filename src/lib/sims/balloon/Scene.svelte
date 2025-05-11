<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import Balloon from './world/Balloon.svelte';
  import Terrain from './world/Terrain.svelte';
  import Clouds from './world/Clouds.svelte';
  
  // Correct Svelte 5 props syntax
  let { 
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 },
    updateTelemetry = (data) => {},
    stepCount = 0,
    running = true,
    singleStep = false
  } = $props();
  
  // Reset flag for restarting components
  let resetSignal = $state(Date.now());
  
  $effect(() => {
    if (stepCount === 0) {
      resetSignal = Date.now();
    }
  });
</script>

<!-- Camera setup -->
<T.PerspectiveCamera 
  position={[-40, 40, 40]} 
  fov={75} 
  near={0.1} 
  far={1000}
  makeDefault
>
  <OrbitControls target={{ x: 0, y: 20, z: 0 }} />
</T.PerspectiveCamera>

<!-- Lighting -->
<T.DirectionalLight 
  position={[10, 10, 10]} 
  intensity={1.5} 
  castShadow 
/>
<T.AmbientLight intensity={0.5} />

<!-- Physics components -->
<Balloon 
  updateTelemetry={updateTelemetry} 
  resetSignal={resetSignal} 
/>
<Terrain />
<Clouds 
  running={running} 
  resetSignal={resetSignal}
/>