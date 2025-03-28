<!-- src/lib/sims/venus/world/space/Sun.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props using runes
  let { 
    radius = 10, // Scaled radius for visualization
    intensity = 1.5
  } = $props<{
    radius?: number;
    intensity?: number;
  }>();
</script>

<!-- Sun mesh with basic material (no emissive property) -->
<T.Mesh>
  <T.SphereGeometry args={[radius, 32, 32]} />
  <T.MeshBasicMaterial 
    color="#FDB813"
  />
</T.Mesh>

<!-- Sun light source -->
<T.PointLight 
  position={[0, 0, 0]} 
  intensity={intensity} 
  distance={0} 
  decay={2}
/>

<!-- Sun glow effect -->
<T.Sprite scale={[radius * 1.2, radius * 1.2, 1]}>
  <T.SpriteMaterial 
    color="#FFF4D6" 
    transparent={true}
    opacity={0.7}
  />
</T.Sprite>