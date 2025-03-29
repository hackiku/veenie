<!-- src/lib/sims/planet/scene/terrain/Terrain.svelte -->
<script>
  import { T } from '@threlte/core';
  
  // Props
  let { 
    radius = 6051.8, // km
    scale = 0.001,
    rotation = 0,
    detail = 8,
    roughness = 0.8
  } = $props();
  
  // Scale the radius
  let scaledRadius = $derived(radius * scale);
  
  // Color constants
  const terrainBaseColor = "#af7f55";
  const terrainHighlightColor = "#d8c397";
  const terrainLowlandColor = "#806440";
</script>

<T.Group rotation.y={rotation}>
  <!-- Simple procedural terrain using basic THREE.js geometry with noise -->
  <T.Mesh receiveShadow>
    <T.SphereGeometry args={[scaledRadius, 32, 32]} />
    <T.MeshStandardMaterial 
      color={terrainBaseColor} 
      roughness={roughness}
      metalness={0.1}
      emissive="#441500"
      emissiveIntensity={0.05}
    />
  </T.Mesh>
  
  <!-- Surface features -->
  {#if detail >= 2}
    <!-- Simplified crater -->
    <T.Group position={[scaledRadius * 0.3, scaledRadius * 0.5, scaledRadius * 0.7]}>
      <T.Mesh>
        <T.CircleGeometry args={[scaledRadius * 0.15, 32]} />
        <T.MeshStandardMaterial color={terrainLowlandColor} roughness={1} />
      </T.Mesh>
    </T.Group>
    
    <!-- Another crater -->
    <T.Group position={[-scaledRadius * 0.5, scaledRadius * 0.1, scaledRadius * 0.5]}>
      <T.Mesh>
        <T.CircleGeometry args={[scaledRadius * 0.08, 32]} />
        <T.MeshStandardMaterial color={terrainLowlandColor} roughness={1} />
      </T.Mesh>
    </T.Group>
  {/if}
  
  <!-- Reference markers (poles/equator) - only if detail is high enough -->
  {#if detail >= 5}
    <!-- Equator reference line -->
    <T.Mesh rotation.x={Math.PI/2}>
      <T.TorusGeometry args={[scaledRadius * 1.001, scaledRadius * 0.002, 16, 100]} />
      <T.MeshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
    </T.Mesh>
  {/if}
</T.Group>