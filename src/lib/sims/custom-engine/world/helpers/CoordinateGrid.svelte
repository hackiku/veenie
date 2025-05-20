<!-- src/lib/sims/custom-engine/world/helpers/CoordinateGrid.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { venusCoordinates } from '../../physics/coordinates/venusCoordinates';
	import { Billboard, Text } from '@threlte/extras';	
  
  // Props with defaults
  let { 
    size = 500,           // Size of grid in km
    divisions = 50,       // Number of grid divisions
    labelInterval = 5,    // Show label every X divisions
    height = 0            // Height above terrain
  } = $props();
  
  // Derived values
  const gridScale = $derived(size / divisions);
  
  // Generate grid lines
  function createLines() {
    const lines = [];
    const startPos = -size / 2;
    
    for (let i = 0; i <= divisions; i++) {
      const pos = startPos + (i * gridScale);
      const showLabel = i % labelInterval === 0;
      
      // Calculate lat/lon at this grid position
      const eastWest = venusCoordinates.localToSpherical(pos, height, 0);
      const northSouth = venusCoordinates.localToSpherical(0, height, pos);
      
      if (showLabel) {
        lines.push({
          x1: startPos,
          z1: pos,
          x2: startPos + size,
          z2: pos,
          label: `${northSouth.latitude.toFixed(2)}°N`,
          labelPos: [startPos - 15, height, pos],
          isLatitude: true
        });
        
        lines.push({
          x1: pos,
          z1: startPos,
          x2: pos,
          z2: startPos + size,
          label: `${eastWest.longitude.toFixed(2)}°E`,
          labelPos: [pos, height, startPos - 15],
          isLatitude: false
        });
      } else {
        lines.push({
          x1: startPos,
          z1: pos,
          x2: startPos + size,
          z2: pos,
          isLatitude: true
        });
        
        lines.push({
          x1: pos,
          z1: startPos,
          x2: pos,
          z2: startPos + size,
          isLatitude: false
        });
      }
    }
    
    return lines;
  }
  
  // Reactive value for lines
  const lines = $derived(createLines());
</script>

<T.Group position={[0, height + 0.1, 0]}>
  <!-- Render grid lines -->
  {#each lines as line, i}
    <T.Group>
      <T.Line 
        points={[
          [line.x1, 0, line.z1],
          [line.x2, 0, line.z2]
        ]}
        color={line.isLatitude ? "#4488ff" : "#ff8844"}
      />
      
      {#if line.label}
        <T.Mesh position={line.labelPos}>
          <T.SphereGeometry args={[0.5]} />
          <T.MeshBasicMaterial color="#ffffff" opacity={0.3} transparent={true} />
          <Billboard>
            <T.Mesh>
              <T.PlaneGeometry args={[5, 1.5]} />
              <T.MeshBasicMaterial color="#000000" opacity={0.5} transparent={true} />
            </T.Mesh>
            <Text 
              fontSize={0.8}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {line.label}
            </Text>
          </Billboard>
        </T.Mesh>
      {/if}
    </T.Group>
  {/each}
  
  <!-- Center marker showing reference point -->
  <T.Mesh position={[0, 0, 0]}>
    <T.SphereGeometry args={[1]} />
    <T.MeshBasicMaterial color="#ffff00" opacity={0.7} transparent={true} />
    <Billboard>
      <T.Mesh>
        <T.PlaneGeometry args={[15, 2]} />
        <T.MeshBasicMaterial color="#000000" opacity={0.5} transparent={true} />
      </T.Mesh>
      <Text 
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {venusCoordinates.referencePoint.latitude.toFixed(2)}°N, {venusCoordinates.referencePoint.longitude.toFixed(2)}°E
      </Text>
    </Billboard>
  </T.Mesh>
</T.Group>