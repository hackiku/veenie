<!-- src/routes/(flight)/atmo-test/+page.svelte -->
<script lang="ts">
  import Nav from '$lib/ui/Nav.svelte';
  import AtmoSim from './AtmoSim.svelte';
</script>

<Nav />
<!-- Venus atmospheric gradient background -->
<div class="w-screen h-screen ">
  <AtmoSim />
</div>

<!-- <style>
  .venus-atmosphere {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    
    /* Venus atmosphere gradient - real colors from 0-200km */
    background: linear-gradient(to bottom, 
      #080808 0%,     /* Space - black */
      #4D7899 17%,    /* High atmosphere - blue-grey */
      #85C9FE 34%,    /* Upper atmosphere - light blue */
      #A2BEC6 54%,    /* Middle atmosphere - grey-blue */
      #E4DEB7 64%,    /* Upper clouds - pale yellow */
      #BFBD97 72%,    /* Cloud layer - beige */
      #E1DCBB 77%,    /* Lower clouds - light beige */
      #DACDAB 80%,    /* Haze layer - tan */
      #FFEDBF 84%,    /* Lower haze - pale orange */
      #FEDD91 90%,    /* Dense atmosphere - golden */
      #FDBD4B 95%,    /* Lower atmosphere - orange */
      #F6A309 100%    /* Surface - deep orange */
    );
    
    /* Subtle animation for atmospheric movement */
    background-size: 100% 120%;
    animation: atmosphereShift 120s ease-in-out infinite alternate;
  }
  
  .sim-container {
    position: relative;
    width: 100%;
    height: 100%;
    /* Slight transparency to let gradient show through */
    background: rgba(0, 0, 0, 0.1);
  }
  
  @keyframes atmosphereShift {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 0% -5%;
    }
  }
  
  /* Alternative: Responsive gradient for different screen sizes */
  @media (max-width: 768px) {
    .venus-atmosphere {
      /* More compressed gradient on mobile */
      background-size: 100% 110%;
    }
  }
</style> -->