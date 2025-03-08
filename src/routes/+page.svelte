<!-- src/routes/+page.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import SpaceSim from '$lib/sims/space/SpaceSim.svelte';
  // import SimpleScene from '$lib/sims/space/SimpleScene.svelte';
  // import SpaceKitScene from '$lib/sims/space/components/SpaceKitScene.svelte';
  import { onMount } from 'svelte';
  
  // Simple state
  let showThrelte = $state(true);
  let currentTime = $state(new Date());
  
  // Toggle between Threlte and SpaceKit
  function toggleView() {
    showThrelte = !showThrelte;
  }
  
  // Handle keyboard shortcuts
  function handleKeyDown(event) {
    if (event.key === 't' || event.key === 'T') {
      toggleView();
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<SpaceSim />

<div class="min-h-screen bg-black text-white">
  <!-- Visualization container -->
  <div class="fixed inset-0 z-0">
    {#if showThrelte}
      <!-- Threlte scene -->
      <Canvas>
        <!-- <SimpleScene time={currentTime} /> -->
      </Canvas>
    {:else}
      <!-- SpaceKit scene (placeholder) -->
      <!-- <SpaceKitScene /> -->
    {/if}
  </div>
  
  <!-- Simple controls overlay -->
  <div class="fixed bottom-4 left-4 z-10 bg-black/70 p-4 rounded-md border border-purple-900/30">
    <div class="mb-4">
      <button 
        class="px-4 py-2 bg-purple-800 hover:bg-purple-700 rounded-md"
        onclick={toggleView}
      >
        Switch to {showThrelte ? 'SpaceKit' : 'Threlte'}
      </button>
      <div class="text-xs mt-2 text-gray-400">
        Press <kbd class="px-1 bg-gray-800 rounded">T</kbd> to toggle view
      </div>
    </div>
    
    <div class="text-xs text-purple-300 uppercase mt-4">Current Renderer</div>
    <div class="text-lg font-bold">
      {showThrelte ? 'Threlte (Three.js)' : 'SpaceKit.js (Placeholder)'}
    </div>
  </div>
</div>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: black;
  }
</style>