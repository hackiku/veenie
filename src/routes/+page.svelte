<!-- src/routes/+page.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/orbital/Scene.svelte';
  import { onMount } from 'svelte';
  import TimeControl from '$lib/orbital/gui/TimeControl.svelte';
  // import Timeline from '$lib/components/Timeline.svelte';
  // content
  import Hero from '$lib/content/Hero.svelte';
  import Pilot from '$lib/content/Pilot.svelte';
  
  let scrollY = 0;
  let windowHeight = 0;
  let sectionIndex = 0;
  const totalSections = 7;
  
  // Simulation time state
  let simulationTime = new Date();
  let timeScale = 0; // Start paused
  
  function handleTimeChange(event) {
    simulationTime = event.detail.time;
    timeScale = event.detail.scale;
    // Here you would update the simulation based on the new time
  }
  
  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      sectionIndex = Math.min(
        Math.floor(scrollY / (windowHeight * 0.8)), 
        totalSections - 1
      );
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      windowHeight = window.innerHeight;
    });
    
    // Initialize values
    windowHeight = window.innerHeight;
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {});
    };
  });
</script>

<div class="relative bg-black min-h-screen text-white">
  <!-- content -->
  <Hero />
  <Pilot />

  <!-- Fixed 3D visualization container -->
  <div class="z-10 fixed bg-indigo-900/10 right-0 bottom-0 w-[80vw] h-[60vw] md:w-[75vw] md:h-[50vw] -mr-[10vw] -mb-[10vw] overflow-hidden">
		<Canvas>
      <Scene 
        scrollY={scrollY} 
        currentTime={simulationTime} 
        timeScale={timeScale} 
      />
    </Canvas>
  </div>
  
  <!-- Time Control Component -->
  <TimeControl 
    currentTime={simulationTime} 
    timeScale={timeScale} 
    on:timeChange={handleTimeChange} 
  />
</div>

<style>
  :global(body) {
    overflow-x: hidden;
    background-color: black;
  }
</style>