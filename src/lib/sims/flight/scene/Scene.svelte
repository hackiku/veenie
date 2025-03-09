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
  
  // Venus gravity (at ~50km altitude)
  const venusGravity = -8.87; // m/s²
  
  // UI state
  let showGrid = $state(true);
  
  // Access rapier world
  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Access gravity directly as a property
      world.gravity.y = venusGravity;
    }
  });
  
  // Toggle grid visibility
  function toggleGrid() {
    showGrid = !showGrid;
  }
</script>

<!-- Main camera with orbit controls as its child - positioned below cloud layer -->
<Camera position={[100, 90, 0]} lookAt={[0, 0, 0]} />

<!-- Venus lighting -->
<SunLight />

<!-- Using our Grid component -->
<Grid visible={showGrid} />

<!-- Player (physics-enabled ball) -->
<Player />

<!-- Venus atmosphere visual effects -->
<Atmosphere />

<!-- Toggle grid button (positioned absolutely in 3D space for debug) -->
<T.Group position={[-10, 20, 0]}>
  <T.Mesh 
    onclick={toggleGrid}
    receiveShadow
  >
    <T.BoxGeometry args={[2, 1, 1]} />
    <T.MeshStandardMaterial color={showGrid ? "#50a0ff" : "#a0a0a0"} />
  </T.Mesh>
</T.Group>