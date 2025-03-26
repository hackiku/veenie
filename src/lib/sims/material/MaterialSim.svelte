<!-- src/lib/sims/material/MaterialSim.svelte -->

<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Studio } from '@threlte/studio'
	import { World } from '@threlte/rapier'
	import Scene from './scene/Scene.svelte';
	import GUI from './scene/GUI.svelte';

</script>

<GUI />

<div class="w-screen h-screen">
	<Canvas>
		<World
			framerate={60}
		>
			<Scene />
		</World>
	</Canvas>
</div>
