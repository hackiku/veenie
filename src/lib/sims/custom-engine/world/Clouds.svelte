<!-- src/lib/sims/custom-engine/world/Clouds.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { getCloudSystem } from '../physics/clouds';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Props
  let {
    resetSignal = 0
  } = $props();
  
  // Get the systems
  const cloudSystem = getCloudSystem();
  const engine = getPhysicsEngine();
  
  // Get cloud data
  let clouds = $state(cloudSystem.getClouds());
  
  // Update clouds positions in an animation frame loop
  let animationFrameId = null;
  
  function updateClouds() {
    // Get latest cloud data
    clouds = [...cloudSystem.getClouds()];
    
    // Continue the loop
    animationFrameId = requestAnimationFrame(updateClouds);
  }
  
  // Start/stop the update loop
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    updateClouds();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
  
  // Reset clouds when signal changes
  $effect(() => {
    if (resetSignal) {
      engine.reset(); // Use engine reset which also resets clouds
    }
  });
</script>

<!-- Clouds -->
{#each clouds as cloud, i}
  <T.Mesh position={cloud.position}>
    <T.SphereGeometry args={[cloud.size, 16, 16]} />
    <T.MeshStandardMaterial 
      color="white" 
      transparent={true} 
      opacity={0.6} 
    />
  </T.Mesh>
{/each}