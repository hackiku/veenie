<!-- src/lib/sims/material/ui/Altimeter.svelte -->
<script>
  import { getSimulationContext } from '../state/simulationContext.svelte';
  
  // Get the simulation context
  const sim = getSimulationContext();
  
  // Props with defaults
  const { 
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
  
  // Calculate values that depend on simulation data
  function getDisplayValues() {
    const currentHeight = sim ? sim.getPosition()[1] : 0;
    const boundedValue = Math.max(min, Math.min(max, currentHeight));
    const percentage = ((boundedValue - min) / (max - min)) * 100;
    
    return {
      height: currentHeight.toFixed(1),
      percentage
    };
  }
</script>

<div class="{positionClasses[position]} z-30">
  <!-- Main container -->
  <div class="bg-black/30 text-white rounded flex items-start p-2 backdrop-blur-sm" style="width: 60px; height: 240px;">
    <!-- Label at the top -->
    <div class="absolute top-1 inset-x-0 text-center text-xs font-medium">
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
        <div class="absolute right-4 text-[10px] font-mono">{min + (max-min)*0.2}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 40%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{min + (max-min)*0.4}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 60%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{min + (max-min)*0.6}</div>
      </div>
      <div class="absolute w-4 flex items-center justify-end" style="bottom: 80%; left: 50%; transform: translateX(-100%);">
        <div class="h-px w-3 bg-white"></div>
        <div class="absolute right-4 text-[10px] font-mono">{min + (max-min)*0.8}</div>
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
      {#if sim}
        {@const values = getDisplayValues()}
        <div 
          class="absolute left-1/2 flex items-center z-10" 
          style="bottom: {values.percentage}%; transform: translate(-50%, 50%);"
        >
          <!-- Triangle pointer -->
          <div class="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-l-0 border-transparent border-r-white"></div>
          
          <!-- Value box -->
          <div class="bg-white text-black px-2 py-0.5 text-sm font-mono font-bold rounded-sm ml-1">
            {values.height}
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Unit at the bottom -->
    <div class="absolute bottom-1 inset-x-0 text-center text-xs opacity-80">
      {unit}
    </div>
  </div>
</div>