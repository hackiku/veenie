<!-- src/routes/(flight)/+layout.svelte -->
<script lang="ts">
  import '../../app.css';
  import { createSimulationContext } from '$lib/sims/material/contexts/simulationContext.svelte';
  
  // Get the data from layout.server.ts
  let { data, children } = $props();
  
  console.log('Layout loaded with Venus data:', data.planet?.name);
  console.log('Atmosphere layers:', data.atmosphere?.length || 0);
  
  // Create the main simulation context with DB data
  const sim = createSimulationContext({
    planet: data.planet,
    atmosphere: data.atmosphere,
    vehicles: data.vehicles
  });
  
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
  
  // Try to start a session, but don't block app functionality if it fails
  let sessionStarted = $state(false);
  
  $effect(() => {
    if (typeof window !== 'undefined' && !sessionStarted) {
      // Start with a slight delay to ensure everything is ready
      setTimeout(async () => {
        try {
          await sim.startSession();
          sessionStarted = true;
        } catch (e) {
          console.warn('Session could not be started, continuing without persistence');
        }
      }, 500);
    }
  });
</script>

{@render children()}