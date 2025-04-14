<!-- src/lib/ui/Nav.svelte -->
<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment'; // Import browser check

	let menuOpen = $state(false);
	let navElement: HTMLElement | undefined = $state(); // Reference to the nav container

	// Reintroduce active route logic
	let activeRoute = $state('');
	$effect(() => {
		if ($page.url) { // Ensure url is available
			activeRoute = $page.url.pathname;
		}
	});

	const navItems = $state([
		// Adding Home/Orbital back explicitly if needed
		{ name: 'Orbital', path: '/' },
		{ name: 'Planet', path: '/planet' },
		{ name: 'Flight', path: '/flight' },
		{ name: 'Balloon', path: '/material' }, // Mapping to your /material route
		{ name: 'Venus', path: '/venus' },
		{ name: '2B', path: '/2body' }
	]);

	function toggleMenu(event?: MouseEvent): void {
		// Prevent click from propagating if it's from the button
		event?.stopPropagation();
		menuOpen = !menuOpen;
	}

	// Close menu when clicking a link
	function handleLinkClick(): void {
		menuOpen = false;
	}

	// Helper function to determine if a route is active
	function isActive(path: string): boolean {
		return activeRoute === path;
	}

	// Click outside logic
	function handleClickOutside(event: MouseEvent) {
		if (menuOpen && navElement && !navElement.contains(event.target as Node)) {
			menuOpen = false;
		}
	}

	// Add global listener only on client-side
	onMount(() => {
		if (browser) {
			window.addEventListener('click', handleClickOutside);
		}
		return () => {
			if (browser) {
				window.removeEventListener('click', handleClickOutside);
			}
		};
	});

</script>

<!-- Container for button and menu, bound for click-outside detection -->
<div bind:this={navElement} class="fixed top-4 right-4 z-[2147483647]">
	<!-- Max possible z-index -->
	<button
		onclick={toggleMenu}
		class="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-400 transition-colors duration-150"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
	>
		{#if menuOpen}
			<X size={24} class="block h-6 w-6" />
		{:else}
			<Menu size={24} class="block h-6 w-6" />
		{/if}
	</button>

	{#if menuOpen}
		<!-- Using key ensures transition runs on open/close -->
		{#key menuOpen}
			<nav
				class="absolute top-full right-0 mt-2 w-56 origin-top-right rounded-lg bg-neutral-900/80 backdrop-blur-md shadow-xl ring-1 ring-neutral-700/50 focus:outline-none py-1 transition-opacity duration-150"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
				transition:fly={{ y: -5, duration: 150 }}
			>
				<div class="py-1" role="none">
					{#each navItems as item}
						<a
							href={item.path}
							class="
                text-neutral-300 hover:bg-neutral-700/60 hover:text-white
                block px-4 py-2 text-sm font-mono transition-colors duration-150 rounded-md mx-1 my-0.5
                {isActive(item.path) ? 'bg-neutral-700 text-white' : ''}
              "
							role="menuitem"
							tabindex="-1"
							onclick={handleLinkClick}
						>
							{item.name}
						</a>
					{/each}
				</div>
			</nav>
		{/key}
	{/if}
</div>