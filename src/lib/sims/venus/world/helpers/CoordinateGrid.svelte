<!-- src/lib/sims/venus/world/helpers/CoordinateGrid.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { DoubleSide } from 'three';
  
  // Props
  let { 
    planetRadius = 6051.8, // Venus radius in km (rendering scale)
    gridSpacing = 30,       // Degrees between grid lines
    opacity = 0.3,          // Grid line opacity
    visible = true          // Toggle visibility
  } = $props();
  
  // Calculate grid line positions
  const latitudes = [];
  const longitudes = [];
  
  // Generate latitude lines (-90 to +90, excluding poles)
  for (let lat = -90 + gridSpacing; lat < 90; lat += gridSpacing) {
    if (lat !== 0) latitudes.push(lat); // We'll handle equator specially
  }
  
  // Generate longitude lines (0 to 360)
  for (let lon = 0; lon < 360; lon += gridSpacing) {
    longitudes.push(lon);
  }
  
  // Special lines
  const equatorLat = 0;
  const primeMeridianLon = 0;
  
  // Grid colors
  const normalGridColor = "#FFB366";     // Orange for normal grid lines
  const equatorColor = "#FF6B35";        // Bright orange for equator
  const primeMeridianColor = "#4ECDC4";  // Cyan for prime meridian
</script>

{#if visible}
  <T.Group>
    <!-- Equator (special highlight) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[planetRadius * 0.9995, planetRadius * 1.0005, 0, 128]} 
      />
      <T.MeshBasicMaterial 
        color={equatorColor}
        transparent 
        opacity={opacity * 1.5}
        side={DoubleSide}
      />
      <T.Group rotation={[Math.PI/2, 0, 0]} />
    </T.Mesh>
    
    <!-- Prime Meridian (special highlight) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[planetRadius * 0.9995, planetRadius * 1.0005, 0, 128]} 
      />
      <T.MeshBasicMaterial 
        color={primeMeridianColor}
        transparent 
        opacity={opacity * 1.2}
        side={DoubleSide}
      />
      <T.Group rotation={[0, 0, Math.PI/2]} />
    </T.Mesh>
    
    <!-- Latitude lines -->
    {#each latitudes as lat}
      <T.Mesh>
        <T.RingGeometry 
          args={[
            planetRadius * Math.cos(lat * Math.PI / 180) * 0.9998, 
            planetRadius * Math.cos(lat * Math.PI / 180) * 1.0002, 
            0, 
            64
          ]} 
        />
        <T.MeshBasicMaterial 
          color={normalGridColor}
          transparent 
          opacity={opacity}
          side={DoubleSide}
        />
        <T.Group 
          rotation={[Math.PI/2, 0, 0]} 
          position={[0, planetRadius * Math.sin(lat * Math.PI / 180), 0]} 
        />
      </T.Mesh>
    {/each}
    
    <!-- Longitude lines -->
    {#each longitudes as lon}
      {#if lon !== primeMeridianLon}
        <T.Mesh>
          <T.RingGeometry 
            args={[planetRadius * 0.9998, planetRadius * 1.0002, 0, 64]} 
          />
          <T.MeshBasicMaterial 
            color={normalGridColor}
            transparent 
            opacity={opacity * 0.7}
            side={DoubleSide}
          />
          <T.Group 
            rotation={[0, (lon * Math.PI) / 180, Math.PI/2]} 
          />
        </T.Mesh>
      {/if}
    {/each}
    
    <!-- Tropics and Arctic/Antarctic Circles -->
    <!-- Tropic of Cancer (23.5°N) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[
          planetRadius * Math.cos(23.5 * Math.PI / 180) * 0.9996, 
          planetRadius * Math.cos(23.5 * Math.PI / 180) * 1.0004, 
          0, 
          64
        ]} 
      />
      <T.MeshBasicMaterial 
        color="#FFDD44"
        transparent 
        opacity={opacity * 0.8}
        side={DoubleSide}
      />
      <T.Group 
        rotation={[Math.PI/2, 0, 0]} 
        position={[0, planetRadius * Math.sin(23.5 * Math.PI / 180), 0]} 
      />
    </T.Mesh>
    
    <!-- Tropic of Capricorn (23.5°S) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[
          planetRadius * Math.cos(-23.5 * Math.PI / 180) * 0.9996, 
          planetRadius * Math.cos(-23.5 * Math.PI / 180) * 1.0004, 
          0, 
          64
        ]} 
      />
      <T.MeshBasicMaterial 
        color="#FFDD44"
        transparent 
        opacity={opacity * 0.8}
        side={DoubleSide}
      />
      <T.Group 
        rotation={[Math.PI/2, 0, 0]} 
        position={[0, planetRadius * Math.sin(-23.5 * Math.PI / 180), 0]} 
      />
    </T.Mesh>
    
    <!-- Arctic Circle (66.5°N) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[
          planetRadius * Math.cos(66.5 * Math.PI / 180) * 0.9997, 
          planetRadius * Math.cos(66.5 * Math.PI / 180) * 1.0003, 
          0, 
          32
        ]} 
      />
      <T.MeshBasicMaterial 
        color="#66DDFF"
        transparent 
        opacity={opacity * 0.6}
        side={DoubleSide}
      />
      <T.Group 
        rotation={[Math.PI/2, 0, 0]} 
        position={[0, planetRadius * Math.sin(66.5 * Math.PI / 180), 0]} 
      />
    </T.Mesh>
    
    <!-- Antarctic Circle (66.5°S) -->
    <T.Mesh>
      <T.RingGeometry 
        args={[
          planetRadius * Math.cos(-66.5 * Math.PI / 180) * 0.9997, 
          planetRadius * Math.cos(-66.5 * Math.PI / 180) * 1.0003, 
          0, 
          32
        ]} 
      />
      <T.MeshBasicMaterial 
        color="#66DDFF"
        transparent 
        opacity={opacity * 0.6}
        side={DoubleSide}
      />
      <T.Group 
        rotation={[Math.PI/2, 0, 0]} 
        position={[0, planetRadius * Math.sin(-66.5 * Math.PI / 180), 0]} 
      />
    </T.Mesh>
    
  </T.Group>
{/if}