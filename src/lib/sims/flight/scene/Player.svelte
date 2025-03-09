<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { flightStore, getAtmosphereDensityFactor } from '$lib/stores/flightStore';
  
  // Rigid body reference
  let rigidBodyRef = $state(null);
  
  // Subscribe to flight store
  const playing = $derived(flightStore.playing);
  const controls = $derived(flightStore.controls);
  
  // Player state tracking
  let position = $state({ x: 0, y: flightStore.CLOUD_ALTITUDE, z: 0 });
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
    }
  }
  
  // Use physics task to apply forces before each physics step
  usePhysicsTask((delta) => {
    if (!rigidBodyRef || !playing) return;
    
    // Update position tracking
    updatePosition();
    
    const force = 50; // Base force magnitude
    const verticalForce = 4400; // Vertical movement force
    
    // Apply directional forces based on current controls
    if (controls.forward) {
      rigidBodyRef.applyImpulse({ x: 0, y: 0, z: -force * delta }, true);
    }
    if (controls.backward) {
      rigidBodyRef.applyImpulse({ x: 0, y: 0, z: force * delta }, true);
    }
    if (controls.left) {
      rigidBodyRef.applyImpulse({ x: -force * delta, y: 0, z: 0 }, true);
    }
    if (controls.right) {
      rigidBodyRef.applyImpulse({ x: force * delta, y: 0, z: 0 }, true);
    }
    
    // Up/down movement
    if (controls.up) {
      rigidBodyRef.applyImpulse({ x: 0, y: verticalForce * delta, z: 0 }, true);
    }
    if (controls.down) {
      rigidBodyRef.applyImpulse({ x: 0, y: -verticalForce * delta, z: 0 }, true);
    }
    
    // Get density factor based on current altitude
    const densityFactor = getAtmosphereDensityFactor(altitude);
    
    // Apply buoyancy (upward force to counter gravity)
    // Adjusted by altitude-based density and user-controlled buoyancy setting
    const effectiveBuoyancy = controls.buoyancyForce * densityFactor;
    rigidBodyRef.applyImpulse({ x: 0, y: effectiveBuoyancy * delta, z: 0 }, true);
    
    // Apply gentle damping for atmospheric drag
    const linearVel = rigidBodyRef.linvel();
    const dragFactor = 0.3 * densityFactor; // More drag in denser atmosphere
    rigidBodyRef.applyImpulse({ 
      x: -linearVel.x * dragFactor * delta, 
      y: -linearVel.y * dragFactor * delta, 
      z: -linearVel.z * dragFactor * delta 
    }, true);
  });
</script>

<!-- Player ball - start at cloud layer altitude -->
<RigidBody 
  position={[0, flightStore.CLOUD_ALTITUDE, 0]} 
  bind:rigidBody={rigidBodyRef}
  linearDamping={0.5}
  angularDamping={0.5}
  type="dynamic"
  autoSleep={false}
  mass={10}
  gravityScale={1}
>
  <Collider shape="ball" args={[1]} friction={0.7} restitution={0.3} />
  
  <T.Mesh castShadow>
    <T.SphereGeometry args={[1, 16, 16]} />
    <T.MeshStandardMaterial color="#4080ff" />
  </T.Mesh>
</RigidBody>

<!-- Surface - moved lower to represent Venus surface -->
<RigidBody position={[0, -10, 0]} type="fixed">
  <Collider shape="cuboid" args={[500, 0.1, 500]} />
  
  <T.Mesh receiveShadow>
    <T.BoxGeometry args={[1000, 0.2, 1000]} />
    <T.MeshStandardMaterial color="#FF8C00" transparent={true} opacity={0.3} />
  </T.Mesh>
</RigidBody>