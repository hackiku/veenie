<!-- src/lib/sims/flight/ui/CameraPosition.svelte -->
<script>
  import { getContext } from 'svelte';
  import { useThree, useTask } from '@threlte/core';
  
  // Camera data
  let position = $state([0, 0, 0]);
  let target = $state([0, 0, 0]);
  let altitude = $state(0);
  
  // Get Three.js camera from Threlte
  const { camera } = useThree();
  
  // Update camera information on each frame
  useTask(() => {
    if (camera.current) {
      // Update position
      position = [
        camera.current.position.x.toFixed(1),
        camera.current.position.y.toFixed(1),
        camera.current.position.z.toFixed(1)
      ];
      
      // Store altitude separately
      altitude = parseFloat(camera.current.position.y.toFixed(1));
      
      // Try to get target from OrbitControls if available
      if (camera.current.controls && camera.current.controls.target) {
        target = [
          camera.current.controls.target.x.toFixed(1),
          camera.current.controls.target.y.toFixed(1),
          camera.current.controls.target.z.toFixed(1)
        ];
      }
    }
  });
  
  // Get flight context for Venus data
  const flightContext = getContext('flightContext');
  const constants = $derived(flightContext?.constants || {});
  
  // Helper to determine altitude classification
  function getAltitudeClass(alt) {
    if (!constants || !constants.altitude) return "text-white";
    
    const { SURFACE, LOWER_HAZE, CLOUD_LAYER, UPPER_HAZE } = constants.altitude;
    
    if (alt < LOWER_HAZE) return "text-red-400";
    if (alt < CLOUD_LAYER) return "text-yellow-400";
    if (alt < UPPER_HAZE) return "text-green-400";
    return "text-blue-400";
  }
</script>

<div class="fixed top-4 right-4 bg-black/40 text-white p-2 rounded-md text-sm backdrop-blur-sm z-20">
  <div class="grid grid-cols-[auto,1fr] gap-x-2 text-xs">
    <span class="text-gray-400">Camera:</span>
    <span>x:{position[0]} y:{position[1]} z:{position[2]}</span>
    
    <span class="text-gray-400">Looking at:</span>
    <span>x:{target[0]} y:{target[1]} z:{target[2]}</span>
    
    <span class="text-gray-400">Altitude:</span>
    <span class={getAltitudeClass(altitude)}>{altitude} km</span>
  </div>
</div>