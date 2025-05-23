<!-- src/lib/sims/balloon/world/atmosphere/Atmosphere.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import StaticClouds from './StaticClouds.svelte';
  import AtmosphericLayers from './AtmosphericLayers.svelte';
  import DevAtmoGrids from './DevAtmoGrids.svelte';
  import { SIMULATION_CONSTANTS } from '../../constants';

  // Props
  let {
    showClouds = true,
    showLayers = true,
    showDevGrids = false,
    atmosphericFog = true,
    resetSignal = 0
  } = $props();

  // Atmospheric layer definitions matching altimeter gradient
  const venusLayers = [
    {
      name: 'Surface Haze',
      altitudeRange: [0, 20000],
      color: '#F6A309',
      density: 0.15,
      scattering: 0.8
    },
    {
      name: 'Lower Haze', 
      altitudeRange: [20000, 40000],
      color: '#FDBD4B',
      density: 0.12,
      scattering: 0.6
    },
    {
      name: 'Lower Clouds',
      altitudeRange: [40000, 60000], 
      color: '#FFEDBF',
      density: 0.10,
      scattering: 0.5
    },
    {
      name: 'Middle Clouds',
      altitudeRange: [50000, 70000],
      color: '#E1DCBB', 
      density: 0.08,
      scattering: 0.4
    },
    {
      name: 'Upper Clouds',
      altitudeRange: [60000, 80000],
      color: '#A2BEC6',
      density: 0.06,
      scattering: 0.3
    },
    {
      name: 'Upper Haze',
      altitudeRange: [80000, 120000],
      color: '#85C9FE',
      density: 0.04,
      scattering: 0.2
    },
    {
      name: 'High Atmosphere',
      altitudeRange: [120000, 200000],
      color: '#4D7899',
      density: 0.02,
      scattering: 0.1
    }
  ];

  // Dev toggle state
  let showAtmosphereStats = $state(false);
  
  // Calculate current layer for balloon position
  function getCurrentLayer(altitude: number) {
    return venusLayers.find(layer => 
      altitude >= layer.altitudeRange[0] && altitude < layer.altitudeRange[1]
    ) || venusLayers[0];
  }
</script>

<!-- Multiple Fog Layers for Depth -->
{#if atmosphericFog}
  <!-- Dense lower atmosphere -->
  <T.FogExp2 color="#FFEDBF" density={0.00012} />
  
  <!-- Additional atmospheric scattering effects -->
  <T.Mesh position={[0, 30000, 0]} renderOrder={-10}>
    <T.SphereGeometry args={[400000, 32, 16]} />
    <T.MeshBasicMaterial 
      color="#F6A309"
      transparent={true}
      opacity={0.02}
      side={2}
      fog={false}
    />
  </T.Mesh>
  
  <T.Mesh position={[0, 60000, 0]} renderOrder={-9}>
    <T.SphereGeometry args={[350000, 32, 16]} />
    <T.MeshBasicMaterial 
      color="#E1DCBB"
      transparent={true}
      opacity={0.015}
      side={2}
      fog={false}
    />
  </T.Mesh>
  
  <T.Mesh position={[0, 100000, 0]} renderOrder={-8}>
    <T.SphereGeometry args={[300000, 32, 16]} />
    <T.MeshBasicMaterial 
      color="#85C9FE"
      transparent={true}
      opacity={0.01}
      side={2}
      fog={false}
    />
  </T.Mesh>
{/if}

<!-- Atmospheric Layers Component -->
{#if showLayers}
  <AtmosphericLayers 
    layers={venusLayers}
    {showDevGrids}
  />
{/if}

<!-- Cloud System -->
{#if showClouds}
  <StaticClouds 
    showStats={false}
    showDensityInfo={false}
  />
{/if}

<!-- Development Atmospheric Grids -->
{#if showDevGrids}
  <DevAtmoGrids 
    layers={venusLayers}
  />
{/if}

<!-- Atmosphere Stats for Development -->
{#if showAtmosphereStats}
  <div class="fixed top-20 left-4 bg-black/80 text-white p-3 rounded text-xs font-mono backdrop-blur-sm border border-yellow-400/30">
    <div class="font-bold mb-2 text-yellow-300">🌍 Venus Atmosphere</div>
    
    <div class="space-y-1">
      {#each venusLayers as layer, i}
        <div class="flex justify-between items-center">
          <span class="{i < 3 ? 'text-orange-300' : i < 5 ? 'text-yellow-300' : 'text-blue-300'}">
            {layer.name}:
          </span>
          <span class="text-white/70 text-[10px]">
            {(layer.altitudeRange[0]/1000).toFixed(0)}-{(layer.altitudeRange[1]/1000).toFixed(0)}km
          </span>
        </div>
      {/each}
    </div>
    
    <div class="mt-3 pt-3 border-t border-white/20">
      <div class="text-white/60 text-[10px]">
        Layers: {venusLayers.length} | Fog: {atmosphericFog ? 'ON' : 'OFF'}
      </div>
    </div>
  </div>
{/if}

<!-- Dev Controls -->
<div class="fixed bottom-20 left-4 flex flex-col gap-2">
  <button 
    class="bg-black/60 text-white px-2 py-1 rounded text-xs hover:bg-black/80 border border-white/20"
    onclick={() => showDevGrids = !showDevGrids}
  >
    {showDevGrids ? '🔲' : '⬜'} Atmo Grids
  </button>
  
  <button 
    class="bg-black/60 text-white px-2 py-1 rounded text-xs hover:bg-black/80 border border-white/20"
    onclick={() => showAtmosphereStats = !showAtmosphereStats}
  >
    {showAtmosphereStats ? '📊' : '📈'} Stats
  </button>
  
  <button 
    class="bg-black/60 text-white px-2 py-1 rounded text-xs hover:bg-black/80 border border-white/20"
    onclick={() => atmosphericFog = !atmosphericFog}
  >
    {atmosphericFog ? '🌫️' : '☀️'} Fog
  </button>
</div>