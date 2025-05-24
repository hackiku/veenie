<!-- // src/lib/sims/balloon/world/atmosphere/VenusDistanceFog.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { getAtmosphericConditions } from '../../physics/atmosphere';
  
  // Props  
  let {
    balloonAltitude = 55000,
    maxVisibility = 5000, // 50km max visibility on Venus
    updateInterval = 1000   // Update fog every second
  } = $props();
  
  // Fog parameters based on altitude
  let fogColor = $state('#E4DEB7');  // Venus atmosphere color
  let fogNear = $state(100);        // Start fog at 1km
  let fogFar = $state(2000);        // Full fog at 20km
  let fogDensity = $state(1.08);  // Exponential fog density
  
  // Update fog based on balloon altitude and Venus atmosphere
  function updateFog() {
    const atmosphere = getAtmosphericConditions(balloonAltitude);
    
    // Calculate visibility based on atmospheric density
    const baseVisibility = 50000; // 50km max
    const densityFactor = Math.min(atmosphere.density / 10, 1); // Normalize to 0-1
    const actualVisibility = baseVisibility * (1 - densityFactor * 0.8);
    
    // Set fog distance based on visibility
    fogNear = Math.max(500, actualVisibility * 0.1);   // 10% of visibility
    fogFar = Math.min(maxVisibility, actualVisibility); // Full visibility range
    
    // Adjust fog density - thicker at lower altitudes
    fogDensity = 0.00001 + (densityFactor * 0.0002);
    
    // Color based on altitude layer
    if (balloonAltitude > 80000) {
      fogColor = '#85C9FE';      // Upper atmosphere - blue
    } else if (balloonAltitude > 60000) {
      fogColor = '#E4DEB7';      // Cloud layer - beige  
    } else if (balloonAltitude > 40000) {
      fogColor = '#FFEDBF';      // Lower clouds - pale orange
    } else if (balloonAltitude > 20000) {
      fogColor = '#FEDD91';      // Dense atmosphere - golden
    } else {
      fogColor = '#F6A309';      // Surface layer - orange
    }
  }
  
  // Update fog periodically
  let fogUpdateInterval;
  if (typeof window !== 'undefined') {
    fogUpdateInterval = setInterval(updateFog, updateInterval);
  }
  
  // Initial update
  updateFog();
  
  // Cleanup
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (fogUpdateInterval) {
      clearInterval(fogUpdateInterval);
    }
  });
</script>

<!-- Venus Distance Fog -->
<T.FogExp2 
  color={fogColor}
  density={fogDensity}
/>

<!-- Alternative: Linear Fog (sometimes better performance) -->
<!-- 
<T.Fog 
  color={fogColor}
  near={fogNear}
  far={fogFar}
/>
-->