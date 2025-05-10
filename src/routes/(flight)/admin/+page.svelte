<!-- src/routes/(flight)/admin/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "bits-ui";
  import DataCard from './DataCard.svelte';
  
  // State
  let planetCount = $state(0);
  let atmosphereLayerCount = $state(0);
  let vehicleCount = $state(0);
  let materialCount = $state(0);
  let sessionCount = $state(0);
  let telemetryCount = $state(0);
  
  // Load counts
  async function loadCounts() {
    try {
      const response = await fetch('/api/admin/counts');
      if (response.ok) {
        const data = await response.json();
        planetCount = data.planets;
        atmosphereLayerCount = data.atmosphereLayers;
        vehicleCount = data.vehicles;
        materialCount = data.materials;
        sessionCount = data.sessions;
        telemetryCount = data.telemetry;
      }
    } catch (error) {
      console.error('Failed to load counts:', error);
    }
  }
  
  onMount(() => {
    loadCounts();
  });
  
  // Import data
  async function importPlanetData() {
    try {
      const response = await fetch('/api/admin/import/planet', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        alert(`Imported ${data.count} planet records`);
        loadCounts();
      }
    } catch (error) {
      console.error('Failed to import planet data:', error);
      alert('Import failed: ' + error);
    }
  }
  
  async function importAtmosphereData() {
    try {
      const response = await fetch('/api/admin/import/atmosphere', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        alert(`Imported ${data.count} atmosphere records`);
        loadCounts();
      }
    } catch (error) {
      console.error('Failed to import atmosphere data:', error);
      alert('Import failed: ' + error);
    }
  }
  
  async function importVehicleData() {
    try {
      const response = await fetch('/api/admin/import/vehicles', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        alert(`Imported ${data.count} vehicle records`);
        loadCounts();
      }
    } catch (error) {
      console.error('Failed to import vehicle data:', error);
      alert('Import failed: ' + error);
    }
  }
  
  async function clearTelemetry() {
    if (!confirm('Are you sure you want to clear all telemetry data?')) return;
    
    try {
      const response = await fetch('/api/admin/clear/telemetry', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        alert(`Cleared ${data.count} telemetry records`);
        loadCounts();
      }
    } catch (error) {
      console.error('Failed to clear telemetry:', error);
      alert('Clear failed: ' + error);
    }
  }
</script>

<div class="min-h-screen bg-black text-white py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text">
      Venus Simulation Admin
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Database Stats Card -->
      <div class="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-orange-300">Database Statistics</h2>
        
        <div class="grid grid-cols-2 gap-4">
          <DataCard label="Planets" value={planetCount} />
          <DataCard label="Atmosphere Layers" value={atmosphereLayerCount} />
          <DataCard label="Vehicles" value={vehicleCount} />
          <DataCard label="Materials" value={materialCount} />
          <DataCard label="Simulation Sessions" value={sessionCount} />
          <DataCard label="Telemetry Points" value={telemetryCount} />
        </div>
        
        <Button.Root
          class="mt-6 bg-blue-700/40 hover:bg-blue-700/70 text-white rounded-md px-4 py-2 w-full text-sm font-semibold active:scale-[0.98] active:transition-all"
          onclick={loadCounts}
        >
          {#snippet children()}
            🔄 Refresh Counts
          {/snippet}
        </Button.Root>
      </div>
      
      <!-- Data Import Card -->
      <div class="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-orange-300">Data Management</h2>
        
        <div class="space-y-3">
          <Button.Root 
            class="w-full bg-green-700/40 hover:bg-green-700/70 text-white rounded-md px-4 py-3 text-sm font-semibold active:scale-[0.98] active:transition-all"
            onclick={importPlanetData}
          >
            {#snippet children()}
              🪐 Import Planet Data
            {/snippet}
          </Button.Root>
          
          <Button.Root 
            class="w-full bg-green-700/40 hover:bg-green-700/70 text-white rounded-md px-4 py-3 text-sm font-semibold active:scale-[0.98] active:transition-all"
            onclick={importAtmosphereData}
          >
            {#snippet children()}
              💨 Import Atmosphere Data
            {/snippet}
          </Button.Root>
          
          <Button.Root 
            class="w-full bg-green-700/40 hover:bg-green-700/70 text-white rounded-md px-4 py-3 text-sm font-semibold active:scale-[0.98] active:transition-all"
            onclick={importVehicleData}
          >
            {#snippet children()}
              🚀 Import Vehicle Data
            {/snippet}
          </Button.Root>
          
          <div class="pt-6 border-t border-white/10 mt-4">
            <Button.Root 
              class="w-full bg-red-700/40 hover:bg-red-700/70 text-white rounded-md px-4 py-3 text-sm font-semibold active:scale-[0.98] active:transition-all"
              onclick={clearTelemetry}
            >
              {#snippet children()}
                🗑️ Clear Telemetry Data
              {/snippet}
            </Button.Root>
          </div>
        </div>
      </div>
    </div>
    <!-- ... -->
    <!-- Session Viewer Card -->
    <div class="mt-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4 text-orange-300">Simulation Sessions</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full font-mono text-sm">
          <thead>
            <tr class="text-left border-b border-white/10">
              <th class="py-2 px-4">ID</th>
              <th class="py-2 px-4">Started At</th>
              <th class="py-2 px-4">User</th>
              <th class="py-2 px-4">Vehicle</th>
              <th class="py-2 px-4">Telemetry Points</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#if sessionCount === 0}
              <tr>
                <td class="py-4 px-4 text-center text-white/50" colspan="6">No sessions recorded</td>
              </tr>
            {:else}
              <tr class="border-b border-white/5 hover:bg-white/5">
                <td class="py-2 px-4">1</td>
                <td class="py-2 px-4">2025-05-10 12:34:56</td>
                <td class="py-2 px-4">Anonymous</td>
                <td class="py-2 px-4">HAVOC Airship</td>
                <td class="py-2 px-4">86</td>
                <td class="py-2 px-4">
                  <Button.Root class="text-blue-400 hover:underline">
                    {#snippet children()}
                      View Details
                    {/snippet}
                  </Button.Root>
                </td>
              </tr>
              <!-- Add more rows as needed -->
            {/if}
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 text-xs text-white/50">
        Showing most recent sessions. Real data will populate once sessions are recorded.
      </div>
    </div>
    
    <div class="mt-8">
      <Button.Root
        href="/material"
        class="text-orange-300 hover:text-orange-200 font-semibold flex items-center"
      >
        {#snippet children()}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Simulation
        {/snippet}
      </Button.Root>
    </div>
  </div>
</div>