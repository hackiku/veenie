<!-- src/lib/sims/balloon/world/Volcano.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { useTask } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../../constants';
  
  // Props
  let {
    running = true,
    singleStep = false,
    resetSignal = 0
  } = $props();
  
  // Volcano position and dimensions
  const VOLCANO_POSITION = [100, 0, 50]; // Position away from the balloon
  const VOLCANO_HEIGHT = 40;
  const VOLCANO_RADIUS = 20;
  
  // Particle management
  let particles = $state([]);
  const MAX_PARTICLES = 50;
  const EMISSION_RATE = 10; // Frames between emissions
  let emissionCounter = 0;
  
  // Track when particles should be removed
  let removalQueue = $state([]);
  
  // Particle references for physics bodies
  let particleRefs = $state([]);
  
  // Track time for animation
  let time = 0;
  
  // Create a new lava particle
  function createParticle() {
    // Random position at volcano top with some variation
    const xOffset = (Math.random() - 0.5) * 3;
    const zOffset = (Math.random() - 0.5) * 3;
    
    // Random initial velocity
    const velY = 20 + Math.random() * 15; // Upward velocity
    const velX = (Math.random() - 0.5) * 10; // Random horizontal velocity
    const velZ = (Math.random() - 0.5) * 10;
    
    // Random size
    const size = 0.5 + Math.random() * 1.0;
    
    // Random lifespan between 4-7 seconds
    const lifespan = 4 + Math.random() * 3;
    
    return {
      id: Date.now() + Math.random(), // Unique ID
      position: [
        VOLCANO_POSITION[0] + xOffset, 
        VOLCANO_POSITION[1] + VOLCANO_HEIGHT + 1, 
        VOLCANO_POSITION[2] + zOffset
      ],
      velocity: [velX, velY, velZ],
      size,
      createdAt: time,
      lifespan
    };
  }
  
  // Handle particle emission and lifecycle
  useTask((delta) => {
    // Only update if simulation is running
    if (!running && !singleStep) return;
    
    // Update time
    time += delta;
    
    // Check for particles to remove
    particles.forEach((particle, index) => {
      if (time > particle.createdAt + particle.lifespan) {
        removalQueue.push(particle.id);
      }
    });
    
    // Remove expired particles
    if (removalQueue.length > 0) {
      // Remove physics bodies first
      removalQueue.forEach(id => {
        const index = particles.findIndex(p => p.id === id);
        if (index !== -1 && particleRefs[index]) {
          // The rigid body will be automatically removed by Rapier when component unmounts
          particleRefs[index] = null;
        }
      });
      
      // Then remove from particles array
      particles = particles.filter(p => !removalQueue.includes(p.id));
      particleRefs = particleRefs.filter((_, i) => 
        i < particles.length
      );
      
      // Clear removal queue
      removalQueue = [];
    }
    
    // Emit new particles at interval
    emissionCounter++;
    if (emissionCounter >= EMISSION_RATE && particles.length < MAX_PARTICLES) {
      const newParticle = createParticle();
      particles = [...particles, newParticle];
      particleRefs = [...particleRefs, null];
      emissionCounter = 0;
    }
  });
  
  // Store rigid body references
  function handleParticleCreate(index, body) {
    particleRefs[index] = body;
  }
  
  // Reset particles when simulation resets
  $effect(() => {
    if (resetSignal) {
      particles = [];
      particleRefs = [];
      emissionCounter = 0;
      time = 0;
    }
  });
</script>

<!-- Volcano cone -->
<T.Group position={VOLCANO_POSITION}>
  <!-- Main volcano cone -->
  <T.Mesh receiveShadow castShadow>
    <T.ConeGeometry args={[VOLCANO_RADIUS, VOLCANO_HEIGHT, 32]} />
    <T.MeshStandardMaterial color="#4d4d4d" />
  </T.Mesh>
  
  <!-- Volcano crater -->
  <T.Mesh position={[0, VOLCANO_HEIGHT/2 + 0.1, 0]}>
    <T.CylinderGeometry args={[VOLCANO_RADIUS/4, VOLCANO_RADIUS/3, VOLCANO_HEIGHT/5, 32]} />
    <T.MeshStandardMaterial color="#1a0500" />
  </T.Mesh>
  
  <!-- Lava glow effect in the crater -->
  <T.PointLight
    position={[0, VOLCANO_HEIGHT - 2, 0]}
    color="#ff2a00"
    intensity={10}
    distance={20}
    decay={2}
  />
</T.Group>

<!-- Lava particles -->
{#each particles as particle, i}
  <RigidBody
    position={particle.position}
    linearVelocity={particle.velocity}
    angularDamping={0.9}
    linearDamping={0.1}
    oncreate={(body) => handleParticleCreate(i, body)}
  >
    <T.Mesh castShadow>
      <T.SphereGeometry args={[particle.size, 16, 16]} />
      <T.MeshStandardMaterial 
        color="#ff3300" 
        emissive="#ff2200"
        emissiveIntensity={1.5}
      />
    </T.Mesh>
    <!-- Particle glow effect -->
    <T.PointLight
      color="#ff5500"
      intensity={3}
      distance={5}
      decay={2}
    />
  </RigidBody>
{/each}