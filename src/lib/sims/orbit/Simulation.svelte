<!-- // src/lib/sims/orbit/Simulation.svelte -->

<script lang="ts">
  import * as Spacekit from 'spacekit.js';
  
  // Props
  let { 
    initialConfig = 'venus',
    simulationSpeed = 1 
  } = $props<{
    initialConfig?: string;
    simulationSpeed?: number;
  }>();
  
  // References and state
  let container = $state<HTMLElement | null>(null);
  let simulation = $state<any>(null);
  let spaceObjects = $state<Record<string, any>>({});
  let loading = $state(true);
  let currentView = $state(initialConfig);
  
  // Available configurations
  const configs = {
    'solar-system': setupSolarSystem,
    'venus': setupVenus,
    'venus-habitat': setupVenusHabitat,
    'earth-to-venus': setupTransfer
  };
  
  function changeView(configName: string) {
    if (!simulation || !configs[configName]) return;
    
    // Clear existing objects (if needed)
    // ...
    
    // Setup new configuration
    configs[configName]();
    currentView = configName;
  }
  
  function setupSolarSystem() {
    // Create sun
    spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
    simulation.createAmbientLight();
    simulation.createLight([0, 0, 0]);
    
    // Add planets
    const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    planets.forEach(planet => {
      const presetName = planet.toUpperCase();
      spaceObjects[planet] = simulation.createObject(planet, Spacekit.SpaceObjectPresets[presetName]);
    });
    
    // Position camera for overview
    simulation.getViewer().setPosition([0, -30, 10]);
  }
  
  function setupVenus() {
    // Create sun
    spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
    simulation.createAmbientLight();
    simulation.createLight([0, 0, 0]);
    
    // Add Venus with enhanced detail
    const venus = simulation.createSphere('venus', {
      textureUrl: '/planets/venus.jpg', // Add this texture to your static folder
      radius: 0.008, // Slightly larger for visibility
      ephem: Spacekit.SpaceObjectPresets.VENUS.ephem,
      atmosphere: {
        enable: true,
        color: 0xf0e9d1, // Yellowish atmosphere
      },
      rotation: {
        enable: true,
        speed: 0.5, // Venus rotates slowly
      },
    });
    
    spaceObjects.venus = venus;
    
    // Add Earth for context
    spaceObjects.earth = simulation.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);
    
    // Follow Venus
    simulation.getViewer().followObject(venus, [-0.2, -0.2, 0.1]);
  }
  
  function setupVenusHabitat() {
    // Similar to Venus setup, but add a habitat object
    setupVenus();
    
    // Add a simple habitat (could be a custom SpaceObject later)
    // For now, just using a simple object in orbit
    spaceObjects.habitat = simulation.createObject('habitat', {
      position: [0, 0, 0],
      ephem: new Spacekit.Ephem({
        epoch: 2458600.5,
        a: 0.0085, // Orbit just above Venus
        e: 0.001,
        i: 2.5,
        om: 90,
        w: 180,
        ma: 0,
      }, 'deg'),
    });
    
    // Close view of habitat and Venus
    simulation.getViewer().followObject(spaceObjects.venus, [-0.02, -0.02, 0.01]);
  }
  
  function setupTransfer() {
    // Setup Earth and Venus
    spaceObjects.sun = simulation.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
    spaceObjects.earth = simulation.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);
    spaceObjects.venus = simulation.createObject('venus', Spacekit.SpaceObjectPresets.VENUS);
    
    // Create a transfer orbit
    const transferOrbit = new Spacekit.Ephem({
      epoch: 2458600.5,
      a: 0.75, // Semi-major axis between Earth and Venus
      e: 0.2,  // Elliptical transfer
      i: 2.0,  // Slight inclination
      om: 120, // Longitude of ascending node
      w: 180,  // Argument of periapsis
      ma: 0,   // Mean anomaly
    }, 'deg');
    
    // Create the spacecraft
    spaceObjects.spacecraft = simulation.createObject('spacecraft', {
      ephem: transferOrbit,
    });
    
    // Position camera to see both planets and transfer
    simulation.getViewer().setPosition([-1, -1, 0.5]);
  }
  
  // Initialize simulation on mount
  $effect(() => {
    if (!container) return;
    
    try {
      console.log('Creating SpaceKit simulation');
      simulation = new Spacekit.Simulation(container, {
        basePath: '', 
        startDate: new Date(2025, 2, 8), // March 8, 2025
        jdPerSecond: simulationSpeed,
        unitsPerAu: 100, // Scale to make planets more visible
        camera: {
          initialPosition: [0, -30, 10],
        },
        debug: {
          showAxes: false,
          showGrid: false,
        },
        particleTextureUrl: null, // Avoid texture loading issues
      });
      
      // Create stars
      simulation.createStars();
      
      // Setup initial configuration
      changeView(currentView);
      
      loading = false;
    } catch (err) {
      console.error('Error initializing SpaceKit:', err);
    }
  });
</script>

<!-- Simulation container -->
<div bind:this={container} class="w-full h-full bg-black">
  {#if loading}
    <div class="flex items-center justify-center w-full h-full bg-black text-white">
      <div class="text-center">
        <p class="text-xl mb-2">Loading Simulation</p>
        <div class="w-12 h-12 border-4 border-t-purple-500 border-b-purple-700 border-l-purple-600 border-r-purple-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  {/if}
</div>

<!-- Simple view controls -->
<div class="absolute top-4 left-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white">
  <div class="mb-2 font-bold">Views</div>
  <div class="flex flex-col gap-2">
    {#each Object.keys(configs) as config}
      <button 
        class="px-3 py-1 rounded" 
        class:bg-purple-700={currentView === config}
        class:bg-gray-700={currentView !== config}
        onclick={() => changeView(config)}
      >
        {config}
      </button>
    {/each}
  </div>
</div>