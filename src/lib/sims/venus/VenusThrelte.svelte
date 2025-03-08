<!-- src/lib/sims/venus/VenusThrelte.svelte -->
<script>
  import { T, useFrame, useTask } from '@threlte/core';
  import { interactivity, OrbitControls } from '@threlte/extras';
  import { onMount } from 'svelte';
  import { Spring } from 'svelte/motion';
  import * as THREE from 'three';
  
  interactivity();
  
  // Venus properties
  const venusRadius = 6051.8; // km
  const venusScale = 0.01; // Scale factor to make it reasonable in scene
  const scaledVenusRadius = venusRadius * venusScale;
  
  // Habitat properties
  const habitatRadius = 100 * venusScale; // 100m radius scaled
  let habitatAltitude = 55000 * venusScale; // ~55km altitude (cloud layer)
  
  // Animation properties
  let venusRotation = 0;
  let habitatOrbit = 0;
  let simTime = 0;
  const habitatSpring = new Spring({ x: 0, y: habitatAltitude + scaledVenusRadius, z: 0 });
  let habitatPosition = { x: 0, y: habitatAltitude + scaledVenusRadius, z: 0 };
  
  // Venus atmosphere layers
  const atmosphereLayers = [
    { altitude: 35000 * venusScale, color: '#996633', opacity: 0.2 }, // Lower haze
    { altitude: 50000 * venusScale, color: '#cc9933', opacity: 0.3 }, // Main clouds
    { altitude: 60000 * venusScale, color: '#ffcc66', opacity: 0.2 }, // Upper haze
    { altitude: 70000 * venusScale, color: '#ffffcc', opacity: 0.1 }  // Mesosphere
  ];
  
  // Venus texture loading
  let venusTexture;
  onMount(() => {
    const textureLoader = new THREE.TextureLoader();
    venusTexture = textureLoader.load('https://raw.githubusercontent.com/typpo/spacekit/master/src/assets/planets/venus.jpg');
  });
  
  // Create a simple density model of Venus atmosphere
  function getAtmosphericDensity(altitude) {
    // Very simplified model based on Venus altitude
    // 0km: ~65 kg/m³
    // 50km: ~1.6 kg/m³
    // 100km: ~0.0001 kg/m³
    const normalizedAlt = altitude / venusScale / 1000; // get altitude in km
    return 65 * Math.exp(-normalizedAlt / 15);
  }
  
  // Calculate buoyancy force based on displacement and atmospheric density
  function calculateBuoyancy(altitude) {
    const atmosphericDensity = getAtmosphericDensity(altitude);
    
    // LOX/CH4 bladder - assume 1:3.5 ratio for Mars ascent
    const oxygenDensity = 1.141; // g/cm³
    const methaneDensity = 0.42; // g/cm³
    const blendedDensity = (oxygenDensity + 3.5 * methaneDensity) / 4.5;
    
    // Structure mass (rough estimate)
    const structuralMass = 0.2; // g/cm³
    
    // Total effective density of habitat
    const effectiveDensity = blendedDensity + structuralMass;
    
    // Buoyancy factor (>1 means it floats, <1 means it sinks)
    return atmosphericDensity / effectiveDensity;
  }
  
  useTask((delta) => {
    // Update simulation time
    simTime += delta;
    
    // Slow Venus rotation (243 Earth days retrograde)
    venusRotation -= delta * 0.001;
    
    // Update habitat position
    habitatOrbit += delta * 0.05;
    
    // Calculate buoyancy at current altitude
    const buoyancyFactor = calculateBuoyancy(habitatPosition.y - scaledVenusRadius);
    
    // Apply simple physics to habitat (buoyancy vs gravity)
    const buoyancyForce = (buoyancyFactor - 1) * 0.01;
    
    // Update habitat altitude based on buoyancy
    habitatPosition.y += buoyancyForce;
    habitatPosition.x = Math.sin(habitatOrbit) * (habitatPosition.y * 0.2);
    habitatPosition.z = Math.cos(habitatOrbit) * (habitatPosition.y * 0.2);
    
    // Update spring target for smooth animation
    habitatSpring.set(habitatPosition);
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, scaledVenusRadius * 3, scaledVenusRadius * 5]}
  fov={50}
>
  <OrbitControls enableDamping target={[0, scaledVenusRadius, 0]} />
</T.PerspectiveCamera>

<!-- Ambient and directional light (sun) -->
<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[1, 0.5, 2]} intensity={1} castShadow />

<!-- Venus planet -->
<T.Group rotation.y={venusRotation}>
  <T.Mesh position.y={0}>
    <T.SphereGeometry args={[scaledVenusRadius, 64, 64]} />
    <T.MeshStandardMaterial color="#e6c389" map={venusTexture} />
  </T.Mesh>

  <!-- Atmosphere layers -->
  {#each atmosphereLayers as layer}
    <T.Mesh>
      <T.SphereGeometry args={[scaledVenusRadius + layer.altitude, 64, 32]} />
      <T.MeshBasicMaterial 
        color={layer.color}
        transparent={true}
        opacity={layer.opacity}
        side={THREE.BackSide}
      />
    </T.Mesh>
  {/each}
</T.Group>

<!-- LOX/CH4 Habitat -->
<T.Mesh position={[habitatSpring.current.x, habitatSpring.current.y, habitatSpring.current.z]}>
  <T.SphereGeometry args={[habitatRadius, 16, 16]} />
  <T.MeshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.2} />
  
  <!-- Simple representation of solar panels -->
  <T.Mesh position={[habitatRadius * 1.2, 0, 0]} rotation.z={Math.PI / 2}>
    <T.BoxGeometry args={[habitatRadius * 2, habitatRadius * 0.1, habitatRadius]} />
    <T.MeshStandardMaterial color="#1a75ff" metalness={0.9} roughness={0.1} />
  </T.Mesh>
  
  <!-- Simple representation of LOX/CH4 tanks -->
  <T.Mesh position={[0, -habitatRadius * 0.8, 0]}>
    <T.CylinderGeometry args={[habitatRadius * 0.4, habitatRadius * 0.4, habitatRadius * 1.2, 16]} />
    <T.MeshStandardMaterial color="#b3b3b3" metalness={0.7} roughness={0.3} />
  </T.Mesh>
</T.Mesh>

<!-- Simple stars background -->
<T.Points>
  <T.BufferGeometry>
    <T.Float32BufferAttribute 
      attach="attributes-position" 
      args={[Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 10000), 3]} 
    />
  </T.BufferGeometry>
  <T.PointsMaterial size={2} color="#ffffff" />
</T.Points>