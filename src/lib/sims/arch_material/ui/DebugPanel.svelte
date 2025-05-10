<!-- src/lib/sims/material/ui/DebugPanel.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../state/simulationContext.svelte";
  import { onMount, onDestroy } from 'svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  const { telemetry } = sim;
  
  // Format helpers
  function fmt(num: number | undefined): string {
    return typeof num === 'number' ? num.toFixed(2) : 'N/A';
  }
  
  function fmtVec(vec: [number, number, number] | undefined): string {
    if (!vec) return '[N/A]';
    return `[${fmt(vec[0])}, ${fmt(vec[1])}, ${fmt(vec[2])}]`;
  }
  
  // Force updates for accurate real-time display
  let animFrameId = $state(null);
  let displayData = $state({
    position: telemetry.position,
    velocity: telemetry.velocity,
    altitude: telemetry.altitude,
    atmospheric: telemetry.atmospheric,
    vehicle: telemetry.vehicle,
    forces: telemetry.forces,
    simulation: telemetry.simulation
  });
  
  // Update display data on each frame
  function updateDisplayData() {
    displayData = {
      position: telemetry.position,
      velocity: telemetry.velocity,
      altitude: telemetry.altitude,
      atmospheric: telemetry.atmospheric,
      vehicle: telemetry.vehicle,
      forces: telemetry.forces,
      simulation: telemetry.simulation
    };
    
    // Continue update loop
    animFrameId = requestAnimationFrame(updateDisplayData);
  }
  
  // Start periodic updates
  onMount(() => {
    animFrameId = requestAnimationFrame(updateDisplayData);
    
    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  });
  
  // Clean up animation frame on destroy
  onDestroy(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
  });
</script>

<div class="fixed right-4 top-4 bg-black/80 text-white p-3 rounded font-mono text-xs z-20 w-80 overflow-y-auto max-h-[90vh]">
  <div class="text-center font-bold mb-2 text-amber-300">BALLOON TELEMETRY</div>
  
  <div class="space-y-1">
    <!-- Position and Movement -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Position & Movement</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Position:</span>
        <span>{fmtVec(displayData.position)}</span>
        
        <span class="text-white/70">Velocity:</span>
        <span>{fmtVec(displayData.velocity)}</span>
        
        <span class="text-white/70">Altitude:</span>
        <span>{fmt(displayData.altitude)} m</span>
      </div>
    </div>
    
    <!-- Atmospheric Conditions -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Atmospheric Conditions</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Density:</span>
        <span>{fmt(displayData.atmospheric.density)} kg/m³</span>
        
        <span class="text-white/70">Temperature:</span>
        <span>{fmt(displayData.atmospheric.temperature)} K</span>
        
        <span class="text-white/70">Pressure:</span>
        <span>{fmt(displayData.atmospheric.pressure)} kPa</span>
        
        <span class="text-white/70">Wind X:</span>
        <span>{fmt(displayData.atmospheric.windVector?.x)} m/s</span>
        
        <span class="text-white/70">Wind Z:</span>
        <span>{fmt(displayData.atmospheric.windVector?.z)} m/s</span>
      </div>
    </div>
    
    <!-- Forces -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Forces</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Buoyancy Y:</span>
        <span>{fmt(displayData.forces.buoyancy.y)} N</span>
        
        <span class="text-white/70">Drag Y:</span>
        <span>{fmt(displayData.forces.drag.y)} N</span>
        
        <span class="text-white/70">Gravity Y:</span>
        <span>{fmt(displayData.forces.gravity.y)} N</span>
        
        <span class="text-white/70">Wind X:</span>
        <span>{fmt(displayData.forces.wind?.x)} N</span>
        
        <span class="text-white/70">Total Y:</span>
        <span>{fmt(displayData.forces.total.y)} N</span>
      </div>
    </div>
    
    <!-- Vehicle Info -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Vehicle Details</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Name:</span>
        <span>{displayData.vehicle.name}</span>
        
        <span class="text-white/70">Type:</span>
        <span>{displayData.vehicle.type}</span>
        
        <span class="text-white/70">Mass:</span>
        <span>{fmt(displayData.vehicle.mass)} kg</span>
        
        <span class="text-white/70">Buoyancy:</span>
        <span>{fmt(displayData.vehicle.buoyancy)}</span>
        
        <span class="text-white/70">Drag:</span>
        <span>{fmt(displayData.vehicle.dragCoefficient)}</span>
      </div>
    </div>
    
    <!-- Simulation Settings -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Simulation Settings</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Time Scale:</span>
        <span>{fmt(displayData.simulation.timeScale)}x</span>
        
        <span class="text-white/70">Elapsed Time:</span>
        <span>{fmt(displayData.simulation.elapsedTime)} s</span>
        
        <span class="text-white/70">Paused:</span>
        <span>{displayData.simulation.isPaused ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Enabled:</span>
        <span>{displayData.simulation.windEnabled ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Intensity:</span>
        <span>{fmt(displayData.simulation.windIntensity)}</span>
      </div>
    </div>
    
    <!-- Session Info -->
    <div>
      <div class="text-amber-200 font-semibold">Session Info</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Session ID:</span>
        <span>{displayData.simulation.sessionId || 'Not Recording'}</span>
      </div>
    </div>
  </div>
</div>