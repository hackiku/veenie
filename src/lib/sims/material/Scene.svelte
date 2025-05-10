<!-- src/lib/sims/material/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'

  import Terrain from './world/Terrain.svelte'
  import Balloon from './world/Balloon.svelte'
  
  // Set initial camera position to be near the 51000m altitude
  // where the balloon starts
  const cameraPosition = [20, 51060, 160];
</script>

<T.PerspectiveCamera
  makeDefault
  position={cameraPosition}
  oncreate={(ref) => ref.lookAt(0, 51000, 0)}
>
  {#snippet children({ ref })}
    <OrbitControls enableZoom={true}>
      <Gizmo />
    </OrbitControls>
  {/snippet}
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 51020, -3]}
/>

<T.AmbientLight intensity={0.9} />

<!-- GridHelper moved to 51000m altitude -->
<T.GridHelper args={[5]} position={[0, 50500, 0]} />

<Balloon />

<Terrain />