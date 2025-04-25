<!-- src/lib/sims/material/world/Balloon.svelte -->
<script>
  import { T } from "@threlte/core";
  import {
    RigidBody,
    AutoColliders,
    usePhysicsTask,
  } from "@threlte/rapier";
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  
  // Get only the simulation context
  const sim = getSimulationContext();
  
  // Local reference to the rigid body
  let rigidBody = null;
  
  // Apply updates on each physics frame
  const physicsTask = usePhysicsTask(() => {
    // Update simulation with fixed timestep
    sim.update(1/60);
  });
  
  // Setup keyboard controls
  const keyState = { w: false, a: false, s: false, d: false, " ": false, "Shift": false };
  
  function handleKeyDown(e) {
    if (e.key in keyState) {
      keyState[e.key] = true;
      e.preventDefault();
      
      // Update simulation controller state
      const controlState = {
        forward: e.key === 'w' ? true : undefined,
        backward: e.key === 's' ? true : undefined,
        left: e.key === 'a' ? true : undefined,
        right: e.key === 'd' ? true : undefined,
        up: e.key === ' ' ? true : undefined,
        down: e.key === 'Shift' ? true : undefined
      };
      sim.setControlState(controlState);
    }
  }
  
  function handleKeyUp(e) {
    if (e.key in keyState) {
      keyState[e.key] = false;
      
      // Update simulation controller state
      const controlState = {
        forward: e.key === 'w' ? false : undefined,
        backward: e.key === 's' ? false : undefined,
        left: e.key === 'a' ? false : undefined,
        right: e.key === 'd' ? false : undefined,
        up: e.key === ' ' ? false : undefined,
        down: e.key === 'Shift' ? false : undefined
      };
      sim.setControlState(controlState);
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
</script>

<T.Group position={sim.position}>
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