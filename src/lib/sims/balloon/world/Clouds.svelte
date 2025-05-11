<!-- src/lib/sims/balloon/world/Clouds.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { useTask } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { getCloudSystem, resetCloudSystem } from '../physics/clouds';
  
  // Props
  let {
    running = true,
    singleStep = false,
    resetSignal = 0
  } = $props();
  
  // Get the cloud system
  const cloudSystem = getCloudSystem();
  const clouds = cloudSystem.getClouds();
  
  // Reset clouds when signal changes
  $effect(() => {
    if (resetSignal) {
      cloudSystem.reset();
    }
  });
  
  // Update clouds in task
  useTask((delta) => {
    // Skip updates when simulation is paused (unless it's a single step)
    if (!running && !singleStep) return;
    
    // Update cloud positions
    cloudSystem.update(delta);
  });
  
  // Store references to cloud bodies
  function handleCloudCreate(index, body) {
    cloudSystem.setCloudRef(index, body);
  }
</script>

<!-- Clouds -->
{#each clouds as cloud, i}
  <RigidBody 
    type="kinematicPosition"
    position={cloud.position}
    oncreate={(body) => handleCloudCreate(i, body)}
  >
    <T.Mesh>
      <T.SphereGeometry args={[cloud.size, 16, 16]} />
      <T.MeshStandardMaterial 
        color="white" 
        transparent={true} 
        opacity={0.6} 
      />
    </T.Mesh>
  </RigidBody>
{/each}