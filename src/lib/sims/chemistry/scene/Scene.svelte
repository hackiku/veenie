<!-- src/lib/sims/chemistry/scene/Scene.svelte -->

<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import Atmosphere from "./Atmosphere.svelte";
  import ProcessPlant from "../vehicles/ProcessPlant.svelte";
  import Camera from "./Camera.svelte";
  import { chemistryStore } from '$lib/stores/chemistryStore';
  
  // State for chemistry
  let chemState = $state(null);
  
  // Subscribe to the chemistry store
  $effect(() => {
    const unsubChemStore = chemistryStore.subscribe(state => {
      chemState = state;
    });
    
    return () => {
      unsubChemStore();
    };
  });
  
  // Current altitude (in km)
  const altitude = $derived(chemState?.altitude || 50);
  
  // Process plant position based on current altitude
  const plantPosition = $derived([0, altitude, 0]);
</script>

<!-- Lighting -->
<T.AmbientLight intensity={0.4} />
<T.DirectionalLight 
  position={[-10, 50, 10]} 
  intensity={1} 
  castShadow
  shadow-mapSize={[2048, 2048]}
/>
<T.HemisphereLight 
  skyColor="#ffaa44" 
  groundColor="#440000" 
  intensity={0.5} 
/>

<!-- Camera setup -->
<Camera currentAltitude={altitude} />

<!-- Atmospheric layers visualization -->
<Atmosphere currentAltitude={altitude} />

<!-- Chemical processing plant / balloon -->
<ProcessPlant position={plantPosition} />

<!-- Simple grid at "ground" level for reference -->
<T.GridHelper args={[1000, 100, "#444444", "#222222"]} position={[0, 0, 0]} />

<!-- Simple sphere representing Venus surface -->
<T.Mesh position={[0, -10, 0]} rotation={[0, 0, 0]}>
  <T.SphereGeometry args={[6000, 64, 32]} />
  <T.MeshStandardMaterial 
    color="#b36b00"
    roughness={0.9}
    metalness={0.1}
    opacity={0.9}
    transparent={true}
    side={1}
  />
</T.Mesh>