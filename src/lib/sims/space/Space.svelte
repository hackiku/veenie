<!-- src/lib/sims/space/Space.svelte -->
<script lang="ts">
	import Scene from "./Scene.svelte";
	import BodiesControls from "./controls/BodiesControls.svelte";
	import TimeControls from "./controls/TimeControls.svelte";
	import { onMount } from "svelte";

	// State
	let simulationSpeed = $state(1);
	let focusedPlanet = $state("");
	let showControls = $state(false);
	let sceneRef: any;

	// Methods
	function toggleControls() {
		showControls = !showControls;
	}

	function handleFocusChange(planet: string) {
		focusedPlanet = planet;
		if (sceneRef?.focusOnPlanet) {
			console.log(`Space: focusing on ${planet}`);
			sceneRef.focusOnPlanet(planet);
		} else {
			console.warn("Space: sceneRef or focusOnPlanet method not available");
		}
	}

	function handleSpeedChange(speed: number) {
		simulationSpeed = speed;
		if (sceneRef?.setSimulationSpeed) {
			console.log(`Space: setting speed to ${speed}`);
			sceneRef.setSimulationSpeed(speed);
		} else {
			console.warn(
				"Space: sceneRef or setSimulationSpeed method not available",
			);
		}
	}

	// Keyboard handlers
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "c" || event.key === "C") {
			toggleControls();
		}

		// Speed controls with arrow keys
		if (event.key === "ArrowUp") {
			handleSpeedChange(simulationSpeed * 2);
			event.preventDefault();
		} else if (event.key === "ArrowDown") {
			handleSpeedChange(Math.max(0.1, simulationSpeed / 2));
			event.preventDefault();
		}
	}

	onMount(() => {
		console.log("Space component mounted");
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full h-full">
	<!-- Scene component -->
	<Scene bind:this={sceneRef} initialFocus={focusedPlanet} {simulationSpeed} />

	<div
		class="absolute bottom-4 left-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white max-w-xs z-10"
	>
		<TimeControls speed={simulationSpeed} onSpeedChange={handleSpeedChange} />
	</div>
	<!-- Controls Panel -->
	{#if showControls}
		<div
			class="absolute top-4 right-4 bg-black/80 p-4 rounded-md border border-purple-900/50 text-white max-w-xs z-10"
		>
			<h2 class="text-xl font-bold mb-2">Solar System</h2>

			<BodiesControls {focusedPlanet} onFocusChange={handleFocusChange} />

			<button
				class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm w-full"
				onclick={toggleControls}
			>
				Hide Controls
			</button>

			<div class="text-xs mt-3 text-gray-400">
				Press <kbd class="px-1 bg-gray-800 rounded">C</kbd> to toggle controls
			</div>
		</div>
	{:else}
		<button
			class="absolute top-4 right-4 px-3 py-1 bg-gray-800/50 hover:bg-gray-700/70 rounded text-white text-sm z-10"
			onclick={toggleControls}
		>
			Show Controls
		</button>
	{/if}
</div>
