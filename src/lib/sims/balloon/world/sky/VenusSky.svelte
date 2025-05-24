<!-- src/lib/sims/balloon/world/sky/VenusSky.svelte -->
<script lang="ts">
  import { Sky } from '@threlte/extras';
  import { Spring } from 'svelte/motion';
  import { useThrelte } from '@threlte/core';
  import { presets } from '../atmosphere/skyPresets';
  import type { Preset } from '../atmosphere/skyPresets';
  
  // Props
  let {
    preset = 'sunset',
    setEnvironment = true,
    autoTransition = true,
    balloonAltitude = 55000, // For altitude-based sky changes
    exposure: exposureProp // Pass exposure back to parent
  } = $props();
  
  // Get Threlte context for exposure control
  const { renderer, invalidate } = useThrelte();
  
  // Venus-specific sky presets - tuned for Venus atmosphere
  const venusPresets = {
    surface: {
      azimuth: 180,
      elevation: -8,
      exposure: 0.1,
      mieCoefficient: 0.08,
      mieDirectionalG: 0.85,
      rayleigh: 0.2,
      turbidity: 50
    },
    lowerAtmosphere: {
      azimuth: 180,
      elevation: 2,
      exposure: 0.2,
      mieCoefficient: 0.04,
      mieDirectionalG: 0.75,
      rayleigh: 0.8,
      turbidity: 25
    },
    cloudLayer: {
      azimuth: 180,
      elevation: 8,
      exposure: 0.35,
      mieCoefficient: 0.015,
      mieDirectionalG: 0.65,
      rayleigh: 1.5,
      turbidity: 15
    },
    upperAtmosphere: {
      azimuth: 180,
      elevation: 25,
      exposure: 0.55,
      mieCoefficient: 0.008,
      mieDirectionalG: 0.5,
      rayleigh: 2.5,
      turbidity: 8
    },
    space: {
      azimuth: 180,
      elevation: 50,
      exposure: 0.8,
      mieCoefficient: 0.003,
      mieDirectionalG: 0.3,
      rayleigh: 3.2,
      turbidity: 2
    }
  };
  
  // Spring for smooth transitions
  const presetSpring = new Spring(venusPresets.cloudLayer, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  });
  
  // Apply preset based on altitude
  function getPresetForAltitude(altitude: number) {
    if (altitude < 10000) return venusPresets.surface;
    if (altitude < 40000) return venusPresets.lowerAtmosphere;
    if (altitude < 70000) return venusPresets.cloudLayer;
    if (altitude < 100000) return venusPresets.upperAtmosphere;
    return venusPresets.space;
  }
  
  // Manual preset controls (for dev panel)
  let azimuth = $state(venusPresets.cloudLayer.azimuth);
  let elevation = $state(venusPresets.cloudLayer.elevation);
  let exposure = $state(venusPresets.cloudLayer.exposure);
  let mieCoefficient = $state(venusPresets.cloudLayer.mieCoefficient);
  let mieDirectionalG = $state(venusPresets.cloudLayer.mieDirectionalG);
  let rayleigh = $state(venusPresets.cloudLayer.rayleigh);
  let turbidity = $state(venusPresets.cloudLayer.turbidity);
  
  // Current preset tracking
  let currentPresetName = $state('cloudLayer');
  
  // Apply preset values to individual controls
  function applyPreset(presetData: any, presetName: string) {
    azimuth = presetData.azimuth;
    elevation = presetData.elevation;
    exposure = presetData.exposure;
    mieCoefficient = presetData.mieCoefficient;
    mieDirectionalG = presetData.mieDirectionalG;
    rayleigh = presetData.rayleigh;
    turbidity = presetData.turbidity;
    currentPresetName = presetName;
  }
  
  // Update based on altitude or manual preset
  $effect(() => {
    let targetPreset;
    let presetName;
    
    if (autoTransition) {
      // Get preset based on balloon altitude
      targetPreset = getPresetForAltitude(balloonAltitude);
      
      // Find the name of this preset
      presetName = Object.entries(venusPresets).find(([name, data]) => 
        data === targetPreset
      )?.[0] || 'cloudLayer';
      
      applyPreset(targetPreset, presetName);
    } else {
      targetPreset = venusPresets[preset] || venusPresets.cloudLayer;
      applyPreset(targetPreset, preset);
    }
  });
  
  // Update spring when values change
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
      renderer.toneMappingExposure = exposure;
      invalidate();
    }
    
    // Pass exposure back to parent if needed
    if (exposureProp !== undefined) {
      exposureProp = exposure;
    }
  });
  
  // Dev controls state
  let showDevControls = $state(false);
  
  // Available presets for quick switching
  const availablePresets = Object.keys(venusPresets);
