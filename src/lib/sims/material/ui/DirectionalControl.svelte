<!-- ui/DirectionalControl.svelte -->

<script lang="ts">
  import { getPhysicsContext } from '../physics/context.svelte';
  
  const physics = getPhysicsContext();
  let forceStrength = $state(0.05);
  
  function applyForce(direction: string) {
    if (!physics.rigidBody || physics.paused) return;
    
    const force = { x: 0, y: 0, z: 0 };
    
    switch (direction) {
      case 'up': force.y = forceStrength; break;
      case 'down': force.y = -forceStrength; break;
      case 'left': force.x = -forceStrength; break;
      case 'right': force.x = forceStrength; break;
      case 'forward': force.z = -forceStrength; break;
      case 'backward': force.z = forceStrength; break;
    }
    
    physics.rigidBody.applyImpulse(force, true);
  }
</script>

<div class="fixed bottom-20 left-4 bg-black/30 backdrop-blur-sm p-4 rounded text-white">
  <div class="text-center mb-2">Balloon Controls</div>
  
  <div class="grid grid-cols-3 gap-2 text-center">
    <div></div>
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('forward')}
    >
      ↑
    </button>
    <div></div>
    
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('left')}
    >
      ←
    </button>
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('up')}
    >
      ↟
    </button>
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('right')}
    >
      →
    </button>
    
    <div></div>
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('backward')}
    >
      ↓
    </button>
    <button 
      class="bg-white/20 hover:bg-white/40 rounded p-2"
      on:mousedown={() => applyForce('down')}
    >
      ↡
    </button>
  </div>
  
  <div class="mt-2">
    <label class="block text-xs mb-1">Force Strength</label>
    <input 
      type="range" 
      min="0.01" 
      max="0.2" 
      step="0.01" 
      bind:value={forceStrength} 
      class="w-full"
    />
  </div>
</div>