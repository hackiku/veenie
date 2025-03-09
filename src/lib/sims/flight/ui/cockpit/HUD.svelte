<!-- src/lib/sims/flight/cockpit/HUD.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  
  // Flight data
  const flightData = writable({
    altitude: 50000, // meters
    airspeed: 0, // m/s
    verticalSpeed: 0, // m/s
    pitch: 0, // degrees
    roll: 0, // degrees
    heading: 0, // degrees
    temperature: 75, // degrees C (approx at 50km altitude on Venus)
    pressure: 1000, // hPa (approx 1 Earth atmosphere at 50km on Venus)
  });
  
  // Simulate some initial data
  let prevAltitude = 50000;
  
  // Listen for flight data updates from Player component (would be better with a store)
  // For this PoC we'll just simulate some data
  onMount(() => {
    const interval = setInterval(() => {
      const data = get(flightData);
      
      // Simulate some gentle motion
      const newAltitude = data.altitude + (Math.random() - 0.5) * 10;
      const verticalSpeed = (newAltitude - prevAltitude) / 0.1; // 0.1s update interval
      
      flightData.update(d => ({
        ...d,
        altitude: newAltitude,
        airspeed: 50 + Math.sin(Date.now() / 1000) * 5,
        verticalSpeed: verticalSpeed,
        pitch: Math.sin(Date.now() / 5000) * 5,
        roll: Math.sin(Date.now() / 3000) * 10,
        heading: (d.heading + 0.1) % 360
      }));
      
      prevAltitude = newAltitude;
    }, 100);
    
    return () => clearInterval(interval);
  });
  
  // Format numbers for display
  function formatNumber(num, decimals = 0) {
    return num.toFixed(decimals);
  }
</script>

<div class="text-white font-mono text-shadow hud-container">
  <!-- Main flight data -->
  <div class="absolute top-4 left-4 bg-black/30 p-4 rounded">
    <div class="text-yellow-300 text-lg mb-2">VENUS FLIGHT SIMULATOR</div>
    <div>ALT: {formatNumber($flightData.altitude)} m</div>
    <div>SPD: {formatNumber($flightData.airspeed, 1)} m/s</div>
    <div>V/S: {formatNumber($flightData.verticalSpeed, 1)} m/s</div>
    <div>HDG: {formatNumber($flightData.heading, 0)}°</div>
    <div>PIT: {formatNumber($flightData.pitch, 1)}°</div>
    <div>ROL: {formatNumber($flightData.roll, 1)}°</div>
  </div>
  
  <!-- Environmental data -->
  <div class="absolute top-4 right-4 bg-black/30 p-4 rounded">
    <div class="text-yellow-300 text-lg mb-2">ENVIRONMENT</div>
    <div>TEMP: {formatNumber($flightData.temperature, 1)}°C</div>
    <div>PRES: {formatNumber($flightData.pressure, 0)} hPa</div>
    <div class="text-yellow-300 mt-4">Venus Cloud Layer</div>
    <div>Altitude: ~50km</div>
    <div>Atmosphere: Mostly CO₂</div>
  </div>
  
  <!-- Control reference -->
  <div class="absolute bottom-4 left-4 bg-black/30 p-4 rounded">
    <div class="text-yellow-300 text-lg mb-2">CONTROLS</div>
    <div>Pitch: ↑/↓</div>
    <div>Roll: ←/→</div>
    <div>Yaw: A/D</div>
    <div>Throttle: W/S</div>
    <div>Toggle Debug: F9</div>
  </div>
  
  <!-- Artificial horizon (simplified) -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="h-48 w-48 border-2 border-white rounded-full relative overflow-hidden">
      <div 
        class="absolute w-full" 
        style="
          background: linear-gradient(to bottom, #3498db 0%, #3498db 50%, #e67e22 50%, #e67e22 100%); 
          height: 200%; 
          top: {50 - $flightData.pitch}%;
          transform: rotate({$flightData.roll}deg);
        "
      ></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-32 h-0.5 bg-white"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-4 h-4 border-2 border-white"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .text-shadow {
    text-shadow: 1px 1px 2px black, 0 0 4px black;
  }
  
  .hud-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>