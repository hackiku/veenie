<!-- src/lib/sims/venus/world/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // World components
  import Camera from './Camera.svelte';
  import Planet from './planet/Planet.svelte';
  import CoordinateGrid from './helpers/CoordinateGrid.svelte';
  import SunSphere from './space/SunSphere.svelte';
  import SunLight from './space/SunLight.svelte';
  import OrbitalPath from './space/OrbitalPath.svelte';
  
  // Props
  let {
    venusTime,
    showCoordinateGrid = true
  } = $props();
  
  // Simple time loop
  let animationFrameId: number | null = null;
  
  function updateTime() {
    venusTime.update();
    animationFrameId = requestAnimationFrame(updateTime);
  }
  
  onMount(() => {
    updateTime();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
</script>

<!-- Reduced ambient light to see directional lighting better -->
<T.AmbientLight intensity={0.1} color="#FFF8DC" />
<T.DirectionalLight position={[0, 1, 10]} />

<!-- Camera -->
<Camera />

<!-- Sun Components (separated for debugging) -->
<SunSphere 
  timeState={venusTime.state}
  visible={true}
/>

<SunLight 
  timeState={venusTime.state}
  visible={true}
  intensity={5.5}
/>

<!-- Orbital path -->
<OrbitalPath 
  visible={true}
  opacity={0.2}
/>

<!-- Venus Planet -->
<Planet 
  timeState={venusTime.state}
  showCoordinateGrid={showCoordinateGrid}
/>

<!-- Coordinate Grid Overlay -->
{#if showCoordinateGrid}
  <CoordinateGrid 
    planetRadius={6051.8}
    gridSpacing={30}
    opacity={0.4}
    visible={showCoordinateGrid}
  />
{/if}