<!-- src/routes/venus/+page.svelte -->
<script>
  import VenusSim from '$lib/sims/venus/VenusSim.svelte';
  import { onMount } from 'svelte';
  
  // Track simulation status
  let isLoading = $state(true);
  
  onMount(() => {
    // Simple loading state
    const timer = setTimeout(() => {
      isLoading = false;
    }, 1000);
    
    return () => clearTimeout(timer);
  });
</script>

<div class="relative min-h-screen bg-black text-white">
  {#if isLoading}
    <div class="absolute inset-0 flex items-center justify-center bg-black">
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-t-purple-500 border-purple-200 rounded-full animate-spin"></div>
        <p class="mt-4 text-xl font-medium">Loading Venus Simulation...</p>
      </div>
    </div>
  {:else}
    <VenusSim />
    
    <div class="absolute top-4 left-4 max-w-md">
      <h1 class="text-2xl font-bold mb-2">Venus Floating Habitat</h1>
      <p class="text-sm bg-black/70 p-2 rounded">
        This proof of concept demonstrates how LOX/CH4 propellant can be used for buoyancy
        in Venus's dense atmosphere. The habitats float at ~55km altitude where temperature 
        and pressure conditions are Earth-like.
      </p>
    </div>
  {/if}
</div>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: black;
  }
</style>