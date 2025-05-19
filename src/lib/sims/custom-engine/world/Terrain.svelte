<!-- src/lib/sims/custom-engine/world/Terrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { DoubleSide } from 'three';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Terrain position at ground level
  let terrainPosition = [0, SIMULATION_CONSTANTS.TERRAIN_HEIGHT, 0];
  const terrainSize = SIMULATION_CONSTANTS.TERRAIN_SIZE;
</script>

<!-- Simple flat terrain for custom engine -->
<T.Group position={terrainPosition}>
  <!-- Visual mesh -->
  <T.Mesh
    receiveShadow
    rotation={[-Math.PI/2, 0, 0]}
  >
    <T.PlaneGeometry args={[terrainSize, terrainSize]} />
    <T.MeshStandardMaterial
      color="#864A2E" 
      side={DoubleSide}
    />
  </T.Mesh>

  <!-- Reference grid -->
  <Grid 
    position={[0, 0.5, 0]}
    cellSize={25}
    sectionSize={50}
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={500}
    infiniteGrid={true}
  />
</T.Group>