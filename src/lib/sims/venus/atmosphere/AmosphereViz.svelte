<!-- src/lib/sims/venus/atmosphere/AtmosphereViz.svelte -->
<script lang="ts">
  import { temperaturePressureProfile, windProfile } from '../data/atmosphere';
  
  // Props
  let { 
    height = 300,
    width = 600,
    showTemperature = true,
    showPressure = true,
    showWind = true,
    showLayers = true
  } = $props<{
    height?: number;
    width?: number;
    showTemperature?: boolean;
    showPressure?: boolean;
    showWind?: boolean;
    showLayers?: boolean;
  }>();
  
  // State
  let selectedAltitude = $state(50); // km
  
  // Layer colors
  const layerColors = {
    surface: '#FFDB99',
    lowerHaze: '#E6C98C',
    middleClouds: '#D9D9D9',
    upperClouds: '#BFBFBF',
    upperHaze: '#9FAFCF'
  };
  
  // Scale values to fit in the chart
  function scaleTemp(temp: number): number {
    // Scale temperature from 150K-750K to 0-height
    return height - ((temp - 150) / 600) * height;
  }
  
  function scaleAlt(alt: number): number {
    // Scale altitude from 0-100km to 0-height
    return height - (alt / 100) * height;
  }
  
  function scalePressure(pressure: number): number {
    // Scale log pressure from 0.00001-100 to 0-height
    const logP = Math.log10(Math.max(0.00001, pressure));
    const maxLog = 2; // log10(100)
    const minLog = -5; // log10(0.00001)
    return height - ((logP - minLog) / (maxLog - minLog)) * height;
  }
  
  function scaleWind(speed: number): number {
    // Scale wind speed from 0-120 m/s to 0-width/2
    return (speed / 120) * (width / 2);
  }
  
  // Helper function to create SVG path from data points
  function createPath(data: [number, number][]): string {
    return data.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`
    ).join(' ');
  }
  
  // Create data points for each chart
  $effect(() => {
    // Temperature profile data points [x, y]
    const tempData = temperaturePressureProfile.altitudes.map((alt, i) => [
      100 + (width - 200) * (temperaturePressureProfile.temperatures[i] - 150) / 600,
      scaleAlt(alt)
    ]);
    
    // Pressure profile data points [x, y]
    const pressureData = temperaturePressureProfile.altitudes.map((alt, i) => [
      100 + (width - 200) * (Math.log10(temperaturePressureProfile.pressures[i]) + 5) / 7,
      scaleAlt(alt)
    ]);
    
    // Wind profile data points [x, y]
    const windData = windProfile.altitudes.map((alt, i) => [
      width - 100 - scaleWind(windProfile.speeds[i]),
      scaleAlt(alt)
    ]);
    
    return { tempData, pressureData, windData };
  });
</script>

<div class="w-full">
  <svg {width} {height} viewBox="0 0 {width} {height}" class="bg-gray-900 rounded-lg">
    <!-- Background gradient -->
    <defs>
      <linearGradient id="atmosphereGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color={layerColors.surface} stop-opacity="0.7" />
        <stop offset="30%" stop-color={layerColors.lowerHaze} stop-opacity="0.6" />
        <stop offset="50%" stop-color={layerColors.middleClouds} stop-opacity="0.5" />
        <stop offset="65%" stop-color={layerColors.upperClouds} stop-opacity="0.4" />
        <stop offset="90%" stop-color={layerColors.upperHaze} stop-opacity="0.3" />
        <stop offset="100%" stop-color="#000020" stop-opacity="0.2" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect x="50" y="0" width={width - 100} height={height} fill="url(#atmosphereGradient)" />
    
    <!-- Altitude grid lines -->
    {#each [0, 20, 40, 60, 80, 100] as alt}
      <line 
        x1="50" 
        y1={scaleAlt(alt)} 
        x2={width - 50} 
        y2={scaleAlt(alt)} 
        stroke="#ffffff33" 
        stroke-width="1" 
        stroke-dasharray="5,5" 
      />
      <text 
        x="40" 
        y={scaleAlt(alt) + 4} 
        text-anchor="end" 
        fill="white" 
        font-size="12"
      >
        {alt}
      </text>
    {/each}
    
    <!-- Left Y-axis (Altitude) -->
    <line x1="50" y1="0" x2="50" y2={height} stroke="white" stroke-width="1" />
    <text 
      x="15" 
      y={height / 2} 
      text-anchor="middle" 
      fill="white" 
      font-size="14"
      transform="rotate(-90, 15, {height / 2})"
    >
      Altitude (km)
    </text>
    
    <!-- Layer markers -->
    {#if showLayers}
      <!-- Cloud and haze layers -->
      <g opacity="0.7">
        <!-- Surface -->
        <line 
          x1="100" 
          y1={scaleAlt(0)} 
          x2={width - 100} 
          y2={scaleAlt(0)} 
          stroke={layerColors.surface} 
          stroke-width="2" 
        />
        <text 
          x={width - 90} 
          y={scaleAlt(0) + 4} 
          fill={layerColors.surface} 
          font-size="12"
        >
          Surface
        </text>
        
        <!-- Lower Haze -->
        <line 
          x1="100" 
          y1={scaleAlt(30)} 
          x2={width - 100} 
          y2={scaleAlt(30)} 
          stroke={layerColors.lowerHaze} 
          stroke-width="2" 
        />
        <text 
          x={width - 90} 
          y={scaleAlt(30) + 4} 
          fill={layerColors.lowerHaze} 
          font-size="12"
        >
          Lower Haze
        </text>
        
        <!-- Middle Clouds -->
        <line 
          x1="100" 
          y1={scaleAlt(50)} 
          x2={width - 100} 
          y2={scaleAlt(50)} 
          stroke={layerColors.middleClouds} 
          stroke-width="2" 
        />
        <text 
          x={width - 90} 
          y={scaleAlt(50) + 4} 
          fill={layerColors.middleClouds} 
          font-size="12"
        >
          Middle Clouds
        </text>
        
        <!-- Upper Clouds -->
        <line 
          x1="100" 
          y1={scaleAlt(65)} 
          x2={width - 100} 
          y2={scaleAlt(65)} 
          stroke={layerColors.upperClouds} 
          stroke-width="2" 
        />
        <text 
          x={width - 90} 
          y={scaleAlt(65) + 4} 
          fill={layerColors.upperClouds} 
          font-size="12"
        >
          Upper Clouds
        </text>
        
        <!-- Upper Haze -->
        <line 
          x1="100" 
          y1={scaleAlt(90)} 
          x2={width - 100} 
          y2={scaleAlt(90)} 
          stroke={layerColors.upperHaze} 
          stroke-width="2" 
        />
        <text 
          x={width - 90} 
          y={scaleAlt(90) + 4} 
          fill={layerColors.upperHaze} 
          font-size="12"
        >
          Upper Haze
        </text>
      </g>
    {/if}
    
    <!-- Temperature profile -->
    {#if showTemperature}
      <path 
        d={createPath(temperaturePressureProfile.altitudes.map((alt, i) => [
          100 + (width - 200) * (temperaturePressureProfile.temperatures[i] - 150) / 600,
          scaleAlt(alt)
        ]))}
        stroke="#FF5533" 
        stroke-width="3" 
        fill="none" 
      />
      
      <!-- Temperature X-axis -->
      <line 
        x1="100" 
        y1={height - 1} 
        x2={width - 100} 
        y2={height - 1} 
        stroke="#FF5533" 
        stroke-width="1" 
      />
      
      <!-- Temperature labels -->
      {#each [200, 300, 400, 500, 600, 700] as temp}
        <text 
          x={100 + (width - 200) * (temp - 150) / 600} 
          y={height - 5} 
          text-anchor="middle" 
          fill="#FF5533" 
          font-size="10"
        >
          {temp}K
        </text>
      {/each}
    {/if}
    
    <!-- Wind profile -->
    {#if showWind}
      <path 
        d={createPath(windProfile.altitudes.map((alt, i) => [
          width - 100 - scaleWind(windProfile.speeds[i]),
          scaleAlt(alt)
        ]))}
        stroke="#66CCFF" 
        stroke-width="3" 
        fill="none" 
      />
      
      <!-- Wind speed markers -->
      {#each [0, 40, 80, 120] as speed}
        <text 
          x={width - 100 - scaleWind(speed)} 
          y="20" 
          text-anchor="middle" 
          fill="#66CCFF" 
          font-size="10"
        >
          {speed}m/s
        </text>
      {/each}
    {/if}
    
    <!-- Selected altitude marker -->
    <line 
      x1="50" 
      y1={scaleAlt(selectedAltitude)} 
      x2={width - 50} 
      y2={scaleAlt(selectedAltitude)} 
      stroke="yellow" 
      stroke-width="1" 
      stroke-dasharray="2,2" 
    />
    <circle 
      cx="50" 
      cy={scaleAlt(selectedAltitude)} 
      r="4" 
      fill="yellow" 
    />
  </svg>
  
  <!-- Altitude selector -->
  <div class="mt-2 px-4">
    <label class="block text-sm text-white mb-1">
      Altitude: {selectedAltitude} km
    </label>
    <input 
      type="range" 
      min="0" 
      max="100" 
      step="1" 
      bind:value={selectedAltitude}
      class="w-full"
    />
  </div>
</div>