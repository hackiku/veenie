<!-- src/lib/ui/Nav.svelte -->
<script lang="ts">
  import { Play } from 'phosphor-svelte';
  import { page } from '$app/stores';
  
  // Optional props for customization
  let { 
    showHome = true,
    theme = 'dark'
  } = $props<{
    showHome?: boolean;
    theme?: 'dark' | 'light';
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
        <Play size={12} weight={isActive('/') ? 'fill' : 'regular'} />
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