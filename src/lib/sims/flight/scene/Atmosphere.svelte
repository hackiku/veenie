<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Import only what we need
  import { getLayerAtAltitude } from '$lib/data/flight/atmosphericLayers';
  
  // Subscribe to the flight store to get current altitude
  let flightState = $state(null);
  let currentAltitude = $state(50); // Default to cloud layer
  
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
      if (state && state.altitude !== undefined) {
        currentAltitude = state.altitude;
      }
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Layer colors - using let instead of const so we can update them
  let atmosphereColor = $state("#ffebaa"); // Yellowish atmosphere
  let surfaceHazeColor = $state("#ffb366"); // Orange-yellow surface haze
  let lowerHazeColor = $state("#fff5cc"); // Light yellow lower haze
  let cloudColor = $state("#fffaf0"); // Whitish clouds
  let upperHazeColor = $state("#e6f7ff"); // Light blue upper haze
  
  // Helper function to blend colors
  function blendColors(color1, color2, ratio) {
    // Convert hex to RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Blend colors
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Update colors based on current altitude
  $effect(() => {
    try {
      const currentLayer = getLayerAtAltitude(currentAltitude);
      
      // Use the layer colors directly
      surfaceHazeColor = getLayerAtAltitude(10).color;
      lowerHazeColor = getLayerAtAltitude(30).color;
      cloudColor = getLayerAtAltitude(50).color;
      upperHazeColor = getLayerAtAltitude(70).color;
      atmosphereColor = getLayerAtAltitude(85).color;
    } catch (error) {
      console.error("Error updating atmosphere colors:", error);
    }
  });
  
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
  
  // Get the current layer information for debugging
  const currentLayer = $derived(getLayerAtAltitude(currentAltitude));
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