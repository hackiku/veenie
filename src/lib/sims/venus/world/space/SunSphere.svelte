<!-- src/lib/sims/venus/world/space/SunSphere.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getSunPosition } from '../../physics/orbital';
  
  // Props
  let {
    timeState,
    visible = true
  } = $props();
  
  // Calculate sun position with error checking
  const sunPosition = $derived(() => {
    try {
      const simulationTime = timeState?.simulationTime || 0;
      const pos = getSunPosition(simulationTime);
      
      // Ensure we have a valid array
      if (!Array.isArray(pos) || pos.length !== 3) {
        console.warn('Invalid sun position:', pos);
        return [25000, 5000, 0]; // Fallback position
      }
      
      // Ensure all values are numbers
      const [x, y, z] = pos.map(n => typeof n === 'number' && !isNaN(n) ? n : 0);
      return [x, y, z];
    } catch (error) {
      console.error('Error calculating sun position:', error);
      return [25000, 5000, 0]; // Fallback position
    }
  });
  
  const sunRadius = 1200;
  const sunColor = '#FFEB3B';
</script>

{#if visible}
  <!-- Sun sphere group -->
  <T.Group position={sunPosition}>
    <!-- Main sun sphere - NO EMISSIVE PROPERTIES -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius, 16, 12]} />
      <T.MeshBasicMaterial color={sunColor} />
    </T.Mesh>
    
    <!-- Sun glow -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius * 1.8, 12, 8]} />
      <T.MeshBasicMaterial 
        color={sunColor}
        transparent
        opacity={0.15}
      />
    </T.Mesh>
    
    <!-- Bright core -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius * 0.6, 8, 6]} />
      <T.MeshBasicMaterial color="#FFFFFF" />
    </T.Mesh>
  </T.Group>
{/if}

<!-- Debug info -->
{#if import.meta.env.DEV}
  <div class="fixed top-20 left-4 bg-black/60 text-white p-2 rounded text-xs font-mono z-10">
    <div class="text-yellow-300 font-bold">☀️ Sun Sphere</div>
    <div>Position: [{(sunPosition[0] ?? 0).toFixed(0)}, {(sunPosition[1] ?? 0).toFixed(0)}, {(sunPosition[2] ?? 0).toFixed(0)}]</div>
    <div>Distance: {Math.sqrt((sunPosition[0] ?? 0)**2 + (sunPosition[1] ?? 0)**2 + (sunPosition[2] ?? 0)**2).toFixed(0)}</div>
    <div>Sim Time: {(timeState?.simulationTime ?? 0).toFixed(1)}s</div>
  </div>
{/if}