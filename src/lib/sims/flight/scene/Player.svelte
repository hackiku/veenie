<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { flightStore } from '$lib/stores/flightStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { venusData } from '$lib/data/flight/constants';
  
  // Props using $state (updated from $props() rune for consistency)
  const props = $state({
    // Explicitly set Y position to 50km altitude (Venus cloud layer)
    startPosition: [0, venusData.altitude.CLOUD_LAYER, 0],
    color: venusData.visual.PLAYER_COLOR,
    mass: 10,
    debug: false
  });
  
  // Ensure we're using the correct constant for cloud layer altitude
  console.log("Starting at altitude:", venusData.altitude.CLOUD_LAYER);
  
  // Rigid body reference
  let rigidBodyRef = $state(null);
  
  // State for flight and time
  let flightState = $state(null);
  let timeState = $state(null);
  
  // Subscribe to stores using $effect
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    const unsubTimeStore = timeStore.subscribe(state => {
      timeState = state;
    });
    
    return () => {
      unsubFlightStore();
      unsubTimeStore();
    };
  });
  
  // Derived values
  const playing = $derived(flightState?.playing || false);
  const controls = $derived(flightState?.controls || {
    forward: false, backward: false, left: false, right: false,
    up: false, down: false, buoyancyForce: venusData.controls.DEFAULT_BUOYANCY
  });
  
  // Player state tracking
  let position = $state({ 
    x: props.startPosition[0], 
    y: props.startPosition[1], 
    z: props.startPosition[2] 
  });
  const altitude = $derived(position.y);
  
  // Current simulation time
  const simulationTime = $derived(timeState?.elapsedTime || 0);
  
  // Helper functions for physics
  function getPhysicsState(rigidBody) {
    if (!rigidBody) {
      return {
        altitude: venusData.altitude.CLOUD_LAYER,
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
    const horizontalForce = venusData.controls.HORIZONTAL_FORCE;
    const verticalForce = venusData.controls.VERTICAL_FORCE;
    
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
  
  // Track body position
  function updatePosition() {
    if (!rigidBodyRef) return;
    
    try {
      const translation = rigidBodyRef.translation();
      position = {
        x: translation.x,
        y: translation.y,
        z: translation.z
      };
      
      // Update the flight store with our position
      flightStore.updatePosition(position);
      
      // Get and update full physics state
      const physicsState = getPhysicsState(rigidBodyRef);
      flightStore.updatePhysicsState(physicsState);
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
  <Collider shape="ball" args={[venusData.visual.PLAYER_RADIUS]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[venusData.visual.PLAYER_RADIUS, 16, 16]} />
    <T.MeshStandardMaterial color={props.color} />
  </T.Mesh>
</RigidBody>