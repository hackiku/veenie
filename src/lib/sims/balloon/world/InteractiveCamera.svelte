<!-- src/lib/sims/balloon/world/InteractiveCamera.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { SIMULATION_CONSTANTS } from '../constants';
  import * as THREE from 'three';
  
  // Camera modes
  export const CAMERA_MODES = {
    THIRD_PERSON: 'third-person',
    FIRST_PERSON: 'first-person', 
    ORBIT: 'orbit',
    TOP_DOWN: 'top-down'
  };
  
  // Props
  let { 
    initialPosition = [-40, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 20, 40],
    target = [0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0],
    fov = 70,
    near = 0.1,
    far = 1000000,
    mode = CAMERA_MODES.THIRD_PERSON
  } = $props();
  
  // Camera and controls references
  let camera = $state<THREE.PerspectiveCamera | null>(null);
  let controls = $state<any>(null);
  
  // Camera state
  let currentMode = $state(mode);
  let cameraHeading = $state(0);
  
  // Stored positions for different modes
  let thirdPersonPosition = $state(initialPosition);
  let orbitPosition = $state([-20, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 15, 20]);
  
  // Camera configuration for each mode
  const modeConfigs = {
    [CAMERA_MODES.FIRST_PERSON]: {
      minDistance: 0.1,
      maxDistance: 0.1,
      enablePan: false,
      enableZoom: false,
      enableRotate: true,
      dampingFactor: 0.05
    },
    [CAMERA_MODES.THIRD_PERSON]: {
      minDistance: 5,
      maxDistance: 50000,
      enablePan: true,
      enableZoom: true,
      enableRotate: true,
      dampingFactor: 0.25
    },
    [CAMERA_MODES.ORBIT]: {
      minDistance: 10,
      maxDistance: 100000,
      enablePan: false,
      enableZoom: true,
      enableRotate: true,
      dampingFactor: 0.15
    },
    [CAMERA_MODES.TOP_DOWN]: {
      minDistance: 20,
      maxDistance: 200000,
      enablePan: true,
      enableZoom: true,
      enableRotate: false,
      dampingFactor: 0.3
    }
  };
  
  // Set up camera
  function handleCameraCreate(cameraRef: THREE.PerspectiveCamera) {
    if (!cameraRef) return;
    camera = cameraRef;
    
    // Configure camera properties
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
  }
  
  // Configure orbit controls
  function handleControlsCreate(controlsRef: any) {
    if (!controlsRef) return;
    controls = controlsRef;
    
    // Base configuration
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.2;
    
    // Set initial target
    controls.target.set(target[0], target[1], target[2]);
    
    // Apply initial mode
    updateCameraMode();
    controls.update();
  }
  
  // Update camera configuration based on mode
  function updateCameraMode() {
    if (!controls || !camera) return;
    
    const config = modeConfigs[currentMode];
    if (!config) return;
    
    // Apply configuration
    controls.minDistance = config.minDistance;
    controls.maxDistance = config.maxDistance;
    controls.enablePan = config.enablePan;
    controls.enableZoom = config.enableZoom;
    controls.enableRotate = config.enableRotate;
    controls.dampingFactor = config.dampingFactor;
    
    // Special positioning for different modes
    switch (currentMode) {
      case CAMERA_MODES.FIRST_PERSON:
        // Position camera at balloon location
        camera.position.set(target[0], target[1] + 1, target[2]);
        break;
        
      case CAMERA_MODES.THIRD_PERSON:
        // Restore or set third person position
        camera.position.set(
          thirdPersonPosition[0],
          thirdPersonPosition[1],
          thirdPersonPosition[2]
        );
        break;
        
      case CAMERA_MODES.ORBIT:
        // Set orbit position
        camera.position.set(
          orbitPosition[0],
          orbitPosition[1],
          orbitPosition[2]
        );
        break;
        
      case CAMERA_MODES.TOP_DOWN:
        // Position directly above target
        camera.position.set(target[0], target[1] + 50000, target[2]);
        controls.target.set(target[0], target[1], target[2]);
        break;
    }
    
    controls.update();
  }
  
  // External API for mode switching
  export function setMode(newMode: string) {
    // Store current position if switching from third person or orbit
    if (camera) {
      if (currentMode === CAMERA_MODES.THIRD_PERSON) {
        thirdPersonPosition = [camera.position.x, camera.position.y, camera.position.z];
      } else if (currentMode === CAMERA_MODES.ORBIT) {
        orbitPosition = [camera.position.x, camera.position.y, camera.position.z];
      }
    }
    
    currentMode = newMode;
    updateCameraMode();
  }
  
  // Update target position (for following balloon)
  export function updateTarget(newTarget: [number, number, number]) {
    if (!controls) return;
    
    target = newTarget;
    controls.target.set(newTarget[0], newTarget[1], newTarget[2]);
    
    // In first person mode, also update camera position
    if (currentMode === CAMERA_MODES.FIRST_PERSON && camera) {
      camera.position.set(
        newTarget[0],
        newTarget[1] + 1,
        newTarget[2]
      );
    }
    
    controls.update();
  }
  
  // Calculate camera heading for compass
  useTask(() => {
    if (camera) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      cameraHeading = Math.atan2(direction.x, direction.z);
    }
  });
  
  // Keyboard controls
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key.toLowerCase()) {
        case 'v':
          // Cycle through camera modes
          const modes = Object.values(CAMERA_MODES);
          const currentIndex = modes.indexOf(currentMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          setMode(modes[nextIndex]);
          break;
          
        case 'c':
          // Quick switch to orbit mode
          setMode(CAMERA_MODES.ORBIT);
          break;
          
        case 'f':
          // Quick switch to first person
          setMode(CAMERA_MODES.FIRST_PERSON);
          break;
          
        case 't':
          // Quick switch to top down
          setMode(CAMERA_MODES.TOP_DOWN);
          break;
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  // React to prop changes
  $effect(() => {
    if (mode !== currentMode) {
      setMode(mode);
    }
  });
</script>

<T.PerspectiveCamera 
  position={initialPosition}
  {fov}
  {near}
  {far}
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
<div class="fixed top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
  <div class="flex items-center gap-2">
    <span class="text-yellow-300">📹</span>
    <span>{currentMode.replace('-', ' ').toUpperCase()}</span>
  </div>
  <div class="text-white/60 text-[10px] mt-1">
    V: cycle | C: orbit | F: first person | T: top-down
  </div>
</div>