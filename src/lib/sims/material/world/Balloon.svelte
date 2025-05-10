<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { RigidBody, AutoColliders, usePhysicsTask } from "@threlte/rapier";
  import { getSimulationContext } from "../state/simulationContext.svelte";
  import { onDestroy } from "svelte";
  import { applyVenusPhysics } from "../core/venusPhysicsModel";
  
  // Get simulation context
  const sim = getSimulationContext();
  const { commands, telemetry } = sim;
  
  // Balloon state
  let rigidBody = $state(null);
  let physicsState = $state(null);
  let isInitialized = $state(false);
  
  // Physics calculations using usePhysicsTask
  usePhysicsTask((delta) => {
    // Skip physics when paused or no rigid body
    if (!rigidBody || !rigidBody.isValid() || telemetry.simulation.isPaused) return;
    
    try {
      // Apply Venus physics model and get state
      physicsState = applyVenusPhysics(
        rigidBody,
        sim.atmosphere,
        {
          name: telemetry.vehicle.name,
          type: telemetry.vehicle.type,
          mass: telemetry.vehicle.mass,
          buoyancy: telemetry.vehicle.buoyancy,
          dragCoefficient: telemetry.vehicle.dragCoefficient,
          dimensions: { radius: 1.5 }
        },
        telemetry.simulation.windEnabled,
        telemetry.simulation.windIntensity,
        true // use Rapier gravity
      );
      
      // Update position/velocity in telemetry
      commands.updatePosition(physicsState.position);
      commands.updateVelocity(physicsState.velocity);
      
      // Update forces and atmospheric data
      telemetry.forces = physicsState.forces;
      telemetry.atmospheric = {
        density: physicsState.atmospheric.density,
        temperature: physicsState.atmospheric.temperature,
        pressure: physicsState.atmospheric.pressure,
        windVector: physicsState.atmospheric.windVector ? {
          x: physicsState.atmospheric.windVector.x,
          y: physicsState.atmospheric.windVector.y,
          z: physicsState.atmospheric.windVector.z
        } : null
      };
    } catch (e) {
      console.warn('Error in physics task:', e);
    }
  });
  
  // Initialize rigid body when created
  function initializeRigidBody() {
    if (!rigidBody || !rigidBody.isValid() || isInitialized) return;
    
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
      
      // Initialize the rigid body
      initializeRigidBody();
      
      // Return cleanup function
      return () => {
        try {
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
  
  // Re-initialize on first render frame
  $effect(() => {
    // Wait a frame to ensure the rigid body is created
    requestAnimationFrame(() => {
      initializeRigidBody();
    });
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