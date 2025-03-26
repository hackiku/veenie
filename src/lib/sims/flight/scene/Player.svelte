<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { getContext } from "svelte";
  
  // Get the flight context
  const flightContext = getContext('flightContext');
  const constants = flightContext.constants;
  
  // Access game state through the context
  const gameState = $derived(flightContext.getGameState());
  
  // Props using $state (updated from $props() rune for consistency)
  const props = $state({
    // Explicitly set Y position to 50km altitude (Venus cloud layer)
    // startPosition: [0, constants.altitude.CLOUD_LAYER, 0],
    color: constants.visual.PLAYER_COLOR,
    mass: 10,
    debug: false
  });
  
	// const startPosition = [0, 30, 0];
  // Rigid body reference
  let rigidBodyRef = $state(null);
  
  // Player state tracking
  let position = $derived({
    x: gameState.position.x,
    y: gameState.position.y,
    z: gameState.position.z
  });
  
  const altitude = $derived(position.y);
  const playing = $derived(gameState.playing);
  const controls = $derived(gameState.controls);
  
  // Helper functions for physics
  function getPhysicsState(rigidBody) {
    if (!rigidBody) {
      return {
        altitude: constants.altitude.CLOUD_LAYER,
        velocity: { x: 0, y: 0, z: 0 },
        density: 1.0
      };
    }
    
    const position = rigidBody.translation();
    const velocity = rigidBody.linvel();
    const altitude = position.y;
    
    // Calculate simplified density factor
    let densityFactor = 1.0;
    if (altitude < 40) densityFactor = 1.2;
    else if (altitude > 60) densityFactor = 0.8;
    else densityFactor = 1.2 - ((altitude - 40) / 20) * 0.4;
    
    return {
      altitude,
      velocity: {
        x: velocity.x,
        y: velocity.y, 
        z: velocity.z
      },
      density: densityFactor
    };
  }
  
  function applyForces(rigidBody, delta, controls, altitude) {
    if (!rigidBody) return;
    
    // Base force values
    const horizontalForce = constants.controls.HORIZONTAL_FORCE;
    const verticalForce = constants.controls.VERTICAL_FORCE;
    
    // Apply directional forces based on current controls
    if (controls.forward) {
      rigidBody.applyImpulse({ x: 0, y: 0, z: -horizontalForce * delta }, true);
    }
    if (controls.backward) {
      rigidBody.applyImpulse({ x: 0, y: 0, z: horizontalForce * delta }, true);
    }
    if (controls.left) {
      rigidBody.applyImpulse({ x: -horizontalForce * delta, y: 0, z: 0 }, true);
    }
    if (controls.right) {
      rigidBody.applyImpulse({ x: horizontalForce * delta, y: 0, z: 0 }, true);
    }
    
    // Up/down movement
    if (controls.up) {
      rigidBody.applyImpulse({ x: 0, y: verticalForce * delta, z: 0 }, true);
    }
    if (controls.down) {
      rigidBody.applyImpulse({ x: 0, y: -verticalForce * delta, z: 0 }, true);
    }
    
    // Apply buoyancy with a density factor based on altitude
    let densityFactor = 1.0;
    if (altitude < 40) densityFactor = 1.2;
    else if (altitude > 60) densityFactor = 0.8;
    else densityFactor = 1.2 - ((altitude - 40) / 20) * 0.4;
    
    // Apply buoyancy
    const effectiveBuoyancy = controls.buoyancyForce * densityFactor;
    rigidBody.applyImpulse({ x: 0, y: effectiveBuoyancy * delta, z: 0 }, true);
    
    // Apply drag based on velocity
    const linearVel = rigidBody.linvel();
    const dragFactor = 0.3 * densityFactor; 
    rigidBody.applyImpulse({ 
      x: -linearVel.x * dragFactor * delta, 
      y: -linearVel.y * dragFactor * delta, 
      z: -linearVel.z * dragFactor * delta 
    }, true);
  }
  
  // Track body position and update context
  function updatePosition() {
    if (!rigidBodyRef) return;
    
    try {
      const translation = rigidBodyRef.translation();
      const newPosition = {
        x: translation.x,
        y: translation.y,
        z: translation.z
      };
      
      const velocity = rigidBodyRef.linvel();
      const newVelocity = {
        x: velocity.x,
        y: velocity.y,
        z: velocity.z
      };
      
      // Update the context with our position
      flightContext.updatePosition(newPosition);
      flightContext.updateVelocity(newVelocity);
    } catch (error) {
      console.error("Error updating position:", error);
    }
  }
  
  // Use physics task to apply forces before each physics step
  usePhysicsTask((delta) => {
    if (!rigidBodyRef) return;
    
    // Always update position tracking regardless of playing state
    updatePosition();
    
    // Only apply forces when playing
    if (playing) {
      applyForces(rigidBodyRef, delta, controls, altitude);
    } else {
      // When paused, apply a tiny force to counteract any movement
      // This gives the impression of "freezing" in place
      const linearVel = rigidBodyRef.linvel();
      if (Math.abs(linearVel.x) > 0.001 || Math.abs(linearVel.y) > 0.001 || Math.abs(linearVel.z) > 0.001) {
        rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      }
    }
  });

  // Initialize position from context when component mounts
  $effect(() => {
    if (rigidBodyRef && gameState) {
      // Set initial position
      rigidBodyRef.setTranslation(
        { 
          x: gameState.position.x, 
          y: gameState.position.y, 
          z: gameState.position.z 
        }, 
        true
      );
    }
  });
</script>

<!-- Player ball with updated position -->
<RigidBody 
  position={props.startPosition} 
  bind:rigidBody={rigidBodyRef}
  linearDamping={0.5}
  angularDamping={0.5}
  type="dynamic"
  autoSleep={false}
  mass={props.mass}
  gravityScale={1}
>
  <Collider shape="ball" args={[constants.visual.PLAYER_RADIUS]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[constants.visual.PLAYER_RADIUS, 16, 16]} />
    <T.MeshStandardMaterial color={props.color} />
  </T.Mesh>
</RigidBody>