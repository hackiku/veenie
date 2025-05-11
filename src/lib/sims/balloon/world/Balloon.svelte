<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody, useRapier } from '@threlte/rapier';
  import { useTask } from '@threlte/core';
  import { SIMULATION_CONSTANTS, getAirDensity, calculateBuoyancy } from '../constants';
  
  // Correct Svelte 5 props syntax
  let {
    updateTelemetry = (data) => {},
    resetSignal = 0
  } = $props();
  
  // Get Rapier world
  const { world } = useRapier();
  
  // Balloon state
  let balloonBody = $state(null);
  let balloonSize = $state(SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE);
  let currentCollider = $state(null);
  let basketCollider = $state(null);
  
  // Controls state
  let movementDirection = $state({ x: 0, y: 0, z: 0 });
  let balloonSizeChange = $state(0);
  
  // Handle keyboard input
  function setupControls() {
    const handleKeyDown = (event) => {
      // WASD for movement
      if (event.key === 'w' || event.key === 'W') movementDirection.x = 10.0;
      if (event.key === 's' || event.key === 'S') movementDirection.x = -1.0;
      if (event.key === 'a' || event.key === 'A') movementDirection.z = -1.0;
      if (event.key === 'd' || event.key === 'D') movementDirection.z = 1.0;
      
      // Space to increase balloon size
      if (event.key === ' ') balloonSizeChange = 0.5;
      // Shift to decrease balloon size
      if (event.key === 'Shift') balloonSizeChange = -0.5;
    };
    
    const handleKeyUp = (event) => {
      // WASD
      if ((event.key === 'w' || event.key === 'W') && movementDirection.x > 0) 
        movementDirection.x = 0.0;
      if ((event.key === 's' || event.key === 'S') && movementDirection.x < 0) 
        movementDirection.x = 0.0;
      if ((event.key === 'a' || event.key === 'A') && movementDirection.z < 0) 
        movementDirection.z = 0.0;
      if ((event.key === 'd' || event.key === 'D') && movementDirection.z > 0) 
        movementDirection.z = 0.0;
      
      // Space/Shift
      if (event.key === ' ' && balloonSizeChange > 0) balloonSizeChange = 0.0;
      if (event.key === 'Shift' && balloonSizeChange < 0) balloonSizeChange = 0.0;
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }
  
  // Setup controls when component mounts
  $effect(() => {
    const cleanup = setupControls();
    return cleanup;
  });
  
  // Reset balloon when restart is triggered
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
      updateBalloonCollider();
    }
  });
  
  // Store reference to balloonBody when created
  function handleRigidBodyCreate(body) {
    balloonBody = body;
  }
  
  // Update collider based on new size
  function updateBalloonCollider() {
    if (!balloonBody || !world) return;
    
    // Get current position
    const pos = balloonBody.translation();
    const airDensity = getAirDensity(pos.y);
    
    // Remove old colliders if they exist
    if (currentCollider) {
      world.removeCollider(currentCollider, true);
    }
    
    if (basketCollider) {
      world.removeCollider(basketCollider, true);
    }
    
    // Create new balloon collider
    const rapier = useRapier().rapier;
    const balloonColliderDesc = rapier.ColliderDesc.ball(balloonSize);
    
    // Set density based on Venus atmosphere model
    const GAS_DENSITY_RATIO = SIMULATION_CONSTANTS.GAS_DENSITY_RATIO;
    balloonColliderDesc.setDensity(GAS_DENSITY_RATIO * airDensity);
    
    // Create the collider
    currentCollider = world.createCollider(balloonColliderDesc, balloonBody);
    
    // Create basket collider
    const basketColliderDesc = rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    basketColliderDesc.setTranslation(0, -balloonSize - 1.0, 0);
    basketColliderDesc.setDensity(3.0);
    basketCollider = world.createCollider(basketColliderDesc, balloonBody);
  }
  
  // Physics update each frame
  useTask(() => {
    if (!balloonBody) return;
    
    // Get current position
    const pos = balloonBody.translation();
    const altitude = pos.y;
    
    // Calculate air density at current altitude
    const airDensity = getAirDensity(altitude);
    
    // Update balloon size from controls
    let newSize = balloonSize + balloonSizeChange * 0.01;
    newSize = Math.max(
      SIMULATION_CONSTANTS.BALLOON_MIN_SIZE, 
      Math.min(SIMULATION_CONSTANTS.BALLOON_MAX_SIZE, newSize)
    );
    
    // Update collider if size changed enough
    if (Math.abs(newSize - balloonSize) > 0.01) {
      balloonSize = newSize;
      updateBalloonCollider();
    }
    
    // Calculate buoyancy forces
    const volume = (4 / 3) * Math.PI * Math.pow(balloonSize, 3);
    const GAS_DENSITY_RATIO = SIMULATION_CONSTANTS.GAS_DENSITY_RATIO;
    const gasDensity = GAS_DENSITY_RATIO * airDensity;
    
    // Balloon structure and gas ratios
    const gasVolume = volume * 0.9; // Gas fills 90% of balloon
    const structureVolume = volume * 0.1; // Structure is 10% of balloon
    const structureDensity = 0.5; // Fixed weight of balloon structure
    
    // Calculate effective density
    const totalMass = (gasDensity * gasVolume) + (structureDensity * structureVolume);
    const effectiveDensity = totalMass / volume;
    
    // Calculate buoyancy force
    const buoyancyForce = calculateBuoyancy(
      volume, 
      effectiveDensity, 
      airDensity, 
      SIMULATION_CONSTANTS.GRAVITY
    );
    
    // Apply buoyancy force
    const buoyancyFactor = 0.15; // Scale factor for more realistic movement
    balloonBody.addForce(
      { x: 0, y: buoyancyForce * buoyancyFactor, z: 0 }, 
      true
    );
    
    // Apply control forces
    const { CONTROL_SENSITIVITY } = SIMULATION_CONSTANTS;
    balloonBody.addForce(
      {
        x: movementDirection.x * CONTROL_SENSITIVITY,
        y: 0, // Vertical control comes from buoyancy
        z: movementDirection.z * CONTROL_SENSITIVITY
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
  linearDamping={50.0}
  angularDamping={5.0}
  oncreate={handleRigidBodyCreate}
>
  <T.Group>
    <!-- Main balloon sphere -->
    <T.Mesh>
      <T.SphereGeometry args={[balloonSize, 32, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <!-- Basket under balloon -->
    <T.Mesh position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
    
    <!-- Ropes connecting balloon to basket -->
    <T.Group>
      {#each Array(4) as _, i}
        <T.Line>
          <T.BufferGeometry>
            <T.Float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  Math.cos(i * Math.PI/2) * 0.8, -balloonSize * 0.8, Math.sin(i * Math.PI/2) * 0.8,
                  Math.cos(i * Math.PI/2) * 0.5, -balloonSize - 0.9, Math.sin(i * Math.PI/2) * 0.5
                ]),
                3
              ]}
            />
          </T.BufferGeometry>
          <T.LineBasicMaterial color="#6B4226" linewidth={2} />
        </T.Line>
      {/each}
    </T.Group>
  </T.Group>
</RigidBody>