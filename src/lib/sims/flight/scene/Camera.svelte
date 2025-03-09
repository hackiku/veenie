<!-- src/lib/sims/flight/scene/Camera.svelte -->

<script>
  import { OrbitControls } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Subscribe to the flight store to get current altitude
  let flightState = $state(null);
  let playerPosition = $state({ x: 0, y: 50, z: 0 }); // Default to cloud layer

  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
      if (state && state.position) {
        playerPosition = state.position;
      }
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Camera properties using runes
  let cameraPosition = $state([0, 50, 100]); // Default position at cloud layer
  let lookAtPosition = $state([0, 50, 0]);   // Default look at cloud layer
  
  // Update camera position based on player position (optional - enable for follow camera)
  const followPlayer = $state(false);
  
  $effect(() => {
    if (followPlayer && playerPosition) {
      // Calculate camera position relative to player
      lookAtPosition = [playerPosition.x, playerPosition.y, playerPosition.z];
      
      // Position camera behind player (example - can be adjusted)
      cameraPosition = [
        playerPosition.x, 
        playerPosition.y + 10, // Slightly above player
        playerPosition.z + 30  // Behind player
      ];
    }
  });
  
  const props = $state({
    position: cameraPosition,
    fov: 75,
    near: 0.1,
    far: 2000,      // Increased for Venus atmosphere scale
    lookAt: lookAtPosition
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