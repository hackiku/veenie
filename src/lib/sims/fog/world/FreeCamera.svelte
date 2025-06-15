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
    onCameraCreate = (camera: THREE.PerspectiveCamera) => {}
  } = $props();
  
  // Camera and controls state
  let camera: THREE.PerspectiveCamera | null = $state(null);
  let velocity = $state(new THREE.Vector3());
  let euler = $state(new THREE.Euler(0, 0, 0, 'YXZ'));
  
  // Input state
  let keys = $state({
    w: false, a: false, s: false, d: false,
    space: false, shift: false, ctrl: false
  });
  
  let isPointerLocked = $state(false);
  
  // Handle camera creation
  function handleCameraCreate(cameraRef: THREE.PerspectiveCamera) {
    camera = cameraRef;
    camera.position.set(position[0], position[1], position[2]);
    camera.rotation.reorder('YXZ');
    onCameraCreate(camera);
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
    if (!isPointerLocked || !camera) return;
    
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;
    
    euler.y -= movementX * mouseSensitivity;
    euler.x -= movementY * mouseSensitivity;
    
    // Clamp vertical rotation
    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
    
    camera.rotation.setFromEuler(euler);
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
    let currentSpeed = speed;
    if (keys.shift) currentSpeed *= 3; // Fast mode
    if (keys.ctrl) currentSpeed *= 0.3; // Slow mode
    
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
    movement.normalize().multiplyScalar(currentSpeed * delta);
    camera.position.add(movement);
    
    // Keep above ground (with some margin)
    camera.position.y = Math.max(100, camera.position.y);
  });
  
  // Set up event listeners
  onMount(() => {
    if (typeof document === 'undefined') return;
    
    // Add event listeners
    document.addEventListener('click', requestPointerLock);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('click', requestPointerLock);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
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