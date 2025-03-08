<!-- src/lib/sims/venus/model/planet/Planet.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props using runes
  let { 
    radius = 6051.8, // km
    scale = 0.001
  } = $props<{
    radius?: number;
    scale?: number;
  }>();
</script>

<T.Mesh receiveShadow>
  <T.SphereGeometry args={[radius * scale, 64, 64]} />
  <T.MeshStandardMaterial 
    color="#E6C98C" 
    roughness={0.8}
    metalness={0.1}
    emissive="#441500"
    emissiveIntensity={0.05}
  />
</T.Mesh>