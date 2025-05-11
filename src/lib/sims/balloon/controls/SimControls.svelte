<!-- SimControls.svelte - Improved version -->
<script lang="ts">
  // Svelte 5 props syntax
  let {
    stepCount = 0,
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 }
  } = $props();
  
  // Format numbers for display with appropriate units
  function formatNumber(value, precision = 2) {
    return typeof value === 'number' ? value.toFixed(precision) : '0.00';
  }
</script>

<div class="bg-black/30 text-[0.8em] leading-2 text-white p-4 rounded-lg font-mono w-58">
  
  <div class="grid gap-2 mb-3">
    <div class="flex justify-between">
      <span>Step:</span> 
      <span class="font-bold">{stepCount}</span>
    </div>
    <div class="flex justify-between">
      <span>Altitude:</span> 
      <span class="font-bold">{formatNumber(telemetry.altitude)}m</span>
    </div>
    <div class="flex justify-between">
      <span>Balloon Size:</span> 
      <span class="font-bold">{formatNumber(telemetry.balloonSize)}m</span>
    </div>
    <div class="flex justify-between">
      <span>Air Density:</span> 
      <span class="font-bold">{formatNumber(telemetry.airDensity)}kg/m³</span>
    </div>
    <div class="flex justify-between">
      <span>Buoyancy:</span> 
      <span class="font-bold">{formatNumber(telemetry.buoyancy)}N</span>
    </div>
  </div>
  
  <div class="opacity-70 pt-3 leading-3">
    <div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
      <div>WASD</div><div class="opacity-60">Move</div>
      <div>1</div><div class="opacity-60">Inflate</div>
      <div>2</div><div class="opacity-60">Deflate</div>
    </div>
  </div>
</div>