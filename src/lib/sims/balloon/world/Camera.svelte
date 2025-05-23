<!-- src/lib/sims/balloon/world/Camera.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { SIMULATION_CONSTANTS } from '../constants';
  import * as THREE from 'three';
  
  // Props
  let { 
    initialPosition = [-40, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 20, 40],
    target = [0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0],
    fov = 70,
    near = 0.1,
    far = 1000000, // Increased for larger scale
    followBalloon = false,
    firstPerson = false
  } = $props();
  
  // Camera references
  let camera = $state<THREE.PerspectiveCamera | null>(null);
  let controls = $state<any>(null);
  let thirdPersonPosition = $state(initialPosition);
  
  // Camera modes
  const CAMERA_MODES = {
    FIRST_PERSON: 'first-person',
    THIRD_PERSON: 'third-person'
  };
  
  let currentMode = $state(firstPerson ? CAMERA_MODES.FIRST_PERSON : CAMERA_MODES.THIRD_PERSON);
  
  // First person offsets
  const FIRST_PERSON_OFFSET = [0, 1, 0]; // Slight height above the balloon
  
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
    controls.maxDistance = 100000; // Much larger for the new scale
    
    // Set initial target
    controls.target.set(target[0], target[1], target[2]);
    
    // Apply camera mode settings
    updateCameraMode();
    
    controls.update();
  }
  
  // Update camera mode settings
  function updateCameraMode() {
    if (!controls || !camera) return;
    
    if (currentMode === CAMERA_MODES.FIRST_PERSON) {
      // First person mode constraints
      controls.minDistance = 0.1;
      controls.maxDistance = 0.1;
      controls.enablePan = false;
    } else {
      // Third person mode
      controls.minDistance = 5;
      controls.maxDistance = 100000;
      controls.enablePan = true;
      
      // Restore last third person position
      camera.position.set(
        thirdPersonPosition[0],
        thirdPersonPosition[1],
        thirdPersonPosition[2]
      );
    }
    
    controls.update();
  }
  
  // Toggle camera mode
  export function toggleCameraMode() {
    // Store current position if in third person
    if (currentMode === CAMERA_MODES.THIRD_PERSON && camera) {
      thirdPersonPosition = [
        camera.position.x,
        camera.position.y,
        camera.position.z
      ];
    }
    
    // Toggle mode
    currentMode = currentMode === CAMERA_MODES.FIRST_PERSON 
      ? CAMERA_MODES.THIRD_PERSON 
      : CAMERA_MODES.FIRST_PERSON;
    
    updateCameraMode();
  }
  
  // Update target position (used to follow the balloon)
  export function updateTarget(newTarget: [number, number, number]) {
    if (!controls || !camera) return;
    
    // Always update the target
    controls.target.set(newTarget[0], newTarget[1], newTarget[2]);
    
    // In first person mode, also update the camera position
    if (currentMode === CAMERA_MODES.FIRST_PERSON) {
      camera.position.set(
        newTarget[0] + FIRST_PERSON_OFFSET[0],
        newTarget[1] + FIRST_PERSON_OFFSET[1],
        newTarget[2] + FIRST_PERSON_OFFSET[2]
      );
    }
    
    controls.update();
  }
  
  // Handle key presses for camera mode toggle
  import { onMount } from 'svelte';
  
  onMount(() => {
    function handleKeyDown(e) {
      // Toggle camera mode with 'V' key
      if (e.key === 'v' || e.key === 'V') {
        toggleCameraMode();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  // Apply first-person mode setting from props
  $effect(() => {
    if (firstPerson && currentMode !== CAMERA_MODES.FIRST_PERSON) {
      currentMode = CAMERA_MODES.FIRST_PERSON;
      updateCameraMode();
    } else if (!firstPerson && currentMode !== CAMERA_MODES.THIRD_PERSON) {
      currentMode = CAMERA_MODES.THIRD_PERSON;
      updateCameraMode();
    }
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

<!-- Camera mode indicator -->
<div class="fixed top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
  Camera: {currentMode === CAMERA_MODES.FIRST_PERSON ? 'First Person' : 'Third Person'} (Press 'V' to toggle)
</div>