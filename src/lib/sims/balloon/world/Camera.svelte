<!-- src/lib/sims/balloon/world/Camera.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Props
  let { 
    initialPosition = [-40, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 20, 40],
    target = [0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0],
    fov = 70,
    near = 0.1,
    far = 10000
  } = $props();
  
  // Camera references
  let camera = $state(null);
  let controls = $state(null);
  
  // Set up camera
  function handleCameraCreate(cameraRef) {
    if (!cameraRef) return;
    camera = cameraRef;
    
    // Adjust camera properties for the scale of Venus
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
  }
  
  // Configure orbit controls
  function handleControlsCreate(controlsRef) {
    if (!controlsRef) return;
    controls = controlsRef;
    
    // Configure controls
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 5;
    controls.maxDistance = 1000;
    
    // Set initial target
    controls.target.set(target[0], target[1], target[2]);
    
    controls.update();
  }
  
  // Update target position (used to follow the balloon)
  export function updateTarget(newTarget: [number, number, number]) {
    if (controls) {
      controls.target.set(newTarget[0], newTarget[1], newTarget[2]);
      controls.update();
    }
  }
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