<!-- src/routes/(flight)/+layout.svelte -->

<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

{@render children()}

