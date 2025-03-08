<!-- src/lib/sims/venus/world/World.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import Planet from './planet/Planet.svelte';
  import Atmosphere from './atmosphere/Atmosphere.svelte';
  import Space from './space/Space.svelte';
  
  // Props using runes
  let { 
    scale = 'planet',  // 'space', 'planet', or 'atmosphere'
    simulationSpeed = 1,
    showAtmosphere = true,
    showGrid = false,
    showCoordinates = false
  } = $props<{
    scale?: 'space' | 'planet' | 'atmosphere';
    simulationSpeed?: number;
    showAtmosphere?: boolean;
    showGrid?: boolean;
    showCoordinates?: boolean;
  }>();
  
  // Venus data
  const venusData = {
    radius: 6051.8, // km
    rotationPeriod: -243.025, // days (retrograde)
    axialTilt: 177.3, // degrees
  };
  
  // Scale factors for different views
  const planetScale = 0.001;  // For planet view
  const spaceScale = 0.0001;  // For space view (much smaller)
  const atmosScale = 0.002;   // For atmosphere view (slightly larger)
</script>

<!-- Different scale views -->
{#if scale === 'space'}
  <Space 
    {simulationSpeed}
    showOrbits={true}
    showSun={true}
    spaceScale={spaceScale}
  />
{:else if scale === 'planet'}
  <T.Group>
    <Planet 
      radius={venusData.radius} 
      scale={planetScale} 
    />
    {#if showAtmosphere}
      <Atmosphere 
        planetRadius={venusData.radius}
        scale={planetScale}
        visible={true}
      />
    {/if}
  </T.Group>
{:else if scale === 'atmosphere'}
  <T.Group>
    <Planet 
      radius={venusData.radius} 
      scale={atmosScale}
    />
    {#if showAtmosphere}
      <Atmosphere 
        planetRadius={venusData.radius}
        scale={atmosScale}
        visible={true}
      />
    {/if}
    <!-- Additional atmospheric detail components would go here -->
  </T.Group>
{/if}