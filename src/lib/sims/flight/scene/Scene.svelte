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
  
  // Access rapier world
  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
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
<Player />

<!-- Venus atmosphere visual effects -->
<Atmosphere />