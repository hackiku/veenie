<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider, usePhysicsTask } from "@threlte/rapier";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Properly typed reference to the rigid body
  let rigidBodyRef = $state(null);
  
  // Subscribe to flight store for play/pause
  const playing = $derived(flightStore.playing);
  
  // Flight controls
  let controls = $state({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    buoyancyUp: false,
    buoyancyDown: false
  });
  
  // Buoyancy settings
  let buoyancyForce = $state(8.87 * 0.95); // About 95% of Venus gravity for slow sink
  const maxBuoyancy = 8.87 * 1.5; // Maximum buoyancy (stronger than gravity)
  const minBuoyancy = 8.87 * 0.5; // Minimum buoyancy (fast sink)
  const buoyancyStep = 0.2; // How quickly buoyancy changes with up/down
  
  // Handle key down
  function handleKeyDown(event) {
    if (!$playing) return;
    
    switch(event.key) {
      // WASD for flight controls
      case 'w': controls.forward = true; break;
      case 'a': controls.left = true; break;
      case 's': controls.backward = true; break;
      case 'd': controls.right = true; break;
      // Space and Shift for vertical movement
      case ' ': controls.up = true; break;
      case 'Shift': controls.down = true; break;
      // Arrow up/down for buoyancy control (trim)
      case 'ArrowUp': controls.buoyancyUp = true; break;
      case 'ArrowDown': controls.buoyancyDown = true; break;
    }
  }
  
  // Handle key up
  function handleKeyUp(event) {
    switch(event.key) {
      case 'w': controls.forward = false; break;
      case 'a': controls.left = false; break;
      case 's': controls.backward = false; break;
      case 'd': controls.right = false; break;
      case ' ': controls.up = false; break;
      case 'Shift': controls.down = false; break;
      case 'ArrowUp': controls.buoyancyUp = false; break;
      case 'ArrowDown': controls.buoyancyDown = false; break;
    }
  }
  
  // Use physics task to apply forces before each physics step
  usePhysicsTask((delta) => {
    if (!rigidBodyRef || !$playing) return;
    
    const force = 50; // Base force magnitude
    const verticalForce = 30; // Vertical movement force
    
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
    
    // Adjust buoyancy force based on trim controls
    if (controls.buoyancyUp) {
      buoyancyForce = Math.min(buoyancyForce + buoyancyStep * delta, maxBuoyancy);
    }
    if (controls.buoyancyDown) {
      buoyancyForce = Math.max(buoyancyForce - buoyancyStep * delta, minBuoyancy);
    }
    
    // Apply buoyancy (upward force to counter gravity)
    rigidBodyRef.applyImpulse({ x: 0, y: buoyancyForce * delta, z: 0 }, true);
  });
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<!-- Player ball -->
<RigidBody 
  position={[0, 500, 30]} 
  oncreate={(ref) => rigidBodyRef = ref}
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

<!-- Ground -->
<RigidBody position={[0, -10, 0]} type="fixed">
  <Collider shape="cuboid" args={[100, 0.1, 100]} />
  
  <T.Mesh receiveShadow>
    <T.BoxGeometry args={[200, 0.2, 200]} />
    <T.MeshStandardMaterial color="#555555" />
  </T.Mesh>
</RigidBody>