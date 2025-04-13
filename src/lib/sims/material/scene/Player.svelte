<!-- src/lib/sims/material/scene/Player.svelte -->
<script>
	import { T } from "@threlte/core";
	import { TransformControls } from '@threlte/extras';
	import {
		RigidBody,
		AutoColliders,
		Collider,
		usePhysicsTask,
	} from "@threlte/rapier";

	// Accept buoyancy prop
	let { buoyancy } = $props();
	
	// Keep your existing state
	let bodyPosition = $state([0, 15, 0]);
	
	// Declare rigidBody as a reactive state variable
	let rigidBody = $state(null);
	
	// Apply upward force using physics task
	const physicsTask = usePhysicsTask(() => {
		if (rigidBody) {
			// Simple upward force (buoyancy)
			rigidBody.applyImpulse(
				{ x: 0, y: buoyancy, z: 0 },
				true
			);
			
			// Update position state from physics engine
			const position = rigidBody.translation();
			bodyPosition = [position.x, position.y, position.z];
		}
	});
</script>

<T.Group
	position={bodyPosition}
>
	<RigidBody bind:rigidBody>
		<AutoColliders>
			<TransformControls>
				<T.Mesh>
					<T.SphereGeometry args={[1, 32, 32]} />
					<T.MeshStandardMaterial color="blue" />
				</T.Mesh>
			</TransformControls>
		</AutoColliders>
	</RigidBody>
</T.Group>