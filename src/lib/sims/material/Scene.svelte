<!-- src/lib/sims/material/Scene.svelte -->
<script lang="ts">
	import { T } from "@threlte/core";
	import { Gizmo, OrbitControls } from "@threlte/extras";
	import { getSimulationContext } from "./state/simulationContext.svelte";
	import { onMount, onDestroy } from "svelte";

	import Terrain from "./world/Terrain.svelte";
	import Balloon from "./world/Balloon.svelte";

	// Get simulation context for balloon tracking
	const sim = getSimulationContext();

	// Track reset counter to recreate components
	let resetCounter = $state(0);

	// Store the original reset function outside any effect
	const originalReset = sim.resetSimulation;

	// Initial camera position near balloon's starting point
	const initialCameraPosition = [50, 51060, 200];

	// References for camera and controls management
	let camera = $state(null);
	let controls = $state(null);
	let trackingInterval = $state(null);

	// Override reset function once on mount
	onMount(() => {
		// Override the reset function with our version
		sim.resetSimulation = () => {
			// Call the original
			originalReset();
			// Increment our counter
			resetCounter++;
		};

		return () => {
			// Restore original on cleanup
			sim.resetSimulation = originalReset;
		};
	});

	// Helper function to set up camera
	function setupCamera(cameraRef) {
		if (!cameraRef) return;
		camera = cameraRef;

		// Set near and far planes for high altitude viewing
		camera.near = 0.1;
		camera.far = 200000;
		camera.updateProjectionMatrix();

		// Initial targeting
		const balloonPos = sim?.getPosition() || [0, 51000, 0];
		camera.lookAt(balloonPos[0], balloonPos[1], balloonPos[2]);
	}

	// Helper function to set up controls
	function setupControls(controlsRef) {
		if (!controlsRef) return;
		controls = controlsRef;

		// Configure controls for high-altitude simulation
		const balloonPos = sim?.getPosition() || [0, 51000, 0];
		controls.target.set(balloonPos[0], balloonPos[1], balloonPos[2]);

		// Adjust orbit controls parameters for better camera freedom
		controls.minDistance = 1;
		controls.maxDistance = 2000; // Increased for better zooming
		controls.enableDamping = true;
		controls.dampingFactor = 0.25; // Reduced for smoother motion
		controls.rotateSpeed = 0.5; // Adjusted for better control
		controls.panSpeed = 0.8; // Increased pan speed
		controls.zoomSpeed = 1.2; // Increased zoom speed

		// Force update
		controls.update();

		// Start tracking when controls are ready
		if (trackingInterval) clearInterval(trackingInterval);
		trackingInterval = setInterval(trackBalloon, 1000);
	}

	// Track balloon position
	function trackBalloon() {
		if (!controls || !sim) return;

		// Get current balloon position
		const balloonPos = sim.getPosition();

		// Calculate distance from current target to balloon
		const distanceSquared =
			Math.pow(controls.target.x - balloonPos[0], 2) +
			Math.pow(controls.target.y - balloonPos[1], 2) +
			Math.pow(controls.target.z - balloonPos[2], 2);

		// If balloon moved significantly, update camera target
		if (distanceSquared > 2500) {
			// 50 units threshold
			controls.target.set(balloonPos[0], balloonPos[1], balloonPos[2]);
			controls.update();
		}
	}

	// Clean up on component destroy
	onDestroy(() => {
		if (trackingInterval) {
			clearInterval(trackingInterval);
		}

		// Restore original reset function if component is destroyed
		sim.resetSimulation = originalReset;
	});
</script>

<!-- Camera setup -->
<T.PerspectiveCamera
	makeDefault
	position={initialCameraPosition}
	fov={70}
	aspect={window.innerWidth / window.innerHeight}
	near={0.1}
	far={200000}
	oncreate={setupCamera}
>
	<!-- OrbitControls as a separate component, not in a snippet -->
	<OrbitControls
		enableZoom={true}
		enablePan={true}
		enableRotate={true}
		oncreate={setupControls}
	>
		<Gizmo />
	</OrbitControls>
</T.PerspectiveCamera>
<!-- Lights -->
<T.DirectionalLight castShadow position={[8, 51020, -3]} intensity={1.5} />

<T.AmbientLight intensity={0.6} />

<!-- Venus atmosphere color -->
<T.FogExp2 color="#FFE0B2" density={0.00001} />

<!-- Use #key to completely recreate balloon when resetCounter changes -->
{#key resetCounter}
	<Balloon />
{/key}

<!-- Terrain doesn't need to be reset -->
<Terrain />
