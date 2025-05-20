<!-- src/lib/sims/balloon/ui/PlayPause.svelte (simplified) -->
<script lang="ts">
  import { getPhysicsEngine } from '../physics/engine';
  import { getContext } from 'svelte';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Props for simulation control
  let {
    running = true,
    stepCount = 0,
    toggleSimulation = () => {},
    doSingleStep = () => {},
    restartSimulation = () => {}
  } = $props();
  
  // Simulation time tracking (internal to component)
  let simulationTime = $state(0);
  let timeScale = $state(1.0);
  let lastUpdateTime = $state(performance.now());
  
  // Update time when running
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    let frameId: number;
    
    function updateTime() {
      if (running) {
        const now = performance.now();
        const delta = (now - lastUpdateTime) / 1000;
        lastUpdateTime = now;
        
        // Update total time
        simulationTime += delta * timeScale;
        
        frameId = requestAnimationFrame(updateTime);
      }
    }
    
    if (running) {
      frameId = requestAnimationFrame(updateTime);
    }
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  });
  
  // Format time as hh:mm:ss
  function formatTime(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Time speed controls
  function setTimeSpeed(speed: number) {
    timeScale = speed;
  }
  
  // Reset time
  function resetTime() {
    simulationTime = 0;
    lastUpdateTime = performance.now();
  }
  
  // Handle button clicks
  function handleToggleClick() {
    lastUpdateTime = performance.now(); // Reset time to prevent jumps
    toggleSimulation();
  }
  
  function handleStepClick() {
    if (!running) {
      doSingleStep();
      simulationTime += 1/60; // Add one frame worth of time
    }
  }
  
  function handleResetClick() {
    restartSimulation();
    resetTime();
  }
  
  // Listen for keyboard shortcuts
  function handleKeyDown(e) {
    // Speed controls with Ctrl+number keys
    if (e.ctrlKey) {
      if (e.key === '1') setTimeSpeed(0.25);
      if (e.key === '2') setTimeSpeed(0.5);
      if (e.key === '3') setTimeSpeed(1.0);
      if (e.key === '4') setTimeSpeed(2.0);
      if (e.key === '5') setTimeSpeed(5.0);
    }
  }
  
  // Set up keyboard listeners for time scale
  import { onMount } from 'svelte';
  
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="flex flex-col space-y-2">
  <!-- Main controls -->
  <div class="flex space-x-2 text-xs">
    <button
      class="px-3 py-2 {running ? 'bg-blue-700/80 hover:bg-blue-700' : 'bg-green-700/80 hover:bg-green-700'} rounded font-medium flex items-center gap-2 text-white"
      onclick={handleToggleClick}
    >
      {#if running}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span>{formatTime(simulationTime)}</span>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Play</span>
      {/if}
    </button>

    <button
      class="px-3 py-2 bg-gray-700/80 hover:bg-gray-700 rounded font-medium flex items-center gap-2 text-white {running ? 'opacity-50 cursor-not-allowed' : ''}"
      onclick={handleStepClick}
      disabled={running}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
        <line x1="19" y1="12" x2="5" y2="12"></line>
      </svg>
      <span>Step</span>
    </button>

    <button
      class="px-3 py-2 bg-red-700/80 hover:bg-red-700 rounded font-medium flex items-center gap-2 text-white"
      onclick={handleResetClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
      </svg>
      <span>Reset</span>
    </button>
  </div>
  
  <!-- Time speed controls -->
  <div class="flex space-x-1 text-xs">
    <span class="text-white/60 flex items-center mr-1">Speed:</span>
    {#each [0.25, 0.5, 1, 2, 5] as speed}
      <button 
        class="px-2 py-1 rounded {timeScale === speed ? 'bg-blue-600' : 'bg-gray-700/80'} text-white text-xs"
        onclick={() => setTimeSpeed(speed)}
      >
        {speed}x
      </button>
    {/each}
  </div>

  <div class="text-xs text-center mt-1 text-white/60">
    Space to {running ? 'pause' : 'play'} | S to step | Ctrl+R to reset | Ctrl+1-5 for speed
  </div>
</div>