<!-- src/lib/sims/venus/testPilot/TestPilot.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Telemetry } from '../telemetry/telemetryGenerator';
  import { generateTelemetry } from '../telemetry/telemetryGenerator';
  
  // Props
  export let active = true;
  export let currentTime = new Date();
  export let missionStartDate = new Date(currentTime.getFullYear(), 0, 1); // Jan 1st of current year
  export let timeScale = 1;
  export let targetAltitude = 50; // Target altitude in km
  
  // State
  let telemetry: Telemetry;
  let altitude = 100; // Start at 100km above Venus
  let descentRate = 0.05; // km per second
  let stabilizationPhase = false;
  let messages: { text: string, timestamp: Date, type: 'system' | 'pilot' | 'alert' }[] = [];
  let animationFrame: number;
  let lastUpdateTime = Date.now();
  
  // Test pilot personality
  const pilotName = "AURA"; // Atmospheric Utility Research Assistant
  const pilotPersonality = {
    traits: ["curious", "slightly poetic", "scientific", "occasionally humorous"],
    interests: ["atmospheric phenomena", "comparing Venus to Earth", "data patterns"],
    style: "concise but descriptive, using occasional metaphors"
  };
  
  // Generate a pilot message based on telemetry
  function generatePilotMessage(telemetry: Telemetry): string {
    // Key thresholds worth commenting on
    const isHot = telemetry.temperature > 200;
    const isEarthlike = telemetry.temperature > 0 && telemetry.temperature < 50 && telemetry.pressure < 2;
    const isHighPressure = telemetry.pressure > 50;
    const isAcidic = telemetry.acidity < 3;
    const isWindy = telemetry.windSpeed > 100;
    const hasEvents = telemetry.eventLog.length > 0;
    
    // Collection of message templates by condition
    const messageTemplates = {
      hot: [
        "The temperature is ${temp}°C. That's hot enough to melt lead. Good thing I'm built tough.",
        "External temperatures at ${temp}°C. It's like flying through an oven out here.",
        "Thermal sensors reading ${temp}°C. Venus isn't exactly being hospitable today."
      ],
      earthlike: [
        "We've reached the sweet spot! ${temp}°C and ${pressure} atm - almost Earth-like conditions up here.",
        "This zone at ${altitude}km is remarkable - ${temp}°C with manageable pressure. Humans could survive here (with oxygen).",
        "The 'habitable zone' readings are confirmed: ${temp}°C and pressure at ${pressure} atmospheres. Quite comfortable, relatively speaking."
      ],
      highPressure: [
        "Pressure reading ${pressure} atmospheres. That's like being almost a kilometer deep in Earth's oceans.",
        "The crushing ${pressure} atmospheres would flatten most Earth vessels. Our reinforced structure is holding steady.",
        "Feeling the squeeze at ${pressure} atmospheres. That's about ${pressureTimes}× Earth's sea-level pressure."
      ],
      acidic: [
        "These clouds are seriously acidic - pH approximately ${acidity}. Good thing I don't corrode easily.",
        "Detecting concentrated sulfuric acid in the atmosphere. pH readings around ${acidity}.",
        "These droplets would dissolve unprotected equipment in minutes. pH measuring ${acidity}."
      ],
      windy: [
        "Experiencing significant turbulence. Wind speeds at ${wind} m/s.",
        "Holding steady despite ${wind} m/s crosswinds. The super-rotation of Venus's atmosphere is impressive.",
        "These ${wind} m/s winds make Earth hurricanes look gentle by comparison."
      ],
      general: [
        "Current altitude: ${altitude}km. Telemetry looking nominal with temperature at ${temp}°C and pressure at ${pressure} atm.",
        "Monitoring atmospheric composition at ${altitude}km. Finding fascinating sulfur compounds in the cloud layers.",
        "The view from ${altitude}km above Venus is otherworldly. Visibility approximately ${visibility}km through the haze.",
        "Data collection proceeding at ${altitude}km altitude. All systems at ${systemStatus}% functionality."
      ]
    };
    
    // Select appropriate message type based on conditions
    let messageTypes = ['general'];
    if (hasEvents) messageTypes.push('event');
    if (isHot) messageTypes.push('hot');
    if (isEarthlike) messageTypes.push('earthlike');
    if (isHighPressure) messageTypes.push('highPressure');
    if (isAcidic) messageTypes.push('acidic');
    if (isWindy) messageTypes.push('windy');
    
    // Prioritize important conditions and events
    if (telemetry.eventLog.length > 0) {
      // If we have an event, focus on that
      const event = telemetry.eventLog[0];
      return `${formatPilotPrefix()}: ${event}`;
    } else if (isEarthlike) {
      // Earth-like conditions are significant
      messageTypes = ['earthlike'];
    } else {
      // Otherwise pick a random applicable message type
      const messageType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
      messageTypes = [messageType];
    }
    
    // Get template from selected message type
    let templates = messageTemplates[messageTypes[0] as keyof typeof messageTemplates];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Fill in template with actual values
    const systemStatusAvg = Math.round(
      Object.values(telemetry.systemStatus).reduce((a, b) => a + b, 0) / 
      Object.values(telemetry.systemStatus).length
    );
    
    return `${formatPilotPrefix()}: ${template}`
      .replace('${altitude}', telemetry.altitude.toFixed(1))
      .replace('${temp}', telemetry.temperature.toFixed(1))
      .replace('${pressure}', telemetry.pressure.toFixed(2))
      .replace('${pressureTimes}', (telemetry.pressure / 1.01325).toFixed(0))
      .replace('${acidity}', telemetry.acidity.toFixed(1))
      .replace('${wind}', telemetry.windSpeed.toFixed(1))
      .replace('${visibility}', telemetry.visibility.toFixed(1))
      .replace('${systemStatus}', systemStatusAvg.toString());
  }
  
  function formatPilotPrefix(): string {
    return `${pilotName} [${formatTime(telemetry.timestamp)}]`;
  }
  
  function formatTime(date: Date): string {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  }
  
  function formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  
  // Calculate mission time in days
  function getMissionDay(): number {
    const timeDiff = currentTime.getTime() - missionStartDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
  
  // Update simulation state
  function updateState() {
    // Calculate elapsed time with time scale
    const now = Date.now();
    const elapsed = (now - lastUpdateTime) / 1000 * timeScale;
    lastUpdateTime = now;
    
    // Skip update if simulation is paused
    if (timeScale === 0 || !active) return;
    
    // Update altitude based on mission phase
    if (!stabilizationPhase && Math.abs(altitude - targetAltitude) < 1) {
      // We've reached target altitude, begin stabilization
      stabilizationPhase = true;
      addSystemMessage(`Reached target altitude of ${targetAltitude}km. Beginning stabilization phase.`);
    }
    
    if (stabilizationPhase) {
      // Small random fluctuation around target altitude
      const fluctuation = (Math.random() - 0.5) * 0.01;
      altitude += fluctuation;
    } else {
      // Descending phase
      altitude -= descentRate * elapsed;
      altitude = Math.max(altitude, targetAltitude);
    }
    
    // Generate telemetry based on current state
    telemetry = generateTelemetry(altitude, currentTime);
    
    // Add pilot message occasionally
    if (Math.random() < 0.05 || telemetry.eventLog.length > 0) {
      const pilotMessage = generatePilotMessage(telemetry);
      addPilotMessage(pilotMessage);
    }
    
    // Add alert if any system is below 80%
    for (const [system, value] of Object.entries(telemetry.systemStatus)) {
      if (value < 80) {
        addAlertMessage(
          `${system.charAt(0).toUpperCase() + system.slice(1)} system at ${value.toFixed(1)}% - monitoring closely.`
        );
        break;
      }
    }
  }
  
  function addSystemMessage(text: string) {
    messages = [...messages, { 
      text, 
      timestamp: new Date(currentTime), 
      type: 'system' 
    }];
    trimMessages();
  }
  
  function addPilotMessage(text: string) {
    messages = [...messages, { 
      text, 
      timestamp: new Date(currentTime), 
      type: 'pilot' 
    }];
    trimMessages();
  }
  
  function addAlertMessage(text: string) {
    messages = [...messages, { 
      text: `ALERT: ${text}`, 
      timestamp: new Date(currentTime), 
      type: 'alert' 
    }];
    trimMessages();
  }
  
  function trimMessages() {
    // Keep only the last 20 messages
    if (messages.length > 20) {
      messages = messages.slice(messages.length - 20);
    }
  }
  
  function animate() {
    updateState();
    animationFrame = requestAnimationFrame(animate);
  }
  
  onMount(() => {
    // Initialize telemetry
    telemetry = generateTelemetry(altitude, currentTime);
    
    // Add initial message
    addSystemMessage(`Mission Day ${getMissionDay()}: Test Pilot ${pilotName} activated. Beginning Venus atmospheric descent.`);
    addPilotMessage(`Deployment successful! Starting my journey at ${altitude.toFixed(1)}km above Venus's surface. I'm excited to discover what lies below.`);
    
    // Start animation loop
    lastUpdateTime = Date.now();
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  });
  
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
  
  $: {
    // When timeScale changes
    if (timeScale === 0) {
      addSystemMessage("Simulation paused.");
    } else if (timeScale > 0) {
      lastUpdateTime = Date.now();
      addSystemMessage(`Simulation running at ${timeScale}x speed.`);
    }
  }
</script>

<div class="test-pilot-interface">
  <div class="test-pilot-header">
    <div class="test-pilot-title">
      <h3 class="text-xl font-bold">Venus Test Pilot: {pilotName}</h3>
      <div class="mission-info text-xs text-purple-300">
        Mission Day {getMissionDay()} | {formatDate(currentTime)}
      </div>
    </div>
    <div class="test-pilot-status">
      <div class="text-sm text-gray-400">Status: {active ? "Active" : "Standby"}</div>
      <div class="text-sm">Altitude: <span class="text-green-400">{altitude.toFixed(1)} km</span></div>
    </div>
  </div>
  
  <div class="console-display">
    {#each messages as message}
      <div class="console-line" class:system-message={message.type === 'system'} 
                               class:pilot-message={message.type === 'pilot'}
                               class:alert-message={message.type === 'alert'}>
        {message.text}
      </div>
    {/each}
  </div>
  
  {#if telemetry}
    <div class="telemetry-display">
      <div class="telemetry-group">
        <div class="telemetry-item">
          <span class="label">Temperature</span>
          <span class="value">{telemetry.temperature.toFixed(1)} °C</span>
        </div>
        <div class="telemetry-item">
          <span class="label">Pressure</span>
          <span class="value">{telemetry.pressure.toFixed(2)} atm</span>
        </div>
      </div>
      <div class="telemetry-group">
        <div class="telemetry-item">
          <span class="label">Wind</span>
          <span class="value">{telemetry.windSpeed.toFixed(1)} m/s</span>
        </div>
        <div class="telemetry-item">
          <span class="label">Acidity</span>
          <span class="value">pH {telemetry.acidity.toFixed(1)}</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .test-pilot-interface {
    background: rgba(10, 10, 30, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    color: white;
    font-family: 'Courier New', monospace;
    padding: 1rem;
    width: 100%;
    max-width: 48rem;
    max-height: 40vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(8px);
  }
  
  .test-pilot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  }
  
  .console-display {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.4;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    max-height: 20rem;
    margin-bottom: 0.5rem;
  }
  
  .console-line {
    margin-bottom: 0.375rem;
    word-wrap: break-word;
  }
  
  .system-message {
    color: #a8a8a8;
    font-style: italic;
  }
  
  .pilot-message {
    color: #9cb3ff;
  }
  
  .alert-message {
    color: #ff9c9c;
  }
  
  .telemetry-display {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  .telemetry-group {
    flex: 1;
  }
  
  .telemetry-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  .label {
    color: #a8a8a8;
  }
  
  .value {
    color: #00ffaa;
    font-weight: bold;
  }
</style>