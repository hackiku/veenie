<!-- src/lib/sims/fog/Scene.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import FreeCamera from './world/FreeCamera.svelte';
  import SimpleTerrain from './world/terrain/SimpleTerrain.svelte';
  import AtmosphereFog from './world/atmosphere/AtmosphereFog.svelte';
  import { getAtmosphericConditions } from './physics/atmosphere';
  import { VENUS_CONSTANTS } from './constants';
  
  // Props
  let {
    cameraPosition = $bindable({ x: 0, y: 55000, z: 0 }),
    telemetry = $bindable({
      altitude: 55000,
      temperature: 27,
      airDensity: 0.9,
      atmosphericLayer: 'Cloud Layer'
    }),
    onCameraMove = (pos: {x: number, y: number, z: number}) => {}
  } = $props();
  
  // Camera reference
  let camera: any = $state();
  
  // Update atmospheric conditions based on camera altitude
  function updateAtmosphericConditions(altitude: number) {
    const conditions = getAtmosphericConditions(altitude);
    
    telemetry.altitude = altitude;
    telemetry.temperature = conditions.temperature - 273.15; // Convert K to C
    telemetry.airDensity = conditions.density;
    telemetry.atmosphericLayer = conditions.layer;
  }
  
  // Animation loop using modern useTask
  useTask((delta) => {
    if (!camera?.position) return;
    
    const newPosition = {
      x: camera.position.x,
      y: Math.max(0, camera.position.y), // Don't go below ground
      z: camera.position.z
    };
    
    // Only update if position changed significantly
    const posChanged = Math.abs(newPosition.y - cameraPosition.y) > 10 ||
                      Math.abs(newPosition.x - cameraPosition.x) > 100 ||
                      Math.abs(newPosition.z - cameraPosition.z) > 100;
    
    if (posChanged) {
      cameraPosition = newPosition;
      updateAtmosphericConditions(newPosition.y);
      onCameraMove(newPosition);
    }
  });
  
  // Handle camera creation
  function handleCameraCreate(cameraRef: any) {
    camera = cameraRef;
    // Set initial position
    if (camera) {
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }
  }
</script>

<!-- Lighting suitable for Venus -->
<T.AmbientLight intensity={0.4} color="#FFE4B5" />
<T.DirectionalLight 
  position={[100000, 120000, 80000]}
  intensity={0.6}
  color="#FFF4E6"
  castShadow={true}
/>

<!-- Free-flying camera -->
<FreeCamera 
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  speed={500}
  onCameraCreate={handleCameraCreate}
/>

<!-- Terrain -->
<SimpleTerrain />

<!-- Atmospheric effects that respond to camera altitude -->
<AtmosphereFog 
  cameraAltitude={cameraPosition.y}
  atmosphericConditions={telemetry}
/>

<!-- Dev helpers -->
{#if import.meta.env.DEV}
  <!-- Origin marker -->
  <T.Mesh position={[0, 1000, 0]}>
    <T.SphereGeometry args={[2000, 16, 16]} />
    <T.MeshStandardMaterial color="#ffff00" opacity={0.7} transparent={true} />
  </T.Mesh>
  
  <!-- Altitude reference markers every 10km -->
  {#each [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000] as altitude}
    <T.Mesh position={[50000, altitude, 0]}>
      <T.CylinderGeometry args={[500, 500, 1000, 8]} />
      <T.MeshStandardMaterial 
        color={altitude === 55000 ? "#ff4444" : "#4444ff"} 
        opacity={0.6} 
        transparent={true} 
      />
    </T.Mesh>
  {/each}
{/if}