<!-- src/lib/sims/custom-engine/ui/CoordinateOverlay.svelte -->
<script lang="ts">
  // Props with defaults
  let {
    balloonTelemetry = null
  } = $props();
  
  // Derive formatted values
  const formattedLat = $derived(
    balloonTelemetry?.globalPosition?.latitude?.toFixed(4) || "N/A"
  );
  const formattedLon = $derived(
    balloonTelemetry?.globalPosition?.longitude?.toFixed(4) || "N/A"
  );
  const formattedAlt = $derived(
    balloonTelemetry?.altitude?.toFixed(1) || "N/A"
  );
  const formattedWind = $derived(
    balloonTelemetry?.windSpeed?.toFixed(1) || "N/A"
  );
</script>

<div class="fixed top-16 right-5 bg-black/40 text-xs font-mono text-neutral-500/80 p-2 rounded">
  <div class="grid grid-cols-2 gap-x-1">
    <div class="text-right">LAT:</div>
    <div>{formattedLat}°N</div>
    
    <div class="text-right">LON:</div>
    <div>{formattedLon}°E</div>
    
    <div class="text-right">ALT:</div>
    <div>{formattedAlt} km</div>
    
    <div class="text-right">WIND:</div>
    <div>{formattedWind} m/s</div>
  </div>
</div>