<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Track scroll position for animations
  let scrollY = 0;
  let sections = [
    { id: 'intro', title: "Scratch that, we're going to Venus" },
    { id: 'atmosphere', title: "50km up: Earth-like paradise" },
    { id: 'chemistry', title: "CO₂ → O₂ + C: Rocket fuel factory" },
    { id: 'infrastructure', title: "Floating platforms in the sky" },
    { id: 'logistics', title: "Lagrange depots & solar system delivery" },
    { id: 'economics', title: "The Venus advantage: 20M to orbit" },
    { id: 'timeline', title: "Research → Production → Revolution" },
    { id: 'testpilot', title: "Meet the test pilot: AI with personality" },
    { id: 'community', title: "Open source Venus: Join the mission" },
    { id: 'cta', title: "Ready for liftoff?" }
  ];
  
  // Placeholder for active section
  let activeSection = 'intro';
  
  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
      // Logic to update activeSection based on scroll position will go here
    });
  });
</script>

<div class="bg-black min-h-screen text-white">
  <!-- Fixed visualization container that will always be visible -->
  <div class="fixed right-0 bottom-0 w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw] -mr-[10vw] -mb-[10vw] bg-purple-900/20 rounded-full">
    <!-- Threlte will go here -->
    <div class="absolute inset-0 flex items-center justify-center text-gray-500">
      <span class="text-lg">Venus 3D coming soon</span>
    </div>
  </div>
  
  <!-- Scrollable content container -->
  <div class="relative z-10">
    {#each sections as section, i}
      <section id={section.id} class="min-h-screen flex flex-col justify-center px-[10vw]">
        <div class="max-w-xl">
          <!-- Section indicator -->
          <div class="text-purple-400 mb-4 font-mono">{(i+1).toString().padStart(2, '0')}/{sections.length.toString().padStart(2, '0')}</div>
          
          <!-- Section heading -->
          <h2 class="text-4xl md:text-5xl font-bold mb-8">{section.title}</h2>
          
          <!-- Placeholder content -->
          <p class="text-gray-300 mb-4">Section content for {section.id} will go here. This will be your compelling narrative about the Venus mission.</p>
          
          {#if i === 5}
            <!-- Economic metrics placeholder -->
            <div class="mt-8 grid grid-cols-2 gap-6">
              <div class="bg-purple-900/30 p-4 rounded-lg">
                <div class="text-3xl font-bold">$20M</div>
                <div class="text-sm text-gray-400">Launch cost</div>
              </div>
              <div class="bg-purple-900/30 p-4 rounded-lg">
                <div class="text-3xl font-bold">5m³</div>
                <div class="text-sm text-gray-400">Initial payload</div>
              </div>
            </div>
          {/if}
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  /* Add any global styles here */
</style>