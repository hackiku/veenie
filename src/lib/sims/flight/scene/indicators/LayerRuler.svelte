<!-- src/lib/sims/flight/scene/indicators/LayerRuler.svelte -->

<script>
  import { T } from "@threlte/core";
  import { VENUS_ATMOSPHERIC_LAYERS } from '$lib/data/flight/atmosphericLayers';
  import { flightStore } from '$lib/stores/flightStore';
  
  // Props
  let { 
    position = [80, 0, 0],   // X offset from center
    poleWidth = 0.3,         // Width of the vertical pole
    platformRadius = 15,     // Radius of the circular platforms
    opacity = 0.3,           // Base opacity
  } = $props();
  
  // Current altitude from flight store
  let currentAltitude = $state(50); // Default to cloud layer
  
  // Subscribe to the flight store to get current altitude
  $effect(() => {
    const unsubscribe = flightStore.subscribe(state => {
      if (state && state.altitude !== undefined) {
        currentAltitude = state.altitude;
      }
    });
    
    return unsubscribe;
  });
  
  // Enhanced colors with better contrast
  const layerColors = {
    "Surface Layer": "#FF8C00",     // Dark orange for surface
    "Lower Haze": "#FFCC66",        // Light orange for lower haze
    "Cloud Layer": "#FFFFFF",       // White for main cloud layer
    "Upper Haze": "#99CCFF",        // Light blue for upper haze
    "Mesosphere": "#6699FF",        // Blue for mesosphere
    "Thermosphere": "#3366CC"       // Dark blue for thermosphere
  };
  
  // Helper to determine if a layer contains the current altitude
  function isCurrentLayer(layer) {
    return currentAltitude >= layer.startAltitude && 
           currentAltitude < layer.endAltitude;
  }
</script>

<!-- Main ruler container -->
<T.Group {position}>
  <!-- Main vertical pole (100km tall) -->
  <T.Mesh position={[0, 50, 0]}>
    <T.CylinderGeometry args={[poleWidth, poleWidth, 100, 8]} />
    <T.MeshBasicMaterial color="#888888" opacity={0.7} transparent={true} />
  </T.Mesh>
  
  <!-- Layer marker platforms -->
  {#each VENUS_ATMOSPHERIC_LAYERS as layer}
    {@const layerColor = layerColors[layer.name] || layer.color}
    {@const isActive = isCurrentLayer(layer)}
    {@const layerOpacity = isActive ? opacity * 2 : opacity}
    
    <!-- Platform at the start of each layer -->
    <T.Mesh position={[0, layer.startAltitude, 0]}>
      <T.CylinderGeometry args={[platformRadius/3, platformRadius/3, 0.2, 16]} />
      <T.MeshBasicMaterial color={layerColor} opacity={layerOpacity*1.2} transparent={true} />
    </T.Mesh>
    
    <!-- Platform at the middle of the layer (main platform) -->
    <T.Mesh position={[0, (layer.startAltitude + layer.endAltitude)/2, 0]}>
      <T.CylinderGeometry args={[platformRadius, platformRadius, 0.3, 16]} />
      <T.MeshBasicMaterial color={layerColor} opacity={layerOpacity} transparent={true} />
    </T.Mesh>
    
    <!-- Circular marker at the end of each layer -->
    <T.Mesh position={[0, layer.endAltitude, 0]}>
      <T.CylinderGeometry args={[platformRadius/3, platformRadius/3, 0.2, 16]} />
      <T.MeshBasicMaterial color={layerColor} opacity={layerOpacity*1.2} transparent={true} />
    </T.Mesh>
  {/each}
  
  <!-- Current altitude indicator - small sphere on the pole -->
  <T.Mesh position={[0, currentAltitude, 0]}>
    <T.SphereGeometry args={[1, 16, 16]} />
    <T.MeshBasicMaterial color="#4080ff" />
  </T.Mesh>
  
  <!-- Horizontal marker extending from the pole at current altitude -->
  <T.Mesh position={[platformRadius/2, currentAltitude, 0]} rotation={[0, 0, Math.PI/2]}>
    <T.CylinderGeometry args={[0.2, 0.2, platformRadius, 8]} />
    <T.MeshBasicMaterial color="#4080ff" />
  </T.Mesh>
</T.Group>