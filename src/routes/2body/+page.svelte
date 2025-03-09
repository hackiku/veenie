<!-- src/routes/2body/+page.svelte -->
<script>
  import { Canvas } from '@threlte/core';
  import { World } from '@threlte/rapier';
  import Scene from './Scene.svelte';
  import Controls from './Controls.svelte';
  import Nav from '$lib/ui/Nav.svelte';
  // State with runes
  let showDebug = $state(false);
  let gravityStrength = $state(6.674e-2);
  let initialVelocity = $state(2);
  let moonMass = $state(0.1);
  
  // Connection between components
  function toggleDebug() {
    showDebug = !showDebug;
  }
</script>

<Nav />

<div class="fixed top-4 left-4 z-20">
  <Controls 
    bind:gravityStrength
    bind:initialVelocity
    bind:moonMass
    bind:showDebug={showDebug}
    onDebugToggle={toggleDebug}
  />
</div>

<div class="w-full h-screen bg-indigo-950">
  <Canvas>
    <World gravity={[0, 0, 0]}>
      {#if showDebug}
        <!-- Dynamic import of Debug component to avoid mouse issues when not using it -->
        {@const { Debug } = module('@threlte/rapier')}
        <Debug />
      {/if}
      
      <Scene 
        {gravityStrength}
        {initialVelocity}
        {moonMass}
      />
    </World>
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>