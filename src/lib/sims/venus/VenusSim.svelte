<!-- src/lib/sims/venus/VenusSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './world/Scene.svelte';
  import { createVenusTime } from './context/time.svelte';
  
  // UI Components
  import TimeControls from './ui/time/TimeControls.svelte';
  
  // Create Venus time system with 1 hour per second as base unit
  const venusTime = createVenusTime({
    startDate: new Date('2025-01-01T12:00:00Z'),
    initialTimeScale: 3600, // 1 hour per second (base unit)
    enableKeyboard: false // Disabled here, handled in TimeControls
  });
  
  // State for coordinate grid
  let showCoordinateGrid = $state(true);
  
  // Toggle coordinate grid with 'G' key
  $effect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        showCoordinateGrid = !showCoordinateGrid;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<div class="relative w-full h-screen overflow-hidden bg-black">
  <!-- 3D Scene -->
  <Canvas>
    <Scene 
      {venusTime}
      {showCoordinateGrid}
    />
  </Canvas>
  
  <!-- Time Controls (Bottom Center) -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
    <TimeControls />
  </div>
  
  <!-- Simple dev info (Bottom Left) -->
  {#if import.meta.env.DEV}
    <div class="absolute bottom-4 left-4 bg-black/60 text-white p-3 rounded text-xs font-mono z-20">
      <div class="text-yellow-300 font-bold mb-1">🪐 Venus Dev Info</div>
      <div>Playing: {venusTime.state.isPlaying ? 'Yes' : 'No'}</div>
      <div>Time Scale: {venusTime.state.timeScale}x</div>
      <div>Venus Rotation: {venusTime.state.venusRotation.toFixed(1)}°</div>
      <div>Real Time: {venusTime.state.realTime.toFixed(1)}s</div>
      <div>Grid: {showCoordinateGrid ? 'On' : 'Off'} (Press 'G')</div>
    </div>
  {/if}
  
  <!-- Keyboard shortcuts info -->
  {#if import.meta.env.DEV}
    <div class="absolute top-4 left-4 bg-black/40 text-white p-2 rounded text-xs z-10">
      <div class="text-yellow-300 font-semibold mb-1">Keyboard:</div>
      <div>Space: Play/Pause</div>
      <div>Ctrl+R: Reset Time</div>
      <div>G: Toggle Grid</div>
      <div>C: Reset Camera</div>
      <div>1/2/3: Camera Presets</div>
    </div>
  {/if}
</div>