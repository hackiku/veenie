<!-- src/lib/sims/flight/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { useRapier } from "@threlte/rapier";
  import { Grid } from "@threlte/extras";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  
  // Venus gravity (at ~50km altitude)
  const venusGravity = -8.87; // m/s²
  
  // Access world through rapier event
  function onWorldInit({ world }) {
    if (world) {
      // Set gravity when world is initialized
      world.gravity.y = venusGravity;
    }
  }
</script>

<!-- Use the on:created event from Rapier to set gravity -->
<svelte:window on:useRapier:worldcreated={onWorldInit} />

<!-- Lighting -->
<T.DirectionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
<T.AmbientLight intensity={0.5} />

<!-- Grid helper (XZ plane) -->
<Grid 
  position={[0, -10, 0]} 
  cellColor="#6f6f6f"
  sectionColor="#9d4b4b"
  sectionThickness={1}
  cellSize={10}
  sectionSize={100}
  fadeDistance={1000}
/>

<!-- Coordinate axes helper -->
<T.Group position={[0, 0, 0]}>
  <T.AxesHelper args={[5]} />
</T.Group>

<!-- Player (physics-enabled ball) -->
<Player />

<!-- Venus atmosphere visual effects -->
<Atmosphere />