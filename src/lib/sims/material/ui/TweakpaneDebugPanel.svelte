<!-- src/lib/sims/material/ui/TweakpaneDebugPanel.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getSimulationContext } from '../contexts/simulationContext.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Variables to bind to Tweakpane
  let paneContainer;
  let pane;
  
  // State for the panel
  let debugState = $state({
    buoyancy: sim.getBuoyancy(),
    isWindEnabled: sim.getAtmosphericConditions().windVector[0] !== 0,
    windIntensity: Math.abs(sim.getAtmosphericConditions().windVector[0]),
    timeScale: sim.getTimeScale(),
    paused: sim.isPaused(),
    debug: sim.isDebug(),
    position: sim.getPosition(),
    velocity: sim.getVelocity(),
    altitude: sim.getAltitude(),
    density: sim.getAtmosphericConditions().density,
    temperature: sim.getAtmosphericConditions().temperature,
    pressure: sim.getAtmosphericConditions().pressure
  });
  
  // Update debug state on every frame
  function updateDebugState() {
    // Update all values
    debugState = {
      buoyancy: sim.getBuoyancy(),
      isWindEnabled: sim.getAtmosphericConditions().windVector[0] !== 0,
      windIntensity: Math.abs(sim.getAtmosphericConditions().windVector[0]),
      timeScale: sim.getTimeScale(),
      paused: sim.isPaused(),
      debug: sim.isDebug(),
      position: sim.getPosition(),
      velocity: sim.getVelocity(),
      altitude: sim.getAltitude(),
      density: sim.getAtmosphericConditions().density,
      temperature: sim.getAtmosphericConditions().temperature,
      pressure: sim.getAtmosphericConditions().pressure
    };
    
    // Schedule next update
    requestAnimationFrame(updateDebugState);
  }
  
  onMount(async () => {
    // Dynamically import tweakpane (reduces initial bundle size)
    const Tweakpane = await import('tweakpane');
    
    // Create pane
    pane = new Tweakpane.Pane({
      container: paneContainer,
      title: 'Venus Balloon Debug',
      expanded: true
    });
    
    // Create folders
    const controlsFolder = pane.addFolder({ title: 'Controls' });
    const physicsFolder = pane.addFolder({ title: 'Physics' });
    const telemetryFolder = pane.addFolder({ title: 'Telemetry', expanded: false });
    
    // Controls
    controlsFolder.addInput(debugState, 'paused', { label: 'Paused' }).on('change', (ev) => {
      sim.setPaused(ev.value);
    });
    
    controlsFolder.addInput(debugState, 'timeScale', {
      label: 'Time Scale',
      min: 0.1,
      max: 3.0,
      step: 0.1
    }).on('change', (ev) => {
      sim.setTimeScale(ev.value);
    });
    
    controlsFolder.addButton({ title: 'Reset Simulation' }).on('click', () => {
      sim.resetSimulation();
    });
    
    // Physics
    physicsFolder.addInput(debugState, 'buoyancy', {
      label: 'Buoyancy',
      min: 0.0,
      max: 1.0,
      step: 0.01
    }).on('change', (ev) => {
      sim.setBuoyancy(ev.value);
    });
    
    physicsFolder.addInput(debugState, 'isWindEnabled', { label: 'Wind Enabled' }).on('change', (ev) => {
      sim.setWindEnabled(ev.value);
    });
    
    physicsFolder.addInput(debugState, 'windIntensity', {
      label: 'Wind Intensity',
      min: 0.0,
      max: 2.0,
      step: 0.1
    }).on('change', (ev) => {
      sim.setWindIntensity(ev.value);
    });
    
    // Telemetry (read-only)
    telemetryFolder.addMonitor(debugState, 'position', { label: 'Position' });
    telemetryFolder.addMonitor(debugState, 'velocity', { label: 'Velocity' });
    telemetryFolder.addMonitor(debugState, 'altitude', { label: 'Altitude (m)' });
    telemetryFolder.addMonitor(debugState, 'density', { label: 'Density (kg/m³)' });
    telemetryFolder.addMonitor(debugState, 'temperature', { label: 'Temperature (K)' });
    telemetryFolder.addMonitor(debugState, 'pressure', { label: 'Pressure (kPa)' });
    
    // Start updating debug values
    updateDebugState();
    
    return () => {
      // Cleanup
      if (pane) pane.dispose();
    };
  });
</script>

<div bind:this={paneContainer} class="fixed right-4 top-16 z-20"></div>