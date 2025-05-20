<!-- src/lib/sims/balloon/ui/CameraSelector.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  
  // Position for the selector
  let { 
    position = "top-left" 
  } = $props();
  
  // Position classes
  const positionClasses = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-14 right-4",
    "top-left": "fixed top-12 left-4" // Below camera mode indicator
  };
  
  // Camera modes
  const modes = [
    { id: 'third-person', label: 'Third Person', icon: '🔭' },
    { id: 'first-person', label: 'First Person', icon: '👁️' },
    { id: 'orbit', label: 'Orbit', icon: '🌐' },
    { id: 'top-down', label: 'Top-Down', icon: '⬇️' }
  ];
  
  // Currently active mode
  let activeMode = $state('third-person');
  
  // Try to get camera component reference from scene
  // Note: This would require the camera to be exposed via context or props
  // For now this is a placeholder
  function changeCamera(mode) {
    activeMode = mode;
    
    // Dispatch event for parent components to handle
    dispatch('cameraChange', { mode });
    
    // Close dropdown after selection
    isOpen = false;
  }
  
  // Dropdown state
  let isOpen = $state(false);
  
  // Toggle dropdown
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  // Close on outside click
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.camera-selector')) {
      isOpen = false;
    }
  }
  
  // Create custom event dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  // Add click outside handler
  import { onMount } from 'svelte';
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="{positionClasses[position]} z-30 camera-selector">
  <!-- Main dropdown button -->
  <button 
    class="bg-black/60 text-white rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-black/80 transition-colors"
    onclick={toggleDropdown}
  >
    <span class="text-lg">
      {modes.find(m => m.id === activeMode)?.icon || '📷'}
    </span>
    <span>Camera</span>
    <span class="text-xs opacity-70">▼</span>
  </button>
  
  <!-- Dropdown options -->
  {#if isOpen}
    <div class="absolute top-full left-0 mt-1 bg-black/80 backdrop-blur-sm rounded-md overflow-hidden w-36">
      {#each modes as mode}
        <button
          class="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors {activeMode === mode.id ? 'text-blue-300' : 'text-white'}"
          onclick={() => changeCamera(mode.id)}
        >
          <span class="text-lg">{mode.icon}</span>
          <span>{mode.label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>