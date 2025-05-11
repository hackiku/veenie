<!-- src/lib/sims/balloon/world/Clouds.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
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
  const clouds = cloudSystem.getClouds();
  
  // Reset clouds when signal changes
  $effect(() => {
    if (resetSignal) {
      engine.reset(); // Use engine reset which also resets clouds
    }
  });
  
  // Store references to cloud bodies
  function handleCloudCreate(index, body) {
    engine.registerCloud(index, body);
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