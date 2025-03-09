<!-- src/lib/sims/flight/scene/Camera.svelte -->

<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  
  // Camera properties using runes
  const props = $state({
    position: [0, 30, 100], // Default position below cloud layer
    fov: 75,
    near: 0.1,
    far: 2000,      // Increased for Venus atmosphere scale
    lookAt: [0, 40, 0] // Default look at cloud layer
  });
  
  // Camera reference
  let cameraRef = $state(null);
  
  // Update camera target when lookAt changes
  $effect(() => {
    if (cameraRef && props.lookAt) {
      cameraRef.lookAt(...props.lookAt);
    }
  });
</script>

<!-- Main camera -->
<T.PerspectiveCamera
  position={props.position}
  fov={props.fov}
  near={props.near}
  far={props.far}
  makeDefault
  bind:ref={cameraRef}
>
  <!-- OrbitControls must be a child of the camera -->
  <OrbitControls 
    enableDamping={true}
    dampingFactor={0.05}
    enableZoom={true}
    enablePan={true}
    minDistance={5}  
    maxDistance={1000} 
    target={props.lookAt}
    autoRotate={false}
  />
</T.PerspectiveCamera>