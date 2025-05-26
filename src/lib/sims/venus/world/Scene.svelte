<!-- src/lib/sims/venus/world/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // World components
  import Camera from './Camera.svelte';
  import Planet from './planet/Planet.svelte';
  import CoordinateGrid from './helpers/CoordinateGrid.svelte';
  
  // Props
  let {
    venusTime,
    showCoordinateGrid = true
  } = $props();
  
  // Update time system each frame
  let animationFrameId: number | null = null;
  
  function updateTime() {
    // Update time system
    venusTime.update();
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(updateTime);
  }
  
  // Start time loop
  onMount(() => {
    updateTime();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
</script>

<!-- Basic Lighting -->
<T.AmbientLight intensity={0.2} color="#FFF8DC" />
<T.DirectionalLight 
  position={[50000, 30000, 50000]} 
  intensity={0.8} 
  color="#FFEB3B"
  castShadow
/>

<!-- Camera -->
<Camera />

<!-- Venus Planet -->
<Planet 
  timeState={venusTime.state}
  showCoordinateGrid={false}
/>

<!-- Enhanced Coordinate Grid Overlay -->
{#if showCoordinateGrid}
  <CoordinateGrid 
    planetRadius={6051.8}
    gridSpacing={30}
    opacity={0.4}
    visible={showCoordinateGrid}
  />
{/if}

<!-- Future components (commented out until created)
{#if showAtmosphere}
  <Atmosphere 
    timeState={venusTime.state}
    planetRadius={6051800}
  />
{/if}

<Sun 
  timeState={venusTime.state}
  visible={viewMode === 'space'}
/>

<AtmosphericProbe 
  {atmosphericProbe}
  planetRadius={6051800}
  {onProbeMove}
/>
-->