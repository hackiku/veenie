<!-- src/lib/sims/balloon/world/Balloon.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { RigidBody } from '@threlte/rapier';
  import { SIMULATION_CONSTANTS } from '../constants';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Props
  let { 
    resetSignal = 0
  } = $props();
  
  // Get the engine
  const engine = getPhysicsEngine();
  
  // Track balloon size for rendering
  const balloonSize = $derived(engine.getBalloonSize());
  
  // Handle keyboard input
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      engine.setKeyState(event.key, true);
    };
    
    const handleKeyUp = (event) => {
      engine.setKeyState(event.key, false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Handle rigid body creation
  function handleRigidBodyCreate(body) {
    engine.registerBalloon(body);
  }
  
  // Reset when needed
  $effect(() => {
    if (resetSignal) {
      engine.reset();
    }
  });
</script>

<!-- Balloon model -->
<RigidBody 
  linearDamping={0.8}
  angularDamping={0.9}
  oncreate={handleRigidBodyCreate}
>
  <T.Group>
    <!-- Main balloon sphere -->
    <T.Mesh castShadow>
      <T.SphereGeometry args={[balloonSize, 32, 16]} />
      <T.MeshStandardMaterial color="#FF9D00" />
    </T.Mesh>
    
    <!-- Basket under balloon -->
    <T.Mesh castShadow position={[0, -balloonSize - 1, 0]}>
      <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
      <T.MeshStandardMaterial color="#8B4513" />
    </T.Mesh>
    
    <!-- Ropes -->
    <T.Group>
      {#each Array(4) as _, i}
        <T.Line>
          <T.BufferGeometry>
            <T.Float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  Math.cos(i * Math.PI/2) * 0.8, -balloonSize * 0.8, Math.sin(i * Math.PI/2) * 0.8,
                  Math.cos(i * Math.PI/2) * 0.4, -balloonSize - 0.9, Math.sin(i * Math.PI/2) * 0.4
                ]),
                3
              ]}
            />
          </T.BufferGeometry>
          <T.LineBasicMaterial color="#6B4226" />
        </T.Line>
      {/each}
    </T.Group>
  </T.Group>
</RigidBody>