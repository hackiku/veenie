<!-- src/lib/sims/material/scene/GUI.svelte -->

<script lang="ts">
  import { Pane, Button, Checkbox } from 'svelte-tweakpane-ui'

	let { debug } = $props<{
		debug: boolean,
	}>();
</script>

<Pane
	title="Materials Science"
	position="fixed"
>
	<Checkbox
		bind:value={debug}
		label="Debug"
	/>
	<!-- <Button
		title="Reset"
		on:click={onReset}
	/> -->
</Pane>
