<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { flightStore } from '$lib/stores/flightStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { applyForces, getPhysicsState } from '../physics/simplePhysics';
  import { venusData } from '../physics/data';
  
  // Props using $props() rune
  const { 
    startPosition = [0, venusData.altitude.cloudLayer, 0],
    color = venusData.visual.playerColor,
    mass = venusData.physics.mass,
    debug = false
  } = $props();
  
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
    up: false, down: false, buoyancyForce: venusData.controls.defaultBuoyancy
  });
  
  // Player state tracking
  let position = $state({ x: startPosition[0], y: startPosition[1], z: startPosition[2] });
  const altitude = $derived(position.y);
  
  // Track body position
  function updatePosition() {
    if (!rigidBodyRef) return;
    
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

<!-- Player ball -->
<RigidBody 
  position={startPosition} 
  bind:rigidBody={rigidBodyRef}
  linearDamping={0.5}
  angularDamping={0.5}
  type="dynamic"
  autoSleep={false}
  mass={mass}
  gravityScale={1}
>
  <Collider shape="ball" args={[venusData.visual.playerRadius]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[venusData.visual.playerRadius, 16, 16]} />
    <T.MeshStandardMaterial color={color} />
  </T.Mesh>
</RigidBody>