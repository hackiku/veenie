<!-- src/lib/sims/material/scene/Terrain.svelte -->

<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier';

	let terrainPosition: number[] = $state([0, -1, 0,])

</script>

<T.Group position={terrainPosition}>
<!-- <T.Group position={[0, -1, 0,]}> -->
	<AutoColliders shape={'ball'}> 
		<T.Mesh receiveShadow> 
			<T.BoxGeometry args={[20, 2, 20]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</AutoColliders>
</T.Group>