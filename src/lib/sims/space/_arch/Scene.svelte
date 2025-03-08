<!-- src/lib/sims/space/Scene.svelte -->
<script>
  import { T, useFrame } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import SpaceSimulation from './components/SpaceSimulation.svelte';
  
  // Props using Svelte 5 runes
  const time = $props.time || new Date();
  const timeScale = $props.timeScale || 1;
  const scrollY = $props.scrollY || 0;
  const simpleMode = $props.simpleMode !== false; // Default to simple mode
  
  // Internal state
  const internalTime = $state(0);
  const rotation = $state(0);
  
  // Planet properties for simple mode
  const planetRadius = $state(1);
  const planetColor = $state('#C9977A'); // Venus-like color
  
  // Camera position
  const cameraPosition = $state({ x: 0, y: 3, z: 8 });
  
  // Animation loop
  useFrame((_, delta) => {
    internalTime += delta * timeScale;
    rotation = internalTime * 0.2; // Slow rotation
  });
</script>

{#if simpleMode}
  <!-- Simple planet scene for homepage -->
  <T.PerspectiveCamera
    position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
    fov={60}
    makeDefault
  >
    <OrbitControls enableZoom={true} />
  </T.PerspectiveCamera>
  
  <T.DirectionalLight position={[3, 5, 3]} intensity={1.5} />
  <T.AmbientLight intensity={0.2} />
  
  <!-- Simple planet -->
  <T.Group rotation.y={rotation}>
    <T.Mesh>
      <T.SphereGeometry args={[planetRadius, 32, 32]} />
      <T.MeshStandardMaterial color={planetColor} />
    </T.Mesh>
  </T.Group>
  
  <!-- Grid helper for reference -->
  <T.GridHelper args={[10, 10, '#666666', '#444444']} />
{:else}
  <!-- Advanced space simulation -->
  <SpaceSimulation time={time} timeScale={timeScale} />
{/if}