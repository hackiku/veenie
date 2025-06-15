<!-- src/lib/sims/fog/world/terrain/SimpleTerrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { DoubleSide } from 'three';
  import { VENUS_CONSTANTS } from '../../constants';
  
  // Terrain parameters
  const terrainSize = VENUS_CONSTANTS.TERRAIN_SIZE;
  const terrainHeight = VENUS_CONSTANTS.TERRAIN_HEIGHT;
  
  // Venus-like terrain color
  const terrainColor = '#8B4513'; // Reddish-brown for Venus surface
</script>

<!-- Ground plane -->
<T.Group position={[0, terrainHeight, 0]}>
  <!-- Main terrain mesh -->
  <T.Mesh
    receiveShadow
    rotation={[-Math.PI/2, 0, 0]}
  >
    <T.PlaneGeometry args={[terrainSize, terrainSize]} />
    <T.MeshStandardMaterial
      color={terrainColor}
      side={DoubleSide}
      roughness={0.9}
      metalness={0.1}
    />
  </T.Mesh>

  <!-- Reference grid -->
  <Grid 
    position={[0, 10, 0]}
    cellSize={10000}      
    sectionSize={50000}     
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={100000}
    infiniteGrid={true}
  />
  
  <!-- Coordinate markers -->
  <T.Group position={[0, 1000, 0]}>
    <!-- North marker (blue) -->
    <T.Mesh position={[0, 0, -50000]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#4488ff" />
    </T.Mesh>
    
    <!-- East marker (red) -->
    <T.Mesh position={[50000, 0, 0]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#ff4488" />
    </T.Mesh>
    
    <!-- South marker (green) -->
    <T.Mesh position={[0, 0, 50000]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#44ff88" />
    </T.Mesh>
    
    <!-- West marker (yellow) -->
    <T.Mesh position={[-50000, 0, 0]}>
      <T.CylinderGeometry args={[1000, 1000, 2000, 16]} />
      <T.MeshStandardMaterial color="#ffff44" />
    </T.Mesh>
  </T.Group>
</T.Group>