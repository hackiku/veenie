<!-- sims/rapier-balloon/world/Terrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import { RigidBody, Collider } from '@threlte/rapier';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Terrain generation parameters
  const nsubdivs = 120; // Reduced for better performance
  const size = SIMULATION_CONSTANTS.TERRAIN_SIZE;
  const heights = [];
  
  // Create geometry for visualization
  const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs);
  const positions = geometry.getAttribute('position').array;
  
  // Generate heightfield using SimplexNoise
  const noise = new SimplexNoise();
  
  // Generate terrain heights
  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      // Compute terrain height using noise
      const noiseValue = noise.noise(x / 4, y / 4);
      const height = isNaN(noiseValue) ? 0 : noiseValue * 3.5; // Increased amplitude for visibility
      
      // Update geometry vertices
      const vertIndex = (x + (nsubdivs + 1) * y) * 3;
      positions[vertIndex + 2] = height;
      
      // Store heights for collider
      const heightIndex = y + (nsubdivs + 1) * x;
      heights[heightIndex] = height;
    }
  }
  
  // Update normals for lighting
  geometry.computeVertexNormals();
  
  // Scale for the heightfield collider
  const scale = { x: size, y: 10, z: size };
  
  // Terrain position at ground level (for this simplified version)
  let terrainPosition = [0, SIMULATION_CONSTANTS.TERRAIN_HEIGHT, 0];
</script>

<!-- Terrain with heightfield -->
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
      transparent={false}
      side={DoubleSide}
    />
  </T.Mesh>
  
  <!-- Physics collider -->
  <RigidBody type="fixed">
    <Collider
      shape="heightfield"
      args={[nsubdivs, nsubdivs, heights, scale]}
    />
  </RigidBody>

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