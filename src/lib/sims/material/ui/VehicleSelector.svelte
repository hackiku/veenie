<!-- src/lib/sims/material/ui/VehicleSelector.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  import { Button } from "bits-ui";
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Get vehicles from simulation context
  let vehicles = $derived(sim.getVehicles ? sim.getVehicles() : []);
  let selectedVehicle = $state(vehicles[0]?.name || null);
  
  function selectVehicle(vehicle) {
    selectedVehicle = vehicle.name;
    sim.setVehicle(vehicle);
  }
</script>

{#if vehicles && vehicles.length > 0}
<div class="fixed left-4 top-20 bg-black/80 text-white p-4 rounded font-mono text-sm z-10 w-64">
    <div class="text-center font-bold mb-3">VEHICLE SELECTION</div>
    
    <div class="space-y-2">
      {#each vehicles as vehicle}
        <Button.Root
          class="w-full px-2 py-1 text-left {selectedVehicle === vehicle.name ? 'bg-blue-700/60' : 'bg-blue-700/20'} hover:bg-blue-700/40 rounded text-xs"
          onclick={() => selectVehicle(vehicle)}
        >
          {#snippet children()}
            <div>
              <div class="font-bold">{vehicle.name}</div>
              <div class="opacity-70 text-[10px]">{vehicle.type} | {vehicle.data.mass}kg</div>
            </div>
          {/snippet}
        </Button.Root>
      {/each}
    </div>
    
    {#if selectedVehicle}
      <div class="mt-4 border-t border-white/20 pt-2">
        <div class="text-xs opacity-70">
          {#if sim.getVehicleDetails}
            {#each Object.entries(sim.getVehicleDetails()) as [key, value]}
              <div class="flex justify-between">
                <span>{key}:</span>
                <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}