<!-- lib/components/Timeline.svelte -->
<script>
  export let currentSection = 0;
  export let totalSections = 7;
  
  // Timeline entries - years relative to present
  const timelineEntries = [
    { year: 10, label: "Rocket Fuel Factory", section: 6 },
    { year: 7, label: "Manufacturing Line", section: 4 },
    { year: 5, label: "Infrastructure Complete", section: 3 },
    { year: 3, label: "Research Outpost", section: 2 },
    { year: 1, label: "Test Pilot Deployed", section: 1 },
    { year: 0, label: "Present Day", section: 0 }
  ];
  
  // Calculate active timeline entry based on current section
  $: activeEntry = timelineEntries.find(entry => entry.section <= currentSection) || timelineEntries[0];
</script>

<div class="fixed left-[8vw] bottom-8 z-20 w-64">
  <div class="flex items-center mb-4">
    <div class="h-px w-12 bg-purple-500 mr-3"></div>
    <span class="text-purple-400 text-xs uppercase tracking-wider">Timeline</span>
  </div>
  
  <div class="relative">
    <!-- Timeline line -->
    <div class="absolute left-2 top-0 w-px h-full bg-purple-900/50"></div>
    
    <!-- Timeline entries -->
    {#each timelineEntries as entry, i}
      <div 
        class="flex items-center mb-5 {activeEntry.year === entry.year ? 'opacity-100' : 'opacity-30'} 
               transition-opacity duration-300"
      >
        <!-- Timeline dot -->
        <div 
          class="w-4 h-4 rounded-full {activeEntry.year === entry.year ? 'bg-purple-500' : 'bg-purple-900'} 
                 transition-colors duration-300 relative z-10 mr-3"
        ></div>
        
        <!-- Timeline entry details -->
        <div>
          <div class="text-sm font-bold {activeEntry.year === entry.year ? 'text-white' : 'text-gray-400'}">
            {entry.year > 0 ? `+${entry.year}` : entry.year} years
          </div>
          <div class="text-xs text-gray-400">{entry.label}</div>
        </div>
      </div>
    {/each}
  </div>
</div>