// lib/core/simulation.svelte.ts
// Core simulation engine that drives physics, time management, and module coordination

// Simulation state
let simulation = $state({
  running: false,
  modules: {
    flight: true,
    chemistry: true,
    economics: true,
    orbital: true
  }
});

// Export functions and state
export {
  simulation
};
