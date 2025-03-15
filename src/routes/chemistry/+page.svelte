<!-- src/routes/chemistry/+page.svelte -->
<script lang="ts">
  import ChemistrySim from '$lib/sims/chemistry/ChemistrySim.svelte';
  import Info from '$lib/sims/chemistry/ui/Info.svelte';
  import Nav from '$lib/ui/Nav.svelte';
  
  // Show/hide the info panel
  let showInfo = $state(false);
  
  // Toggle info panel visibility
  function toggleInfo() {
    showInfo = !showInfo;
  }
  
  // Event listener for the Info component
  function handleToggleInfo() {
    toggleInfo();
  }
</script>

<Nav />

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <ChemistrySim />
</div>

<!-- Info panel component -->
<Info 
  showInfo={showInfo}
  on:toggleInfo={handleToggleInfo}
/>