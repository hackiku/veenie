<!-- src/lib/sims/flight/scene/Player.svelte -->
<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { getContext, onMount } from "svelte";
  
  // Get the flight context
  const flightContext = getContext('flightContext');
  const constants = flightContext.constants;
  
  // Access game state through the context
  const gameState = $derived(flightContext.getGameState());
  
  // Rigid body reference
  let rigidBodyRef = $state(null);
  let initialPositionSet = $state(false);
  
  // Player state tracking
  const playing = $derived(gameState.playing);
  const controls = $derived(gameState.controls);
  
  // Debug helper for position setting
  function logPosition() {
    if (rigidBodyRef) {
      const pos = rigidBodyRef.translation();
      console.log("Player position:", pos.x, pos.y, pos.z);
    }
  }
  
  // Set initial position manually after component mounts
  onMount(() => {
    // Give Rapier a moment to initialize
    setTimeout(() => {
      if (rigidBodyRef) {
        console.log("Setting initial position to:", 0, constants.altitude.CLOUD_LAYER, 0);
        rigidBodyRef.setTranslation(
          { x: 0, y: constants.altitude.CLOUD_LAYER, z: 0 }, 
          true
        );
        initialPositionSet = true;
        updatePosition(); // Update context with the new position
        logPosition(); // Log for debugging
      }
    }, 100);
  });
  
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
  
  // Apply forces to the rigid body
  function applyForces(rigidBody, delta) {
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
    if (controls.up) {
      rigidBody.applyImpulse({ x: 0, y: verticalForce * delta, z: 0 }, true);
    }
    if (controls.down) {
      rigidBody.applyImpulse({ x: 0, y: -verticalForce * delta, z: 0 }, true);
    }
    
    // Simple buoyancy - counteract gravity with a constant upward force
    rigidBody.applyImpulse({ x: 0, y: controls.buoyancyForce * delta, z: 0 }, true);
    
    // Simple drag - apply force opposite to velocity
    const linearVel = rigidBody.linvel();
    const dragFactor = 0.3; // Constant drag factor
    rigidBody.applyImpulse({ 
      x: -linearVel.x * dragFactor * delta, 
      y: -linearVel.y * dragFactor * delta, 
      z: -linearVel.z * dragFactor * delta 
    }, true);
  }
  
  // Use physics task to apply forces before each physics step
  usePhysicsTask((delta) => {
    if (!rigidBodyRef) return;
    
    // Always update position tracking
    updatePosition();
    
    // Only apply forces when playing
    if (playing) {
      applyForces(rigidBodyRef, delta);
    } else {
      // When paused, zero out velocity
      rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  // When the reset happens in the game state, update our position
  $effect(() => {
    if (rigidBodyRef && gameState.position) {
      // Only reset if the position has actually changed significantly
      const currentPos = rigidBodyRef.translation();
      const targetY = gameState.position.y;
      
      // If we're far from the target position or it's a manual reset
      if (Math.abs(currentPos.y - targetY) > 1 || !initialPositionSet) {
        console.log("Resetting player to:", gameState.position.x, gameState.position.y, gameState.position.z);
        rigidBodyRef.setTranslation(
          { 
            x: gameState.position.x, 
            y: gameState.position.y, 
            z: gameState.position.z 
          }, 
          true
        );
        // Stop all motion
        rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
        
        initialPositionSet = true;
        logPosition(); // Log for debugging
      }
    }
  });
</script>

<RigidBody 
  type="dynamic"
  position={{ x: 0, y: 0, z: 0 }} 
  bind:rigidBody={rigidBodyRef}
  linearDamping={0.5}
  angularDamping={0.5}
  autoSleep={false}
  mass={10}
  gravityScale={1}
>
  <Collider shape="ball" args={[constants.visual.PLAYER_RADIUS]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[constants.visual.PLAYER_RADIUS, 16, 16]} />
    <T.MeshStandardMaterial color={constants.visual.PLAYER_COLOR} />
  </T.Mesh>
</RigidBody>