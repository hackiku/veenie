<!-- src/lib/sims/material/ui/DebugPanel.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../state/context.svelte";
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Format helpers
  function fmt(num: number | undefined): string {
    return typeof num === 'number' ? num.toFixed(2) : 'N/A';
  }
  
  function fmtVec(vec: [number, number, number] | undefined): string {
    if (!vec) return '[N/A]';
    return `[${fmt(vec[0])}, ${fmt(vec[1])}, ${fmt(vec[2])}]`;
  }
  
  function formatTime(seconds: number | undefined): string {
    if (typeof seconds !== 'number') return '00:00:00';
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Use derived state for display data - Svelte 5 runes automatically track reactivity
  const displayData = $derived({
    position: sim.telemetry.position,
    velocity: sim.telemetry.velocity,
    altitude: sim.telemetry.altitude,
    atmospheric: sim.telemetry.atmospheric || {
      density: 0,
      temperature: 0,
      pressure: 0,
      windVector: { x: 0, y: 0, z: 0 }
    },
    vehicle: sim.telemetry.vehicle,
    forces: sim.telemetry.forces || {
      buoyancy: { x: 0, y: 0, z: 0 },
      drag: { x: 0, y: 0, z: 0 },
      gravity: { x: 0, y: 0, z: 0 },
      wind: { x: 0, y: 0, z: 0 },
      total: { x: 0, y: 0, z: 0 }
    },
    simulation: {
      isPaused: sim.isPaused(),
      timeScale: sim.getTimeScale(),
      elapsedTime: sim.getTime(),
      isDebug: sim.isDebug(),
      windEnabled: sim.telemetry.simulation.windEnabled,
      windIntensity: sim.telemetry.simulation.windIntensity
    }
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
        <span>{fmt(displayData.forces.buoyancy?.y)} N</span>
        
        <span class="text-white/70">Drag Y:</span>
        <span>{fmt(displayData.forces.drag?.y)} N</span>
        
        <span class="text-white/70">Gravity Y:</span>
        <span>{fmt(displayData.forces.gravity?.y)} N</span>
        
        <span class="text-white/70">Wind X:</span>
        <span>{fmt(displayData.forces.wind?.x)} N</span>
        
        <span class="text-white/70">Total Y:</span>
        <span>{fmt(displayData.forces.total?.y)} N</span>
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
        <span>{formatTime(displayData.simulation.elapsedTime)}</span>
        
        <span class="text-white/70">Paused:</span>
        <span>{displayData.simulation.isPaused ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Enabled:</span>
        <span>{displayData.simulation.windEnabled ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Intensity:</span>
        <span>{fmt(displayData.simulation.windIntensity)}</span>
      </div>
    </div>
  </div>
</div>