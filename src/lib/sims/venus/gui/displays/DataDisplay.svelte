<!-- src/lib/sims/venus/content/DataDisplay.svelte -->
<script lang="ts">
  import { venusComposition, temperaturePressureProfile, windProfile } from '../data/atmosphere';
  
  // Props using runes
  let {
    selectedAltitude = 0
  } = $props<{
    selectedAltitude?: number;
  }>();
  
  // Calculate values at current altitude
  function getTemperatureAt(altitude: number): number {
    // Find closest altitude in the profile
    const index = temperaturePressureProfile.altitudes.findIndex(a => a >= altitude);
    if (index === -1) return temperaturePressureProfile.temperatures[temperaturePressureProfile.temperatures.length - 1];
    if (index === 0) return temperaturePressureProfile.temperatures[0];
    
    // Linear interpolation
    const lowerAlt = temperaturePressureProfile.altitudes[index - 1];
    const upperAlt = temperaturePressureProfile.altitudes[index];
    const lowerTemp = temperaturePressureProfile.temperatures[index - 1];
    const upperTemp = temperaturePressureProfile.temperatures[index];
    
    const ratio = (altitude - lowerAlt) / (upperAlt - lowerAlt);
    return lowerTemp + ratio * (upperTemp - lowerTemp);
  }
  
  function getPressureAt(altitude: number): number {
    // Find closest altitude in the profile
    const index = temperaturePressureProfile.altitudes.findIndex(a => a >= altitude);
    if (index === -1) return temperaturePressureProfile.pressures[temperaturePressureProfile.pressures.length - 1];
    if (index === 0) return temperaturePressureProfile.pressures[0];
    
    // Linear interpolation
    const lowerAlt = temperaturePressureProfile.altitudes[index - 1];
    const upperAlt = temperaturePressureProfile.altitudes[index];
    const lowerPressure = temperaturePressureProfile.pressures[index - 1];
    const upperPressure = temperaturePressureProfile.pressures[index];
    
    const ratio = (altitude - lowerAlt) / (upperAlt - lowerAlt);
    return lowerPressure + ratio * (upperPressure - lowerPressure);
  }
  
  function getWindSpeedAt(altitude: number): number {
    // Find closest altitude in the profile
    const index = windProfile.altitudes.findIndex(a => a >= altitude);
    if (index === -1) return windProfile.speeds[windProfile.speeds.length - 1];
    if (index === 0) return windProfile.speeds[0];
    
    // Linear interpolation
    const lowerAlt = windProfile.altitudes[index - 1];
    const upperAlt = windProfile.altitudes[index];
    const lowerSpeed = windProfile.speeds[index - 1];
    const upperSpeed = windProfile.speeds[index];
    
    const ratio = (altitude - lowerAlt) / (upperAlt - lowerAlt);
    return lowerSpeed + ratio * (upperSpeed - lowerSpeed);
  }
  
  // The current values based on the selected altitude
  $effect(() => {
    const temperature = getTemperatureAt(selectedAltitude);
    const pressure = getPressureAt(selectedAltitude);
    const windSpeed = getWindSpeedAt(selectedAltitude);
    
    // Export these values if needed
    return {
      temperature,
      pressure,
      windSpeed
    };
  });
</script>

<div class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white">
  <h2 class="text-xl font-bold mb-3">Venus Data</h2>
  
  
  <!-- Data at current altitude -->
  <div class="grid grid-cols-3 gap-2 mb-4 text-center">
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Temperature</div>
      <div class="font-bold">{getTemperatureAt(selectedAltitude).toFixed(1)} K</div>
      <div class="text-xs">{(getTemperatureAt(selectedAltitude) - 273.15).toFixed(1)} °C</div>
    </div>
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Pressure</div>
      <div class="font-bold">{getPressureAt(selectedAltitude).toFixed(3)} bar</div>
      <div class="text-xs">{(getPressureAt(selectedAltitude) * 1000).toFixed(0)} kPa</div>
    </div>
    <div class="p-2 bg-gray-800 rounded">
      <div class="text-xs text-gray-400">Wind Speed</div>
      <div class="font-bold">{getWindSpeedAt(selectedAltitude).toFixed(1)} m/s</div>
      <div class="text-xs">{(getWindSpeedAt(selectedAltitude) * 3.6).toFixed(1)} km/h</div>
    </div>
  </div>
  
  <!-- Atmospheric composition table -->
  <div class="mb-4">
    <h3 class="text-sm font-bold mb-2">Atmospheric Composition</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="text-left py-1">Component</th>
            <th class="text-right py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-800">
            <td class="py-1">Carbon Dioxide</td>
            <td class="text-right">{venusComposition.carbonDioxide}%</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="py-1">Nitrogen</td>
            <td class="text-right">{venusComposition.nitrogen}%</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="py-1">Sulfur Dioxide</td>
            <td class="text-right">{venusComposition.sulfurDioxide} ppm</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="py-1">Argon</td>
            <td class="text-right">{venusComposition.argon} ppm</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="py-1">Water Vapor</td>
            <td class="text-right">{venusComposition.waterVapor} ppm</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Venus General Data -->
  <div class="mb-4">
    <h3 class="text-sm font-bold mb-2">Planet Data</h3>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Radius:</span> 6,051.8 km
      </div>
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Mass:</span> 4.87 × 10<sup>24</sup> kg
      </div>
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Gravity:</span> 8.87 m/s<sup>2</sup>
      </div>
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Day Length:</span> 243 Earth days
      </div>
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Year Length:</span> 225 Earth days
      </div>
      <div class="bg-gray-800/50 p-2 rounded">
        <span class="text-gray-400">Distance from Sun:</span> 108M km
      </div>
    </div>
  </div>
  
  <!-- Interesting Facts -->
  <div>
    <h3 class="text-sm font-bold mb-2">Venus Facts</h3>
    <ul class="text-sm list-disc pl-5 space-y-1">
      <li>Venus has the most circular orbit of any planet</li>
      <li>Surface is hot enough to melt lead (462°C)</li>
      <li>Atmospheric pressure is 92 times Earth's</li>
      <li>Rotates backwards compared to other planets</li>
      <li>Has the longest day of any planet (243 Earth days)</li>
    </ul>
  </div>
</div>