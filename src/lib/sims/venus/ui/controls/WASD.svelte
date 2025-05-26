<!-- src/lib/sims/balloon/ui/controls/WASD.svelte -->
<script lang="ts">
  import { getControlContext } from '../../context/controls.svelte';
  
  // Get the unified control context
  const controls = getControlContext();
  
  // Active keys tracking including yaw
  const activeKeys = $derived({
    w: controls.state.movement.z > 0.1,
    a: controls.state.movement.x < -0.1,  
    s: controls.state.movement.z < -0.1,
    d: controls.state.movement.x > 0.1,
    q: controls.state.movement.yaw < -0.1, // Yaw left
    e: controls.state.movement.yaw > 0.1,  // Yaw right
    '1': controls.state.balloon.deflate > 0,
    '2': controls.state.balloon.inflate > 0
  });
  
  // Current sensitivity setting for display
  let currentSensitivity = $state('normal');
  
  // Handle button press/release with enhanced analog controls
  function startControl(action: string, intensity: number = 1.0) {
    const sensitivity = controls.state.sensitivity.movement;
    
    switch(action) {
      case 'w':
        controls.actions.move(0, intensity, sensitivity);
        break;
      case 'a':  
        controls.actions.move(-intensity, 0, sensitivity);
        break;
      case 's':
        controls.actions.move(0, -intensity, sensitivity);
        break;
      case 'd':
        controls.actions.move(intensity, 0, sensitivity);
        break;
      case 'q':
        controls.actions.yaw(-intensity); // Yaw left
        break;
      case 'e':
        controls.actions.yaw(intensity);  // Yaw right
        break;
      case '1':
        controls.actions.startDeflate(intensity);
        break;
      case '2':
        controls.actions.startInflate(intensity);
        break;
    }
  }
  
  function stopControl(action: string) {
    switch(action) {
      case 'w':
      case 'a':
      case 's':
      case 'd':
        // Smart stopping - only stop if this specific direction is active
        const currentX = controls.state.movement.x;
        const currentZ = controls.state.movement.z;
        
        if (action === 'w' && currentZ > 0) controls.actions.move(currentX, 0);
        if (action === 's' && currentZ < 0) controls.actions.move(currentX, 0);
        if (action === 'a' && currentX < 0) controls.actions.move(0, currentZ);
        if (action === 'd' && currentX > 0) controls.actions.move(0, currentZ);
        break;
      case 'q':
      case 'e':
        // Stop yaw if this direction is active
        const currentYaw = controls.state.movement.yaw;
        if ((action === 'q' && currentYaw < 0) || (action === 'e' && currentYaw > 0)) {
          controls.actions.stopYaw();
        }
        break;
      case '1':
        controls.actions.stopDeflate();
        break;
      case '2':
        controls.actions.stopInflate();
        break;
    }
  }
  
  // Keyboard event handling with enhanced analog support
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      
      // Prevent default for our control keys
      if (['w', 'a', 's', 'd', 'q', 'e', '1', '2'].includes(key)) {
        e.preventDefault();
      }
      
      // Variable intensity based on held keys or modifiers
      let intensity = 1.0;
      
      // Shift for reduced intensity (gentle mode)
      if (e.shiftKey && ['w', 'a', 's', 'd', 'q', 'e'].includes(key)) {
        intensity = 0.3; // Gentle movement
      }
      // Ctrl for increased intensity (aggressive mode)
      else if (e.ctrlKey && ['w', 'a', 's', 'd', 'q', 'e'].includes(key)) {
        intensity = 1.8; // Aggressive movement
      }
      
      // Handle the control
      startControl(key, intensity);
    }
    
    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      stopControl(key);
    }
    
    // Add listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Sensitivity preset functions
  function setThrustProfile(profile: 'gentle' | 'normal' | 'aggressive') {
    controls.actions.setThrustProfile(profile);
    currentSensitivity = profile;
  }
</script>

