<!-- src/lib/sims/venus/controls/time/Timeline.svelte -->
<script lang="ts">
  import { simulationStore } from '../../stores/simulationStore';
  import { Calendar } from 'phosphor-svelte';
  
  // Mission timeline constants
  const MISSION_START = new Date('2025-01-01');
  const MISSION_END = new Date('2035-12-31');
  
  // Mission key events
  const missionEvents = [
    { date: new Date('2025-06-15'), name: 'Launch', color: '#FF6B00' },
    { date: new Date('2025-12-10'), name: 'Venus Orbit', color: '#FF9500' },
    { date: new Date('2026-02-01'), name: 'Probe Deployment', color: '#FFB700' },
    { date: new Date('2028-03-15'), name: 'Habitat Module', color: '#38B000' },
    { date: new Date('2030-07-01'), name: 'Colony Start', color: '#3A86FF' },
    { date: new Date('2033-04-20'), name: 'Colony Expansion', color: '#8338EC' },
    { date: new Date('2035-01-01'), name: 'Full Operation', color: '#FF006E' }
  ];
  
  // Calculate total mission duration in milliseconds
  const totalDuration = MISSION_END.getTime() - MISSION_START.getTime();
  
  // Current date from the store
  let currentDate = $state(new Date());
  
  // Update from store
  $effect(() => {
    currentDate = $simulationStore.time.date;
  });
  
  // Calculate percentage position for the current date and events
  function getPositionPercent(date: Date): number {
    const elapsed = date.getTime() - MISSION_START.getTime();
    return (elapsed / totalDuration) * 100;
  }
  
  // Format date for display
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Handle manual timeline click
  function handleTimelineClick(event: MouseEvent) {
    const timeline = event.currentTarget as HTMLDivElement;
    const rect = timeline.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    
    // Calculate new date
    const timeOffset = percentage * totalDuration;
    const newDate = new Date(MISSION_START.getTime() + timeOffset);
    
    // Update store
    simulationStore.setDate(newDate);
  }
  
  // Check if an event is near the current date (within 30 days)
  function isNearCurrentDate(eventDate: Date): boolean {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }
  
  // Get the closest upcoming event
  function getNextEvent(): typeof missionEvents[0] | null {
    const futureEvents = missionEvents.filter(e => e.date > currentDate);
    if (futureEvents.length === 0) return null;
    
    return futureEvents.reduce((nearest, event) => 
      event.date < nearest.date ? event : nearest
    , futureEvents[0]);
  }
  
  // Create year tick marks
  let yearTicks = $state<{year: number, position: number}[]>([]);
  
  $effect(() => {
    const ticks = [];
    for (let year = 2025; year <= 2035; year++) {
      const date = new Date(`${year}-01-01`);
      ticks.push({
        year,
        position: getPositionPercent(date)
      });
    }
    yearTicks = ticks;
  });
  
  // Get next event for display
  let nextEvent = $state<typeof missionEvents[0] | null>(null);
  
  $effect(() => {
    nextEvent = getNextEvent();
  });
</script>

<div class="w-full bg-gray-800/80 rounded-md p-4 text-white">
  <!-- Current date display -->
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center">
      <Calendar size={18} weight="fill" class="mr-2" />
      <span class="font-mono">{formatDate(currentDate)}</span>
    </div>
    
    {#if nextEvent}
      <div class="text-xs">
        Next Event: <span class="font-semibold" style="color: {nextEvent.color};">{nextEvent.name}</span>
        <span class="ml-1 opacity-70">({formatDate(nextEvent.date)})</span>
      </div>
    {/if}
  </div>
  
  <!-- Timeline bar -->
  <div 
    class="relative w-full h-8 bg-gray-900 rounded-full cursor-pointer"
    onclick={handleTimelineClick}
  >
    <!-- Progress bar -->
    <div 
      class="absolute h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
      style="width: {getPositionPercent(currentDate)}%"
    ></div>
    
    <!-- Year ticks -->
    {#each yearTicks as tick}
      <div 
        class="absolute top-0 h-full w-px bg-gray-600 flex flex-col items-center"
        style="left: {tick.position}%"
      >
        <span class="absolute bottom-full mb-1 text-xs text-gray-400">{tick.year}</span>
      </div>
    {/each}
    
    <!-- Event markers -->
    {#each missionEvents as event}
      <div 
        class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style="left: {getPositionPercent(event.date)}%; background-color: {event.color}; transform: translate(-50%, -50%);"
        title="{event.name} - {formatDate(event.date)}"
      >
        <!-- Pulsing effect for events near current date -->
        {#if isNearCurrentDate(event.date)}
          <div 
            class="absolute w-6 h-6 rounded-full animate-ping"
            style="background-color: {event.color}; opacity: 0.3; top: -1.5px; left: -1.5px;"
          ></div>
        {/if}
      </div>
    {/each}
    
    <!-- Current position indicator -->
    <div 
      class="absolute top-0 w-px h-full bg-white"
      style="left: {getPositionPercent(currentDate)}%"
    >
      <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
    </div>
  </div>
</div>