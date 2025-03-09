<!-- src/lib/sims/flight/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { useRapier } from "@threlte/rapier";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  import Grid from "./Grid.svelte";
  import Camera from "./Camera.svelte";
  import SunLight from "./SunLight.svelte";
  import { venusData } from '../physics/data';
  
  // Scene settings
  let debug = $state(false);
  
  // Access rapier world
  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Update world gravity from venusData
      world.gravity = { x: 0, y: venusData.physics.gravity, z: 0 };
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
  startPosition={[0, venusData.altitude.cloudLayer, 0]}
  color={venusData.visual.playerColor}
  mass={venusData.physics.mass}
  debug={debug}
/>

<!-- Venus atmosphere visual effects -->
<Atmosphere />