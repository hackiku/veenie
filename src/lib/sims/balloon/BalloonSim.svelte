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
  
  // Control System
  import { createControlContext } from './context/controls.svelte';
  
  // Create the unified control context FIRST
  const controls = createControlContext();
  
  import { SIMULATION_CONSTANTS } from './constants';
  import { getPhysicsEngine } from './physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Camera component reference
  let cameraComponent;
  
  // Generate a session ID for this simulation instance
  const sessionId = $state(`sim-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  
  // Enhanced telemetry data for UI with yaw
  let telemetry = $state({
    altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
    balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
    airDensity: 0,
    buoyancy: 0,
    temperature: 27,
    globalPosition: { latitude: 0, longitude: 0 },
    yawRate: 0,
    controlIntensity: { movement: 0, rotation: 0, balloon: 0 }
  });
  
  // Camera heading for compass (camera orientation)
  let cameraHeading = $state(0);
  
  // Balloon heading for compass (balloon yaw orientation) - NEW!
  let balloonHeading = $state(0);
  
  // Sky settings
  let skyExposure = $state(0.35);
  
  // Enhanced telemetry update to capture balloon heading
  function updateTelemetryWithHeading(newData) {
    // Get balloon rotation from engine
    const balloonRotation = engine.getBalloonRotation();
    
    // Extract yaw (Y-axis rotation) for compass
    balloonHeading = balloonRotation.y;
    
    // Update telemetry with new data
    telemetry = {...telemetry, ...newData};
  }
  
  // API Command Polling
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    let pollInterval: number;
    
    const pollForCommands = async () => {
      try {
        const response = await fetch(`/api/controls/command?sessionId=${sessionId}`);
        const data = await response.json();
        
        if (data.success && data.commands.length > 0) {
          // Execute each command through our control system
          for (const command of data.commands) {
            const result = controls.executeCommand(command);
            if (!result) {
              console.warn('Failed to execute command:', command);
            }
          }
        }
      } catch (error) {
        // Silently fail - API might not be available in dev mode
        console.debug('API polling error:', error);
      }
    };
    
    // Start polling
    pollInterval = setInterval(pollForCommands, 100);
    
    // Cleanup when component unmounts
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  });
  
  // Legacy support for existing components
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
    
    <!-- Main Scene with enhanced telemetry update -->
    <Scene 
      {telemetry}
      updateTelemetry={updateTelemetryWithHeading}
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
  
  <!-- Play/Pause Controls -->
  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
    <PlayPause
      running={!controls.state.simulation.paused}
      toggleSimulation={legacyActions.toggleSimulation}
      doSingleStep={legacyActions.doSingleStep}  
      restartSimulation={legacyActions.restartSimulation}
    />
  </div>
  
  <!-- Enhanced Instrument Panel with balloon heading -->
  <Instruments
    {telemetry}
    cameraHeading={cameraHeading}
    balloonHeading={balloonHeading}
    layout="default"
  />
  
  <!-- Enhanced Development Info Panel -->
  {#if import.meta.env.DEV}
    <div class="absolute top-5 right-5 bg-black/80 text-white p-3 rounded text-xs font-mono z-50 max-w-xs">
      <div class="font-bold text-yellow-300 mb-2">🎮 Enhanced Control System</div>
      
      <div class="space-y-1">
        <div>Session: {sessionId.slice(-8)}</div>
        <div>Commands: {controls.status.commandCount}</div>
        <div>State: {controls.status.isPaused ? 'PAUSED' : 'RUNNING'}</div>
        <div>Moving: {controls.status.isMoving ? 'YES' : 'NO'}</div>
        <div>Rotating: {controls.status.isRotating ? 'YES' : 'NO'}</div>
        <div>Balloon: {controls.status.isBalloonActive ? 'ACTIVE' : 'NEUTRAL'}</div>
      </div>
      
      <div class="mt-3 pt-2 border-t border-white/20">
        <div class="text-white/70">Movement:</div>
        <div>X: {controls.state.movement.x.toFixed(2)}</div>
        <div>Z: {controls.state.movement.z.toFixed(2)}</div>
        <div>Yaw: {controls.state.movement.yaw.toFixed(2)}</div>
      </div>
      
      <div class="mt-2">
        <div class="text-white/70">Balloon:</div>
        <div>Inflate: {controls.state.balloon.inflate.toFixed(2)}</div>
        <div>Deflate: {controls.state.balloon.deflate.toFixed(2)}</div>
      </div>
      
      <div class="mt-2">
        <div class="text-white/70">Heading:</div>
        <div>Balloon: {(balloonHeading * 180 / Math.PI).toFixed(1)}°</div>
        <div>Yaw Rate: {(telemetry.yawRate || 0).toFixed(3)} rad/s</div>
      </div>
      
      <div class="mt-3 pt-2 border-t border-white/20 text-xs text-white/50">
        <div>Test API commands:</div>
        <div class="mt-1 p-1 bg-black/50 rounded text-[10px] break-all">
          curl -X POST http://localhost:5173/api/controls/command<br>
          -H "Content-Type: application/json"<br>  
          -d '{"{"}sessionId: "{sessionId}", command: {"{"}type: "balloon.yaw", direction: -0.5{"}"}{"}"}'
        </div>
      </div>
    </div>
  {/if}
</div>