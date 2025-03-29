<!-- src/lib/sims/planet/controls/MiniMap.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import { T } from '@threlte/core';
  import { Canvas } from '@threlte/core';
  
  // Props using runes
  let {
    map = 'planet',
    onModelSelect = null
  } = $props<{
    map?: 'surface' | 'planet' | 'atmosphere',
    onModelSelect?: ((modelType: string) => void) | null
  }>();

  // Get planet context if available
  let planetContext;
  try {
    planetContext = getContext('planetContext');
  } catch(e) {
    // Context might not be available, handle gracefully
    console.warn('Planet context not available in MiniMap');
  }

  // State for selected map
  let selectedMap = $state(map);

  // Map options
  const mapOptions = [
    { id: 'surface', label: 'Surface' },
    { id: 'planet', label: 'Planet' },
    { id: 'atmosphere', label: 'Clouds' }
  ];

  // Function to select a map
  function selectMap(mapId: 'surface' | 'planet' | 'atmosphere') {
    selectedMap = mapId;
    
    // Notify parent component if callback provided
    if (onModelSelect) {
      onModelSelect(mapId);
    }
  }

  // Keep selectedMap in sync with prop
  $effect(() => {
    selectedMap = map;
  });
  
  // Determine if a map is selected
  function isSelected(mapId: string) {
    return selectedMap === mapId;
  }
</script>

<div class="flex flex-row gap-4 justify-center items-center">
  {#each mapOptions as option}
    <div 
      class="bg-neutral-700/40 rounded-md border border-orange-900/40 text-white overflow-hidden cursor-pointer transition-all duration-200"
      class:w-16={!isSelected(option.id)}
      class:h-16={!isSelected(option.id)}
      class:w-32={isSelected(option.id)}
      class:h-32={isSelected(option.id)}
      class:border-orange-500={isSelected(option.id)}
      class:border-2={isSelected(option.id)}
      onclick={() => selectMap(option.id as 'surface' | 'planet' | 'atmosphere')}
    >
      <!-- Preview Canvas -->
      <div class="w-full h-full relative">
        <Canvas shadows={false}>
          <!-- Simple lighting -->
          <T.AmbientLight intensity={0.7} />
          <T.DirectionalLight position={[3, 3, 3]} intensity={1} />
          
          <!-- Static Camera -->
          <T.PerspectiveCamera position={[0, 0, 15]} fov={30} makeDefault />
          
          <!-- Different model based on map type -->
          {#if option.id === 'surface'}
            <!-- Surface model (simple placeholder) -->
            <T.Mesh>
              <T.SphereGeometry args={[6, 32, 32]} />
              <T.MeshStandardMaterial 
                color="#af7f55" 
                roughness={0.8}
                metalness={0.2}
              />
            </T.Mesh>
          {:else if option.id === 'planet'}
            <!-- Planet model (simple placeholder) -->
            <T.Mesh>
              <T.SphereGeometry args={[6, 32, 32]} />
              <T.MeshStandardMaterial 
                color="#E6C98C" 
                roughness={0.5}
                metalness={0.1}
              />
            </T.Mesh>
          {:else if option.id === 'atmosphere'}
            <!-- Cloud model (simple placeholder with layers) -->
            <T.Group>
              <!-- Planet core -->
              <T.Mesh>
                <T.SphereGeometry args={[6, 32, 32]} />
                <T.MeshStandardMaterial 
                  color="#E6C98C" 
                  roughness={0.5}
                  metalness={0.1}
                />
              </T.Mesh>
              
              <!-- Cloud layer -->
              <T.Mesh>
                <T.SphereGeometry args={[6.3, 32, 32]} />
                <T.MeshStandardMaterial 
                  color="#D9D9D9"
                  transparent={true}
                  opacity={0.7}
                />
              </T.Mesh>
            </T.Group>
          {/if}
        </Canvas>
        
        <!-- Label overlay -->
        <div class="absolute bottom-0 inset-x-0 bg-black/60 text-xs text-center py-1">
          {option.label}
        </div>
      </div>
    </div>
  {/each}
</div>