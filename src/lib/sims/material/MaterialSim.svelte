<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'

  import Scene from './scene/Scene.svelte';
  import GUI from './scene/GUI.svelte';

  // State variables
  let debug = $state(false);
  let buoyancy = $state(0.31);
  let gravity = $state(8.87);
  let paused = $state(false);
  
  let bodyPosition = $state([0, 10, 0]);
  // let bodyPosition = $state<[number, number, number]>([0, 10, 0]);
  let gravityVector = $derived([0, -gravity, 0]);
</script>

<GUI 
  bind:debug={debug} 
  bind:buoyancy={buoyancy} 
  bind:gravity={gravity}
  bind:paused={paused}
/>

<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={gravityVector}
      paused={paused}
      timeStep={1/60}
    >
      {#if debug}
        <Debug />
      {/if}

      <Scene 
        {buoyancy}
				{bodyPosition}
      />
    </World>
  </Canvas>
</div>