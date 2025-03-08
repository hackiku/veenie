<!-- src/lib/sims/venus/content/ChartDisplay.svelte -->
<script lang="ts">
  import { temperaturePressureProfile, windProfile } from '../data/atmosphere';
  
  // Props using runes
  let { 
    width = 600,
    height = 300,
    selectedAltitude = 50
  } = $props<{
    width?: number;
    height?: number;
    selectedAltitude?: number;
  }>();
  
  // Colors
  const colors = {
    background: '#111',
    grid: '#333',
    temperature: '#FF5533',
    pressure: '#3399FF',
    wind: '#66CCFF',
    marker: '#FFCC00'
  };
  
  // Scale functions
  function scaleY(altitude: number): number {
    return height - (altitude / 100) * height;
  }
  
  function scaleTemperature(temp: number): number {
    const minTemp = 150; // K
    const maxTemp = 750; // K
    return 50 + ((temp - minTemp) / (maxTemp - minTemp)) * (width / 2 - 100);
  }
  
  function scalePressure(pressure: number): number {
    // Use log scale for pressure
    const logP = Math.log10(Math.max(0.00001, pressure));
    const minLogP = -5; // 10^-5 bar
    const maxLogP = 2;  // 10^2 bar
    return 50 + ((logP - minLogP) / (maxLogP - minLogP)) * (width / 2 - 100);
  }
  
  function scaleWind(speed: number): number {
    const maxSpeed = 120; // m/s
    return width - 50 - (speed / maxSpeed) * (width / 2 - 100);
  }
  
  // Generate path data
  function temperaturePath(): string {
    return temperaturePressureProfile.altitudes.map((alt, i) => {
      const x = scaleTemperature(temperaturePressureProfile.temperatures[i]);
      const y = scaleY(alt);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }
  
  function pressurePath(): string {
    return temperaturePressureProfile.altitudes.map((alt, i) => {
      const x = scalePressure(temperaturePressureProfile.pressures[i]);
      const y = scaleY(alt);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }
  
  function windPath(): string {
    return windProfile.altitudes.map((alt, i) => {
      const x = scaleWind(windProfile.speeds[i]);
      const y = scaleY(alt);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }
</script>

<div class="bg-black/80 p-4 rounded-md border border-orange-900/50 text-white">
  <h2 class="text-xl font-bold mb-3">Venus Atmosphere Profile</h2>
  
  <!-- Altitude selector -->
  <div class="mb-3">
    <label class="block text-sm font-medium mb-1">
      Altitude: {selectedAltitude.toFixed(1)} km
    </label>
    <input 
      type="range" 
      min="0" 
      max="100" 
      step="1" 
      value={selectedAltitude}
      oninput={(e) => selectedAltitude = parseFloat(e.currentTarget.value)}
      class="w-full"
    />
  </div>
  
  <!-- Chart -->
  <div class="relative">
    <svg {width} {height} viewBox="0 0 {width} {height}" class="bg-gray-900 rounded-lg">
      <!-- Background -->
      <rect x="0" y="0" {width} {height} fill={colors.background} />
      
      <!-- Grid lines -->
      {#each [0, 20, 40, 60, 80, 100] as altitude}
        <line 
          x1="0" 
          y1={scaleY(altitude)} 
          x2={width} 
          y2={scaleY(altitude)} 
          stroke={colors.grid} 
          stroke-width="1" 
          stroke-dasharray="4,4"
        />
        <text 
          x="10" 
          y={scaleY(altitude) + 4} 
          fill="white" 
          font-size="10"
        >
          {altitude} km
        </text>
      {/each}
      
      <!-- Temperature curve -->
      <path 
        d={temperaturePath()} 
        stroke={colors.temperature} 
        stroke-width="2" 
        fill="none"
      />
      <text 
        x="50" 
        y="15" 
        fill={colors.temperature} 
        font-size="10"
      >
        Temperature (K)
      </text>
      {#each [200, 400, 600] as temp}
        <text 
          x={scaleTemperature(temp)} 
          y="15" 
          fill={colors.temperature} 
          font-size="10" 
          text-anchor="middle"
        >
          {temp}
        </text>
      {/each}
      
      <!-- Pressure curve -->
      <path 
        d={pressurePath()} 
        stroke={colors.pressure} 
        stroke-width="2" 
        fill="none" 
        stroke-dasharray="5,3"
      />
      <text 
        x="150" 
        y="15" 
        fill={colors.pressure} 
        font-size="10"
      >
        Pressure (bar)
      </text>
      {#each [0.001, 0.1, 10] as pressure}
        <text 
          x={scalePressure(pressure)} 
          y="25" 
          fill={colors.pressure} 
          font-size="10" 
          text-anchor="middle"
        >
          {pressure < 1 ? pressure.toExponential(0) : pressure}
        </text>
      {/each}
      
      <!-- Wind speed curve -->
      <path 
        d={windPath()} 
        stroke={colors.wind} 
        stroke-width="2" 
        fill="none" 
        stroke-dasharray="3,2"
      />
      <text 
        x={width - 70} 
        y="15" 
        fill={colors.wind} 
        font-size="10"
      >
        Wind (m/s)
      </text>
      {#each [30, 60, 90] as speed}
        <text 
          x={scaleWind(speed)} 
          y="15" 
          fill={colors.wind} 
          font-size="10" 
          text-anchor="middle"
        >
          {speed}
        </text>
      {/each}
      
      <!-- Selected altitude marker -->
      <line 
        x1="0" 
        y1={scaleY(selectedAltitude)} 
        x2={width} 
        y2={scaleY(selectedAltitude)} 
        stroke={colors.marker} 
        stroke-width="1" 
        stroke-dasharray="2,2"
      />
      <circle 
        cx="10" 
        cy={scaleY(selectedAltitude)} 
        r="4" 
        fill={colors.marker}
      />
    </svg>
    
    <!-- Caption -->
    <div class="text-xs text-gray-400 mt-2">
      This chart shows how temperature (red), pressure (blue), and wind speed (cyan) 
      vary with altitude in Venus's atmosphere. The horizontal yellow line represents 
      your selected altitude of {selectedAltitude} km.
    </div>
  </div>
  
  <!-- Venus atmosphere layers -->
  <div class="mt-4">
    <h3 class="text-sm font-bold mb-2">Atmosphere Layers</h3>
    <div class="flex flex-col space-y-1 text-sm">
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full bg-amber-200 mr-2"></div>
        <span class="font-bold">0-30 km:</span>
        <span class="ml-2">Lower atmosphere, extremely hot and dense</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full bg-amber-100 mr-2"></div>
        <span class="font-bold">30-50 km:</span>
        <span class="ml-2">Lower haze layer, sulfuric acid</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
        <span class="font-bold">50-70 km:</span>
        <span class="ml-2">Cloud deck, high winds (super-rotation)</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full bg-blue-200 mr-2"></div>
        <span class="font-bold">70-100 km:</span>
        <span class="ml-2">Upper haze, mesosphere</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full bg-blue-900 mr-2"></div>
        <span class="font-bold">Above 100 km:</span>
        <span class="ml-2">Thermosphere, extremely low pressure</span>
      </div>
    </div>
  </div>
</div>