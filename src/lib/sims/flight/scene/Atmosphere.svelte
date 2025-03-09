<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  import { VENUS_ATMOSPHERIC_LAYERS, getLayerAtAltitude } from '$lib/data/flight/atmosphericLayers';
  
  // Venus radius in km (for realistic curvature)
  const VENUS_RADIUS = 6052;
  // const VENUS_RADIUS = 46052;
  
  // Improved colors from the svg gradient
  const improvedColors = {
    space: "#080808",
    thermosphere: "#4D7899",
    mesosphere: "#85C9FE",
    upperHaze: "#A2BEC6",
    cloudTop: "#E4DEB7",
    cloudMid: "#BFBD97",
    cloudBottom: "#E1DCBB",
    lowerHaze: "#DACDAB",
    lowerSurface: "#FFEDBF",
    midSurface: "#FEDD91",
    nearSurface: "#FDBD4B",
    surface: "#F6A309"
  };
  
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
  
  // Generate layers with realistic curvature
  const atmosphereLayers = VENUS_ATMOSPHERIC_LAYERS.map(layer => {
    // Enhanced colors based on layer type
    let enhancedColor = layer.color;
    
    switch(layer.name) {
      case "Surface Layer":
        enhancedColor = improvedColors.nearSurface;
        break;
      case "Lower Haze":
        enhancedColor = improvedColors.lowerHaze;
        break;
      case "Cloud Layer":
        enhancedColor = improvedColors.cloudMid;
        break;
      case "Upper Haze":
        enhancedColor = improvedColors.upperHaze;
        break;
      case "Mesosphere":
        enhancedColor = improvedColors.mesosphere;
        break;
      case "Thermosphere":
        enhancedColor = improvedColors.thermosphere;
        break;
    }
    
    // Calculate layer radius in visualization space
    // We use a scale factor to make it visually reasonable in game
    const scaleFactor = 1.0; // 5% of actual size for visualization
    
    // For each layer, calculate inner and outer radius based on planet radius
    const outerRadius = (VENUS_RADIUS + layer.endAltitude) * scaleFactor;
    const innerRadius = (VENUS_RADIUS + layer.startAltitude) * scaleFactor;
    
    // Center position is below player to create the curvature effect
    // We position the center of the planet far below the grid
    const centerPosition = [0, -VENUS_RADIUS * scaleFactor, 0];
    
    return {
      ...layer,
      color: enhancedColor,
      outerRadius,
      innerRadius,
      centerPosition,
      renderOrder: -(VENUS_ATMOSPHERIC_LAYERS.length - VENUS_ATMOSPHERIC_LAYERS.indexOf(layer))
    };
  });
  
  // Get the current layer for fog color
  const currentLayer = $derived(getLayerAtAltitude(currentAltitude));
  
  // Generate cloud particles within the cloud layer
  const cloudLayer = VENUS_ATMOSPHERIC_LAYERS.find(layer => layer.name === "Cloud Layer");
  const cloudAltitude = cloudLayer ? (cloudLayer.startAltitude + cloudLayer.endAltitude) / 2 : 50;
  
  const cloudParticles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 100 + Math.random() * 40;
    const latitude = (Math.random() * 2 - 1) * Math.PI / 3; // -60° to +60°
    
    return {
      position: [
        radius * Math.cos(latitude) * Math.cos(angle),
        cloudAltitude + (Math.random() * 10 - 5),
        radius * Math.cos(latitude) * Math.sin(angle)
      ],
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3
    };
  });
</script>

<!-- Atmospheric fog matching current layer -->
<T.Fog color={currentLayer.color} near={100} far={10000} />

<!-- Generate all atmospheric layers using a simple loop -->
{#each atmosphereLayers as layer}
  <!-- Using spheres positioned at center of Venus -->
  <T.Mesh position={layer.centerPosition} renderOrder={layer.renderOrder}>
    <T.SphereGeometry args={[layer.outerRadius, 32, 32]} />
    <T.MeshBasicMaterial 
      color={layer.color} 
      transparent={true} 
      opacity={layer.opacity * 0.7} 
      side={12} 
      depthWrite={false}
    />
  </T.Mesh>
{/each}

<!-- Cloud particles -->
<T.Group position={[0, 0, 0]}>
  {#each cloudParticles as cloud}
    <T.Mesh 
      position={cloud.position}
      renderOrder={5}
    >
      <T.SphereGeometry args={[cloud.size, 6, 6]} />
      <T.MeshBasicMaterial 
        color={improvedColors.cloudMid} 
        transparent={true} 
        opacity={cloud.opacity}
        depthWrite={false}
      />
    </T.Mesh>
  {/each}
</T.Group>