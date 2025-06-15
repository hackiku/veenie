<!-- src/routes/(flight)/fog/+page.svelte -->
<script lang="ts">
  import Nav from '$lib/ui/Nav.svelte';
  import FogSim from '$lib/sims/fog/FogSim.svelte';
</script>

<svelte:head>
  <title>Venus Atmosphere Explorer - Fog Testing</title>
</svelte:head>

<Nav />

<!-- Full screen fog simulation -->
<div class="fixed inset-0 h-screen w-screen overflow-hidden bg-black">  
  <FogSim />
</div>