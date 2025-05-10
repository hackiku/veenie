<!-- src/lib/sims/material/world/Terrain.svelte -->
<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';
  import { getSimulationContext } from '../contexts/simulationContext.svelte';

  // Context to know where we should be
  const sim = getSimulationContext();
  
  // Base altitude for our terrain surface
  const baseAltitude = 50950;
  
  // Create a flatter terrain to avoid extreme variations
  const nsubdivs = 30;
  const size = 1000; // Even larger size to ensure it's visible
  const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs);
  
  // Create softer noise with reduced amplitude to prevent NaN issues
  const noise = new SimplexNoise();
  const positions = geometry.getAttribute('position').array;
  const heights = [];

  // Generate smoother, more gradual height variations
  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      // Generate noise with reduced amplitude (multiplied by 0.5)
      // and check explicitly for NaN values
      const noiseVal = noise.noise(x / 10, y / 10) * 0.5; 
      const height = isNaN(noiseVal) ? 0 : noiseVal;
      
      // Update vertex position in the geometry
      const vertIndex = (x + (nsubdivs + 1) * y) * 3;
      positions[vertIndex + 2] = height;
      
      // Store for the heightfield collider
      const heightIndex = y + (nsubdivs + 1) * x;
      heights[heightIndex] = height;
    }
  }

  // Ensure proper normals for lighting
  geometry.computeVertexNormals();
  
  // Create properly sized scale for the collider
  const scale = { x: size, y: 1, z: size };
</script>

<!-- Use a Group to position everything together -->
<T.Group position={[0, baseAltitude, 0]}>
  <!-- Terrain mesh -->
  <T.Mesh
    receiveShadow
    {geometry}
    rotation.x={DEG2RAD * -90}
  >
    <T.MeshStandardMaterial
      color="#a85432"
      opacity={0.9}
      transparent={false}
      side={DoubleSide}
    />
  </T.Mesh>
  
  <!-- Use a fixed rigid body directly (no AutoColliders) -->
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[size/2, 1, size/2]}
      position={[0, -1, 0]}
    />
  </RigidBody>
  
  <!-- Add a simple grid on top of terrain for visual reference -->
  <T.GridHelper 
    args={[size, 20]} 
    position={[0, 0.1, 0]}
  />
</T.Group>

<!-- Debug sphere to help visualize where 51000m is -->
<T.Mesh position={[0, 51000, 0]}>
  <T.SphereGeometry args={[10, 16, 16]} />
  <T.MeshStandardMaterial color="red" opacity={0.5} transparent />
</T.Mesh>