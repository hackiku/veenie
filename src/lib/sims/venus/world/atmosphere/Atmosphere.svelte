<!-- src/lib/sims/venus/atmosphere/Atmosphere.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { BackSide, Color } from 'three';
  
  // Props using runes
  let { 
    planetRadius = 6051.8, // km
    scale = 0.001,
    visible = true
  } = $props<{
    planetRadius?: number;
    scale?: number;
    visible?: boolean;
  }>();
  
  // Atmosphere layers
  const atmosphereLayers = [
    { name: 'Surface', altitude: 0, color: new Color(0xFFDB99), opacity: 0.9 },
    { name: 'Lower Haze', altitude: 30, color: new Color(0xE6C98C), opacity: 0.7 },
    { name: 'Middle & Lower Clouds', altitude: 50, color: new Color(0xD9D9D9), opacity: 0.6 },
    { name: 'Upper Clouds', altitude: 65, color: new Color(0xBFBFBF), opacity: 0.5 },
    { name: 'Upper Haze', altitude: 90, color: new Color(0x9FAFCF), opacity: 0.3 }
  ];
</script>

{#if visible}
  {#each atmosphereLayers as layer}
    <T.Mesh>
      <T.SphereGeometry 
        args={[(planetRadius + layer.altitude) * scale, 64, 64]} 
      />
      <T.MeshStandardMaterial 
        color={layer.color}
        transparent={true}
        opacity={layer.opacity}
        side={BackSide}
        depthWrite={false}
      />
    </T.Mesh>
  {/each}
{/if}