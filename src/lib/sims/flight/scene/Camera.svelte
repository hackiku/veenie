<!-- src/lib/sims/flight/scene/Camera.svelte -->

<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  
  // Camera properties using runes with $props()
  const props = $state({
    position: [0, -5, 20], // Start position below cloud cover, looking at scene
    fov: 75,
    near: 0.1,
    far: 1000,
    lookAt: [0, 0, 0]
  });
  
  // Camera reference with runes
  let cameraRef = $state(null);
  
  // Handle camera creation
  function handleCameraCreated(ref) {
    cameraRef = ref;
    ref.lookAt(...props.lookAt);
  }
  
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
  oncreate={handleCameraCreated}
>
  <!-- OrbitControls must be a child of the camera -->
  <OrbitControls 
    enableDamping={true}
    dampingFactor={0.05}
    enableZoom={true}
    enablePan={true}
    minDistance={1}
    maxDistance={1000}
  />
</T.PerspectiveCamera>