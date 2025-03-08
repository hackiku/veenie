<!-- src/lib/sims/venus/world/space/Space.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import Sun from './Sun.svelte';
  import Orbit from './Orbit.svelte';
  import Planet from '../planet/Planet.svelte';
  
  // Props using runes
  let { 
    simulationSpeed = 1,
    showOrbits = true,
    showSun = true,
    // Add scale factor for space view
    spaceScale = 0.01 // Much smaller scale for space view
  } = $props<{
    simulationSpeed?: number;
    showOrbits?: boolean;
    showSun?: boolean;
    spaceScale?: number;
  }>();
  
  // Venus orbital parameters (in millions of km)
  const venusOrbit = {
    semiMajorAxis: 108.2,
    eccentricity: 0.0068,
    orbitalPeriod: 224.7, // Earth days
  };
  
  // Apply space scale to orbital dimensions
  const scaledSemiMajorAxis = venusOrbit.semiMajorAxis * spaceScale;
  
  // State
  let venusOrbitalPosition = $state({ x: 0, y: 0, z: 0 });
  
  // Animation logic for orbital movement
  let lastTime = performance.now();
  
  function tick() {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000; // seconds
    
    // Calculate orbital position
    const orbitalProgress = (Date.now() / (venusOrbit.orbitalPeriod * 24 * 60 * 60 * 1000)) * simulationSpeed;
    const angle = orbitalProgress * Math.PI * 2;
    
    venusOrbitalPosition = {
      x: Math.cos(angle) * scaledSemiMajorAxis,
      y: 0,
      z: Math.sin(angle) * scaledSemiMajorAxis
    };
    
    lastTime = currentTime;
    requestAnimationFrame(tick);
  }
  
  $effect(() => {
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  });
</script>

<!-- Sun placed at center -->
{#if showSun}
  <Sun radius={5} intensity={1.5} />
{/if}

<!-- Venus orbit path -->
{#if showOrbits}
  <Orbit 
    semiMajorAxis={scaledSemiMajorAxis} 
    eccentricity={venusOrbit.eccentricity}
    color={0x88AAFF}
  />
{/if}

<!-- Venus at orbital position -->
<T.Group position={[venusOrbitalPosition.x, venusOrbitalPosition.y, venusOrbitalPosition.z]}>
  <!-- Adjust Venus size for space view -->
  <Planet scale={spaceScale * 0.01} /> 
</T.Group>