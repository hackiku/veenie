<!-- src/lib/sims/balloon/ui/controls/WASD.svelte -->
<script lang="ts">
  import { getControlContext } from '../../context/controls.svelte';
  
  // Get the unified control context
  const controls = getControlContext();
  
  // RUNE PATTERN 3: $derived creates reactive computed values
  // This automatically updates when control state changes
  const activeKeys = $derived({
    w: controls.state.movement.z > 0.1,
    a: controls.state.movement.x < -0.1,  
    s: controls.state.movement.z < -0.1,
    d: controls.state.movement.x > 0.1,
    '1': controls.state.balloon.deflate > 0,
    '2': controls.state.balloon.inflate > 0
  });
  
  // Handle button press/release with the new control system
  function startControl(action: string) {
    switch(action) {
      case 'w':
        controls.actions.move(0, 1);
        break;
      case 'a':  
        controls.actions.move(-1, 0);
        break;
      case 's':
        controls.actions.move(0, -1);
        break;
      case 'd':
        controls.actions.move(1, 0);
        break;
      case '1':
        controls.actions.startDeflate();
        break;
      case '2':
        controls.actions.startInflate();
        break;
    }
  }
  
  function stopControl(action: string) {
    switch(action) {
      case 'w':
      case 'a':
      case 's':
      case 'd':
        // Only stop movement if this specific key is released
        // (prevents conflicts when multiple movement keys are pressed)
        const currentX = controls.state.movement.x;
        const currentZ = controls.state.movement.z;
        
        if (action === 'w' && currentZ > 0) controls.actions.move(currentX, 0);
        if (action === 's' && currentZ < 0) controls.actions.move(currentX, 0);
        if (action === 'a' && currentX < 0) controls.actions.move(0, currentZ);
        if (action === 'd' && currentX > 0) controls.actions.move(0, currentZ);
        break;
      case '1':
        controls.actions.stopDeflate();
        break;
      case '2':
        controls.actions.stopInflate();
        break;
    }
  }
  
  // Keyboard event handling
  // RUNE PATTERN 4: $effect for side effects
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      
      // Prevent default for our control keys
      if (['w', 'a', 's', 'd', '1', '2'].includes(key)) {
        e.preventDefault();
      }
      
      // Handle special cases
      if (key === 'shift') {
        controls.actions.startDeflate();
        return;
      }
      
      // Handle regular keys
      startControl(key);
    }
    
    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      
      if (key === 'shift') {
        controls.actions.stopDeflate();
        return;
      }
      
      stopControl(key);
    }
    
    // Add listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // IMPORTANT: Return cleanup function
    // This prevents memory leaks when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
</script>

<div class="grid grid-cols-5 gap-1 text-[0.6rem]">
  <!-- WASD Controls -->
  <div></div>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.w ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
    onmousedown={() => startControl('w')}
    onmouseup={() => stopControl('w')}
    onmouseleave={() => stopControl('w')}
    ontouchstart={() => startControl('w')}
    ontouchend={() => stopControl('w')}
  >
    W
  </button>
  <div></div>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys['1'] ? 'bg-red-600' : 'bg-gray-700/70'} text-white transition-colors"
    onmousedown={() => startControl('1')}
    onmouseup={() => stopControl('1')}
    onmouseleave={() => stopControl('1')}
    ontouchstart={() => startControl('1')}
    ontouchend={() => stopControl('1')}
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
  >
    2
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.a ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
    onmousedown={() => startControl('a')}
    onmouseup={() => stopControl('a')}
    onmouseleave={() => stopControl('a')}
    ontouchstart={() => startControl('a')}
    ontouchend={() => stopControl('a')}
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
  >
    S
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.d ? 'bg-blue-600' : 'bg-gray-700/70'} text-white transition-colors"
    onmousedown={() => startControl('d')}
    onmouseup={() => stopControl('d')}
    onmouseleave={() => stopControl('d')}
    ontouchstart={() => startControl('d')}
    ontouchend={() => stopControl('d')}
  >
    D
  </button>
  
  <div></div>
  <div></div>
</div>

<!-- Debug info (optional, remove in production) -->
{#if import.meta.env.DEV}
  <div class="mt-2 text-xs text-white/50 font-mono">
    <div>Movement: x={controls.state.movement.x.toFixed(1)}, z={controls.state.movement.z.toFixed(1)}</div>
    <div>Balloon: inflate={controls.state.balloon.inflate.toFixed(1)}, deflate={controls.state.balloon.deflate.toFixed(1)}</div>
    <div>Status: {controls.status.isMoving ? 'Moving' : 'Still'} | {controls.status.isBalloonActive ? 'Balloon Active' : 'Neutral'}</div>
  </div>
{/if}