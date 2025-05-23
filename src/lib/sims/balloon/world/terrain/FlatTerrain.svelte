<!-- src/lib/sims/balloon/world/terrain/Terrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import { SIMULATION_CONSTANTS } from '../../constants';
  import { onMount } from 'svelte';
  
  // Props
  let { 
    terrainSize = SIMULATION_CONSTANTS.TERRAIN_SIZE,
    gridCellSize = 10000,      // 10km cells
    gridSectionSize = 50000,   // 50km sections
    subdivisions = 100,        // Number of terrain subdivisions
    heightScale = 10000,       // Max mountain height in meters
    baseColor = "#864A2E"      // Base terrain color
  } = $props();
  
  // Terrain position at ground level
  let terrainPosition = [0, SIMULATION_CONSTANTS.TERRAIN_HEIGHT, 0];
  let geometry: PlaneGeometry;
  
  // Create terrain geometry with height variation
  function createTerrainGeometry() {
    // Create a geometry with subdivisions
    geometry = new PlaneGeometry(terrainSize, terrainSize, subdivisions, subdivisions);
    const positions = geometry.getAttribute('position').array;
    
    // Generate heightfield using SimplexNoise
    const noise = new SimplexNoise();
    
    // Different noise scales for various terrain features
    const mountainsScale = 0.00001;    // Large mountains
    const hillsScale = 0.0001;         // Medium hills
    const roughnessScale = 0.001;      // Small details
    
    // Feature regions (simulate different terrain types on Venus)
    const highlandCenter = { x: terrainSize * 0.3, y: terrainSize * 0.4 }; // Highland terra region
    const volcanoCenter = { x: -terrainSize * 0.2, y: -terrainSize * 0.3 }; // Volcanic region
    
    // Generate terrain heights
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1]; // z is actually y in the geometry, flipped by rotation
      
      // Distance from feature centers (normalized 0-1)
      const highlandDist = Math.sqrt(Math.pow(x - highlandCenter.x, 2) + Math.pow(z - highlandCenter.y, 2)) / (terrainSize * 0.7);
      const volcanoDist = Math.sqrt(Math.pow(x - volcanoCenter.x, 2) + Math.pow(z - volcanoCenter.y, 2)) / (terrainSize * 0.5);
      
      // Venus terrain types
      let height = 0;
      
      // Base noise for global terrain variation
      const baseNoise = (
        noise.noise(x * mountainsScale, z * mountainsScale) * 0.5 + // Large features
        noise.noise(x * hillsScale, z * hillsScale) * 0.3 +         // Medium features
        noise.noise(x * roughnessScale, z * roughnessScale) * 0.2    // Small details
      );
      
      // 1. Volcanic mountains region (sharp, high peaks)
      if (volcanoDist < 0.6) {
        const volcanoInfluence = Math.max(0, 1 - volcanoDist * 1.7);
        const volcanoHeight = (baseNoise * 0.5 + 0.5) * volcanoInfluence;
        
        // Add volcanic peaks
        if (volcanoDist < 0.2 && baseNoise > 0.4) {
          height += volcanoHeight * heightScale * 1.5; // Taller peaks
        } else {
          height += volcanoHeight * heightScale * 0.8;
        }
      }
      
      // 2. Highland Terra region (high plateau with moderate variation)
      if (highlandDist < 0.8) {
        const highlandInfluence = Math.max(0, 1 - highlandDist * 1.3);
        height += highlandInfluence * heightScale * 0.4 + 
                 (baseNoise * highlandInfluence * heightScale * 0.3);
      }
      
      // 3. Global features (less prominent)
      height += baseNoise * heightScale * 0.2;
      
      // Set height
      positions[i + 2] = height;
    }
    
    // Update normals for lighting
    geometry.computeVertexNormals();
    
    return geometry;
  }
  
  // Generate terrain on mount
  onMount(() => {
    geometry = createTerrainGeometry();
  });
</script>

<T.Group position={terrainPosition}>
  <!-- Visual mesh -->
  {#if geometry}
    <T.Mesh
      receiveShadow
      {geometry}
      rotation={[-Math.PI/2, 0, 0]}
    >
      <T.MeshStandardMaterial
        color={baseColor}
        side={DoubleSide}
        flatShading={true}
      />
    </T.Mesh>
  {:else}
    <!-- Fallback while geometry is generating -->
    <T.Mesh
      receiveShadow
      rotation={[-Math.PI/2, 0, 0]}
    >
      <T.PlaneGeometry args={[terrainSize, terrainSize]} />
      <T.MeshStandardMaterial
        color={baseColor}
        side={DoubleSide}
      />
    </T.Mesh>
  {/if}

  <!-- Reference grid -->
  <Grid 
    position={[0, 5000, 0]} 
    cellSize={gridCellSize}
    sectionSize={gridSectionSize}
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={terrainSize}
    infiniteGrid={true}
  />
  
  <!-- Coordinate markers -->
  <T.Group position={[0, 1000, 0]}>
    <!-- North -->
    <T.Mesh position={[0, 0, -terrainSize/2 + 10000]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#4488ff" />
    </T.Mesh>
    
    <!-- East -->
    <T.Mesh position={[terrainSize/2 - 10000, 0, 0]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#ff8844" />
    </T.Mesh>
    
    <!-- Origin marker -->
    <T.Mesh position={[0, 1000, 0]}>
      <T.SphereGeometry args={[2000, 16, 16]} />
      <T.MeshStandardMaterial color="#ffff00" opacity={0.7} transparent={true} />
    </T.Mesh>
  </T.Group>
</T.Group>