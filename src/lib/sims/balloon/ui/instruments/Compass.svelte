<!-- src/lib/sims/balloon/ui/Compass.svelte -->
<script lang="ts">
  // Props with defaults
  let { 
    telemetry = { globalPosition: { latitude: 0, longitude: 0 } },
    position = "bottom-left",
    size = 120  // Larger default size
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Cardinal points with positioning calculations
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
  
  // Format coordinates 
  function formatCoord(value) {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return '0.00';
  }
  
  // In a real implementation we'd calculate heading from velocity or other data
  // For now we'll use longitude as a placeholder
  let heading = $state(0);
  
  $effect(() => {
    // This would need to be replaced with actual heading calculation
    heading = 0; // Static north for now, replace with actual heading logic
  });
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container - using aspect-square to maintain shape -->
  <div class="bg-black/40 text-white rounded flex flex-col items-center p-3 backdrop-blur-sm aspect-square" style="width: {size}px;">
    <!-- Compass label -->
    <div class="text-xs font-semibold mb-1">Compass</div>
    
    <!-- Compass rose - taking most of the space -->
    <div class="relative flex-1 w-full">
      <!-- Outer ring -->
      <div class="absolute inset-0 rounded-full border border-white/60"></div>
      
      <!-- Inner ring -->
      <div class="absolute inset-4 rounded-full border border-white/40"></div>
      
      <!-- Cardinal direction indicators -->
      {#each cardinalPoints as point}
        <div 
          class="absolute font-mono text-xs transform -translate-x-1/2 -translate-y-1/2"
          style="
            left: 50%; 
            top: 50%; 
            transform: translate(
              calc(36% * {Math.sin((point.angle - heading) * Math.PI / 180)}), 
              calc(-36% * {Math.cos((point.angle - heading) * Math.PI / 180)})
            );
            opacity: {point.label.length === 1 ? 1 : 0.6};
            font-weight: {point.label.length === 1 ? 'bold' : 'normal'};
            font-size: {point.label.length === 1 ? '14px' : '10px'};
          "
        >
          {point.label}
        </div>
      {/each}
      
      <!-- Cross lines -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-px bg-white/20"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-px h-full bg-white/20"></div>
      </div>
      
      <!-- Current heading indicator -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2">
        <div class="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-red-500"></div>
      </div>
      
      <!-- Center dot -->
      <div class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    
    <!-- Coordinates display -->
    <div class="mt-1 text-center text-xs font-mono">
      {formatCoord(telemetry?.globalPosition?.latitude)}°N, {formatCoord(telemetry?.globalPosition?.longitude)}°E
    </div>
  </div>
</div>