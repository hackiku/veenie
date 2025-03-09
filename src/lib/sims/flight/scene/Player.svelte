<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
	import { T } from "@threlte/core";
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>


<T.Mesh>
	<T.BoxGeometry />
	<T.MeshBasicMaterial />
</T.Mesh>
