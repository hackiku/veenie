<!-- src/lib/sims/space/Scene.svelte -->
<script>
  import { T, useTask } from '@threlte/core';
  import { interactivity } from '@threlte/extras';
  import SpaceKitSim from './SpaceKitSim.svelte';
  
  // Props using runes
  let { initialFocus = 'earth', simulationSpeed = 1 } = $props();
  
  // Export spacekit methods for parent component
  let spaceKitRef;
  
  // Enable interactivity for Threlte
  interactivity();
  
  // Setup the scene - default camera position etc.
  let cameraRef;
  
  // Make methods accessible to parent
  $effect(() => {
    return {
      focusOnPlanet: (planetName) => {
        spaceKitRef?.methods.focusOnPlanet(planetName);
      },
      setSimulationSpeed: (speed) => {
        spaceKitRef?.methods.setSimulationSpeed(speed);
      }
    };
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

<!-- SpaceKit component that will render within the Threlte scene -->
<SpaceKitSim 
  bind:this={spaceKitRef}
  {initialFocus}
  {simulationSpeed}
/>