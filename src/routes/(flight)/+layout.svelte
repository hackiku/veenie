<!-- src/routes/(flight)/+layout.svelte -->
<script lang="ts">
  import '../../app.css';
  import { createSimulationContext } from '$lib/sims/material/state/context.svelte';
  
  // Get the data from layout.server.ts
  let { data, children } = $props();
  
  console.log('Layout loaded with Venus data:', data.planet?.name);
  console.log('Atmospheric layers:', data.atmosphere?.length);
  console.log('Available vehicles:', data.vehicles?.length);
  
  // Create the main simulation context with DB data
  // This handles app-level simulation state, not balloon-specific controls
  const sim = createSimulationContext(data);
  const { commands } = sim;
  
  // Global app-level keyboard shortcuts (not simulation controls)
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      
      // Only handle app-level shortcuts here
      // Simulation-specific controls are handled by the control context
      if (key === 'f11') {
        // Toggle fullscreen
        e.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } else if (key === 'escape') {
        // Exit fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      // Removed all simulation-specific shortcuts - those belong in the control context
    }
    
    function handleKeyUp(e: KeyboardEvent) {
      // Only handle app-level key releases if needed
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
  
  // Start a session when loaded (app-level concern)
  $effect(() => {
    if (typeof window !== 'undefined') {
      commands.startSession();
    }
  });
</script>

<!-- Render child routes using modern Svelte 5 syntax -->
{@render children()}