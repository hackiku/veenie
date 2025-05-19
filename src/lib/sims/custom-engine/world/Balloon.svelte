<!-- src/lib/sims/custom-engine/world/Balloon.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { SIMULATION_CONSTANTS } from '../constants';
  import { getPhysicsEngine } from '../physics/engine';
  import { onMount, onDestroy } from 'svelte';
  
  // Props
  let { resetSignal = 0 } = $props();
  
  // Get the engine
  const engine = getPhysicsEngine();
  
  // Local state
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  let position = $state({
    x: 0,
    y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    z: 0
  });
  let rotation = $state({ x: 0, y: 0, z: 0 });
  
  // Animation frame handling
  let frameId = null;
  
  // Update position/rotation from physics engine
  function updateFromEngine() {
    balloonSize = engine.getBalloonSize();
    position = engine.getBalloonPosition();
    rotation = engine.getBalloonRotation();
    
    frameId = requestAnimationFrame(updateFromEngine);
  }
  
  // Setup and cleanup
  onMount(() => {
    updateFromEngine();
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  });
  
  // Reset when needed
  $effect(() => {
    if (resetSignal) {
      engine.reset();
    }
  });
</script>

<!-- Simple balloon sphere with basket -->
<T.Group position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
  <T.Mesh castShadow>
    <T.SphereGeometry args={[balloonSize, 32, 16]} />
    <T.MeshStandardMaterial color="#FF9D00" />
  </T.Mesh>
  
  <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
    <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
</T.Group>