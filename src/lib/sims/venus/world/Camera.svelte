<!-- src/lib/sims/venus/world/Camera.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  
  // Venus-specific camera defaults
  const VENUS_RADIUS = 6051.8; // km
  const DEFAULT_DISTANCE = VENUS_RADIUS * 3; // Start 3x planet radius away
  
  // Props
  let {
    initialPosition = [-DEFAULT_DISTANCE, DEFAULT_DISTANCE/2, DEFAULT_DISTANCE],
    target = [0, 0, 0],
    fov = 60,
    near = 1,
    far = VENUS_RADIUS * 100, // Very far for planetary scale
  } = $props();
  
  // Camera references
  let camera = $state<THREE.PerspectiveCamera | null>(null);
  let controls = $state<any>(null);
  
  // Set up camera
  function handleCameraCreate(cameraRef: THREE.PerspectiveCamera) {
    if (!cameraRef) return;
    camera = cameraRef;
    
    // Configure for planetary scale
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
  }
  
  // Configure orbit controls
  function handleControlsCreate(controlsRef: any) {
    if (!controlsRef) return;
    controls = controlsRef;
    
    // Configure controls for planetary viewing
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    
    // Set distance limits (can zoom from surface to far orbit)
    controls.minDistance = VENUS_RADIUS * 1.1; // Just above surface
    controls.maxDistance = VENUS_RADIUS * 20; // Far orbital view
    
    // Set initial target (planet center)
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
  }
  
  // Handle keyboard shortcuts
  onMount(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!controls) return;
      
      // Reset camera position with 'C' key
      if (e.key === 'c' || e.key === 'C') {
        controls.reset();
      }
      
      // Quick zoom presets
      if (e.key === '1') {
        // Surface view
        const distance = VENUS_RADIUS * 1.2;
        const pos = controls.object.position.normalize().multiplyScalar(distance);
        controls.object.position.copy(pos);
        controls.update();
      } else if (e.key === '2') {
        // Orbital view  
        const distance = VENUS_RADIUS * 3;
        const pos = controls.object.position.normalize().multiplyScalar(distance);
        controls.object.position.copy(pos);
        controls.update();
      } else if (e.key === '3') {
        // Far view
        const distance = VENUS_RADIUS * 10;
        const pos = controls.object.position.normalize().multiplyScalar(distance);
        controls.object.position.copy(pos);
        controls.update();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<T.PerspectiveCamera 
  position={initialPosition}
  fov={fov}
  near={near}
  far={far}
  makeDefault
  oncreate={handleCameraCreate}
>
  <OrbitControls 
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    oncreate={handleControlsCreate}
  />
</T.PerspectiveCamera>

<!-- Camera controls hint -->
{#if import.meta.env.DEV}
  <div class="fixed top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded z-10">
    Camera: Drag to rotate | Scroll to zoom | C to reset | 1/2/3 for presets
  </div>
{/if}