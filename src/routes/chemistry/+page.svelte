<!-- src/routes/chemistry/+page.svelte -->
<script lang="ts">
  import ChemistrySim from '$lib/sims/chemistry/ChemistrySim.svelte';
  import Nav from '$lib/ui/Nav.svelte';
  import { getCompositionAtAltitude } from '$lib/data/chemistry/atmosphericComposition';
  import { CHEMICAL_REACTIONS } from '$lib/data/chemistry/constants';
  
  // Basic navigation
  const navItems = [
    { name: 'Flight', path: '/flight' },
    { name: 'Chemistry', path: '/chemistry' },
    { name: 'Venus', path: '/venus' }
  ];
  
  // Show/hide the info panel
  let showInfo = $state(false);
  
  // Toggle info panel visibility
  function toggleInfo() {
    showInfo = !showInfo;
  }
  
  // Chemical equation formatting
  function formatEquation(equation: string) {
    return equation
      .replace(/(\d+)/g, '<sub>$1</sub>')
      .replace(/→/g, '→')
      .replace(/\+/g, ' + ');
  }
</script>

<Nav />

<div class="fixed inset-0 bg-black w-screen h-screen overflow-hidden">
  <ChemistrySim />
</div>

<!-- Info button -->
{#if !showInfo}
  <button 
    class="fixed top-4 right-4 bg-green-800/80 text-white px-3 py-1.5 rounded z-50 text-sm hover:bg-green-700/80 transition shadow flex items-center gap-2"
    on:click={toggleInfo}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
    ISRU Chemistry
  </button>
{/if}

<!-- Information panel -->
{#if showInfo}
  <div class="fixed top-4 right-4 w-96 max-h-[calc(100vh-2rem)] overflow-y-auto bg-black/80 backdrop-blur-md text-white p-4 rounded-lg shadow-lg z-50">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-green-400">Venus ISRU Chemistry</h2>
      <button 
        class="text-gray-400 hover:text-white"
        on:click={toggleInfo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <div class="space-y-4">
      <section>
        <h3 class="text-lg font-semibold mb-2 text-green-300">Venus Atmosphere</h3>
        <p class="text-sm mb-2">
          Venus has a thick atmosphere composed primarily of carbon dioxide (96.5%) and nitrogen (3.5%), 
          with trace amounts of sulfur dioxide, water vapor, and other compounds. The pressure at the 
          surface is 92 bars, about 92 times Earth's atmospheric pressure.
        </p>
        <p class="text-sm">
          The "habitable zone" at 50-60km altitude has Earth-like temperatures and pressures, 
          making it an excellent target for resource extraction.
        </p>
      </section>
      
      <section>
        <h3 class="text-lg font-semibold mb-2 text-green-300">Key Chemical Reactions</h3>
        <div class="space-y-2">
          {#each Object.entries(CHEMICAL_REACTIONS) as [key, reaction]}
            <div class="bg-green-900/30 p-2 rounded">
              <div class="font-semibold text-sm">{key.replace('_', ' ')}</div>
              <div class="font-mono text-sm" style="line-height: 1.8;">
                {@html formatEquation(reaction.equation)}
              </div>
              <div class="text-xs text-gray-300 mt-1">
                ΔH = {reaction.enthalpy} kJ/mol 
                ({reaction.enthalpy < 0 ? 'exothermic' : 'endothermic'})
              </div>
            </div>
          {/each}
        </div>
      </section>
      
      <section>
        <h3 class="text-lg font-semibold mb-2 text-green-300">ISRU Propellant Production</h3>
        <p class="text-sm mb-2">
          In-situ resource utilization (ISRU) converts Venus's atmospheric CO₂ and trace H₂O into 
          rocket propellant through these steps:
        </p>
        <ol class="text-sm list-decimal list-inside space-y-1 ml-2">
          <li>Capture atmospheric CO₂ from Venus atmosphere</li>
          <li>Extract trace water (H₂O) from atmosphere</li>
          <li>Split water via electrolysis to produce H₂ and O₂</li>
          <li>React CO₂ with H₂ via Sabatier process to create CH₄ and H₂O</li>
          <li>Recycle produced H₂O back into the system</li>
          <li>Store O₂ and CH₄ as rocket propellant (ratio ~3.5:1)</li>
        </ol>
      </section>
      
      <section>
        <h3 class="text-lg font-semibold mb-2 text-green-300">Optimal Conditions</h3>
        <p class="text-sm">
          The most favorable atmospheric conditions for ISRU operations are:
        </p>
        <ul class="text-sm list-disc list-inside space-y-1 ml-2">
          <li>Altitude: 50-55 km (Earth-like temperature and pressure)</li>
          <li>Temperature: 270-300 K (near room temperature)</li>
          <li>Pressure: ~1 bar (similar to Earth's atmosphere)</li>
          <li>Access to solar energy: 2600 W/m² (twice Earth's value)</li>
        </ul>
      </section>
      
      <div class="text-xs text-gray-400 mt-4">
        <p>Use the W/S keys or UP/DOWN arrows to adjust altitude.</p>
        <p>Play/pause simulation with the controls in the bottom center.</p>
      </div>
    </div>
  </div>
{/if}