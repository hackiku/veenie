<!-- src/lib/sims/material/MaterialSim.svelte -->
<!-- MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { createPhysicsContext } from './physics/context.svelte';
  import Scene from './Scene.svelte';
  import GUI from './ui/GUI.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  
  // Create physics context - this is now our single source of truth
  const physics = createPhysicsContext();
</script>

<GUI />

<Altimeter 
  position="bottom-right"
  value={physics.bodyPosition[1]}
  min={0}
  max={20}
  label="Height"
  unit="m"
/>

<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={physics.gravityVector}
      paused={physics.paused}
      timeStep={1/60}
    >
      {#if physics.debug}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>