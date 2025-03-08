<!-- src/lib/sims/space/SpaceKitCDN.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Props
  export let width = window.innerWidth;
  export let height = window.innerHeight;
  
  // DOM reference and state
  let containerRef;
  let scriptLoaded = false;
  let spacekitLoaded = false;
  let simulation;
  let loadError = null;
  
  // Load SpaceKit from CDN
  function loadSpaceKitScript() {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/spacekit@1.0.0/dist/spacekit.js';
    script.async = true;
    
    // Add event handlers
    script.onload = () => {
      scriptLoaded = true;
      initSpaceKit();
    };
    
    script.onerror = (error) => {
      console.error('Failed to load SpaceKit from CDN:', error);
      loadError = 'Failed to load SpaceKit from CDN. Please check your internet connection.';
    };
    
    // Append to document
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }
  
  // Initialize SpaceKit
  function initSpaceKit() {
    if (!containerRef || !window.Spacekit) return;
    
    try {
      // Create simulation
      simulation = new window.Spacekit.Simulation(containerRef, {
        basePath: '/',
        startDate: new Date(),
        jdPerSecond: 1, // Days per second of real time
        unitsPerAu: 30, // Scale of the simulation
        camera: {
          initialPosition: [0, 10, 20],
        },
        debug: {
          showAxes: true,
          showStats: true,
        },
      });
      
      // Add Sun
      const sun = simulation.createObject('sun', {
        textureUrl: 'https://space-assets-1.nyc3.cdn.digitaloceanspaces.com/spacekit/textures/sun.jpg',
        sunlight: true,
        mass: 1.989e30, // kg
        radius: 695700, // km
      });
      
      // Add Venus
      const venus = simulation.createObject('venus', {
        textureUrl: 'https://space-assets-1.nyc3.cdn.digitaloceanspaces.com/spacekit/textures/venus.jpg',
        labelText: 'Venus',
        ephem: new window.Spacekit.EphemerisTable({
          // Simple orbital data
          entries: {
            // Date: [x, y, z, vx, vy, vz]
            '2025-01-01': [0.72 * Math.cos(0), 0, 0.72 * Math.sin(0), 0, 35, 0],
            '2025-12-31': [0.72 * Math.cos(Math.PI*2), 0, 0.72 * Math.sin(Math.PI*2), 0, 35, 0],
          },
        }),
        radius: 6051.8, // km
      });
      
      // Add Earth
      const earth = simulation.createObject('earth', {
        textureUrl: 'https://space-assets-1.nyc3.cdn.digitaloceanspaces.com/spacekit/textures/earth.jpg',
        labelText: 'Earth',
        ephem: new window.Spacekit.EphemerisTable({
          entries: {
            '2025-01-01': [1 * Math.cos(0), 0, 1 * Math.sin(0), 0, 29.8, 0],
            '2025-12-31': [1 * Math.cos(Math.PI*2), 0, 1 * Math.sin(Math.PI*2), 0, 29.8, 0],
          },
        }),
        radius: 6371, // km
      });
      
      // Add orbit visualizations
      simulation.createOrbit({
        ephem: venus.ephem,
        color: 0xffcc00,
      });
      
      simulation.createOrbit({
        ephem: earth.ephem,
        color: 0x0099ff,
      });
      
      spacekitLoaded = true;
    } catch (error) {
      console.error('Error initializing SpaceKit:', error);
      loadError = error.message;
    }
  }
  
  onMount(() => {
    const cleanupScript = loadSpaceKitScript();
    
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (simulation) {
        simulation.resize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cleanupScript();
      window.removeEventListener('resize', handleResize);
      if (simulation) {
        simulation.destroy();
      }
    };
  });
</script>

<div 
  bind:this={containerRef}
  class="spacekit-container"
  style="width: {width}px; height: {height}px;"
>
  {#if !scriptLoaded}
    <div class="loading">
      <p class="loading-text">Loading SpaceKit from CDN...</p>
      <div class="loading-spinner"></div>
    </div>
  {:else if !spacekitLoaded && !loadError}
    <div class="loading">
      <p class="loading-text">Initializing simulation...</p>
      <div class="loading-spinner"></div>
    </div>
  {:else if loadError}
    <div class="error">
      <p class="error-text">Error: {loadError}</p>
      <p class="error-help">Try refreshing the page or check the console for more details.</p>
    </div>
  {/if}
</div>

<style>
  .spacekit-container {
    background-color: #000;
    position: relative;
    overflow: hidden;
  }
  
  .loading, .error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .loading-text, .error-text {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #9F7AEA;
  }
  
  .error-help {
    font-size: 0.9rem;
    color: #E9E9E9;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: #9F7AEA;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error {
    background-color: rgba(255, 0, 0, 0.1);
  }
</style>