<!-- src/lib/sims/venus/world/planet/Planet.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props
  let { 
    timeState,
    showCoordinateGrid = true,
    planetRadius = 6051.8 // Venus radius in km (rendering scale)
  } = $props();
  
  // Planet rotation (Venus rotates backwards/retrograde!)
  // Convert from degrees to radians
  const rotation = $derived([0, (timeState.venusRotation * Math.PI) / 180, 0]);
  
  // Create simple coordinate grid materials
  const gridOpacity = 0.2;
</script>

<!-- Venus Planet -->
<T.Group rotation={rotation}>
  <!-- Main planet surface -->
  <T.Mesh receiveShadow castShadow>
    <T.SphereGeometry args={[planetRadius, 64, 32]} />
    <T.MeshStandardMaterial 
      color="#CC8400"  
      roughness={0.9}
      metalness={0.1}
    />
  </T.Mesh>
  
  <!-- Simple coordinate grid overlay -->
  {#if showCoordinateGrid}
    <!-- Equator -->
    <T.Mesh>
      <T.RingGeometry args={[planetRadius * 0.999, planetRadius * 1.001, 0, 64]} />
      <T.MeshBasicMaterial 
        color="#FFAA00" 
        transparent 
        opacity={gridOpacity * 2}
        side={2}
      />
      <T.Group rotation={[Math.PI/2, 0, 0]} />
    </T.Mesh>
    
    <!-- Latitude lines -->
    {#each [-60, -30, 30, 60] as lat}
      <T.Mesh>
        <T.RingGeometry 
          args={[
            planetRadius * Math.cos(lat * Math.PI / 180) * 0.999, 
            planetRadius * Math.cos(lat * Math.PI / 180) * 1.001, 
            0, 64
          ]} 
        />
        <T.MeshBasicMaterial 
          color="#FF8800" 
          transparent 
          opacity={gridOpacity}
          side={2}
        />
        <T.Group 
          rotation={[Math.PI/2, 0, 0]} 
          position={[0, planetRadius * Math.sin(lat * Math.PI / 180), 0]} 
        />
      </T.Mesh>
    {/each}
    
    <!-- Longitude lines (simplified - just a few major ones) -->
    {#each [0, 60, 120, 180, 240, 300] as lon}
      <T.Mesh>
        <T.RingGeometry args={[planetRadius * 0.999, planetRadius * 1.001, 0, 32]} />
        <T.MeshBasicMaterial 
          color="#FFCC00" 
          transparent 
          opacity={gridOpacity * 0.5}
          side={2}
        />
        <T.Group 
          rotation={[0, (lon * Math.PI) / 180, Math.PI/2]} 
        />
      </T.Mesh>
    {/each}
  {/if}
</T.Group>

<!-- Debug info -->
{#if import.meta.env.DEV}
  <T.Mesh position={[0, planetRadius * 1.2, 0]}>
    <T.BoxGeometry args={[100, 100, 100]} />
    <T.MeshBasicMaterial color="#FF0000" />
  </T.Mesh>
{/if}