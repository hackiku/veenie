<!-- src/lib/content/Hero.svelte -->
<script lang="ts">
	// You can add props here if needed later
</script>

<!-- Test Pilot Section -->
<section
	class="min-h-screen flex flex-col justify-center px-[8vw] relative z-10"
>
	<div class="max-w-4xl">
		<div class="text-purple-400 mb-4 font-mono">01</div>
		<h2 class="text-4xl md:text-5xl font-medium mb-6">Send test pilot</h2>
		<p class="text-xl md:text-2xl text-gray-300 max-w-2xl">
			5m³ research station with onboard AI to the Venus upper atmosphere
			(45-60km). The test pilot interprets data in real-time, reporting back
			findings with personality.
		</p>

		<!-- Engineering interface elements -->
		<div class="mt-12 grid grid-cols-2 gap-6 max-w-xl">
			<div class="border border-purple-700/50 bg-purple-900/20 p-4 rounded-md">
				<div class="text-xs text-purple-400 mb-1">ALTITUDE</div>
				<div class="text-2xl font-bold">50km</div>
				<div class="text-xs text-gray-400 mt-1">Earth-like conditions</div>
			</div>
			<div class="border border-purple-700/50 bg-purple-900/20 p-4 rounded-md">
				<div class="text-xs text-purple-400 mb-1">PAYLOAD</div>
				<div class="text-2xl font-bold">5m³</div>
				<div class="text-xs text-gray-400 mt-1">Initial research station</div>
			</div>
		</div>
	</div>
</section>
