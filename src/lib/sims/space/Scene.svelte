<!-- src/lib/sims/space/Scene.svelte -->
<script>
  import { T } from '@threlte/core';
  import { onMount } from 'svelte';
  
  // Props
  let { initialFocus = 'earth', simulationSpeed = 1 } = $props();
  
  // References and state
  let container;
  let simulation = $state(null);
  let spaceObjects = $state({});
  let Spacekit = $state(null);
  let loading = $state(true);
  let error = $state(null);
  
  // Exported methods
  function focusOnPlanet(planetName) {
    try {
      if (spaceObjects[planetName] && simulation) {
        // Use simulation.getViewer().followObject to focus on planets
        simulation.getViewer().followObject(spaceObjects[planetName], {
          enableTransition: true,
          distance: getPlanetViewDistance(planetName),
        });
      }
    } catch (err) {
      console.error(`Error focusing on planet ${planetName}:`, err);
    }
  }

  function setSimulationSpeed(speed) {
    try {
      if (simulation) {
        simulation.setJdPerSecond(speed);
      }
    } catch (err) {
      console.error(`Error setting simulation speed:`, err);
    }
  }
  
  // Load SpaceKit safely
  async function loadSpaceKit() {
    return new Promise((resolve, reject) => {
      try {
        // Try to import from NPM
        import('spacekit.js')
          .then(module => {
            console.log('SpaceKit loaded from NPM');
            Spacekit = module.default || module;
            resolve();
          })
          .catch(npmErr => {
            console.warn('Failed to load SpaceKit from NPM:', npmErr);
            
            // Fallback to CDN
            const script = document.createElement('script');
            script.src = 'https://typpo.github.io/spacekit/build/spacekit.js';
            script.async = true;
            
            script.onload = () => {
              console.log('SpaceKit loaded from CDN');
              Spacekit = window.Spacekit;
              resolve();
            };
            
            script.onerror = (err) => {
              console.error('Failed to load SpaceKit from CDN:', err);
              reject(new Error('Failed to load SpaceKit'));
            };
            
            document.head.appendChild(script);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
  
  onMount(async () => {
    try {
      // First load SpaceKit
      await loadSpaceKit();
      
      if (!Spacekit) {
        throw new Error('SpaceKit failed to load');
      }
      
      if (container) {
        console.log('Creating SpaceKit simulation');
        
        // Create the simulation
        simulation = new Spacekit.Simulation(container, {
          basePath: 'https://typpo.github.io/spacekit/',
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
        
        console.log('SpaceKit simulation created:', simulation);
        
        // Create skybox
        simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);
        
        // Add the Sun
        spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
        
        // Add planets without orbits first
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
        
        // Add orbits in a separate loop if supported
        try {
          for (const [name, obj] of Object.entries(spaceObjects)) {
            // Skip the sun and moon
            if (name === 'sun' || name === 'moon') continue;
            
            const preset = Spacekit.SpaceObjectPresets[name.toUpperCase()];
            if (preset && preset.ephem) {
              // Check if the Orbit class is available
              if (Spacekit.Orbit) {
                const orbit = new Spacekit.Orbit(preset.ephem);
                simulation.addObject(orbit, {
                  color: getOrbitColor(name),
                  objectName: name + '_orbit'
                });
              }
            }
          }
        } catch (orbitErr) {
          console.warn('Could not add orbits:', orbitErr);
        }
        
        // Initial focus - use setTimeout to ensure the simulation is ready
        setTimeout(() => {
          if (initialFocus && spaceObjects[initialFocus]) {
            focusOnPlanet(initialFocus);
          }
        }, 500);
      }
      
      loading = false;
    } catch (err) {
      console.error('Error initializing SpaceKit:', err);
      error = err.message;
      loading = false;
    }
    
    // Return cleanup function
    return () => {
      if (simulation) {
        try {
          simulation.stop();
          while (container && container.firstChild) {
            container.removeChild(container.firstChild);
          }
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  });
  
  // Helper function to add a planet without orbit
  function addPlanet(name, preset) {
    try {
      // Create the planet
      spaceObjects[name] = simulation.createObject(name, preset);
      console.log(`Added planet ${name}:`, spaceObjects[name]);
    } catch (error) {
      console.error(`Error adding planet ${name}:`, error);
    }
  }
  
  // Get viewing distance for planets
  function getPlanetViewDistance(planet) {
    const distanceMap = {
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
  
  // Get color for planet orbits
  function getOrbitColor(planet) {
    const colorMap = {
      'mercury': 0xbbbbbb, // Light gray
      'venus': 0xffcc00,   // Yellow
      'earth': 0x0099ff,   // Blue
      'mars': 0xff3300,    // Red
      'jupiter': 0xffaa00, // Orange
      'saturn': 0xeedd00,  // Gold
      'uranus': 0x00ccff,  // Light blue
      'neptune': 0x0066ff  // Deep blue
    };
    return colorMap[planet] || 0xffffff;
  }
  
  // Update when props change
  $effect(() => {
    if (simulation && simulationSpeed) {
      setSimulationSpeed(simulationSpeed);
    }
  });
  
  // Expose methods
  $effect(() => {
    return {
      focusOnPlanet,
      setSimulationSpeed
    };
  });
</script>

<!-- Bare minimum Threlte elements -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 50, 100]}
  fov={45}
  near={0.1}
  far={1000}
/>

<T.AmbientLight intensity={0.3} />

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