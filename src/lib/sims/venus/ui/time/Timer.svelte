<!-- src/lib/sims/venus/controls/time/Timer.svelte -->
<script lang="ts">
  import { venusStore } from '$lib/stores/venusStore';
  import Player from './Player.svelte';
  import { Clock, Calendar } from 'lucide-svelte';
  
  // Local state
  let currentDate = $state(new Date());
  let isExpanded = $state(false);
  
  // Subscribe to store
  $effect(() => {
    if ($venusStore && $venusStore.time) {
      currentDate = $venusStore.time.date;
    }
  });
  
  // Format date for display
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Format time for display
  function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Handle date input change
  function onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const newDate = new Date(input.value);
      if (!isNaN(newDate.getTime())) {
        const updatedDate = new Date(currentDate);
        updatedDate.setFullYear(newDate.getFullYear());
        updatedDate.setMonth(newDate.getMonth());
        updatedDate.setDate(newDate.getDate());
        venusStore.setDate(updatedDate);
      }
    }
  }
  
  // Toggle expanded view
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>



<div class="bg-black/80 p-3 rounded-md  text-white">

	<div class="flex items-center justify-between mb-2">
    <!-- Date and time display -->
    <div class="flex items-center">
      <Clock weight="fill" size={18} class="mr-2 text-amber-500" />
      <span class="font-mono mr-2">{formatDate(currentDate)}</span>
      <span class="font-mono text-gray-400 text-sm">{formatTime(currentDate)}</span>
    </div>
    
    <!-- Expand/collapse control -->
    <button 
      class="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded"
      onclick={toggleExpanded}
    >
      {isExpanded ? 'Collapse' : 'Expand'}
    </button>
  </div>
  
  <!-- Player controls always visible -->
  <Player />
  
  <!-- Expanded view with date selection -->
  {#if isExpanded}
    <div class="mt-3 pt-3 border-t border-gray-800">
			
      <div class="flex items-center gap-2">
        <Calendar size={16} class="text-gray-400" />
        <input 
          type="date" 
          class="bg-gray-900 text-white text-sm px-2 py-1 rounded border border-gray-700 w-full"
          value={currentDate.toISOString().split('T')[0]}
          onchange={onDateChange}
        />
      </div>
      
      <!-- Additional time information -->
      <div class="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
        <div class="bg-gray-900/60 p-2 rounded">
          <div class="text-gray-400">Venus Day</div>
          <div class="font-mono font-bold">
            {Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24 * 243.025)) % 243}
          </div>
        </div>
        
        <div class="bg-gray-900/60 p-2 rounded">
          <div class="text-gray-400">Earth Day</div>
          <div class="font-mono font-bold">
            {Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24)) % 365}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
