<!-- src/lib/sims/balloon/world/atmosphere/VenusSky.svelte -->
<script lang="ts">
  import { Sky } from '@threlte/extras';
  import { Spring } from 'svelte/motion';
  import { presets } from './skyPresets';
  import type { Preset } from './skyPresets';
  
  // Props
  let {
    preset = 'sunset',
    setEnvironment = true,
    autoTransition = false,
    transitionDuration = 5000, // ms
    balloonAltitude = 55000 // For altitude-based sky changes
  } = $props();
  
  // Venus-specific sky presets
  const venusPresets = {
    surface: {
      azimuth: 0,
      elevation: -10,
      exposure: 0.15,
      mieCoefficient: 0.1,
      mieDirectionalG: 0.8,
      rayleigh: 0.1,
      turbidity: 50
    },
    lowerAtmosphere: {
      azimuth: 0,
      elevation: 5,
      exposure: 0.25,
      mieCoefficient: 0.05,
      mieDirectionalG: 0.7,
      rayleigh: 0.5,
      turbidity: 30
    },
    cloudLayer: {
      azimuth: 0,
      elevation: 10,
      exposure: 0.35,
      mieCoefficient: 0.02,
      mieDirectionalG: 0.6,
      rayleigh: 1.0,
      turbidity: 15
    },
    upperAtmosphere: {
      azimuth: 0,
      elevation: 20,
      exposure: 0.5,
      mieCoefficient: 0.01,
      mieDirectionalG: 0.4,
      rayleigh: 2.0,
      turbidity: 5
    },
    space: {
      azimuth: 0,
      elevation: 45,
      exposure: 0.8,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.2,
      rayleigh: 3.0,
      turbidity: 1
    }
  };
  
  // Spring for smooth transitions
  const presetSpring = new Spring(venusPresets.cloudLayer, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  });
  
  // Current preset state
  let currentPreset = $state(venusPresets[preset] || venusPresets.cloudLayer);
  
  // Apply preset based on altitude
  function getPresetForAltitude(altitude: number): Preset {
    if (altitude < 10000) return venusPresets.surface;
    if (altitude < 40000) return venusPresets.lowerAtmosphere;
    if (altitude < 70000) return venusPresets.cloudLayer;
    if (altitude < 100000) return venusPresets.upperAtmosphere;
    return venusPresets.space;
  }
  
  // Update preset based on altitude
  $effect(() => {
    if (autoTransition) {
      const targetPreset = getPresetForAltitude(balloonAltitude);
      currentPreset = targetPreset;
      presetSpring.set(targetPreset);
    } else {
      const targetPreset = venusPresets[preset] || venusPresets.cloudLayer;
      currentPreset = targetPreset;
      presetSpring.set(targetPreset);
    }
  });
  
  // Manual preset controls
  let azimuth = $state(currentPreset.azimuth);
  let elevation = $state(currentPreset.elevation);
  let exposure = $state(currentPreset.exposure);
  let mieCoefficient = $state(currentPreset.mieCoefficient);
  let mieDirectionalG = $state(currentPreset.mieDirectionalG);
  let rayleigh = $state(currentPreset.rayleigh);
  let turbidity = $state(currentPreset.turbidity);
  
  // Apply preset values to individual controls
  function applyPreset(preset: Preset) {
    azimuth = preset.azimuth;
    elevation = preset.elevation;
    exposure = preset.exposure;
    mieCoefficient = preset.mieCoefficient;
    mieDirectionalG = preset.mieDirectionalG;
    rayleigh = preset.rayleigh;
    turbidity = preset.turbidity;
  }
  
  // Update spring when individual values change
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
  
  // Dev controls state
  let showDevControls = $state(false);
  
  // Available presets for quick switching
  const availablePresets = Object.keys(venusPresets);
</script>

<!-- Venus Sky -->
<Sky
  {setEnvironment}
  {...presetSpring.current}
/>

<!-- Dev Controls -->
{#if showDevControls}
  <div class="fixed top-4 left-4 bg-black/80 text-white p-4 rounded text-xs font-mono backdrop-blur-sm max-w-sm">
    <div class="font-bold mb-3 text-yellow-300">🌤️ Venus Sky Controls</div>
    
    <!-- Preset Selection -->
    <div class="mb-4">
      <label class="block text-white/70 mb-2">Preset:</label>
      <div class="grid grid-cols-2 gap-1">
        {#each availablePresets as presetName}
          <button 
            class="px-2 py-1 rounded text-xs {preset === presetName ? 'bg-blue-600' : 'bg-gray-700'}"
            onclick={() => {
              preset = presetName;
              applyPreset(venusPresets[presetName]);
            }}
          >
            {presetName}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Auto Transition Toggle -->
    <div class="mb-4">
      <label class="flex items-center gap-2">
        <input 
          type="checkbox" 
          bind:checked={autoTransition}
          class="rounded"
        />
        <span class="text-white/70">Auto transition by altitude</span>
      </label>
    </div>
    
    <!-- Manual Controls -->
    <div class="space-y-3">
      <div>
        <label class="block text-white/70 mb-1">Azimuth: {azimuth.toFixed(1)}</label>
        <input type="range" bind:value={azimuth} min="0" max="360" step="1" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Elevation: {elevation.toFixed(1)}</label>
        <input type="range" bind:value={elevation} min="-10" max="90" step="0.5" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Exposure: {exposure.toFixed(2)}</label>
        <input type="range" bind:value={exposure} min="0" max="1" step="0.01" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Rayleigh: {rayleigh.toFixed(2)}</label>
        <input type="range" bind:value={rayleigh} min="0" max="4" step="0.1" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Turbidity: {turbidity.toFixed(1)}</label>
        <input type="range" bind:value={turbidity} min="0" max="50" step="1" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Mie Coefficient: {mieCoefficient.toFixed(3)}</label>
        <input type="range" bind:value={mieCoefficient} min="0" max="0.2" step="0.005" class="w-full" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1">Mie Directional G: {mieDirectionalG.toFixed(2)}</label>
        <input type="range" bind:value={mieDirectionalG} min="0" max="1" step="0.1" class="w-full" />
      </div>
    </div>
    
    <div class="mt-4 pt-3 border-t border-white/20 text-xs text-white/60">
      Current altitude: {(balloonAltitude / 1000).toFixed(1)}km
    </div>
  </div>
{/if}

<!-- Toggle button for dev controls -->
<div class="fixed bottom-32 left-4">
  <button 
    class="bg-black/60 text-white px-3 py-2 rounded text-xs hover:bg-black/80 border border-white/20"
    onclick={() => showDevControls = !showDevControls}
  >
    {showDevControls ? '🌤️' : '☀️'} Sky
  </button>
</div>