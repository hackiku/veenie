<!-- Scene.svelte - Modified version -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls, Grid } from '@threlte/extras';
  import { useTask } from '@threlte/core';
  import Balloon from './world/Balloon.svelte';
  import Terrain from './world/Terrain.svelte';
  import Clouds from './world/Clouds.svelte';
  import { SIMULATION_CONSTANTS } from './constants';
  
  // Props
  let { 
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 },
    updateTelemetry = (data) => {},
    stepCount = 0,
    running = true,
    singleStep = false
  } = $props();
  
  // Reset flag for restarting components
  let resetSignal = $state(Date.now());
  
  $effect(() => {
    if (stepCount === 0) {
      resetSignal = Date.now();
    }
  });
  
  // Camera/controls references
  let camera = $state(null);
  let controls = $state(null);
  
  // Set up camera for large-scale Venus simulation
  function setupCamera(cameraRef) {
    if (!cameraRef) return;
    camera = cameraRef;
    
    // Adjust camera properties for the scale of Venus
    camera.near = 0.1;
    camera.far = 10000;
    camera.updateProjectionMatrix();
  }
  
  // Configure orbit controls for better usability
  function setupControls(controlsRef) {
    if (!controlsRef) return;
    controls = controlsRef;
    
    // Configure optimal controls for Venus simulation
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 5;
    controls.maxDistance = 1000;
    
    // Initial target at balloon position
    controls.target.set(
      0, 
      SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 
      0
    );
    
    controls.update();
  }
  
  // Frame counter to control physics steps
  let frameCount = 0;
  
  // Handle physics stepping with useFrame
  useTask((_, delta) => {
    // Only increment stepCount when:
    // 1. Running is true
    // 2. OR singleStep is true (which will be reset after one step)
    if (running || singleStep) {
      frameCount++;
      
      // Perform step every N frames (for slower physics)
      // or immediately if singleStep is true
      if (frameCount >= 2 || singleStep) {
        if (!singleStep) {
          stepCount++;
        }
        frameCount = 0;
      }
    }
  });
</script>

<!-- Camera with improved settings -->
<T.PerspectiveCamera 
  position={[-40, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT + 20, 40]} 
  fov={70} 
  near={0.1} 
  far={10000}
  makeDefault
  oncreate={setupCamera}
>
  <OrbitControls 
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    oncreate={setupControls}
  />
</T.PerspectiveCamera>

<!-- Lighting -->
<T.DirectionalLight 
  position={[50, 100, 50]} 
  intensity={1.5} 
  castShadow 
/>
<T.AmbientLight intensity={0.5} />

<!-- Venus atmosphere color -->
<T.FogExp2 color="#FFE0B2" density={0.00005} />

<!-- Components -->
<Balloon 
  updateTelemetry={updateTelemetry} 
  resetSignal={resetSignal} 
  running={running}
  singleStep={singleStep}
/>

<Terrain />

<Clouds 
  running={running} 
  singleStep={singleStep}
  resetSignal={resetSignal}
/>

<!-- Additional grid for orientation at balloon height -->
<Grid 
  position={[0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
  cellSize={10}
  sectionSize={50}
  cellColor="#666666"
  sectionColor="#444444"
  fadeDistance={200}
  infiniteGrid={false}
/>