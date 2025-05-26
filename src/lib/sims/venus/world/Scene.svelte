<!-- src/lib/sims/venus/world/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // World components
  import Camera from './Camera.svelte';
  import Planet from './planet/Planet.svelte';
  import CoordinateGrid from './helpers/CoordinateGrid.svelte';
  import Sun from './space/Sun.svelte';
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

<!-- Basic lighting -->
<T.AmbientLight intensity={0.2} color="#FFF8DC" />

<!-- Camera -->
<Camera />

<!-- Sun -->
<Sun 
  timeState={venusTime.state}
  visible={true}
/>

<!-- Orbital path -->
<OrbitalPath 
  visible={true}
  opacity={0.3}
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