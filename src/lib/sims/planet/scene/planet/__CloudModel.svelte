<!-- src/lib/sims/planet/scene/planet/CloudModel.svelte -->
<script>
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  
  // Props
  let { 
    scale = 0.001,
    rotation = 0
  } = $props();
  
  // Load Venus GLTF cloud model - updated path to use cloud_1 instead of atmosphere_1
  const venus = useGltf('/models/planets/venus/cloud_1_12103.glb');
</script>

{#if $venus}
  <!-- Cloud model loading approach -->
  <T.Group rotation.y={rotation} scale={scale}>
    <T is={$venus.scene} castShadow receiveShadow />
  </T.Group>
{:else}
  <!-- Fallback sphere with cloud layers while loading -->
  <T.Group rotation.y={rotation} scale={scale}>
    <!-- Base planet -->
    <T.Mesh>
      <T.SphereGeometry args={[6051.8, 32, 32]} />
      <T.MeshStandardMaterial color="#E6C98C" />
    </T.Mesh>
    
    <!-- Cloud layer -->
    <T.Mesh>
      <T.SphereGeometry args={[6051.8 + 50, 32, 32]} />
      <T.MeshStandardMaterial 
        color="#D9D9D9"
        transparent={true}
        opacity={0.7}
      />
    </T.Mesh>
    
    <!-- Upper haze layer -->
    <T.Mesh>
      <T.SphereGeometry args={[6051.8 + 90, 32, 32]} />
      <T.MeshStandardMaterial 
        color="#9FAFCF"
        transparent={true}
        opacity={0.3}
      />
    </T.Mesh>
  </T.Group>
{/if}