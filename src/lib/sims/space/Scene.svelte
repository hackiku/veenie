<!-- src/lib/sims/space/Scene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
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
  
  // Planet setup
  function addPlanet(name: string, preset: any) {
    try {
      spaceObjects[name] = simulation.createObject(name, preset);
      console.log(`Added planet ${name}:`, spaceObjects[name]);
    } catch (error) {
      console.error(`Error adding planet ${name}:`, error);
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
      'moon': 2
    };
    return distanceMap[planet] || 20;
  }
  
  // Orbit colors
  function getOrbitColor(planet: string): number {
    const colorMap: Record<string, number> = {
      'mercury': 0xbbbbbb,
      'venus': 0xffcc00,
      'earth': 0x0099ff,
      'mars': 0xff3300,
      'jupiter': 0xffaa00,
      'saturn': 0xeedd00,
      'uranus': 0x00ccff,
      'neptune': 0x0066ff
    };
    return colorMap[planet] || 0xffffff;
  }
  
  // Initialize the simulation
  onMount(async () => {
    try {
      // Import spacekit from NPM
      const Spacekit = await import('spacekit.js');
      
      if (!container) return;
      
      // Create simulation
      console.log('Creating SpaceKit simulation');
      simulation = new Spacekit.Simulation(container, {
        basePath: '/spacekit', // Update to your static path
        startDate: new Date(),
        jdPerSecond: simulationSpeed,
        camera: {
          initialPosition: [0, -30, 5],
        },
        debug: {
          showAxes: false,
          showGrid: false,
        },
      });
      
      // Create skybox
      simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);
      
      // Add sun
      spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
      
      // Add planets
      addPlanet('mercury', Spacekit.SpaceObjectPresets.MERCURY);
      addPlanet('venus', Spacekit.SpaceObjectPresets.VENUS);
      addPlanet('earth', Spacekit.SpaceObjectPresets.EARTH);
      addPlanet('mars', Spacekit.SpaceObjectPresets.MARS);
      addPlanet('jupiter', Spacekit.SpaceObjectPresets.JUPITER);
      addPlanet('saturn', Spacekit.SpaceObjectPresets.SATURN);
      addPlanet('uranus', Spacekit.SpaceObjectPresets.URANUS);
      addPlanet('neptune', Spacekit.SpaceObjectPresets.NEPTUNE);
      
      // Add Earth's moon
      spaceObjects.moon = simulation.createObject('moon', {
        ephem: Spacekit.EphemPresets.MOON,
        labelText: 'Moon',
        particleSize: 2,
      });
      
      // Add orbits if supported - with better error handling
      try {
        for (const [name, obj] of Object.entries(spaceObjects)) {
          if (name === 'sun' || name === 'moon') continue;
          
          const preset = Spacekit.SpaceObjectPresets[name.toUpperCase()];
          if (preset && preset.ephem) {
            try {
              if (Spacekit.Orbit && typeof Spacekit.Orbit === 'function') {
                const orbit = new Spacekit.Orbit(preset.ephem);
                if (orbit) {
                  simulation.addObject(orbit, {
                    color: getOrbitColor(name),
                    objectName: name + '_orbit'
                  });
                }
              }
            } catch (specificOrbitErr) {
              console.warn(`Could not add orbit for ${name}:`, specificOrbitErr);
            }
          }
        }
      } catch (orbitErr) {
        console.warn('Could not add orbits:', orbitErr);
      }
      
      // Set initial focus
      setTimeout(() => {
        if (initialFocus && spaceObjects[initialFocus]) {
          focusOnPlanet(initialFocus);
        }
      }, 500);
      
      loading = false;
    } catch (err) {
      console.error('Error initializing SpaceKit:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
      loading = false;
    }
  });
  
  // Cleanup on destroy
  onDestroy(() => {
    if (simulation) {
      try {
        simulation.stop();
        if (container && container.parentNode) {
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
<div bind:this={container} class="absolute inset-0 z-0">
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