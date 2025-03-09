<!-- src/lib/sims/flight/scene/Grid.svelte -->

<script>
	import { T } from "@threlte/core";
	import { Grid as ThrelteGrid } from "@threlte/extras";

	// Props
	let visible = true;

	// Grid properties using runes
	const props = $state({
		position: [0, 0, 0], // Set at altitude 0 (surface level)
		cellColor: "#6f6f6f",
		sectionColor: "#9d4b4b",
		sectionThickness: 1,
		cellSize: 10,
		sectionSize: 1000,
		fadeDistance: 2000,
		fadeStrength: 1.5,
		infiniteGrid: true,
		visible,
	});

	// Update when props change
	$effect(() => {
		props.visible = visible;
	});

	// Altitude markers
	const altitudeMarkers = [
		{ altitude: 20, label: "Lower Haze (20km)", color: "#ff9933" },
		{ altitude: 50, label: "Cloud Layer (50km)", color: "#ffffff" },
		{ altitude: 70, label: "Upper Haze (70km)", color: "#66ccff" },
	];
</script>

{#if props.visible}
	<!-- Main grid -->
	<ThrelteGrid
		position={props.position}
		cellColor={props.cellColor}
		sectionColor={props.sectionColor}
		sectionThickness={props.sectionThickness}
		cellSize={props.cellSize}
		sectionSize={props.sectionSize}
		fadeDistance={props.fadeDistance}
		fadeStrength={props.fadeStrength}
		infiniteGrid={true}
	/>

	<!-- Coordinate axes helper -->
	<T.Group position={[0, 0, 0]}>
		<T.AxesHelper args={[20]} />
	</T.Group>

	<!-- Axes labels -->
	<T.Group position={[22, 0, 0]}>
		<T.Mesh>
			<T.SphereGeometry args={[1, 8, 8]} />
			<T.MeshBasicMaterial color="red" />
		</T.Mesh>
	</T.Group>

	<T.Group position={[0, 22, 0]}>
		<T.Mesh>
			<T.SphereGeometry args={[1, 8, 8]} />
			<T.MeshBasicMaterial color="green" />
		</T.Mesh>
	</T.Group>

	<T.Group position={[0, 0, 22]}>
		<T.Mesh>
			<T.SphereGeometry args={[1, 8, 8]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	</T.Group>

	<!-- Altitude markers for Venus layers -->
	{#each altitudeMarkers as marker}
		<T.Group position={[0, marker.altitude, 0]}>
			<!-- Ring showing altitude level -->
			<T.Mesh>
				<T.TorusGeometry args={[100, 0.5, 16, 100]} />
				<T.MeshBasicMaterial
					color={marker.color}
					transparent={true}
					opacity={0.4}
					depthWrite={false}
				/>
			</T.Mesh>
		</T.Group>
	{/each}
{/if}
