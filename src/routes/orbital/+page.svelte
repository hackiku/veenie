<!-- src/routes/space/+page.svelte -->
<script lang="ts">
  import Space from '$lib/sims/space/Space.svelte';
  import Nav from '$lib/ui/Nav.svelte';
	  
</script>

<Nav />

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <Space />
</div>