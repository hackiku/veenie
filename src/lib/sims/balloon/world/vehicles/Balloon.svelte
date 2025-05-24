<!-- src/lib/sims/balloon/world/vehicles/Balloon.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { SIMULATION_CONSTANTS } from '../../constants';
  import { getPhysicsEngine } from '../../physics/engine';
  
  // Props
  let { resetSignal = 0 } = $props();
  
  // Get the engine
  const engine = getPhysicsEngine();
  
  // Track balloon state
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  let position = $state({
    x: 0,
    y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    z: 0
  });
  let rotation = $state({ x: 0, y: 0, z: 0 });
  
  // Animation frame reference for cleanup
  let animationFrameId = null;
  
  // Update from physics engine
  function updateBalloon() {
    try {
      balloonSize = engine.getBalloonSize();
      position = engine.getBalloonPosition();
      rotation = engine.getBalloonRotation();
      
      // Request next frame
      animationFrameId = requestAnimationFrame(updateBalloon);
    } catch (error) {
      console.error('Balloon update error:', error);
      // Continue animation even if there's an error
      animationFrameId = requestAnimationFrame(updateBalloon);
    }
  }
  
  // Start animation loop
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Start animation
    updateBalloon();
    
    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
  
  // Reset when needed
  $effect(() => {
    if (resetSignal) {
      try {
        engine.reset();
      } catch (error) {
        console.error('Balloon reset error:', error);
      }
    }
  });
  
  // Visual debugging - log rotation changes
  $effect(() => {
    if (import.meta.env.DEV && Math.abs(rotation.y) > 0.1) {
      console.log(`Balloon visual rotation: ${(rotation.y * 180 / Math.PI).toFixed(1)}° yaw`);
    }
  });
</script>

<!-- Enhanced balloon with visual yaw indicators -->
<T.Group position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
  <!-- Main balloon sphere -->
  <T.Mesh castShadow>
    <T.SphereGeometry args={[balloonSize, 32, 16]} />
    <T.MeshStandardMaterial color="#FF9D00" />
  </T.Mesh>
  
  <!-- Basket below balloon -->
  <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
    <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
  
  <!-- Visual yaw indicator - forward direction marker -->
  <T.Mesh position={[0, 0, balloonSize + 0.5]} castShadow>
    <T.ConeGeometry args={[0.3, 1.0, 8]} />
    <T.MeshStandardMaterial color="#FF4444" />
  </T.Mesh>
  
  <!-- Visual yaw indicator - side stripes for rotation feedback -->
  <T.Mesh position={[balloonSize * 0.7, 0, 0]}>
    <T.CylinderGeometry args={[0.1, 0.1, balloonSize * 0.8, 8]} />
    <T.MeshStandardMaterial color="#FF6644" />
  </T.Mesh>
  
  <T.Mesh position={[-balloonSize * 0.7, 0, 0]}>
    <T.CylinderGeometry args={[0.1, 0.1, balloonSize * 0.8, 8]} />
    <T.MeshStandardMaterial color="#FF6644" />
  </T.Mesh>
  
  <!-- Rope connections from balloon to basket (visual only) -->
  <T.Mesh position={[0.3, -balloonSize * 0.5, 0.3]}>
    <T.CylinderGeometry args={[0.02, 0.02, balloonSize + 1, 4]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
  
  <T.Mesh position={[-0.3, -balloonSize * 0.5, 0.3]}>
    <T.CylinderGeometry args={[0.02, 0.02, balloonSize + 1, 4]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
  
  <T.Mesh position={[0.3, -balloonSize * 0.5, -0.3]}>
    <T.CylinderGeometry args={[0.02, 0.02, balloonSize + 1, 4]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
  
  <T.Mesh position={[-0.3, -balloonSize * 0.5, -0.3]}>
    <T.CylinderGeometry args={[0.02, 0.02, balloonSize + 1, 4]} />
    <T.MeshStandardMaterial color="#8B4513" />
  </T.Mesh>
</T.Group>

<!-- Debug info for development -->
{#if import.meta.env.DEV}
  <div class="fixed bottom-20 left-4 bg-black/70 text-white p-2 rounded text-xs font-mono z-40">
    <div class="text-yellow-300 font-bold mb-1">🎈 Balloon Debug</div>
    <div>Pos: ({position.x.toFixed(1)}, {position.y.toFixed(1)}, {position.z.toFixed(1)})</div>
    <div>Yaw: {(rotation.y * 180 / Math.PI).toFixed(1)}°</div>
    <div>Size: {balloonSize.toFixed(2)}m</div>
  </div>
{/if}