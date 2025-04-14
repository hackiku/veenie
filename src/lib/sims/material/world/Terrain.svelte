<!-- src/lib/sims/material/scene/Terrain.svelte -->

<script lang="ts">
	import RAPIER, { RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T } from '@threlte/core'
  import { Environment } from '@threlte/extras';
	import { Collider, Debug, RigidBody, AutoColliders } from '@threlte/rapier';
  import { DoubleSide, PlaneGeometry } from 'three';
  import { SimplexNoise } from 'three/examples/jsm/Addons';
  import { DEG2RAD } from 'three/src/math/MathUtils';

	const heights: number[] = []
	
	const nsubdivs = 30
	const size = 20

  const geometry = new PlaneGeometry(size, size, nsubdivs, nsubdivs)
	
	const noise = new SimplexNoise()
	const positions = geometry.getAttribute('position').array

  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      const height = noise.noise(x / 4, y / 4)
      const vertIndex = (x + (nsubdivs + 1) * y) * 3
      positions[vertIndex + 2] = height
      const heightIndex = y + (nsubdivs + 1) * x
      heights[heightIndex] = height
    }
  }

	// needed for lighting
	geometry.computeVertexNormals()

	const scale = new RAPIER.Vector3(size, 1, size)

	// let terrainPosition: [x: number, y: number, z: number] = $state([0, -1, 0,]);
	let terrainPosition: [x: number, y: number, z: number] = [0, -3, 0,];

</script>

<!-- <T.Group position={terrainPosition}>
	<AutoColliders> 
		<T.Mesh receiveShadow> 
			<T.BoxGeometry args={[20, 2, 20]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</AutoColliders>
</T.Group> -->

<!-- <Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" /> -->


<T.Mesh
  receiveShadow
  {geometry}
  rotation.x={DEG2RAD * -90}
>
  <T.MeshStandardMaterial
    color="orange"
    opacity={0.6}
    transparent
    side={DoubleSide}
  />
</T.Mesh>
<RigidBody type="fixed">
  <Collider
    shape="heightfield"
    args={[nsubdivs, nsubdivs, heights, scale]}
  />
</RigidBody>
