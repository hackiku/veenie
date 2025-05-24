<!-- src/lib/sims/balloon/ui/Instruments.svelte -->
<script lang="ts">
  import Altimeter from './instruments/Altimeter.svelte';
  import Compass from './instruments/Compass.svelte';
  import Thermometer from './instruments/Thermometer.svelte';

  // Enhanced props with balloon heading
  let {
    telemetry = { 
      altitude: 0, 
      balloonSize: 0, 
      airDensity: 0, 
      buoyancy: 0,
      globalPosition: { latitude: 0, longitude: 0 },
      temperature: 27,
      yawRate: 0,
      controlIntensity: { movement: 0, rotation: 0, balloon: 0 }
    },
    cameraHeading = 0,
    balloonHeading = 0,  // NEW: Balloon's yaw orientation
    layout = 'default'   // 'default', 'compact', 'vertical'
  } = $props();
  
  // Layout configurations
  const layouts = {
    default: {
      altimeter: { position: "bottom-right", visible: true },
      thermometer: { position: "bottom-right-offset", visible: true },
      compass: { position: "bottom-left", visible: true }
    },
    compact: {
      altimeter: { position: "top-right", visible: true },
      thermometer: { position: "top-right-offset", visible: true },
      compass: { position: "top-left", visible: true }
    },
    vertical: {
      altimeter: { position: "bottom-right", visible: true },
      thermometer: { position: "bottom-right", visible: true },
      compass: { position: "bottom-right", visible: true }
    }
  };
  
  const currentLayout = $derived(layouts[layout] || layouts.default);
  
  // Toggle visibility
  let showInstruments = $state(true);
  
  // Handle keyboard shortcuts for instrument visibility
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && !e.ctrlKey && !e.altKey) {
        // 'H' to hide/show instruments
        showInstruments = !showInstruments;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

{#if showInstruments}
  <!-- Altimeter -->
  {#if currentLayout.altimeter.visible}
    <Altimeter 
      {telemetry}
      position={currentLayout.altimeter.position}
      min={0}
      max={200}
      label="Altitude"
    />
  {/if}
  
  <!-- Thermometer -->
  {#if currentLayout.thermometer.visible}
    <Thermometer 
      {telemetry}
      position={currentLayout.thermometer.position}
      min={-80}
      max={200}
      label="Temp"
    />
  {/if}
  
  <!-- Enhanced Compass with both camera and balloon heading -->
  {#if currentLayout.compass.visible}
    <Compass 
      {telemetry}
      {cameraHeading}
      {balloonHeading}
      position={currentLayout.compass.position}
    />
  {/if}
  
  <!-- Enhanced instrument toggle hint -->
  <div class="fixed bottom-2 right-2 text-white/40 text-xs font-mono pointer-events-none">
    Press 'H' to {showInstruments ? 'hide' : 'show'} instruments
    {#if telemetry.controlIntensity?.rotation > 0}
      <span class="text-yellow-400"> • Yaw: {(telemetry.controlIntensity.rotation * 100).toFixed(0)}%</span>
    {/if}
  </div>
{:else}
  <!-- Show minimal hint when hidden -->
  <div class="fixed bottom-2 right-2 text-white/60 text-xs font-mono bg-black/40 px-2 py-1 rounded">
    Press 'H' to show instruments
    {#if telemetry.yawRate && Math.abs(telemetry.yawRate) > 0.01}
      <br><span class="text-yellow-400">Rotating: {(telemetry.yawRate * 180 / Math.PI).toFixed(1)}°/s</span>
    {/if}
  </div>
{/if}