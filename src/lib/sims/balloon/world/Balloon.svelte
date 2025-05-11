<!-- Balloon.svelte - Modified version -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody, useRapier } from '@threlte/rapier';
  import { useTask } from '@threlte/core';
  import { SIMULATION_CONSTANTS, getAirDensity, calculateBuoyancy } from '../constants';
  
  // Props
  let { 
    updateTelemetry = (data) => {}, 
    resetSignal = 0,
    running = true,
    singleStep = false 
  } = $props();
  
  // State
  let balloonBody = $state(null);
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  
  // Input state
  let keysPressed = $state({
    up: false,
    down: false,
    left: false,
    right: false,
    inflate: false,
    deflate: false
  });
  
  // Handle keyboard input
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      if (event.key === 'w' || event.key === 'W') keysPressed.up = true;
      if (event.key === 's' || event.key === 'S') keysPressed.down = true;
      if (event.key === 'a' || event.key === 'A') keysPressed.left = true;
      if (event.key === 'd' || event.key === 'D') keysPressed.right = true;
      if (event.key === '2') keysPressed.inflate = true;
      if (event.key === '1') keysPressed.deflate = true;
    };
    
    const handleKeyUp = (event) => {
      if (event.key === 'w' || event.key === 'W') keysPressed.up = false;
      if (event.key === 's' || event.key === 'S') keysPressed.down = false;
      if (event.key === 'a' || event.key === 'A') keysPressed.left = false;
      if (event.key === 'd' || event.key === 'D') keysPressed.right = false;
      if (event.key === '2') keysPressed.inflate = false;
      if (event.key === '1') keysPressed.deflate = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Initial setup
  function handleRigidBodyCreate(body) {
    balloonBody = body;
  }
  
  // Reset when needed
  $effect(() => {
    if (resetSignal && balloonBody) {
      balloonBody.setTranslation({ 
        x: 0, 
        y: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 
        z: 0 
      }, true);
      
      balloonBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      balloonBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
      
      balloonSize = SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE;
    }
  });
  
  // Handle inflation/deflation
  $effect(() => {
    if (keysPressed.inflate) {
      balloonSize = Math.min(
        balloonSize + 0.01, 
        SIMULATION_CONSTANTS.BALLOON_MAX_SIZE
      );
    }
    
    if (keysPressed.deflate) {
      balloonSize = Math.max(
        balloonSize - 0.01,
        SIMULATION_CONSTANTS.BALLOON_MIN_SIZE
      );
    }
  });
  
  // Apply forces based on user input
  useTask(() => {
    // Only process physics if simulation is running or a single step is requested
    if (!balloonBody || (!running && !singleStep)) return;
    
    // Get balloon position for telemetry
    const pos = balloonBody.translation();
    
    // Calculate physics
    const altitude = pos.y;
    const airDensity = getAirDensity(altitude);
    
    // Calculate actual buoyancy based on balloon size
    const volume = (4 / 3) * Math.PI * Math.pow(balloonSize, 3);
    const gasWeight = volume * SIMULATION_CONSTANTS.GAS_DENSITY_RATIO * airDensity * SIMULATION_CONSTANTS.GRAVITY;
    const displacedWeight = volume * airDensity * SIMULATION_CONSTANTS.GRAVITY;
    const buoyancyForce = displacedWeight - gasWeight;
    
    // Apply balloon control forces
    let xForce = 0;
    let zForce = 0;
    
    if (keysPressed.up) xForce += SIMULATION_CONSTANTS.CONTROL_SENSITIVITY * 10;
    if (keysPressed.down) xForce -= SIMULATION_CONSTANTS.CONTROL_SENSITIVITY * 10;
    if (keysPressed.left) zForce -= SIMULATION_CONSTANTS.CONTROL_SENSITIVITY * 10;
    if (keysPressed.right) zForce += SIMULATION_CONSTANTS.CONTROL_SENSITIVITY * 10;
    
    // Apply combined forces
    balloonBody.addForce(
      { 
        x: xForce, 
        y: buoyancyForce, 
        z: zForce 
      }, 
      true
    );
    
    // Update telemetry
    updateTelemetry({
      altitude: altitude,
      balloonSize: balloonSize,
      airDensity: airDensity,
      buoyancy: buoyancyForce
    });
  });
</script>

<!-- Balloon model -->
<RigidBody 
  position={[0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
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