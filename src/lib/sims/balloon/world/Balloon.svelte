<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody, useRapier } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Props - simplified
  let { updateTelemetry = undefined, resetSignal = 0 } = $props();
  
  // Fixed state
  let balloonBody = $state(null);
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  
  // Store reference to balloonBody when created
  function handleRigidBodyCreate(body) {
    balloonBody = body;
    
    // Apply forces directly in the callback instead of in an effect or task
    if (balloonBody) {
      // Apply buoyancy as an impulse to start
      balloonBody.applyImpulse({ x: 0, y: 1, z: 0 }, true);
    }
  }
  
  // Handle keyboard input
  let keysPressed = $state({ w: false, a: false, s: false, d: false, space: false, shift: false });
  
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      if (event.key === 'w' || event.key === 'W') keysPressed.w = true;
      if (event.key === 'a' || event.key === 'A') keysPressed.a = true;
      if (event.key === 's' || event.key === 'S') keysPressed.s = true;
      if (event.key === 'd' || event.key === 'D') keysPressed.d = true;
      if (event.key === ' ') keysPressed.space = true;
      if (event.key === 'Shift') keysPressed.shift = true;
    };
    
    const handleKeyUp = (event) => {
      if (event.key === 'w' || event.key === 'W') keysPressed.w = false;
      if (event.key === 'a' || event.key === 'A') keysPressed.a = false;
      if (event.key === 's' || event.key === 'S') keysPressed.s = false;
      if (event.key === 'd' || event.key === 'D') keysPressed.d = false;
      if (event.key === ' ') keysPressed.space = false;
      if (event.key === 'Shift') keysPressed.shift = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Simple reset function
  $effect(() => {
    if (resetSignal && balloonBody) {
      balloonBody.setTranslation({ 
        x: 0, 
        y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 
        z: 0 
      }, true);
      
      balloonBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });
</script>

<!-- Balloon model - greatly simplified -->
<RigidBody 
  position={[0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
  linearDamping={1}
  angularDamping={0.9}
  oncreate={handleRigidBodyCreate}
>
  <T.Group>
    <!-- Main balloon sphere -->
    <T.Mesh>
      <T.SphereGeometry args={[balloonSize, 16, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <!-- Basket under balloon -->
    <T.Mesh position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
  </T.Group>
</RigidBody>