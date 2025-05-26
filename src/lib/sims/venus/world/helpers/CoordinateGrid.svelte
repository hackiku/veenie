<!-- src/lib/sims/venus/world/CoordinateSystem.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props using runes
  let { 
    scale = 'planet',
    size = 10
  } = $props<{
    scale?: 'space' | 'planet' | 'atmosphere';
    size?: number;
  }>();
  
  // Adjust axes based on scale
  $effect(() => {
    if (scale === 'space') {
      size = 50;
    } else if (scale === 'planet') {
      size = 10;
    } else if (scale === 'atmosphere') {
      size = 5;
    }
  });
</script>

<T.AxesHelper args={[size]} />