<!-- src/lib/sims/material/world/Balloon.svelte -->
<script>
  import { T } from "@threlte/core";
  import {
    RigidBody,
    AutoColliders,
    usePhysicsTask,
  } from "@threlte/rapier";
  import { onDestroy } from "svelte";
  import { getPhysicsContext } from "../contexts/physicsContext.svelte";
  
  // Get the physics context
  const physics = getPhysicsContext();
  
  // Local reference to the rigid body
  let rigidBody = null;
  
  // Watch for changes to rigidBody and update context
  $effect(() => {
    if (rigidBody) {
      physics.setRigidBody(rigidBody);
    }
  });
  
  // Apply physics on each frame
  const physicsTask = usePhysicsTask(() => {
    physics.update(1/60); // Pass fixed timestep for consistency
  });
  
  // Setup keyboard controls
  const keyState = { w: false, a: false, s: false, d: false, " ": false, "Shift": false };
  
  function handleKeyDown(e) {
    if (e.key in keyState) {
      keyState[e.key] = true;
      e.preventDefault();
    }
  }
  
  function handleKeyUp(e) {
    if (e.key in keyState) {
      keyState[e.key] = false;
    }
  }
  
  // Set up event listeners when the component mounts
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    
    // Clean up when component is destroyed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Apply control forces based on key state
  $effect(() => {
    if (!physics.rigidBody || physics.paused) return;
    
    const thrustStrength = 0.05;
    const verticalThrustStrength = 0.1;
    
    // Calculate direction from key state
    const moveX = (keyState.d ? 1 : 0) - (keyState.a ? 1 : 0);
    const moveZ = (keyState.s ? 1 : 0) - (keyState.w ? 1 : 0);
    const moveY = (keyState[" "] ? 1 : 0) - (keyState.Shift ? 1 : 0);
    
    // Apply force if any direction key is pressed
    if (moveX !== 0 || moveZ !== 0 || moveY !== 0) {
      physics.applyForce({
        x: moveX * thrustStrength,
        y: moveY * verticalThrustStrength,
        z: moveZ * thrustStrength
      });
    }
  });
</script>

<T.Group position={physics.bodyPosition}>
  <RigidBody bind:rigidBody>
    <AutoColliders>
      <!-- Main balloon body -->
      <T.Group>
        <T.Mesh>
          <T.SphereGeometry args={[1, 32, 32]} />
          <T.MeshStandardMaterial color="#ffcc00" />
        </T.Mesh>
        
        <!-- Gondola beneath -->
        <T.Mesh position.y={-1.5}>
          <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
          <T.MeshStandardMaterial color="#663300" />
        </T.Mesh>
        
        <!-- Connect with lines -->
        <T.LineSegments>
          <T.BufferGeometry>
            <T.Float32BufferAttribute 
              attach="attributes-position" 
              args={[new Float32Array([
                -0.5, -0.8, -0.5, -0.3, -1.5, -0.3,
                0.5, -0.8, -0.5, 0.3, -1.5, -0.3,
                -0.5, -0.8, 0.5, -0.3, -1.5, 0.3,
                0.5, -0.8, 0.5, 0.3, -1.5, 0.3
              ]), 3]} 
            />
          </T.BufferGeometry>
          <T.LineBasicMaterial color="#333333" />
        </T.LineSegments>
      </T.Group>
    </AutoColliders>
  </RigidBody>
</T.Group>