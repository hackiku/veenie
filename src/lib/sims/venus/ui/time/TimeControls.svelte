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

  // Time scale slider value
  let timeScaleSlider = $state(1);

  // Time unit presets (simplified)
  const timeUnits = [
    { label: "hr", value: 3600, title: "1 hour per second" },
    { label: "day", value: 86400, title: "1 day per second" },
    { label: "week", value: 604800, title: "1 week per second" },
    { label: "mon", value: 2592000, title: "1 month per second" },
  ];

  // Multipliers for speed scaling
  const multipliers = [1, 10, 100, 1000];
  let currentMultiplierIndex = $state(0);

  function togglePlayPause() {
    venusTime.toggle();
  }

  function resetTime() {
    venusTime.reset();
    timeScaleSlider = 1;
    currentMultiplierIndex = 0;
  }

  // Update time scale when slider changes
  function handleSliderChange(value: number) {
    timeScaleSlider = value;
    venusTime.setTimeScale(value);
  }

  // Set time unit with current multiplier
  function setTimeUnit(unitValue: number, reverse: boolean = false) {
    const multiplier = multipliers[currentMultiplierIndex];
    const scale = (reverse ? -unitValue : unitValue) * multiplier;
    timeScaleSlider = scale;
    venusTime.setTimeScale(scale);
  }

  // Cycle through multipliers
  function cycleMultiplier() {
    currentMultiplierIndex = (currentMultiplierIndex + 1) % multipliers.length;
  }

  // Manual time flow controls
  function stepTimeForward() {
    const currentScale = Math.abs(timeScaleSlider);
    const newScale = currentScale > 0 ? currentScale : 1;
    timeScaleSlider = newScale;
    venusTime.setTimeScale(newScale);
  }

  function stepTimeBackward() {
    const currentScale = Math.abs(timeScaleSlider);
    const newScale = currentScale > 0 ? -currentScale : -1;
    timeScaleSlider = newScale;
    venusTime.setTimeScale(newScale);
  }

  // Handle keyboard shortcuts - Fixed
  $effect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in an input
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

    // Use capture phase to ensure we get the event first
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  // Get current multiplier
  const currentMultiplier = $derived(multipliers[currentMultiplierIndex]);
</script>

<div class="bg-neutral-900/80 text-white p-3 rounded-lg backdrop-blur-sm">
  <div class="grid grid-cols-3 gap-4">
    
    <!-- Column 1: Time Information -->
    <div class="space-y-1">
      <div class="text-xs font-mono">{venusTime.getDateString()}</div>
      <div class="text-xs text-gray-300">
        Sim: {venusTime.getTimeString()}
      </div>
      <div class="text-xs text-gray-300">
        Venus Day: {venusTime.state.venusDay}
      </div>
      <div class="text-xs text-gray-300">
        Rotation: {venusTime.state.venusRotation.toFixed(1)}°
      </div>
    </div>

    <!-- Column 2: Play/Pause and Multiplier -->
    <div class="space-y-2">
      <!-- Play/Pause and Reset Row -->
      <div class="flex gap-2 justify-center">
        <button
          onclick={togglePlayPause}
          class="p-1 text-white hover:text-green-400 transition-colors"
          title={venusTime.state.isPlaying ? "Pause" : "Play"}
        >
          {#if venusTime.state.isPlaying}
            <Pause size={16} />
          {:else}
            <Play size={16} />
          {/if}
        </button>

        <button
          onclick={resetTime}
          class="p-1 text-white hover:text-blue-400 transition-colors"
          title="Reset time"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <!-- Forward/Backward Flow Controls -->
      <div class="flex gap-2 justify-center">
        <button
          onclick={stepTimeBackward}
          class="p-1 text-white hover:text-red-400 transition-colors"
          title="Flow backward"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onclick={stepTimeForward}
          class="p-1 text-white hover:text-green-400 transition-colors"
          title="Flow forward"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <!-- Multiplier Control -->
      <div class="flex justify-center">
        <button
          onclick={cycleMultiplier}
          class="px-2 py-1 text-xs text-white hover:text-yellow-400 border border-gray-600 hover:border-yellow-400 rounded transition-colors"
          title="Click to cycle multiplier"
        >
          {currentMultiplier}x
        </button>
      </div>
    </div>

    <!-- Column 3: Slider and Units -->
    <div class="space-y-2">
      <!-- Time Scale Slider -->
      <div class="space-y-1">
        <Slider.Root
          type="single"
          bind:value={timeScaleSlider}
          onValueChange={(value) => handleSliderChange(value)}
          min={-10000}
          max={10000}
          step={1}
          class="relative flex w-full touch-none select-none items-center"
        >
          {#snippet children()}
            <span
              class="bg-gray-700 relative h-1 w-full grow cursor-pointer overflow-hidden rounded-full"
            >
              <Slider.Range class="bg-blue-500 absolute h-full" />
            </span>
            <Slider.Thumb
              index={0}
              class="block size-3 cursor-pointer rounded-full border border-gray-400 bg-white shadow-sm hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            />
          {/snippet}
        </Slider.Root>

        <!-- Current scale display -->
        <div class="text-xs text-center text-yellow-300">
          {timeScaleSlider}x {timeScaleSlider < 0 ? "(reverse)" : ""}
        </div>
      </div>

      <!-- Time Unit Presets -->
      <div class="space-y-1">
        <!-- Forward units -->
        <div class="flex gap-1 justify-center">
          {#each timeUnits as unit}
            <button
              onclick={() => setTimeUnit(unit.value, false)}
              class="px-2 py-1 text-xs text-white hover:text-green-400 border border-gray-600 hover:border-green-400 rounded transition-colors"
              title="Forward: {unit.title} × {currentMultiplier}"
            >
              {unit.label}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>