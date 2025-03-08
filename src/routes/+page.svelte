<!-- src/routes/space/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Space from '$lib/sims/space/Space.svelte';
  
  onMount(() => {
    console.log('Space page mounted');
  });
</script>

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <Space />
</div>