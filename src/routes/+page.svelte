<!-- src/routes/material/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
  import Nav from '$lib/ui/Nav.svelte';

	onMount(() => {
		goto('/balloon');
	});		

</script>

<Nav />

<!-- <div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden"> -->
<div class="fixed inset-0 h-screen w-screen overflow-hidden bg-black">  
	<!-- <MaterialSim /> -->
</div>
