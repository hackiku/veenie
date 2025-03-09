<!-- src/lib/sims/flight/scene/SunLight.svelte -->

<script>
  import { T } from "@threlte/core";
  
  // Light properties using runes
  const directionalLight = $state({
    position: [-200, 300, 100],
    intensity: 1.2,
    color: "#fff1e0", // Slightly warmer sunlight filtered through Venus atmosphere
    castShadow: true,
    // Shadow properties
    shadow: {
      mapSize: [2048, 2048],
      camera: {
        left: -100,
        right: 100,
        top: 100,
        bottom: -100,
        near: 0.5,
        far: 500
      }
    }
  });
  
  const ambientLight = $state({
    intensity: 0.6, // Stronger ambient light due to atmospheric scattering
    color: "#ffebc3" // Warmer ambient light (yellowish) for Venus
  });
  
  // Hemisphere light to simulate atmospheric light scattering
  const hemisphereLight = $state({
    skyColor: "#ffcc66", // Yellowish light from above (Venus sky)
    groundColor: "#ff9933", // Orange-ish reflection from surface
    intensity: 0.8
  });
</script>

<!-- Main directional light representing filtered sunlight -->
<T.DirectionalLight 
  position={directionalLight.position} 
  intensity={directionalLight.intensity}
  color={directionalLight.color}
  castShadow={directionalLight.castShadow}
  shadow-mapSize={directionalLight.shadow.mapSize}
  shadow-camera-left={directionalLight.shadow.camera.left}
  shadow-camera-right={directionalLight.shadow.camera.right}
  shadow-camera-top={directionalLight.shadow.camera.top}
  shadow-camera-bottom={directionalLight.shadow.camera.bottom}
  shadow-camera-near={directionalLight.shadow.camera.near}
  shadow-camera-far={directionalLight.shadow.camera.far}
/>

<!-- Ambient light for base illumination -->
<T.AmbientLight 
  intensity={ambientLight.intensity}
  color={ambientLight.color}
/>

<!-- Hemisphere light for atmospheric scattering -->
<T.HemisphereLight
  skyColor={hemisphereLight.skyColor}
  groundColor={hemisphereLight.groundColor}
  intensity={hemisphereLight.intensity}
/>