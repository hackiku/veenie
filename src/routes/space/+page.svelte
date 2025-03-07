<!-- src/routes/space/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import SpaceKitScene from '$lib/sims/space/components/SpaceKitScene.svelte';
  import TimeControl from '$lib/orbital/gui/TimeControl.svelte';
  
  // State
  let currentTime = new Date();
  let timeScale = 1;
  let showControls = true;
  
  // Handle time control changes
  function handleTimeChange(event: CustomEvent<{time: Date, scale: number}>) {
    currentTime = event.detail.time;
    timeScale = event.detail.scale;
  }
  
  // Toggle UI controls with keypress
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'h' || event.key === 'H') {
      showControls = !showControls;
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<svelte:head>
  <title>Venus Mission Simulation</title>
</svelte:head>

<!-- Full screen simulation view -->
<div class="simulation-container">
  <SpaceKitScene
    currentTime={currentTime}
    timeScale={timeScale}
    fullscreen={true}
  />
  
  <!-- Overlay UI elements -->
  {#if showControls}
    <div class="ui-container" transition:fade={{ duration: 300 }}>
      <!-- Mission information panel -->
      <div class="info-panel">
        <h1 class="text-2xl font-bold text-white mb-2">Venus Mission Simulation</h1>
        <p class="text-gray-300 text-sm mb-4">
          Simulating the trajectory of our test pilot probe to Venus.
          The mission will deploy an intelligent edge-AI system to narrate
          its experiences in real-time.
        </p>
        
        <div class="text-xs text-purple-300 uppercase">Mission Status</div>
        <div class="text-xl text-green-400">In Progress</div>
        
        <div class="mt-8 text-xs text-gray-400">
          Press <kbd>H</kbd> to toggle UI visibility
        </div>
      </div>
      
      <!-- Time controls -->
      <div class="time-controls">
        <TimeControl
          currentTime={currentTime}
          timeScale={timeScale}
          on:timeChange={handleTimeChange}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  /* Make sure the container takes full screen */
  :global(body, html) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: black;
  }
  
  .simulation-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .ui-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow clicks to pass through to the simulation */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
  }
  
  .info-panel {
    pointer-events: auto; /* Make this element clickable */
    background: rgba(10, 10, 30, 0.7);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 8px;
    max-width: 26rem;
    border: 1px solid rgba(139, 92, 246, 0.3);
  }
  
  .time-controls {
    pointer-events: auto; /* Make this element clickable */
    align-self: flex-start;
  }
  
  kbd {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-family: monospace;
  }
</style>