<!-- src/lib/sims/flight/scene/SunLight.svelte -->

<script>
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Light properties using runes with $props()
  const props = $state({
    intensity: 1.2,
    color: "#fffcee", // Slightly yellowish sun color
    castShadow: true
  });
  
  // Venus has a very slow day - we'll speed it up for simulation purposes
  // Venus rotates once every 243 Earth days
  const rotationPeriod = 24 * 60 * 60; // Simplified to 24 hours for visualization
  
  // Sun position will change based on time
  let sunPosition = $state([100, 100, 100]);
  
  // Subscribe to time changes using derived
  const time = $derived(flightStore.time);
  
  // Update sun position based on time with effect
  $effect(() => {
    // Calculate angle based on time (full circle in rotationPeriod seconds)
    const angle = (time / rotationPeriod) * Math.PI * 2;
    
    // Move sun in a circle around the scene
    sunPosition = [
      Math.cos(angle) * 100,
      50,
      Math.sin(angle) * 100
    ];
  });
  
  // Shadow map size for better quality shadows
  const shadowMapSize = 2048;
</script>

<!-- Directional light (Sun) -->
<T.DirectionalLight 
  position={sunPosition} 
  intensity={props.intensity}
  color={props.color}
  castShadow={props.castShadow}
>
  <!-- Configure shadow properties -->
  <T.Object3D 
    slot="shadow-camera"
    oncreate={(ref) => {
      // Configure shadow camera
      ref.left = -50;
      ref.right = 50;
      ref.top = 50;
      ref.bottom = -50;
      ref.near = 0.1;
      ref.far = 500;
    }}
  />
</T.DirectionalLight>

<!-- Ambient light (Scattered light) -->
<T.AmbientLight intensity={0.3} color="#ffedcc" />

<!-- Hemisphere light (Sky/ground light) -->
<T.HemisphereLight 
  skyColor="#ffedaa" 
  groundColor="#e6c973"
  intensity={0.5} 
/>