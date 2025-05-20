<!-- src/lib/sims/balloon/world/Submarine.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Props
  let { resetSignal = 0 } = $props();
  
  // Submarine state
  let position = $state({
    x: 0,
    y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    z: 0
  });
  
  let velocity = $state({
    x: 0,
    y: 0,
    z: 0
  });
  
  let rigidBody = $state(null);
  
  // Handle keyboard input directly
  const MOVE_SPEED = 0.2;
  const FLOAT_SPEED = 0.15;
  let keys = $state({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    shift: false
  });
  
  // Handle key events
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      if (key in keys) {
        keys[key] = true;
      } else if (key === ' ') {
        keys.space = true;
      }
    }
    
    function handleKeyUp(e) {
      const key = e.key.toLowerCase();
      if (key in keys) {
        keys[key] = false;
      } else if (key === ' ') {
        keys.space = false;
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Update position based on keyboard input - no physics!
  function updatePosition() {
    // Handle forward/backward (Z axis)
    if (keys.w) position.z -= MOVE_SPEED;
    if (keys.s) position.z += MOVE_SPEED;
    
    // Handle left/right (X axis)
    if (keys.a) position.x -= MOVE_SPEED;
    if (keys.d) position.x += MOVE_SPEED;
    
    // Handle up/down (Y axis)
    if (keys.space) position.y += FLOAT_SPEED;
    if (keys.shift) position.y -= FLOAT_SPEED;
    
    // Update the rigid body position if available
    if (rigidBody) {
      rigidBody.setNextKinematicTranslation(position);
    }
  }
  
  // Update position on each frame
  import { useTask } from '@threlte/core';
  useTask(() => {
    updatePosition();
  });
  
  // Handle body creation
  function handleBodyCreated(body) {
    console.log("Submarine rigid body created");
    rigidBody = body;
  }
  
  // Reset position
  $effect(() => {
    if (resetSignal) {
      position = {
        x: 0,
        y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
        z: 0
      };
      
      velocity = {
        x: 0,
        y: 0,
        z: 0
      };
    }
  });
</script>

<!-- Simple submarine shape with kinematic positioning -->
<RigidBody 
  type="kinematicPosition"
  position={[position.x, position.y, position.z]}
  autoAdjustColliders={true}
  oncreate={handleBodyCreated}
>
  <!-- Main body -->
  <T.Group>
    <!-- Hull -->
    <T.Mesh castShadow>
      <T.CylinderGeometry args={[1, 1, 4, 16]} />
      <T.MeshStandardMaterial color="#3366CC" />
    </T.Mesh>
    
    <!-- Conning tower -->
    <T.Mesh castShadow position={[0, 1.5, 0]}>
      <T.CylinderGeometry args={[0.5, 0.7, 1, 16]} />
      <T.MeshStandardMaterial color="#2255AA" />
    </T.Mesh>
    
    <!-- Propeller -->
    <T.Mesh castShadow position={[0, 0, 2.5]}>
      <T.CylinderGeometry args={[0.8, 0.1, 1, 8]} rotation={[Math.PI/2, 0, 0]} />
      <T.MeshStandardMaterial color="#555555" />
    </T.Mesh>
  </T.Group>
</RigidBody>

<!-- Simple control instructions UI -->
<div class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white p-2 rounded text-sm">
  WASD: Move | Space: Rise | Shift: Descend
</div>