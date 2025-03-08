<!-- src/lib/sims/space/MinimalScene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { useFrame } from '@threlte/core';
  
  // Simple props with proper Svelte 5 syntax
  let { time = new Date(), timeScale = 1 } = $props();
  
  // Internal state
  let rotation = $state(0);
  
  // Use Threlte's useFrame for animation
  useFrame((_, delta) => {
    // Simple rotation based on timeScale
    rotation += delta * timeScale * 0.2;
  });
</script>

<!-- Basic 3D scene -->
<T.PerspectiveCamera position={[0, 3, 8]} fov={60} makeDefault>
  <OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 5, 3]} intensity={1.5} />
<T.AmbientLight intensity={0.2} />

<!-- Simple planet -->
<T.Group rotation.y={rotation}>
  <T.Mesh>
    <T.SphereGeometry args={[1, 32, 32]} />
    <T.MeshStandardMaterial color="#C9977A" />
  </T.Mesh>
</T.Group>

<!-- Grid helper for reference -->
<T.GridHelper args={[10, 10, '#666666', '#444444']} />