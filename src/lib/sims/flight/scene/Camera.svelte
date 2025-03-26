<!-- src/lib/sims/flight/scene/Camera.svelte -->
<script>
  import { OrbitControls } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { getContext } from "svelte";
  
  // Get the flight context
  const flightContext = getContext('flightContext');
  
  // Access game state through the context
  const gameState = $derived(flightContext.getGameState());
  
  // Camera properties
  let cameraPosition = $state([0, 60, 0]); // Default position above cloud layer
  let lookAtPosition = $state([0, 40, 0]); // Default look at cloud layer
  let cameraRef = $state(null);
  
  // Follow player flag
  let followPlayer = $state(false);
  
  // Update camera based on player position
  $effect(() => {
    // Only update if we're following the player
    if (followPlayer && gameState.position) {
      // Set look-at position to player position
      lookAtPosition = [
        gameState.position.x, 
        gameState.position.y, 
        gameState.position.z
      ];
      
      // Position camera relative to player
      cameraPosition = [
        gameState.position.x, 
        gameState.position.y + 10, // Slightly above player
        gameState.position.z + 30  // Behind player
      ];
    }
  });
  
  // Update camera when lookAt changes
  $effect(() => {
    if (cameraRef && lookAtPosition) {
      cameraRef.lookAt(...lookAtPosition);
    }
  });
  
  // Toggle follow mode
  function toggleFollowMode() {
    followPlayer = !followPlayer;
  }
</script>

<!-- Main camera -->
<T.PerspectiveCamera
  position={cameraPosition}
  fov={75}
  near={0.1}
  far={2000}
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
    target={lookAtPosition}
    autoRotate={false}
  />
</T.PerspectiveCamera>