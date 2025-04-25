<!-- src/lib/sims/material/ui/FlightControls.svelte -->
<script lang="ts">
  import { getPhysicsContext } from "../physics/context.svelte";
  
  // Get the physics context
  const physics = getPhysicsContext();
</script>

<div class="fixed bottom-20 left-4 bg-black/30 backdrop-blur-sm p-4 rounded text-white">
  <div class="text-center mb-2">Flight Controls</div>
  
  <div class="grid grid-cols-3 gap-2 text-center">
    <div></div>
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.FORWARD] ? 'bg-white/50' : 'bg-white/10'}"
    >
      W
    </div>
    <div></div>
    
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.LEFT] ? 'bg-white/50' : 'bg-white/10'}"
    >
      A
    </div>
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.BACKWARD] ? 'bg-white/50' : 'bg-white/10'}"
    >
      S
    </div>
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.RIGHT] ? 'bg-white/50' : 'bg-white/10'}"
    >
      D
    </div>
  </div>
  
  <div class="mt-3 grid grid-cols-2 gap-2">
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.UP] ? 'bg-white/50' : 'bg-white/10'}"
    >
      SPACE
    </div>
    <div 
      class="rounded p-2 text-center {physics.keyStates[physics.CONTROL_KEYS.DOWN] ? 'bg-white/50' : 'bg-white/10'}"
    >
      SHIFT
    </div>
  </div>
  
  <div class="mt-4">
    <label class="block text-xs mb-1">Thrust Power</label>
    <input 
      type="range" 
      min="0.01" 
      max="0.2" 
      step="0.01" 
      bind:value={physics.thrustStrength} 
      class="w-full"
    />
  </div>
  
  <div class="mt-2">
    <label class="block text-xs mb-1">Vertical Thrust</label>
    <input 
      type="range" 
      min="0.01" 
      max="0.3" 
      step="0.01" 
      bind:value={physics.verticalThrustStrength} 
      class="w-full"
    />
  </div>
  
  <div class="mt-3 text-xs opacity-70 text-center">
    <div>WASD = Move</div>
    <div>Space = Up | Shift = Down</div>
  </div>
</div>