<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  
  // Venus atmosphere properties - simplified
  const atmosphereColor = "#ffebaa"; // Yellowish atmosphere
</script>

<!-- Atmospheric fog -->
<T.Fog color={atmosphereColor} near={50} far={1000} />

<!-- Distant haze layer (creates yellowish atmosphere effect) -->
<T.Mesh position={[0, 0, 0]}>
  <T.SphereGeometry args={[800, 16, 16]} />
  <T.MeshBasicMaterial 
    color={atmosphereColor} 
    transparent={true} 
    opacity={0.3}
    side={2} 
  />
</T.Mesh>