<!-- src/lib/sims/space/controls/BodiesControls.svelte -->
<script lang="ts">
  // Props using runes
  let { 
    focusedPlanet = 'earth',
    onFocusChange
  } = $props<{
    focusedPlanet: string;
    onFocusChange?: (planet: string) => void;
  }>();
  
  // Planet list 
  const planets = [
    { id: 'sun', name: 'Sun', color: '#FFCC00' },
    { id: 'mercury', name: 'Mercury', color: '#BBB' },
    { id: 'venus', name: 'Venus', color: '#E7CDCD' },
    { id: 'earth', name: 'Earth', color: '#3399FF' },
    { id: 'mars', name: 'Mars', color: '#FF5533' },
    { id: 'jupiter', name: 'Jupiter', color: '#FFAA66' },
    { id: 'saturn', name: 'Saturn', color: '#EECC66' },
    { id: 'uranus', name: 'Uranus', color: '#AAEEFF' },
    { id: 'neptune', name: 'Neptune', color: '#6688FF' },
    { id: 'spaceman', name: 'Tesla Roadster', color: '#FF0000' }
  ];
</script>

<div class="mb-4">
  <div class="text-sm font-medium mb-2">Focus on Object:</div>
  <div class="grid grid-cols-3 gap-2">
    {#each planets as planet}
      <button 
        class="px-2 py-1 text-xs border rounded"
        style="border-color: {planet.color}; background-color: rgba(0,0,0,0.5);"
        onclick={() => onFocusChange?.(planet.id)}
        class:ring-2={focusedPlanet === planet.id}
        class:ring-white={focusedPlanet === planet.id}
      >
        {planet.name}
      </button>
    {/each}
  </div>
</div>