<div class="space-y-3">
  <!-- Enhanced WASD Grid with Q/E -->
  <div class="grid grid-cols-6 gap-1 text-[0.6rem]">
    <!-- Top row: Q W E -->
    <div></div>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.q ? 'bg-purple-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('q')}
      onmouseup={() => stopControl('q')}
      onmouseleave={() => stopControl('q')}
      ontouchstart={() => startControl('q')}
      ontouchend={() => stopControl('q')}
      title="Yaw Left"
    >
      Q
    </button>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.w ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('w')}
      onmouseup={() => stopControl('w')}
      onmouseleave={() => stopControl('w')}
      ontouchstart={() => startControl('w')}
      ontouchend={() => stopControl('w')}
      title="Forward"
    >
      W
    </button>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.e ? 'bg-purple-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('e')}
      onmouseup={() => stopControl('e')}
      onmouseleave={() => stopControl('e')}
      ontouchstart={() => startControl('e')}
      ontouchend={() => stopControl('e')}
      title="Yaw Right"
    >
      E
    </button>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys['1'] ? 'bg-red-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('1')}
      onmouseup={() => stopControl('1')}
      onmouseleave={() => stopControl('1')}
      ontouchstart={() => startControl('1')}
      ontouchend={() => stopControl('1')}
      title="Deflate"
    >
      1
    </button>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys['2'] ? 'bg-green-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('2')}
      onmouseup={() => stopControl('2')}
      onmouseleave={() => stopControl('2')}
      ontouchstart={() => startControl('2')}
      ontouchend={() => stopControl('2')}
      title="Inflate"
    >
      2
    </button>
    
    <!-- Middle row: A S D -->
    <div></div>
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.a ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('a')}
      onmouseup={() => stopControl('a')}
      onmouseleave={() => stopControl('a')}
      ontouchstart={() => startControl('a')}
      ontouchend={() => stopControl('a')}
      title="Left"
    >
      A
    </button>
    
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.s ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
      onmousedown={() => startControl('s')}
      onmouseup={() => stopControl('s')}
      onmouseleave={() => stopControl('s')}
      ontouchstart={() => startControl('s')}
      ontouchend={() => stopControl('s')}
      title="Backward"
    >
      S
    </button>
    
    <button 
      class="h-6 w-6 flex items-center justify-center rounded {activeKeys.d ? 'bg-blue-600' : 'bg-gray-700/70'} text-white text-white transition-colors"
      onmousedown={() => startControl('d')}
      onmouseup={() => stopControl('d')}
      onmouseleave={() => stopControl('d')}
      ontouchstart={() => startControl('d')}
      ontouchend={() => stopControl('d')}
      title="Right"
    >
      D
    </button>
    
    <div></div>
    <div></div>
  </div>

  <!-- Sensitivity Controls -->
  <div class="mt-3 pt-2 border-t border-white/20">
    <div class="text-white/70 text-xs mb-2">Thrust Profile:</div>
    <div class="flex gap-1">
      {#each ['gentle', 'normal', 'aggressive'] as profile}
        <button 
          class="px-2 py-1 text-xs rounded {currentSensitivity === profile ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
          onclick={() => setThrustProfile(profile)}
        >
          {profile}
        </button>
      {/each}
    </div>
  </div>

  <!-- Control hints -->
  <div class="text-xs text-white/50 mt-2">
    <div>Hold Shift for gentle • Ctrl for aggressive</div>
    <div>Q/E for yaw rotation</div>
  </div>
</div>

<!-- Enhanced Debug info -->
{#if import.meta.env.DEV}
  <div class="mt-3 text-xs text-white/50 font-mono">
    <div>Movement: x={controls.state.movement.x.toFixed(2)}, z={controls.state.movement.z.toFixed(2)}, yaw={controls.state.movement.yaw.toFixed(2)}</div>
    <div>Balloon: inflate={controls.state.balloon.inflate.toFixed(2)}, deflate={controls.state.balloon.deflate.toFixed(2)}</div>
    <div>Sensitivity: move={controls.state.sensitivity.movement.toFixed(1)}, rot={controls.state.sensitivity.rotation.toFixed(1)}</div>
    <div>Status: {controls.status.isMoving ? 'Moving' : 'Still'} | {controls.status.isRotating ? 'Rotating' : 'Straight'} | {controls.status.isBalloonActive ? 'Balloon Active' : 'Neutral'}</div>
  </div>
{/if}