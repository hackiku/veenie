<!-- src/routes/controlapi/+page.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  
  // Connection settings
  let serverUrl = $state('');
  let sessionId = $state('test-session-123');
  
  // Control states
  let moveX = $state(0);
  let moveZ = $state(0);
  let yaw = $state(0);
  let sensitivity = $state(1.0);
  let inflate = $state(0);
  let deflate = $state(0);
  
  // Status tracking
  let statusLog = $state<Array<{message: string, type: string, timestamp: string}>>([]);
  let connectionStatus = $state('disconnected');
  
  // Initialize server URL when component loads
  $effect(() => {
    if (browser) {
      serverUrl = window.location.origin;
      log('Balloon Control Tester loaded. Test your enhanced controls!', 'success');
    }
  });
  
  // Logging function
  function log(message: string, type: string = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    statusLog = [...statusLog, { message, type, timestamp }];
    
    // Keep only last 50 logs
    if (statusLog.length > 50) {
      statusLog = statusLog.slice(-50);
    }
  }
  
  function clearLog() {
    statusLog = [];
  }
  
  // API Communication
  async function sendCommand(type: string, params: any) {
    if (!browser) return;
    
    const command = { type, ...params };
    
    try {
      log(`Sending command: ${JSON.stringify(command)}`, 'info');
      
      const response = await fetch(`${serverUrl}/api/controls/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          command
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        log(`✓ Command sent successfully (Queue: ${result.queueLength})`, 'success');
        connectionStatus = 'connected';
      } else {
        log(`✗ Command failed: ${result.error}`, 'error');
        connectionStatus = 'error';
      }
    } catch (error) {
      log(`✗ Network error: ${error.message}`, 'error');
      connectionStatus = 'error';
    }
  }
  
  async function testConnection() {
    if (!browser) return;
    
    try {
      const response = await fetch(`${serverUrl}/api/controls/command?sessionId=test`);
      const result = await response.json();
      log(`✓ Connection successful`, 'success');
      connectionStatus = 'connected';
    } catch (error) {
      log(`✗ Connection failed: ${error.message}`, 'error');
      connectionStatus = 'error';
    }
  }
  
  // Preset command functions
  function sendAnalogCommand() {
    // Send movement command if there's movement
    if (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01) {
      sendCommand('balloon.move', {
        direction: { x: moveX, z: moveZ },
        sensitivity: sensitivity
      });
    }
    
    // Send yaw command if there's yaw
    if (Math.abs(yaw) > 0.01) {
      sendCommand('balloon.yaw', {
        direction: yaw,
        sensitivity: sensitivity
      });
    }
  }
  
  function sendInflateCommand() {
    sendCommand('balloon.inflate', { intensity: inflate });
  }
  
  function sendDeflateCommand() {
    sendCommand('balloon.deflate', { intensity: deflate });
  }
  
  function stopAllMovement() {
    sendCommand('balloon.move', { direction: { x: 0, z: 0 } });
    sendCommand('balloon.yaw', { direction: 0 });
    sendCommand('balloon.inflate', { intensity: 0 });
    sendCommand('balloon.deflate', { intensity: 0 });
    
    // Reset sliders
    moveX = 0;
    moveZ = 0;
    yaw = 0;
    inflate = 0;
    deflate = 0;
  }
  
  // Auto-send on slider change (debounced)
  let autoSendTimeout: number;
  function scheduleAutoSend() {
    clearTimeout(autoSendTimeout);
    autoSendTimeout = setTimeout(sendAnalogCommand, 500);
  }
</script>

<style>
  .container {
    font-family: 'Courier New', monospace;
    background: #1a1a1a;
    color: #00ff00;
    padding: 20px;
    line-height: 1.6;
    min-height: 100vh;
  }
  
  .control-panel {
    background: #2a2a2a;
    border: 1px solid #555;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .control-group {
    margin-bottom: 15px;
  }
  
  .control-group label {
    display: block;
    margin-bottom: 5px;
    color: #ffff00;
  }
  
  input[type="range"] {
    width: 100%;
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    background: #1a1a1a;
    border: 1px solid #555;
    color: #00ff00;
    padding: 5px;
    width: 200px;
  }
  
  button {
    background: #333;
    border: 1px solid #555;
    color: #00ff00;
    padding: 10px 15px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background: #444;
  }
  
  button.active {
    background: #006600;
    color: white;
  }
  
  .status {
    background: #0a0a0a;
    border: 1px solid #333;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .error {
    color: #ff4444;
  }
  
  .success {
    color: #44ff44;
  }
  
  .info {
    color: #4444ff;
  }
  
  .preset-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }
  
  .analog-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .connection-status {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 10px;
  }
  
  .connection-status.connected {
    background: #006600;
    color: white;
  }
  
  .connection-status.error {
    background: #660000;
    color: white;
  }
  
  .connection-status.disconnected {
    background: #666600;
    color: white;
  }
</style>

<div class="container">
  <h1>🎈 Venus Balloon Control Tester</h1>
  <p>Test your enhanced balloon controls with analog sensitivity and yaw!</p>
  <div class="connection-status {connectionStatus}">{connectionStatus.toUpperCase()}</div>
  
  <!-- Connection Settings -->
  <div class="control-panel">
    <h3>Connection Settings</h3>
    <div class="control-group">
      <label>Server URL:</label>
      <input type="text" bind:value={serverUrl}>
      <button on:click={testConnection}>Test Connection</button>
    </div>
    <div class="control-group">
      <label>Session ID:</label>
      <input type="text" bind:value={sessionId}>
    </div>
  </div>
  
  <!-- Preset Commands -->
  <div class="control-panel">
    <h3>Quick Test Commands</h3>
    <div class="preset-buttons">
      <button on:click={() => sendCommand('balloon.inflate', {intensity: 1.0})}>Full Inflate</button>
      <button on:click={() => sendCommand('balloon.deflate', {intensity: 1.0})}>Full Deflate</button>
      <button on:click={() => sendCommand('balloon.move', {direction: {x: 1, z: 0}})}>Move Right</button>
      <button on:click={() => sendCommand('balloon.yaw', {direction: -1})}>Yaw Left</button>
      <button on:click={() => sendCommand('balloon.yaw', {direction: 1})}>Yaw Right</button>
      <button on:click={() => sendCommand('sim.reset', {})}>Reset</button>
    </div>
  </div>
  
  <!-- Analog Controls -->
  <div class="control-panel">
    <h3>Analog Controls</h3>
    <div class="analog-controls">
      <div class="control-group">
        <label>Movement X: {moveX.toFixed(1)}</label>
        <input type="range" bind:value={moveX} min="-1" max="1" step="0.1" on:input={scheduleAutoSend}>
      </div>
      
      <div class="control-group">
        <label>Movement Z: {moveZ.toFixed(1)}</label>
        <input type="range" bind:value={moveZ} min="-1" max="1" step="0.1" on:input={scheduleAutoSend}>
      </div>
      
      <div class="control-group">
        <label>Yaw: {yaw.toFixed(1)}</label>
        <input type="range" bind:value={yaw} min="-1" max="1" step="0.1" on:input={scheduleAutoSend}>
      </div>
      
      <div class="control-group">
        <label>Sensitivity: {sensitivity.toFixed(1)}</label>
        <input type="range" bind:value={sensitivity} min="0.1" max="2.0" step="0.1">
      </div>
    </div>
    
    <div class="control-group">
      <button on:click={sendAnalogCommand}>Send Analog Command</button>
      <button on:click={stopAllMovement}>Stop All Movement</button>
    </div>
  </div>
  
  <!-- Balloon Controls -->
  <div class="control-panel">
    <h3>Balloon Controls</h3>
    <div class="control-group">
      <label>Inflate Intensity: {inflate.toFixed(1)}</label>
      <input type="range" bind:value={inflate} min="0" max="1" step="0.1">
      <button on:click={sendInflateCommand}>Inflate</button>
    </div>
    
    <div class="control-group">
      <label>Deflate Intensity: {deflate.toFixed(1)}</label>
      <input type="range" bind:value={deflate} min="0" max="1" step="0.1">
      <button on:click={sendDeflateCommand}>Deflate</button>
    </div>
  </div>
  
  <!-- Status Log -->
  <div class="control-panel">
    <h3>Status Log</h3>
    <div class="status">
      {#each statusLog as entry}
        <div class="{entry.type}">[{entry.timestamp}] {entry.message}</div>
      {/each}
    </div>
    <button on:click={clearLog}>Clear Log</button>
  </div>
</div>