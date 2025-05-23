<!-- src/lib/sims/balloon/world/atmosphere/Clouds.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getCloudSystem, type CloudData } from '../../physics/clouds';
  import { getPhysicsEngine } from '../../physics/engine';
  import * as THREE from 'three';
  import { onMount, onDestroy } from 'svelte';

  // Props
  let {
    resetSignal = 0
  } = $props();

  // Get the systems
  const cloudSystem = getCloudSystem();
  const engine = getPhysicsEngine();
  
  // Get cloud data, make it reactive
  let currentClouds = $state<CloudData[]>(cloudSystem.getClouds());
  
  // Create shared materials and textures (for performance)
  const cloudNoise = $state(createCloudNoiseTexture());
  
  const cloudMaterials = $state({
    puffy: new THREE.MeshStandardMaterial({
      color: '#FFF8DC',
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      roughness: 1.0,
      metalness: 0.0,
      alphaMap: cloudNoise,
      fog: true
    }),
    wispy: new THREE.MeshStandardMaterial({
      color: '#FFFFF0',
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      roughness: 0.8,
      metalness: 0.0,
      alphaMap: cloudNoise,
      fog: true
    }),
    dense: new THREE.MeshStandardMaterial({
      color: '#FAFAC8',
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      roughness: 1.0,
      metalness: 0.0,
      alphaMap: cloudNoise,
      fog: true
    })
  });
  
  // Create a custom noise texture for the cloud
  function createCloudNoiseTexture() {
    const size = 128;
    const data = new Uint8Array(size * size * 4);
    
    // Create a gradient falloff from center
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const index = (y * size + x) * 4;
        
        // Calculate distance from center (0-1)
        const centerX = size / 2;
        const centerY = size / 2;
        const distX = (x - centerX) / centerX;
        const distY = (y - centerY) / centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        // Perlin-like noise (simplified)
        const noise = Math.sin(x * 0.1) * Math.sin(y * 0.1) * 0.25 + 0.75;
        
        // Combine distance gradient with noise
        let alpha = Math.max(0, 1 - dist) * noise;
        
        // Soften the edges with a power function
        alpha = Math.pow(alpha, 1.5);
        
        // Set colors (white) and alpha
        data[index] = 255;
        data[index + 1] = 255; 
        data[index + 2] = 255;
        data[index + 3] = Math.floor(alpha * 255);
      }
    }
    
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  }
  
  // Get material for this cloud type
  function getMaterialForCloud(cloud) {
    switch(cloud.visualType) {
      case 0: return cloudMaterials.puffy;
      case 1: return cloudMaterials.wispy;
      case 2: return cloudMaterials.dense;
      default: return cloudMaterials.puffy;
    }
  }
  
  // Animation loop for cloud updates
  let animationFrameId: number | null = null;

  function animationLoop() {
    currentClouds = [...cloudSystem.getClouds()];
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  onMount(() => {
    animationLoop();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
  });

  // Reset clouds when signal changes
  $effect(() => {
    if (resetSignal) {
      currentClouds = [...cloudSystem.getClouds()];
    }
  });
  
  // Create cloud puff positions for billowing effect
  function getCloudPuffs(cloud) {
    const puffs = [];
    const cloudType = cloud.visualType;
    const baseSize = cloud.size / 2;
    
    // How many puffs based on cloud type
    const puffCount = cloudType === 0 ? 5 : // Puffy
                      cloudType === 1 ? 3 : // Wispy
                      7; // Dense
    
    // For the main center puff
    puffs.push({
      position: [0, 0, 0],
      scale: 1.0,
      opacity: cloud.opacity
    });
    
    // Generate surrounding puffs
    for (let i = 1; i < puffCount; i++) {
      // Random position around the center with some y offset
      const angle = (i / puffCount) * Math.PI * 2;
      const radius = baseSize * 0.5;
      const x = Math.cos(angle) * radius * (0.7 + Math.random() * 0.6);
      const z = Math.sin(angle) * radius * (0.7 + Math.random() * 0.6);
      const y = (Math.random() - 0.5) * baseSize * 0.4;
      
      // Scale varies by puff
      const scale = 0.6 + Math.random() * 0.6;
      
      // Slightly lower opacity for surrounding puffs
      const opacityMod = cloudType === 1 ? 0.7 : 0.9; // More transparent for wispy
      
      puffs.push({
        position: [x, y, z],
        scale,
        opacity: cloud.opacity * opacityMod * scale
      });
    }
    
    return puffs;
  }
</script>

<!-- Clouds -->
{#each currentClouds as cloud (cloud.id)}
  <T.Group position={cloud.position}>
    <!-- Multiple overlapping spheres for billowing effect -->
    {#each getCloudPuffs(cloud) as puff}
      <T.Mesh 
        position={puff.position}
        scale={[puff.scale, puff.scale * 0.6, puff.scale]} 
        frustumCulled={false}
      >
        <T.SphereGeometry args={[cloud.size / 2, 12, 8]} />
        <T.MeshStandardMaterial 
          is={getMaterialForCloud(cloud)}
          opacity={puff.opacity}
        />
      </T.Mesh>
    {/each}
  </T.Group>
{/each}