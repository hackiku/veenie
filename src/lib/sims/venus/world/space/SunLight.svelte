<!-- src/lib/sims/venus/world/space/SunLight.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getSunPosition } from '../../physics/orbital';
  
  // Props
  let {
    timeState,
    visible = true,
    intensity = 10.2
  } = $props();
  
  // Calculate sun position for lighting
  const sunPosition = $derived.by(() => {
    try {
      const simulationTime = timeState?.simulationTime || 0;
      const pos = getSunPosition(simulationTime);
      
      if (!Array.isArray(pos) || pos.length !== 3) {
        return [25000, 5000, 0]; // Fallback position
      }
      
      const [x, y, z] = pos.map(n => typeof n === 'number' && !isNaN(n) ? n : 0);
      return [x, y, z];
    } catch (error) {
      console.error('Error calculating sun light position:', error);
      return [25000, 5000, 0]; // Fallback position
    }
  });
  
  const sunColor = '#FFEB3B';
</script>

{#if visible}
  <!-- Main directional light from sun -->
  <T.DirectionalLight 
    position={sunPosition}
    intensity={intensity}
    color={sunColor}
    castShadow={false}
  />
  
  <!-- Fill light for better Venus illumination -->
  <T.PointLight 
    position={sunPosition}
    intensity={intensity * 0.4}
    color={sunColor}
    distance={40000}
    decay={0.5}
  />
  
  <!-- Additional fill light from opposite side (subtle) -->
  <T.PointLight 
    position={[-sunPosition[0] * 0.3, sunPosition[1], -sunPosition[2] * 0.3]}
    intensity={intensity * 0.1}
    color="#FFF8DC"
    distance={30000}
    decay={1}
  />
{/if}

<!-- Debug info -->
{#if import.meta.env.DEV}
  <div class="fixed top-60 left-4 bg-black/60 text-white p-2 rounded text-xs font-mono z-10">
    <div class="text-orange-300 font-bold">💡 Sun Light</div>
    <div>Light Pos: [{(sunPosition[0] ?? 0).toFixed(0)}, {(sunPosition[1] ?? 0).toFixed(0)}, {(sunPosition[2] ?? 0).toFixed(0)}]</div>
    <div>Intensity: {intensity}</div>
    <div>Color: {sunColor}</div>
  </div>
{/if}