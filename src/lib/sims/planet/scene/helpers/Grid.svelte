<!-- src/lib/sims/planet/scene/helpers/Grid.svelte -->

<script>
  import { T } from '@threlte/core';
  import { Grid as ThrelteGrid } from '@threlte/extras';
  
  // Props
  let { 
    scale = 'planet',
    position = [0, 0, 0],
    visible = true
  } = $props();
  
  // Grid settings based on scale
  const gridConfigs = {
    space: {
      cellSize: 100,
      sectionSize: 1000,
      fadeDistance: 10000,
      cellColor: "#444444",
      sectionColor: "#666666"
    },
    planet: {
      cellSize: 10,
      sectionSize: 100,
      fadeDistance: 1000,
      cellColor: "#444444",
      sectionColor: "#888888"
    },
    atmosphere: {
      cellSize: 5,
      sectionSize: 50,
      fadeDistance: 500,
      cellColor: "#444444",
      sectionColor: "#AAAAAA"
    }
  };
  
  // Get current grid settings based on scale (correct $derived syntax)
  let gridConfig = $derived(gridConfigs[scale] || gridConfigs.planet);
  
  // Altitude markers to show on grid
  const altitudeMarkers = [
    { altitude: 0, label: "Surface", color: "#FF8C00" },
    { altitude: 30, label: "Lower Haze (30km)", color: "#ff9933" },
    { altitude: 50, label: "Cloud Layer (50km)", color: "#ffffff" },
    { altitude: 70, label: "Upper Haze (70km)", color: "#99ccff" }
  ];
</script>

{#if visible}
  <!-- Main grid using Threlte's Grid helper -->
  <ThrelteGrid
    position={position}
    cellColor={gridConfig.cellColor}
    sectionColor={gridConfig.sectionColor}
    cellSize={gridConfig.cellSize}
    sectionSize={gridConfig.sectionSize}
    fadeDistance={gridConfig.fadeDistance}
    infiniteGrid={true}
  />
  
  <!-- Coordinate axis helper -->
  <T.AxesHelper args={[gridConfig.sectionSize / 2]} />
  
  <!-- Altitude markers for the different atmosphere layers -->
{/if}