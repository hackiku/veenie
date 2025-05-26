<!-- src/lib/sims/venus/world/space/Sun.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getSunPosition } from '../../physics/orbital';
  
  // Props
  let {
    timeState,
    visible = true
  } = $props();
  
  // Calculate sun position
  const sunPosition = $derived(() => {
    const simulationTime = timeState.simulationTime || 0;
    return getSunPosition(simulationTime);
  });
  
  const sunRadius = 800;
</script>

{#if visible}
  <!-- Sun group -->
  <T.Group position={sunPosition}>
    <!-- Main sun sphere -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius, 16, 12]} />
      <T.MeshBasicMaterial color="#FFEB3B" />
    </T.Mesh>
  </T.Group>
  
  <!-- Sun lighting -->
  <T.DirectionalLight 
    position={sunPosition}
    intensity={0.8}
    color="#FFEB3B"
  />
{/if}