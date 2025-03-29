<!-- src/lib/sims/planet/scene/terrain/Terrain.svelte -->
<script>
  import { T } from '@threlte/core';
  import * as THREE from 'three';
  
  // Props
  let { 
    radius = 6051.8, // km
    scale = 0.001,
    rotation = 0,
    detail = 32,
    roughness = 0.8
  } = $props();
  
  // Scale the radius
  let scaledRadius = $derived(radius * scale);
  
  // Color constants
  const terrainBaseColor = "#896237";
  const terrainHighlightColor = "#d8c397";
  const terrainLowlandColor = "#734d2e";
  
  // Generate displacement map programmatically
  let displacementMap;
  $effect(() => {
    // This would normally be handled by a shader, but we'll use a simple approximation
    displacementMap = new THREE.DataTexture(
      new Float32Array(128 * 128).map(() => Math.random() * 0.1), 
      128, 
      128, 
      THREE.RedFormat, 
      THREE.FloatType
    );
    displacementMap.needsUpdate = true;
  });
</script>

<T.Group rotation.y={rotation}>
  <!-- Venus terrain surface with displacement -->
  <T.Mesh receiveShadow>
    <T.SphereGeometry args={[scaledRadius, detail, detail]} />
    <T.MeshStandardMaterial 
      color={terrainBaseColor} 
      roughness={roughness}
      metalness={0.1}
      displacementScale={scaledRadius * 0.05}
      displacementBias={-scaledRadius * 0.02}
      emissive="#441500"
      emissiveIntensity={0.05}
    >
      <!-- Using a noise texture for displacement -->
      <T.NoiseTexture 
        attach="displacementMap" 
        args={[512, 512]}
      />
    </T.MeshStandardMaterial>
  </T.Mesh>
  
  <!-- Reference markers like in Planet.svelte for consistency -->
  <!-- North/South pole indicators -->
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
  
  <!-- Craters and surface features -->
  <T.Group>
    <!-- Major crater 1 -->
    <T.Mesh position={[scaledRadius * 0.7, scaledRadius * 0.2, scaledRadius * 0.5]}>
      <T.CircleGeometry args={[scaledRadius * 0.1, 32]} />
      <T.MeshStandardMaterial color={terrainLowlandColor} roughness={1} />
    </T.Mesh>
    
    <!-- Major crater 2 -->
    <T.Mesh position={[-scaledRadius * 0.4, scaledRadius * 0.6, scaledRadius * 0.4]}>
      <T.CircleGeometry args={[scaledRadius * 0.15, 32]} />
      <T.MeshStandardMaterial color={terrainLowlandColor} roughness={1} />
    </T.Mesh>
    
    <!-- Volcanic area -->
    <T.Mesh position={[scaledRadius * 0.1, -scaledRadius * 0.7, scaledRadius * 0.1]}>
      <T.SphereGeometry args={[scaledRadius * 0.08, 16, 16]} />
      <T.MeshStandardMaterial 
        color="#8B4513" 
        emissive="#FF4500"
        emissiveIntensity={0.2}
      />
    </T.Mesh>
  </T.Group>
  
  <!-- Equator reference line (optional) -->
  <T.Mesh rotation.x={Math.PI/2}>
    <T.TorusGeometry args={[scaledRadius * 1.001, scaledRadius * 0.002, 16, 100]} />
    <T.MeshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
  </T.Mesh>
</T.Group>