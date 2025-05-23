<!-- src/lib/sims/balloon/world/terrain/Terrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import { SIMULATION_CONSTANTS } from '../../constants';
  
  // Terrain generation parameters (copy exact method from rapier version)
  const nsubdivs = 20;
  const size = SIMULATION_CONSTANTS.TERRAIN_SIZE;
  const heights = [];
  
  // Create geometry for visualization (direct, no onMount)
  const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs);
  const positions = geometry.getAttribute('position').array;
  
  // Generate heightfield using SimplexNoise (exact same approach)
  const noise = new SimplexNoise();
  
  // Generate terrain heights (copy the exact loop structure)
  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      // Compute terrain height using noise (same as rapier version)
      const noiseValue = noise.noise(x / 4, y / 4);
      const height = isNaN(noiseValue) ? 0 : noiseValue * 11000; // Scale up for Venus (3.5km max height)
      
      // Update geometry vertices (exact same calculation)
      const vertIndex = (x + (nsubdivs + 1) * y) * 3;
      positions[vertIndex + 2] = height;
      
      // Store heights for reference
      const heightIndex = y + (nsubdivs + 1) * x;
      heights[heightIndex] = height;
    }
  }
  
  // Update normals for lighting (same as rapier)
  geometry.computeVertexNormals();
  
  // Terrain position at ground level
  let terrainPosition = [0, SIMULATION_CONSTANTS.TERRAIN_HEIGHT, 0];
</script>

<!-- Terrain with heightfield (same structure as rapier) -->
<T.Group position={terrainPosition}>
  <!-- Visual mesh -->
  <T.Mesh
    receiveShadow
    {geometry}
    rotation={[DEG2RAD * -90, 0, 0]}
  >
    <T.MeshStandardMaterial
      color="#864A2E" 
      opacity={0.9}
      transparent={true}
      side={DoubleSide}
    />
  </T.Mesh>
  
  <!-- Reference grid (adjusted for larger scale) -->
  <!-- <Grid 
    position={[0, 0, 0]}
    cellSize={5000}
    sectionSize={100000}
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={size * 0.8}
    infiniteGrid={true}
  /> -->
  <Grid 
    position={[0, 0, 0]}
    cellSize={10000}
    sectionSize={100000}
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={size * 0.8}
    infiniteGrid={true}
  />
</T.Group>