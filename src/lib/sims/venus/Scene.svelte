<!-- src/lib/sims/venus/Scene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import VenusAtmosphere from './components/VenusAtmosphere.svelte';
  import CloudLayers from './components/CloudLayers.svelte';
</script>

<T.PerspectiveCamera position={[0, 0, 15]} fov={45}>
  <OrbitControls enableZoom={true} enablePan={true} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 5]} intensity={1.5} />
<T.AmbientLight intensity={0.2} />

<VenusAtmosphere />
<CloudLayers />