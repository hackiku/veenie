<!-- src/lib/sims/space/components/SpaceSimulation.svelte -->
<script>
  import { T, useFrame } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  
  // Props using Svelte 5 runes
  const time = $props.time || new Date();
  const timeScale = $props.timeScale || 1;
  
  // Internal state
  const simulationTime = $state(0);
  
  // Orbital parameters
  const sunRadius = $state(2);
  const earthRadius = $state(0.6);
  const venusRadius = $state(0.55);
  const earthOrbitRadius = $state(12);
  const venusOrbitRadius = $state(8);
  
  // Animation state
  const venusAngle = $state(0);
  const earthAngle = $state(0);
  const venusRotation = $state(0);
  const earthRotation = $state(0);
  
  // Camera settings
  const cameraPosition = $state({ x: 15, y: 8, z: 15 });
  
  // Calculate positions
  const venusX = $derived(Math.sin(venusAngle) * venusOrbitRadius);
  const venusZ = $derived(Math.cos(venusAngle) * venusOrbitRadius);
  
  const earthX = $derived(Math.sin(earthAngle) * earthOrbitRadius);
  const earthZ = $derived(Math.cos(earthAngle) * earthOrbitRadius);
  
  // Animation loop
  useFrame((_, delta) => {
    // Update simulation time
    simulationTime += delta * timeScale;
    
    // Update planets
    venusAngle = simulationTime * 0.2; // Venus orbits faster
    earthAngle = simulationTime * 0.1;
    
    // Planet rotation
    venusRotation += delta * 0.1 * timeScale; // Slow rotation for Venus
    earthRotation += delta * 0.5 * timeScale; // Earth rotates faster
  });
</script>

<T.PerspectiveCamera
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  fov={60}
  makeDefault
>
  <OrbitControls 
    enableZoom={true}
    enablePan={true}
    enableDamping={true}
    dampingFactor={0.1}
    zoomSpeed={0.5}
  />
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight intensity={0.2} />
<T.PointLight position={[0, 0, 0]} intensity={2} distance={100} decay={0} color="#FFFFFF" />

<!-- Sun -->
<T.Group>
  <T.Mesh>
    <T.SphereGeometry args={[sunRadius, 32, 32]} />
    <T.MeshBasicMaterial color="#FFA500" />
  </T.Mesh>
  <!-- Sun glow -->
  <T.Mesh>
    <T.SphereGeometry args={[sunRadius * 1.05, 32, 32]} />
    <T.MeshBasicMaterial color="#FFA500" transparent={true} opacity={0.3} />
  </T.Mesh>
</T.Group>

<!-- Venus -->
<T.Group position={[venusX, 0, venusZ]}>
  <T.Mesh rotation.y={venusRotation}>
    <T.SphereGeometry args={[venusRadius, 32, 32]} />
    <T.MeshStandardMaterial color="#C9977A" />
  </T.Mesh>
  
  <!-- Venus atmosphere -->
  <T.Mesh>
    <T.SphereGeometry args={[venusRadius * 1.05, 32, 32]} />
    <T.MeshBasicMaterial color="#E3C19F" transparent={true} opacity={0.3} />
  </T.Mesh>
</T.Group>

<!-- Earth -->
<T.Group position={[earthX, 0, earthZ]}>
  <T.Mesh rotation.y={earthRotation}>
    <T.SphereGeometry args={[earthRadius, 32, 32]} />
    <T.MeshStandardMaterial color="#4F73A0" />
  </T.Mesh>
  
  <!-- Earth atmosphere -->
  <T.Mesh>
    <T.SphereGeometry args={[earthRadius * 1.03, 32, 32]} />
    <T.MeshBasicMaterial color="#82AADB" transparent={true} opacity={0.2} />
  </T.Mesh>
</T.Group>

<!-- Orbit paths -->
<T.Group>
  <!-- Venus orbit -->
  <T.LineLoop>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes-position"
        args={[
          Array.from({ length: 64 }, (_, i) => {
            const angle = (i / 64) * Math.PI * 2;
            return [
              Math.sin(angle) * venusOrbitRadius,
              0,
              Math.cos(angle) * venusOrbitRadius
            ];
          }).flat(),
          3
        ]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="#C9977A" opacity={0.3} transparent={true} />
  </T.LineLoop>
  
  <!-- Earth orbit -->
  <T.LineLoop>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes-position"
        args={[
          Array.from({ length: 64 }, (_, i) => {
            const angle = (i / 64) * Math.PI * 2;
            return [
              Math.sin(angle) * earthOrbitRadius,
              0,
              Math.cos(angle) * earthOrbitRadius
            ];
          }).flat(),
          3
        ]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="#4F73A0" opacity={0.3} transparent={true} />
  </T.LineLoop>
</T.Group>

<!-- Stars background -->
<T.Group>
  {#each Array.from({ length: 200 }) as _, i}
    {@const x = (Math.random() - 0.5) * 100}
    {@const y = (Math.random() - 0.5) * 100}
    {@const z = (Math.random() - 0.5) * 100}
    {@const size = Math.random() * 0.1 + 0.05}
    <T.Mesh position={[x, y, z]}>
      <T.SphereGeometry args={[size, 8, 8]} />
      <T.MeshBasicMaterial color="#FFFFFF" />
    </T.Mesh>
  {/each}
</T.Group>