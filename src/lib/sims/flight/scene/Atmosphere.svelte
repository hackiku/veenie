<!-- src/lib/sims/flight/scene/Atmosphere.svelte -->

<script>
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  import { VENUS_ATMOSPHERIC_LAYERS, getLayerAtAltitude } from '$lib/data/flight/atmosphericLayers';
  import * as THREE from 'three';
  
  // Basic config
  const config = {
    useShaders: true,          // Use shaders for better blending
    showCloudParticles: true,  // Show cloud particles
    cloudCount: 30,            // Number of cloud particles
    fogEnabled: true,          // Enable atmospheric fog
    fogNear: 200,              // Fog near distance
    fogFar: 1500,              // Fog far distance
    blendRadius: 5             // Radius (in km) to blend between layers
  };
  
  // Subscribe to the flight store to get current altitude
  let flightState = $state(null);
  let currentAltitude = $state(50); // Default to cloud layer
  
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
      if (state && state.altitude !== undefined) {
        currentAltitude = state.altitude;
      }
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Layer properties
  // Layer sizes - from surface outward
  const surfaceHazeRadius = $state(800); 
  const lowerHazeRadius = $state(600);
  const cloudLayerRadius = $state(400);
  const upperHazeRadius = $state(300);
  const atmosphereRadius = $state(1200);
  
  // Altitude layers - positions
  const surfaceHazeAltitude = $state(0); // 0-20km
  const lowerHazeAltitude = $state(20); // 20-45km 
  const cloudLayerAltitude = $state(50); // 45-65km (where we want to fly)
  const upperHazeAltitude = $state(70); // 65-90km
  
  // Opacities - reduce to improve visibility
  const surfaceHazeOpacity = $state(0.3);
  const lowerHazeOpacity = $state(0.2);
  const cloudOpacity = $state(0.3);
  const upperHazeOpacity = $state(0.15);
  const atmosphereOpacity = $state(0.1);
  
  // Initialize layer colors
  let atmosphereColor = $state(getLayerAtAltitude(85).color);
  let surfaceHazeColor = $state(getLayerAtAltitude(10).color);
  let lowerHazeColor = $state(getLayerAtAltitude(30).color);
  let cloudColor = $state(getLayerAtAltitude(50).color);
  let upperHazeColor = $state(getLayerAtAltitude(70).color);
  
  // Helper function to blend colors
  function blendColors(color1, color2, ratio) {
    // Convert hex to RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Blend colors
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Update colors based on current altitude
  $effect(() => {
    try {
      const currentLayer = getLayerAtAltitude(currentAltitude);
      
      // Update colors from layer data
      surfaceHazeColor = getLayerAtAltitude(10).color;
      lowerHazeColor = getLayerAtAltitude(30).color;
      cloudColor = getLayerAtAltitude(50).color;
      upperHazeColor = getLayerAtAltitude(70).color;
      atmosphereColor = getLayerAtAltitude(85).color;
    } catch (error) {
      console.error("Error updating atmosphere colors:", error);
    }
  });
  
  // Fragment shader for height-based color blend (if enabled)
  const fragmentShader = `
    varying vec3 vWorldPosition;
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float opacity;
    uniform vec2 heightRange;
    
    void main() {
      // Calculate height factor (0 at min height, 1 at max height)
      float heightFactor = (vWorldPosition.y - heightRange.x) / (heightRange.y - heightRange.x);
      heightFactor = clamp(heightFactor, 0.0, 1.0);
      
      // Blend colors based on height
      vec3 finalColor = mix(bottomColor, topColor, heightFactor);
      
      // Apply opacity
      gl_FragColor = vec4(finalColor, opacity);
    }
  `;
  
  // Vertex shader to pass world position
  const vertexShader = `
    varying vec3 vWorldPosition;
    
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  // Generate cloud particles at fixed positions
  // Pre-generate positions for cloud particles
  const cloudPositions = Array.from({ length: config.cloudCount }, (_, i) => {
    const angle = (i / config.cloudCount) * Math.PI * 2;
    const radius = cloudLayerRadius - 20 + Math.random() * 40;
    const latitude = (Math.random() * 2 - 1) * Math.PI / 3; // Distribute between -60° and +60°
    
    return {
      position: [
        radius * Math.cos(latitude) * Math.cos(angle),
        radius * Math.sin(latitude),
        radius * Math.cos(latitude) * Math.sin(angle)
      ],
      size: 5 + Math.random() * 15,
      opacity: 0.5 + Math.random() * 0.3
    };
  });
  
  // Current layer information
  const currentLayer = $derived(getLayerAtAltitude(currentAltitude));
</script>

<!-- Atmospheric fog - subtle to improve visibility -->
{#if config.fogEnabled}
  <T.Fog color={atmosphereColor} near={config.fogNear} far={config.fogFar} />
{/if}

<!-- Overall atmosphere sphere -->
<T.Mesh position={[0, 0, 0]} renderOrder={-1}>
  <T.SphereGeometry args={[atmosphereRadius, 32, 16]} />
  <T.MeshBasicMaterial 
    color={atmosphereColor} 
    transparent={true} 
    opacity={atmosphereOpacity}
    side={2}
    depthWrite={false}
  />
</T.Mesh>

<!-- Surface haze layer (0-20km) -->
{#if config.useShaders}
  <T.Mesh position={[0, surfaceHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[surfaceHazeRadius, 32, 16]} />
    <T.ShaderMaterial 
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        topColor: { value: new THREE.Color(getLayerAtAltitude(20).color) },
        bottomColor: { value: new THREE.Color(getLayerAtAltitude(0).color) },
        opacity: { value: surfaceHazeOpacity },
        heightRange: { value: [0, 20] }
      }}
      transparent={true}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{:else}
  <T.Mesh position={[0, surfaceHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[surfaceHazeRadius, 32, 16]} />
    <T.MeshBasicMaterial 
      color={surfaceHazeColor} 
      transparent={true} 
      opacity={surfaceHazeOpacity}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{/if}

<!-- Lower haze layer (20-45km) -->
{#if config.useShaders}
  <T.Mesh position={[0, lowerHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[lowerHazeRadius, 32, 16]} />
    <T.ShaderMaterial 
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        topColor: { value: new THREE.Color(getLayerAtAltitude(45).color) },
        bottomColor: { value: new THREE.Color(getLayerAtAltitude(20).color) },
        opacity: { value: lowerHazeOpacity },
        heightRange: { value: [20, 45] }
      }}
      transparent={true}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{:else}
  <T.Mesh position={[0, lowerHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[lowerHazeRadius, 32, 16]} />
    <T.MeshBasicMaterial 
      color={lowerHazeColor} 
      transparent={true} 
      opacity={lowerHazeOpacity}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{/if}

<!-- Main cloud layer (45-65km) - primary flight zone -->
<T.Group position={[0, cloudLayerAltitude, 0]}>
  <!-- Cloud base layer -->
  {#if config.useShaders}
    <T.Mesh renderOrder={-1}>
      <T.SphereGeometry args={[cloudLayerRadius, 32, 16]} />
      <T.ShaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          topColor: { value: new THREE.Color(getLayerAtAltitude(60).color) },
          bottomColor: { value: new THREE.Color(getLayerAtAltitude(45).color) },
          opacity: { value: cloudOpacity },
          heightRange: { value: [45, 60] }
        }}
        transparent={true}
        side={2}
        depthWrite={false}
      />
    </T.Mesh>
  {:else}
    <T.Mesh renderOrder={-1}>
      <T.SphereGeometry args={[cloudLayerRadius, 32, 16]} />
      <T.MeshBasicMaterial 
        color={cloudColor} 
        transparent={true} 
        opacity={cloudOpacity}
        side={2}
        depthWrite={false}
      />
    </T.Mesh>
  {/if}
  
  <!-- Individual cloud formations - reduced quantity for better performance -->
  {#if config.showCloudParticles}
    {#each cloudPositions as cloud, i}
      <T.Mesh 
        position={cloud.position}
        renderOrder={0}
      >
        <T.SphereGeometry args={[cloud.size, 6, 6]} />
        <T.MeshBasicMaterial 
          color={cloudColor} 
          transparent={true} 
          opacity={cloud.opacity}
          depthWrite={false}
        />
      </T.Mesh>
    {/each}
  {/if}
</T.Group>

<!-- Upper haze layer (65-90km) -->
{#if config.useShaders}
  <T.Mesh position={[0, upperHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[upperHazeRadius, 24, 16]} />
    <T.ShaderMaterial 
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        topColor: { value: new THREE.Color(getLayerAtAltitude(90).color) },
        bottomColor: { value: new THREE.Color(getLayerAtAltitude(60).color) },
        opacity: { value: upperHazeOpacity },
        heightRange: { value: [60, 90] }
      }}
      transparent={true}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{:else}
  <T.Mesh position={[0, upperHazeAltitude, 0]} renderOrder={-1}>
    <T.SphereGeometry args={[upperHazeRadius, 24, 16]} />
    <T.MeshBasicMaterial 
      color={upperHazeColor} 
      transparent={true} 
      opacity={upperHazeOpacity}
      side={2}
      depthWrite={false}
    />
  </T.Mesh>
{/if}