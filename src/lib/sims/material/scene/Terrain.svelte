<!-- src/lib/sims/material/scene/Terrain.svelte -->

<script lang="ts">
	import { T } from '@threlte/core'
	import { Collider, Debug, RigidBody, AutoColliders } from '@threlte/rapier';

	let terrainPosition: [x: number, y: number, z: number] = $state([0, -1, 0,]);

</script>

<T.Group position={terrainPosition}>
	<!-- <AutoColliders shape={'ball'}>  -->
	<AutoColliders> 
		<T.Mesh receiveShadow> 
			<T.BoxGeometry args={[10, 2, 10]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</AutoColliders>
</T.Group>