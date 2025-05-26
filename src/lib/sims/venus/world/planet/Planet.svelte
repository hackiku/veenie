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
  const gridOpacity = 0.3;
</script>

<!-- Venus Planet -->
<T.Group rotation={rotation}>
  <!-- Main planet surface -->
  <T.Mesh receiveShadow>
    <T.SphereGeometry args={[planetRadius, 64, 32]} />
    <T.MeshStandardMaterial 
      color="#D4822A"  
      roughness={0.95}
      metalness={0.05}
      emissive="#331100"
      emissiveIntensity={0.1}
    />
  </T.Mesh>
  
  <!-- Simple coordinate grid overlay -->
  {#if showCoordinateGrid}
    <!-- Equator (brighter) -->
    <T.Mesh>
      <T.RingGeometry args={[planetRadius * 1.001, planetRadius * 1.002, 0, 64]} />
      <T.MeshBasicMaterial 
        color="#FF6B35" 
        transparent 
        opacity={gridOpacity * 3}
        side={2}
      />
      <T.Group rotation={[Math.PI/2, 0, 0]} />
    </T.Mesh>
    
    <!-- Prime Meridian (different color) -->
    <T.Mesh>
      <T.RingGeometry args={[planetRadius * 1.001, planetRadius * 1.002, 0, 32]} />
      <T.MeshBasicMaterial 
        color="#4ECDC4" 
        transparent 
        opacity={gridOpacity * 2}
        side={2}
      />
      <T.Group rotation={[0, 0, Math.PI/2]} />
    </T.Mesh>
    
    <!-- Latitude lines -->
    {#each [-60, -30, 30, 60] as lat}
      {@const latRad = lat * Math.PI / 180}
      {@const radius = planetRadius * Math.cos(latRad)}
      {@const yPos = planetRadius * Math.sin(latRad)}
      
      <T.Mesh position={[0, yPos, 0]}>
        <T.RingGeometry 
          args={[radius * 1.001, radius * 1.002, 0, 32]} 
        />
        <T.MeshBasicMaterial 
          color="#FFB366" 
          transparent 
          opacity={gridOpacity}
          side={2}
        />
        <T.Group rotation={[Math.PI/2, 0, 0]} />
      </T.Mesh>
    {/each}
    
    <!-- Longitude lines (every 60 degrees) -->
    {#each [60, 120, 180, 240, 300] as lon}
      <T.Mesh>
        <T.RingGeometry args={[planetRadius * 1.001, planetRadius * 1.002, 0, 32]} />
        <T.MeshBasicMaterial 
          color="#FFB366" 
          transparent 
          opacity={gridOpacity * 0.7}
          side={2}
        />
        <T.Group 
          rotation={[0, (lon * Math.PI) / 180, Math.PI/2]} 
        />
      </T.Mesh>
    {/each}
  {/if}
</T.Group>