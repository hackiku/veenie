<!-- src/lib/sims/flight/ui/instruments/altimeter/AltimeterTape.svelte -->

<script>
  // Props
  const { 
    altitude = 0, 
    showMetric = true,
    layers = {},
    kmToFeet = (km) => km * 3280.84
  } = $props();
  
  // Generate altimeter tape markers with improved tick marks
  function generateAltimeterMarkers(currentAltitude, range = 3) {
    const markers = [];
    const step = showMetric ? 0.1 : 100; // 100m or 100ft steps
    const halfStep = showMetric ? 0.05 : 50; // 50m or 50ft half steps
    const mainStep = showMetric ? 1 : 1000; // 1km or 1000ft main steps
    
    // Calculate start and end based on current altitude in appropriate units
    let startAlt = showMetric 
      ? Math.floor((currentAltitude - range) * 10) / 10
      : Math.floor(kmToFeet(currentAltitude) - range * 1000);
    
    let endAlt = showMetric 
      ? Math.ceil((currentAltitude + range) * 10) / 10
      : Math.ceil(kmToFeet(currentAltitude) + range * 1000);
    
    // Generate all markers
    for (let alt = startAlt; alt <= endAlt; alt += step) {
      const isMainMark = alt % mainStep < 0.001; // Using < 0.001 to handle floating point imprecision
      const isHalfMark = alt % halfStep < 0.001 && !isMainMark;
      const showLabel = isMainMark; // Only show labels for main marks
      
      const displayValue = showMetric ? alt : alt;
      
      // Convert back to km for position calculation if in feet mode
      const kmValue = showMetric ? alt : alt / 3280.84;
      
      // Calculate position as percentage from bottom
      const position = ((kmValue - (currentAltitude - range)) / (range * 2)) * 100;
      
      if (position >= 0 && position <= 100) {
        markers.push({
          value: displayValue,
          position: position,
          isMain: isMainMark,
          isHalf: isHalfMark,
          showLabel
        });
      }
    }
    
    return markers;
  }
  
  // Format altitude value for display
  function formatAltitude(value) {
    if (showMetric) {
      return value.toFixed(1);
    } else {
      return Math.round(value).toString().padStart(5, '0');
    }
  }
</script>

<!-- Layer markers - horizontal lines at key altitudes -->
<div class="absolute inset-0 z-10">
  {#each Object.entries(layers) as [name, value]}
    {@const relPosition = 50 - ((value - altitude) / 6) * 100}
    {#if relPosition >= 0 && relPosition <= 100}
      <div class="absolute w-full h-px bg-cyan-800/50" style="top: {100 - relPosition}%"></div>
      <div class="absolute text-[8px] text-cyan-400/70 left-1" style="top: calc({100 - relPosition}% - 6px)">
        {name.charAt(0)}{name.charAt(1)}
      </div>
    {/if}
  {/each}
</div>

<!-- Altitude tick marks with improved scale -->
<div class="absolute inset-y-0 left-0 w-8 z-20">
  {#each generateAltimeterMarkers(altitude, 3) as marker}
    {@const tickWidth = marker.isMain ? 'w-8' : marker.isHalf ? 'w-5' : 'w-3'}
    <div 
      class="absolute flex items-center h-6 left-0" 
      style="bottom: {marker.position}%;"
    >
      <!-- Tick mark line - different lengths based on type -->
      <div class="h-px {tickWidth} bg-cyan-400/70"></div>
      
      <!-- Only show label for main ticks -->
      {#if marker.showLabel}
        <div class="absolute left-2 text-[10px] font-mono font-bold">
          {formatAltitude(marker.value)}
        </div>
      {/if}
    </div>
  {/each}
</div>

<!-- Main tape on the right side -->
<div class="absolute inset-0 flex flex-col items-stretch z-20">
  {#each generateAltimeterMarkers(altitude, 3) as marker}
    <div 
      class="absolute flex items-center h-6 right-0" 
      style="bottom: {marker.position}%;"
    >
      {#if marker.isMain}
        <div class="h-px w-full bg-cyan-400/70"></div>
        <div class="absolute right-2 text-sm font-mono font-bold">
          {formatAltitude(marker.value)}
        </div>
      {:else if marker.isHalf}
        <div class="h-px w-8 bg-cyan-400/50 ml-auto mr-0"></div>
      {:else}
        <div class="h-px w-5 bg-cyan-400/30 ml-auto mr-0"></div>
      {/if}
    </div>
  {/each}
</div>

<!-- Current altitude indicator -->
<div class="absolute inset-x-0 flex items-center justify-end z-30" style="top: 50%; height: 24px; margin-top: -12px;">
  <!-- Pointer triangle -->
  <div class="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-cyan-400 mr-0"></div>
  
  <!-- Value display box -->
  <div class="bg-neutral-800/80 text-center px-1 border-l-2 border-l-cyan-400 rounded-sm">
    <div class="font-mono text-lg font-bold text-white">
      {showMetric 
        ? altitude.toFixed(2)
        : Math.round(kmToFeet(altitude)).toString().padStart(5, '0')}
    </div>
  </div>
</div>