<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  
  // Venus atmosphere properties
  const atmosphereColor = $state("#ffebaa"); // Yellowish atmosphere
  const surfaceHazeColor = $state("#ffb366"); // Orange-yellow surface haze
  const lowerHazeColor = $state("#fff5cc"); // Light yellow lower haze
  const cloudColor = $state("#fffaf0"); // Whitish clouds
  const upperHazeColor = $state("#e6f7ff"); // Light blue upper haze
  
  // Altitude layers
  const surfaceHazeAltitude = $state(0); // 0-20km
  const lowerHazeAltitude = $state(20); // 20-45km 
  const cloudLayerAltitude = $state(50); // 45-65km (where we want to fly)
  const upperHazeAltitude = $state(70); // 65-90km
  
  // Opacities - reduce to improve visibility
  const surfaceHazeOpacity = $state(0.3);
  const lowerHazeOpacity = $state(0.2);
  const cloudOpacity = $state(0.3);
  const upperHazeOpacity = $state(0.15);
  const atmosphereOpacity = $state(0.1);
  
  // Layer sizes - from surface outward
  const surfaceHazeRadius = $state(800); 
  const lowerHazeRadius = $state(600);
  const cloudLayerRadius = $state(400);
  const upperHazeRadius = $state(300);
  const atmosphereRadius = $state(1200);
</script>

<!-- Atmospheric fog - subtle to improve visibility -->
<T.Fog color={atmosphereColor} near={200} far={1500} />

<!-- Overall atmosphere sphere -->
<T.Mesh position={[0, 0, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[atmosphereRadius, 32, 16]} />
  <T.MeshBasicMaterial 
    color={atmosphereColor} 
    transparent={true} 
    opacity={atmosphereOpacity}
    side={2}
    depthWrite={false}
  />
</T.Mesh>

<!-- Surface haze layer (0-20km) -->
<T.Mesh position={[0, surfaceHazeAltitude, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[surfaceHazeRadius, 32, 16]} />
  <T.MeshBasicMaterial 
    color={surfaceHazeColor} 
    transparent={true} 
    opacity={surfaceHazeOpacity}
    side={2}
    depthWrite={false}
  />
</T.Mesh>

<!-- Lower haze layer (20-45km) -->
<T.Mesh position={[0, lowerHazeAltitude, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[lowerHazeRadius, 32, 16]} />
  <T.MeshBasicMaterial 
    color={lowerHazeColor} 
    transparent={true} 
    opacity={lowerHazeOpacity}
    side={2}
    depthWrite={false}
  />
</T.Mesh>

<!-- Main cloud layer (45-65km) - primary flight zone -->
<T.Group position={[0, cloudLayerAltitude, 0]}>
  <!-- Cloud base layer -->
  <T.Mesh renderOrder={-1}>
    <T.SphereGeometry args={[cloudLayerRadius, 32, 16]} />
    <T.MeshBasicMaterial 
      color={cloudColor} 
      transparent={true} 
      opacity={cloudOpacity}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
  
  <!-- Individual cloud formations - reduced quantity for better performance -->
  {#each Array(20) as _, i}
    {@const angle = (i / 20) * Math.PI * 2}
    {@const radius = cloudLayerRadius - 20 + Math.random() * 40}
    {@const latitude = (Math.random() * 2 - 1) * Math.PI / 3} <!-- Distribute between -60° and +60° -->
    
    <T.Mesh 
      position={[
        radius * Math.cos(latitude) * Math.cos(angle),
        radius * Math.sin(latitude),
        radius * Math.cos(latitude) * Math.sin(angle)
      ]}
      renderOrder={0}
    >
      <T.SphereGeometry args={[5 + Math.random() * 15, 6, 6]} />
      <T.MeshBasicMaterial 
        color={cloudColor} 
        transparent={true} 
        opacity={0.5 + Math.random() * 0.3}
        depthWrite={false}
      />
    </T.Mesh>
  {/each}
</T.Group>

<!-- Upper haze layer (65-90km) -->
<T.Mesh position={[0, upperHazeAltitude, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[upperHazeRadius, 24, 16]} />
  <T.MeshBasicMaterial 
    color={upperHazeColor} 
    transparent={true} 
    opacity={upperHazeOpacity}
    side={2}
    depthWrite={false}
  />
</T.Mesh>