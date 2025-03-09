<!-- src/lib/sims/flight/ui/instruments/altimeter/VerticalSpeed.svelte -->

<script>
  import { ArrowUp, ArrowDown, MoveVertical } from 'lucide-svelte';
  
  // Props
  const { 
    speed = 0, 
    showMetric = true,
    mPerSecToFtPerMin = (mps) => mps * 196.85,
    threshold = 1 // Threshold before showing up/down indication
  } = $props();
  
  // Format speed value for display
  function formatSpeed(speed) {
    if (showMetric) {
      return speed.toFixed(1);
    } else {
      return Math.round(mPerSecToFtPerMin(speed)).toLocaleString();
    }
  }
  
  // Determine movement trend and color
  function getTrend(speed) {
    if (speed > threshold) return 'up';
    if (speed < -threshold) return 'down';
    return 'level';
  }
  
  function getTrendIcon(trend) {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return MoveVertical;
    }
  }
  
  function getTrendColor(trend) {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  }
  
  // Computed values
  const trend = $derived(getTrend(speed));
  const trendColor = $derived(getTrendColor(trend));
  const displaySpeed = $derived(formatSpeed(Math.abs(speed)));
  const icon = $derived(getTrendIcon(trend));
</script>

<div class="bg-black/40 px-2 py-1 rounded flex items-center gap-1">
  <svelte:component this={icon} size={12} class={trendColor} />
  
  <span class="font-mono text-xs {trendColor}">
    {displaySpeed} {showMetric ? 'm/s' : 'ft/min'}
  </span>
</div>