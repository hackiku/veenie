<!-- src/lib/sims/planet/scene/Scene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { getContext } from 'svelte';
  import Planet from './planet/Planet.svelte';
  import SimpleVenus from './planet/SimpleVenus.svelte';
  import Atmosphere from './atmosphere/Atmosphere.svelte';
  import Grid from './helpers/Grid.svelte';
  import Camera from './Camera.svelte';
  
  // Props
  let { 
    scale = 'planet',
    showAtmosphere = true,
  } = $props();
  
  // State
  let showGrid = $state(false);
  
  // Camera positions for different scales
  const cameraConfig = {
    space: {
      position: [0, 0, 200],
      fov: 45,
      minDistance: 50,
      maxDistance: 1000
    },
    planet: {
      position: [0, 0, 20],
      fov: 45,
      minDistance: 7,
      maxDistance: 50
    },
    atmosphere: {
      position: [0, 0, 15],
      fov: 60,
      minDistance: 6,
      maxDistance: 30
    }
  };
  
  // Get current settings based on scale
  let settings = $derived(cameraConfig[scale] || cameraConfig.planet);
  
  // Scale factors for planet
  const scaleFactors = {
    space: 0.0001,
    planet: 0.001,
    atmosphere: 0.0015
  };
  
  // Venus data
  const venusData = {
    radius: 6051.8, // km
  };
  
  // Toggle grid visibility
  function toggleGrid() {
    showGrid = !showGrid;
  }
</script>

<!-- Camera -->
<Camera {scale} />

<!-- Lights -->
<T.AmbientLight intensity={0.3} />
<T.DirectionalLight 
  position={[20, 10, 10]} 
  intensity={1.5} 
  castShadow
/>
<T.HemisphereLight 
  args={[0xffffbb, 0x080820, 0.5]}
/>

<!-- Venus with atmosphere -->
<T.Group>
  <!-- Planet mesh -->
  <!-- <Planet 
    radius={venusData.radius} 
    scale={scaleFactors[scale]} 
  /> -->
  <SimpleVenus 
    radius={venusData.radius} 
    scale={scaleFactors[scale]} 
  />

  
  <!-- Atmosphere layers -->
  {#if showAtmosphere}
    <Atmosphere 
      planetRadius={venusData.radius}
      scale={scaleFactors[scale]}
    />
  {/if}
</T.Group>

<!-- Optional grid at current scale -->
{#if showGrid}
  <Grid {scale} />
{/if}

<!-- Simple UI for toggling grid -->
<div class="absolute bottom-4 left-4 text-white bg-black/50 p-2 rounded">
  <label class="flex items-center space-x-2">
    <input type="checkbox" checked={showGrid} onchange={toggleGrid} />
    <span>Show Grid</span>
  </label>
</div>