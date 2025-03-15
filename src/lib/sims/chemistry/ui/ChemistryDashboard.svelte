<!-- src/lib/sims/chemistry/ui/ChemistryDashboard.svelte -->

<script>
  import { chemistryStore } from '$lib/stores/chemistryStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { Flask, Droplet, Gauge, Zap, Thermometer, ArrowDown } from 'lucide-svelte';
  
  // Use $state for local state
  let chemState = $state(null);
  let timeState = $state(null);
  
  // Subscribe to stores using $effect
  $effect(() => {
    const unsubChemStore = chemistryStore.subscribe(state => {
      chemState = state;
    });
    
    const unsubTimeStore = timeStore.subscribe(state => {
      timeState = state;
    });
    
    return () => {
      unsubChemStore();
      unsubTimeStore();
    };
  });
  
  // Derived values
  const altitude = $derived(chemState ? Math.round(chemState.altitude * 10) / 10 : 0);
  const co2CaptureRate = $derived(chemState ? chemState.production.co2CaptureRate : 0);
  const waterExtraction = $derived(chemState ? chemState.production.waterExtraction : 0);
  const oxygenProduction = $derived(chemState ? chemState.production.oxygenProduction : 0);
  const fuelProduction = $derived(chemState ? chemState.production.fuelProduction : 0);
  
  // Energy consumption in kW
  const energyConsumption = $derived(
    (co2CaptureRate * 0.3) + 
    (waterExtraction * 0.5) + 
    (oxygenProduction * 4.2) + 
    (fuelProduction * 3.8)
  );
  
  // Estimated propellant production per day (kg)
  const propellantPerDay = $derived((oxygenProduction + fuelProduction) * 24);
  
  // Efficiency metrics
  const processEfficiency = $derived(chemState ? chemState.efficiency : 0);
  
  // Elapsed time
  const elapsedTime = $derived(timeState?.elapsedTime.toFixed(1) || '0.0');
  
  // Helper functions to classify values
  function getEfficiencyClass(eff) {
    if (eff > 90) return "text-green-400";
    if (eff > 70) return "text-lime-400";
    if (eff > 50) return "text-yellow-400";
    if (eff > 30) return "text-amber-400";
    return "text-red-400";
  }
  
  function getAltitudeClass(alt) {
    if (alt > 70) return "text-blue-400";
    if (alt > 60) return "text-indigo-400";
    if (alt > 50) return "text-green-400";
    if (alt > 40) return "text-yellow-400";
    if (alt < 30) return "text-red-400";
    return "text-amber-400";
  }
</script>

<div class="fixed bottom-4 left-4 bg-black/40 text-white p-4 rounded-lg shadow-lg z-20 backdrop-blur-sm w-80">
  <h3 class="text-md mb-3 font-semibold flex items-center gap-2">
    <Flask size={18} />
    <span>ISRU Production Dashboard</span>
  </h3>
  
  <div class="grid grid-cols-1 gap-y-3 text-sm">
    <!-- Main process metrics -->
    <div class="flex items-center gap-2">
      <Droplet size={14} class="text-blue-300" />
      <span>CO₂ Capture:</span>
      <span class="font-bold ml-auto text-blue-300">{co2CaptureRate.toFixed(2)} kg/hr</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Droplet size={14} class="text-cyan-300" />
      <span>Water Extraction:</span>
      <span class="font-bold ml-auto text-cyan-300">{waterExtraction.toFixed(2)} kg/hr</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Droplet size={14} class="text-green-300" />
      <span>Oxygen Production:</span>
      <span class="font-bold ml-auto text-green-300">{oxygenProduction.toFixed(2)} kg/hr</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Droplet size={14} class="text-amber-300" />
      <span>Fuel Production:</span>
      <span class="font-bold ml-auto text-amber-300">{fuelProduction.toFixed(2)} kg/hr</span>
    </div>
    
    <div class="h-px bg-gray-700 my-1"></div>
    
    <!-- Summary metrics -->
    <div class="flex items-center gap-2">
      <Zap size={14} class="text-purple-300" />
      <span>Energy Usage:</span>
      <span class="font-bold ml-auto text-purple-300">{energyConsumption.toFixed(1)} kW</span>
    </div>
    
    <div class="flex items-center gap-2">
      <ArrowDown size={14} class="text-rose-300" />
      <span>Daily Production:</span>
      <span class="font-bold ml-auto text-rose-300">{propellantPerDay.toFixed(1)} kg</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Gauge size={14} class="text-yellow-300" />
      <span>Process Efficiency:</span>
      <span class="font-bold ml-auto {getEfficiencyClass(processEfficiency)}">{processEfficiency.toFixed(1)}%</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Thermometer size={14} class="text-white" />
      <span>Altitude:</span>
      <span class="font-bold ml-auto {getAltitudeClass(altitude)}">{altitude.toFixed(1)} km</span>
    </div>
  </div>
  
  <div class="mt-4 p-2 bg-green-900/30 rounded-md">
    <h4 class="text-sm font-semibold mb-1">Optimization Tips</h4>
    <ul class="text-xs space-y-1 text-gray-300">
      <li>• Best CO₂ capture efficiency: 40-65 km</li>
      <li>• Water extraction optimal at 45-55 km</li>
      <li>• Solar energy generation peaks: 55-65 km</li>
      <li>• Target O₂:CH₄ ratio: 3.5:1 for optimal propellant</li>
    </ul>
  </div>
</div>