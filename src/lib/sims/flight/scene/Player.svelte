<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { flightStore } from '$lib/stores/flightStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { applyForces, getPhysicsState } from '../physics/simplePhysics';
  import { venusData } from '../physics/data';
  
  // Rigid body reference
  let rigidBodyRef = $state(null);
  
  // Subscribe to stores
  // let flightState;
  // let timeState;

	// flightStore.subscribe(state => flightState = state);
  // timeStore.subscribe(state => timeState = state);
  const playing = $derived(flightStore.playing && timeStore.subscribe(state => state.playing));
  const controls = $derived(flightStore.controls);

  // $: playing = flightState?.playing && timeState?.playing;
  // $: controls = flightState?.controls || {
  //   forward: false, backward: false, left: false, right: false,
  //   up: false, down: false, buoyancyForce: venusData.controls.defaultBuoyancy
  // };
  
  // Player state tracking
  let position = $state({ x: 0, y: venusData.altitude.cloudLayer, z: 0 });
  let altitude = $derived(position.y);
  
  // Track body position
  function updatePosition() {
    if (rigidBodyRef) {
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
  }
  
  // Use physics task to apply forces before each physics step
  usePhysicsTask((delta) => {
    if (!rigidBodyRef || !playing) return;
    
    // Update position tracking
    updatePosition();
    
    // Apply all forces based on current state
    applyForces(rigidBodyRef, delta, controls, altitude);
  });
</script>

<!-- Player ball - start at cloud layer altitude -->
<RigidBody 
  position={[0, venusData.altitude.cloudLayer, 0]} 
  bind:rigidBody={rigidBodyRef}
  linearDamping={0.5}
  angularDamping={0.5}
  type="dynamic"
  autoSleep={false}
  mass={venusData.physics.mass}
  gravityScale={1}
>
  <Collider shape="ball" args={[venusData.visual.playerRadius]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[venusData.visual.playerRadius, 16, 16]} />
    <T.MeshStandardMaterial color={venusData.visual.playerColor} />
  </T.Mesh>
</RigidBody>

