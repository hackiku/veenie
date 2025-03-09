<!-- src/lib/sims/flight/scene/Clouds.svelte -->

<script>
  import { T } from "@threlte/core";
  import { flightStore } from '$lib/stores/flightStore';
  
  // Cloud layer properties (based on Venus atmospheric data)
  const CLOUD_LAYER = {
    startAltitude: 45,
    endAltitude: 60,
    centerAltitude: 52.5,
    color: "#fffaf0", // Whitish clouds
    particleCount: 20
  };
  
  // Subscribe to the flight store to get current altitude
  let flightState = $state(null);
  
  $effect(() => {
    const unsubFlightStore = flightStore.subscribe(state => {
      flightState = state;
    });
    
    return () => {
      unsubFlightStore();
    };
  });
  
  // Generate cloud particles
  const cloudParticles = Array.from({ length: CLOUD_LAYER.particleCount }, (_, i) => {
    const angle = (i / CLOUD_LAYER.particleCount) * Math.PI * 2;
    const radius = 100 + Math.random() * 20;
    const latitude = (Math.random() * 2 - 1) * Math.PI / 3; // -60° to +60°
    
    return {
      position: [
        radius * Math.cos(latitude) * Math.cos(angle),
        CLOUD_LAYER.centerAltitude + (Math.random() * 10 - 5),
        radius * Math.cos(latitude) * Math.sin(angle)
      ],
      size: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.3
    };
  });
</script>

<!-- Cloud particles implementation commented out for now -->

<T.Group position={[0, 0, 0]}>
  {#each cloudParticles as cloud}
    <T.Mesh 
      position={cloud.position}
      renderOrder={0}
    >
      <T.SphereGeometry args={[cloud.size, 6, 6]} />
      <T.MeshBasicMaterial 
        color={CLOUD_LAYER.color} 
        transparent={true} 
        opacity={cloud.opacity}
        depthWrite={false}
      />
    </T.Mesh>
  {/each}
</T.Group>
