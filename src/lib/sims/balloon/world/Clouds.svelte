<!-- Clouds.svelte - Fixed version -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { useTask } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  
  // Correct Svelte 5 props syntax
  let {
    running = true,
    singleStep = false,
    resetSignal = 0
  } = $props();
  
  const { TERRAIN_SIZE, CLOUD_LAYER_HEIGHT } = SIMULATION_CONSTANTS;
  
  // Generate cloud data (fewer for performance)
  const clouds = Array(30).fill(0).map(() => {
    const x = (Math.random() - 0.5) * TERRAIN_SIZE * 0.8;
    const z = (Math.random() - 0.5) * TERRAIN_SIZE * 0.8;
    const heightVariation = (Math.random() * 10.0) - 5.0;
    
    return {
      position: [x, CLOUD_LAYER_HEIGHT + heightVariation, z],
      basePosition: [x, CLOUD_LAYER_HEIGHT + heightVariation, z],
      size: (Math.random() * 6.0) + 8.0,
      speed: {
        x: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      amplitude: (Math.random() * 3.0) + 1.0,
      frequency: (Math.random() * 0.8) + 0.2,
      phase: Math.random() * Math.PI * 2
    };
  });
  
  // Cloud references
  let cloudRefs = $state(Array(clouds.length).fill(null));
  
  // Reset clouds to original positions
  $effect(() => {
    if (resetSignal) {
      clouds.forEach((cloud, i) => {
        if (cloudRefs[i]) {
          cloudRefs[i].setNextKinematicTranslation({
            x: cloud.basePosition[0],
            y: cloud.basePosition[1], 
            z: cloud.basePosition[2]
          });
        }
      });
    }
  });
  
  // Manually track time since we don't have access to the clock
  let time = 0;
  
  // Animate clouds
  useTask((delta) => {
    // Skip updates when simulation is paused (unless it's a single step)
    if (!running && !singleStep) return;
    
    // Accumulate time manually
    time += delta;
    
    clouds.forEach((cloud, i) => {
      if (cloudRefs[i]) {
        // Base movement in wind direction
        let x = cloud.basePosition[0] + time * cloud.speed.x * 160;
        let z = cloud.basePosition[2] + time * cloud.speed.z * 400;
        
        // Add sine wave motion for gentle drifting
        x += Math.sin(time * cloud.frequency + cloud.phase) * cloud.amplitude;
        const y = cloud.basePosition[1] + Math.sin(time * cloud.frequency * 0.5 + cloud.phase) * 0.5;
        
        // Wrap around terrain boundaries
        if (x > TERRAIN_SIZE / 2) x -= TERRAIN_SIZE * 0.9;
        if (x < -TERRAIN_SIZE / 2) x += TERRAIN_SIZE * 0.9;
        if (z > TERRAIN_SIZE / 2) z -= TERRAIN_SIZE * 0.9;
        if (z < -TERRAIN_SIZE / 2) z += TERRAIN_SIZE * 0.9;
        
        // Update cloud position
        cloudRefs[i].setNextKinematicTranslation({ x, y, z });
      }
    });
  });
  
  // Store references to cloud bodies
  function handleCloudCreate(index, body) {
    cloudRefs[index] = body;
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