<!-- src/lib/components/OrbitScene.svelte -->
<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import * as THREE from 'three';
  import { onMount } from 'svelte';
  
  import { OrbitalSimulator, bodies, calculateLagrangePoints } from '$lib/orbital';
  import { TimeControl } from '$lib/orbital/gui';
  
  // Create the simulator
  const simulator = new OrbitalSimulator();
  
  // Simulation time state
  let currentDate = new Date();
  let timeScale = 1;
  let paused = false;
  
  // Get Lagrange points
  const lagrangePoints = calculateLagrangePoints('sun', 'venus');
  
  // Calculate orbits
  const venusOrbit = simulator.calculateOrbit('venus');
  const earthOrbit = simulator.calculateOrbit('earth');
  const marsOrbit = simulator.calculateOrbit('mars');
  
  // Animation
  let time = 0;
  useTask((delta) => {
    if (!paused) {
      time += delta * timeScale * 0.2;
      
      // Update real date based on simulation time
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + delta * timeScale);
      currentDate = newDate;
    }
  });
  
  // Positions update
  $: venusPosition = getPositionAtTime('venus', time);
  $: earthPosition = getPositionAtTime('earth', time);
  $: marsPosition = getPositionAtTime('mars', time);
  
  // Handler for time control events
  function handleTimeChange(event) {
    const { time: newTime, scale: newScale } = event.detail;
    
    currentDate = newTime;
    timeScale = newScale;
    paused = newScale === 0;
  }
  
  // Simple circular orbit simulation
  function getPositionAtTime(bodyId: string, t: number): [number, number, number] {
    const body = bodies[bodyId];
    if (!body) return [0, 0, 0];
    
    // Get orbital radius (distance from Sun)
    const r = Math.sqrt(
      body.position[0] * body.position[0] + 
      body.position[1] * body.position[1] + 
      body.position[2] * body.position[2]
    );
    
    // Simple circular orbit calculation
    const angle = t * (bodyId === 'venus' ? 1.8 : bodyId === 'earth' ? 1 : 0.5); // Relative speeds
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    
    return [
      x * 1e-6, // Scale factor
      0,
      z * 1e-6
    ];
  }
</script>

<!-- Scene -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 2, 5]}
  fov={45}
/>

<!-- Controls -->
<OrbitControls enableDamping maxPolarAngle={Math.PI / 1.5} minDistance={2} />

<!-- Lights -->
<T.AmbientLight intensity={0.2} />
<T.PointLight position={[0, 0, 0]} intensity={1.5} />

<!-- Content same as before... -->

<!-- Time Control UI -->
<div class="ui-layer">
  <TimeControl 
    currentTime={currentDate} 
    timeScale={timeScale} 
    on:timeChange={handleTimeChange}
  />
</div>

<style>
  .ui-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .ui-layer :global(*) {
    pointer-events: auto;
  }
</style>