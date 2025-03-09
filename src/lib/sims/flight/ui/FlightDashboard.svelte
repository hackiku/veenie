<!-- src/lib/sims/flight/ui/FlightDashboard.svelte -->

<script>
  import { flightStore } from '$lib/stores/flightStore';
  import { timeStore } from '$lib/stores/timeStore';
  import { Gauge, ThermometerSnowflake, Droplets, Wind, Clock } from 'lucide-svelte';
  
  // Use $state for local state
  let flightState = $state(null);
  let timeState = $state(null);
  
  // Subscribe to stores using $effect
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    const unsubTimeStore = timeStore.subscribe(state => {
      timeState = state;
    });
    
    return () => {
      unsubFlightStore();
      unsubTimeStore();
    };
  });
  
  // Derived values using $derived
  const altitude = $derived(flightState ? Math.round(flightState.altitude * 10) / 10 : 0);
  const temperature = $derived(flightState ? Math.round(flightState.temperature) : 0);
  const pressure = $derived(flightState ? flightState.pressure.toFixed(2) : '0.00');
  const temperatureC = $derived(temperature - 273.15); // Convert K to C
  
  // Velocity and speed
  const velocity = $derived(flightState?.velocity || { x: 0, y: 0, z: 0 });
  const speed = $derived(Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2).toFixed(1));
  
  // Elapsed time
  const elapsedTime = $derived(timeState?.elapsedTime.toFixed(1) || '0.0');
  
  // Helper functions to classify values
  function getTemperatureClass(tempC) {
    if (tempC > 100) return "text-red-400";
    if (tempC > 50) return "text-amber-400";
    if (tempC > 25) return "text-yellow-400";
    if (tempC < 0) return "text-blue-400";
    return "text-green-400";
  }
  
  function getAltitudeClass(alt) {
    if (alt > 70) return "text-blue-400";
    if (alt > 60) return "text-indigo-400";
    if (alt > 50) return "text-green-400";
    if (alt > 40) return "text-yellow-400";
    if (alt < 30) return "text-red-400";
    return "text-amber-400";
  }
  
  function getPressureClass(pres) {
    if (pres > 80) return "text-red-400";
    if (pres > 40) return "text-amber-400";
    if (pres > 10) return "text-yellow-400";
    if (pres > 1) return "text-green-400";
    return "text-blue-400";
  }
</script>

<div class="fixed bottom-4 left-4 bg-black/40 text-white p-4 rounded-lg shadow-lg z-20 backdrop-blur-sm">
  <h3 class="text-md mb-3 font-semibold flex items-center gap-2">
    <Gauge size={18} />
    <span>Telemetry</span>
  </h3>
  
  <div class="grid grid-cols-1 gap-x-6 gap-y-2 text-xs">
    <div class="flex items-center gap-2">
      <ThermometerSnowflake size={14} class="text-blue-300" />
      <span>Temp:</span>
      <span class="font-bold ml-auto {getTemperatureClass(temperatureC)}">{temperatureC.toFixed(1)} °C</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Droplets size={14} class="text-blue-300" />
      <span>Altitude:</span>
      <span class="font-bold ml-auto {getAltitudeClass(altitude)}">{altitude.toFixed(1)} km</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Gauge size={14} class="text-blue-300" />
      <span>Pressure:</span>
      <span class="font-bold ml-auto {getPressureClass(pressure)}">{pressure} bar</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Wind size={14} class="text-blue-300" />
      <span>Speed:</span>
      <span class="font-bold ml-auto text-purple-300">{speed} m/s</span>
    </div>
    
    <div class="flex items-center gap-2">
      <Clock size={14} class="text-blue-300" />
      <span>Time:</span>
      <span class="font-bold ml-auto text-amber-300">{elapsedTime} s</span>
    </div>
  </div>
  
  <div class="mt-3 text-xs text-gray-400">
    <p>Habitable Zone: 50-60 km altitude</p>
    <p>Earth-like pressure: ~50 km</p>
  </div>
</div>