<!-- src/lib/sims/material/scene/Player.svelte -->

<script>
	import { T } from "@threlte/core";
	import {
		RigidBody,
		AutoColliders,
		Collider,
		usePhysicsTask,
	} from "@threlte/rapier";

	let bodyPosition = $state([0, 10, 0]);
</script>

<T.Group
	position={bodyPosition}
>
	<RigidBody>
		<AutoColliders>
			<T.Mesh>
				<T.SphereGeometry args={[1, 32, 32]} />
				<T.MeshStandardMaterial color="blue" />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>
</T.Group>