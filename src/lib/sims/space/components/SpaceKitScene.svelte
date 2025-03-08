<!-- src/lib/sims/space/components/SpaceKitScene.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Simple props with proper Svelte 5 syntax
  let { width = window.innerWidth, height = window.innerHeight } = $props();
  
  // DOM reference
  let containerRef;
  let initialized = $state(false);
  let message = $state('SpaceKit will render here once installed');
  
  // Mock SpaceKit initialization for testing
  function initMockSpaceKit() {
    if (!containerRef) return;
    
    // Set mock data
    message = 'SpaceKit placeholder initialized';
    initialized = true;
    
    // In the actual implementation, you would initialize SpaceKit here after installing
    // const Spacekit = await import('spacekit');
    // const simulation = new Spacekit.Simulation(containerRef, {...});
  }
  
  onMount(() => {
    initMockSpaceKit();
    
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div 
  bind:this={containerRef}
  class="spacekit-container"
  style="width: {width}px; height: {height}px;"
>
  <!-- Placeholder content until SpaceKit is installed -->
  {#if !initialized}
    <div class="placeholder">
      <p>Loading SpaceKit...</p>
    </div>
  {:else}
    <div class="placeholder">
      <p>{message}</p>
      <p class="info">This is a placeholder for the SpaceKit.js component</p>
    </div>
  {/if}
</div>

<style>
  .spacekit-container {
    background-color: black;
    position: relative;
    overflow: hidden;
  }
  
  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: monospace;
  }
  
  .info {
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0.7;
  }
</style>