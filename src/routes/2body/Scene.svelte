<!-- src/routes/2body/Scene.svelte -->
<script>
  import { T } from "@threlte/core";
  import { RigidBody, useRapier } from '@threlte/rapier';
  import { OrbitControls } from '@threlte/extras';
  import { Grid } from '@threlte/extras';
  import { Vector3, Euler } from 'three';
  
  // Props using runes
  let {
    gravityStrength = 6.674e-2,
    initialVelocity = 2,
    moonMass = 0.1
  } = $props();
  
  // State
  let earthRef = $state(null);
  let moonRef = $state(null);
  let joint = $state(null);
  
  // Orbit trail
  let trail = $state([]);
  const maxTrailPoints = 100;
  
  // Setup reactive physics
  $effect(() => {
    setupOrbit();
  });
  
  // Update physics when parameters change
  $effect(() => {
    updateJoint();
  });
  
  // Add trail point on each frame
  $effect(() => {
    const intervalId = setInterval(() => {
      if (moonRef) {
        const { world } = useRapier();
        const moon = world.getRigidBody(moonRef);
        if (moon) {
          const position = moon.translation();
          addTrailPoint({ x: position.x, y: position.y, z: position.z });
        }
      }
    }, 100);
    
    return () => clearInterval(intervalId);
  });
  
  function addTrailPoint(point) {
    trail = [...trail, point];
    if (trail.length > maxTrailPoints) {
      trail = trail.slice(1);
    }
  }
  
  function setupOrbit() {
    if (!earthRef || !moonRef) return;
    
    const { world } = useRapier();
    
    const earth = world.getRigidBody(earthRef);
    const moon = world.getRigidBody(moonRef);
    
    if (!earth || !moon) return;
    
    // Earth mass is fixed
    const earthMass = 10;
    
    // Create attractor joint
    joint = world.createImpulseJoint('attractor', earth, moon, {
      strength: gravityStrength * earthMass,
      range: 100
    });
    
    // Initial orbital velocity
    moon.setLinvel({ x: 0, y: 0, z: initialVelocity }, true);
    
    // Clear trail when orbit is reset
    trail = [];
  }
  
  function updateJoint() {
    if (!joint || !earthRef || !moonRef) return;
    
    const { world } = useRapier();
    
    const earth = world.getRigidBody(earthRef);
    const moon = world.getRigidBody(moonRef);
    
    if (!earth || !moon) return;
    
    // Update attractor strength
    const earthMass = 10;
    joint.configureAttractorJoint({
      strength: gravityStrength * earthMass,
      range: 100
    });
    
    // Update moon mass
    moon.setMass(moonMass);
    
    // Reset velocity if initialVelocity changed
    moon.setLinvel({ x: 0, y: 0, z: initialVelocity }, true);
    
    // Clear trail when parameters change
    trail = [];
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 25, 40]}
  fov={60}
>
  <OrbitControls enableDamping dampingFactor={0.2} />
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight intensity={0.3} />
<T.DirectionalLight intensity={1.5} position={[10, 10, 10]} castShadow />
<T.HemisphereLight args={[0x6666ff, 0x002222, 0.5]} />

<!-- Earth -->
<RigidBody type="fixed" position={[0, 0, 0]} bind:ref={earthRef}>
  <T.Group>
    <T.Mesh castShadow receiveShadow>
      <T.SphereGeometry args={[3, 32, 32]} />
      <T.MeshStandardMaterial 
        color="#1d7ec2" 
        metalness={0.2}
        roughness={0.8}
      />
    </T.Mesh>
    
    <!-- Earth orbit indicator -->
    <T.Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <T.RingGeometry args={[15, 15.2, 64]} />
      <T.MeshBasicMaterial color="#4444aa" transparent opacity={0.3} />
    </T.Mesh>
  </T.Group>
</RigidBody>

<!-- Moon -->
<RigidBody position={[15, 0, 0]} bind:ref={moonRef}>
  <T.Mesh castShadow receiveShadow>
    <T.SphereGeometry args={[0.8 + moonMass * 1.5, 24, 24]} />
    <T.MeshStandardMaterial 
      color="#ccc" 
      metalness={0.1}
      roughness={0.9}
    />
  </T.Mesh>
</RigidBody>

<!-- Orbital trail -->
{#if trail.length > 1}
  <T.Line>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes-position"
        args={[new Float32Array(trail.flatMap(p => [p.x, p.y, p.z])), 3]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="#ccaaff" />
  </T.Line>
{/if}

<!-- Grid helper (only on bottom plane) -->
<Grid 
  position={[0, -5, 0]}
  cellColor="#444466" 
  sectionColor="#6666aa"
  fadeDistance={75}
  cellSize={5}
  sectionSize={25}
/>

<!-- Starfield background -->
<T.Group>
  {#each Array(200) as _, i}
    {@const r = 100}
    {@const theta = Math.random() * Math.PI * 2}
    {@const phi = Math.acos(2 * Math.random() - 1)}
    {@const x = r * Math.sin(phi) * Math.cos(theta)}
    {@const y = r * Math.sin(phi) * Math.sin(theta)}
    {@const z = r * Math.cos(phi)}
    {@const size = Math.random() * 0.2 + 0.05}
    
    <T.Mesh position={[x, y, z]}>
      <T.SphereGeometry args={[size, 8, 8]} />
      <T.MeshBasicMaterial color="#ffffff" />
    </T.Mesh>
  {/each}
</T.Group>