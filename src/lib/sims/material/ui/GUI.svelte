<!-- src/lib/sims/material/scene/GUI.svelte -->

<!-- ui/GUI.svelte -->
<script lang="ts">
  import { Pane, Button, Checkbox, Slider } from 'svelte-tweakpane-ui'
  import { getPhysicsContext } from '../physics/context.svelte';
  
  // Get the physics context
  const physics = getPhysicsContext();
  
  // Create local tracked states
  let debugState = $state(physics.debug);
  let buoyancyState = $state(physics.buoyancy);
  let gravityState = $state(physics.gravity);
  let pausedState = $state(physics.paused);
  
  // Watch for changes to local state and update context
  $effect(() => {
    physics.setDebug(debugState);
    console.log('Debug state changed to:', debugState);
  });
  
  $effect(() => {
    physics.setBuoyancy(buoyancyState);
  });
  
  $effect(() => {
    physics.setGravity(gravityState);
  });
  
  $effect(() => {
    physics.setPaused(pausedState);
  });
  
  // Watch for changes in the context and update local state
  $effect(() => {
    debugState = physics.debug;
    buoyancyState = physics.buoyancy;
    gravityState = physics.gravity;
    pausedState = physics.paused;
  });
  
  // Reset function
  function handleReset() {
    physics.resetSimulation();
  }
</script>

<Pane
  title="Venus Balloon Simulator"
  position="fixed"
>
  <Checkbox
    bind:value={debugState}
    label="Debug Physics"
  />
  
  <Slider
    bind:value={buoyancyState}
    min={0}
    max={1.5}
    step={0.01}
    label="Buoyancy Force"
  />
  
  <Slider
    bind:value={gravityState}
    min={0}
    max={20}
    step={0.1}
    label="Gravity (m/s²)"
  />
  
  <Checkbox
    bind:value={pausedState}
    label="Pause Simulation"
  />

  <Button label="Reset" onclick={handleReset} />
</Pane>