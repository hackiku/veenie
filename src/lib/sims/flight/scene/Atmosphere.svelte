<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  
  // Venus atmosphere properties using runes
  const atmosphereColor = $state("#ffebaa"); // Yellowish atmosphere
  const cloudLayerAltitude = $state(50); // Cloud layer at 50 units height
  const atmosphereOpacity = $state(0.2); // Reduced opacity for easier testing
</script>

<!-- Atmospheric fog -->
<T.Fog color={atmosphereColor} near={100} far={1000} />

<!-- Distant haze layer (creates yellowish atmosphere effect) -->
<T.Mesh position={[0, cloudLayerAltitude, 0]}>
  <T.SphereGeometry args={[800, 16, 16]} />
  <T.MeshBasicMaterial 
    color={atmosphereColor} 
    transparent={true} 
    opacity={atmosphereOpacity}
    side={2} 
  />
</T.Mesh>

<!-- Cloud layer in the upper atmosphere -->
<T.Group position={[0, cloudLayerAltitude, 0]}>
  {#each Array(20) as _, i}
    {@const angle = (i / 20) * Math.PI * 2}
    {@const distance = Math.random() * 100}
    {@const height = Math.random() * 10}
    
    <T.Mesh 
      position={[
        Math.cos(angle) * distance,
        height,
        Math.sin(angle) * distance
      ]}
    >
      <T.SphereGeometry args={[10 + Math.random() * 20, 8, 8]} />
      <T.MeshBasicMaterial 
        color="#fffaf0" 
        transparent={true} 
        opacity={0.4}
      />
    </T.Mesh>
  {/each}
</T.Group>