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
  // let rigidBody = null;
  let rigidBody = $props();
  
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
      
			<T.Group>
				<T.Mesh>
					<T.SphereGeometry args={[1, 32, 32]} />
					<T.MeshStandardMaterial color="white" />
				</T.Mesh>

				<!-- gondola -->
				<T.Mesh position.y={-1.5}>
					<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
					<T.MeshStandardMaterial color="#663300" />
				</T.Mesh>
			</T.Group>
    </AutoColliders>
  </RigidBody>
</T.Group>