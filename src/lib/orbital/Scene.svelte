<!-- lib/orbital/Scene.svelte -->
<script>
	import { T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { onMount, onDestroy } from "svelte";

	// Props for scene control
	export let scrollY = 0;
	export let currentTime = new Date();
	export let timeScale = 0;
	let totalSections = 7;

	// Calculate which section we're in based on scroll
	$: sectionIndex = Math.min(
		Math.floor(scrollY / (window.innerHeight * 0.8) || 0),
		totalSections - 1,
	);

	// Venus and Earth orbital parameters (simplified)
	const venusOrbitRadius = 8;
	const earthOrbitRadius = 12;
	const venusSize = 0.6;
	const earthSize = 0.65;
	const sunSize = 2;

	// Animation state
	let venusAngle = 0;
	let earthAngle = 0;
	let animationFrameId;

	// Animation loop
	onMount(() => {
		const animate = () => {
			// Adjust speed based on timeScale
			const speedFactor = timeScale === 0 ? 0 : timeScale;

			// Rotate planets
			venusAngle += 0.001 * speedFactor;
			earthAngle += 0.0006 * speedFactor;

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	});

	onDestroy(() => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	// Calculate positions
	$: venusX = Math.sin(venusAngle) * venusOrbitRadius;
	$: venusZ = Math.cos(venusAngle) * venusOrbitRadius;

	$: earthX = Math.sin(earthAngle) * earthOrbitRadius;
	$: earthZ = Math.cos(earthAngle) * earthOrbitRadius;

	// Camera positions for each section
	const cameraPoses = [
		{ x: 20, y: 8, z: 20 }, // Initial overview
		{ x: 12, y: 4, z: 12 }, // Test pilot section - closer to Venus
		{ x: 10, y: 3, z: 10 }, // Infrastructure section
		{ x: 20, y: 8, z: 20 }, // Back to overview
	];

	// Camera state
	let cameraPosition = cameraPoses[0];

	// Update camera based on section
	$: {
		const idx = Math.min(sectionIndex, cameraPoses.length - 1);
		cameraPosition = cameraPoses[idx];
	}
</script>

<T.PerspectiveCamera
	position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
	fov={60}
	makeDefault
>
	<OrbitControls
		enableZoom={true}
		enablePan={true}
		enableDamping={true}
		dampingFactor={0.1}
		touchEnabled={true}
		enableRotate={true}
		zoomSpeed={0.8}
		panSpeed={0.5}
		rotateSpeed={0.8}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 10]} intensity={1.5} />
<T.AmbientLight intensity={0.2} />

<!-- Sun -->
<T.Group>
	<T.Mesh>
		<T.SphereGeometry args={[sunSize, 32, 32]} />
		<T.MeshStandardMaterial
			color="#FFA500"
			emissive="#FF4500"
			emissiveIntensity={0.5}
		/>
	</T.Mesh>
	<!-- Add a subtle glow effect -->
	<T.PointLight
		position={[0, 0, 0]}
		distance={30}
		intensity={2}
		color="#FFDD99"
	/>
</T.Group>

<!-- Venus -->
<T.Group position={[venusX, 0, venusZ]}>
	<T.Mesh>
		<T.SphereGeometry args={[venusSize, 32, 32]} />
		<T.MeshStandardMaterial color="#C9977A" />
	</T.Mesh>
</T.Group>

<!-- Earth -->
<T.Group position={[earthX, 0, earthZ]}>
	<T.Mesh>
		<T.SphereGeometry args={[earthSize, 32, 32]} />
		<T.MeshStandardMaterial color="#4F73A0" />
	</T.Mesh>
</T.Group>

<!-- Venus orbit path -->
<T.LineLoop>
	<T.BufferGeometry>
		<T.Float32BufferAttribute
			attach="attributes-position"
			args={[
				Array.from({ length: 64 }, (_, i) => {
					const angle = (i / 64) * Math.PI * 2;
					return [
						Math.sin(angle) * venusOrbitRadius,
						0,
						Math.cos(angle) * venusOrbitRadius,
					];
				}).flat(),
				3,
			]}
		/>
	</T.BufferGeometry>
	<T.LineBasicMaterial color="#C9977A" opacity={0.3} transparent={true} />
</T.LineLoop>

<!-- Earth orbit path -->
<T.LineLoop>
	<T.BufferGeometry>
		<T.Float32BufferAttribute
			attach="attributes-position"
			args={[
				Array.from({ length: 64 }, (_, i) => {
					const angle = (i / 64) * Math.PI * 2;
					return [
						Math.sin(angle) * earthOrbitRadius,
						0,
						Math.cos(angle) * earthOrbitRadius,
					];
				}).flat(),
				3,
			]}
		/>
	</T.BufferGeometry>
	<T.LineBasicMaterial color="#4F73A0" opacity={0.3} transparent={true} />
</T.LineLoop>
