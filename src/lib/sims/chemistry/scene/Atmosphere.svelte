<!-- src/lib/sims/chemistry/scene/Atmosphere.svelte -->

<script lang="ts">
  import { T } from "@threlte/core";
  import { ATMOSPHERIC_LAYERS } from '$lib/data/chemistry/atmosphericComposition';
  import { chemistryStore } from '$lib/stores/chemistryStore';
  
  // Props using SvelteKit 5 syntax
  let { currentAltitude = 50 } = $props();
  
  // State using SvelteKit 5 syntax
  let showFog = $state(true);
  let showParticles = $state(true);
  
  // Gas particle visualization effect (simplified for performance)
  const gasParticles = Array.from({ length: 50 }, () => {
    const altitude = Math.random() * 100; // 0-100 km
    const radius = 200 + Math.random() * 100;
    const angle = Math.random() * Math.PI * 2;
    
    // Assign particle type based on altitude
    let particleType = 'co2'; // default
    if (altitude > 80) particleType = 'n2';
    else if (altitude > 60) particleType = 'so2';
    else if (altitude > 45 && altitude < 55) particleType = 'h2so4';
    
    // Create fixed-length tuple for position
    const x = radius * Math.cos(angle);
    const y = altitude;
    const z = radius * Math.sin(angle);
    
    return {
      position: [x, y, z],
      size: 0.5 + Math.random(),
      type: particleType
    };
  });
  
  // Particle color based on type
  function getParticleColor(type) {
    switch(type) {
      case 'co2': return "#ff6666";
      case 'n2': return "#6699ff";
      case 'so2': return "#ffcc00";
      case 'h2so4': return "#cc66ff";
      default: return "#ffffff";
    }
  }
  
  // Calculate atmospheric layer color based on composition and altitude
  function getLayerColor(layer) {
    // Layer colors based on Venus's atmospheric composition
    if (layer.name === "Surface Layer") return "#cc4400";
    if (layer.name === "Lower Haze") return "#ff6600";
    if (layer.name === "Lower Cloud") return "#ffaa44"; 
    if (layer.name === "Middle Cloud") return "#eecc66";
    if (layer.name === "Upper Cloud") return "#ddddaa";
    if (layer.name === "Upper Haze") return "#bbaaee";
    if (layer.name === "Mesosphere") return "#aabbff";
    return "#99aacc"; // Default
  }
  
  // Get current layer for fog color
  function getCurrentLayer() {
    return ATMOSPHERIC_LAYERS.find(layer => 
      currentAltitude >= layer.altitude.min && 
      currentAltitude <= layer.altitude.max
    ) || ATMOSPHERIC_LAYERS[0];
  }
  
  const currentLayer = $derived(getCurrentLayer());
</script>

<!-- Atmospheric fog matching current layer -->
{#if showFog}
  <T.Fog 
    color={getLayerColor(currentLayer)} 
    near={50} 
    far={500} 
  />
{/if}

<!-- Flat horizontal discs representing atmospheric layers -->
{#each ATMOSPHERIC_LAYERS as layer}
  <T.Mesh 
    position={[0, (layer.altitude.min + layer.altitude.max) / 2, 0]} 
    rotation={[-Math.PI / 2, 0, 0]}
    receiveShadow
  >
    <T.CylinderGeometry 
      args={[
        1000, // top radius
        1000, // bottom radius
        layer.altitude.max - layer.altitude.min, // height
        32, // radial segments
        1, // height segments
        true // open-ended
      ]} 
    />
    <T.MeshStandardMaterial 
      color={getLayerColor(layer)}
      transparent={true}
      opacity={0.2}
      side={2}
    />
  </T.Mesh>
  
  <!-- Layer boundary lines -->
  <T.Mesh position={[0, layer.altitude.min, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <T.RingGeometry args={[990, 1000, 64]} />
    <T.MeshBasicMaterial color="#ffffff" transparent opacity={0.3} side={2} />
  </T.Mesh>
  
  <!-- Simple text label using sprites (no canvas) -->
  <T.Group position={[300, layer.altitude.min + 5, 0]}>
    <T.Mesh>
      <T.BoxGeometry args={[100, 20, 1]} />
      <T.MeshBasicMaterial color="#333333" opacity={0.7} transparent />
    </T.Mesh>
  </T.Group>
{/each}

<!-- Gas particles visualization -->
{#if showParticles}
  <T.Group>
    {#each gasParticles as particle}
      {#if Math.abs(particle.position[1] - currentAltitude) < 30}
        <T.Mesh position={particle.position}>
          <T.SphereGeometry args={[particle.size, 8, 8]} />
          <T.MeshBasicMaterial 
            color={getParticleColor(particle.type)} 
            transparent
            opacity={0.7}
          />
        </T.Mesh>
      {/if}
    {/each}
  </T.Group>
{/if}

<!-- Altitude indicator line -->
<T.Group>
  <T.Line>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes-position"
        args={[new Float32Array([-1000, currentAltitude, 0, 1000, currentAltitude, 0]), 3]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="#ffffff" opacity={0.5} transparent />
  </T.Line>
</T.Group>