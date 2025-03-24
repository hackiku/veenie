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
 
	// indicators
  import LayerRuler from "./indicators/LayerRuler.svelte";
  import TextLabel from "./indicators/TextLabel.svelte";

  const { world } = useRapier();
  
  // Set gravity when world is available
  $effect(() => {
    if (world) {
      // Update world gravity from venusData
      world.gravity = { x: 0, y: venusData.physics.GRAVITY, z: 0 };
    }
  });

	let showRuler=$state(true);
</script>

<!-- Main camera with orbit controls -->
<Camera />

<!-- Venus lighting -->
<SunLight />

<Grid />

<!-- {#if showRuler}
  <LayerRuler position={[80, 0, 0]}>
    <TextLabel slot="text-label" let:layer let:position active={true} fontSize={0.8} />
  </LayerRuler>
{/if} -->
{#if showRuler}
  <LayerRuler position={[80, 0, 0]} />
{/if}


<!-- Player (physics-enabled ball) -->
<Player />
<!-- <Player 
  startPosition={[0, venusData.altitude.CLOUD_LAYER, 0]}
  color={venusData.visual.PLAYER_COLOR}
  mass={10}
/> -->

<!-- Venus atmosphere visual effects -->
<Atmosphere />