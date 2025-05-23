<!-- src/lib/sims/balloon/ui/instruments/Compass.svelte -->
<script lang="ts">
  import * as THREE from 'three';
  
  // Props with defaults
  let { 
    telemetry = { globalPosition: { latitude: 0, longitude: 0 } },
    cameraHeading = 0, // Camera heading in radians
    position = "bottom-left",
    size = 120
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle state
  let useDegrees = $state(true);
  
  // Cardinal points for compass rose
  const cardinalPoints = [
    { label: "N", angle: 0 },
    { label: "NE", angle: 45 },
    { label: "E", angle: 90 },
    { label: "SE", angle: 135 },
    { label: "S", angle: 180 },
    { label: "SW", angle: 225 },
    { label: "W", angle: 270 },
    { label: "NW", angle: 315 }
  ];
  
  // Generate tick marks (every 15 degrees)
  const tickMarks = Array.from({ length: 24 }, (_, i) => ({
    angle: i * 15,
    isMajor: i % 6 === 0, // Major ticks every 90 degrees (N,E,S,W)
    isMinor: i % 2 === 0 && i % 6 !== 0 // Minor ticks every 30 degrees
  }));
  
  // Format coordinates with higher sensitivity
  function formatCoord(value) {
    if (typeof value === 'number') {
      return value.toFixed(4); // Increased precision for better sensitivity
    }
    return '0.0000';
  }
  
  // Convert camera heading from radians to degrees
  function getHeadingInDegrees(headingRad) {
    return THREE.MathUtils.radToDeg(headingRad);
  }
  
  // Get current heading for display
  function getCurrentHeading() {
    if (useDegrees) {
      return getHeadingInDegrees(cameraHeading);
    } else {
      return cameraHeading;
    }
  }
  
  // Format heading value
  function formatHeading(value) {
    if (useDegrees) {
      return Math.round(value) + '°';
    } else {
      return value.toFixed(2) + 'r';
    }
  }
  
  // Toggle between degrees and radians
  function toggleUnits() {
    useDegrees = !useDegrees;
  }
  
  // Calculate position for compass elements
  function getCompassPosition(angleInDegrees, radius = 36) {
    const adjustedAngle = angleInDegrees - getHeadingInDegrees(cameraHeading);
    const radians = THREE.MathUtils.degToRad(adjustedAngle);
    return {
      x: Math.sin(radians) * radius,
      y: -Math.cos(radians) * radius
    };
  }
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container - proper circle -->
  <div class="bg-black/40 text-white rounded-full flex flex-col items-center p-3 backdrop-blur-sm" style="width: {size}px; height: {size}px;">
    <!-- Compass label -->
    <div class="text-xs font-semibold mb-1">Compass</div>
    
    <!-- Compass rose container -->
    <div class="relative flex-1 w-full flex items-center justify-center">
      <!-- Compass circle -->
      <div class="relative" style="width: {size * 0.7}px; height: {size * 0.7}px;">
        
        <!-- Outer ring -->
        <div class="absolute inset-0 rounded-full border border-white/60"></div>
        
        <!-- Inner ring -->
        <div class="absolute inset-2 rounded-full border border-white/40"></div>
        
        <!-- Tick marks -->
        {#each tickMarks as tick}
          {@const pos = getCompassPosition(tick.angle, 42)}
          {#if tick.isMajor}
            <!-- Major ticks (N,E,S,W) -->
            <div 
              class="absolute w-0.5 h-3 bg-white transform -translate-x-1/2"
              style="
                left: calc(50% + {pos.x}%); 
                top: calc(50% + {pos.y}% - 6px);
              "
            ></div>
          {:else if tick.isMinor}
            <!-- Minor ticks (30-degree marks) -->
            <div 
              class="absolute w-0.5 h-2 bg-white/70 transform -translate-x-1/2"
              style="
                left: calc(50% + {pos.x}%); 
                top: calc(50% + {pos.y}% - 4px);
              "
            ></div>
          {:else}
            <!-- Fine ticks (15-degree marks) -->
            <div 
              class="absolute w-px h-1 bg-white/50 transform -translate-x-1/2"
              style="
                left: calc(50% + {pos.x}%); 
                top: calc(50% + {pos.y}% - 2px);
              "
            ></div>
          {/if}
        {/each}
        
        <!-- Cardinal direction labels -->
        {#each cardinalPoints as point}
          {@const pos = getCompassPosition(point.angle, 32)}
          <div 
            class="absolute font-mono text-xs font-bold transform -translate-x-1/2 -translate-y-1/2"
            style="
              left: calc(50% + {pos.x}%); 
              top: calc(50% + {pos.y}%);
              font-size: {point.label.length === 1 ? '12px' : '9px'};
              opacity: {point.label.length === 1 ? 1 : 0.8};
            "
          >
            {point.label}
          </div>
        {/each}
        
        <!-- Current heading indicator (red arrow) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
          <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>
        
        <!-- Center dot -->
        <div class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <!-- Heading value display -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 text-xs font-mono bg-black/60 px-1 py-0.5 rounded">
          {formatHeading(getCurrentHeading())}
        </div>
      </div>
    </div>
    
    <!-- Unit toggle button -->
    <button 
      class="text-xs opacity-80 cursor-pointer hover:text-blue-300 transition-colors bg-transparent border-none mb-1"
      onclick={toggleUnits}
      title="Toggle degrees/radians"
    >
      {useDegrees ? 'DEG' : 'RAD'}
    </button>
    
    <!-- Coordinates display (balloon position) -->
    <div class="text-center text-xs font-mono">
      <div>{formatCoord(telemetry?.globalPosition?.latitude)}°N</div>
      <div>{formatCoord(telemetry?.globalPosition?.longitude)}°E</div>
    </div>
  </div>
</div>