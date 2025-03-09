<!-- src/lib/ui/Nav.svelte -->
<script lang="ts">
  // import { Play } from 'phosphor-svelte';
  import { page } from '$app/stores';
  
  // Optional props for customization
  let { 
    showHome = true,
  } = $props<{
    showHome?: boolean;
  }>();
  
  // Determine active route
  $effect(() => {
    activeRoute = $page.url.pathname;
  });
  
  let activeRoute = $state('');
  
  // Define navigation items
  const navItems = [
    { name: 'Venus', path: '/venus' },
    { name: 'Flight', path: '/flight' },
    { name: '2B', path: '/2body' }
  ];
  
  // Helper function to determine if a route is active
  function isActive(path: string): boolean {
    return activeRoute === path;
  }
</script>

<nav class="fixed bottom-6 right-6 px-4 py-3 z-50 flex items-center">
  <div class="flex items-center">
    {#if showHome}
      <a 
        href="/" 
        class="flex items-center mr-4 text-white font-mono" 
      >
			<!-- <Play size={12} weight={isActive('/') ? 'fill' : 'regular'} /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ffffff" viewBox="0 0 256 256" data-darkreader-inline-fill="" style="--darkreader-inline-fill: var(--darkreader-background-000000, #000000);"><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path></svg>
      </a>
    {/if}
    
    <div class="flex space-x-3">
      {#each navItems as item}
        <a 
          href={item.path} 
          class="text-xs font-mono __bg-indigo-900 rounded-md transition-colors duration-200 text-white/50 hover:text-white"
        >
          {item.name}
        </a>
      {/each}
    </div>
  </div>
</nav>