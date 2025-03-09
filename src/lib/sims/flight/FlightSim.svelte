<!-- src/lib/sims/flight/FlightSim.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
	
  import Scene from './scene/Scene.svelte'
  import FallbackScene from './scene/FallbackScene.svelte'

</script>

<Canvas>
  <World>
    <Debug />

    <Scene />
	  {#snippet fallback()}
      <FallbackScene />
    {/snippet}

    <!-- Everything is happening inside this component -->
  </World>
</Canvas>
