<!-- src/lib/sims/material/world/Balloon.svelte -->
<script lang="ts">
  import { T } from "@threlte/core";
  import { RigidBody, AutoColliders, usePhysicsTask } from "@threlte/rapier";
  import { getSimulationContext } from "../contexts/simulationContext.svelte";
  import { 
    calculateBuoyancyForce, 
    calculateDragForces, 
    calculateWindForce,
    calculateVenusGravity
  } from "../core/venusForces";
  import { getAtmosphericConditions } from "../core/atmosphere";
  
  // Get simulation context
  const sim = getSimulationContext();
  
  // Define state
  let rigidBody = $state(null);
  
  // Physics calculations in Rapier's physics step
  usePhysicsTask(() => {
    if (!rigidBody || sim.isPaused()) return;
    
    // Get current position and velocity from Rapier
    const pos = rigidBody.translation();
    const vel = rigidBody.linvel();
    
    // Update position/velocity in simulation context for UI components
    sim.updatePosition({ x: pos.x, y: pos.y, z: pos.z });
    sim.updateVelocity({ x: vel.x, y: vel.y, z: vel.z });
    
    // Get atmospheric conditions using pure function
    const conditions = getAtmosphericConditions(
      sim.atmosphere,
      pos.y,
      sim.windEnabled,
      sim.windIntensity
    );
    
    // Calculate forces using pure functions
    const buoyancyForce = calculateBuoyancyForce(
      sim.vehicle.data?.buoyancy || 0.35,
      conditions.density
    );
    
    const dragForces = calculateDragForces(
      vel,
      sim.vehicle.data?.dragFactor || 0.05,
      conditions.density
    );
    
    const gravityForce = calculateVenusGravity(
      sim.vehicle.data?.mass || 1.2
    );
    
    // Apply forces to Rapier rigid body
    rigidBody.applyImpulse(buoyancyForce, true);
    rigidBody.applyImpulse(dragForces, true);
    rigidBody.applyImpulse(gravityForce, true);
    
    // Apply wind forces if enabled
    if (sim.windEnabled && conditions.windVector) {
      const windForce = calculateWindForce(
        conditions.windVector,
        sim.windIntensity
      );
      
      rigidBody.applyImpulse(windForce, true);
    }
  });
  
  // Handle RigidBody creation
  function onRigidBodyCreate(body) {
    // Store reference
    rigidBody = body;
    
    // Get initial position from simulation context
    const initialPos = sim.getPosition();
    
    // Set initial position
    body.setTranslation({ 
      x: initialPos[0], 
      y: initialPos[1], 
      z: initialPos[2] 
    }, true);
    
    // Reset velocity
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    
    // Return cleanup function
    return () => {
      rigidBody = null;
    };
  }
</script>

<T.Group>
  <RigidBody 
    type="dynamic"
    gravityScale={0}
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