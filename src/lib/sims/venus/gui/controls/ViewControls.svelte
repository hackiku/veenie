<!-- src/lib/sims/venus/controls/ViewControls.svelte -->
<script lang="ts">
  // Props using runes
  let { 
    currentView = 'surface',
    onViewChange = (view: string) => {}
  } = $props<{
    currentView: string;
    onViewChange?: (view: string) => void;
  }>();
  
  // View options
  const viewOptions = [
    { id: 'surface', name: 'Surface' },
    { id: 'clouds', name: 'Cloud Deck' },
    { id: 'atmosphere', name: 'Atmosphere' },
    { id: 'orbit', name: 'Orbit' }
  ];
</script>

<div class="mb-4">
  <div class="text-sm font-medium mb-2">View:</div>
  <div class="grid grid-cols-2 gap-2">
    {#each viewOptions as view}
      <button 
        class="px-2 py-1 text-sm border rounded"
        class:bg-orange-700={currentView === view.id}
        class:bg-black={currentView !== view.id}
        onclick={() => onViewChange(view.id)}
      >
        {view.name}
      </button>
    {/each}
  </div>
</div>