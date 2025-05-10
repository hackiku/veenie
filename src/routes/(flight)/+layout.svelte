<!-- src/routes/(flight)/+layout.svelte -->
<script lang="ts">
  import '../../app.css';
  import { createSimulationContext } from '$lib/sims/material/contexts/simulationContext.svelte';
  
  // Get the data from layout.server.ts
  let { data, children } = $props();
  
  console.log('Layout loaded with Venus data:', data.planet?.name);
  console.log('Atmospheric layers:', data.atmosphere?.length);
  console.log('Available vehicles:', data.vehicles?.length);
  
  // Create the main simulation context with DB data
  const sim = createSimulationContext(data);
  
  // Setup keyboard shortcuts at the layout level
  function handleKeyDown(e) {
    if (e.key === 'p') {
      sim.setPaused(!sim.isPaused());
    } else if (e.key === 'r') {
      sim.resetSimulation();
    } else if (e.key === 'd') {
      sim.setDebug(!sim.isDebug());
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
      sim.startSession().catch(err => {
        console.warn('Could not start session, continuing without telemetry:', err);
      });
    }
  });
</script>

{@render children()}