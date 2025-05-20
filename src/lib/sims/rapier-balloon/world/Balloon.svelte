<!-- src/lib/sims/balloon/world/Balloon.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Props
  let { resetSignal = 0 } = $props();
  
  // Get the engine
  const engine = getPhysicsEngine();
  
  // Track balloon size for rendering
  const balloonSize = $derived(engine.getBalloonSize());
  
  // Handle rigid body creation
  function handleRigidBodyCreate(body) {
    console.log("Balloon RigidBody created");
    engine.registerBalloon(body);
  }
  
  // Reset when needed
  $effect(() => {
    if (resetSignal) {
      engine.reset();
    }
  });
</script>

<!-- CRITICAL FIXES: We'll take direct control of physics -->
<RigidBody 
  type="dynamic"
  position={[0, SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT, 0]}
  linearDamping={0.2}
  angularDamping={0.5}
  gravityScale={0}  
  canSleep={false}  
  oncreate={handleRigidBodyCreate}
>
  <!-- Simple balloon sphere with basket -->
  <T.Group>
    <T.Mesh castShadow>
      <T.SphereGeometry args={[balloonSize, 32, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
  </T.Group>
</RigidBody>