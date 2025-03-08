<!-- src/lib/sims/venus/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import VenusBall from './bodies/VenusBall.svelte';
  import Atmosphere from './atmosphere/Atmosphere.svelte';

  // Props using runes
  let { 
    simulationSpeed = 1,
    showAtmosphere = true,
  } = $props<{
    simulationSpeed?: number;
    showAtmosphere?: boolean;
  }>();

  // State
  let loading = $state(true);
  let error = $state<string | null>(null);
  let venusRotation = $state(0);
  
  // Venus data
  const venusData = {
    radius: 6051.8, // km
    rotationPeriod: -243.025, // days (retrograde)
    axialTilt: 177.3, // degrees
  };
  
  // Scale for visualization (km to units)
  const scale = 0.001;
  
  // Methods
  function setSimulationSpeed(speed: number) {
    simulationSpeed = speed;
  }
  
  // Initialize component
  $effect(() => {
    console.log('Venus Scene component initialized');
    loading = false;
    
    return () => {
      console.log('Venus Scene component destroyed');
    };
  });
  
  // Expose methods to parent
  $effect(() => {
    return {
      setSimulationSpeed
    };
  });

  // Animation with frameloop
  let lastTime = performance.now();
  
  function tick() {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000; // Convert to seconds
    
    // Update Venus rotation
    const rotationSpeed = (Math.PI * 2) / (venusData.rotationPeriod * 24 * 60 * 60) * simulationSpeed * delta;
    venusRotation += rotationSpeed;
    
    lastTime = currentTime;
    requestAnimationFrame(tick);
  }
  
  $effect(() => {
    lastTime = performance.now();
    const animationId = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  });
</script>

<div class="w-full h-full">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full bg-black text-white">
      <div class="text-center">
        <p class="text-xl mb-2">Loading Venus Simulation</p>
        <div class="w-12 h-12 border-4 border-t-amber-500 border-b-amber-700 border-l-amber-600 border-r-amber-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  {/if}
  
  {#if error}
    <div class="flex items-center justify-center w-full h-full bg-black text-red-500">
      <div class="text-center">
        <p class="text-xl mb-2">Error</p>
        <p>{error}</p>
      </div>
    </div>
  {/if}
  
  <!-- Camera -->
  <T.PerspectiveCamera
    position={[0, 0, 20]}
    fov={45}
    makeDefault
  >
    <OrbitControls 
      enableDamping 
      dampingFactor={0.1}
      minDistance={7}
      maxDistance={200}
    />
  </T.PerspectiveCamera>
  
  <!-- Lights -->
  <T.AmbientLight intensity={0.3} />
  <T.DirectionalLight 
    intensity={1.5} 
    position={[20, 10, 10]} 
    castShadow 
  />
  <T.HemisphereLight 
    args={[0xffffbb, 0x080820, 0.5]}
  />
  
  <!-- Venus -->
  <T.Group rotation.y={venusRotation}>
    <!-- Venus Surface (as a component) -->
    <VenusBall 
      radius={venusData.radius} 
      {scale} 
    />
    
    <!-- Venus Atmosphere (as a component) -->
    <Atmosphere 
      planetRadius={venusData.radius}
      {scale}
      visible={showAtmosphere}
    />
  </T.Group>
</div>