<!-- src/lib/sims/material/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'

  import Terrain from './world/Terrain.svelte'
  import Balloon from './world/Balloon.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 60, 160]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  {#snippet children({ ref })}
		<OrbitControls enableZoom={true}>
			<Gizmo />
		</OrbitControls>
	{/snippet}
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[50]} />

<Balloon />

<Terrain />