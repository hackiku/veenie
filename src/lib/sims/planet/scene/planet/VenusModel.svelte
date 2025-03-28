<!-- src/lib/sims/planet/scene/planet/VenusModel.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { Group } from 'three';
  
  // Props with TypeScript
  type Props = {
    rotation?: number;
    scale?: number | [number, number, number];
    position?: [number, number, number];
    castShadow?: boolean;
    receiveShadow?: boolean;
  }
  
  let {
    rotation = 0,
    scale = 0.001,
    position = [0, 0, 0],
    castShadow = true,
    receiveShadow = true
  } = $props<Props>();
  
  // Create ref for the group
  let ref = $state<Group | null>(null);
  
  // Convert simple scale to vector if needed
  let scaleVector = $derived(typeof scale === 'number' ? [scale, scale, scale] : scale);
  
  // Define the type for our GLTF result
  type VenusGLTF = {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
    scene: THREE.Group;
  }
  
  // Load the Venus model
  const gltf = useGltf<VenusGLTF>('/sims/planet/Venus_1_12103.glb');
</script>

{#if $gltf}
  <T.Group 
    bind:ref
    position={position}
    rotation.y={rotation}
    scale={scaleVector}
  >
    <!-- You can access specific nodes/materials from the model if needed -->
    <T is={$gltf.scene} {castShadow} {receiveShadow} />
  </T.Group>
{:else}
  <!-- Loading fallback -->
  <T.Group 
    position={position}
    rotation.y={rotation}
    scale={scaleVector}
  >
    <T.Mesh {castShadow} {receiveShadow}>
      <T.SphereGeometry args={[6051.8, 32, 32]} />
      <T.MeshStandardMaterial color="#E6C98C" />
    </T.Mesh>
  </T.Group>
{/if}