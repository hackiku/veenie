<!-- src/lib/sims/material/world/Terrain.svelte -->
<script lang="ts">
	import RAPIER, { RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T } from '@threlte/core'
  import { Environment, Grid } from '@threlte/extras';
	import { Collider, Debug, RigidBody, AutoColliders } from '@threlte/rapier';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';

	const heights: number[] = []
	
	const nsubdivs = 30
	const size = 500

  const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs)
	
	const noise = new SimplexNoise()
	const positions = geometry.getAttribute('position').array

  // Ensure we don't get NaN values in terrain geometry
  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      // Use reduced amplitude noise with safety checks
      const noiseValue = noise.noise(x / 4, y / 4);
      const height = isNaN(noiseValue) ? 0 : noiseValue * 2;
      
      const vertIndex = (x + (nsubdivs + 1) * y) * 3
      positions[vertIndex + 2] = height
      const heightIndex = y + (nsubdivs + 1) * x
      heights[heightIndex] = height
    }
  }

	// needed for lighting
	geometry.computeVertexNormals()

	const scale = new RAPIER.Vector3(size, 10, size)

	// Position terrain at high altitude (50900m)
	let terrainPosition: [x: number, y: number, z: number] = [0, 50900, 0];
</script>

<!-- Positioned at high altitude -->
<T.Group position={terrainPosition}>
  <!-- Main terrain mesh -->
  <T.Mesh
    receiveShadow
    {geometry}
    rotation={[DEG2RAD * -90, 0, 0]}
  >
    <T.MeshStandardMaterial
      color="orange"
      opacity={0.6}
      transparent
      side={DoubleSide}
    />
  </T.Mesh>
  
  <!-- Terrain collider -->
  <RigidBody type="fixed">
    <Collider
      shape="heightfield"
      args={[nsubdivs, nsubdivs, heights, scale]}
    />
  </RigidBody>

  <!-- Grid for visual reference -->
  <Grid 
    position={[0, 5, 0]}
    cellSize={50}
    sectionSize={40}
    cellColor="#666666"
    sectionColor="#444444"
    fadeDistance={300}
    infiniteGrid 
  />
</T.Group>