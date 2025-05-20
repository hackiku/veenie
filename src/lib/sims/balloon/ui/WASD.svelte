<!-- src/lib/sims/balloon/ui/WASD.svelte (modified) -->
<script lang="ts">
  import { getPhysicsEngine } from '../physics/engine';
  import { getContext } from 'svelte';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Get the global keyboard context
  const { state: keyboardState } = getContext('keyboard');
  
  // Local active key state for visual feedback
  let activeKeys = $state({
    w: false,
    a: false,
    s: false,
    d: false,
    '1': false,
    '2': false
  });
  
  // Update physics engine based on global keyboard state
  $effect(() => {
    // Movement keys (WASD)
    engine.setKeyState('w', keyboardState.w);
    engine.setKeyState('a', keyboardState.a);
    engine.setKeyState('s', keyboardState.s);
    engine.setKeyState('d', keyboardState.d);
    
    // Control keys (1, 2)
    engine.setKeyState('1', keyboardState['1'] || keyboardState.shift);
    engine.setKeyState('2', keyboardState['2']);
    
    // Update local state for UI
    activeKeys.w = keyboardState.w;
    activeKeys.a = keyboardState.a;
    activeKeys.s = keyboardState.s;
    activeKeys.d = keyboardState.d;
    activeKeys['1'] = keyboardState['1'] || keyboardState.shift;
    activeKeys['2'] = keyboardState['2'];
  });
  
  // Handle button press/release
  function startControl(key: string) {
    activeKeys[key] = true;
    engine.setKeyState(key, true);
  }
  
  function stopControl(key: string) {
    activeKeys[key] = false;
    engine.setKeyState(key, false);
  }
</script>

<div class="grid grid-cols-5 gap-1 text-[0.6rem]">
  <!-- WASD Controls -->
  <div></div>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.w ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
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
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys['1'] ? 'bg-red-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('1')}
    onmouseup={() => stopControl('1')}
    onmouseleave={() => stopControl('1')}
    ontouchstart={() => startControl('1')}
    ontouchend={() => stopControl('1')}
  >
    1
  </button>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys['2'] ? 'bg-green-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('2')}
    onmouseup={() => stopControl('2')}
    onmouseleave={() => stopControl('2')}
    ontouchstart={() => startControl('2')}
    ontouchend={() => stopControl('2')}
  >
    2
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.a ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('a')}
    onmouseup={() => stopControl('a')}
    onmouseleave={() => stopControl('a')}
    ontouchstart={() => startControl('a')}
    ontouchend={() => stopControl('a')}
  >
    A
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.s ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('s')}
    onmouseup={() => stopControl('s')}
    onmouseleave={() => stopControl('s')}
    ontouchstart={() => startControl('s')}
    ontouchend={() => stopControl('s')}
  >
    S
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.d ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
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