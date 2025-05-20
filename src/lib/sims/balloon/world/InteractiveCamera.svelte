<!-- src/lib/sims/balloon/world/InteractiveCamera.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { useTask, useThrelte } from '@threlte/core';
  import { SIMULATION_CONSTANTS } from '../constants';
  import * as THREE from 'three';
  import CameraControls from 'camera-controls';
  
  // Initialize CameraControls
  CameraControls.install({ THREE });
  
  // Props
  let { 
    initialPosition = [-40, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 20, 40],
    target = [0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0],
    followBalloon = true
  } = $props();
  
  // Get threejs renderer and scene
  const { renderer, scene } = useThrelte();
  
  // Create camera and controls
  let camera = $state<THREE.PerspectiveCamera | null>(null);
  let controls = $state<CameraControls | null>(null);
  
  // Camera modes
  const CAMERA_MODES = {
    FIRST_PERSON: 'first-person',
    THIRD_PERSON: 'third-person',
    ORBIT: 'orbit',
    TOP_DOWN: 'top-down'
  };
  
  let currentMode = $state(CAMERA_MODES.THIRD_PERSON);
  let clock = new THREE.Clock();
  
  // Initialize controls
  function initControls() {
    if (!camera || !renderer) return;
    
    controls = new CameraControls(camera, renderer.domElement);
    
    // Configure controls
    controls.smoothTime = 0.25;
    controls.draggingSmoothTime = 0.125;
    controls.minDistance = 5;
    controls.maxDistance = 100000; // For Venus scale
    
    // Set initial position
    controls.setLookAt(
      initialPosition[0], initialPosition[1], initialPosition[2],
      target[0], target[1], target[2],
      false // Immediate without transition
    );
  }
  
  // Update controls
  useTask((delta) => {
    if (controls) {
      controls.update(delta);
    }
  });
  
  // Update balloon position for following
  export function updateBalloonPosition(position) {
    if (!controls) return;
    
    if (currentMode === CAMERA_MODES.FIRST_PERSON) {
      // First person: position camera at balloon with offset
      controls.setLookAt(
        position.x, position.y + 1, position.z, // Camera slightly above balloon
        position.x, position.y, position.z + 10, // Looking forward
        true // Smooth transition
      );
    } else if (currentMode === CAMERA_MODES.THIRD_PERSON && followBalloon) {
      // Third person: update target while maintaining relative camera position
      controls.setTarget(position.x, position.y, position.z, true);
    }
  }
  
  // Change camera mode
  export function setMode(mode) {
    currentMode = mode;
    
    if (!controls) return;
    
    switch (mode) {
      case CAMERA_MODES.FIRST_PERSON:
        controls.minDistance = 0.1;
        controls.maxDistance = 0.1;
        break;
      case CAMERA_MODES.ORBIT:
        controls.minDistance = 5;
        controls.maxDistance = 100000;
        break;
      case CAMERA_MODES.TOP_DOWN:
        // Move to top-down view
        const currentTarget = new THREE.Vector3();
        controls.getTarget(currentTarget);
        controls.setLookAt(
          currentTarget.x, currentTarget.y + 3000, currentTarget.z,
          currentTarget.x, currentTarget.y, currentTarget.z,
          true
        );
        break;
    }
  }
  
  // Create camera
  function handleCameraCreate(cameraRef) {
    camera = cameraRef;
    initControls();
  }
  
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (controls) controls.dispose();
  });
</script>

<T.PerspectiveCamera 
  position={initialPosition}
  fov={70}
  near={0.1}
  far={1000000}
  makeDefault
  oncreate={handleCameraCreate}
/>

<!-- Camera mode indicator -->
<div class="fixed top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
  Camera: {currentMode} (Press 'V' to toggle)
</div>