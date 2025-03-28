<!-- src/lib/sims/material/scene/Scene.svelte -->

<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras';
	import Terrain from './Terrain.svelte'
	import Player from './Player.svelte'


</script>

<T.PerspectiveCamera
	makeDefault
	position={[20, 20, 20]}
>
	<OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight
	castShadow
	position={[8, 20, -3]}
/>

<T.GridHelper args={[50]} />

	<Player />

<Terrain />

