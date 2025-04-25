<!-- src/lib/sims/material/MaterialSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World, Debug } from '@threlte/rapier'
  import { createPhysicsContext } from './contexts/physicsContext.svelte';
  import Scene from './Scene.svelte';
  import TelemetryScreen from './ui/TelemetryScreen.svelte';
  import Altimeter from './ui/Altimeter.svelte';
  
  // Create physics context - this is our single source of truth
  const physics = createPhysicsContext();
  
  // Keyboard shortcuts for simulation control
  function handleKeyDown(e) {
    if (e.key === 'p') {
      physics.setPaused(!physics.paused);
    } else if (e.key === 'r') {
      physics.resetSimulation();
    } else if (e.key === 'd') {
      physics.setDebug(!physics.debug);
    }
  }
  
  // Set up global keyboard shortcuts
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<!-- Telemetry displays -->
<TelemetryScreen />

<Altimeter 
  position="bottom-right"
  value={physics.bodyPosition[1]}
  min={0}
  max={20}
  label="Height"
  unit="m"
/>

<!-- Control instructions -->
<div class="fixed bottom-4 left-26 bg-black/60 text-white/30 p-3 rounded text-sm">
  <div class="font-bold mb-1">Controls:</div>
  <div>WASD = Move horizontally</div>
  <div>Space = Ascend</div>
  <div>Shift = Descend</div>
  <div class="mt-2 text-xs __text-white/70">
    P = Pause/Play | R = Reset | D = Debug View
  </div>
</div>

<!-- 3D World -->
<div class="w-screen h-screen">
  <Canvas>
    <World
      gravity={physics.gravityVector}
      paused={physics.paused}
      timeStep={1/60}
    >
      {#if physics.debug}
        <Debug />
      {/if}

      <Scene />
    </World>
  </Canvas>
</div>