<!-- src/lib/sims/flight/scene/Camera.svelte -->
<script>
  import { OrbitControls } from "@threlte/extras";
  import { T, useTask } from "@threlte/core";
  import { getContext } from "svelte";
  
  // Get the flight context
  const flightContext = getContext('flightContext');
  
  // Access game state through the context
  const gameState = $derived(flightContext.getGameState());
  
  // Camera properties - set initial angle to be more orthogonal
  let cameraPosition = $state([30, 70, 30]); // Angled view looking down toward cloud layer
  let lookAtPosition = $state([0, 50, 0]); // Looking at cloud layer
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
      
      // Position camera relative to player at an angle
      cameraPosition = [
        gameState.position.x + 20, 
        gameState.position.y + 15, 
        gameState.position.z + 20  
      ];
    }
  });
  
  // Update camera when lookAt changes
  $effect(() => {
    if (cameraRef && lookAtPosition) {
      cameraRef.lookAt(lookAtPosition[0], lookAtPosition[1], lookAtPosition[2]);
    }
  });
  
  // Toggle follow mode
  function toggleFollowMode() {
    followPlayer = !followPlayer;
  }
  
  // Export camera position data for external access
  function getCameraData() {
    return {
      position: cameraPosition,
      lookAt: lookAtPosition,
      altitude: cameraPosition[1]
    };
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
  {#snippet children({ ref })}
    <!-- Use the children snippet with OrbitControls -->
    <OrbitControls 
      args={[ref]}
      enableDamping={true}
      dampingFactor={0.05}
      enableZoom={true}
      enablePan={true}
      minDistance={5}  
      maxDistance={1000} 
      target={lookAtPosition}
      autoRotate={false}
    />
  {/snippet}
</T.PerspectiveCamera>