<!-- src/lib/sims/material/scene/Balloon.svelte -->

<script>
  import { T } from "@threlte/core";
  import {
    RigidBody,
    AutoColliders,
    usePhysicsTask,
  } from "@threlte/rapier";
  import { getPhysicsContext } from "../physics/context.svelte";
  
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
    physics.applyBuoyancyForce();
  });
</script>

<T.Group position={physics.bodyPosition}>
  <RigidBody bind:rigidBody>
    <AutoColliders>
      <T.Mesh>
        <T.SphereGeometry args={[1, 32, 32]} />
        <T.MeshStandardMaterial color="white" wireframe />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>