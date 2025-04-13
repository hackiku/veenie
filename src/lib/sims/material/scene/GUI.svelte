<!-- src/lib/sims/material/scene/GUI.svelte -->
<script lang="ts">
  import { Pane, Button, Checkbox, Slider } from 'svelte-tweakpane-ui'

  let { 
    debug = $bindable(),
    buoyancy = $bindable(),
    gravity = $bindable(),
    paused = $bindable(),
		onReset
  } = $props();

	// let { onReset } = $props();
</script>

<Pane
  title="Venus Balloon Simulator"
  position="fixed"
>
  <Checkbox
    bind:value={debug}
    label="Debug Physics"
  />
  
  <Slider
    bind:value={buoyancy}
    min={0}
    max={1.5}
    step={0.01}
    label="Buoyancy Force"
  />
  
  <Slider
    bind:value={gravity}
    min={0}
    max={20}
    step={0.1}
    label="Gravity (m/s²)"
  />
  
  <Checkbox
    bind:value={paused}
    label="Pause Simulation"
  />

	<Button label="Reset" onclick={onReset} />

</Pane>