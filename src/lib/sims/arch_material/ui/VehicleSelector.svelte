<!-- src/lib/sims/material/ui/VehicleSelector.svelte -->

<script lang="ts">
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  import { Button } from "bits-ui";
  
  // Get the simulation context
  const sim = getSimulationContext();
  const vehicle = sim.vehicle;
  
  // Get vehicles and current vehicle
  let vehicles = $derived(vehicle.getVehicles());
  let currentVehicle = $derived(vehicle.getCurrentVehicle());
  
  function selectVehicle(selectedVehicle) {
    sim.setVehicle(selectedVehicle);
  }
</script>

{#if vehicles && vehicles.length > 0}
<div class="fixed left-4 top-4 bg-black/80 text-white p-4 rounded font-mono text-sm z-10 w-64">
    <div class="text-center font-bold mb-3">VEHICLE SELECTION</div>
    
    <div class="space-y-2">
      {#each vehicles as v}
        <Button.Root
          class="w-full px-2 py-1 text-left {currentVehicle?.name === v.name ? 'bg-blue-700/60' : 'bg-blue-700/20'} hover:bg-blue-700/40 rounded text-xs"
          onclick={() => selectVehicle(v)}
        >
          {#snippet children()}
            <div>
              <div class="font-bold">{v.name}</div>
              <div class="opacity-70 text-[10px]">{v.type} | {v.data?.mass || 1.0}kg</div>
            </div>
          {/snippet}
        </Button.Root>
      {/each}
    </div>
    
    {#if currentVehicle}
      <div class="mt-4 border-t border-white/20 pt-2">
        <div class="text-xs opacity-70">
          {#each Object.entries(vehicle.getVehicleDetails()) as [key, value]}
            <div class="flex justify-between">
              <span>{key}:</span>
              <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}