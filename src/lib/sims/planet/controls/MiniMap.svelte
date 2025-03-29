<!-- src/lib/sims/planet/controls/MiniMap.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  
  // Props using runes
  let {
    map = 'planet',
    onModelSelect = null
  } = $props<{
    map?: 'surface' | 'cloud' | 'terrain',
    onModelSelect?: ((modelType: string) => void) | null
  }>();

  // State for selected map
  let selectedMap = $state(map);

  // Map options
  const mapOptions = [
    { id: 'surface', label: 'Surface', image: '/models/planets/venus/surface.svg' },
    { id: 'cloud', label: 'Clouds', image: '/models/planets/venus/cloud.svg' },
    { id: 'terrain', label: 'Terrain', image: '/models/planets/venus/terrain.svg' }
  ];

  // Function to select a map
  function selectMap(mapId: 'surface' | 'cloud' | 'terrain') {
    selectedMap = mapId;
    
    // Notify parent component if callback provided
    if (onModelSelect) {
      onModelSelect(mapId);
    }
  }

  // Keep selectedMap in sync with prop
  $effect(() => {
    selectedMap = map;
  });
  
  // Handle keyboard events for accessibility
  function handleKeyPress(event: KeyboardEvent, mapId: 'surface' | 'cloud' | 'terrain') {
    if (event.key === 'Enter' || event.key === ' ') {
      selectMap(mapId);
      event.preventDefault();
    }
  }
  
  // Simple class name utility function similar to cn()
  function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
  }
</script>

<div class="flex flex-row gap-4 justify-end items-end">
  {#each mapOptions as option}
    {@const isSelected = selectedMap === option.id}
    
    <button
      type="button"
      class={cn(
        "bg-neutral-700/40 rounded-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500 focus-visible:ring-2 transition-all duration-200",
        isSelected ? "border-orange-500 border-2 w-24 h-24 p-4" : "border-orange-900/40 border w-12 h-12 p-3 rounded-lg",
      )}
      aria-label={`Select ${option.label} view`}
      aria-pressed={isSelected}
      onclick={() => selectMap(option.id as 'surface' | 'cloud' | 'terrain')}
      onkeydown={(e) => handleKeyPress(e, option.id as 'surface' | 'cloud' | 'terrain')}
    >
      <!-- Image container -->
      <div class="flex-grow flex items-end justify-center w-full h-full overflow-hidden rounded-xl">
        <img 
          src={option.image} 
          alt=""
          aria-hidden="true"
          class="object-contain max-w-full max-h-full"
        />
      </div>
      

    </button>
  {/each}
</div>