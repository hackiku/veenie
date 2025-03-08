<!-- src/lib/sims/venus/atmosphere/WindVisualization.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Vector3, BufferGeometry, LineBasicMaterial, Color } from 'three';
  import { generateWindStreamlines } from '../physics/windModel';
  
  // Props using runes
  let { 
    planetRadius = 6051.8, // km
    altitude = 50, // km
    scale = 0.001,
    visible = true,
    showArrows = true,
    streamlineDensity = 3, // 1-10 scale
    colorIntensity = 1.0 // 0-1 scale for color intensity
  } = $props<{
    planetRadius?: number;
    altitude?: number;
    scale?: number;
    visible?: boolean;
    showArrows?: boolean;
    streamlineDensity?: number;
    colorIntensity?: number;
  }>();
  
  // Generate streamlines
  let streamlines = $state<Vector3[][]>([]);
  
  // Calculate actual radius with altitude
  $effect(() => {
    const radius = (planetRadius + altitude) * scale;
    const gridSize = radius * 0.5; // Size of the visualization grid
    const resolution = 10 + streamlineDensity * 2; // Resolution based on density
    
    // Generate wind streamlines
    streamlines = generateWindStreamlines(
      new Vector3(0, 0, 0),
      gridSize,
      resolution,
      altitude
    );
  });
  
  // Color scale based on altitude
  function getStreamlineColor(altitude: number): Color {
    // Interpolate color based on altitude
    if (altitude < 30) {
      // Surface to lower haze: orange to yellow
      const t = altitude / 30;
      return new Color(0xE6C98C).lerp(new Color(0xFFDB99), t);
    } else if (altitude < 50) {
      // Lower haze to middle clouds: yellow to white
      const t = (altitude - 30) / 20;
      return new Color(0xFFDB99).lerp(new Color(0xD9D9D9), t);
    } else if (altitude < 70) {
      // Middle clouds to upper clouds: white to light blue
      const t = (altitude - 50) / 20;
      return new Color(0xD9D9D9).lerp(new Color(0x9FAFCF), t);
    } else {
      // Upper clouds to thermosphere: light blue to dark blue
      const t = Math.min((altitude - 70) / 50, 1);
      return new Color(0x9FAFCF).lerp(new Color(0x7E93BE), t);
    }
  }
</script>

{#if visible && streamlines.length > 0}
  {#each streamlines as streamline}
    <!-- Create a line for each streamline -->
    <T.Line>
      <T.BufferGeometry>
        {#if streamline.length > 0}
          <T.BufferAttribute
            attach="attributes.position" 
            args={[new Float32Array(streamline.flatMap(v => [v.x, v.y, v.z])), 3]}
          />
        {/if}
      </T.BufferGeometry>
      <T.LineBasicMaterial 
        color={getStreamlineColor(altitude)} 
        opacity={0.7 * colorIntensity}
        transparent={true}
        linewidth={1}
      />
    </T.Line>
    
    {#if showArrows && streamline.length > 2}
      <!-- Add arrow heads at intervals -->
      {#each [Math.floor(streamline.length / 2)] as idx}
        {#if idx > 0 && idx < streamline.length - 1}
          <T.Mesh position={streamline[idx]}>
            <T.ConeGeometry args={[0.02 * scale * planetRadius, 0.05 * scale * planetRadius, 8]} />
            <T.MeshBasicMaterial color={getStreamlineColor(altitude)} />
            
            <!-- Calculate rotation to point in direction of flow -->
            <T.Group
              rotation={(() => {
                const dir = streamline[idx+1].clone().sub(streamline[idx-1]).normalize();
                const up = new Vector3(0, 1, 0);
                const axis = new Vector3().crossVectors(up, dir).normalize();
                const angle = Math.acos(up.dot(dir));
                return [axis.x * angle, axis.y * angle, axis.z * angle];
              })()}
            />
          </T.Mesh>
        {/if}
      {/each}
    {/if}
  {/each}
{/if}