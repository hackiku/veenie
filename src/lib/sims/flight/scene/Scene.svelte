<!-- src/lib/sims/flight/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { useRapier } from "@threlte/rapier";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  import Grid from "./Grid.svelte";
  import Camera from "./Camera.svelte";
  import SunLight from "./SunLight.svelte";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Scene settings
  let debug = $state(false);
  
  // Access rapier world
  const { world } = useRapier();
  
  // Player settings
  const playerSettings = $state({
    startPosition: [0, flightStore.CLOUD_ALTITUDE, 0],
    color: "#4080ff", 
    mass: 10,
    debug: false
  });
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Update world gravity from flightStore
      world.gravity = { x: 0, y: flightStore.VENUS_GRAVITY, z: 0 };
    }
  });
  
</script>



<!-- Main camera with orbit controls -->
<Camera />

<!-- Venus lighting -->
<SunLight />

<!-- Grid for orientation -->
<Grid />

<!-- Player (physics-enabled ball) -->
<Player 
  startPosition={playerSettings.startPosition}
  color={playerSettings.color}
  mass={playerSettings.mass}
  debug={playerSettings.debug}
/>

<!-- Venus atmosphere visual effects -->
<Atmosphere />