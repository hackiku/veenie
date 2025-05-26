<!-- src/lib/sims/balloon/world/sky/VenusSky.svelte -->
<script lang="ts">
  import { Sky } from '@threlte/extras';
  import { Spring } from 'svelte/motion';
  import { useThrelte } from '@threlte/core';
  
  // Props - simplified like the docs
  let {
    setEnvironment = true,
    balloonAltitude = 55000,
    exposure = $bindable(0.37)
  } = $props();
  
  // Get Threlte context for exposure control
  const { renderer, invalidate } = useThrelte();
  
  // Venus presets - simplified and optimized for 55km altitude
  const venusPresets = {
    custom: {
      azimuth: 180,
      elevation: 10.5,
      exposure: 0.7,
      mieCoefficient: 0.05,
      mieDirectionalG: 0.7,
      rayleigh: 2,
      turbidity: 40
    },
    sunset: {
      azimuth: 180,
      elevation: 0.5,
      exposure: 0.37,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      rayleigh: 3,
      turbidity: 10
    },
    afternoon: {
      azimuth: 180,
      elevation: 30,
      exposure: 0.65,
      mieCoefficient: 0.002,
      mieDirectionalG: 0.86,
      rayleigh: 0.3,
      turbidity: 4.78
    },
    noon: {
      azimuth: 180,
      elevation: 85,
      exposure: 1,
      mieCoefficient: 0.013,
      mieDirectionalG: 0.7,
      rayleigh: 0.17,
      turbidity: 0.65
    },
    night: {
      azimuth: 180,
      elevation: -5,
      exposure: 0.26,
      mieCoefficient: 0.038,
      mieDirectionalG: 0,
      rayleigh: 0.57,
      turbidity: 20
    }
  };
  
  const entries = Object.entries(venusPresets);
  
  // Spring exactly like docs
  const presetSpring = new Spring(venusPresets.sunset, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  });
  
  // Individual controls like docs
  let azimuth = $state(0);
  let elevation = $state(0);
  let mieCoefficient = $state(0);
  let mieDirectionalG = $state(0);
  let rayleigh = $state(0);
  let turbidity = $state(0);
  
  // Apply preset function like docs
  const applyPreset = (preset) => {
    azimuth = preset.azimuth;
    elevation = preset.elevation;
    exposure = preset.exposure;
    mieCoefficient = preset.mieCoefficient;
    mieDirectionalG = preset.mieDirectionalG;
    rayleigh = preset.rayleigh;
    turbidity = preset.turbidity;
  };
  
  // Initialize with sunset preset
  applyPreset(venusPresets.custom);
  
  // Update spring when values change - exactly like docs
  $effect(() => {
    presetSpring.set({
      azimuth,
      elevation,
      exposure,
      mieCoefficient,
      mieDirectionalG,
      rayleigh,
      turbidity
    });
  });
  
  // Update renderer exposure
  $effect(() => {
    if (renderer) {
      renderer.toneMappingExposure = presetSpring.current.exposure;
      invalidate();
    }
  });
  
  // Dev controls toggle
  let showControls = $state(false);
</script>

<!-- Sky component exactly like docs -->
<Sky
  {setEnvironment}
  {...presetSpring.current}
/>

<!-- Dev controls panel like docs example -->
{#if showControls}
  <div class="fixed top-4 right-4 bg-black/80 text-white p-4 rounded text-sm font-mono backdrop-blur-sm max-w-sm z-50">
    <div class="font-bold mb-3 text-yellow-300">🌤️ Venus Sky</div>
    
    <!-- Set Environment Toggle -->
    <div class="mb-4">
      <label class="flex items-center gap-2">
        <input type="checkbox" bind:checked={setEnvironment} class="rounded" />
        <span>Set Environment</span>
      </label>
    </div>
    
    <!-- Sliders like docs -->
    <div class="space-y-3">
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Turbidity: {turbidity.toFixed(2)}
        </label>
        <input type="range" bind:value={turbidity} min="0" max="20" step="0.1" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Rayleigh: {rayleigh.toFixed(2)}
        </label>
        <input type="range" bind:value={rayleigh} min="0" max="4" step="0.1" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Azimuth: {azimuth.toFixed(0)}
        </label>
        <input type="range" bind:value={azimuth} min="-180" max="180" step="1" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Elevation: {elevation.toFixed(1)}
        </label>
        <input type="range" bind:value={elevation} min="-5" max="90" step="0.5" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Mie Coefficient: {mieCoefficient.toFixed(3)}
        </label>
        <input type="range" bind:value={mieCoefficient} min="0" max="0.1" step="0.001" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Mie Directional G: {mieDirectionalG.toFixed(2)}
        </label>
        <input type="range" bind:value={mieDirectionalG} min="0" max="1" step="0.01" 
               class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Exposure: {exposure.toFixed(2)}
        </label>
        <input type="range" bind:value={exposure} min="0" max="2" step="0.01" 
               class="w-full" />
      </div>
    </div>
    
    <!-- Presets like docs -->
    <div class="mt-4 pt-3 border-t border-white/20">
      <div class="text-white/70 text-xs mb-2">Presets:</div>
      <div class="grid grid-cols-2 gap-1">
        {#each entries as [title, preset]}
          <button 
            class="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
            onclick={() => applyPreset(preset)}
          >
            {title}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- Toggle button -->
<div class="fixed bottom-32 left-4">
  <button 
    class="bg-black/60 text-white px-3 py-2 rounded text-xs hover:bg-black/80 border border-white/20"
    onclick={() => showControls = !showControls}
  >
    {showControls ? '🌤️' : '☀️'} Sky
  </button>
</div>