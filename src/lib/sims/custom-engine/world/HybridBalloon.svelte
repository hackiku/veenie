<!-- src/lib/sims/balloon/world/HybridBalloon.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Props
  let { resetSignal = 0 } = $props();
  
  // Minimal non-reactive state
  let balloonSize = SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE;
  let position = {
    x: 0,
    y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    z: 0
  };
  let physicsEnabled = false;
  let rigidBodyRef = null;
  
  // Non-reactive key state
  const keyState = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    shift: false
  };
  
  // Debug info - DOM only, not reactive
  let debugElement = null;
  
  // Set up keyboard listeners without reactivity
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key in keyState) {
        keyState[key] = true;
      } else if (key === ' ') {
        keyState.space = true;
      } else if (key === 'p') {
        togglePhysics();
      } else if (key === 'i') {
        applyTestImpulse();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (key in keyState) {
        keyState[key] = false;
      } else if (key === ' ') {
        keyState.space = false;
      }
    });
  }
  
  // Non-reactive animation loop
  let animationId = null;
  
  function startAnimation() {
    if (animationId) return;
    
    function animate() {
      updateBalloon();
      animationId = requestAnimationFrame(animate);
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  
  // Update balloon position/physics without reactivity
  function updateBalloon() {
    if (!rigidBodyRef) return;
    
    const moveSpeed = 0.2;
    const floatSpeed = 0.15;
    
    if (physicsEnabled) {
      // Physics mode - apply forces
      let forceX = 0;
      let forceY = 0;
      let forceZ = 0;
      
      if (keyState.w) forceZ = -100;
      if (keyState.s) forceZ = 100;
      if (keyState.a) forceX = -100;
      if (keyState.d) forceX = 100;
      if (keyState.space) forceY = 100;
      if (keyState.shift) forceY = -100;
      
      // Apply basic forces
      rigidBodyRef.addForce({ x: forceX, y: forceY, z: forceZ }, true);
      
      // Update size
      if (keyState.space && !keyState.shift) {
        balloonSize = Math.min(balloonSize + 0.01, SIMULATION_CONSTANTS.BALLOON_MAX_SIZE);
      } else if (keyState.shift && !keyState.space) {
        balloonSize = Math.max(balloonSize - 0.01, SIMULATION_CONSTANTS.BALLOON_MIN_SIZE);
      }
      
      // Just read the position for display
      const translation = rigidBodyRef.translation();
      position = {
        x: translation.x,
        y: translation.y,
        z: translation.z
      };
      
      // Update debug info
      updateDebugInfo();
    } else {
      // Kinematic mode - direct position control
      if (keyState.w) position.z -= moveSpeed;
      if (keyState.s) position.z += moveSpeed;
      if (keyState.a) position.x -= moveSpeed;
      if (keyState.d) position.x += moveSpeed;
      if (keyState.space) position.y += floatSpeed;
      if (keyState.shift) position.y -= floatSpeed;
      
      // Update size
      if (keyState.space && !keyState.shift) {
        balloonSize = Math.min(balloonSize + 0.01, SIMULATION_CONSTANTS.BALLOON_MAX_SIZE);
      } else if (keyState.shift && !keyState.space) {
        balloonSize = Math.max(balloonSize - 0.01, SIMULATION_CONSTANTS.BALLOON_MIN_SIZE);
      }
      
      // Apply position directly
      rigidBodyRef.setNextKinematicTranslation(position);
      
      // Update debug info
      updateDebugInfo();
    }
  }
  
  // Update the debug element - no reactivity
  function updateDebugInfo() {
    if (!debugElement) return;
    
    let velocity = { x: 0, y: 0, z: 0 };
    if (physicsEnabled && rigidBodyRef) {
      velocity = rigidBodyRef.linvel();
    }
    
    debugElement.innerHTML = `
      <div class="mb-1">Mode: ${physicsEnabled ? 'Physics' : 'Kinematic'}</div>
      <div class="mb-1">Position: X:${position.x.toFixed(1)} Y:${position.y.toFixed(1)} Z:${position.z.toFixed(1)}</div>
      <div class="mb-1">Velocity: X:${velocity.x.toFixed(1)} Y:${velocity.y.toFixed(1)} Z:${velocity.z.toFixed(1)}</div>
      <div class="mb-1">Size: ${balloonSize.toFixed(2)}m</div>
    `;
  }
  
  // Toggle physics mode
  function togglePhysics() {
    physicsEnabled = !physicsEnabled;
    
    if (rigidBodyRef) {
      rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      if (physicsEnabled) {
        rigidBodyRef.setBodyType(1); // Dynamic
      } else {
        rigidBodyRef.setBodyType(2); // Kinematic
      }
    }
    
    updateDebugInfo();
  }
  
  // Apply test impulse
  function applyTestImpulse() {
    if (rigidBodyRef && physicsEnabled) {
      rigidBodyRef.applyImpulse({ x: 0, y: 100, z: 0 }, true);
    }
  }
  
  // Handle body creation
  function handleBodyCreated(body) {
    console.log("SimpleBalloon rigid body created");
    rigidBodyRef = body;
    startAnimation();
  }
  
  // Handle debug element reference
  function handleDebugRef(el) {
    debugElement = el;
    updateDebugInfo();
  }
  
  // Handle reset
  function resetBalloon() {
    if (rigidBodyRef) {
      // Reset position
      position = {
        x: 0,
        y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
        z: 0
      };
      
      // Reset size
      balloonSize = SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE;
      
      // Reset physics
      rigidBodyRef.setTranslation(position, true);
      rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      // Reset to kinematic mode
      physicsEnabled = false;
      rigidBodyRef.setBodyType(2);
      
      updateDebugInfo();
    }
  }
  
  // Handle onmount/onunmount equivalent
  let mounted = false;
  
  function onMount() {
    mounted = true;
    startAnimation();
    return stopAnimation;
  }
  
  // Setup onMount effect
  import { onMount as svelteOnMount } from 'svelte';
  svelteOnMount(onMount);
  
  // Handle reset signal changes
  $: if (resetSignal && mounted && rigidBodyRef) {
    resetBalloon();
  }
</script>

<RigidBody 
  type="kinematicPosition"
  position={[position.x, position.y, position.z]}
  linearDamping={0.5}
  angularDamping={0.8}
  gravityScale={0.5}
  canSleep={false}
  oncreate={handleBodyCreated}
>
  <T.Group>
    <T.Mesh castShadow>
      <T.SphereGeometry args={[balloonSize, 32, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
  </T.Group>
</RigidBody>

<!-- Non-reactive debug UI -->
<div bind:this={debugElement} class="fixed top-20 right-5 bg-black/70 text-white p-3 rounded text-xs font-mono">
  Loading...
</div>

<!-- Static control buttons -->
<div class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white p-2 rounded grid grid-cols-2 gap-2 text-xs">
  <button 
    class="px-2 py-1 bg-blue-600 rounded"
    onclick={togglePhysics}
  >
    Toggle Physics (P)
  </button>
  
  <button 
    class="px-2 py-1 bg-red-600 rounded"
    onclick={applyTestImpulse}
  >
    Test Impulse (I)
  </button>
  
  <div class="col-span-2 text-center mt-2">
    WASD: Move | Space: Rise | Shift: Descend
  </div>
</div>