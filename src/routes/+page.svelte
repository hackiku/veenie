<!-- src/routes/+page.svelte -->
<script>
  import SpaceSim from '$lib/sims/space/SpaceSim.svelte';
  import { onMount } from 'svelte';
  
  // Track simulation loading status using runes
  let isLoading = $state(true);
  
  onMount(() => {
    // Simple loading state
    const timer = setTimeout(() => {
      isLoading = false;
    }, 200);
    
    return () => clearTimeout(timer);
  });
</script>

<div class="min-h-screen bg-bslack text-white">
  {#if isLoading}
    <!-- Loading indicator -->
    <div class="fixed inset-0 flex items-center justify-center bg-black">
      <div class="text-center">
        <div class="inline-block w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        <p class="mt-4 text-xl font-medium">Loading Solar System...</p>
        <p class="mt-2 text-sm text-gray-400">Preparing celestial bodies and orbital calculations</p>
      </div>
    </div>
  {:else}
    <!-- Main simulation container -->
    <div class="fixed inset-0">
      <SpaceSim />
    </div>
    
    <!-- Optional intro overlay that fades out -->
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center pointer-events-none animate-fadeOut">
      <div class="text-center max-w-lg px-6">
        <h1 class="text-3xl font-bold mb-3">Solar System Explorer</h1>
        <p class="text-lg mb-6">
          An interactive 3D simulation of our cosmic neighborhood.
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes fadeOut {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .animate-fadeOut {
    animation: fadeOut 4s forwards;
  }
</style>