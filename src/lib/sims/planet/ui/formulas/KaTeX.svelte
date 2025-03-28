<!-- src/lib/sims/venus/content/KaTeX.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  /**
   * Simple KaTeX component for rendering math
   */
  
  let { 
    math = '',
    displayMode = false 
  } = $props<{
    math: string;
    displayMode?: boolean;
  }>();
  
  let element: HTMLElement;
  let katexLoaded = $state(false);
  
  onMount(() => {
    // Load KaTeX CSS if not already loaded
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
      link.integrity = 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
    
    // Load KaTeX script if not already loaded
    if (typeof window.katex === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
      script.integrity = 'sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx';
      script.crossOrigin = 'anonymous';
      script.defer = true;
      script.onload = () => {
        katexLoaded = true;
        renderMath();
      };
      document.head.appendChild(script);
    } else {
      katexLoaded = true;
      renderMath();
    }
    
    return () => {
      // No cleanup needed
    };
  });
  
  function renderMath() {
    if (katexLoaded && element && typeof window.katex !== 'undefined') {
      try {
        window.katex.render(math, element, {
          throwOnError: false,
          displayMode
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    }
  }
  
  // Re-render when props change
  $effect(() => {
    if (katexLoaded) {
      renderMath();
    }
  });
</script>

<span bind:this={element}>
  {#if !katexLoaded}
    {math}
  {/if}
</span>

<script lang="ts" context="module">
  // Add KaTeX typings
  declare global {
    interface Window {
      katex: {
        render: (
          math: string, 
          element: HTMLElement, 
          options?: { 
            throwOnError?: boolean; 
            displayMode?: boolean;
          }
        ) => void;
      }
    }
  }
</script>