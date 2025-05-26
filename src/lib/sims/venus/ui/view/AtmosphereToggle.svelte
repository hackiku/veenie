<!-- src/lib/sims/venus/controls/AtmosphereToggle.svelte -->
<script lang="ts">
  // Props using runes
  let { 
    showAtmosphere = true,
    onToggle = () => {}
  } = $props<{
    showAtmosphere: boolean;
    onToggle?: () => void;
  }>();
</script>

<div class="mb-4">
  <div class="flex items-center mb-2">
    <label class="inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={showAtmosphere}
        onchange={onToggle}
        class="sr-only peer"
      />
      <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
      <span class="ml-3 text-sm font-medium">Show Atmosphere</span>
    </label>
  </div>
</div>