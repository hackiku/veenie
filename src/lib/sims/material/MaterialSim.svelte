<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { Gizmo, type GizmoOptions, OrbitControls } from '@threlte/extras'

  import Scene from './scene/Scene.svelte';
  import GUI from './scene/GUI.svelte';

  // State variables
  let debug = $state(false);
  let buoyancy = $state(0.3);
  let gravity = $state(8.87); // Venus gravity default
  let paused = $state(false);
  
  // Derive the gravity vector from our gravity scalar
  // let gravityVector = $derived([0, -gravity, 0]);
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
      gravity={[0, -gravity, 0]}
      paused={paused}
      timeStep={1/60}
    >
      {#if debug}
        <Debug />
      {/if}

      <Scene {buoyancy} />
    </World>
  </Canvas>
</div>