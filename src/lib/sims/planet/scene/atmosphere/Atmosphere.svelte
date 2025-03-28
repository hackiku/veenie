<!-- src/lib/sims/planet/scene/atmosphere/Atmosphere.svelte -->
<script>
  import { T } from '@threlte/core';
  import { BackSide } from 'three';
  
  // Props
  let { 
    planetRadius = 6051.8, // km
    scale = 0.001,
  } = $props();
  
  // Atmosphere layers data
  // Each layer has a name, altitude (km above surface), color, and opacity
  const atmosphereLayers = [
    { name: 'Surface Haze', altitude: 0, color: "#FFDB99", opacity: 0.9 },
    { name: 'Lower Haze', altitude: 30, color: "#E6C98C", opacity: 0.7 },
    { name: 'Middle & Lower Clouds', altitude: 50, color: "#D9D9D9", opacity: 0.6 },
    { name: 'Upper Clouds', altitude: 65, color: "#BFBFBF", opacity: 0.5 },
    { name: 'Upper Haze', altitude: 90, color: "#9FAFCF", opacity: 0.3 },
    { name: 'Thermosphere', altitude: 120, color: "#7E93BE", opacity: 0.1 }
  ];
</script>

<!-- Render each atmosphere layer as a sphere -->
{#each atmosphereLayers as layer}
  <T.Mesh>
    <T.SphereGeometry 
      args={[(planetRadius + layer.altitude) * scale, 64, 64]} 
    />
    <T.MeshStandardMaterial 
      color={layer.color}
      transparent={true}
      opacity={layer.opacity}
      side={BackSide}
      depthWrite={false}
    />
  </T.Mesh>
{/each}

<!-- Atmosphere fog effect for immersion -->
<T.Fog color="#9FAFCF" near={planetRadius * scale * 1.5} far={planetRadius * scale * 10} />