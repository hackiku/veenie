<!-- src/routes/(flight)/admin/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
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

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Venus Simulation Admin</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Database Stats Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Database Stats</h2>
      
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Planets:</span>
          <span class="font-mono">{planetCount}</span>
        </div>
        <div class="flex justify-between">
          <span>Atmosphere Layers:</span>
          <span class="font-mono">{atmosphereLayerCount}</span>
        </div>
        <div class="flex justify-between">
          <span>Vehicles:</span>
          <span class="font-mono">{vehicleCount}</span>
        </div>
        <div class="flex justify-between">
          <span>Materials:</span>
          <span class="font-mono">{materialCount}</span>
        </div>
        <div class="flex justify-between">
          <span>Simulation Sessions:</span>
          <span class="font-mono">{sessionCount}</span>
        </div>
        <div class="flex justify-between">
          <span>Telemetry Points:</span>
          <span class="font-mono">{telemetryCount}</span>
        </div>
      </div>
      
      <button 
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onclick={loadCounts}
      >
        Refresh Counts
      </button>
    </div>
    
    <!-- Data Import Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Data Management</h2>
      
      <div class="space-y-3">
        <button 
          class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onclick={importPlanetData}
        >
          Import Planet Data
        </button>
        
        <button 
          class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onclick={importAtmosphereData}
        >
          Import Atmosphere Data
        </button>
        
        <button 
          class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onclick={importVehicleData}
        >
          Import Vehicle Data
        </button>
        
        <div class="pt-4 border-t border-gray-200">
          <button 
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onclick={clearTelemetry}
          >
            Clear Telemetry Data
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="mt-8">
    <a href="/material" class="text-blue-500 hover:underline">Back to Simulation</a>
  </div>
</div>