<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { RigidBody, AutoColliders } from "@threlte/rapier";
  import { getSimulationContext } from "../state/context.svelte";
  import { onDestroy } from "svelte";
  
  // Get simulation context
  const sim = getSimulationContext();
  const { telemetry } = sim;
  
  // Balloon state
  let rigidBody = $state(null);
  let isInitialized = $state(false);
  
  // Initialize rigid body when created
  function initializeRigidBody() {
    if (!rigidBody || !rigidBody.raw?.isValid() || isInitialized) return;
    
    try {
      // Get initial position from context
      const initialPos = telemetry.position;
      
      // Set initial position
      rigidBody.setTranslation({ 
        x: initialPos[0], 
        y: initialPos[1], 
        z: initialPos[2] 
      }, true);
      
      // Reset velocity
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      // Connect with RapierBridge if available
      if (sim.rapierBridge) {
        // Find the first balloon in the entity registry
        const balloons = sim.entityRegistry.getAll();
        if (balloons.length > 0) {
          sim.rapierBridge.initPhysicsForEntity(balloons[0].id, rigidBody);
        }
      }
      
      isInitialized = true;
    } catch (e) {
      console.warn('Error initializing rigid body:', e);
    }
  }
  
  // Handle RigidBody creation
  function onRigidBodyCreate(body) {
    rigidBody = body;
    
    // Initialize on next frame to ensure body is ready
    requestAnimationFrame(() => {
      initializeRigidBody();
    });
    
    return () => {
      // Clean up physics connection
      if (sim.rapierBridge) {
        const balloons = sim.entityRegistry.getAll();
        if (balloons.length > 0) {
          sim.rapierBridge.removePhysicsForEntity(balloons[0].id);
        }
      }
      
      rigidBody = null;
      isInitialized = false;
    };
  }
  
  // Ensure we re-initialize when position changes dramatically
  $effect(() => {
    if (rigidBody && isInitialized) {
      // Get current position from rigid body
      const position = rigidBody.translation();
      
      // Calculate distance to telemetry position
      const dx = position.x - telemetry.position[0];
      const dy = position.y - telemetry.position[1];
      const dz = position.z - telemetry.position[2];
      const distanceSquared = dx*dx + dy*dy + dz*dz;
      
      // If position changed dramatically (e.g. after reset), update rigid body
      if (distanceSquared > 10000) { // 100 units threshold
        rigidBody.setTranslation({ 
          x: telemetry.position[0], 
          y: telemetry.position[1], 
          z: telemetry.position[2] 
        }, true);
        
        rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      }
    }
  });
</script>

<T.Group>
  <RigidBody 
    type="dynamic"
    gravityScale={1}
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