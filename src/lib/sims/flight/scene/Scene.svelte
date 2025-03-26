<!-- src/lib/sims/flight/scene/Scene.svelte -->
<script>
  import { T } from "@threlte/core";
  import { getContext } from "svelte";
  import Player from "./Player.svelte";
  import Atmosphere from "./Atmosphere.svelte";
  import Camera from "./Camera.svelte";
  import SunLight from "./SunLight.svelte";
  import Grid from "./references/Grid.svelte";
  import LayerRuler from "./references/LayerRuler.svelte";
  
  // Access flight context
  const flightContext = getContext('flightContext');
  
  // Toggle flags for different components
  let showRuler = $state(true);
  let showGrid = $state(true);
</script>

<!-- Main camera with orbit controls -->
<Camera />

<!-- Venus lighting -->
<SunLight />

<!-- Grid for orientation -->
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