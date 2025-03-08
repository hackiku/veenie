<!-- /src/routes/orbit/+page.svelte -->

<script lang="ts">
  import Simulation from '$lib/sims/orbit/Simulation.svelte';
</script>

<div class="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
  <Simulation initialConfig="venus" />
</div>