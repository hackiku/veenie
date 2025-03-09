<!-- src/lib/sims/flight/ui/FlightDashboard.svelte -->

<script>
  import { flightStore } from '$lib/stores/flightStore';
  
  import { timeStore } from '$lib/stores/timeStore';
  
  // Use reactive values with proper store subscription
  let flightState;
  let timeState;
  
  // Subscribe to stores
  flightStore.subscribe(state => flightState = state);
  timeStore.subscribe(state => timeState = state);
  
  // Derived values
  $: altitude = flightState ? Math.round(flightState.altitude * 10) / 10 : 0;
  $: temperature = flightState ? Math.round(flightState.temperature) : 0;
  $: pressure = flightState ? flightState.pressure.toFixed(2) : '0.00';
  
  // Velocity and speed
  $: velocity = flightState ? flightState.velocity : { x: 0, y: 0, z: 0 };
  $: speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2).toFixed(1);
  
  // Buoyancy
  $: buoyancyForce = flightState ? flightState.controls.buoyancyForce.toFixed(1) : '0.0';
  
  // Elapsed time
  $: elapsedTime = timeState ? timeState.elapsedTime.toFixed(1) : '0.0';
</script>

<div class="fixed bottom-4 left-4 bg-black/20 text-white p-4 rounded-lg shadow-lg z-20">
  
  <div class="grid grid-cols-1 gap-1 w-44 text-sm">
    <div class="flex justify-between">
      <span>Altitude:</span>
      <span class="font-bold">{altitude} km</span>
    </div>
    
    <div class="flex justify-between">
      <span>Temperature:</span>
      <span class="font-bold">{temperature} K</span>
    </div>
    
    <div class="flex justify-between">
      <span>Pressure:</span>
      <span class="font-bold">{pressure} bar</span>
    </div>
    
    <div class="flex justify-between">
      <span>Speed:</span>
      <span class="font-bold">{speed} m/s</span>
    </div>
    
    <div class="flex justify-between">
      <span>Buoyancy:</span>
      <span class="font-bold">{buoyancyForce}</span>
    </div>
    
    <div class="flex justify-between">
      <span>Time:</span>
      <span class="font-bold">{elapsedTime} s</span>
    </div>
  </div>
  

</div>