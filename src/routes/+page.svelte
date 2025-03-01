<!-- src/routes/+page.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import Scene from '$lib/orbital/Scene.svelte';
  import { onMount } from 'svelte';
  
  let scrollY = 0;
  
  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });
  });
</script>

<div class="bg-black min-h-screen text-white font-mono">
  <!-- Hero Section -->
  <section class="min-h-screen flex flex-col justify-center px-[8vw] relative z-10">
    <div class="max-w-4xl">
      <h1 class="text-5xl md:text-7xl font-medium mb-4 leading-tight">
        Scratch that, we're going to Venus
      </h1>
      <h2 class="text-xl md:text-2xl text-purple-300 mb-12">
        Floating rocket fuel factory on Venus in &lt;10 years
      </h2>
      
      <div class="absolute bottom-8 left-[8vw] flex items-center">
        <div class="h-px w-16 bg-purple-500 mr-4"></div>
        <span class="text-purple-500 text-sm">SCROLL TO EXPLORE</span>
      </div>
    </div>
  </section>
  
  <!-- Test Pilot Section -->
  <section class="min-h-screen flex flex-col justify-center px-[8vw] relative z-10">
    <div class="max-w-4xl">
      <div class="text-purple-400 mb-4 font-mono">01</div>
      <h2 class="text-4xl md:text-5xl font-medium mb-6">Send test pilot</h2>
      <p class="text-xl md:text-2xl text-gray-300 max-w-2xl">
        5m³ research station with onboard AI to the Venus upper atmosphere (45-60km).
        The test pilot interprets data in real-time, reporting back findings with personality.
      </p>
      
      <!-- Engineering interface elements -->
      <div class="mt-12 grid grid-cols-2 gap-6 max-w-xl">
        <div class="border border-purple-700/50 bg-purple-900/20 p-4 rounded-md">
          <div class="text-xs text-purple-400 mb-1">ALTITUDE</div>
          <div class="text-2xl font-bold">50km</div>
          <div class="text-xs text-gray-400 mt-1">Earth-like conditions</div>
        </div>
        <div class="border border-purple-700/50 bg-purple-900/20 p-4 rounded-md">
          <div class="text-xs text-purple-400 mb-1">PAYLOAD</div>
          <div class="text-2xl font-bold">5m³</div>
          <div class="text-xs text-gray-400 mt-1">Initial research station</div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Fixed 3D visualization container -->
  <div class="fixed right-0 bottom-0 w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw] -mr-[10vw] -mb-[10vw] overflow-hidden">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
</div>

<style>
  :global(body) {
    overflow-x: hidden;
    background-color: black;
  }
</style>