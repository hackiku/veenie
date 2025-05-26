<!-- src/lib/sims/balloon/venus/PlayPause.svelte -->
<script lang="ts">
  import { getPhysicsEngine } from '../../physics/engine';
  
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
  
  // Format time as hh:mm:ss
  function formatTime(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Convert step count to simulation time (assuming each step is 1/60th of a second)
  function getSimulationTime(): number {
    return stepCount / 60;
  }
  
  // Handle button clicks
  function handleToggleClick() {
    toggleSimulation();
  }
  
  function handleStepClick() {
    if (!running) {
      doSingleStep();
    }
  }
  
  // Handle keyboard shortcuts using the $effect pattern
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleSimulation();
      } else if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        restartSimulation();
      } else if (e.key === 's' && !running) {
        e.preventDefault();
        doSingleStep();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

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
      <span>{formatTime(getSimulationTime())}</span>
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
    onclick={restartSimulation}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
    </svg>
    <span>Reset</span>
  </button>
</div>

<div class="text-xs text-center mt-2 text-white/60">
  Space to {running ? 'pause' : 'play'} | S to step | Ctrl+R to reset
</div>