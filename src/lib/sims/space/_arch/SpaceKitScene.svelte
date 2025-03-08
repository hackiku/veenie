<!-- src/lib/sims/space/SpaceKitScene.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Props
  export let width = window.innerWidth;
  export let height = window.innerHeight;
  
  // DOM reference
  let containerRef;
  
  onMount(() => {
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div 
  bind:this={containerRef}
  class="spacekit-container"
  style="width: {width}px; height: {height}px;"
>
  <div class="placeholder">
    <p class="title">SpaceKit Placeholder</p>
    <p class="description">This is where SpaceKit.js will render once installed</p>
    <div class="star-field">
      <!-- Simple star field animation -->
      {#each Array(50) as _, i}
        <div 
          class="star" 
          style="
            top: {Math.random() * 100}%; 
            left: {Math.random() * 100}%; 
            width: {Math.random() * 3}px; 
            height: {Math.random() * 3}px;
            animation-delay: {Math.random() * 5}s;
          "
        ></div>
      {/each}
    </div>
    
    <div class="planet"></div>
  </div>
</div>

<style>
  .spacekit-container {
    background-color: #000;
    position: relative;
    overflow: hidden;
  }
  
  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #9F7AEA;
    z-index: 10;
  }
  
  .description {
    font-size: 1rem;
    opacity: 0.8;
    max-width: 80%;
    text-align: center;
    z-index: 10;
  }
  
  .star-field {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: twinkle 5s infinite alternate;
  }
  
  @keyframes twinkle {
    0% { opacity: 0.2; }
    100% { opacity: 1; }
  }
  
  .planet {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at 30% 30%, #E3C19F, #C9977A);
    border-radius: 50%;
    margin-top: 30px;
    position: relative;
    z-index: 5;
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>