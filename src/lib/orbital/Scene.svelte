<!-- lib/orbital/Scene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { onMount } from 'svelte';
  
  // Reactive scroll position passed from parent
  export let scrollY = 0;
  export let totalSections = 7; // Total number of sections for timeline
  
  // Calculate which section we're in based on scroll
  $: sectionIndex = Math.min(
    Math.floor(scrollY / (window.innerHeight * 0.8)), 
    totalSections - 1
  );
  
  // Venus orbit parameters
  const venusOrbitRadius = 10;
  const venusSize = 0.8;
  const sunSize = 3;
  
  // Animation state
  let venusRotation = 0;
  let cameraPosition = { x: 20, y: 5, z: 20 };
  
  // Animation loop
  onMount(() => {
    const animate = () => {
      venusRotation += 0.001;
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      // Cleanup if needed
    };
  });
  
  // Calculate Venus position
  $: venusX = Math.sin(venusRotation) * venusOrbitRadius;
  $: venusZ = Math.cos(venusRotation) * venusOrbitRadius;
  
  // Camera positions for each section
  const cameraPoses = [
    { x: 20, y: 5, z: 20 }, // Initial overview
    { x: 15, y: 3, z: 15 }, // Test pilot section
    { x: 10, y: 2, z: 8 },  // Infrastructure section
    { x: 5, y: 1, z: 5 },   // Manufacturing section
    { x: 8, y: 2, z: 8 },   // Fuel depots section
    { x: 12, y: 3, z: 12 }, // Logistics section
    { x: 20, y: 5, z: 20 }  // Conclusion section
  ];
  
  // Update camera based on section
  $: if (sectionIndex >= 0 && sectionIndex < cameraPoses.length) {
    cameraPosition = cameraPoses[sectionIndex];
  }
</script>

<T.PerspectiveCamera 
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]} 
  fov={60}
  makeDefault
>
  <OrbitControls enableZoom={false} enablePan={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 10]} intensity={1.5} />
<T.AmbientLight intensity={0.2} />

<!-- Sun -->
<T.Group>
  <T.Mesh>
    <T.SphereGeometry args={[sunSize, 32, 32]} />
    <T.MeshStandardMaterial color="#FFA500" emissive="#FF4500" emissiveIntensity={0.5} />
  </T.Mesh>
</T.Group>

<!-- Venus -->
<T.Group position={[venusX, 0, venusZ]}>
  <T.Mesh>
    <T.SphereGeometry args={[venusSize, 32, 32]} />
    <T.MeshStandardMaterial color="#C9977A" />
  </T.Mesh>
</T.Group>

<!-- Optional: Orbit path visualization -->
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

		<T.LineBasicMaterial color="#ffffff" opacity={0.2} transparent={true} />
  </T.LineLoop>
<!-- </T.Group> -->