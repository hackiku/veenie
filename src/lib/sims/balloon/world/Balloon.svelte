<!-- Balloon.svelte - Using our physics abstraction -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { useTask } from '@threlte/core';
  import { SIMULATION_CONSTANTS } from '../constants';
  import { BalloonPhysics } from '../physics/balloon';
  
  // Props
  let { 
    updateTelemetry = (data) => {}, 
    resetSignal = 0,
    running = true,
    singleStep = false 
  } = $props();
  
  // Create balloon physics instance
  const balloonPhysics = new BalloonPhysics({
    initialSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
    minSize: SIMULATION_CONSTANTS.BALLOON_MIN_SIZE,
    maxSize: SIMULATION_CONSTANTS.BALLOON_MAX_SIZE,
    gasDensityRatio: SIMULATION_CONSTANTS.GAS_DENSITY_RATIO,
    controlSensitivity: SIMULATION_CONSTANTS.CONTROL_SENSITIVITY,
    gravity: SIMULATION_CONSTANTS.GRAVITY
  });
  
  // State for rendering
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  
  // Handle keyboard input
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case 'w': balloonPhysics.setControls({ moveX: 1 }); break;
        case 's': balloonPhysics.setControls({ moveX: -1 }); break;
        case 'a': balloonPhysics.setControls({ moveZ: -1 }); break;
        case 'd': balloonPhysics.setControls({ moveZ: 1 }); break;
        case '1': balloonPhysics.setControls({ deflate: true }); break;
        case '2': balloonPhysics.setControls({ inflate: true }); break;
      }
    };
    
    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case 'w': 
        case 's': balloonPhysics.setControls({ moveX: 0 }); break;
        case 'a': 
        case 'd': balloonPhysics.setControls({ moveZ: 0 }); break;
        case '1': balloonPhysics.setControls({ deflate: false }); break;
        case '2': balloonPhysics.setControls({ inflate: false }); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Handle rigid body creation
  function handleRigidBodyCreate(body) {
    balloonPhysics.setRigidBody(body);
  }
  
  // Reset when needed
  $effect(() => {
    if (resetSignal) {
      balloonPhysics.reset({ 
        x: 0, 
        y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 
        z: 0 
      });
    }
  });
  
  // Update physics
  useTask((delta) => {
    if (!running && !singleStep) return;
    
    // Update physics
    balloonPhysics.update(delta);
    
    // Update rendering state
    balloonSize = balloonPhysics.getBalloonSize();
    
    // Update telemetry
    updateTelemetry(balloonPhysics.getTelemetry());
  });
</script>

<!-- Balloon model -->
<RigidBody 
  position={[0, SIMULATION_CONSTANTS.TERRAIN_HEIGHT + SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
  linearDamping={0.8}
  angularDamping={0.9}
  oncreate={handleRigidBodyCreate}
>
  <T.Group>
    <!-- Main balloon sphere -->
    <T.Mesh castShadow>
      <T.SphereGeometry args={[balloonSize, 32, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <!-- Basket under balloon -->
    <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
    
    <!-- Ropes -->
    <T.Group>
      {#each Array(4) as _, i}
        <T.Line>
          <T.BufferGeometry>
            <T.Float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  Math.cos(i * Math.PI/2) * 0.8, -balloonSize * 0.8, Math.sin(i * Math.PI/2) * 0.8,
                  Math.cos(i * Math.PI/2) * 0.4, -balloonSize - 0.9, Math.sin(i * Math.PI/2) * 0.4
                ]),
                3
              ]}
            />
          </T.BufferGeometry>
          <T.LineBasicMaterial color="#6B4226" />
        </T.Line>
      {/each}
    </T.Group>
  </T.Group>
</RigidBody>