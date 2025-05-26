<!-- src/lib/sims/venus/world/space/OrbitalPath.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getOrbitalPathPoints } from '../../physics/orbital';
  import * as THREE from 'three';
  
  // Props
  let {
    visible = true,
    opacity = 0.3
  } = $props();
  
  // Generate orbital path
  const pathPoints = getOrbitalPathPoints(64);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pathPoints, 3));
</script>

{#if visible}
  <!-- Orbital path line -->
  <T.Line {geometry}>
    <T.LineBasicMaterial 
      color="#FFB366"
      transparent
      opacity={opacity}
    />
  </T.Line>
  
  <!-- Orbital markers (every 30 degrees) -->
  {#each Array(12) as _, i}
    {@const angle = (i * 30) * Math.PI / 180}
    {@const distance = 30000}
    {@const x = distance * Math.cos(angle)}
    {@const z = distance * Math.sin(angle)}
    
    <T.Mesh position={[x, 0, z]}>
      <T.SphereGeometry args={[100, 6, 4]} />
      <T.MeshBasicMaterial 
        color="#FF8844"
        transparent
        opacity={opacity * 2}
      />
    </T.Mesh>
  {/each}
{/if}