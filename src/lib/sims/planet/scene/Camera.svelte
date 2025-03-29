<!-- src/lib/sims/planet/scene/Camera.svelte -->
<script>
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  
  // Props
  let { 
    scale = 'planet'
  } = $props();
  
  // Camera settings based on scale
  const cameraConfig = {
    space: {
      position: [0, 0, 200],
      fov: 45,
      minDistance: 50,
      maxDistance: 1000
    },
    planet: {
      position: [5, 15, 25],
      fov: 45,
      minDistance: 7,
      maxDistance: 180
    },
    atmosphere: {
      position: [0, 0, 15],
      fov: 60,
      minDistance: 6,
      maxDistance: 30
    }
  };
  
  // Use the correct settings based on the scale
  let settings = $derived(cameraConfig[scale] || cameraConfig.planet);
</script>

<T.PerspectiveCamera
  position={settings.position}
  fov={settings.fov}
  near={0.1}
  far={1000}
  makeDefault
>
  <OrbitControls 
    enableDamping
    dampingFactor={0.1}
    minDistance={settings.minDistance}
    maxDistance={settings.maxDistance}
  />
</T.PerspectiveCamera>