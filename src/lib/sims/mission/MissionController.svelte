<!-- src/lib/sims/mission/MissionController.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { Telemetry } from '$lib/sims/pilot/telemetry/telemetryGenerator';
  
  // Mission phases and timeline
  export interface MissionPhase {
    id: string;
    name: string;
    description: string;
    startTime: Date; // When this phase begins
    duration: number; // Duration in days
    altitude: number; // Target altitude in km
    key_events: string[]; // Important events during this phase
  }
  
  // Props
  export let startDate = new Date(2025, 0, 1); // Default: Jan 1, 2025
  export let currentTime = new Date(startDate);
  export let timeScale = 1;
  export let activeMissionPhase: string = 'planning';
  
  // Internal state
  let missionTimeline: MissionPhase[] = [
    {
      id: 'planning',
      name: 'Mission Planning',
      description: 'Final preparations for the Venus mission launch.',
      startTime: new Date(startDate),
      duration: 30, // 1 month of planning
      altitude: 0, // Still on Earth
      key_events: [
        'Finalizing spacecraft systems',
        'Loading edge AI model for the Test Pilot',
        'Testing communication systems'
      ]
    },
    {
      id: 'launch',
      name: 'Launch Phase',
      description: 'Rocket launch and Earth orbit departure.',
      startTime: calculatePhaseStart(30), // 30 days after planning
      duration: 2, // 2 days for launch phase
      altitude: 500, // Low Earth orbit
      key_events: [
        'Rocket launch from Earth',
        'Deployment of solar arrays',
        'Spacecraft checkout in Earth orbit'
      ]
    },
    {
      id: 'transit',
      name: 'Interplanetary Transit',
      description: 'Journey through space towards Venus.',
      startTime: calculatePhaseStart(32), // After launch phase
      duration: 120, // 4 months transit
      altitude: -1, // In transit (not applicable)
      key_events: [
        'Trajectory correction maneuvers',
        'Test Pilot AI activation and system checks',
        'Scientific observations during cruise'
      ]
    },
    {
      id: 'approach',
      name: 'Venus Approach',
      description: 'Final approach to Venus and preparation for atmospheric entry.',
      startTime: calculatePhaseStart(152), // After transit
      duration: 7, // 1 week approach
      altitude: 1000, // High Venus orbit
      key_events: [
        'Venus orbit insertion burn',
        'Atmospheric probe separation',
        'Final systems check before descent'
      ]
    },
    {
      id: 'entry',
      name: 'Atmospheric Entry',
      description: 'Deceleration through Venus\'s upper atmosphere.',
      startTime: calculatePhaseStart(159), // After approach
      duration: 1, // 1 day for entry
      altitude: 100, // Upper atmosphere
      key_events: [
        'Atmospheric entry at 125 km altitude',
        'Peak heating phase',
        'Deploying atmospheric deceleration systems'
      ]
    },
    {
      id: 'descent',
      name: 'Controlled Descent',
      description: 'Slowing down and navigating through Venus\'s atmosphere.',
      startTime: calculatePhaseStart(160), // After entry
      duration: 1, // 1 day for descent
      altitude: 70, // Mid-atmosphere
      key_events: [
        'Heat shield separation',
        'Beginning atmospheric measurements',
        'Balloon inflation sequence initiation'
      ]
    },
    {
      id: 'deployment',
      name: 'Balloon Deployment',
      description: 'Deployment and inflation of the floating research platform.',
      startTime: calculatePhaseStart(161), // After descent
      duration: 1, // 1 day for deployment
      altitude: 55, // Cloud layer
      key_events: [
        'Main balloon deployment',
        'Achieving neutral buoyancy',
        'Instrument package deployment'
      ]
    },
    {
      id: 'operations',
      name: 'Research Operations',
      description: 'Floating in Venus\'s clouds, conducting research and collecting data.',
      startTime: calculatePhaseStart(162), // After deployment
      duration: 180, // 6 months of operations
      altitude: 50, // Target altitude in cloud layer
      key_events: [
        'Beginning atmospheric sampling',
        'Test Pilot narrating observations',
        'Cloud composition analysis',
        'Observing weather patterns'
      ]
    }
  ];
  
  // Calculate start time based on days after mission start
  function calculatePhaseStart(daysAfterStart: number): Date {
    const date = new Date(startDate);
    date.setDate(date.getDate() + daysAfterStart);
    return date;
  }
  
  // Event dispatcher to send updates
  const dispatch = createEventDispatcher<{
    phaseChange: { phaseId: string, phase: MissionPhase },
    missionEvent: { event: string, phaseId: string },
    telemetryUpdate: { telemetry: Telemetry }
  }>();
  
  // Calculate current mission phase based on time
  function getCurrentPhase(time: Date): MissionPhase {
    // Find the most recent phase that has started
    let currentPhase = missionTimeline[0]; // Default to first phase
    
    for (const phase of missionTimeline) {
      if (time >= phase.startTime) {
        currentPhase = phase;
      } else {
        // Stop once we find a phase that hasn't started yet
        break;
      }
    }
    
    return currentPhase;
  }
  
  // Get mission day number
  function getMissionDay(time: Date): number {
    const diff = time.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
  
  // Get phase progress percentage
  function getPhaseProgress(time: Date, phase: MissionPhase): number {
    const phaseEndTime = new Date(phase.startTime);
    phaseEndTime.setDate(phaseEndTime.getDate() + phase.duration);
    
    if (time >= phaseEndTime) return 100;
    if (time <= phase.startTime) return 0;
    
    const totalDuration = phaseEndTime.getTime() - phase.startTime.getTime();
    const elapsed = time.getTime() - phase.startTime.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }
  
  // Check for key events based on mission day
  function checkForEvents(time: Date, phase: MissionPhase): void {
    const missionDay = getMissionDay(time);
    const phaseDay = Math.floor((time.getTime() - phase.startTime.getTime()) / (1000 * 60 * 60 * 24));
    
    // Distribute key events throughout the phase based on day
    if (phase.key_events.length > 0) {
      const eventInterval = Math.max(1, Math.floor(phase.duration / phase.key_events.length));
      
      phase.key_events.forEach((event, index) => {
        const eventDay = index * eventInterval;
        
        // If we're on the day this event should happen, dispatch it
        if (phaseDay === eventDay) {
          dispatch('missionEvent', { event, phaseId: phase.id });
        }
      });
    }
  }
  
  // Update function to call in animation loop
  function update() {
    // Get current phase based on time
    const phase = getCurrentPhase(currentTime);
    
    // If phase has changed, dispatch event
    if (phase.id !== activeMissionPhase) {
      activeMissionPhase = phase.id;
      dispatch('phaseChange', { phaseId: phase.id, phase });
    }
    
    // Check for mission events
    checkForEvents(currentTime, phase);
    
    // Calculate mission progress
    const missionDay = getMissionDay(currentTime);
    const phaseProgress = getPhaseProgress(currentTime, phase);
    
    // Generate telemetry data for the current state
    if (phase.altitude > 0) {
      // Only generate telemetry for Venus operations
      // This would be integrated with the telemetry generator
      // TODO: implement
    }
  }
  
  // Animation loop
  let animationFrame: number;
  let lastUpdateTime = Date.now();
  
  function animate() {
    const now = Date.now();
    const deltaTime = now - lastUpdateTime;
    lastUpdateTime = now;
    
    // Update simulation time based on timeScale
    if (timeScale !== 0) {
      // Calculate new date: 1 second real time = 1 day simulation time at timeScale=1
      const newDate = new Date(currentTime);
      newDate.setTime(newDate.getTime() + deltaTime * timeScale * 24 * 60 * 60); // Scale milliseconds to days
      currentTime = newDate;
    }
    
    // Update simulation state
    update();
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  // Lifecycle
  onMount(() => {
    lastUpdateTime = Date.now();
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  });
  
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>

<!-- No visible component - this is a controller -->