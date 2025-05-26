<!-- src/lib/sims/venus/VenusSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './world/Scene.svelte';
  import { createVenusTime } from './context/time.svelte';
  
  // UI Components
  import TimeControls from './ui/time/TimeControls.svelte';
  
  // Create Venus time system
  const venusTime = createVenusTime({
    startDate: new Date('2025-01-01T12:00:00Z'),
    initialTimeScale: 1,
    enableKeyboard: true // Enable space key handling
  });
  
  // Simple state
  let showCoordinateGrid = $state(true);
</script>

<div class="relative w-full h-screen overflow-hidden bg-black">
  <!-- 3D Scene -->
  <Canvas>
    <Scene 
      {venusTime}
      {showCoordinateGrid}
    />
  </Canvas>
  
  <!-- Time Controls (Top Center) -->
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
    </div>
  {/if}
</div>