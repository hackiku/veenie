<!-- src/lib/sims/flight/scene/Grid.svelte -->

<script>
  import { T } from "@threlte/core";
  import { Grid as ThrelteGrid } from "@threlte/extras";
  
  // Grid properties using runes with $props()
  const props = $state({
    position: [0, -1, 0],
    cellColor: "#6f6f6f",
    sectionColor: "#9d4b4b",
    sectionThickness: 1,
    cellSize: 10,
    sectionSize: 100,
    fadeDistance: 1000,
    visible: true
  });
</script>

{#if props.visible}
  <!-- Main grid -->
  <ThrelteGrid 
    position={props.position} 
    cellColor={props.cellColor}
    sectionColor={props.sectionColor}
    sectionThickness={props.sectionThickness}
    cellSize={props.cellSize}
    sectionSize={props.sectionSize}
    fadeDistance={props.fadeDistance}
  />
  
  <!-- Coordinate axes helper -->
  <T.Group position={[0, 0, 0]}>
    <T.AxesHelper args={[5]} />
  </T.Group>
  
  <!-- Labels for axes -->
  <T.Group position={[5.5, 0, 0]}>
    <T.Mesh>
      <T.SphereGeometry args={[0.2, 8, 8]} />
      <T.MeshBasicMaterial color="red" />
    </T.Mesh>
  </T.Group>
  
  <T.Group position={[0, 5.5, 0]}>
    <T.Mesh>
      <T.SphereGeometry args={[0.2, 8, 8]} />
      <T.MeshBasicMaterial color="green" />
    </T.Mesh>
  </T.Group>
  
  <T.Group position={[0, 0, 5.5]}>
    <T.Mesh>
      <T.SphereGeometry args={[0.2, 8, 8]} />
      <T.MeshBasicMaterial color="blue" />
    </T.Mesh>
  </T.Group>
{/if}