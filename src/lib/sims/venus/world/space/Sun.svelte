<!-- src/lib/sims/venus/world/space/Sun.svelte -->
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
        return [30000, 3000, 0]; // Fallback position
      }
      
      // Ensure all values are numbers
      const [x, y, z] = pos.map(n => typeof n === 'number' && !isNaN(n) ? n : 0);
      return [x, y, z];
    } catch (error) {
      console.error('Error calculating sun position:', error);
      return [30000, 3000, 0]; // Fallback position
    }
  });
  
  const sunRadius = 800;
  const sunColor = '#FFEB3B';
</script>

{#if visible}
  <!-- Sun group -->
  <T.Group position={sunPosition}>
    <!-- Main sun sphere -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius, 16, 12]} />
      <T.MeshBasicMaterial 
        color={sunColor}
        emissiveIntensity={0.3}
      />
    </T.Mesh>
    
    <!-- Sun glow -->
    <T.Mesh>
      <T.SphereGeometry args={[sunRadius * 1.5, 12, 8]} />
      <T.MeshBasicMaterial 
        color={sunColor}
        transparent
        opacity={0.1}
      />
    </T.Mesh>
  </T.Group>
  
  <!-- Simple directional light (no complex target) -->
  <T.DirectionalLight 
    position={sunPosition}
    intensity={0.8}
    color={sunColor}
    castShadow={false}
  />
  
  <!-- Point light for additional illumination -->
  <T.PointLight 
    position={sunPosition}
    intensity={0.3}
    color={sunColor}
    distance={50000}
  />
{/if}

<!-- Debug info -->
{#if import.meta.env.DEV}
  <div class="fixed top-20 left-4 bg-black/60 text-white p-2 rounded text-xs font-mono z-10">
    <div class="text-yellow-300 font-bold">☀️ Sun Debug</div>
    <div>Position: [{sunPosition[0]?.toFixed(0) || '0'}, {sunPosition[1]?.toFixed(0) || '0'}, {sunPosition[2]?.toFixed(0) || '0'}]</div>
    <div>Distance: {Math.sqrt(sunPosition[0]**2 + sunPosition[1]**2 + sunPosition[2]**2).toFixed(0)}</div>
    <div>Sim Time: {(timeState?.simulationTime || 0).toFixed(1)}s</div>
  </div>
{/if}