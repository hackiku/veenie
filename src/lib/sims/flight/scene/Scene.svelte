<!-- src/lib/sims/flight/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { useRapier } from "@threlte/rapier";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  import Grid from "./Grid.svelte";
  import Camera from "./Camera.svelte";
  import SunLight from "./SunLight.svelte";
  import { venusData } from '$lib/data/flight/constants';
  
  
  // Access rapier world
  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Update world gravity from venusData
      world.gravity = { x: 0, y: venusData.physics.GRAVITY, z: 0 };
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
<!-- <Player 
  startPosition={[0, venusData.altitude.CLOUD_LAYER, 0]}
  color={venusData.visual.PLAYER_COLOR}
  mass={10}
/> -->

<!-- Venus atmosphere visual effects -->
<Atmosphere />