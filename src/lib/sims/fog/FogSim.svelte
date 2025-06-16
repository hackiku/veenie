<!-- src/lib/sims/fog/FogSim.svelte -->
<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import Altimeter from "./ui/instruments/Altimeter.svelte";
  import Thermometer from "./ui/instruments/Thermometer.svelte";
  
  // Camera state - this is our "player"
  let cameraPosition = $state({ x: 0, y: 55000, z: 0 }); // Start at 55km like balloon
  let cameraRotation = $state({ x: 0, y: 0, z: 0 });
  
  // Atmospheric telemetry based on camera position
  let telemetry = $state({
    altitude: 55000,
    temperature: 27,
    airDensity: 0.9,
    atmosphericLayer: 'Cloud Layer',
    speed: 500
  });
  
  // Update telemetry when camera moves
  function updateCameraTelemetry(position: {x: number, y: number, z: number}) {
    cameraPosition = position;
    telemetry.altitude = position.y;
    // Temperature, density, and speed will be calculated in Scene based on altitude
  }
  
  // Handle escape key to show/hide cursor
  let showCursor = $state(false);
  
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        showCursor = !showCursor;
        if (showCursor) {
          document.exitPointerLock();
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<div class="relative w-full h-screen overflow-hidden bg-black">
  <Canvas>
    <Scene 
      bind:cameraPosition 
      bind:telemetry
      onCameraMove={updateCameraTelemetry}
    />
  </Canvas>
  
  <!-- Atmospheric Instruments -->
  <Altimeter 
    {telemetry}
    position="bottom-right"
    min={0}
    max={100}
  />
  
  <Thermometer 
    {telemetry}
    position="bottom-right-offset"
    min={-100}
    max={500}
  />
  
  <!-- Minimal dev info -->
  <div class="fixed top-4 left-4 bg-black/60 text-white p-3 rounded text-xs font-mono">
    <div class="text-yellow-300 font-bold mb-2">🌫️ Venus Atmosphere Explorer</div>
    <div>Alt: {telemetry.altitude.toFixed(0)}m ({(telemetry.altitude/1000).toFixed(1)}km)</div>
    <div>Pos: ({cameraPosition.x.toFixed(0)}, {cameraPosition.z.toFixed(0)})</div>
    <div>Speed: {telemetry.speed.toFixed(0)} m/s</div>
    <div>Layer: {telemetry.atmosphericLayer}</div>
    <div class="mt-2 text-white/60">
      WASD + Mouse: Fly around<br/>
      Right-drag: Pan • Scroll: Zoom speed<br/>
      Shift: Faster • Ctrl: Slower<br/>
      ESC: {showCursor ? 'Lock cursor' : 'Free cursor'}
    </div>
  </div>
  
  <!-- Cursor lock indicator -->
  {#if !showCursor}
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div class="w-4 h-4 border border-white/50 rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 w-1 h-1 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  {/if}
</div>