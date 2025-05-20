<!-- src/routes/(flight)/+layout.svelte (modified) -->
<script lang="ts">
  import '../../app.css';
  import { createSimulationContext } from '$lib/sims/material/state/context.svelte';
  import { setContext } from 'svelte';
  
  // Get the data from layout.server.ts
  let { data, children } = $props();
  
  console.log('Layout loaded with Venus data:', data.planet?.name);
  console.log('Atmospheric layers:', data.atmosphere?.length);
  console.log('Available vehicles:', data.vehicles?.length);
  
  // Create the main simulation context with DB data
  const sim = createSimulationContext(data);
  const { commands } = sim;
  
  // Create global keyboard state
  const keyboardState = $state({
    // Movement keys
    w: false,
    a: false,
    s: false,
    d: false,
    // Balloon control keys
    '1': false,
    '2': false,
    // Meta keys state
    shift: false,
    ctrl: false,
    alt: false,
    // Time since last press
    pressTime: {}
  });
  
  // Create functions for checking key combinations
  function isKeyDown(key) {
    return keyboardState[key] === true;
  }
  
  function areKeysDown(keys) {
    return keys.every(key => keyboardState[key] === true);
  }
  
  // Create global keyboard context
  const keyboardContext = {
    state: keyboardState,
    isKeyDown,
    areKeysDown,
    // Helper for components to register their own handlers
    registerHandler: (key, callback) => {
      // This function will be implemented if needed
    }
  };
  
  // Make keyboard state available to all components
  setContext('keyboard', keyboardContext);
  
  // Setup keyboard event handlers
  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    
    // Update meta key state
    keyboardState.shift = e.shiftKey;
    keyboardState.ctrl = e.ctrlKey;
    keyboardState.alt = e.altKey;
    
    // Update pressed key state
    if (key in keyboardState) {
      keyboardState[key] = true;
      keyboardState.pressTime[key] = Date.now();
    }
    
    // Global shortcuts that should take precedence
    if (key === 'p') {
      // Play/Pause
      if (sim.isPaused()) {
        commands.play();
      } else {
        commands.pause();
      }
    } else if (key === 'r' && e.ctrlKey) {
      // Ctrl+R to reset
      e.preventDefault();
      commands.reset();
    } else if (key === 'd') {
      // Debug toggle
      commands.setDebug(!sim.isDebug());
    } else if (key === ' ') {
      // Space bar - Toggle pause if no inflation controls active
      if (!document.activeElement || document.activeElement === document.body) {
        e.preventDefault();
        if (sim.isPaused()) {
          commands.play();
        } else {
          commands.pause();
        }
      }
    }
  }
  
  function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    
    // Update meta key state
    keyboardState.shift = e.shiftKey;
    keyboardState.ctrl = e.ctrlKey;
    keyboardState.alt = e.altKey;
    
    // Update released key state
    if (key in keyboardState) {
      keyboardState[key] = false;
    }
  }
  
  // Handle window blur to reset all keys
  function handleBlur() {
    for (const key in keyboardState) {
      if (typeof keyboardState[key] === 'boolean') {
        keyboardState[key] = false;
      }
    }
  }
  
  // Set up global keyboard shortcuts
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('blur', handleBlur);
      
      // Clean up when unmounting
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('blur', handleBlur);
      };
    }
  });
  
  // Start a session when loaded
  $effect(() => {
    if (typeof window !== 'undefined') {
      commands.startSession();
    }
  });
</script>

<!-- Render child routes using modern Svelte 5 syntax -->
{@render children()}