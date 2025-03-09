<!-- src/lib/sims/flight/scene/Player.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider } from "@threlte/rapier";
  
  // Reference to the rigid body
  let rigidBodyRef;
  
  // Apply force on keydown
  function applyForce(event) {
    if (!rigidBodyRef) return;
    
    const force = 5; // Force magnitude
    
    switch(event.key) {
      case 'ArrowUp':
        rigidBodyRef.applyImpulse({ x: 0, y: 0, z: -force }, true);
        break;
      case 'ArrowDown':
        rigidBodyRef.applyImpulse({ x: 0, y: 0, z: force }, true);
        break;
      case 'ArrowLeft':
        rigidBodyRef.applyImpulse({ x: -force, y: 0, z: 0 }, true);
        break;
      case 'ArrowRight':
        rigidBodyRef.applyImpulse({ x: force, y: 0, z: 0 }, true);
        break;
      case ' ': // Spacebar
        rigidBodyRef.applyImpulse({ x: 0, y: force * 2, z: 0 }, true);
        break;
    }
  }
  
  function handleRef(ref) {
    rigidBodyRef = ref;
  }
</script>

<svelte:window on:keydown={applyForce} />

<!-- Camera -->
<T.PerspectiveCamera
  position={[10, 10, 10]}
  fov={75}
  near={0.1}
  far={1000}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0);
  }}
/>

<!-- Player ball -->
<RigidBody 
  position={[0, 5, 0]} 
  oncreate={handleRef}
  linearDamping={0.5}
  angularDamping={0.5}
  type="dynamic"
>
  <Collider shape="ball" args={[1]} />
  
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