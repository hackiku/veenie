<!-- src/lib/sims/material/world/Terrain.svelte -->
<script lang="ts">
	import { T } from '@threlte/core'
	import { Grid } from '@threlte/extras';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { DoubleSide, PlaneGeometry } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	// Simple flat terrain
	const size = 500;
	const geometry = new PlaneGeometry(size, size);
	
	// Position terrain at high altitude (50900m)
	const terrainPosition: [number, number, number] = [0, 50900, 0];
</script>

<!-- Positioned at high altitude -->
<T.Group position={terrainPosition}>
	<!-- Main terrain mesh - flat yellow surface -->
	<T.Mesh
		receiveShadow
		{geometry}
		rotation={[DEG2RAD * -90, 0, 0]}
	>
		<T.MeshStandardMaterial
			color="#FFDD00"
			opacity={0.6}
			transparent
			side={DoubleSide}
		/>
	</T.Mesh>
	
	<!-- Flat terrain collider -->
	<RigidBody type="fixed">
		<Collider
			shape="cuboid"
			args={[size/2, 1, size/2]} 
			position={[0, -0.5, 0]}
		/>
	</RigidBody>

	<!-- Grid for visual reference -->
	<Grid 
		position={[0, 0.1, 0]}
		cellSize={25}
		sectionSize={50}
		cellColor="#666666"
		sectionColor="#444444"
		fadeDistance={500}
		infiniteGrid 
	/>
</T.Group>