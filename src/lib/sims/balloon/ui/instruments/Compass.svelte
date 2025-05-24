<!-- src/lib/sims/balloon/ui/instruments/Compass.svelte -->
<script lang="ts">
  import * as THREE from 'three';
  
  // Enhanced props with balloon heading
  let { 
    telemetry = { globalPosition: { latitude: 0, longitude: 0 } },
    cameraHeading = 0,    // Camera heading in radians
    balloonHeading = 0,   // Balloon yaw heading in radians (NEW!)
    position = "bottom-left",
    size = 120
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-8 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Unit toggle state
  let useDegrees = $state(true);
  
  // Display mode toggle: 'balloon' | 'camera' | 'both'
  let displayMode = $state('balloon');
  
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
      return value.toFixed(4);
    }
    return '0.0000';
  }
  
  // Convert radians to degrees
  function radToDeg(radians) {
    return THREE.MathUtils.radToDeg(radians);
  }
  
  // Get primary heading for display (balloon takes precedence)
  function getPrimaryHeading() {
    const heading = displayMode === 'camera' ? cameraHeading : balloonHeading;
    if (useDegrees) {
      return radToDeg(heading);
    } else {
      return heading;
    }
  }
  
  // Get secondary heading for dual display
  function getSecondaryHeading() {
    if (displayMode !== 'both') return null;
    const heading = balloonHeading; // Always show balloon as secondary in 'both' mode
    return useDegrees ? radToDeg(heading) : heading;
  }
  
  // Format heading value
  function formatHeading(value, isSecondary = false) {
    if (useDegrees) {
      return Math.round(value) + (isSecondary ? '°B' : '°');
    } else {
      return value.toFixed(2) + (isSecondary ? 'rB' : 'r');
    }
  }
  
  // Toggle between degrees and radians
  function toggleUnits() {
    useDegrees = !useDegrees;
  }
  
  // Toggle display mode
  function toggleDisplayMode() {
    if (displayMode === 'balloon') {
      displayMode = 'camera';
    } else if (displayMode === 'camera') {
      displayMode = 'both';
    } else {
      displayMode = 'balloon';
    }
  }
  
  // Calculate position for compass elements based on selected heading
  function getCompassPosition(angleInDegrees, radius = 36) {
    const referenceHeading = displayMode === 'camera' ? cameraHeading : balloonHeading;
    const adjustedAngle = angleInDegrees - radToDeg(referenceHeading);
    const radians = THREE.MathUtils.degToRad(adjustedAngle);
    return {
      x: Math.sin(radians) * radius,
      y: -Math.cos(radians) * radius
    };
  }
  
  // Get indicator color based on mode
  function getIndicatorColor(isPrimary = true) {
    if (displayMode === 'balloon') return '#ff4444'; // Red for balloon
    if (displayMode === 'camera') return '#4444ff';  // Blue for camera
    if (displayMode === 'both') {
      return isPrimary ? '#ff4444' : '#4444ff'; // Red for balloon, blue for camera
    }
    return '#ffffff';
  }
  
  // Get mode label
  function getModeLabel() {
    switch (displayMode) {
      case 'balloon': return 'BAL';
      case 'camera': return 'CAM';
      case 'both': return 'B+C';
      default: return 'BAL';
    }
  }
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container - proper circle -->
  <div class="bg-black/40 text-white rounded-full flex flex-col items-center p-3 backdrop-blur-sm" style="width: {size}px; height: {size}px;">
    
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
        
        <!-- Primary heading indicator (main arrow) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
          <div 
            class="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent"
            style="border-bottom-color: {getIndicatorColor(true)}"
          ></div>
        </div>
        
        <!-- Secondary heading indicator for dual mode (smaller arrow) -->
        {#if displayMode === 'both'}
          <div 
            class="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1"
            style="transform: rotate({radToDeg(cameraHeading - balloonHeading)}deg) translateX(-50%) translateY(-4px);"
          >
            <div 
              class="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent"
              style="border-bottom-color: {getIndicatorColor(false)}"
            ></div>
          </div>
        {/if}
        
        <!-- Center dot -->
        <div class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <!-- Primary heading value display -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 text-xs font-mono bg-black/60 px-1 py-0.5 rounded">
          {formatHeading(getPrimaryHeading())}
          {#if displayMode === 'both'}
            <br><span class="text-blue-300 text-[10px]">{formatHeading(getSecondaryHeading(), true)}</span>
          {/if}
        </div>
      </div>
    </div>
    
    <!-- Enhanced control buttons -->
    <div class="flex gap-1 mb-1">
      <!-- Unit toggle button -->
      <button 
        class="text-xs opacity-80 cursor-pointer hover:text-blue-300 transition-colors bg-transparent border-none px-1"
        onclick={toggleUnits}
        title="Toggle degrees/radians"
      >
        {useDegrees ? 'DEG' : 'RAD'}
      </button>
      
      <!-- Mode toggle button -->
      <button 
        class="text-xs opacity-80 cursor-pointer hover:text-yellow-300 transition-colors bg-transparent border-none px-1"
        onclick={toggleDisplayMode}
        title="Toggle display mode: Balloon/Camera/Both"
        style="color: {getIndicatorColor(true)}"
      >
        {getModeLabel()}
      </button>
    </div>
    
    <!-- Coordinates display (balloon position) -->
    <div class="text-center text-xs font-mono">
      <div>{formatCoord(telemetry?.globalPosition?.latitude)}°N</div>
      <div>{formatCoord(telemetry?.globalPosition?.longitude)}°E</div>
    </div>
  </div>
</div>