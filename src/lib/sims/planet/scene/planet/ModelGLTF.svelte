<!-- src/lib/sims/planet/scene/Planet.svelte -->
<script>
  import { T } from '@threlte/core';
  
  // Props
  let { 
    radius = 6051.8, // km
    scale = 0.001,
    rotation = 0
  } = $props();
  
  // Venus texture and surface details
  // We're starting with a simple version and can enhance later
  const venusSurfaceColor = "#E6C98C";
  const venusHighlightColor = "#FFF4C8";
  
  // Scale the radius
  $derived.scaledRadius = radius * scale;
</script>

<T.Group rotation.y={rotation}>
  <!-- Venus surface -->
  <T.Mesh receiveShadow>
    <T.SphereGeometry args={[scaledRadius, 64, 64]} />
    <T.MeshStandardMaterial 
      color={venusSurfaceColor} 
      roughness={0.8}
      metalness={0.1}
      emissive="#441500"
      emissiveIntensity={0.05}
    />
  </T.Mesh>
  
  <!-- Venus poles indicators (optional) -->
  <T.Group rotation.x={Math.PI/2}>
    <!-- North pole indicator -->
    <T.Mesh position={[0, scaledRadius * 1.01, 0]}>
      <T.CylinderGeometry args={[0, scaledRadius * 0.05, scaledRadius * 0.1, 12]} />
      <T.MeshStandardMaterial color="#ff6b00" />
    </T.Mesh>
    
    <!-- South pole indicator -->
    <T.Mesh position={[0, -scaledRadius * 1.01, 0]} rotation.x={Math.PI}>
      <T.CylinderGeometry args={[0, scaledRadius * 0.05, scaledRadius * 0.1, 12]} />
      <T.MeshStandardMaterial color="#0066ff" />
    </T.Mesh>
  </T.Group>
  
  <!-- Equator reference line (optional) -->
  <T.Mesh rotation.x={Math.PI/2}>
    <T.TorusGeometry args={[scaledRadius * 1.001, scaledRadius * 0.002, 16, 100]} />
    <T.MeshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
  </T.Mesh>
</T.Group>