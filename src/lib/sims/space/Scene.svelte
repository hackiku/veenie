<!-- src/lib/sims/space/Scene.svelte -->
<script>
  import { T, useThrelte } from '@threlte/core';
  import { interactivity } from '@threlte/extras';
  import SpaceKitSim from './SpaceKitSim.svelte';
  
  // Props using runes
  let { initialFocus = 'earth', simulationSpeed = 1 } = $props();
  
  // Export SpaceKit methods for parent component
  let spaceKitRef = $state(null);
  
  // Camera reference with $state for proper reactivity
  let cameraRef = $state(null);
  
  // Enable interactivity for Threlte
  interactivity();
  
  // Get Threlte context
  const { scene, camera, renderer } = useThrelte();
  
  // Make methods accessible to parent
  const methods = $derived(() => {
    if (!spaceKitRef) return {};
    
    return {
      focusOnPlanet: (planetName) => {
        spaceKitRef.methods?.focusOnPlanet(planetName);
      },
      setSimulationSpeed: (speed) => {
        spaceKitRef.methods?.setSimulationSpeed(speed);
      }
    };
  });
  
  // Expose methods to parent components
  $effect(() => {
    return methods;
  });
</script>

<!-- Setting up a basic Threlte scene with camera -->
<T.PerspectiveCamera
  makeDefault
  bind:ref={cameraRef}
  position={[0, 50, 100]}
  fov={45}
  near={0.1}
  far={1000}
/>

<!-- Ambient light to ensure basic illumination -->
<T.AmbientLight intensity={0.3} />

<!-- Add a directional light to simulate the sun -->
<T.DirectionalLight 
  position={[5, 5, 5]} 
  intensity={0.8} 
  castShadow 
/>

<!-- SpaceKit component that will render within the Threlte scene -->
<div class="absolute inset-0 z-0">
  <SpaceKitSim 
    bind:this={spaceKitRef}
    {initialFocus}
    {simulationSpeed}
  />
</div>