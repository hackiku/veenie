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

  // Safe getters with fallbacks
  const buoyancy = $derived(() => {
    try {
      const value = sim?.getBuoyancy();
      return typeof value === 'number' ? value : 0.3;
    } catch (e) {
      return 0.3;
    }
  });
  
  const windIntensity = $derived(() => {
    try {
      let value = 1.0;
      if (sim?.atmosphere) {
        value = sim.atmosphere.getWindIntensity();
      } else if (sim?.models?.atmosphere) {
        value = sim.models.atmosphere.getWindIntensity();
      }
      return typeof value === 'number' ? value : 1.0;
    } catch (e) {
      return 1.0;
    }
  });
  
  const timeScale = $derived(() => {
    try {
      const value = sim?.getTimeScale();
      return typeof value === 'number' ? value : 1.0;
    } catch (e) {
      return 1.0;
    }
  });
  
  const windEnabled = $derived(() => {
    try {
      if (!sim) return true;
      const conditions = sim.getAtmosphericConditions();
      return conditions?.windVector && 
        (Math.abs(conditions.windVector[0]) > 0.01 || 
         Math.abs(conditions.windVector[2]) > 0.01);
    } catch (e) {
      return true;
    }
  });

  // Format values safely
  const buoyancyText = $derived(() => {
    return typeof buoyancy === 'number' ? buoyancy.toFixed(2) : '0.30';
  });
  
  const windIntensityText = $derived(() => {
    return typeof windIntensity === 'number' ? windIntensity.toFixed(1) : '1.0';
  });
  
  const timeScaleText = $derived(() => {
    return typeof timeScale === 'number' ? timeScale.toFixed(1) : '1.0';
  });

  // Function to handle buoyancy changes
  function handleBuoyancyChange(value) {
    if (sim?.setBuoyancy) {
      sim.setBuoyancy(value);
    }
  }

  // Function to handle wind intensity changes
  function handleWindIntensityChange(value) {
    if (sim?.setWindIntensity) {
      sim.setWindIntensity(value);
    }
  }

  // Toggle wind enabled state
  function toggleWind() {
    if (sim?.setWindEnabled) {
      sim.setWindEnabled(!windEnabled);
    }
  }

  // Function to handle time scale changes
  function handleTimeScaleChange(value) {
    if (sim?.setTimeScale) {
      sim.setTimeScale(value);
    }
  }
</script>

<div
  class="fixed left-4 bottom-36 bg-black/80 text-white p-4 rounded font-mono text-sm z-10 w-64"
>
  <div class="text-center font-bold mb-3">SIMULATION CONTROLS</div>

  <div class="space-y-3">
    <!-- Buoyancy Control -->
    <div>
      <label for={buoyancyId} class="block text-white/60 text-xs mb-1">
        Buoyancy: {buoyancyText}
      </label>
      <div class="w-full">
        <Slider.Root
          id={buoyancyId}
          type="single"
          min={0}
          max={1}
          step={0.01}
          value={buoyancy}
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

    <!-- Wind Controls -->
    <div>
      <label for={windIntensityId} class="block text-white/60 text-xs mb-1">
        Wind Intensity: {windIntensityText}
      </label>
      <div class="w-full">
        <Slider.Root
          id={windIntensityId}
          type="single" 
          min={0}
          max={2}
          step={0.10}
          value={windIntensity}
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

    <!-- Time Scale Control -->
    <div>
      <label for={timeScaleId} class="block text-white/60 text-xs mb-1">
        Time Scale: {timeScaleText}x
      </label>
      <div class="w-full">
        <Slider.Root
          id={timeScaleId}
          type="single"
          min={0.1}
          max={3}
          step={0.1}
          value={timeScale}
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

    <!-- Wind Toggle Button -->
    <div class="pt-2 border-t border-white/20">
      <Button.Root
        class="w-full px-2 py-1 bg-blue-700/40 hover:bg-blue-700/70 rounded text-xs flex items-center justify-center"
        onclick={toggleWind}
      >
        {#snippet children()}
          {#if windEnabled}
            🌬️ Disable Wind
          {:else}
            💨 Enable Wind
          {/if}
        {/snippet}
      </Button.Root>
    </div>
  </div>
</div>