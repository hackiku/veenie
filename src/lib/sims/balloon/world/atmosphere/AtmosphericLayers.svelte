<!-- src/lib/sims/balloon/world/atmosphere/AtmosphericLayers.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import * as THREE from 'three';
  import { onMount } from 'svelte';

  // Props
  let {
    layers = [],
    showDevGrids = false
  } = $props();

  // Create gradient materials for each layer
  let layerMaterials = $state<Map<string, THREE.Material>>(new Map());

  // Create atmospheric scattering materials
  function createLayerMaterial(layer: any): THREE.Material {
    // Create a subtle gradient texture for atmospheric scattering
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Parse the hex color
    const hex = layer.color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Create radial gradient for atmospheric scattering effect
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${layer.density})`);
    gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${layer.density * 0.6})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: layer.scattering,
      side: THREE.DoubleSide,
      fog: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }

  // Generate materials on mount
  onMount(() => {
    const materials = new Map();
    layers.forEach(layer => {
      materials.set(layer.name, createLayerMaterial(layer));
    });
    layerMaterials = materials;
  });

  // Calculate layer dimensions and position
  function getLayerGeometry(layer: any) {
    const thickness = layer.altitudeRange[1] - layer.altitudeRange[0];
    const centerAltitude = layer.altitudeRange[0] + thickness / 2;
    const radius = 200000 + centerAltitude * 0.5; // Expand outward with altitude
    
    return {
      position: [0, centerAltitude, 0],
      radius: radius,
      thickness: thickness
    };
  }
</script>

<!-- Atmospheric Layer Shells -->
{#each layers as layer, i (layer.name)}
  {@const geometry = getLayerGeometry(layer)}
  
  <!-- Main atmospheric shell -->
  <T.Mesh 
    position={geometry.position}
    renderOrder={-20 + i}
    frustumCulled={false}
  >
    <T.SphereGeometry 
      args={[geometry.radius, 32, 16]} 
    />
    <T.MeshBasicMaterial 
      is={layerMaterials.get(layer.name)}
    />
  </T.Mesh>
  
  <!-- Inner atmospheric boundary for depth -->
  <T.Mesh 
    position={geometry.position}
    renderOrder={-21 + i}
    frustumCulled={false}
  >
    <T.SphereGeometry 
      args={[geometry.radius * 0.95, 32, 16]} 
    />
    <T.MeshBasicMaterial 
      color={layer.color}
      transparent={true}
      opacity={layer.density * 0.3}
      side={THREE.BackSide}
      fog={true}
      depthWrite={false}
    />
  </T.Mesh>
{/each}

<!-- Atmospheric Particle Effects (subtle) -->
{#each layers.slice(0, 4) as layer, i}
  {@const geometry = getLayerGeometry(layer)}
  
  <!-- Particle-like scattering points -->
  <T.Points 
    position={geometry.position}
    renderOrder={-10 + i}
  >
    <T.SphereGeometry args={[geometry.radius * 0.8, 8, 8]} />
    <T.PointsMaterial 
      color={layer.color}
      size={500}
      transparent={true}
      opacity={layer.density * 0.1}
      fog={true}
      vertexColors={false}
    />
  </T.Points>
{/each}