<!-- src/lib/sims/flight/ui/instruments/altimeter/LayerIndicator.svelte -->

<script>
  import { ALTITUDE } from '$lib/data/flight/constants';
  
  // Props
  const { altitude = 0 } = $props();
  
  // Get layer name based on altitude
  function getLayerName(altitude) {
    if (altitude < 0) return "Below Surface";
    if (altitude < 10) return "Lower Atmosphere";
    if (altitude < ALTITUDE.LOWER_HAZE) return "Near Surface";
    if (altitude < 30) return "Lower Haze";
    if (altitude < ALTITUDE.LOWER_CLOUD) return "Approaching Clouds";
    if (altitude < ALTITUDE.CLOUD_LAYER) return "Lower Cloud";
    if (altitude < ALTITUDE.UPPER_CLOUD) return "Main Cloud";
    if (altitude < ALTITUDE.UPPER_HAZE) return "Upper Cloud";
    if (altitude < ALTITUDE.TOP_OF_ATMOSPHERE) return "Upper Haze";
    return "Outer Atmosphere";
  }
  
  // Calculate altitude safety status
  function getAltitudeSafetyStatus(altitude) {
    if (altitude < 30 || altitude > 70) return 'danger';
    if (altitude < 45 || altitude > 65) return 'caution'; 
    return 'safe';
  }
  
  // Safety colors
  function getSafetyColor(status) {
    switch(status) {
      case 'danger': return 'text-red-400';
      case 'caution': return 'text-amber-400';
      case 'safe': return 'text-green-400';
      default: return 'text-white';
    }
  }
  
  // Computed values
  const layerName = $derived(getLayerName(altitude));
  const safetyStatus = $derived(getAltitudeSafetyStatus(altitude)); 
  const statusColor = $derived(getSafetyColor(safetyStatus));
</script>

<div class="bg-black/40 px-2 py-0.5 rounded-sm">
  <span class="text-[10px] font-mono {statusColor}">
    {layerName}
  </span>
</div>