<!-- src/routes/balloon/+page.svelte -->
<script lang="ts">
  import Nav from '$lib/ui/Nav.svelte';
	import BalloonSim from '$lib/sims/balloon/BalloonSim.svelte';

</script>

<Nav />

<!-- <div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden"> -->
<div class="fixed inset-0 h-screen w-screen overflow-hidden bg-black">  
	<BalloonSim />
</div>
