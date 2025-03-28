<!-- src/lib/sims/venus/world/Grid.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  
  // Props using runes
  let { 
    scale = 'planet',
    size = 100,
    divisions = 10,
    color = 0x444444
  } = $props<{
    scale?: 'space' | 'planet' | 'atmosphere';
    size?: number;
    divisions?: number;
    color?: number;
  }>();
  
  // Adjust grid based on scale
  $effect(() => {
    if (scale === 'space') {
      size = 1000;
      divisions = 20;
    } else if (scale === 'planet') {
      size = 100;
      divisions = 10;
    } else if (scale === 'atmosphere') {
      size = 20;
      divisions = 8;
    }
  });
</script>

<T.GridHelper args={[size, divisions, color, color]} />