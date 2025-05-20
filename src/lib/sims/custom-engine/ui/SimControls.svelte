<!-- src/lib/sims/balloon/ui/SimControls.svelte -->
<script lang="ts">
  import { SIMULATION_CONSTANTS } from '../constants';
	import WASD from './WASD.svelte';
  import { getPhysicsEngine } from '../physics/engine';
  
  // Get the physics engine for direct testing
  const engine = getPhysicsEngine();
  
  // Svelte 5 props syntax
  let {
    stepCount = 0,
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0, mass: SIMULATION_CONSTANTS.BALLOON_MASS }
  } = $props();
  
  // Format numbers for display with appropriate units
  function formatNumber(value, precision = 2) {
    return typeof value === 'number' ? value.toFixed(precision) : '0.00';
  }
  
  // Debug functions
  function applyTestForce() {
    console.log("Applying test force");
    
    // Get the balloon physics object from the engine for direct testing
    const balloonPhysics = engine._getBalloonPhysics();
    
    // Get the rigid body object
    const rigidBody = balloonPhysics['rigidBody'];
    
    if (rigidBody) {
      // Apply a strong impulse upward to check if the physics is working
      rigidBody.applyImpulse({ x: 0, y: 1000, z: 0 }, true);
      console.log("Applied test impulse of y=1000 to balloon");
      
      // Also log current position
      const pos = rigidBody.translation();
      console.log(`Current position: ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`);
    } else {
      console.error("No rigid body available for test force");
    }
  }
</script>

<div class="bg-black/30 text-[0.7em] leading-2 text-white p-4 rounded-lg font-mono w-58">
  <div class="grid gap-2 mb-3">
    <div class="flex justify-between">
      <span>Step:</span> 
      <span class="font-bold">{stepCount}</span>
    </div>
    <div class="flex justify-between">
      <span>Altitude:</span> 
      <span class="font-bold">{formatNumber(telemetry.altitude)}m</span>
    </div>
    <div class="flex justify-between">
      <span>Balloon Size:</span> 
      <span class="font-bold">{formatNumber(telemetry.balloonSize)}m</span>
    </div>
    <div class="flex justify-between">
      <span>Air Density:</span> 
      <span class="font-bold">{formatNumber(telemetry.airDensity)}kg/m³</span>
    </div>
    <div class="flex justify-between">
      <span>Buoyancy:</span> 
      <span class="font-bold">{formatNumber(telemetry.buoyancy)}N</span>
    </div>
    <div class="flex justify-between">
      <span>Mass:</span> 
      <span class="font-bold">{formatNumber(telemetry.mass)}Kg</span>
    </div>
  </div>
  
  <!-- Add the debug test button -->
  <div class="border-t border-white/20 pt-3 mb-3">
    <button
      class="w-full py-2 bg-red-600 text-white rounded text-xs font-bold"
      onclick={applyTestForce}
    >
      APPLY TEST FORCE (DEBUG)
    </button>
  </div>
  
  <!-- Add the WASD component here -->
  <div class="pt-3 border-t border-white/20">
    <WASD />
  </div>
</div>