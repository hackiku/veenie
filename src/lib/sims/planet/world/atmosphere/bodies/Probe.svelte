<!-- src/lib/sims/venus/world/atmosphere/bodies/Probe.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getTemperatureAtAltitude, getPressureAtAltitude } from '../../data/atmosphere';
  import { getWindSpeedAtAltitude } from '../../physics/windModel';
  
  // Props using runes
  let { 
    scale = 0.01,
    altitude = 50,
    position = { lat: 0, lon: 0 } 
  } = $props<{
    scale?: number;
    altitude?: number;
    position?: { lat: number; lon: number };
  }>();
  
  // State
  let temperature = $state(0);
  let pressure = $state(0);
  let windSpeed = $state(0);
  
  // Calculate environmental conditions at current position
  $effect(() => {
    // Get atmospheric conditions at current altitude
    temperature = getTemperatureAtAltitude(altitude);
    pressure = getPressureAtAltitude(altitude);
    windSpeed = getWindSpeedAtAltitude(altitude);
  });
  
  // Convert position to 3D coordinates
  function latLonToCartesian(lat: number, lon: number, alt: number, planetRadius: number): [number, number, number] {
    // Convert to radians
    const latRad = lat * Math.PI / 180;
    const lonRad = lon * Math.PI / 180;
    
    // Calculate position
    const radius = planetRadius + alt;
    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lonRad);
    
    return [x, y, z];
  }
  
  // Venus radius in km
  const venusRadius = 6051.8;
  
  // Calculate probe position
  let probePosition = $derived(latLonToCartesian(
    position.lat,
    position.lon,
    altitude,
    venusRadius
  ));
  
  // Scale position to match scene scale
  let scaledPosition = $derived([
    probePosition[0] * scale,
    probePosition[1] * scale,
    probePosition[2] * scale
  ]);
</script>

<!-- Probe vessel -->
<T.Group position={scaledPosition}>
  <!-- Main probe body -->
  <T.Mesh>
    <T.SphereGeometry args={[0.1 / scale, 16, 16]} />
    <T.MeshStandardMaterial 
      color="#CCCCCC" 
      metalness={0.8}
      roughness={0.2}
    />
  </T.Mesh>
  
  <!-- Solar panels -->
  <T.Mesh rotation={[0, 0, Math.PI / 2]}>
    <T.BoxGeometry args={[0.3 / scale, 0.01 / scale, 0.1 / scale]} />
    <T.MeshStandardMaterial 
      color="#3366CC"
      metalness={0.3}
      roughness={0.5}
    />
  </T.Mesh>
  
  <!-- Antenna -->
  <T.Mesh position={[0, 0.1 / scale, 0]}>
    <T.CylinderGeometry args={[0.01 / scale, 0.01 / scale, 0.2 / scale, 8]} />
    <T.MeshStandardMaterial 
      color="#888888"
      metalness={0.7}
      roughness={0.3}
    />
  </T.Mesh>
  
  <!-- Probe instruments -->
  <T.Mesh position={[0.07 / scale, 0, 0]}>
    <T.BoxGeometry args={[0.05 / scale, 0.05 / scale, 0.05 / scale]} />
    <T.MeshStandardMaterial 
      color="#AAAAAA"
      metalness={0.5}
      roughness={0.5}
    />
  </T.Mesh>
  
  <!-- Small point light for the probe -->
  <T.PointLight 
    args={[0xFFFFFF, 0.5, 1 / scale]} 
    intensity={0.5}
  />
  
  <!-- Label with atmospheric data -->
  <T.Sprite 
    position={[0, 0.3 / scale, 0]}
    scale={[1 / scale, 0.5 / scale, 1]}
  >
    <T.SpriteMaterial 
      color="#FFFFFF"
      transparent={true}
      opacity={0.7}
    />
  </T.Sprite>
</T.Group>