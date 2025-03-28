<!-- src/lib/sims/material/MaterialSim.svelte -->

<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Studio } from '@threlte/studio'
	import { World, Debug } from '@threlte/rapier'

	import Scene from './scene/Scene.svelte';
	import GUI from './scene/GUI.svelte';

	let debug = $state(false);

</script>

<!-- <GUI debug={debug}/> -->
<!-- <GUI {debug}/> -->
<GUI bind:debug={debug}/>

<div class="w-screen h-screen">
	<Canvas>
		<World
			framerate={60}
		>
		{#if debug}
			<Debug />
		{/if}

			<Scene />
		</World>
	</Canvas>
</div>
