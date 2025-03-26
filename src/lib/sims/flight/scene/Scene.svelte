<!-- src/lib/sims/flight/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { getContext } from "svelte";
  import { useRapier } from "@threlte/rapier";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  import Camera from "./Camera.svelte";
  import SunLight from "./SunLight.svelte";
  
  // Import references (moved from direct scene components)
  import Grid from "./references/Grid.svelte";
  import LayerRuler from "./references/LayerRuler.svelte";
  
  // Import terrain components
  import Terrain from "./terrain/Terrain.svelte";
  import ProceduralTerrain from "./terrain/ProceduralTerrain.svelte";
  
  // Access flight context
  const flightContext = getContext('flightContext');
  const constants = flightContext.constants;
  
  // Access rapier world
  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Update world gravity from constants
      world.gravity = { x: 0, y: constants.physics.GRAVITY, z: 0 };
    }
  });
  
  // Toggle flags for different components
  let showRuler = $state(true);
  let showGrid = $state(true);
  let showProcedural = $state(false); // Set to true to use procedural terrain
</script>

<!-- Main camera with orbit controls -->
<Camera />

<!-- Venus lighting -->
<SunLight />

<!-- Terrain - the ground at altitude 0 -->
<!-- {#if showProcedural}
  <ProceduralTerrain 
    size={2000}
    altitude={0}
    color="#FF8C00"
    opacity={0.8}
    segments={128}
    heightScale={4}
    seed={12345}
  />
{:else}
  <Terrain 
    size={2000}
    altitude={0}
    color="#FF8C00"
    opacity={0.8}
  />
{/if} -->

<!-- Grid for orientation (now a reference) -->
{#if showGrid}
  <Grid />
{/if}

<!-- Player (physics-enabled ball) -->
<Player />

<!-- Venus atmosphere visual effects -->
<Atmosphere />

<!-- Atmospheric layer ruler (rendered last) -->
{#if showRuler}
  <LayerRuler position={[80, 0, 0]} />
{/if}