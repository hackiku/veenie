<!-- src/routes/controlapi/+page.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  
  // Simple state - no complex reactivity
  let serverUrl = '';
  let sessionId = 'test-session';
  let status = 'ready';
  let lastResponse = '';
  
  // Control values
  let moveX = 0;
  let moveZ = 0;
  let yaw = 0;
  let sensitivity = 1.0;
  let inflate = 0;
  let deflate = 0;
  
  // Initialize
  if (browser) {
    serverUrl = window.location.origin;
  }
  
  // Simple API call
  async function sendCommand(type: string, params: any) {
    if (!browser) return;
    
    try {
      status = 'sending...';
      const response = await fetch(`${serverUrl}/api/controls/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          command: { type, ...params }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        status = '✓ success';
        lastResponse = `Queue: ${result.queueLength}`;
      } else {
        status = '✗ failed';
        lastResponse = result.error;
      }
    } catch (error) {
      status = '✗ error';
      lastResponse = error.message;
    }
    
    // Reset status after 2 seconds
    setTimeout(() => {
      if (status !== 'sending...') status = 'ready';
    }, 2000);
  }
  
  // Quick commands
  function move(x: number, z: number) {
    sendCommand('balloon.move', { direction: { x, z }, sensitivity });
  }
  
  function rotate(direction: number) {
    sendCommand('balloon.yaw', { direction, sensitivity });
  }
  
  function balloonControl(type: string, intensity: number) {
    sendCommand(`balloon.${type}`, { intensity });
  }
  
  function stop() {
    sendCommand('balloon.move', { direction: { x: 0, z: 0 } });
    sendCommand('balloon.yaw', { direction: 0 });
    sendCommand('balloon.inflate', { intensity: 0 });
    sendCommand('balloon.deflate', { intensity: 0 });
    moveX = moveZ = yaw = inflate = deflate = 0;
  }
  
  function sendAnalog() {
    if (Math.abs(moveX) > 0 || Math.abs(moveZ) > 0) {
      sendCommand('balloon.move', { direction: { x: moveX, z: moveZ }, sensitivity });
    }
    if (Math.abs(yaw) > 0) {
      sendCommand('balloon.yaw', { direction: yaw, sensitivity });
    }
    if (inflate > 0) {
      sendCommand('balloon.inflate', { intensity: inflate });
    }
    if (deflate > 0) {
      sendCommand('balloon.deflate', { intensity: deflate });
    }
  }
</script>

<svelte:head>
  <title>Balloon Control API Tester</title>
</svelte:head>

<main class="bg-neutral-950 w-screen px-20 py-12">
  <h1>🎈 Balloon Control Tester</h1>
  
  <!-- Status -->
  <div class="status-bar">
    Status: <span class="status {status.includes('✓') ? 'success' : status.includes('✗') ? 'error' : ''}">{status}</span>
    {#if lastResponse}
      | {lastResponse}
    {/if}
  </div>
  
  <!-- Connection -->
  <section>
    <h2>Connection</h2>
    <input bind:value={serverUrl} placeholder="Server URL">
    <input bind:value={sessionId} placeholder="Session ID">
  </section>
  
  <!-- Quick Tests -->
  <section>
    <h2>Quick Commands</h2>
    <div class="button-grid">
      <button onclick={() => balloonControl('inflate', 1)}>Inflate</button>
      <button onclick={() => balloonControl('deflate', 1)}>Deflate</button>
      <button onclick={() => move(1, 0)}>Move Right</button>
      <button onclick={() => move(-1, 0)}>Move Left</button>
      <button onclick={() => move(0, 1)}>Move Forward</button>
      <button onclick={() => move(0, -1)}>Move Back</button>
      <button onclick={() => rotate(-1)}>Yaw Left</button>
      <button onclick={() => rotate(1)}>Yaw Right</button>
      <button onclick={() => sendCommand('sim.reset', {})}>Reset</button>
      <button onclick={stop} class="stop">STOP ALL</button>
    </div>
  </section>
  
  <!-- Analog Controls -->
  <section>
    <h2>Analog Controls</h2>
    <div class="controls">
      <label>
        Move X: {moveX.toFixed(1)}
        <input type="range" bind:value={moveX} min="-1" max="1" step="0.1">
      </label>
      <label>
        Move Z: {moveZ.toFixed(1)}
        <input type="range" bind:value={moveZ} min="-1" max="1" step="0.1">
      </label>
      <label>
        Yaw: {yaw.toFixed(1)}
        <input type="range" bind:value={yaw} min="-1" max="1" step="0.1">
      </label>
      <label>
        Sensitivity: {sensitivity.toFixed(1)}
        <input type="range" bind:value={sensitivity} min="0.1" max="2" step="0.1">
      </label>
      <label>
        Inflate: {inflate.toFixed(1)}
        <input type="range" bind:value={inflate} min="0" max="1" step="0.1">
      </label>
      <label>
        Deflate: {deflate.toFixed(1)}
        <input type="range" bind:value={deflate} min="0" max="1" step="0.1">
      </label>
    </div>
    <button onclick={sendAnalog}>Send Analog Command</button>
  </section>
  
  <!-- Test Examples -->
  <section>
    <h2>Test Examples</h2>
    <div class="examples">
      <code>curl -X POST {serverUrl}/api/controls/command -H "Content-Type: application/json" -d '{`{"sessionId":"${sessionId}","command":{"type":"balloon.yaw","direction":-0.5}}`}'</code>
    </div>
  </section>
</main>

<style>
  main {
    margin: 0 auto;
    font-family: system-ui, sans-serif;
    background: #1a1a1a;
    color: #e0e0e0;
    min-height: 100vh;
  }
  
  h1 {
    color: #ffa500;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #87ceeb;
    font-size: 1.2em;
    margin: 20px 0 10px 0;
  }
  
  section {
    margin-bottom: 30px;
    padding: 15px;
    background: #2a2a2a;
    border-radius: 8px;
  }
  
  .status-bar {
    background: #333;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-family: monospace;
  }
  
  .status.success { color: #90ee90; }
  .status.error { color: #ff6b6b; }
  
  input[type="text"], input {
    background: #333;
    border: 1px solid #555;
    color: #e0e0e0;
    padding: 8px;
    border-radius: 4px;
    margin: 5px;
  }
  
  input[type="range"] {
    width: 100%;
  }
  
  button {
    background: #444;
    border: 1px solid #666;
    color: #e0e0e0;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #555;
  }
  
  button.stop {
    background: #cc4444;
    color: white;
  }
  
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 5px;
  }
  
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  .examples {
    background: #1a1a1a;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #90ee90;
    word-break: break-all;
  }
</style>