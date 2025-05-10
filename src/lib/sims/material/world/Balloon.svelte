<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { RigidBody, AutoColliders, usePhysicsTask } from "@threlte/rapier";
  import { getSimulationContext } from "../state/simulationContext.svelte";
  import { registerRigidBody } from "../core/rapierBridge";
  import { applyVenusPhysics } from "../core/venusPhysicsModel";
  import { onDestroy } from "svelte";
  
  // Props
  let { 
    useRapierGravity = true // Set to false to apply gravity manually
  } = $props();
  
  // Get simulation context
  const sim = getSimulationContext();
  
  // Define state
  let rigidBody = $state(null);
  let unregister = $state(null);
  let physicsState = $state(null);
  let isInitialized = $state(false);
  
  // Physics calculations in Rapier's physics step
  usePhysicsTask(() => {
    if (!rigidBody || !rigidBody.isValid() || sim.isPaused()) return;
    
    // Apply Venus physics model and get state for telemetry
    try {
      physicsState = applyVenusPhysics(
        rigidBody,
        sim.atmosphere,
        sim.vehicle,
        sim.windEnabled,
        sim.windIntensity,
        useRapierGravity
      );
      
      // Update position/velocity in simulation context for UI/telemetry
      sim.updatePosition(physicsState.position);
      sim.updateVelocity(physicsState.velocity);
    } catch (e) {
      console.warn('Error in physics task:', e);
    }
  });
  
  // Initialize rigid body when created
  function initializeRigidBody() {
    if (!rigidBody || !rigidBody.isValid() || isInitialized) return;
    
    try {
      // Get initial position from simulation context
      const initialPos = sim.getPosition();
      
      // Set initial position
      rigidBody.setTranslation({ 
        x: initialPos[0], 
        y: initialPos[1], 
        z: initialPos[2] 
      }, true);
      
      // Reset velocity
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      isInitialized = true;
    } catch (e) {
      console.warn('Error initializing rigid body:', e);
    }
  }
  
  // Handle RigidBody creation
  function onRigidBodyCreate(body) {
    try {
      // Store reference
      rigidBody = body;
      
      // Register with the physics bridge for pause/resume handling
      unregister = registerRigidBody(body);
      
      // Initialize the rigid body
      initializeRigidBody();
      
      // Return cleanup function
      return () => {
        try {
          if (unregister) unregister();
          rigidBody = null;
          isInitialized = false;
        } catch (e) {
          console.warn('Error in cleanup:', e);
        }
      };
    } catch (e) {
      console.warn('Error in onRigidBodyCreate:', e);
      return () => {};
    }
  }
  
  // Extra cleanup in case component is destroyed
  onDestroy(() => {
    try {
      if (unregister) unregister();
    } catch (e) {
      console.warn('Error in onDestroy:', e);
    }
  });
  
  // Re-initialize on first render frame to ensure correct positioning
  $effect(() => {
    // Wait a frame to make sure the rigid body is created
    requestAnimationFrame(() => {
      initializeRigidBody();
    });
  });
</script>

<T.Group>
  <RigidBody 
    type="dynamic"
    gravityScale={useRapierGravity ? 1 : 0}
    linearDamping={0}
    angularDamping={0.9}
    canSleep={false}
    oncreate={onRigidBodyCreate}
  >
    <AutoColliders>
      <!-- Balloon Model -->
      <T.Group>
        <!-- Main balloon body -->
        <T.Mesh>
          <T.SphereGeometry args={[1, 32, 32]} />
          <T.MeshStandardMaterial color="#ffcc00" />
        </T.Mesh>

        <!-- Gondola beneath -->
        <T.Mesh position={[0, -1.5, 0]}>
          <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
          <T.MeshStandardMaterial color="#663300" />
        </T.Mesh>

        <!-- Connection lines -->
        <T.LineSegments>
          <T.BufferGeometry>
            <T.Float32BufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -0.5, -0.8, -0.5, -0.3, -1.5, -0.3, 
                  0.5, -0.8, -0.5, 0.3, -1.5, -0.3, 
                  -0.5, -0.8, 0.5, -0.3, -1.5, 0.3, 
                  0.5, -0.8, 0.5, 0.3, -1.5, 0.3
                ]),
                3
              ]}
            />
          </T.BufferGeometry>
          <T.LineBasicMaterial color="#333333" />
        </T.LineSegments>
      </T.Group>
    </AutoColliders>
  </RigidBody>
</T.Group>