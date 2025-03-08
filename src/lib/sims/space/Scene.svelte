<!-- src/lib/sims/space/Scene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  // Import specific exports from spacekit.js instead of using default import
  import * as Spacekit from 'spacekit.js';
  
  // Props using runes
  let { 
    initialFocus = 'earth', 
    simulationSpeed = 1 
  } = $props<{
    initialFocus?: string;
    simulationSpeed?: number;
  }>();
  
  // References and state
  let container = $state<HTMLElement | null>(null);
  let simulation = $state<any>(null);
  let spaceObjects = $state<Record<string, any>>({});
  let loading = $state(true);
  let error = $state<string | null>(null);
  
  // Exported methods
  function focusOnPlanet(planetName: string) {
    try {
      if (spaceObjects[planetName] && simulation) {
        simulation.getViewer().followObject(spaceObjects[planetName], {
          enableTransition: true,
          distance: getPlanetViewDistance(planetName),
        });
      }
    } catch (err) {
      console.error(`Error focusing on planet ${planetName}:`, err);
    }
  }

  function setSimulationSpeed(speed: number) {
    try {
      if (simulation) {
        simulation.setJdPerSecond(speed);
      }
    } catch (err) {
      console.error(`Error setting simulation speed:`, err);
    }
  }
  
  // Distance calculations
  function getPlanetViewDistance(planet: string): number {
    const distanceMap: Record<string, number> = {
      'sun': 50,
      'mercury': 10,
      'venus': 15,
      'earth': 10,
      'mars': 10,
      'jupiter': 50,
      'saturn': 60,
      'uranus': 30,
      'neptune': 30,
      'spaceman': 20
    };
    return distanceMap[planet] || 20;
  }
  
  // Initialize the simulation
  onMount(async () => {
    try {
      console.log('Mounting SpaceKit component...');
      console.log('Using Spacekit from npm package');
      
      if (!container) {
        throw new Error('Container element not found');
      }
      
      // Create simulation with proper path configuration
      console.log('Creating SpaceKit simulation');
      simulation = new Spacekit.Simulation(container, {
        basePath: '.', // Use empty string to avoid path concatenation issues
        startDate: new Date(2019, 5, 21),
        jdPerSecond: simulationSpeed,
        camera: {
          initialPosition: [0, -30, 5],
        },
        debug: {
          showAxes: false,
          showGrid: false,
        },
        useLoadingBar: false,
        unitsPerAu: 1,
        particleTextureUrl: '/assets/sprites/smallparticle.png', // Use absolute path
        enableSun: true,
      });
      
      // Add sun
      try {
        spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
        console.log('Added sun');
      } catch (err) {
        console.error('Failed to create sun:', err);
      }
      
      // Add planets
      const planets = [
        'mercury', 'venus', 'earth', 'mars', 
        'jupiter', 'saturn', 'uranus', 'neptune'
      ];
      
      // Add planets one by one
      for (const planet of planets) {
        try {
          const planetPreset = Spacekit.SpaceObjectPresets[planet.toUpperCase()];
          spaceObjects[planet] = simulation.createObject(planet, planetPreset);
          console.log(`Added planet ${planet}`);
        } catch (planetErr) {
          console.error(`Error adding planet ${planet}:`, planetErr);
        }
      }
      
      // Add SpaceX Tesla Roadster 
      try {
        spaceObjects.spaceman = simulation.createObject('spaceman', {
          ephem: new Spacekit.Ephem(
            {
              a: 1.324870564730606,
              epoch: 2458426.5,
              e: 2.557785995665682e-1,
              i: 1.07755072280486,
              om: 3.170946964325638e2,
              w: 1.774865822248395e2,
              ma: 1.764302192487955e2,
            },
            'deg',
          ),
        });
        console.log('Added SpaceX Roadster');
      } catch (roadsterErr) {
        console.error('Error adding SpaceX Roadster:', roadsterErr);
      }
      
      // Set initial focus with delay to ensure loading
      setTimeout(() => {
        if (initialFocus && spaceObjects[initialFocus]) {
          focusOnPlanet(initialFocus);
          console.log(`Focused on ${initialFocus}`);
        }
      }, 1000);
      
      loading = false;
      console.log('Simulation loaded successfully');
    } catch (err) {
      console.error('Error initializing SpaceKit:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      
      if (err instanceof Error && err.stack) {
        console.error('Error stack:', err.stack);
      }
      loading = false;
    }
  });
  
  // Cleanup on destroy
  onDestroy(() => {
    if (simulation) {
      try {
        console.log('Cleaning up SpaceKit simulation');
        simulation.stop();
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    }
  });
  
  // Update speed when prop changes
  $effect(() => {
    if (simulation && simulationSpeed) {
      setSimulationSpeed(simulationSpeed);
    }
  });
  
  // Expose methods to parent
  $effect(() => {
    return {
      focusOnPlanet,
      setSimulationSpeed
    };
  });
</script>

<!-- SpaceKit container -->
<div bind:this={container} class="absolute inset-0 z-0 bg-black">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full bg-black text-white">
      <div class="text-center">
        <p class="text-xl mb-2">Loading Solar System</p>
        <div class="w-12 h-12 border-4 border-t-purple-500 border-b-purple-700 border-l-purple-600 border-r-purple-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  {/if}
  
  {#if error}
    <div class="flex items-center justify-center w-full h-full bg-black text-red-500">
      <div class="text-center">
        <p class="text-xl mb-2">Error</p>
        <p>{error}</p>
      </div>
    </div>
  {/if}
</div>