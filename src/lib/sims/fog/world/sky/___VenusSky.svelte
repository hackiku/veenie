<!-- src/lib/sims/balloon/world/sky/VenusSky.svelte -->
<script lang="ts">
  import { Sky } from '@threlte/extras';
  import { Spring } from 'svelte/motion';
  import { useThrelte } from '@threlte/core';
  
  // Props
  let {
    preset = 'sunset',
    setEnvironment = true,
    autoTransition = true,
    balloonAltitude = 55000,
    exposure = $bindable(0.35) // Make exposure bindable for parent sync
  } = $props();
  
  // Get Threlte context for exposure control
  const { renderer, invalidate } = useThrelte();
  
  // FIXED: Venus-specific sky presets - proper values for good sky rendering
  const venusPresets = {
    surface: {
      azimuth: 180,
      elevation: -2000,      // FIXED: Was -8, too low
      exposure: 0.15,     // FIXED: Brighter
      mieCoefficient: 0.025,  // FIXED: Higher for thick atmosphere
      mieDirectionalG: 0.8,
      rayleigh: 0.5,      // FIXED: Higher for scattering
      turbidity: 50       // FIXED: Lower for visibility
    },
    lowerAtmosphere: {
      azimuth: 180,
      elevation: 2,
      exposure: 0.25,
      mieCoefficient: 0.015,
      mieDirectionalG: 0.75,
      rayleigh: 1.2,
      turbidity: 15
    },
    cloudLayer: {
      azimuth: 180,
      elevation: 5,       // FIXED: Higher sun
      exposure: 0.37,
      mieCoefficient: 0.008,  // FIXED: Lower for cleaner look
      mieDirectionalG: 0.7,
      rayleigh: 2.5,
      turbidity: 10
    },
    upperAtmosphere: {
      azimuth: 180,
      elevation: 15,      // FIXED: Much higher
      exposure: 0.55,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.6,
      rayleigh: 3.2,
      turbidity: 6
    },
    space: {
      azimuth: 180,
      elevation: 45,      // FIXED: High sun
      exposure: 0.8,
      mieCoefficient: 0.002,
      mieDirectionalG: 0.4,
      rayleigh: 3.8,
      turbidity: 2
    }
  };
  
  // FIXED: Spring for smooth transitions with better timing
  const presetSpring = new Spring(venusPresets.cloudLayer, {
    damping: 0.8,      // FIXED: Faster response
    precision: 0.001,
    stiffness: 0.1     // FIXED: More responsive
  });
  
  // Apply preset based on altitude
  function getPresetForAltitude(altitude: number) {
    if (altitude < 15000) return venusPresets.surface;
    if (altitude < 35000) return venusPresets.lowerAtmosphere;
    if (altitude < 65000) return venusPresets.cloudLayer;
    if (altitude < 90000) return venusPresets.upperAtmosphere;
    return venusPresets.space;
  }
  
  // Manual preset controls
  let azimuth = $state(venusPresets.cloudLayer.azimuth);
  let elevation = $state(venusPresets.cloudLayer.elevation);
  let mieCoefficient = $state(venusPresets.cloudLayer.mieCoefficient);
  let mieDirectionalG = $state(venusPresets.cloudLayer.mieDirectionalG);
  let rayleigh = $state(venusPresets.cloudLayer.rayleigh);
  let turbidity = $state(venusPresets.cloudLayer.turbidity);
  
  // Current preset tracking
  let currentPresetName = $state('cloudLayer');
  
  // Apply preset values
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
  
  // FIXED: Better altitude-based transitions
  $effect(() => {
    if (autoTransition) {
      const targetPreset = getPresetForAltitude(balloonAltitude);
      const presetName = Object.entries(venusPresets).find(([name, data]) => 
        data === targetPreset
      )?.[0] || 'cloudLayer';
      
      applyPreset(targetPreset, presetName);
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
  
  // FIXED: Proper exposure sync with renderer
  $effect(() => {
    if (renderer && presetSpring.current) {
      renderer.toneMappingExposure = presetSpring.current.exposure;
      exposure = presetSpring.current.exposure; // Sync back to parent
      invalidate();
    }
  });
  
  // Dev controls state
  let showDevControls = $state(false);
  
  // Available presets for quick switching
  const availablePresets = Object.keys(venusPresets);
</script>

<!-- FIXED: Venus Sky with proper configuration -->
<Sky
  {setEnvironment}
  cubeMapSize={512}     
  scale={10000}         
  azimuth={presetSpring.current?.azimuth || azimuth}
  elevation={presetSpring.current?.elevation || elevation}
  mieCoefficient={presetSpring.current?.mieCoefficient || mieCoefficient}
  mieDirectionalG={presetSpring.current?.mieDirectionalG || mieDirectionalG}
  rayleigh={presetSpring.current?.rayleigh || rayleigh}
  turbidity={presetSpring.current?.turbidity || turbidity}
/>

<!-- FIXED: Cleaner Dev Controls -->
{#if showDevControls}
  <div class="fixed top-4 left-4 bg-black/90 text-white p-4 rounded-lg text-sm font-mono backdrop-blur-sm max-w-sm z-50 border border-white/20">
    <div class="font-bold mb-3 text-orange-400">🌤️ Venus Sky Controls</div>
    
    <!-- Current Status -->
    <div class="mb-4 p-3 bg-black/40 rounded border border-white/10">
      <div class="text-white/80 mb-1">
        Preset: <span class="text-cyan-300 font-bold">{currentPresetName}</span>
      </div>
      <div class="text-white/60 text-xs">
        Altitude: {(balloonAltitude / 1000).toFixed(1)}km | 
        Exposure: {(presetSpring.current?.exposure || exposure).toFixed(2)}
      </div>
    </div>
    
    <!-- Auto Transition Toggle -->
    <div class="mb-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input 
          type="checkbox" 
          bind:checked={autoTransition}
          class="rounded"
        />
        <span class="text-white/80">Auto transition by altitude</span>
      </label>
    </div>
    
    <!-- Manual Controls -->
    <div class="space-y-3">
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Elevation: {elevation.toFixed(1)}° 
          <span class="text-white/50">(Sun height)</span>
        </label>
        <input type="range" bind:value={elevation} min="-5" max="45" step="0.5" 
               class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Rayleigh: {rayleigh.toFixed(1)} 
          <span class="text-white/50">(Sky color)</span>
        </label>
        <input type="range" bind:value={rayleigh} min="0" max="4" step="0.1" 
               class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Turbidity: {turbidity.toFixed(0)} 
          <span class="text-white/50">(Atmosphere thickness)</span>
        </label>
        <input type="range" bind:value={turbidity} min="1" max="25" step="1" 
               class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
      </div>
      
      <div>
        <label class="block text-white/70 mb-1 text-xs">
          Mie Coeff: {mieCoefficient.toFixed(3)} 
          <span class="text-white/50">(Haze)</span>
        </label>
        <input type="range" bind:value={mieCoefficient} min="0" max="0.05" step="0.001" 
               class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
      </div>
    </div>
    
    <!-- Quick Presets -->
    <div class="mt-4 pt-3 border-t border-white/20">
      <div class="text-white/70 text-xs mb-2">Quick Presets:</div>
      <div class="grid grid-cols-2 gap-1">
        {#each availablePresets.slice(0, 4) as presetName}
          <button 
            class="px-2 py-1 text-xs rounded transition-colors {currentPresetName === presetName ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"
            onclick={() => {
              applyPreset(venusPresets[presetName], presetName);
              autoTransition = false; // Disable auto when manually selecting
            }}
          >
            {presetName}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- Toggle button for dev controls -->
<div class="fixed bottom-32 left-4">
  <button 
    class="bg-black/60 text-white px-3 py-2 rounded text-sm hover:bg-black/80 border border-white/20 transition-colors"
    onclick={() => showDevControls = !showDevControls}
  >
    {showDevControls ? '🌤️' : '☀️'} Sky
  </button>
</div>