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
  
  // Venus-specific sun position calculation 
  // Venus orbital period: 224.7 Earth days around the Sun
  let sunX = $derived.by (() => {
    const simTime = venusTime.state.simulationTime;
    const orbitPeriod = 224.7 * 24 * 3600; // Venus orbital period in seconds
    const angle = (simTime / orbitPeriod) * 2 * Math.PI;
    const distance = 100; // Distance doesn't matter for directional light
    return Math.cos(angle) * distance;
  });
  
  let sunY = $derived(10); // Keep some Y height - simple derived
  
  let sunZ = $derived.by(() => {
    const simTime = venusTime.state.simulationTime;
    const orbitPeriod = 224.7 * 24 * 3600; // Venus orbital period in seconds  
    const angle = (simTime / orbitPeriod) * 2 * Math.PI;
    const distance = 100; // Distance doesn't matter for directional light
    return Math.sin(angle) * distance;
  });
</script>

<!-- Reduced ambient light to see directional lighting better -->
<T.AmbientLight intensity={0.1} color="#FFF8DC" />
<T.DirectionalLight position={[sunX, sunY, sunZ]} intensity={2.0} color="#FFEB3B" />

<!-- Camera -->
<Camera />

<!-- Sun Components (separated for debugging) -->
<!-- <SunSphere 
  timeState={venusTime.state}
  visible={true}
/> -->

<!-- <SunLight 
  timeState={venusTime.state}
  visible={true}
  intensity={5.5}
/> -->

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