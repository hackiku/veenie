<!-- src/lib/sims/material/scene/Scene.svelte -->

<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras';
	import Terrain from './Terrain.svelte'
    import { DirectionalLight, PerspectiveCamera } from 'three';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10,10,10]}
>
	<OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight
	castShadow
	position={[8, 20, -3]}
/>

<T.GridHelper args={[50]} />

<Terrain />