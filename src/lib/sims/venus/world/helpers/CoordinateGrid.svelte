<!-- src/lib/sims/venus/world/helpers/CoordinateGrid.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props
  let { 
    planetRadius = 6051.8,
    gridSpacing = 30,
    opacity = 0.3,
    visible = true
  } = $props();
  
  // Generate latitude lines
  const latitudes = [];
  for (let lat = -60; lat <= 60; lat += gridSpacing) {
    if (lat !== 0) latitudes.push(lat);
  }
  
  // Generate longitude lines  
  const longitudes = [];
  for (let lon = 0; lon < 360; lon += gridSpacing) {
    longitudes.push(lon);
  }
  
  // Colors
  const normalColor = "#FFB366";
  const equatorColor = "#FF6B35";
  const primeMeridianColor = "#4ECDC4";
</script>

{#if visible}
  <T.Group>
    <!-- Equator (special line) -->
    <T.Mesh>
      <T.RingGeometry args={[planetRadius * 0.999, planetRadius * 1.001, 0, 64]} />
      <T.MeshBasicMaterial 
        color={equatorColor}
        transparent 
        opacity={opacity * 2}
        side={2}
      />
      <T.Group rotation={[Math.PI/2, 0, 0]} />
    </T.Mesh>
    
    <!-- Prime Meridian -->
    <T.Mesh>
      <T.RingGeometry args={[planetRadius * 0.999, planetRadius * 1.001, 0, 64]} />
      <T.MeshBasicMaterial 
        color={primeMeridianColor}
        transparent 
        opacity={opacity * 1.5}
        side={2}
      />
      <T.Group rotation={[0, 0, Math.PI/2]} />
    </T.Mesh>
    
    <!-- Latitude lines -->
    {#each latitudes as lat}
      {@const latRad = lat * Math.PI / 180}
      {@const radius = planetRadius * Math.cos(latRad)}
      {@const yPos = planetRadius * Math.sin(latRad)}
      
      <T.Mesh position={[0, yPos, 0]}>
        <T.RingGeometry args={[radius * 0.999, radius * 1.001, 0, 32]} />
        <T.MeshBasicMaterial 
          color={normalColor}
          transparent 
          opacity={opacity}
          side={2}
        />
        <T.Group rotation={[Math.PI/2, 0, 0]} />
      </T.Mesh>
    {/each}
    
    <!-- Longitude lines -->
    {#each longitudes as lon}
      {#if lon !== 0}
        {@const lonRad = lon * Math.PI / 180}
        <T.Mesh>
          <T.RingGeometry args={[planetRadius * 0.999, planetRadius * 1.001, 0, 32]} />
          <T.MeshBasicMaterial 
            color={normalColor}
            transparent 
            opacity={opacity * 0.7}
            side={2}
          />
          <T.Group rotation={[0, lonRad, Math.PI/2]} />
        </T.Mesh>
      {/if}
    {/each}
  </T.Group>
{/if}