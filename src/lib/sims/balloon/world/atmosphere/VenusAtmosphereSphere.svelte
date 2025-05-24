<!-- src/lib/sims/balloon/world/atmosphere/VenusAtmosphereSphere.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import * as THREE from 'three';
  import { onMount } from 'svelte';
  
  // Props
  let {
    maxAltitude = 200000, // 200km max altitude
    sphereRadius = 500000 // Large enough to always be in background
  } = $props();
  
  let atmosphereMaterial = $state(null);
  
  // Create gradient texture for Venus atmosphere
  function createVenusGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    const ctx = canvas.getContext('2d');
    
    // Create vertical gradient matching your altimeter colors
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    
    // Venus atmosphere colors from 0-200km
    gradient.addColorStop(0.0, '#080808');   // 200km - Space (black)
    gradient.addColorStop(0.17, '#4D7899');  // 166km - High atmosphere
    gradient.addColorStop(0.34, '#85C9FE');  // 132km - Upper atmosphere  
    gradient.addColorStop(0.54, '#A2BEC6');  // 92km - Middle atmosphere
    gradient.addColorStop(0.64, '#E4DEB7');  // 72km - Upper clouds
    gradient.addColorStop(0.72, '#BFBD97');  // 56km - Cloud layer (balloon!)
    gradient.addColorStop(0.77, '#E1DCBB');  // 46km - Lower clouds
    gradient.addColorStop(0.80, '#DACDAB');  // 40km - Haze layer
    gradient.addColorStop(0.84, '#FFEDBF');  // 32km - Lower haze
    gradient.addColorStop(0.90, '#FEDD91');  // 20km - Dense atmosphere
    gradient.addColorStop(0.95, '#FDBD4B');  // 10km - Lower atmosphere
    gradient.addColorStop(1.0, '#F6A309');   // 0km - Surface (orange)
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return texture;
  }
  
  onMount(() => {
    const gradientTexture = createVenusGradientTexture();
    
    atmosphereMaterial = new THREE.MeshBasicMaterial({
      map: gradientTexture,
      side: THREE.BackSide, // Render inside of sphere
      transparent: true,
      opacity: 0.8,
      fog: false, // Don't let fog affect the background
      depthWrite: false,
      depthTest: false
    });
  });
</script>

<!-- Venus Atmosphere Background Sphere -->
{#if atmosphereMaterial}
  <T.Mesh 
    position={[0, 0, 0]} 
    renderOrder={-1000}
    frustumCulled={false}
  >
    <T.SphereGeometry args={[sphereRadius, 32, 32]} />
    <T is={atmosphereMaterial} />
  </T.Mesh>
{/if}