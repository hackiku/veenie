<!-- src/lib/sims/flight/scene/terrain/Terrain.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider } from "@threlte/rapier";
  
  // Props
  let { 
    size = 1000,        // Size of the terrain (width and depth)
    altitude = 0,       // Altitude of the terrain surface (should be 0 for Venus surface)
    color = "#FF8C00",  // Surface color (matching Venus surface color from your constants)
    opacity = 0.8,      // Opacity of the terrain
    segments = 64,      // Detail level of the terrain mesh
    receiveShadow = true, // Whether terrain receives shadows
  } = $props();
  
  // Position calculation (centered at 0,0,0 with y at the specified altitude)
  const position = $derived([0, altitude, 0]);
  
  // Scale to match the specified size (Three.js PlaneGeometry is 1x1 by default)
  const scale = $derived([size, 1, size]);
</script>

<!-- Terrain is static (fixed) so it doesn't move with physics -->
<RigidBody type="fixed" position={position}>
  <!-- Collider matches the visual terrain exactly -->
  <Collider shape="cuboid" args={[size/2, 0.5, size/2]} />
  
  <!-- Visual representation of the terrain -->
  <T.Group scale={scale}>
    <!-- Main terrain mesh -->
    <T.Mesh rotation={[-Math.PI/2, 0, 0]} {receiveShadow}>
      <T.PlaneGeometry args={[1, 1, segments, segments]} />
      <T.MeshStandardMaterial 
        {color}
        {opacity}
        transparent={true}
        roughness={0.9}
        metalness={0.1}
      />
    </T.Mesh>
    
    <!-- Visual grid overlay - subtle grid for orientation -->
    <T.Mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 0]}>
      <T.PlaneGeometry args={[1, 1]} />
      <T.MeshBasicMaterial 
        wireframe={true}
        color="#FFFFFF"
        opacity={0.1}
        transparent={true}
      />
    </T.Mesh>
  </T.Group>
</RigidBody>