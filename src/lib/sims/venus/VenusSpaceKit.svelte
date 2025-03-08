<!-- src/lib/sims/venus/VenusSpaceKit.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Container reference
  let container;
  let simulation;

  // Initialize SpaceKit simulation
  onMount(() => {
    // Dynamically import SpaceKit
    const script = document.createElement('script');
    script.src = 'https://typpo.github.io/spacekit/build/spacekit.js';
    script.onload = initializeSimulation;
    document.head.appendChild(script);

    return () => {
      // Clean up
      if (simulation) {
        // SpaceKit doesn't have an explicit destroy method, so we need to
        // manually clean up the container
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      document.head.removeChild(script);
    };
  });

  function initializeSimulation() {
    // Create the Spacekit simulation
    simulation = new Spacekit.Simulation(container, {
      basePath: 'https://typpo.github.io/spacekit/',
      startDate: new Date(),
      camera: {
        initialPosition: [0, -30, 5], // Position camera facing Venus
      },
      debug: {
        showAxes: true,
        showGrid: false,
      },
    });

    // Create a skybox using NASA TYCHO artwork
    simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

    // Add the Sun
    const sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
    
    // Add Venus with a detailed texture
    const venus = simulation.createSphere('venus', {
      textureUrl: 'https://typpo.github.io/spacekit/src/assets/planets/venus.jpg',
      radius: 0.9499, // Venus radius (relative to Earth = 1)
      atmosphere: {
        enable: true,
        color: 0xffd700, // Golden atmosphere
        thickness: 0.15, 
      },
      position: Spacekit.SpaceObjectPresets.VENUS.position,
      rotation: {
        enable: true, 
        period: 243, // Venus rotational period in Earth days (retrograde)
        tilt: 177.3, // Venus axial tilt in degrees
      },
    });

    // Add a floating habitat prototype (simple placeholder)
    const habitatPosition = [
      venus.position[0] + 1.2, 
      venus.position[1] + 0.1, 
      venus.position[2] + 0.2
    ];
    
    const habitat = simulation.createObject('habitat', {
      position: habitatPosition,
      shape: {
        type: 'sphere',
        color: 0x00ffff, // Cyan color for visibility
        radius: 0.05, // Small size relative to Venus
      },
      labelText: 'LOX/CH4 Habitat',
      labelShowsDistance: true,
    });
    
    // Optional: Add orbit visualization for Venus around Sun
    simulation.createOrbit('venus_orbit', {
      ephem: Spacekit.SpaceObjectPresets.VENUS.ephem,
      color: 0xffff00,
    });
  }
</script>

<div class="w-full h-full" bind:this={container}></div>