<!-- src/lib/sims/space/SolarSystemScene.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Props for configuration
  export let initialFocus = 'earth'; // Default focus on Earth
  export let showOrbits = true;
  export let simulationSpeed = 1; // Days per second

  // Container reference
  let container;
  let simulation;
  let spaceObjects = {}; // Store references to created objects
  let animationFrameId;
  let isScriptLoaded = false;

  onMount(() => {
    // Dynamically load SpaceKit.js
    const script = document.createElement('script');
    script.src = 'https://typpo.github.io/spacekit/build/spacekit.js';
    script.onload = () => {
      isScriptLoaded = true;
      initializeSimulation();
    };
    document.head.appendChild(script);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  });

  function initializeSimulation() {
    if (!isScriptLoaded || !container) return;

    // Create the Spacekit simulation
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

    // Create a starry background skybox
    simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

    // Add the Sun
    spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
    
    // Add the planets
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

    // Focus on the selected body
    if (spaceObjects[initialFocus]) {
      simulation.lookAt(spaceObjects[initialFocus], {
        enableTransition: true,
        distance: getPlanetViewDistance(initialFocus),
      });
    }
    
    // Start animation loop
    startAnimation();
  }

  function addPlanet(name, preset) {
    // Create the planet
    spaceObjects[name] = simulation.createObject(name, preset);
    
    // Add orbit visualization if enabled
    if (showOrbits) {
      simulation.createOrbit(name + '_orbit', {
        ephem: preset.ephem,
        color: getOrbitColor(name),
      });
    }
  }
  
  function getPlanetViewDistance(planet) {
    // Return appropriate viewing distances based on planet size
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
  
  function getOrbitColor(planet) {
    // Return distinct colors for each planet's orbit
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
  
  function startAnimation() {
    // SpaceKit handles its own animation, but we need to ensure 
    // the simulation continues to update
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (simulation) {
        // Additional per-frame updates can be added here
      }
    };
    animate();
  }
  
  // Public methods that can be called from parent components
  export function focusOnPlanet(planetName) {
    if (spaceObjects[planetName]) {
      simulation.lookAt(spaceObjects[planetName], {
        enableTransition: true,
        distance: getPlanetViewDistance(planetName),
      });
    }
  }
  
  export function setSimulationSpeed(speed) {
    if (simulation) {
      simulation.setJdPerSecond(speed);
    }
  }
  
  // Update when props change
  $: if (simulation && simulationSpeed) {
    simulation.setJdPerSecond(simulationSpeed);
  }
</script>

<div class="w-full h-full" bind:this={container}></div>