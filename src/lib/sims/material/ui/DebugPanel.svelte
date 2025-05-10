<!-- src/lib/sims/material/ui/DebugPanel.svelte (New Version) -->
<script lang="ts">
  import { getSimulationContext } from '../contexts/simulationContext.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Format helper
  function fmt(num: number): string {
    return typeof num === 'number' ? num.toFixed(2) : 'N/A';
  }
  
  // Format Vector3 array
  function fmtVec(vec: [number, number, number]): string {
    if (!vec) return '[N/A]';
    return `[${fmt(vec[0])}, ${fmt(vec[1])}, ${fmt(vec[2])}]`;
  }
</script>

<div class="fixed right-4 top-4 bg-black/80 text-white p-3 rounded font-mono text-xs z-20 w-88 overflow-y-auto max-h-[90vh]">
  <div class="text-center font-bold mb-2 text-amber-300">BALLOON TELEMETRY</div>
  
  <div class="space-y-1">
    <!-- Position and Movement -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Position & Movement</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Position:</span>
        <span>{fmtVec(sim.getPosition())}</span>
        
        <span class="text-white/70">Velocity:</span>
        <span>{fmtVec(sim.getVelocity())}</span>
        
        <span class="text-white/70">Altitude:</span>
        <span>{fmt(sim.getAltitude())} m</span>
      </div>
    </div>
    
    <!-- Atmospheric Conditions -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Atmospheric Conditions</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Density:</span>
        <span>{fmt(sim.getAtmosphericConditions().density)} kg/m³</span>
        
        <span class="text-white/70">Temperature:</span>
        <span>{fmt(sim.getAtmosphericConditions().temperature)} K</span>
        
        <span class="text-white/70">Pressure:</span>
        <span>{fmt(sim.getAtmosphericConditions().pressure)} kPa</span>
        
        <span class="text-white/70">Wind X:</span>
        <span>{fmt(sim.getAtmosphericConditions().windVector[0])} m/s</span>
        
        <span class="text-white/70">Wind Z:</span>
        <span>{fmt(sim.getAtmosphericConditions().windVector[2])} m/s</span>
      </div>
    </div>
    
    <!-- Simulation Settings -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Simulation Settings</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Buoyancy:</span>
        <span>{fmt(sim.getBuoyancy())}</span>
        
        <span class="text-white/70">Wind Enabled:</span>
        <span>{sim.getAtmosphericConditions().windVector[0] !== 0 ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Intensity:</span>
        <span>{fmt(Math.abs(sim.getAtmosphericConditions().windVector[0]))}</span>
        
        <span class="text-white/70">Time Scale:</span>
        <span>{fmt(sim.getTimeScale())}x</span>
        
        <span class="text-white/70">Paused:</span>
        <span>{sim.isPaused() ? 'Yes' : 'No'}</span>
      </div>
    </div>
    
    <!-- Vehicle Info (if available) -->
    {#if sim.getVehicleDetails && typeof sim.getVehicleDetails === 'function'}
      <div class="border-b border-white/20 pb-1 mb-1">
        <div class="text-amber-200 font-semibold">Vehicle Details</div>
        <div class="grid grid-cols-2 gap-x-2">
          {#each Object.entries(sim.getVehicleDetails()) as [key, value]}
            <span class="text-white/70">{key}:</span>
            <span>{typeof value === 'number' ? fmt(value) : value}</span>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Session Info -->
    {#if sim.getSessionId && typeof sim.getSessionId === 'function'}
      <div>
        <div class="text-amber-200 font-semibold">Session Info</div>
        <div class="grid grid-cols-2 gap-x-2">
          <span class="text-white/70">Session ID:</span>
          <span>{sim.getSessionId() || 'Not Recording'}</span>
        </div>
      </div>
    {/if}
  </div>
</div>