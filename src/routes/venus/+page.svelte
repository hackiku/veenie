<!-- src/routes/venus/+page.svelte -->
<script lang="ts">
  import VenusSim from '$lib/sims/venus/VenusSim.svelte';
  // import DataDisplay from '$lib/sims/venus/content/info/DataDisplay.svelte';
  import Nav from '$lib/ui/Nav.svelte';

  // Page state
  
</script>

<Nav />

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <VenusSim />
</div>

