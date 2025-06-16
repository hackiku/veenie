<!-- src/lib/sims/fog/world/FreeCamera.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import * as THREE from 'three';
  import { onMount } from 'svelte';
  
  // Props
  let {
    position = [0, 55000, 0],
    speed = 500, // m/s base speed
    mouseSensitivity = 0.002,
    panSensitivity = 2.0,
    zoomSensitivity = 0.1,
    onCameraCreate = (camera: THREE.PerspectiveCamera) => {},
    onSpeedChange = (speed: number) => {}
  } = $props();
  
  // Camera and controls state
  let camera: THREE.PerspectiveCamera | null = $state(null);
  let velocity = $state(new THREE.Vector3());
  let euler = $state(new THREE.Euler(0, 0, 0, 'YXZ'));
  let currentSpeed = $state(speed);
  
  // Input state
  let keys = $state({
    w: false, a: false, s: false, d: false,
    space: false, shift: false, ctrl: false
  });
  
  let mouse = $state({
    leftDown: false,
    rightDown: false,
    middleDown: false
  });
  
  let isPointerLocked = $state(false);
  
  // Handle camera creation
  function handleCameraCreate(cameraRef: THREE.PerspectiveCamera) {
    camera = cameraRef;
    camera.position.set(position[0], position[1], position[2]);
    camera.rotation.reorder('YXZ');
    onCameraCreate(camera);
    
    // Initialize speed
    currentSpeed = speed;
    onSpeedChange(currentSpeed);
  }
  
  // Pointer lock controls
  function requestPointerLock() {
    if (typeof document !== 'undefined') {
      document.body.requestPointerLock();
    }
  }
  
  function handlePointerLockChange() {
    isPointerLocked = document.pointerLockElement === document.body;
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!camera) return;
    
    if (isPointerLocked) {
      // FPS-style mouse look when pointer is locked
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      
      euler.y -= movementX * mouseSensitivity;
      euler.x -= movementY * mouseSensitivity;
      
      // Clamp vertical rotation
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
      
      camera.rotation.setFromEuler(euler);
    } else if (mouse.rightDown) {
      // Pan when right mouse is down (screen space movement)
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      
      // Get camera's right and up vectors for screen-space panning
      const right = new THREE.Vector3();
      const up = new THREE.Vector3();
      
      camera.getWorldDirection(new THREE.Vector3()); // Update camera matrix
      right.setFromMatrixColumn(camera.matrix, 0); // Get right vector
      up.setFromMatrixColumn(camera.matrix, 1);     // Get up vector
      
      // Pan distance based on altitude (higher = faster pan)
      const panDistance = Math.max(100, camera.position.y * 0.01) * panSensitivity;
      
      // Apply pan movement
      const panMovement = new THREE.Vector3();
      panMovement.addScaledVector(right, -movementX * panDistance);
      panMovement.addScaledVector(up, movementY * panDistance);
      
      camera.position.add(panMovement);
    }
  }
  
  // Handle mouse button events
  function handleMouseDown(event: MouseEvent) {
    switch (event.button) {
      case 0: // Left
        if (!isPointerLocked) requestPointerLock();
        mouse.leftDown = true;
        break;
      case 1: // Middle
        mouse.middleDown = true;
        event.preventDefault();
        break;
      case 2: // Right
        mouse.rightDown = true;
        event.preventDefault();
        break;
    }
  }
  
  function handleMouseUp(event: MouseEvent) {
    switch (event.button) {
      case 0: mouse.leftDown = false; break;
      case 1: mouse.middleDown = false; break;
      case 2: mouse.rightDown = false; break;
    }
  }
  
  // Handle scroll wheel for zoom (speed adjustment)
  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    
    // Adjust movement speed based on scroll direction
    const zoomFactor = Math.sign(event.deltaY) * zoomSensitivity;
    currentSpeed = Math.max(10, Math.min(5000, currentSpeed * (1 + zoomFactor)));
    
    // Notify parent of speed change
    onSpeedChange(currentSpeed);
  }
  
  // Keyboard controls
  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    switch (key) {
      case 'w': keys.w = true; break;
      case 'a': keys.a = true; break;
      case 's': keys.s = true; break;
      case 'd': keys.d = true; break;
      case ' ': keys.space = true; event.preventDefault(); break;
    }
    
    keys.shift = event.shiftKey;
    keys.ctrl = event.ctrlKey;
  }
  
  function handleKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    switch (key) {
      case 'w': keys.w = false; break;
      case 'a': keys.a = false; break;
      case 's': keys.s = false; break;
      case 'd': keys.d = false; break;
      case ' ': keys.space = false; break;
    }
    
    keys.shift = event.shiftKey;
    keys.ctrl = event.ctrlKey;
  }
  
  // Movement update using useTask
  useTask((delta) => {
    if (!camera) return;
    
    // Calculate speed multipliers
    let effectiveSpeed = currentSpeed;
    if (keys.shift) effectiveSpeed *= 3; // Fast mode
    if (keys.ctrl) effectiveSpeed *= 0.3; // Slow mode
    
    // Get camera direction vectors
    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    
    camera.getWorldDirection(direction);
    right.crossVectors(direction, up).normalize();
    
    // Apply movement inputs
    const movement = new THREE.Vector3();
    
    if (keys.w) movement.add(direction);
    if (keys.s) movement.sub(direction);
    if (keys.d) movement.add(right);
    if (keys.a) movement.sub(right);
    if (keys.space) movement.add(up);
    
    // Apply movement with speed and delta time
    movement.normalize().multiplyScalar(effectiveSpeed * delta);
    camera.position.add(movement);
    
    // Keep above ground (with some margin)
    camera.position.y = Math.max(100, camera.position.y);
  });
  
  // Set up event listeners
  onMount(() => {
    if (typeof document === 'undefined') return;
    
    // Disable context menu for right-click panning
    function handleContextMenu(e: Event) {
      e.preventDefault();
    }
    
    // Add event listeners
    document.addEventListener('click', requestPointerLock);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('click', requestPointerLock);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });
</script>

<T.PerspectiveCamera
  position={position}
  fov={75}
  near={0.1}
  far={500000}
  makeDefault
  oncreate={handleCameraCreate}
/>