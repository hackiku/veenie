<!-- src/lib/sims/flight/scene/terrain/ProceduralTerrain.svelte -->

<script>
  import { T } from "@threlte/core";
  import { RigidBody, Collider } from "@threlte/rapier";
  import { onMount } from "svelte";
  
  // Props
  let { 
    size = 1000,          // Size of the terrain (width and depth)
    altitude = 0,         // Altitude of the terrain surface (0 for Venus surface)
    color = "#FF8C00",    // Base color (matching Venus)
    opacity = 0.8,        // Opacity of the terrain
    segments = 64,        // Detail level (more segments = more detailed terrain)
    heightScale = 2,      // Maximum height variation
    smoothness = 0.2,     // How smooth the terrain is (lower = more jagged)
    seed = 12345,         // Random seed for reproducible terrain
    receiveShadow = true, // Whether terrain receives shadows
  } = $props();
  
  // Position calculation (centered at 0,0,0 with y at the specified altitude)
  const position = $derived([0, altitude, 0]);
  
  // Scale to match the specified size
  const scale = $derived([size, 1, size]);
  
  // Reference to the geometry for modifying vertices
  let planeGeometryRef;
  
  // Simple pseudo-random function with seed
  function seededRandom(x, y) {
    const dot = x * 12.9898 + y * 78.233 + seed;
    return Math.abs(Math.sin(dot) * 43758.5453) % 1;
  }
  
  // Generate simplex-like noise (a very simplified version)
  function noise(x, y) {
    // Get integer and fractional parts
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    
    // Get values at corners of the cell
    const n00 = seededRandom(xi, yi);
    const n01 = seededRandom(xi, yi + 1);
    const n10 = seededRandom(xi + 1, yi);
    const n11 = seededRandom(xi + 1, yi + 1);
    
    // Smooth interpolation function
    const smooth = (t) => t * t * (3 - 2 * t);
    
    // Interpolate along x
    const nx0 = n00 + smooth(xf) * (n10 - n00);
    const nx1 = n01 + smooth(xf) * (n11 - n01);
    
    // Interpolate along y
    return nx0 + smooth(yf) * (nx1 - nx0);
  }
  
  // Apply multiple octaves of noise for more natural look
  function generateHeight(x, y) {
    let amplitude = 1;
    let frequency = 1;
    let value = 0;
    
    for (let i = 0; i < 3; i++) { // Use 3 octaves
      value += amplitude * noise(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency /= smoothness;
    }
    
    return value * heightScale;
  }
  
  // Generate the height map after component mounts
  onMount(() => {
    if (!planeGeometryRef) return;
    
    // Modify the vertices of the geometry to create terrain
    const vertices = planeGeometryRef.attributes.position.array;
    
    for (let i = 0; i < vertices.length; i += 3) {
      // x and z are the original coordinates, scaled to terrain size
      const x = vertices[i] + 0.5; // Convert from -0.5-0.5 to 0-1 range
      const z = vertices[i+2] + 0.5;
      
      // Calculate a height value using our noise function
      const height = generateHeight(x, z);
      
      // Apply the height to the y coordinate
      vertices[i+1] = height;
    }
    
    // Tell Three.js the vertices have been updated
    planeGeometryRef.attributes.position.needsUpdate = true;
    
    // Recalculate normals for proper lighting
    planeGeometryRef.computeVertexNormals();
  });
</script>

<!-- Terrain is static (fixed) so it doesn't move with physics -->
<RigidBody type="fixed" position={position}>
  <!-- For simplicity, we use a single flat collider
       In a more advanced version, you'd generate a trimesh collider
       that matches your terrain's exact shape -->
  <Collider shape="cuboid" args={[size/2, heightScale/2, size/2]} />
  
  <!-- Visual representation of the terrain -->
  <T.Group scale={scale}>
    <!-- Main terrain mesh -->
    <T.Mesh rotation={[-Math.PI/2, 0, 0]} {receiveShadow}>
      <T.PlaneGeometry bind:ref={planeGeometryRef} args={[1, 1, segments, segments]} />
      <T.MeshStandardMaterial 
        {color}
        {opacity}
        transparent={true}
        roughness={0.9}
        metalness={0.1}
      />
    </T.Mesh>
  </T.Group>
</RigidBody>