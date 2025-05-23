<!-- src/lib/sims/balloon/world/atmosphere/DevAtmoGrids.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  import * as THREE from 'three';

  // Props
  let {
    layers = [],
		keyLayers
  } = $props();

  // Grid configurations for different atmospheric layers
  function getGridConfig(layer: any, index: number) {
    const centerAltitude = layer.altitudeRange[0] + (layer.altitudeRange[1] - layer.altitudeRange[0]) / 2;
    
    // Different grid styles for different altitude ranges
    if (centerAltitude < 40000) {
      // Lower atmosphere - dense, smaller grids
      return {
        cellSize: 5000,      // 5km cells
        sectionSize: 25000,  // 25km sections
        opacity: 0.15,
        color: layer.color + '40', // Add alpha
        sectionColor: layer.color + '60'
      };
    } else if (centerAltitude < 80000) {
      // Middle atmosphere - medium grids
      return {
        cellSize: 10000,     // 10km cells
        sectionSize: 50000,  // 50km sections
        opacity: 0.12,
        color: layer.color + '30',
        sectionColor: layer.color + '50'
      };
    } else {
      // Upper atmosphere - large, sparse grids
      return {
        cellSize: 20000,     // 20km cells
        sectionSize: 100000, // 100km sections
        opacity: 0.08,
        color: layer.color + '20',
        sectionColor: layer.color + '40'
      };
    }
  }

  // Only show grids for key layers to avoid clutter
  $effect(() => { keyLayers = layers.filter((layer, i) => 
    layer.name.includes('Haze') || 
    layer.name.includes('Clouds') ||
    i % 2 === 0 // Every other layer
  );
	})
</script>

<!-- Atmospheric Layer Reference Grids -->
{#each keyLayers as layer, i}
  {@const centerAltitude = layer.altitudeRange[0] + (layer.altitudeRange[1] - layer.altitudeRange[0]) / 2}
  {@const config = getGridConfig(layer, i)}
  
  <!-- Horizontal grid at layer altitude -->
  <T.Group position={[0, centerAltitude, 0]}>
    <Grid 
      cellSize={config.cellSize}
      sectionSize={config.sectionSize}
      cellColor={config.color}
      sectionColor={config.sectionColor}
      fadeDistance={50000}
      infiniteGrid={true}
      followCamera={false}
    />
    
    <!-- Layer label for reference -->
    <T.Mesh position={[80000, 1000, 0]}>
      <T.PlaneGeometry args={[15000, 3000]} />
      <T.MeshBasicMaterial 
        color="#000000"
        transparent={true}
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </T.Mesh>
    
    <!-- Altitude markers at grid intersections -->
    {#each [-75000, -25000, 25000, 75000] as x}
      {#each [-75000, -25000, 25000, 75000] as z}
        <T.Mesh position={[x, 500, z]}>
          <T.CylinderGeometry args={[200, 200, 1000, 8]} />
          <T.MeshBasicMaterial 
            color={layer.color}
            transparent={true}
            opacity={config.opacity * 2}
          />
        </T.Mesh>
      {/each}
    {/each}
			</T.Group>
  
  <!-- Vertical grid boundaries (top and bottom of layer) -->
  <T.Group position={[0, layer.altitudeRange[0], 0]}>
    <T.Mesh>
      <T.RingGeometry args={[180000, 185000, 64]} />
      <T.MeshBasicMaterial 
        color={layer.color}
        transparent={true}
        opacity={config.opacity * 0.5}
        side={THREE.DoubleSide}
      />
    </T.Mesh>
  </T.Group>
  
  <T.Group position={[0, layer.altitudeRange[1], 0]}>
    <T.Mesh>
      <T.RingGeometry args={[180000, 182000, 64]} />
      <T.MeshBasicMaterial 
        color={layer.color}
        transparent={true}
        opacity={config.opacity * 0.3}
        side={THREE.DoubleSide}
      />
    </T.Mesh>
  </T.Group>
{/each}

<!-- Atmospheric Layer Legend -->
<div class="fixed top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white p-3 rounded text-xs font-mono backdrop-blur-sm border border-white/20">
  <div class="font-bold mb-2 text-center text-yellow-300">⚡ Dev Atmospheric Grids</div>
  <div class="flex gap-4">
    {#each keyLayers as layer}
      {@const centerAlt = (layer.altitudeRange[0] + layer.altitudeRange[1]) / 2000}
      <div class="flex items-center gap-1">
        <div 
          class="w-3 h-3 rounded" 
          style="background-color: {layer.color}; opacity: 0.6;"
        ></div>
        <span class="text-[10px]">
          {(centerAlt).toFixed(0)}km
        </span>
      </div>
    {/each}
  </div>
  <div class="text-center text-white/50 text-[9px] mt-2">
    Grid density varies by altitude • Markers show reference points
  </div>
</div>