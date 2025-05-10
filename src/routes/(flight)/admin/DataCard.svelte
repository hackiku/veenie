<!-- src/routes/(flight)/admin/DataCard.svelte -->

<script lang="ts">
  // DataCard component displays a labeled data point with a stylized value
  
  // Props
  const { 
    label = "",    // Label text to display
    value = 0,     // Value to display
    prefix = "",   // Optional prefix before the value
    suffix = "",   // Optional suffix after the value
    color = ""     // Optional color override
  } = $props();
  
  // Derive the color class based on the type of data or override
  let colorClass = $derived(() => {
    if (color) return color;
    
    if (label.includes("Planet")) return "text-blue-300";
    if (label.includes("Atmosphere")) return "text-teal-300";
    if (label.includes("Vehicle")) return "text-purple-300";
    if (label.includes("Material")) return "text-amber-300";
    if (label.includes("Session")) return "text-green-300";
    if (label.includes("Telemetry")) return "text-red-300";
    
    return "text-white";
  });
  
  // Format large numbers with commas
  function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<div class="bg-black/50 rounded-md border border-white/10 p-3 hover:border-white/20 transition-colors">
  <div class="text-xs text-white/50 mb-1">{label}</div>
  <div class="font-mono text-xl font-bold {colorClass}">
    {prefix}{formatNumber(value)}{suffix}
  </div>
</div>