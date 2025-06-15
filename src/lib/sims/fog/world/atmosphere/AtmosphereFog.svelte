<!-- src/lib/sims/fog/world/atmosphere/AtmosphereFog.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import * as THREE from 'three';
  
  // Props
  let {
    cameraAltitude = 55000,
    atmosphericConditions = {
      temperature: 27,
      airDensity: 0.9,
      atmosphericLayer: 'Cloud Layer'
    },
    updateInterval = 500 // Update fog every 500ms for performance
  } = $props();
  
  // Fog state
  let fogColor = $state('#E4DEB7');
  let fogDensity = $state(0.00005);
  let lastUpdate = $state(0);
  
  // Venus atmospheric layers with fog properties
  const atmosphericLayers = [
    { minAlt: 0, maxAlt: 15000, color: '#F6A309', density: 0.0003, name: 'Surface' },
    { minAlt: 15000, maxAlt: 30000, color: '#FDBD4B', density: 0.0002, name: 'Lower Atmosphere' },
    { minAlt: 30000, maxAlt: 45000, color: '#FFEDBF', density: 0.00015, name: 'Lower Haze' },
    { minAlt: 45000, maxAlt: 60000, color: '#E1DCBB', density: 0.0001, name: 'Cloud Layer' },
    { minAlt: 60000, maxAlt: 75000, color: '#A2BEC6', density: 0.00008, name: 'Upper Clouds' },
    { minAlt: 75000, maxAlt: 100000, color: '#85C9FE', density: 0.00005, name: 'Upper Atmosphere' },
    { minAlt: 100000, maxAlt: 200000, color: '#4D7899', density: 0.00002, name: 'High Atmosphere' }
  ];
  
  // Update fog based on altitude
  function updateFogForAltitude(altitude: number) {
    // Find the appropriate layer
    const layer = atmosphericLayers.find(l => 
      altitude >= l.minAlt && altitude < l.maxAlt
    ) || atmosphericLayers[atmosphericLayers.length - 1];
    
    // Calculate interpolation within layer if needed
    const layerProgress = (altitude - layer.minAlt) / (layer.maxAlt - layer.minAlt);
    
    // Set fog properties
    fogColor = layer.color;
    
    // Adjust density based on atmospheric density
    const densityMultiplier = Math.max(0.1, atmosphericConditions.airDensity / 10);
    fogDensity = layer.density * densityMultiplier;
    
    // Additional density adjustments for realism
    if (altitude < 20000) {
      // Very dense near surface
      fogDensity *= 2;
    } else if (altitude > 80000) {
      // Very thin at high altitude
      fogDensity *= 0.5;
    }
    
    // Clamp density to reasonable values
    fogDensity = Math.max(0.00001, Math.min(0.001, fogDensity));
  }
  
  // Use task for periodic updates (performance optimization)
  useTask((delta, total) => {
    if (total - lastUpdate > updateInterval) {
      updateFogForAltitude(cameraAltitude);
      lastUpdate = total;
    }
  });
  
  // Initialize fog
  updateFogForAltitude(cameraAltitude);
  
  // Get current layer name for debug
  const currentLayer = $derived(() => {
    return atmosphericLayers.find(l => 
      cameraAltitude >= l.minAlt && cameraAltitude < l.maxAlt
    )?.name || 'Unknown';
  });
</script>

<!-- Main atmospheric fog -->
<T.FogExp2 
  color={fogColor}
  density={fogDensity}
/>

<!-- Atmospheric background sphere for distant objects -->
<T.Mesh position={[0, cameraAltitude, 0]} renderOrder={-1000}>
  <T.SphereGeometry args={[300000, 32, 16]} />
  <T.MeshBasicMaterial 
    color={fogColor}
    transparent={true}
    opacity={0.1}
    side={THREE.BackSide}
    fog={false}
    depthWrite={false}
  />
</T.Mesh>

<!-- Additional atmospheric layers for depth -->
{#each atmosphericLayers as layer, i}
  {#if Math.abs(cameraAltitude - (layer.minAlt + layer.maxAlt) / 2) < 50000}
    <T.Mesh 
      position={[0, (layer.minAlt + layer.maxAlt) / 2, 0]} 
      renderOrder={-100 + i}
    >
      <T.SphereGeometry args={[200000 + i * 10000, 16, 8]} />
      <T.MeshBasicMaterial 
        color={layer.color}
        transparent={true}
        opacity={0.02}
        side={THREE.DoubleSide}
        fog={true}
        depthWrite={false}
      />
    </T.Mesh>
  {/if}
{/each}

<!-- Debug info for development -->
{#if import.meta.env.DEV}
  <div class="fixed bottom-4 left-4 bg-black/60 text-white p-2 rounded text-xs font-mono">
    <div class="text-cyan-300 font-bold mb-1">🌫️ Fog Debug</div>
    <div>Layer: {currentLayer}</div>
    <div>Color: {fogColor}</div>
    <div>Density: {fogDensity.toExponential(2)}</div>
    <div>Air Density: {atmosphericConditions.airDensity.toFixed(2)} kg/m³</div>
  </div>
{/if}