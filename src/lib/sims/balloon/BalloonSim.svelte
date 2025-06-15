<!-- src/lib/sims/balloon/BalloonSim.svelte -->
<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { Copy, Webhook} from "@lucide/svelte";
	import { Button } from "bits-ui";
	import Scene from "./world/Scene.svelte";
	import VenusSky from "./world/sky/VenusSky.svelte";

	// UI Components
	import SimControls from "./ui/controls/SimControls.svelte";
	import PlayPause from "./ui/controls/PlayPause.svelte";
	// import CameraSelector from "./ui/CameraSelector.svelte";
	import InteractiveCamera from "./world/InteractiveCamera.svelte";
	import Instruments from "./ui/Instruments.svelte";

	// Control System
	import { createControlContext } from "./context/controls.svelte";

	// Create the unified control context FIRST
	const controls = createControlContext();

	import { SIMULATION_CONSTANTS } from "./constants";
	import { getPhysicsEngine } from "./physics/engine";

	// Get the physics engine
	const engine = getPhysicsEngine();

	// Generate a session ID for this simulation instance
	const sessionId = $state(
		`sim-${Date.now()}-${Math.random().toString(36).slice(2)}`,
	);

	// MISSING PROPS - Add simulation state tracking
	let stepCount = $state(0);
	let singleStep = $state(false);
	let showApiControls = $state(false);

	// Enhanced telemetry data for UI with yaw
	let telemetry = $state({
		altitude: SIMULATION_CONSTANTS.BALLOON_INITIAL_HEIGHT,
		balloonSize: SIMULATION_CONSTANTS.BALLOON_INITIAL_SIZE,
		balloonMass: SIMULATION_CONSTANTS.BALLOON_MASS,
		airDensity: 0,
		buoyancy: 0,
		temperature: 27,
		globalPosition: { latitude: 0, longitude: 0 },
		yawRate: 0,
		controlIntensity: { movement: 0, rotation: 0, balloon: 0 },
	});

	// Camera heading for compass or balloon
	let cameraHeading = $state(0);
	let balloonHeading = $state(0);

	// Sky settings
	let skyExposure = $state(0.35);
	let disableAtmosphere = $state(true);

	// Enhanced telemetry update to capture balloon heading
	function updateTelemetryWithHeading(newData) {
		// Get balloon rotation from engine
		const balloonRotation = engine.getBalloonRotation();

		// Extract yaw (Y-axis rotation) for compass
		balloonHeading = balloonRotation.y;

		// Update telemetry with new data
		telemetry = { ...telemetry, ...newData };

		// Increment step count for Scene component
		stepCount++;
	}

	// API Command Polling
	$effect(() => {
		if (typeof window === "undefined") return;

		let pollInterval: number;

		const pollForCommands = async () => {
			try {
				const response = await fetch(
					`/api/controls/command?sessionId=${sessionId}`,
				);
				const data = await response.json();

				if (data.success && data.commands.length > 0) {
					// Execute each command through our control system
					for (const command of data.commands) {
						const result = controls.executeCommand(command);
						if (!result) {
							console.warn("Failed to execute command:", command);
						}
					}
				}
			} catch (error) {
				// Silently fail - API might not be available in dev mode
				console.debug("API polling error:", error);
			}
		};

		// Start polling
		pollInterval = setInterval(pollForCommands, 100);

		// Cleanup when component unmounts
		return () => {
			if (pollInterval) clearInterval(pollInterval);
		};
	});

	// Legacy support for existing components
	const legacyActions = {
		toggleSimulation: controls.actions.togglePause,
		doSingleStep: () => {
			controls.actions.step();
			singleStep = true; // Set single step flag
			// Reset after a frame
			setTimeout(() => (singleStep = false), 16);
		},
		restartSimulation: () => {
			controls.actions.reset();
			stepCount = 0; // Reset step count
		},
	};

	function copyCommand() {
		const command = `curl -X POST http://localhost:5173/api/controls/command \\
-H "Content-Type: application/json" \\
-d '{"sessionId": "${sessionId}","command": {"type": "balloon.inflate", "intensity": 0.8}}'`;
		navigator.clipboard.writeText(command);
	}

	// Toggle atmosphere for testing
	function toggleAtmosphere() {
		disableAtmosphere = !disableAtmosphere;
	}
</script>

<div class="relative w-full h-screen overflow-hidden">
	<Canvas>
		<VenusSky
			setEnvironment={true}
			autoTransition={true}
			balloonAltitude={telemetry.altitude}
			exposure={skyExposure}
		/>

		<!-- Main Scene with ALL required props -->
		<Scene
			{telemetry}
			updateTelemetry={updateTelemetryWithHeading}
			{stepCount}
			running={!controls.state.simulation.paused}
			{singleStep}
			exposure={skyExposure}
			{disableAtmosphere}
		/>
	</Canvas>

	<!-- Simulation Controls -->
	<div class="absolute top-2 left-2 z-10">
		<SimControls {telemetry} />
	</div>

	<!-- Play/Pause Controls -->
	<div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
		<PlayPause
			running={!controls.state.simulation.paused}
			toggleSimulation={legacyActions.toggleSimulation}
			doSingleStep={legacyActions.doSingleStep}
			restartSimulation={legacyActions.restartSimulation}
		/>
	</div>

	<!-- Enhanced Instrument Panel with balloon heading -->
	<Instruments {telemetry} {cameraHeading} {balloonHeading} layout="default" />

	<!-- Enhanced Development Info Panel -->

	{#if import.meta.env.DEV}
		<Button.Root
			class="h-10 w-10 z-20 aspect-square fixed top-20 right-2"
			onclick={() => (showApiControls = !showApiControls)}
		>
		<Webhook/>
		</Button.Root>

			{#if showApiControls}
				<div
					class="absolute top-2 right-2 bg-black/60 text-white p-3 rounded text-xs font-mono z-10 max-w-xs"
				>
					<div class="font-bold text-yellow-300 mb-2">
						🎮 Enhanced Control System
					</div>

					<div class="grid grid-cols-2 gap-x-4 gap-y-1">
						<div>Session: {sessionId.slice(-10)}</div>
						<div>Commands: {controls.status.commandCount}</div>
						<div>Steps: {stepCount}</div>
						<div>State: {controls.status.isPaused ? "PAUSED" : "RUNNING"}</div>
						<div>Moving: {controls.status.isMoving ? "YES" : "NO"}</div>
						<div>Rotating: {controls.status.isRotating ? "YES" : "NO"}</div>
						<div>
							Balloon: {controls.status.isBalloonActive ? "ACTIVE" : "NEUTRAL"}
						</div>
					</div>

					<!-- Quick Toggle Button -->

					<div class="mt-3 pt-2 text-xs text-white/50">
						<div
							class="relative mt-1 p-1 bg-black/50 rounded text-[10px] break-all"
						>
							<button
								onclick={copyCommand}
								class="absolute -top-4 right-1 text-white/40 hover:text-white"
								aria-label="Copy to clipboard"
							>
								<Copy class="w-4 h-4" />
							</button>
							curl -X POST http://localhost:5173/api/controls/command \<br />
							-H "Content-Type: application/json" \<br />
							-d '{"{"}"sessionId": "{sessionId}",<br />
							"command": {"{"}"type": "balloon.inflate", "intensity": 0.8{"}"}{"}"}'
						</div>
					</div>
				</div>
			{/if}
	{/if}
</div>
