<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import {
    RigidBody,
    AutoColliders,
    usePhysicsTask,
  } from "@threlte/rapier";
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Local reference to the rigid body - make it reactive with $state
  let rigidBody = $state(null);
  
  // Apply updates on each physics frame
  const physicsTask = usePhysicsTask(() => {
    // Update simulation with fixed timestep
    if (sim && !sim.isPaused()) {
      sim.update(1/60);
    }
  });
  
  // Set rigidBody reference in the simulation context when available
  $effect(() => {
    if (sim && rigidBody) {
      // You might want to add a method to set the rigid body in your simulation context
      console.log("RigidBody reference ready");
    }
  });
</script>

<T.Group position={sim.getPosition()}>
  <RigidBody 
    bind:rigidBody 
    linearVelocity={sim.getVelocity()} 
  >
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