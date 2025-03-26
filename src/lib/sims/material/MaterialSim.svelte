<!-- src/lib/sims/material/MaterialSim.svelte -->

<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import Scene from './scene/Scene.svelte';
  import { Pane, Button } from 'svelte-tweakpane-ui'

</script>

<Pane
	title="Material Science"
	position="fixed"
>
	<Button
		title="play"
		on:click={() => {
			null
		}}
	/>
</Pane>

<div class="w-screen h-screen">
	<Canvas>
		<World>
			<Scene />
		</World>
	
	
	</Canvas>
</div>