<!-- src/lib/sims/planet/scene/Scene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { getContext } from 'svelte';
  import Planet from './planet/Planet.svelte';
  import SimpleVenus from './planet/SimpleVenus.svelte';
  import SurfaceModel from './planet/SurfaceModel.svelte';
  import CloudModel from './planet/CloudModel.svelte';
  import Atmosphere from './atmosphere/Atmosphere.svelte';
  import Grid from './helpers/Grid.svelte';
  import Camera from './Camera.svelte';
  
  // Props
  let { 
    scale = 'planet',
    showAtmosphere = true,
    selectedModel = 'planet', // 'surface', 'planet', 'atmosphere'
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
  
  // Share grid visibility through context if needed
  if (getContext('planetContext')) {
    const context = getContext('planetContext');
    if (!context.getShowGrid) {
      context.getShowGrid = () => showGrid;
      context.toggleGrid = toggleGrid;
    }
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

<!-- Venus model based on selection -->
<T.Group>
  <!-- Select model based on the selectedModel prop -->
  {#if selectedModel === 'surface'}
    <SurfaceModel 
      scale={scaleFactors[scale]} 
    />
  {:else if selectedModel === 'atmosphere'}
    <CloudModel 
      scale={scaleFactors[scale]} 
    />
  {:else}
    <SimpleVenus 
      radius={venusData.radius} 
      scale={scaleFactors[scale]} 
    />
  {/if}
  
  <!-- Atmosphere layers - this is the sci-fi atmospheric visualization, different from cloud model -->
  {#if showAtmosphere}
    <Atmosphere 
      planetRadius={venusData.radius}
      scale={scaleFactors[scale] * 0.7} 
    />
  {/if}
</T.Group>

<!-- Optional grid at current scale -->
{#if showGrid}
  <Grid {scale} />
{/if}