<!-- src/lib/sims/venus/world/space/OrbitalPath.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getCircularPathPoints } from '../../physics/orbital';
  import * as THREE from 'three';
  
  // Props
  let {
    visible = true,
    opacity = 0.2
  } = $props();
  
  // Generate simple circular path around Venus (where sun travels)
  const pathPoints = getCircularPathPoints(25000, 64);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pathPoints, 3));
</script>

{#if visible}
  <!-- Sun's path around Venus -->
  <T.Line {geometry}>
    <T.LineBasicMaterial 
      color="#FFD700"
      transparent
      opacity={opacity}
    />
  </T.Line>
  
  <!-- Path markers (every 45 degrees) -->
  {#each Array(8) as _, i}
    {@const angle = (i * 45) * Math.PI / 180}
    {@const distance = 25000}
    {@const x = distance * Math.cos(angle)}
    {@const z = distance * Math.sin(angle)}
    
    <T.Mesh position={[x, 0, z]}>
      <T.SphereGeometry args={[150, 6, 4]} />
      <T.MeshBasicMaterial 
        color="#FFA500"
        transparent
        opacity={opacity * 3}
      />
    </T.Mesh>
  {/each}
{/if}