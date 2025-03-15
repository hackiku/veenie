<!-- src/lib/sims/chemistry/vehicles/ProcessPlant.svelte -->

<script>
  import { T } from "@threlte/core";
  import { useTexture } from "@threlte/extras";
  import { chemistryStore } from '$lib/stores/chemistryStore';
  
  // Props
  let { position = [0, 50, 0] } = $props();
  
  // State
  let chemState = $state(null);
  let processingActive = $state(false);
  let rotationSpeed = $state(0.005);
  
  // Subscribe to the chemistry store
  $effect(() => {
    const unsubChemStore = chemistryStore.subscribe(state => {
      chemState = state;
      processingActive = state?.playing || false;
    });
    
    return () => {
      unsubChemStore();
    };
  });
  
  // Rotation animation
  let rotation = $state({ x: 0, y: 0, z: 0 });
  let time = $state(0);
  
  // Animate components when processing is active
  $effect(() => {
    let frameId;
    
    const animate = () => {
      time += 0.016; // ~60fps
      
      if (processingActive) {
        // Animate rotations for machinery
        rotation.y += rotationSpeed;
        
        // Update specific parts based on production rates
        if (chemState?.production) {
          const { co2CaptureRate, waterExtraction, oxygenProduction, fuelProduction } = chemState.production;
          
          // Adjust animation speeds based on production rates
          rotationSpeed = 0.005 + (co2CaptureRate + waterExtraction) * 0.001;
        }
      }
      
      frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  });
  
  // Create a cloud of particles around the intake to visualize gas capture
  const intakeParticles = Array.from({ length: 50 }, () => {
    const radius = 15 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;
    const height = Math.random() * 10 - 5;
    
    return {
      initialPosition: [
        radius * Math.cos(angle),
        height,
        radius * Math.sin(angle)
      ],
      speed: 0.05 + Math.random() * 0.1,
      size: 0.5 + Math.random() * 0.5
    };
  });
  
  // Calculate particle positions with animation toward intake
  function calculateParticlePosition(particle, time) {
    const [x, y, z] = particle.initialPosition;
    const moveFactor = ((Math.sin(time * particle.speed) + 1) / 2);
    
    // Move particles toward the intake center
    const targetX = x * (1 - moveFactor * 0.9);
    const targetZ = z * (1 - moveFactor * 0.9);
    
    return [targetX, y, targetZ];
  }
</script>

<T.Group position={position}>
  <!-- Main platform/balloon base -->
  <T.Mesh position={[0, 0, 0]} castShadow receiveShadow>
    <T.CylinderGeometry args={[15, 15, 5, 32]} />
    <T.MeshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
  </T.Mesh>
  
  <!-- Balloon/aerostat body -->
  <T.Mesh position={[0, 15, 0]} castShadow>
    <T.SphereGeometry args={[20, 32, 32]} />
    <T.MeshStandardMaterial color="#dddddd" metalness={0.1} roughness={0.6} />
  </T.Mesh>
  
  <!-- Main processing unit -->
  <T.Mesh position={[0, 3, 0]} castShadow>
    <T.BoxGeometry args={[12, 6, 12]} />
    <T.MeshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
  </T.Mesh>
  
  <!-- CO2 Capture Unit -->
  <T.Mesh position={[-8, 3, 0]} castShadow>
    <T.CylinderGeometry args={[3, 4, 8, 16]} />
    <T.MeshStandardMaterial color="#dd3333" metalness={0.6} roughness={0.4} />
  </T.Mesh>
  
  <!-- Electrolysis Unit -->
  <T.Mesh position={[8, 3, 0]} castShadow>
    <T.CylinderGeometry args={[3, 3, 10, 16]} />
    <T.MeshStandardMaterial color="#3333dd" metalness={0.6} roughness={0.4} />
  </T.Mesh>
  
  <!-- Reaction Chambers -->
  <T.Mesh position={[0, 3, 8]} castShadow>
    <T.SphereGeometry args={[4, 16, 16]} />
    <T.MeshStandardMaterial color="#33dd33" metalness={0.6} roughness={0.4} />
  </T.Mesh>
  
  <!-- Rotating components when active -->
  <T.Group rotation={[0, rotation.y, 0]}>
    <!-- Intake fans -->
    <T.Mesh position={[-8, 3, 5]} rotation={[Math.PI/2, 0, 0]} castShadow>
      <T.CylinderGeometry args={[3, 3, 0.5, 16]} />
      <T.MeshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
    </T.Mesh>
    
    <!-- Fan blades -->
    {#each Array(5) as _, i}
      <T.Mesh 
        position={[-8, 3, 5.5]} 
        rotation={[0, 0, (Math.PI * 2 / 5) * i]}
        castShadow
      >
        <T.BoxGeometry args={[0.5, 5, 0.1]} />
        <T.MeshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </T.Mesh>
    {/each}
  </T.Group>
  
  <!-- Solar panels -->
  <T.Mesh position={[0, 8, -10]} rotation={[Math.PI/4, 0, 0]} castShadow>
    <T.BoxGeometry args={[20, 0.2, 10]} />
    <T.MeshStandardMaterial color="#2244aa" metalness={0.7} roughness={0.3} />
  </T.Mesh>
  
  <!-- Propellant storage tanks -->
  <T.Mesh position={[5, 3, -8]} castShadow>
    <T.CylinderGeometry args={[2, 2, 6, 16]} />
    <T.MeshStandardMaterial color="#66cc66" metalness={0.6} roughness={0.3} />
  </T.Mesh>
  <T.Mesh position={[-5, 3, -8]} castShadow>
    <T.CylinderGeometry args={[2, 2, 6, 16]} />
    <T.MeshStandardMaterial color="#cc6666" metalness={0.6} roughness={0.3} />
  </T.Mesh>
  
  <!-- Connecting pipes -->
  <T.Mesh position={[0, 3, 4]} rotation={[0, Math.PI/2, 0]} castShadow>
    <T.CylinderGeometry args={[0.5, 0.5, 16, 8]} />
    <T.MeshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
  </T.Mesh>
  <T.Mesh position={[0, 3, -4]} rotation={[0, Math.PI/2, 0]} castShadow>
    <T.CylinderGeometry args={[0.5, 0.5, 16, 8]} />
    <T.MeshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
  </T.Mesh>
  
  <!-- Intake particles animation -->
  {#if processingActive}
    {#each intakeParticles as particle}
      {@const particlePos = calculateParticlePosition(particle, time)}
      <T.Mesh position={[-8 + particlePos[0], 3 + particlePos[1], particlePos[2]]}>
        <T.SphereGeometry args={[particle.size, 8, 8]} />
        <T.MeshBasicMaterial color="#ff6666" transparent opacity={0.6} />
      </T.Mesh>
    {/each}
  {/if}
  
  <!-- Plant status lights -->
  <T.PointLight 
    position={[0, 5, 0]} 
    color={processingActive ? "#00ff00" : "#ff0000"} 
    intensity={0.5}
    distance={10}
  />
  
  <!-- Status indicator -->
  <T.Mesh position={[0, 10, 0]}>
    <T.SphereGeometry args={[1, 16, 16]} />
    <T.MeshBasicMaterial 
      color={processingActive ? "#00ff00" : "#ff0000"} 
      emissive={processingActive ? "#00ff00" : "#ff0000"}
      emissiveIntensity={1}
    />
  </T.Mesh>
</T.Group>