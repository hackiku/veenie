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
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
</script>

<div class="flex flex-col items-center">
  <!-- W key -->
  <button 
    class="w-8 h-8 flex items-center justify-center rounded {activeKeys.w ? 'bg-blue-600' : 'bg-gray-700/70'} text-white text-xs font-semibold mb-1"
    onmousedown={() => startControl('w')}
    onmouseup={() => stopControl('w')}
    onmouseleave={() => stopControl('w')}
  >
    W
  </button>
  
  <!-- A S D keys row -->
  <div class="flex space-x-1">
    <button 
      class="w-8 h-8 flex items-center justify-center rounded {activeKeys.a ? 'bg-blue-600' : 'bg-gray-700/70'} text-white text-xs font-semibold"
      onmousedown={() => startControl('a')}
      onmouseup={() => stopControl('a')}
      onmouseleave={() => stopControl('a')}
    >
      A
    </button>
    
    <button 
      class="w-8 h-8 flex items-center justify-center rounded {activeKeys.s ? 'bg-blue-600' : 'bg-gray-700/70'} text-white text-xs font-semibold"
      onmousedown={() => startControl('s')}
      onmouseup={() => stopControl('s')}
      onmouseleave={() => stopControl('s')}
    >
      S
    </button>
    
    <button 
      class="w-8 h-8 flex items-center justify-center rounded {activeKeys.d ? 'bg-blue-600' : 'bg-gray-700/70'} text-white text-xs font-semibold"
      onmousedown={() => startControl('d')}
      onmouseup={() => stopControl('d')}
      onmouseleave={() => stopControl('d')}
    >
      D
    </button>
  </div>
  
  <!-- Balloon size controls -->
  <div class="flex space-x-1 mt-3">
    <button 
      class="w-12 h-8 flex items-center justify-center rounded {activeKeys['1'] ? 'bg-red-600' : 'bg-gray-700/70'} text-white text-xs font-semibold"
      onmousedown={() => startControl('1')}
      onmouseup={() => stopControl('1')}
      onmouseleave={() => stopControl('1')}
    >
      1
    </button>
    
    <button 
      class="w-12 h-8 flex items-center justify-center rounded {activeKeys['2'] ? 'bg-green-600' : 'bg-gray-700/70'} text-white text-xs font-semibold"
      onmousedown={() => startControl('2')}
      onmouseup={() => stopControl('2')}
      onmouseleave={() => stopControl('2')}
    >
      2
    </button>
  </div>
</div>