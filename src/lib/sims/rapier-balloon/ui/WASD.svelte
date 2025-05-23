<!-- src/lib/sims/balloon/ui/WASD.svelte -->
<script lang="ts">
  import { getPhysicsEngine } from '../physics/engine';
  
  // Get the physics engine
  const engine = getPhysicsEngine();
  
  // Active key state for visual feedback
  let activeKeys = $state({
    w: false,
    a: false,
    s: false,
    d: false,
    '1': false,
    '2': false
  });
  
  // Check for active keys from keyboard input
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      
      // Handle WASD
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        activeKeys[key] = true;
        engine.setKeyState(key, true);
      }
      // Handle number keys
      else if (key === '1' || key === '2') {
        activeKeys[key] = true;
        engine.setKeyState(key, true);
      }
      // Handle space for inflate
      else if (key === ' ') {
        activeKeys['2'] = true;
        engine.setKeyState('2', true);
      }
      // Handle shift for deflate
      else if (key === 'shift') {
        activeKeys['1'] = true;
        engine.setKeyState('1', true);
      }
    };
    
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      
      // Handle WASD
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        activeKeys[key] = false;
        engine.setKeyState(key, false);
      }
      // Handle number keys
      else if (key === '1' || key === '2') {
        activeKeys[key] = false;
        engine.setKeyState(key, false);
      }
      // Handle space for inflate
      else if (key === ' ') {
        activeKeys['2'] = false;
        engine.setKeyState('2', false);
      }
      // Handle shift for deflate
      else if (key === 'shift') {
        activeKeys['1'] = false;
        engine.setKeyState('1', false);
      }
    };
    
    // Reset key state when window loses focus
    const handleBlur = () => {
      for (const key in activeKeys) {
        activeKeys[key] = false;
        engine.setKeyState(key, false);
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
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