<!-- src/lib/sims/flight/scene/Scene.svelte -->
<script>
  import { T } from "@threlte/core";
  import { RigidBody, useRapier } from '@threlte/rapier';
  import { OrbitControls } from '@threlte/extras';
  import { Vector3 } from 'three';
  
  // State using runes
  let earthRef = $state();
  let moonRef = $state();
  let orbitSetup = $state(false);
  
  // Run setup once components are mounted
  $effect(() => {
    // Wait for refs to be ready before setting up orbit
    if (earthRef && moonRef && !orbitSetup) {
      setupOrbit();
      orbitSetup = true;
    }
  });
  
  function setupOrbit() {
    const { world } = useRapier();
    
    // Get rigid bodies from refs
    const earth = world.getRigidBody(earthRef);
    const moon = world.getRigidBody(moonRef);
    
    if (!earth || !moon) return;
    
    // Create attractor joint (scaled for simulation)
    const G = 6.674e-2;
    const earthMass = 10;
    
    world.createImpulseJoint('attractor', earth, moon, {
      strength: G * earthMass,
      range: 50
    });
    
    // Initial velocity for orbit
    const initialVelocity = new Vector3(0, 0, 2);
    moon.setLinvel(initialVelocity, true);
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 15, 30]}
  fov={60}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight intensity={0.3} />
<T.DirectionalLight 
  intensity={1} 
  position={[10, 10, 10]} 
  castShadow 
/>

<!-- Earth -->
<RigidBody type="fixed" position={[0, 0, 0]} bind:ref={earthRef}>
  <T.Mesh castShadow receiveShadow>
    <T.SphereGeometry args={[3, 32, 32]} />
    <T.MeshStandardMaterial color="#1d7ec2" />
  </T.Mesh>
</RigidBody>

<!-- Moon -->
<RigidBody position={[15, 0, 0]} mass={0.1} bind:ref={moonRef} linearDamping={0}>
  <T.Mesh castShadow receiveShadow>
    <T.SphereGeometry args={[0.8, 24, 24]} />
    <T.MeshStandardMaterial color="#ccc" />
  </T.Mesh>
</RigidBody>

<!-- Space background -->
<T.Mesh receiveShadow position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
  <T.PlaneGeometry args={[100, 100]} />
  <T.MeshStandardMaterial color="#111" />
</T.Mesh>