<!-- src/lib/sims/balloon/BalloonSim.svelte -->
<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './world/Scene.svelte';
  import VenusSky from './world/sky/VenusSky.svelte';
  
  // UI Components
  import SimControls from './ui/controls/SimControls.svelte';
  import PlayPause from './ui/controls/PlayPause.svelte';
  import CameraSelector from './ui/CameraSelector.svelte';
  import InteractiveCamera from './world/InteractiveCamera.svelte';
  import Instruments from './ui/Instruments.svelte';
  
  // Control System - This is our new foundation!
  import { createControlContext } from './context/controls.svelte';
  
  // Create the unified control context FIRST - this needs to be available to all child components
  const controls = createControlContext();
  
  import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';

  // Create the unified control context - this replaces scattered control handling
  // const controls = createControlContext();
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Camera component reference
  let cameraComponent;
  
  // Generate a session ID for this simulation instance
  const sessionId = $state(`sim-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  
  // Telemetry data for UI
  let telemetry = $state({
    altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
    airDensity: 0,
    buoyancy: 0,
    temperature: 27,
    globalPosition: { latitude: 0, longitude: 0 }
  });
  
  // Camera heading for compass
  let cameraHeading = $state(0);
  
  // Sky settings
  let skyExposure = $state(0.35);
  
  // API Command Polling - This enables external control (AI, web interface, etc.)
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    let pollInterval: number;
    
    // Poll for external commands every 100ms
    // This is how AI pilots will control the simulation
    const pollForCommands = async () => {
      try {
        const response = await fetch(`/api/controls/command?sessionId=${sessionId}`);
        const data = await response.json();
        
        if (data.success && data.commands.length > 0) {
          // Execute each command through our control system
          for (const command of data.commands) {
            controls.executeCommand(command);
          }
        }
      } catch (error) {
        // Silently fail - API might not be available in dev mode
        // console.debug('API polling error:', error);
      }
    };
    
    // Start polling
    pollInterval = setInterval(pollForCommands, 100);
    
    // Cleanup when component unmounts
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  });
  
  // TEACHING MOMENT: Notice how clean this is now!
  // Instead of scattered toggleSimulation, doSingleStep, restartSimulation functions,
  // we just pass the control actions directly to child components
  
  // Legacy support - these functions are now just wrappers around our control actions
  // This keeps existing components working while we migrate them
  const legacyActions = {
    toggleSimulation: controls.actions.togglePause,
    doSingleStep: controls.actions.step,  
    restartSimulation: controls.actions.reset
  };
</script>

<div class="relative w-full h-screen overflow-hidden">
  <Canvas>
    <!-- Venus Sky System -->
    <VenusSky
      setEnvironment={true}
      autoTransition={true}
      balloonAltitude={telemetry.altitude}
      bind:exposure={skyExposure}
    />

    <!-- Interactive Camera -->
    <InteractiveCamera bind:this={cameraComponent} />
    
    <!-- Main Scene -->
    <Scene 
      {telemetry}
      updateTelemetry={(newData) => telemetry = {...telemetry, ...newData}}
      exposure={skyExposure}
      disableAtmosphere={true}
    />
  </Canvas>
  
  <!-- Camera Controls -->
  <CameraSelector 
    position="top-right"
    on:cameraChange={(e) => {
      if (cameraComponent) {
        cameraComponent.setMode(e.detail.mode);
      }
    }}
  />

  <!-- Simulation Controls -->
  <div class="absolute top-5 left-5 z-10">
    <SimControls 
      {telemetry}
    />
  </div>
  
  <!-- Play/Pause Controls - Now uses our unified control system -->
  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
    <PlayPause
      running={!controls.state.simulation.paused}
      toggleSimulation={legacyActions.toggleSimulation}
      doSingleStep={legacyActions.doSingleStep}  
      restartSimulation={legacyActions.restartSimulation}
    />
  </div>
  
  <!-- Instrument Panel -->
  <Instruments
    {telemetry}
    {cameraHeading}
    layout="default"
  />
  
  <!-- Development Info Panel (remove in production) -->
  {#if import.meta.env.DEV}
    <div class="absolute top-5 right-5 bg-black/80 text-white p-3 rounded text-xs font-mono z-50 max-w-xs">
      <div class="font-bold text-yellow-300 mb-2">🎮 Control System Debug</div>
      
      <div class="space-y-1">
        <div>Session: {sessionId.slice(-8)}</div>
        <div>Commands: {controls.status.commandCount}</div>
        <div>State: {controls.status.isPaused ? 'PAUSED' : 'RUNNING'}</div>
        <div>Moving: {controls.status.isMoving ? 'YES' : 'NO'}</div>
        <div>Balloon: {controls.status.isBalloonActive ? 'ACTIVE' : 'NEUTRAL'}</div>
      </div>
      
      <div class="mt-3 pt-2 border-t border-white/20">
        <div class="text-white/70">Movement:</div>
        <div>X: {controls.state.movement.x.toFixed(2)}</div>
        <div>Z: {controls.state.movement.z.toFixed(2)}</div>
      </div>
      
      <div class="mt-2">
        <div class="text-white/70">Balloon:</div>
        <div>Inflate: {controls.state.balloon.inflate.toFixed(2)}</div>
        <div>Deflate: {controls.state.balloon.deflate.toFixed(2)}</div>
      </div>
      
      <div class="mt-3 pt-2 border-t border-white/20 text-xs text-white/50">
        <div>Try API commands:</div>
        <div class="mt-1 p-1 bg-black/50 rounded text-[10px] break-all">
          POST /api/controls/command<br>
          {"{"}sessionId: "{sessionId}", command: {"{"}type: "balloon.inflate", intensity: 0.5{"}}"}{"}"} 
        </div>
      </div>
    </div>
  {/if}
</div>