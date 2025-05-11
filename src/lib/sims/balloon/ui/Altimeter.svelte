<!-- src/lib/sims/balloon/ui/Altimeter.svelte -->

<script>
  // Props with defaults
  let { 
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 },
    position = "bottom-right",
    min = 0,
    max = 100,
    label = "Altitude",
    unit = "m"
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4"
  };
  
  // Calculate altitude percentage for display
  $effect(() => {
    // Cap altitude within min-max range
    const cappedAltitude = Math.max(min, Math.min(max, telemetry.altitude));
    // Calculate percentage position on scale
    displayPercentage = ((cappedAltitude - min) / (max - min)) * 100;
  });
  
  // State
  let displayPercentage = $state(0);
  
  // Format number with 1 decimal place
  function formatNumber(value) {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return '0.0';
  }
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container -->
  <div class="bg-black/40 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 60px; height: 240px;">
    <!-- Label at the top -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-semibold">
      {label}
    </div>
    
    <!-- Vertical scale with white lines -->
    <div class="relative w-full mt-6 mb-2 mx-auto" style="height: calc(100% - 2rem);">
      <!-- Background scale line -->
      <div class="absolute h-full w-px bg-white/40 left-1/2 transform -translate-x-1/2"></div>
      
      <!-- Tick marks (hardcoded for simplicity) -->
      <!-- Major ticks -->
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 0%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{min}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 20%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{formatNumber(min + (max-min)*0.2)}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 40%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{formatNumber(min + (max-min)*0.4)}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 60%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{formatNumber(min + (max-min)*0.6)}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 80%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{formatNumber(min + (max-min)*0.8)}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 100%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{max}</div>
      </div>
      
      <!-- Minor ticks -->
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 10%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-2 bg-white/70"></div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 30%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-2 bg-white/70"></div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 50%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-2 bg-white/70"></div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 70%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-2 bg-white/70"></div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 90%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-2 bg-white/70"></div>
      </div>
      
      <!-- Indicator triangle and value box -->
      <div 
        class="absolute left-1/2 flex items-center z-10 transition-all" 
        style="bottom: {displayPercentage}%; transform: translate(-50%, 50%);"
      >
        <!-- Triangle pointer -->
        <div class="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-l-0 border-transparent border-r-orange-500"></div>
        
        <!-- Value box with balloon color -->
        <div class="bg-orange-500 text-white px-2 py-0.5 text-sm font-mono font-bold rounded-sm ml-1">
          {formatNumber(telemetry.altitude)}
        </div>
      </div>
    </div>
    
    <!-- Unit at the bottom -->
    <div class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80">
      {unit}
    </div>
  </div>
</div>