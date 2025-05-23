<!-- src/lib/sims/balloon/world/atmosphere/StaticClouds.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { SIMULATION_CONSTANTS } from '../../constants';
  import * as THREE from 'three';
  import { onMount } from 'svelte';

  // Cloud field data with gradient properties
  interface CloudField {
    id: number;
    position: [number, number, number];
    dimensions: [number, number, number]; // width, height, depth
    density: number; // 0-1 for gradient intensity
    baseColor: string;
    gradientType: 'radial' | 'layered' | 'wispy';
  }

  // Generate realistic cloud fields
  function generateCloudFields(): CloudField[] {
    const clouds: CloudField[] = [];
    const terrainSize = SIMULATION_CONSTANTS.TERRAIN_SIZE;
    let id = 0;
    
    // Lower Dense Layer (48-56km) - thick, blocky cloud fields
    for (let i = 0; i < 8; i++) {
      clouds.push({
        id: id++,
        position: [
          (Math.random() - 0.5) * terrainSize * 0.6,
          48000 + Math.random() * 8000,
          (Math.random() - 0.5) * terrainSize * 0.6
        ],
        dimensions: [
          15000 + Math.random() * 20000, // wide
          3000 + Math.random() * 2000,   // thick
          12000 + Math.random() * 18000  // deep
        ],
        density: 0.7 + Math.random() * 0.3,
        baseColor: '#D4B896',
        gradientType: 'layered'
      });
    }
    
    // Middle Layer (56-62km) - medium density, more varied
    for (let i = 0; i < 12; i++) {
      clouds.push({
        id: id++,
        position: [
          (Math.random() - 0.5) * terrainSize * 0.8,
          56000 + Math.random() * 6000,
          (Math.random() - 0.5) * terrainSize * 0.8
        ],
        dimensions: [
          8000 + Math.random() * 15000,
          2000 + Math.random() * 3000,
          8000 + Math.random() * 15000
        ],
        density: 0.5 + Math.random() * 0.4,
        baseColor: '#E8C547',
        gradientType: Math.random() > 0.5 ? 'radial' : 'layered'
      });
    }
    
    // Upper Wispy Layer (62-68km) - thin, stretched fields
    for (let i = 0; i < 15; i++) {
      clouds.push({
        id: id++,
        position: [
          (Math.random() - 0.5) * terrainSize * 0.9,
          62000 + Math.random() * 6000,
          (Math.random() - 0.5) * terrainSize * 0.9
        ],
        dimensions: [
          5000 + Math.random() * 25000, // very wide
          800 + Math.random() * 1200,   // thin
          4000 + Math.random() * 20000  // stretched
        ],
        density: 0.2 + Math.random() * 0.4,
        baseColor: '#F5E6A3',
        gradientType: 'wispy'
      });
    }
    
    return clouds;
  }

  let cloudFields = $state<CloudField[]>(generateCloudFields());
  let gradientTextures = $state<Map<string, THREE.Texture>>(new Map());

  // Create gradient textures for different cloud types
  function createGradientTexture(type: string, baseColor: string, density: number): THREE.Texture {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Parse base color (assuming hex format)
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    if (type === 'radial') {
      // Radial gradient from center
      const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${density})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${density * 0.7})`);
      gradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${density * 0.3})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
    } else if (type === 'layered') {
      // Horizontal layers with noise
      for (let y = 0; y < size; y++) {
        const layerIntensity = Math.sin((y / size) * Math.PI); // Dome shape
        const noise = (Math.random() - 0.5) * 0.3; // Add some variation
        const alpha = (layerIntensity + noise) * density;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fillRect(0, y, size, 1);
      }
      
    } else if (type === 'wispy') {
      // Wispy, streaky pattern
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0)`;
      ctx.fillRect(0, 0, size, size);
      
      for (let i = 0; i < 8; i++) {
        const gradient = ctx.createLinearGradient(
          Math.random() * size, 0,
          Math.random() * size, size
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${density * 0.6})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${density * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Generate all gradient textures
  onMount(() => {
    const textureMap = new Map<string, THREE.Texture>();
    
    cloudFields.forEach(cloud => {
      const key = `${cloud.gradientType}-${cloud.baseColor}-${cloud.density.toFixed(2)}`;
      if (!textureMap.has(key)) {
        textureMap.set(key, createGradientTexture(cloud.gradientType, cloud.baseColor, cloud.density));
      }
    });
    
    gradientTextures = textureMap;
  });

  // Get texture key for a cloud
  function getTextureKey(cloud: CloudField): string {
    return `${cloud.gradientType}-${cloud.baseColor}-${cloud.density.toFixed(2)}`;
  }

  // Props
  let {
    showStats = false,
    showDensityInfo = true,
		totalVolume
  } = $props();

  // Calculate total coverage for stats
	$effect(() => {
		totalVolume = cloudFields.reduce((sum, cloud) => {
    	return sum + (cloud.dimensions[0] * cloud.dimensions[1] * cloud.dimensions[2] * cloud.density);
  }, 0);
	});
  
</script>

<!-- Gradient Cloud Fields -->
{#each cloudFields as cloud (cloud.id)}
  <T.Mesh position={cloud.position} frustumCulled={true}>
    <!-- Use box geometry for realistic field shapes -->
    <T.BoxGeometry args={cloud.dimensions} />
    <!-- Apply gradient texture -->
    <T.MeshBasicMaterial 
      map={gradientTextures.get(getTextureKey(cloud))}
      transparent={true}
      opacity={cloud.density}
      fog={true}
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  </T.Mesh>
  
  <!-- Density visualization for development -->
  {#if showDensityInfo && cloud.density > 0.8}
    <!-- High density indicator -->
    <T.Mesh position={[cloud.position[0], cloud.position[1] + cloud.dimensions[1]/2 + 1000, cloud.position[2]]}>
      <T.SphereGeometry args={[500, 8, 8]} />
      <T.MeshBasicMaterial color="#ff4444" transparent={true} opacity={0.8} />
    </T.Mesh>
  {/if}
{/each}

<!-- Optional atmospheric gradient backdrop -->
<T.Mesh position={[0, 55000, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[200000, 32, 16]} />
  <T.MeshBasicMaterial 
    color="#F5E6A3"
    transparent={true}
    opacity={0.05}
    side={THREE.BackSide}
    fog={false}
  />
</T.Mesh>

<!-- Dev-friendly stats -->
{#if showStats}
  <div class="fixed top-4 right-4 bg-black/80 text-white p-4 rounded text-xs font-mono backdrop-blur-sm">
    <div class="font-bold mb-2 text-yellow-300">☁️ Cloud Field Analysis</div>
    
    <div class="grid grid-cols-2 gap-x-4 gap-y-1">
      <div>Total Fields:</div><div class="text-cyan-300">{cloudFields.length}</div>
      <div>Dense Fields:</div><div class="text-red-300">{cloudFields.filter(c => c.density > 0.7).length}</div>
      <div>Medium Fields:</div><div class="text-yellow-300">{cloudFields.filter(c => c.density > 0.4 && c.density <= 0.7).length}</div>
      <div>Wispy Fields:</div><div class="text-blue-300">{cloudFields.filter(c => c.density <= 0.4).length}</div>
    </div>
    
    <div class="mt-3 pt-3 border-t border-white/20">
      <div class="font-bold text-yellow-300 mb-1">By Layer:</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <div>Lower (48-56km):</div><div class="text-orange-300">{cloudFields.filter(c => c.position[1] < 56000).length}</div>
        <div>Middle (56-62km):</div><div class="text-yellow-300">{cloudFields.filter(c => c.position[1] >= 56000 && c.position[1] < 62000).length}</div>
        <div>Upper (62km+):</div><div class="text-blue-300">{cloudFields.filter(c => c.position[1] >= 62000).length}</div>
      </div>
    </div>
    
    <div class="mt-3 pt-3 border-t border-white/20">
      <div class="font-bold text-yellow-300 mb-1">Gradient Types:</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <div>Radial:</div><div class="text-green-300">{cloudFields.filter(c => c.gradientType === 'radial').length}</div>
        <div>Layered:</div><div class="text-purple-300">{cloudFields.filter(c => c.gradientType === 'layered').length}</div>
        <div>Wispy:</div><div class="text-blue-300">{cloudFields.filter(c => c.gradientType === 'wispy').length}</div>
      </div>
    </div>
    
    <div class="mt-3 pt-3 border-t border-white/20 text-xs">
      <div>Total Volume: {(totalVolume / 1e12).toFixed(1)} km³</div>
      <div class="text-white/60 mt-1">Red dots = High density zones</div>
    </div>
  </div>
{/if}