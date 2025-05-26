<!-- src/lib/sims/venus/world/space/Orbit.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { BufferGeometry, LineBasicMaterial, EllipseCurve } from 'three';
  
  // Props using runes
  let { 
    semiMajorAxis = 100,
    eccentricity = 0,
    segments = 128,
    color = 0x88AAFF
  } = $props<{
    semiMajorAxis?: number;
    eccentricity?: number;
    segments?: number;
    color?: number;
  }>();
  
  // Create an elliptical curve
  const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
  const curve = new EllipseCurve(
    0, 0,             // center x, y
    semiMajorAxis, semiMinorAxis, // xRadius, yRadius
    0, 2 * Math.PI,   // startAngle, endAngle
    false,            // clockwise
    0                 // rotation
  );
  
  // Extract points from the curve
  const points = curve.getPoints(segments);
  
  // Convert points to 3D (rotating to the XZ plane)
  const vertices = points.map(p => [p.x, 0, p.y]).flat();
</script>

<T.Line>
  <T.BufferGeometry>
    <T.BufferAttribute
      attach="attributes.position"
      args={[new Float32Array(vertices), 3]}
    />
  </T.BufferGeometry>
  <T.LineBasicMaterial color={color} opacity={0.6} transparent={true} />
</T.Line>