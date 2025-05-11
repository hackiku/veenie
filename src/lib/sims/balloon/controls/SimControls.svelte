<script lang="ts">
  // Correct Svelte 5 props syntax
  let {
    running = true,
    stepCount = 0,
    telemetry = { altitude: 0, balloonSize: 0, airDensity: 0, buoyancy: 0 },
    toggleSimulation = () => {},
    doSingleStep = () => {},
    restartSimulation = () => {}
  } = $props();
</script>

<div class="bg-black/70 text-white p-4 rounded-lg font-mono min-w-60">
  <div class="flex gap-2 mb-3">
    <button 
      class="bg-gray-800 text-white border-none px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
      onclick={() => toggleSimulation()}
    >
      {running ? 'Pause' : 'Play'}
    </button>
    <button 
      class="bg-gray-800 text-white border-none px-4 py-2 rounded cursor-pointer hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onclick={() => doSingleStep()}
      disabled={running}
    >
      Step
    </button>
    <button 
      class="bg-gray-800 text-white border-none px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
      onclick={() => restartSimulation()}
    >
      Restart
    </button>
  </div>
  
  <div class="grid gap-2 mb-3 pb-3 border-b border-gray-600">
    <div>Step: {stepCount}</div>
    <div>Altitude: {telemetry.altitude.toFixed(2)}m</div>
    <div>Balloon Size: {telemetry.balloonSize.toFixed(2)}m</div>
    <div>Air Density: {telemetry.airDensity.toFixed(2)}kg/m³</div>
    <div>Buoyancy: {telemetry.buoyancy.toFixed(2)}N</div>
  </div>
  
  <div class="text-sm opacity-80">
    <div>WASD: Move balloon</div>
    <div>Space: Inflate balloon</div>
    <div>Shift: Deflate balloon</div>
  </div>
</div>