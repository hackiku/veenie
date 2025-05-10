<!-- src/lib/sims/material/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'
  import { getSimulationContext } from './contexts/simulationContext.svelte';
  import { onMount } from 'svelte';

  import Terrain from './world/Terrain.svelte'
  import Balloon from './world/Balloon.svelte'
  
  // Get simulation context for balloon tracking
  const sim = getSimulationContext();
  
  // Initial camera position near balloon's starting point
  const initialCameraPosition = [20, 51060, 160];
  
  // References for camera and controls management
  let camera = $state(null);
  let controls = $state(null);
  
  // Helper function to set up camera
  function setupCamera(cameraRef) {
    if (!cameraRef) return;
    camera = cameraRef;
    
    // Set near and far planes for high altitude viewing
    camera.near = 0.1;
    camera.far = 200000;
    camera.updateProjectionMatrix();
    
    // Initial targeting
    const balloonPos = sim?.getPosition() || [0, 51000, 0];
    camera.lookAt(balloonPos[0], balloonPos[1], balloonPos[2]);
  }
  
  // Helper function to set up controls
  function setupControls(controlsRef) {
    if (!controlsRef) return;
    controls = controlsRef;
    
    // Configure controls for high-altitude simulation
    // Set target to balloon position rather than origin
    const balloonPos = sim?.getPosition() || [0, 51000, 0];
    controls.target.set(balloonPos[0], balloonPos[1], balloonPos[2]);
    
    // Adjust orbit controls parameters for high altitude
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.enableDamping = true;
    controls.dampingFactor = 0.35;
    
    // Force update
    controls.update();
  }
  
  // Track balloon and update camera target when it moves significantly
  const trackBalloon = () => {
    if (!controls || !sim) return;
    
    // Get current balloon position
    const balloonPos = sim.getPosition();
    
    // Calculate distance from current target to balloon
    const distanceSquared = 
      Math.pow(controls.target.x - balloonPos[0], 2) + 
      Math.pow(controls.target.y - balloonPos[1], 2) + 
      Math.pow(controls.target.z - balloonPos[2], 2);
    
    // If balloon moved significantly, update camera target
    if (distanceSquared > 2500) { // 50 units threshold
      controls.target.set(balloonPos[0], balloonPos[1], balloonPos[2]);
      controls.update();
    }
  };
  
  // Set up tracking interval
  onMount(() => {
    const interval = setInterval(trackBalloon, 1000); // Update every second
    
    return () => {
      clearInterval(interval);
    };
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={initialCameraPosition}
  fov={60}
  aspect={window.innerWidth/window.innerHeight}
  near={0.1}
  far={200000}
  oncreate={setupCamera}
>
  {#snippet children({ ref })}
    <OrbitControls 
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      oncreate={setupControls}
    >
      <Gizmo />
    </OrbitControls>
  {/snippet}
</T.PerspectiveCamera>

<!-- Lights -->
<T.DirectionalLight
  castShadow
  position={[8, 51020, -3]}
  intensity={1.5}
/>

<T.AmbientLight intensity={0.9} />

<!-- Venus atmosphere color -->
<T.FogExp2 color="#FFE0B2" density={0.00001} />

<!-- Add balloon and terrain components -->
<Balloon />
<Terrain />