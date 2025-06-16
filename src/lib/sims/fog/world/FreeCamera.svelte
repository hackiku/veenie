<!-- src/lib/sims/fog/world/FreeCamera.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import * as THREE from 'three';
  
  // Props
  let {
    position = [0, 55000, 0],
    target = [0, 0, 0],
    onCameraCreate = (camera: THREE.PerspectiveCamera) => {},
    onCameraUpdate = (position: {x: number, y: number, z: number}) => {}
  } = $props();
  
  // Camera and controls references
  let camera: THREE.PerspectiveCamera | undefined = $state();
  let controls: any = $state();
  
  // Track camera position for atmospheric effects
  let lastPosition = { x: 0, y: 55000, z: 0 };
  
  // Handle camera creation
  function handleCameraCreate(cameraRef: THREE.PerspectiveCamera) {
    camera = cameraRef;
    onCameraCreate(camera);
  }
  
  // Handle controls creation and setup
  function handleControlsCreate(controlsRef: any) {
    controls = controlsRef;
    
    // Configure controls for Venus exploration
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    
    // Set distance limits
    controls.minDistance = 100;        // Don't get too close to ground
    controls.maxDistance = 300000;     // 300km max distance
    
    // Set rotation limits
    controls.minPolarAngle = 0;        // Can look straight up
    controls.maxPolarAngle = Math.PI;  // Can look straight down
    
    // Enable all controls
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    
    // Set target to ground center
    controls.target.set(target[0], target[1], target[2]);
    controls.update();
  }
  
  // Monitor camera position changes
  useTask(() => {
    if (!camera) return;
    
    const currentPos = {
      x: camera.position.x,
      y: Math.max(100, camera.position.y), // Don't go below 100m
      z: camera.position.z
    };
    
    // Only notify if position changed significantly
    const posChanged = 
      Math.abs(currentPos.x - lastPosition.x) > 100 ||
      Math.abs(currentPos.y - lastPosition.y) > 50 ||
      Math.abs(currentPos.z - lastPosition.z) > 100;
    
    if (posChanged) {
      lastPosition = currentPos;
      onCameraUpdate(currentPos);
    }
  });
</script>

<!-- Standard Three.js camera with orbit controls -->
<T.PerspectiveCamera
  position={position}
  fov={75}
  near={1}
  far={500000}
  makeDefault
  oncreate={handleCameraCreate}
>
  <OrbitControls
    oncreate={handleControlsCreate}
    target={target}
  />
</T.PerspectiveCamera>