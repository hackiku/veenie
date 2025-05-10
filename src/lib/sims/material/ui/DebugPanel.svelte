<!-- src/lib/sims/material/ui/DebugPanel.svelte -->
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
  
  // Define reactive values
  let position = $derived(sim.getPosition());
  let velocity = $derived(sim.getVelocity());
  let altitude = $derived(sim.getAltitude());
  let conditions = $derived(sim.getAtmosphericConditions());
  let vehicleDetails = $derived(sim.vehicle.getVehicleDetails());
  
  // Setup periodic updates
  let animFrameId = $state(null);
  
  function updateState() {
    // Re-read values - not necessary in Runes mode as they're already reactive,
    // but important for ensuring UI updates with latest physics state
    position = sim.getPosition();
    velocity = sim.getVelocity();
    altitude = sim.getAltitude();
    conditions = sim.getAtmosphericConditions();
    vehicleDetails = sim.vehicle.getVehicleDetails();
    
    // Continue update loop
    animFrameId = requestAnimationFrame(updateState);
  }
  
  // Start updates
  $effect(() => {
    animFrameId = requestAnimationFrame(updateState);
    
    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  });
</script>

<div class="fixed right-4 top-4 bg-black/80 text-white p-3 rounded font-mono text-xs z-20 w-88 overflow-y-auto max-h-[90vh]">
  <div class="text-center font-bold mb-2 text-amber-300">BALLOON TELEMETRY</div>
  
  <div class="space-y-1">
    <!-- Position and Movement -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Position & Movement</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Position:</span>
        <span>{fmtVec(position)}</span>
        
        <span class="text-white/70">Velocity:</span>
        <span>{fmtVec(velocity)}</span>
        
        <span class="text-white/70">Altitude:</span>
        <span>{fmt(altitude)} m</span>
      </div>
    </div>
    
    <!-- Atmospheric Conditions -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Atmospheric Conditions</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Density:</span>
        <span>{fmt(conditions.density)} kg/m³</span>
        
        <span class="text-white/70">Temperature:</span>
        <span>{fmt(conditions.temperature)} K</span>
        
        <span class="text-white/70">Pressure:</span>
        <span>{fmt(conditions.pressure)} kPa</span>
        
        <span class="text-white/70">Wind X:</span>
        <span>{fmt(conditions.windVector.x)} m/s</span>
        
        <span class="text-white/70">Wind Z:</span>
        <span>{fmt(conditions.windVector.z)} m/s</span>
      </div>
    </div>
    
    <!-- Simulation Settings -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Simulation Settings</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Buoyancy:</span>
        <span>{fmt(sim.getBuoyancy())}</span>
        
        <span class="text-white/70">Wind Enabled:</span>
        <span>{conditions.windVector.x !== 0 ? 'Yes' : 'No'}</span>
        
        <span class="text-white/70">Wind Intensity:</span>
        <span>{fmt(sim.atmosphere.getWindIntensity())}</span>
        
        <span class="text-white/70">Time Scale:</span>
        <span>{fmt(sim.getTimeScale())}x</span>
        
        <span class="text-white/70">Paused:</span>
        <span>{sim.isPaused() ? 'Yes' : 'No'}</span>
      </div>
    </div>
    
    <!-- Vehicle Info -->
    <div class="border-b border-white/20 pb-1 mb-1">
      <div class="text-amber-200 font-semibold">Vehicle Details</div>
      <div class="grid grid-cols-2 gap-x-2">
        {#each Object.entries(vehicleDetails) as [key, value]}
          <span class="text-white/70">{key}:</span>
          <span>{typeof value === 'number' ? fmt(value) : value}</span>
        {/each}
      </div>
    </div>
    
    <!-- Session Info -->
    <div>
      <div class="text-amber-200 font-semibold">Session Info</div>
      <div class="grid grid-cols-2 gap-x-2">
        <span class="text-white/70">Session ID:</span>
        <span>{sim.getSessionId() || 'Not Recording'}</span>
      </div>
    </div>
  </div>
</div>