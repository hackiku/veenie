<!-- src/lib/sims/fog/world/atmosphere/AtmosphereFog.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import * as THREE from 'three';
  
  // Props
  let {
    cameraAltitude = 55000,
    atmosphericConditions = {
      temperature: 27,
      airDensity: 0.9,
      atmosphericLayer: 'Cloud Layer'
    }
  } = $props();
  
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
  
  // Calculate fog properties reactively with safety checks
  const fogProperties = $derived(() => {
    // Safety checks
    if (!atmosphericConditions || typeof cameraAltitude !== 'number') {
      return {
        color: '#E1DCBB',
        density: 0.0001,
        layer: 'Cloud Layer'
      };
    }
    
    // Find the appropriate layer
    const layer = atmosphericLayers.find(l => 
      cameraAltitude >= l.minAlt && cameraAltitude < l.maxAlt
    ) || atmosphericLayers[atmosphericLayers.length - 1];
    
    // Adjust density based on atmospheric density (with fallback)
    const airDensity = atmosphericConditions.airDensity || 0.9;
    const densityMultiplier = Math.max(0.1, airDensity / 10);
    let density = layer.density * densityMultiplier;
    
    // Additional density adjustments for realism
    if (cameraAltitude < 20000) {
      // Very dense near surface
      density *= 2;
    } else if (cameraAltitude > 80000) {
      // Very thin at high altitude
      density *= 0.5;
    }
    
    // Clamp density to reasonable values
    density = Math.max(0.00001, Math.min(0.001, density));
    
    return {
      color: layer.color,
      density: density,
      layer: layer.name
    };
  });
  
  // Get current layer name for debug
  const currentLayer = $derived(() => {
    return atmosphericLayers.find(l => 
      cameraAltitude >= l.minAlt && cameraAltitude < l.maxAlt
    )?.name || 'Unknown';
  });
</script>

<!-- Main atmospheric fog -->
<T.FogExp2 
  color={fogProperties.color}
  density={fogProperties.density}
/>

<!-- Atmospheric background sphere for distant objects -->
<T.Mesh position={[0, cameraAltitude, 0]} renderOrder={-1000}>
  <T.SphereGeometry args={[300000, 32, 16]} />
  <T.MeshBasicMaterial 
    color={fogProperties.color}
    transparent={true}
    opacity={0.1}
    side={THREE.BackSide}
    fog={false}
    depthWrite={false}
  />
</T.Mesh>

<!-- Additional atmospheric layers for depth (only render nearby ones for performance) -->
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
    <div>Color: {fogProperties.color}</div>
    <div>Density: {fogProperties.density?.toExponential?.(2) || 'N/A'}</div>
    <div>Air Density: {(atmosphericConditions?.airDensity || 0).toFixed(2)} kg/m³</div>
    <div>Camera Alt: {cameraAltitude.toFixed(0)}m</div>
  </div>
{/if}