<!-- src/lib/sims/flight/scene/indicators/TextLabel.svelte -->

<script>
  import { T } from "@threlte/core";
  
  // Props
  let { 
    text = "",
    position = [0, 0, 0],
    color = "#FFFFFF",
    fontSize = 1,
    opacity = 0.9,
    backgroundColor = "#000000",
    backgroundOpacity = 0.5,
    padding = 0.5,
    layer = null, // Optional layer object for customization
    active = false
  } = $props();
  
  // If layer is provided, use its data for the label
  $effect(() => {
    if (layer) {
      text = layer.name;
      // Could add more customizations based on layer properties
    }
  });
  
  // Calculate background dimensions based on text length
  const bgWidth = $derived(Math.max(text.length * fontSize * 0.6, 5));
  const bgHeight = $derived(fontSize * 1.5 + padding * 2);
</script>

<T.Group {position}>
  <!-- Background plane -->
  <T.Mesh position={[bgWidth/2, 0, -0.01]}>
    <T.PlaneGeometry args={[bgWidth, bgHeight]} />
    <T.MeshBasicMaterial 
      color={backgroundColor}
      transparent={true}
      opacity={backgroundOpacity}
    />
  </T.Mesh>
  
  <!-- Text - using HTML as a billboard -->
  <T.Html
    position={[padding, 0, 0]}
    transform
    occlude={false}
    style="pointer-events: none;"
  >
    <div style="
      color: {color}; 
      font-size: {fontSize}em; 
      font-family: monospace;
      white-space: nowrap;
      opacity: {opacity};
      text-shadow: 0 0 2px black;
      font-weight: {active ? 'bold' : 'normal'};
    ">
      {text}
    </div>
  </T.Html>
</T.Group>