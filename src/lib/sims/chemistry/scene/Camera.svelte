<!-- src/lib/sims/chemistry/scene/Camera.svelte -->

<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { chemistryStore } from '$lib/stores/chemistryStore';
  
  // Props
  let { currentAltitude = 50 } = $props();
  
  // Camera properties using runes
  let cameraPosition = $state([0, 50, 200]); // Default position at cloud layer
  let lookAtPosition = $state([0, 50, 0]);   // Default look at point
  
  // Tweened value for smooth camera movement
  const cameraAltitude = tweened(currentAltitude, {
    duration: 1000,
    easing: cubicOut
  });
  
  // Update camera position on altitude change
  $effect(() => {
    cameraAltitude.set(currentAltitude);
  });
  
  // Update camera position based on tweened altitude
  $effect(() => {
    // Get the current value of the tweened altitude
    const altitude = $cameraAltitude;
    
    // Update camera position
    cameraPosition = [
      0, 
      altitude + 5, // Slightly above the current altitude
      150 // Fixed distance from the center
    ];
    
    // Update look at position
    lookAtPosition = [0, altitude, 0];
    
    // Update chemistry store with new altitude 
    chemistryStore.updateAltitude(altitude);
  });
  
  const props = $state({
    position: cameraPosition,
    fov: 60,
    near: 0.1,
    far: 5000,
    lookAt: lookAtPosition,
    moveSpeed: 0.5
  });
  
  // Camera reference
  let cameraRef = $state(null);
  
  // Update camera target when lookAt changes
  $effect(() => {
    if (cameraRef && props.lookAt) {
      cameraRef.lookAt(...props.lookAt);
    }
  });
  
  // Handle keyboard controls for vertical movement
  function handleKeyDown(event) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      // Move up
      const newAltitude = Math.min(currentAltitude + props.moveSpeed, 100);
      chemistryStore.updateAltitude(newAltitude);
    } else if (event.key === 'ArrowDown' || event.key === 's') {
      // Move down
      const newAltitude = Math.max(currentAltitude - props.moveSpeed, 0);
      chemistryStore.updateAltitude(newAltitude);
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<!-- Main camera -->
<T.PerspectiveCamera
  position={props.position}
  fov={props.fov}
  near={props.near}
  far={props.far}
  makeDefault
  bind:ref={cameraRef}
>
  <!-- OrbitControls must be a child of the camera -->
  <OrbitControls 
    enableDamping={true}
    dampingFactor={0.05}
    enableZoom={true}
    enablePan={true}
    minDistance={10}  
    maxDistance={500} 
    target={props.lookAt}
    autoRotate={false}
    enableRotate={true}
    maxPolarAngle={Math.PI * 0.65}
  />
</T.PerspectiveCamera>

<!-- Simple HUD with controls info -->
<div class="fixed bottom-24 left-4 bg-black/40 text-white p-2 rounded text-sm z-20">
  <p class="text-xs mb-1 font-semibold">Camera Controls:</p>
  <p class="text-xs">↑/W: Move up in atmosphere</p>
  <p class="text-xs">↓/S: Move down in atmosphere</p>
  <p class="text-xs">Mouse Drag: Rotate view</p>
  <p class="text-xs">Mouse Wheel: Zoom</p>
</div>