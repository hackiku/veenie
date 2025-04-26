<!-- src/lib/sims/material/ui/ContextControls.svelte -->
<script lang="ts">
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  import { Slider, Button } from "bits-ui";
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Generate unique IDs for form labels
  const buoyancyId = `buoyancy-slider-${Math.random().toString(36).substring(2, 9)}`;
  const windIntensityId = `wind-intensity-slider-${Math.random().toString(36).substring(2, 9)}`;
  const timeScaleId = `time-scale-slider-${Math.random().toString(36).substring(2, 9)}`;
  
  // Function to handle buoyancy changes from the Slider
  function handleBuoyancyChange(value: number) {
    if (sim) {
      sim.setBuoyancy(value);
    }
  }
  
  // Function to handle wind intensity changes from the Slider
  function handleWindIntensityChange(value: number) {
    if (sim) {
      sim.setWindIntensity(value);
    }
  }
  
  // Toggle wind enabled state
  function toggleWind() {
    if (sim) {
      // Invert the current wind enabled state by checking wind vector
      const conditions = sim.getAtmosphericConditions();
      const currentlyEnabled = conditions.windVector[0] !== 0 || 
                               conditions.windVector[2] !== 0;
      sim.setWindEnabled(!currentlyEnabled);
    }
  }
  
  // Toggle simulation pause state
  function togglePause() {
    if (sim) {
      sim.setPaused(!sim.isPaused());
    }
  }
  
  // Reset simulation
  function resetSimulation() {
    if (sim) {
      sim.resetSimulation();
    }
  }
  
  // Function to handle time scale changes
  function handleTimeScaleChange(value: number) {
    if (sim) {
      sim.setTimeScale(value);
    }
  }
</script>

<div class="fixed left-4 bottom-36 bg-black/80 text-white p-4 rounded font-mono text-sm z-10 w-64">
  <div class="text-center font-bold mb-3">SIMULATION CONTROLS</div>
  
  <div class="space-y-3">
    <!-- Buoyancy Control using Bits UI Slider -->
    <div>
      <label for={buoyancyId} class="block text-white/60 text-xs mb-1">
        Buoyancy: {sim ? sim.getBuoyancy().toFixed(2) : "0.30"}
      </label>
      <div class="w-full">
        <Slider.Root
          id={buoyancyId}
          type="single"
          min={0}
          max={1}
          step={0.01}
          value={sim ? sim.getBuoyancy() : 0.3}
          onValueChange={handleBuoyancyChange}
          class="relative flex w-full touch-none select-none items-center"
        >
          {#snippet children()}
            <span
              class="bg-white/20 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
            >
              <Slider.Range class="bg-white/80 absolute h-full" />
            </span>
            <Slider.Thumb
              index={0}
              class="block size-4 cursor-pointer rounded-full bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 active:scale-95"
            />
          {/snippet}
        </Slider.Root>
      </div>
    </div>
    
    <!-- Wind Controls using Bits UI Slider -->
    <div>
      <label for={windIntensityId} class="block text-white/60 text-xs mb-1">
        Wind Intensity: {sim ? (sim.getAtmosphericConditions().windVector[0]).toFixed(1) : "1.0"}
      </label>
      <div class="w-full">
        <Slider.Root
          id={windIntensityId}
          type="single"
          min={0}
          max={2}
          step={0.1}
          value={sim ? Math.abs(sim.getAtmosphericConditions().windVector[0]) : 1.0}
          onValueChange={handleWindIntensityChange}
          class="relative flex w-full touch-none select-none items-center"
        >
          {#snippet children()}
            <span
              class="bg-white/20 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
            >
              <Slider.Range class="bg-white/80 absolute h-full" />
            </span>
            <Slider.Thumb
              index={0}
              class="block size-4 cursor-pointer rounded-full bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 active:scale-95"
            />
          {/snippet}
        </Slider.Root>
      </div>
    </div>
    
    <!-- Time Scale Control using Bits UI Slider -->
    <div>
      <label for={timeScaleId} class="block text-white/60 text-xs mb-1">
        Time Scale: {sim ? sim.getTimeScale().toFixed(1) : "1.0"}x
      </label>
      <div class="w-full">
        <Slider.Root
          id={timeScaleId}
          type="single"
          min={0.1}
          max={3}
          step={0.1}
          value={sim ? sim.getTimeScale() : 1.0}
          onValueChange={handleTimeScaleChange}
          class="relative flex w-full touch-none select-none items-center"
        >
          {#snippet children()}
            <span
              class="bg-white/20 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
            >
              <Slider.Range class="bg-white/80 absolute h-full" />
            </span>
            <Slider.Thumb
              index={0}
              class="block size-4 cursor-pointer rounded-full bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 active:scale-95"
            />
          {/snippet}
        </Slider.Root>
      </div>
    </div>
    
    <!-- Wind Toggle using Bits UI Button -->
    <div class="pt-2 border-t border-white/20">
      <Button.Root
        class="w-full px-2 py-1 bg-blue-700/40 hover:bg-blue-700/70 rounded text-xs flex items-center justify-center"
        onclick={toggleWind}
      >
        {#snippet children()}
          {#if sim && (sim.getAtmosphericConditions().windVector[0] !== 0 || sim.getAtmosphericConditions().windVector[2] !== 0)}
            🌬️ Disable Wind
          {:else}
            💨 Enable Wind
          {/if}
        {/snippet}
      </Button.Root>
    </div>
    
    <!-- Simulation Controls using Bits UI Buttons -->
    <div class="flex space-x-2 mt-2">
      <Button.Root
        class="flex-1 px-2 py-1 bg-green-700/40 hover:bg-green-700/70 rounded text-xs"
        onclick={togglePause}
      >
        {#snippet children()}
          {sim?.isPaused() ? "▶ Play" : "⏸ Pause"}
        {/snippet}
      </Button.Root>
      
      <Button.Root
        class="flex-1 px-2 py-1 bg-red-700/40 hover:bg-red-700/70 rounded text-xs"
        onclick={resetSimulation}
      >
        {#snippet children()}
          🔄 Reset
        {/snippet}
      </Button.Root>
    </div>
  </div>
</div>