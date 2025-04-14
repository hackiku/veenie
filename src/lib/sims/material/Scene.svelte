<!-- src/lib/sims/material/scene/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core'
  import RAPIER from '@dimforge/rapier3d-compat'
  import { Gizmo, type GizmoOptions, OrbitControls } from '@threlte/extras'

  import Terrain from './world/Terrain.svelte'
  import Balloon from './world/Balloon.svelte'
	
	// let { 
	//   buoyancy = 0.1,
	//   bodyPosition = $bindable<[number, number, number]>([0, 7, 0])
	// } = $props();
  let { 
    buoyancy = 0.1,
    bodyPosition=[0, 7, 0]
  } = $props();


</script>

<T.PerspectiveCamera
  makeDefault
  position={[20, 20, 20]}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls enableZoom={true}>
    <Gizmo />
  </OrbitControls>
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper args={[50]} />

<Balloon 
  {buoyancy} 
  {bodyPosition}
	/>
  <!-- bind:bodyPosition={bodyPosition} -->

<Terrain />