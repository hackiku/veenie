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
  
  // Handle button press/release
  function startControl(key: string) {
    activeKeys[key] = true;
    engine.setKeyState(key, true);
  }
  
  function stopControl(key: string) {
    activeKeys[key] = false;
    engine.setKeyState(key, false);
  }
  
  // Handle keyboard events
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (key in activeKeys) {
        activeKeys[key] = true;
        engine.setKeyState(key, true);
      }
    };
    
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (key in activeKeys) {
        activeKeys[key] = false;
        engine.setKeyState(key, false);
      }
    };
    
    // Reset controls when window loses focus
    const handleBlur = () => {
      for (const key in activeKeys) {
        activeKeys[key] = false;
        engine.setKeyState(key, false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  });
</script>

<div class="grid grid-cols-5 gap-1 text-[0.6rem]">
  <!-- WASD Layout -->
  <div></div>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.w ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('w')}
    onmouseup={() => stopControl('w')}
    onmouseleave={() => stopControl('w')}
  >
    W
  </button>
  <div></div>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys['1'] ? 'bg-red-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('1')}
    onmouseup={() => stopControl('1')}
    onmouseleave={() => stopControl('1')}
  >
    1
  </button>
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys['2'] ? 'bg-green-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('2')}
    onmouseup={() => stopControl('2')}
    onmouseleave={() => stopControl('2')}
  >
    2
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.a ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('a')}
    onmouseup={() => stopControl('a')}
    onmouseleave={() => stopControl('a')}
  >
    A
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.s ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('s')}
    onmouseup={() => stopControl('s')}
    onmouseleave={() => stopControl('s')}
  >
    S
  </button>
  
  <button 
    class="h-6 w-6 flex items-center justify-center rounded {activeKeys.d ? 'bg-blue-600' : 'bg-gray-700/70'} text-white"
    onmousedown={() => startControl('d')}
    onmouseup={() => stopControl('d')}
    onmouseleave={() => stopControl('d')}
  >
    D
  </button>
  
  <div></div>
  <div></div>
</div>