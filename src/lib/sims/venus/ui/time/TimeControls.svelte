<!-- src/lib/sims/venus/ui/time/TimeControls.svelte -->
<script lang="ts">
  import {
    Play,
    Pause,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
  } from "lucide-svelte";
  import { Slider } from "bits-ui";
  import { getVenusTime } from "../../context/time.svelte";

  // Get time context
  const venusTime = getVenusTime();

  // Time control state
  let timeDirection = $state('forward');
  let timeUnit = $state('hour');
  let multiplier = $state(1);

  // Time unit values (in seconds)
  const TIME_UNITS = {
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000
  };

  // Multiplier presets
  const multiplierPresets = [1, 10, 50, 100, 500, 1000];

  // Calculate and update time scale
  $effect(() => {
    const baseScale = TIME_UNITS[timeUnit];
    const directionMultiplier = timeDirection === 'forward' ? 1 : -1;
    const finalScale = directionMultiplier * baseScale * multiplier;
    venusTime.setTimeScale(finalScale);
  });

  // Control functions
  function togglePlayPause() {
    venusTime.toggle();
  }

  function resetTime() {
    venusTime.reset();
    timeDirection = 'forward';
    timeUnit = 'hour';
    multiplier = 1;
  }

  function setTimeDirection(direction) {
    timeDirection = direction;
  }

  function setTimeUnit(unit) {
    timeUnit = unit;
  }

  function setMultiplierPreset(preset) {
    multiplier = preset;
  }

  // Handle keyboard shortcuts
  $effect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        e.stopPropagation();
        togglePlayPause();
      } else if (e.key === "r" && e.ctrlKey) {
        e.preventDefault();
        resetTime();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  });

  // Get description
  function getTimeScaleDescription() {
    const direction = timeDirection === 'forward' ? '' : 'Reverse ';
    const scale = multiplier === 1 ? '' : `${multiplier}x `;
    return `${direction}${scale}${timeUnit}/sec`;
  }
</script>

<div class="bg-neutral-900/80 text-white p-3 rounded-lg backdrop-blur-sm">
  <div class="grid grid-cols-4 gap-4">
    
    <!-- Column 1: Time Information -->
    <div class="space-y-1">
      <div class="text-xs font-mono">{venusTime.getDateString()}</div>
      <div class="text-xs text-gray-300">
        Sim: {venusTime.getTimeString()}
      </div>
      <div class="text-xs text-gray-300">
        Rotation: {venusTime.state.venusRotation.toFixed(1)}°
      </div>
      <div class="text-xs text-green-300">
        {getTimeScaleDescription()}
      </div>
    </div>

    <!-- Column 2: Play/Pause and Reset -->
    <div class="space-y-2">
      <!-- Play/Pause and Reset -->
      <div class="flex gap-2 justify-center">
        <button
          onclick={togglePlayPause}
          class="p-2 text-white hover:text-green-400 transition-colors"
          title={venusTime.state.isPlaying ? "Pause" : "Play"}
        >
          {#if venusTime.state.isPlaying}
            <Pause size={18} />
          {:else}
            <Play size={18} />
          {/if}
        </button>

        <button
          onclick={resetTime}
          class="p-2 text-white hover:text-blue-400 transition-colors"
          title="Reset time"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <!-- Direction Controls -->
      <div class="flex gap-1 justify-center">
        <button
          onclick={() => setTimeDirection('backward')}
          class="p-1 text-white hover:text-red-400 transition-colors"
          class:text-red-400={timeDirection === 'backward'}
          title="Time backward"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onclick={() => setTimeDirection('forward')}
          class="p-1 text-white hover:text-green-400 transition-colors"
          class:text-green-400={timeDirection === 'forward'}
          title="Time forward"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>

    <!-- Column 3: Time Units -->
    <div class="space-y-2">
      <div class="text-xs text-center text-gray-400">Time Unit</div>
      <div class="grid grid-cols-2 gap-1">
        <button
          onclick={() => setTimeUnit('hour')}
          class="px-2 py-1 text-xs text-white border border-gray-600 rounded transition-colors"
          class:bg-blue-600={timeUnit === 'hour'}
          class:border-blue-400={timeUnit === 'hour'}
          title="hour per second (base)"
        >
          hour
        </button>
        <button
          onclick={() => setTimeUnit('day')}
          class="px-2 py-1 text-xs text-white border border-gray-600 rounded transition-colors"
          class:bg-blue-600={timeUnit === 'day'}
          class:border-blue-400={timeUnit === 'day'}
          title="day per second (base)"
        >
          day
        </button>
        <button
          onclick={() => setTimeUnit('week')}
          class="px-2 py-1 text-xs text-white border border-gray-600 rounded transition-colors"
          class:bg-blue-600={timeUnit === 'week'}
          class:border-blue-400={timeUnit === 'week'}
          title="week per second (base)"
        >
          week
        </button>
        <button
          onclick={() => setTimeUnit('month')}
          class="px-2 py-1 text-xs text-white border border-gray-600 rounded transition-colors"
          class:bg-blue-600={timeUnit === 'month'}
          class:border-blue-400={timeUnit === 'month'}
          title="month per second (base)"
        >
          month
        </button>
      </div>
    </div>

    <!-- Column 4: Multiplier -->
    <div class="space-y-2">
      <!-- Multiplier Slider -->
      <div class="space-y-1">
        <div class="text-xs text-center text-gray-400">Multiplier: {multiplier}x</div>
        <Slider.Root
          type="single"
          bind:value={multiplier}
          min={1}
          max={1000}
          step={1}
          class="relative flex w-full touch-none select-none items-center"
        >
          {#snippet children()}
            <span
              class="bg-gray-700 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
            >
              <Slider.Range class="bg-yellow-500 absolute h-full" />
            </span>
            <Slider.Thumb
              index={0}
              class="block size-4 cursor-pointer rounded-full border border-gray-400 bg-white shadow-sm hover:border-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 disabled:pointer-events-none disabled:opacity-50"
            />
          {/snippet}
        </Slider.Root>
      </div>

      <!-- Multiplier Presets -->
      <div class="flex gap-1 justify-center flex-wrap">
        {#each multiplierPresets as preset}
          <button
            onclick={() => setMultiplierPreset(preset)}
            class="px-1 py-0.5 text-xs text-white border border-gray-600 rounded transition-colors hover:text-yellow-400 hover:border-yellow-400"
            class:bg-yellow-600={multiplier === preset}
            class:border-yellow-400={multiplier === preset}
            title="Set {preset}x multiplier"
          >
            {preset}x
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>