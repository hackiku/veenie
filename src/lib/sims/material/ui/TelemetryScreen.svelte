<!-- src/lib/sims/material/ui/TelemetryScreen.svelte -->
<script lang="ts">
  import { getPhysicsContext } from "../contexts/physicsContext.svelte";
  
  // Get the physics context
  const physics = getPhysicsContext();
  
  // Format a number to 2 decimal places
  function fmt(num: number): string {
    return num.toFixed(2);
  }
  
  // Format a position array
  function formatPosition(pos: [number, number, number]): string {
    return `[${fmt(pos[0])}, ${fmt(pos[1])}, ${fmt(pos[2])}]`;
  }
</script>

<div class="fixed top-4 right-4 bg-black/80 text-green-400 p-3 rounded font-mono text-xs z-10">
  <div class="text-center text-white mb-2 font-bold">VENUS BALLOON TELEMETRY</div>
  
  <div class="grid grid-cols-2 gap-x-4 gap-y-1">
    <div class="text-white/60">Position:</div>
    <div>{formatPosition(physics.bodyPosition)}</div>
    
    <div class="text-white/60">Altitude:</div>
    <div>{fmt(physics.bodyPosition[1])} m</div>
    
    <div class="text-white/60">Buoyancy:</div>
    <div>{fmt(physics.buoyancy)} N</div>
    
    <div class="text-white/60">Gravity:</div>
    <div>{fmt(physics.gravity)} m/s²</div>
    
    <div class="text-white/60">Status:</div>
    <div>{physics.paused ? "PAUSED" : "RUNNING"}</div>
    
    {#if physics.pendingForces && physics.pendingForces.length > 0}
      <div class="text-white/60">Forces:</div>
      <div>{physics.pendingForces.length} pending</div>
    {/if}
  </div>
  
  <div class="mt-3 pt-2 border-t border-green-400/30">
    <button 
      class="px-2 py-1 bg-green-700/40 hover:bg-green-700/70 rounded mr-2 text-xs"
      on:click={() => physics.setPaused(!physics.paused)}
    >
      {physics.paused ? "▶ Play" : "⏸ Pause"}
    </button>
    
    <button 
      class="px-2 py-1 bg-green-700/40 hover:bg-green-700/70 rounded text-xs"
      on:click={() => physics.resetSimulation()}
    >
      🔄 Reset
    </button>
  </div>
</div>