</script>

<!-- Venus Sky with higher resolution for better quality -->
<Sky
  {setEnvironment}
  cubeMapSize={512}
  scale={10000}
  {...presetSpring.current}
/>

<!-- Dev Controls -->
{#if showDevControls}
  <div class="fixed top-4 left-4 bg-black/80 text-white p-4 rounded text-xs font-mono backdrop-blur-sm max-w-sm z-50">
    <div class="font-bold mb-3 text-yellow-300">🌤️ Venus Sky Controls</div>
    
    <!-- Current Status -->
    <div class="mb-4 p-2 bg-black/40 rounded">
      <div class="text-white/70 mb-1">Current: <span class="text-cyan-300">{currentPresetName}</span></div>
      <div class="text-white/60 text-[10px]">Altitude: {(balloonAltitude / 1000).toFixed(1)}km</div>
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
    
    <!-- Preset Selection -->
    {#if !autoTransition}
      <div class="mb-4">
        <label class="block text-white/70 mb-2">Manual Preset:</label>
        <div class="grid grid-cols-2 gap-1">
          {#each availablePresets as presetName}
            <button 
              class="px-2 py-1 rounded text-xs {currentPresetName === presetName ? 'bg-blue-600' : 'bg-gray-700'}"
              onclick={() => {
                applyPreset(venusPresets[presetName], presetName);
              }}
            >
              {presetName}
            </button>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Manual Controls -->
    <div class="space-y-2">
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Azimuth: {azimuth.toFixed(0)}°</label>
        <input type="range" bind:value={azimuth} min="0" max="360" step="1" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Elevation: {elevation.toFixed(1)}°</label>
        <input type="range" bind:value={elevation} min="-10" max="90" step="0.5" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Exposure: {exposure.toFixed(2)}</label>
        <input type="range" bind:value={exposure} min="0" max="1" step="0.01" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Rayleigh: {rayleigh.toFixed(2)}</label>
        <input type="range" bind:value={rayleigh} min="0" max="4" step="0.1" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Turbidity: {turbidity.toFixed(0)}</label>
        <input type="range" bind:value={turbidity} min="0" max="50" step="1" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Mie Coeff: {mieCoefficient.toFixed(3)}</label>
        <input type="range" bind:value={mieCoefficient} min="0" max="0.1" step="0.005" class="w-full h-1" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-[10px]">Mie Dir G: {mieDirectionalG.toFixed(2)}</label>
        <input type="range" bind:value={mieDirectionalG} min="0" max="1" step="0.05" class="w-full h-1" />
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="mt-4 pt-3 border-t border-white/20 flex gap-2">
      <button 
        class="px-2 py-1 bg-orange-600 text-white text-[10px] rounded"
        onclick={() => applyPreset(venusPresets.surface, 'surface')}
      >
        Surface
      </button>
      <button 
        class="px-2 py-1 bg-yellow-600 text-white text-[10px] rounded"
        onclick={() => applyPreset(venusPresets.cloudLayer, 'cloudLayer')}
      >
        Clouds
      </button>
      <button 
        class="px-2 py-1 bg-blue-600 text-white text-[10px] rounded"
        onclick={() => applyPreset(venusPresets.space, 'space')}
      >
        Space
      </button>
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