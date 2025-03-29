<!-- src/lib/sims/planet/PlanetSim.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import Scene from './scene/Scene.svelte';
  import Player from './scene/Player.svelte';
  // controls
  import MiniMap from './controls/MiniMap.svelte';
  import ViewControls from './controls/view/ViewControls.svelte';
  import { setContext } from 'svelte';
  
  // Core state using runes
  let showAtmosphere = $state(true);
  let currentScale = $state('planet'); // 'space' | 'planet' | 'atmosphere'
  let showControls = $state(true);
  
  // Functions for context
  function toggleAtmosphere() {
    showAtmosphere = !showAtmosphere;
  }
  
  function setScale(scale) {
    currentScale = scale;
  }
  
  function toggleControls() {
    showControls = !showControls;
  }
  
  // Set up the context for child components
  setContext('planetContext', {
    getScale: () => currentScale,
    getShowAtmosphere: () => showAtmosphere,
    toggleAtmosphere,
    setScale,
    toggleControls
  });
  
  // Handle keyboard shortcuts
  function handleKeydown(event) {
    if (event.key === "c" || event.key === "C") {
      toggleControls();
    }
    
    if (event.key === "a" || event.key === "A") {
      toggleAtmosphere();
    }
    
    if (event.key === "1") setScale('space');
    if (event.key === "2") setScale('planet');
    if (event.key === "3") setScale('atmosphere');
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full h-full">
  <Canvas>
    <Scene 
      scale={currentScale}
      showAtmosphere={showAtmosphere}
    />
  </Canvas>
  
  <!-- Controls Panel - Top Right -->
  <div class="absolute top-4 right-4 z-10">
    <ViewControls />
  </div>
  
  <!-- MiniMap component - Bottom Right -->
  <div class="fixed bottom-24 right-4">
    <MiniMap map={currentScale} />
  </div>
  
  <!-- Time controls - Bottom Center -->
  <Player />
</div>