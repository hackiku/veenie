<!-- src/lib/ui/controls/time/PlayControls.svelte -->
<script lang="ts">
  import { Play, Pause, RotateCcw, Rewind, FastForward } from 'lucide-svelte';
  
  // Props with defaults
  let { 
    playing = false,
    showReset = true,
    showRewind = false,
    showFastForward = false,
    theme = 'dark',
    size = 'medium',
    vertical = false
  } = $props<{
    playing: boolean;
    showReset?: boolean;
    showRewind?: boolean;
    showFastForward?: boolean;
    theme?: 'dark' | 'light';
    size?: 'small' | 'medium' | 'large';
    vertical?: boolean;
  }>();
  
  // Events
  const playPause = createEventDispatcher<{ toggle: void }>();
  const reset = createEventDispatcher<{ reset: void }>();
  const rewind = createEventDispatcher<{ rewind: void }>();
  const fastForward = createEventDispatcher<{ fastForward: void }>();
  
  // Toggle play/pause
  function togglePlay() {
    playPause.dispatch('toggle');
  }
  
  // Reset
  function handleReset() {
    reset.dispatch('reset');
  }
  
  // Rewind
  function handleRewind() {
    rewind.dispatch('rewind');
  }
  
  // Fast Forward
  function handleFastForward() {
    fastForward.dispatch('fastForward');
  }
  
  // Size mappings
  const sizeMap = {
    small: {
      button: 'w-8 h-8',
      icon: 14
    },
    medium: {
      button: 'w-12 h-12',
      icon: 20
    },
    large: {
      button: 'w-16 h-16',
      icon: 28
    }
  };
  
  // Theme mappings
  const themeMap = {
    dark: {
      playPause: 'bg-blue-600/80 hover:bg-blue-700 text-white',
      reset: 'bg-gray-600/80 hover:bg-gray-700 text-white',
      secondary: 'bg-indigo-600/80 hover:bg-indigo-700 text-white'
    },
    light: {
      playPause: 'bg-blue-500 hover:bg-blue-600 text-white',
      reset: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
      secondary: 'bg-indigo-400 hover:bg-indigo-500 text-white'
    }
  };
  
  // Current styles based on props
  const buttonSize = $derived(sizeMap[size].button);
  const iconSize = $derived(sizeMap[size].icon);
  const playButtonStyle = $derived(themeMap[theme].playPause);
  const resetButtonStyle = $derived(themeMap[theme].reset);
  const secondaryButtonStyle = $derived(themeMap[theme].secondary);
  
  import { createEventDispatcher } from 'svelte';
</script>

<div class="flex {vertical ? 'flex-col' : 'flex-row'} {vertical ? 'gap-2' : 'gap-3'} items-center">
  {#if showRewind}
    <button
      class="flex items-center justify-center {buttonSize} {secondaryButtonStyle} rounded-full transition shadow-lg backdrop-blur-sm"
      onclick={handleRewind}
      title="Rewind"
    >
      <Rewind size={iconSize} />
    </button>
  {/if}
  
  <button
    class="flex items-center justify-center {buttonSize} {playButtonStyle} rounded-full transition shadow-lg backdrop-blur-sm"
    onclick={togglePlay}
    title={playing ? 'Pause' : 'Play'}
  >
    {#if playing}
      <Pause size={iconSize} />
    {:else}
      <Play size={iconSize} />
    {/if}
  </button>
  
  {#if showReset}
    <button
      class="flex items-center justify-center {buttonSize} {resetButtonStyle} rounded-full transition shadow-lg backdrop-blur-sm"
      onclick={handleReset}
      title="Reset"
    >
      <RotateCcw size={iconSize} />
    </button>
  {/if}
  
  {#if showFastForward}
    <button
      class="flex items-center justify-center {buttonSize} {secondaryButtonStyle} rounded-full transition shadow-lg backdrop-blur-sm"
      onclick={handleFastForward}
      title="Fast Forward"
    >
      <FastForward size={iconSize} />
    </button>
  {/if}
</div>