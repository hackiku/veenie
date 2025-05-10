<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { RigidBody, usePhysicsTask } from "@threlte/rapier";
  import { getSimulationContext } from "../contexts/simulationContext.svelte";

  // Get the simulation context
  const sim = getSimulationContext();
  
  // Local reference to the rigid body
  let rigidBody = $state(null);
  
  // Set rigid body reference in rapier context when available
  $effect(() => {
    if (rigidBody && sim?.rapier) {
      sim.rapier.setRigidBody(rigidBody);
    }
  });

  // Physics update task
  const physicsTask = usePhysicsTask(() => {
    if (sim?.update) {
      sim.update(1/60);
    }
  });
  
  // Safely get position and velocity with fallbacks
  const position = $derived(() => {
    try {
      return sim?.getPosition() || [0, 51000, 0];
    } catch (e) {
      return [0, 51000, 0];
    }
  });
  
  const velocity = $derived(() => {
    try {
      return sim?.getVelocity() || [0, 0, 0];
    } catch (e) {
      return [0, 0, 0];
    }
  });
</script>

<!-- Use a single mesh for the balloon to avoid geometry issues -->
<T.Group position={position}>
  <RigidBody bind:rigidBody linearVelocity={velocity} type="dynamic">
    <!-- Just a simple sphere for the balloon -->
    <T.Mesh>
      <T.SphereGeometry args={[2, 16, 16]} />
      <T.MeshStandardMaterial color="#ffcc00" />
    </T.Mesh>
    
    <!-- Simple gondola box - separated to avoid NaN issues -->
    <T.Mesh position={[0, -3, 0]}>
      <T.BoxGeometry args={[1, 0.8, 1]} />
      <T.MeshStandardMaterial color="#663300" />
    </T.Mesh>
  </RigidBody>
</T.Group>