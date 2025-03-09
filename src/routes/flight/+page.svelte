<!-- src/routes/flight/+page.svelte -->
<script lang="ts">
  import FlightSim from '$lib/sims/flight/FlightSim.svelte';  

</script>

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <FlightSim />
</div>

