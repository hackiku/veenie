<!-- src/routes/Scene.svelte -->
<script>
  import { T, useTask } from '@threlte/core';
  import { interactivity } from '@threlte/extras';
  import * as THREE from 'three';
  import { onMount } from 'svelte';
  
  interactivity();
  
  // Venus rotation animation
  let rotation = 0;
  useTask((delta) => {
    rotation += delta * 0.1; // Slow rotation
  });
  
  // Texture loading (optional, can use a simple material first)
  let venusTexture;
  let venusAtmosphereTexture;
  
  onMount(async () => {
    // If you have texture files, load them here
    // For now, we'll use simple materials
  });
  
  // Venus atmosphere colors
  const venusColor = '#e8a678';
  const atmosphereColor = '#f7c29a';
</script>

<!-- Scene setup -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 30]}
  fov={45}
/>

<!-- Ambient light for base illumination -->
<T.AmbientLight intensity={0.2} />

<!-- Main directional light -->
<T.DirectionalLight
  position={[10, 10, 10]}
  intensity={1.5}
  castShadow
/>

<!-- Venus -->
<T.Group rotation.y={rotation}>
  <!-- Main Venus sphere -->
  <T.Mesh>
    <T.SphereGeometry args={[10, 64, 32]} />
    <T.MeshStandardMaterial 
      color={venusColor}
      roughness={0.8}
      metalness={0.2}
    />
  </T.Mesh>
  
  <!-- Atmosphere glow effect -->
  <T.Mesh>
    <T.SphereGeometry args={[10.3, 64, 32]} />
    <T.MeshStandardMaterial 
      color={atmosphereColor}
      transparent={true}
      opacity={0.3}
      side={THREE.BackSide}
    />
  </T.Mesh>
  
  <!-- Clouds layer -->
  <T.Mesh>
    <T.SphereGeometry args={[10.5, 64, 32]} />
    <T.MeshStandardMaterial 
      color="#f8d9c0"
      transparent={true}
      opacity={0.4}
    />
  </T.Mesh>
</T.Group>

<!-- Highlight for the 50km altitude region -->
<T.Mesh>
  <T.TorusGeometry args={[10.5, 0.1, 16, 100]} />
  <T.MeshBasicMaterial color="#6ee7b7" transparent={true} opacity={0.8} />
</T.Mesh>