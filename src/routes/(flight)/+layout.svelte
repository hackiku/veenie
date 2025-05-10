<!-- src/routes/(flight)/+layout.svelte -->
<script lang="ts">
  import '../../app.css';
  import { createSimulationContext } from '$lib/sims/material/state/simulationContext.svelte';
  
  // Get the data from layout.server.ts
  let { data, children } = $props();
  
  console.log('Layout loaded with Venus data:', data.planet?.name);
  console.log('Atmospheric layers:', data.atmosphere?.length);
  console.log('Available vehicles:', data.vehicles?.length);
  
  // Create the main simulation context with DB data
  const sim = createSimulationContext(data);
  const { commands } = sim;
  
  // Setup keyboard shortcuts at the layout level
  function handleKeyDown(e) {
    if (e.key === 'p') {
      if (sim.isPaused()) {
        commands.play();
      } else {
        commands.pause();
      }
    } else if (e.key === 'r') {
      commands.reset();
    } else if (e.key === 'd') {
      commands.setDebug(!sim.isDebug());
    }
  }
  
  // Set up global keyboard shortcuts
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      
      // Clean up when unmounting
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
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