<!-- src/lib/sims/material/ui/ContextControls.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Local state for form inputs
  let buoyancyValue = $state(0.3);
  let windIntensity = $state(1.0);
  let windEnabled = $state(true);
  let timeScaleValue = $state(1.0);
  
  // Initialize values from context when available
  $effect(() => {
    if (sim) {
      timeScaleValue = sim.timeScale;
      windEnabled = sim.atmosphericConditions.windVector[0] > 0;
    }
  });
  
  // Update buoyancy when input changes
  function handleBuoyancyChange(e: Event) {
    const input = e.target as HTMLInputElement;
    buoyancyValue = parseFloat(input.value);
    sim.setBuoyancy(buoyancyValue);
  }
  
  // Update wind intensity when input changes
  function handleWindIntensityChange(e: Event) {
    const input = e.target as HTMLInputElement;
    windIntensity = parseFloat(input.value);
    sim.setWindIntensity(windIntensity);
  }
  
  // Toggle wind enabled state
  function handleWindEnabledChange(e: Event) {
    const input = e.target as HTMLInputElement;
    windEnabled = input.checked;
    sim.setWindEnabled(windEnabled);
  }
  
  // Update time scale when input changes
  function handleTimeScaleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    timeScaleValue = parseFloat(input.value);
    sim.setTimeScale(timeScaleValue);
  }
</script>

<div class="fixed left-4 bottom-36 bg-black/80 text-white p-4 rounded font-mono text-sm z-10 w-64">
  <div class="text-center font-bold mb-3">SIMULATION CONTROLS</div>
  
  <div class="space-y-3">
    <!-- Buoyancy Control -->
    <div>
      <label class="block text-white/60 text-xs mb-1">Buoyancy: {buoyancyValue.toFixed(2)}</label>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={buoyancyValue}
        oninput={handleBuoyancyChange}
        class="w-full"
      />
    </div>
    
    <!-- Wind Controls -->
    <div>
      <label class="block text-white/60 text-xs mb-1">Wind Intensity: {windIntensity.toFixed(1)}</label>
      <input 
        type="range" 
        min="0" 
        max="2" 
        step="0.1" 
        value={windIntensity}
        oninput={handleWindIntensityChange}
        class="w-full"
      />
    </div>
    
    <div class="flex items-center">
      <input 
        type="checkbox" 
        id="wind-toggle"
        checked={windEnabled}
        onchange={handleWindEnabledChange}
        class="mr-2"
      />
      <label for="wind-toggle" class="text-xs">Enable Wind</label>
    </div>
    
    <!-- Time Scale -->
    <div>
      <label class="block text-white/60 text-xs mb-1">Time Scale: {timeScaleValue.toFixed(1)}x</label>
      <input 
        type="range" 
        min="0.1" 
        max="3" 
        step="0.1" 
        value={timeScaleValue}
        oninput={handleTimeScaleChange}
        class="w-full"
      />
    </div>
    
    <!-- Simulation Controls -->
    <div class="flex space-x-2 pt-2 mt-2 border-t border-white/20">
      <button 
        class="flex-1 px-2 py-1 bg-green-700/40 hover:bg-green-700/70 rounded text-xs"
        onclick={() => sim.setPaused(!sim.paused)}
      >
        {sim.paused ? "▶ Play" : "⏸ Pause"}
      </button>
      
      <button 
        class="flex-1 px-2 py-1 bg-red-700/40 hover:bg-red-700/70 rounded text-xs"
        onclick={() => sim.resetSimulation()}
      >
        🔄 Reset
      </button>
    </div>
  </div>
</div>