<!-- src/lib/sims/planet/scene/planet/AtmosphereModel.svelte -->
<script>
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  
  // Props
  let { 
    scale = 0.001,
    rotation = 0
  } = $props();
  
  // Load Venus GLTF model with a simple approach
  const venus = useGltf('/models/planets/venus/atmosphere_1_12103.glb');
</script>

{#if $venus}
  <!-- Basic model loading approach -->
  <T.Group rotation.y={rotation} scale={scale}>
    <T is={$venus.scene} castShadow receiveShadow />
  </T.Group>
{:else}
  <!-- Fallback sphere while loading -->
  <T.Group rotation.y={rotation} scale={scale}>
    <T.Mesh>
      <T.SphereGeometry args={[6051.8, 32, 32]} />
      <T.MeshStandardMaterial color="#E6C98C" />
    </T.Mesh>
  </T.Group>
{/if}